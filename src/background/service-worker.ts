import { StorageService } from '../core/storage';
import { CapturedMessageSchema } from '../core/message-schema';

console.log('CatchUp Background Service Worker Initialized');

class MessageRouter {
  constructor() {
    chrome.runtime.onMessage.addListener(this.routeMessage.bind(this));
  }

  private routeMessage(message: any, _sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
    if (message.type === 'SYNC_MESSAGES') {
      this.handleSyncMessages(message.payload).then(sendResponse);
      return true; // Keep channel open
    }
    
    if (message.type === 'GET_MESSAGES') {
      this.handleGetMessages().then(sendResponse);
      return true;
    }
    
    if (message.type === 'CLEAR_MESSAGES') {
      StorageService.clearMessages().then(() => sendResponse({ success: true }));
      return true;
    }

    return false;
  }

  private async handleSyncMessages(rawMessages: any[]) {
    try {
      const validMessages = rawMessages
        .map(msg => {
          const result = CapturedMessageSchema.safeParse(msg);
          if (!result.success) {
            console.warn('Invalid message payload', result.error);
            return null;
          }
          return result.data;
        })
        .filter((m): m is NonNullable<typeof m> => m !== null);

      await StorageService.saveMessages(validMessages);
      return { success: true, count: validMessages.length };
    } catch (error) {
      console.error('Error syncing messages', error);
      return { success: false, error: String(error) };
    }
  }

  private async handleGetMessages() {
    try {
      const messages = await StorageService.getMessages();
      return { success: true, messages };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }
}

// Instantiate the router to handle incoming messages
new MessageRouter();
