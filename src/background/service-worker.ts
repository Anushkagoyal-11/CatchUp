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

    if (message.type === 'GENERATE_SUMMARY') {
      this.handleGenerateSummary(message.payload).then(sendResponse);
      return true;
    }

    return false;
  }

  private async handleGenerateSummary(payload: { messages: any[], config: any }) {
    try {
      const { messages, config } = payload;
      const url = config.url || 'http://localhost:11434';
      const model = config.model || 'qwen2.5-coder:1.5b';
      
      const prompt = `
        Summarize the following chat messages. Extract the key points, decisions, and any action items.
        Keep it concise and readable.
        
        Messages:
        ${messages.map(m => `[${m.senderName}]: ${m.content}`).join('\n')}
      `;

      const response = await fetch(`${url}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: `You are an AI assistant that summarizes chat messages.` },
            { role: 'user', content: prompt }
          ],
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.message.content;
      
      let parsed;
      try {
        parsed = JSON.parse(rawText);
        // If it parsed but is missing 'overview', just dump the raw text so we can read it
        if (!parsed.overview && !parsed.actionItems) {
          parsed = { overview: "Raw Output: " + rawText, actionItems: [], deadlines: [] };
        }
      } catch (e) {
        // If it failed to parse as JSON, just shove the whole text into overview
        parsed = {
          overview: rawText,
          actionItems: [],
          deadlines: []
        };
      }
      return { success: true, summary: parsed };
    } catch (error) {
      return { success: false, error: String(error) };
    }
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
