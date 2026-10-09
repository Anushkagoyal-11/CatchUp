import { StorageService } from '../core/storage';
import { CapturedMessageSchema } from '../core/message-schema';

console.log('CatchUp Background Service Worker Initialized');

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SYNC_MESSAGES') {
    handleSyncMessages(message.payload, sendResponse);
    return true; // Keep the messaging channel open for asynchronous response
  }
  
  if (message.type === 'GET_MESSAGES') {
    handleGetMessages(sendResponse);
    return true;
  }
});

async function handleSyncMessages(rawMessages: any[], sendResponse: (response: any) => void) {
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
    sendResponse({ success: true, count: validMessages.length });
  } catch (error) {
    console.error('Error syncing messages', error);
    sendResponse({ success: false, error: String(error) });
  }
}

async function handleGetMessages(sendResponse: (response: any) => void) {
  try {
    const messages = await StorageService.getMessages();
    sendResponse({ success: true, messages });
  } catch (error) {
    sendResponse({ success: false, error: String(error) });
  }
}
