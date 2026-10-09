import type { CapturedMessage } from './message-schema';
import { STORAGE_KEYS } from './constants';

export class StorageService {
  /**
   * Save an array of messages
   */
  static async saveMessages(messages: CapturedMessage[]): Promise<void> {
    const existing = await this.getMessages();
    
    // De-duplicate by ID
    const messageMap = new Map(existing.map(m => [m.id, m]));
    for (const msg of messages) {
      messageMap.set(msg.id, msg);
    }
    
    const merged = Array.from(messageMap.values());
    
    return new Promise((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEYS.MESSAGES]: merged }, () => {
        resolve();
      });
    });
  }

  /**
   * Retrieve all saved messages
   */
  static async getMessages(): Promise<CapturedMessage[]> {
    return new Promise((resolve) => {
      chrome.storage.local.get(STORAGE_KEYS.MESSAGES, (result) => {
        resolve(result[STORAGE_KEYS.MESSAGES] || []);
      });
    });
  }

  /**
   * Clear all messages
   */
  static async clearMessages(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.remove(STORAGE_KEYS.MESSAGES, () => {
        resolve();
      });
    });
  }
}
