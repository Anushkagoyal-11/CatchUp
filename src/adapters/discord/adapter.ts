import { generateContentHash } from "../../core/utils";
import { BaseAdapter } from '../shared/BaseAdapter';
import { CapturedMessage, UnreadStatus } from '../../core/message-schema';

class DiscordAdapter extends BaseAdapter {
  constructor() {
    super('Discord');
  }

  checkGlobalUnreadStatus(): boolean {
    const unreadBadge = document.querySelector('[class*="unreadMentionsIndicator"], [class*="unread-"]');
    return unreadBadge !== null;
  }

  extractVisibleMessages(): CapturedMessage[] {
    const messages: CapturedMessage[] = [];
    
    const messageNodes = document.querySelectorAll('[class*="messageListItem-"]');
    
    messageNodes.forEach((node) => {
      const contentNode = node.querySelector('[id^="message-content-"]');
      if (!contentNode) return;
      
      const content = (contentNode as HTMLElement).innerText || '';
      if (!content) return;

      const senderNode = node.querySelector('[id^="message-username-"]');
      const senderName = (senderNode as HTMLElement)?.innerText || 'Unknown';
      const isIncoming = senderName !== 'Me';

      messages.push({
        id: crypto.randomUUID(),
        platform: this.platformName,
        conversationId: 'discord_active_channel',
        conversationName: document.querySelector('[class*="titleWrapper-"] h1')?.textContent || 'Unknown',
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

const adapter = new DiscordAdapter();
adapter.init();
