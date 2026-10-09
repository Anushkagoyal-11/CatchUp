import { generateContentHash } from "../../core/utils";
import { BaseAdapter } from '../shared/BaseAdapter';
import { CapturedMessage, UnreadStatus } from '../../core/message-schema';

class SlackAdapter extends BaseAdapter {
  constructor() {
    super('Slack');
  }

  checkGlobalUnreadStatus(): boolean {
    const unreadBadge = document.querySelector('.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted)');
    return unreadBadge !== null;
  }

  extractVisibleMessages(): CapturedMessage[] {
    const messages: CapturedMessage[] = [];
    
    const messageNodes = document.querySelectorAll('.c-message_kit__message');
    
    messageNodes.forEach((node) => {
      const contentNode = node.querySelector('.c-message_kit__blocks');
      if (!contentNode) return;
      
      const content = (contentNode as HTMLElement).innerText || '';
      if (!content) return;

      const senderNode = node.querySelector('.c-message__sender .c-message__sender_button');
      const senderName = (senderNode as HTMLElement)?.innerText || 'Unknown';
      const isIncoming = senderName !== 'Me'; // Simplified check

      messages.push({
        id: crypto.randomUUID(),
        platform: this.platformName,
        conversationId: 'slack_active_channel',
        conversationName: document.querySelector('.p-view_header__channel_title')?.textContent || 'Unknown',
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

const adapter = new SlackAdapter();
adapter.init();
