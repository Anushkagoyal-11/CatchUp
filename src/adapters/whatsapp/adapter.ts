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
    
    // WhatsApp Web bubble selectors
    const messageNodes = document.querySelectorAll('div.message-in, div.message-out, div[data-id]');
    
    messageNodes.forEach((node) => {
      let content = '';
      
      const textSpan = node.querySelector('.selectable-text, .copyable-text, span[dir="ltr"]');
      if (textSpan) {
        content = (textSpan as HTMLElement).innerText || textSpan.textContent || '';
      }
      
      // If we STILL don't have content, WhatsApp might have deeply nested the text
      if (!content) {
        const allSpans = node.querySelectorAll('span');
        for (let i = 0; i < allSpans.length; i++) {
          const spanText = allSpans[i].textContent || '';
          if (spanText.length > 3 && !spanText.includes(':')) { // rough heuristic for avoiding timestamps
            content = spanText;
            break;
          }
        }
      }
      
      if (!content) {
         // Final absolute fallback: just take the whole node text and clean it
         content = (node.textContent || '').replace(/[0-9]{1,2}:[0-9]{2}/g, '').trim();
      }
      
      content = content.trim();
      if (!content || content.length < 2) return; // Skip empty or tiny artifacts

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
