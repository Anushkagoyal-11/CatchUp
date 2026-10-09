import { generateContentHash } from "../../core/utils";
import { BaseAdapter } from '../shared/BaseAdapter';
import { CapturedMessage, UnreadStatus } from '../../core/message-schema';

class TelegramAdapter extends BaseAdapter {
  constructor() {
    super('Telegram');
  }

  checkGlobalUnreadStatus(): boolean {
    const unreadBadge = document.querySelector('.Badge.unread');
    return unreadBadge !== null;
  }

  extractVisibleMessages(): CapturedMessage[] {
    const messages: CapturedMessage[] = [];
    
    const messageNodes = document.querySelectorAll('.Message');
    
    messageNodes.forEach((node) => {
      const contentNode = node.querySelector('.text-content');
      if (!contentNode) return;
      
      const content = (contentNode as HTMLElement).innerText || '';
      if (!content) return;

      const isIncoming = !node.classList.contains('own');
      const senderName = isIncoming ? (node.querySelector('.message-title')?.textContent || 'Unknown') : 'Me';

      messages.push({
        id: crypto.randomUUID(),
        platform: this.platformName,
        conversationId: 'telegram_active_chat',
        conversationName: document.querySelector('.chat-title')?.textContent || 'Unknown',
        senderId: 'unknown',
        senderName,
        timestamp: new Date().toISOString(),
        capturedAt: new Date().toISOString(),
        content,
        contentType: 'text',
        direction: isIncoming ? 'incoming' : 'outgoing',
        accessibilityStatus: 'visible',
        unreadStatus: isIncoming ? UnreadStatus.UNKNOWN : UnreadStatus.READ_INDICATOR_DETECTED,
        unreadEvidence: null,
        unreadConfidence: 0.8,
        sourceUrl: window.location.href,
        extractionMethod: 'dom_scraping',
        contentHash: generateContentHash(content),
        schemaVersion: 1
      });
    });

    return messages;
  }
}

const adapter = new TelegramAdapter();
adapter.init();
