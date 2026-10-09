import { generateContentHash } from "../../core/utils";
import { BaseAdapter } from '../shared/BaseAdapter';
import { CapturedMessage, UnreadStatus } from '../../core/message-schema';

class TeamsAdapter extends BaseAdapter {
  constructor() {
    super('Teams');
  }

  checkGlobalUnreadStatus(): boolean {
    const unreadBadge = document.querySelector('.ts-unread-channel, .ts-unread-badge');
    return unreadBadge !== null;
  }

  extractVisibleMessages(): CapturedMessage[] {
    const messages: CapturedMessage[] = [];
    
    const messageNodes = document.querySelectorAll('.ui-chat__message');
    
    messageNodes.forEach((node) => {
      const contentNode = node.querySelector('.ui-chat__message__content');
      if (!contentNode) return;
      
      const content = (contentNode as HTMLElement).innerText || '';
      if (!content) return;

      const senderNode = node.querySelector('.ui-chat__message__author');
      const senderName = (senderNode as HTMLElement)?.innerText || 'Unknown';
      const isIncoming = senderName !== 'Me';

      messages.push({
        id: crypto.randomUUID(),
        platform: this.platformName,
        conversationId: 'teams_active_chat',
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

const adapter = new TeamsAdapter();
adapter.init();
