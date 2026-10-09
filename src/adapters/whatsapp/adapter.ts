import { generateContentHash } from "../../core/utils";
import { BaseAdapter } from '../shared/BaseAdapter';
import { CapturedMessage, UnreadStatus } from '../../core/message-schema';

class WhatsAppAdapter extends BaseAdapter {
  constructor() {
    super('WhatsApp');
  }

  checkGlobalUnreadStatus(): boolean {
    // WhatsApp Web typically has an unread badge with a specific class or aria-label
    // E.g., a badge with aria-label="Unread messages"
    const unreadBadge = document.querySelector('[aria-label*="unread message"]');
    return unreadBadge !== null;
  }

  extractVisibleMessages(): CapturedMessage[] {
    const messages: CapturedMessage[] = [];
    
    // Simplistic selector for message bubbles in WhatsApp Web
    const messageNodes = document.querySelectorAll('div.message-in, div.message-out');
    
    messageNodes.forEach((node) => {
      const contentNode = node.querySelector('.copyable-text');
      if (!contentNode) return;
      
      const content = (contentNode.querySelector('span[dir="ltr"]') as HTMLElement)?.innerText || '';
      if (!content) return;

      const isIncoming = node.classList.contains('message-in');
      
      messages.push({
        id: crypto.randomUUID(),
        platform: this.platformName,
        conversationId: 'whatsapp_active_chat', // In a real scenario, extract from DOM
        conversationName: document.querySelector('header span[dir="auto"]')?.textContent || 'Unknown',
        senderId: 'unknown',
        senderName: isIncoming ? 'Contact' : 'Me',
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

// Bootstrap the adapter
const adapter = new WhatsAppAdapter();
adapter.init();
