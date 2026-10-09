import { BaseAdapter } from '../shared/BaseAdapter';
import { CapturedMessage, UnreadStatus } from '../../core/message-schema';

class GmailAdapter extends BaseAdapter {
  constructor() {
    super('Gmail');
  }

  checkGlobalUnreadStatus(): boolean {
    const unreadInbox = document.querySelector('.bsU');
    return unreadInbox !== null && parseInt(unreadInbox.textContent || '0') > 0;
  }

  extractVisibleMessages(): CapturedMessage[] {
    const messages: CapturedMessage[] = [];
    
    // Simplistic extraction of unread email rows in inbox
    const messageNodes = document.querySelectorAll('tr.zE'); // .zE is unread row
    
    messageNodes.forEach((node) => {
      const senderNode = node.querySelector('.yW span');
      const subjectNode = node.querySelector('.bog span');
      const snippetNode = node.querySelector('.y2');
      
      const senderName = (senderNode as HTMLElement)?.innerText || 'Unknown';
      const subject = (subjectNode as HTMLElement)?.innerText || '';
      const snippet = (snippetNode as HTMLElement)?.innerText || '';
      
      const content = `${subject}\n${snippet}`;

      messages.push({
        id: crypto.randomUUID(),
        platform: this.platformName,
        conversationId: 'gmail_inbox',
        conversationName: 'Inbox',
        senderId: 'unknown',
        senderName,
        timestamp: new Date().toISOString(),
        capturedAt: new Date().toISOString(),
        content,
        contentType: 'text',
        direction: 'incoming',
        accessibilityStatus: 'visible',
        unreadStatus: UnreadStatus.UNREAD_CONFIRMED_BY_DOM,
        unreadEvidence: 'Has .zE unread row class',
        unreadConfidence: 0.9,
        sourceUrl: window.location.href,
        extractionMethod: 'dom_scraping',
        contentHash: btoa(unescape(encodeURIComponent(content))).substring(0, 32),
        schemaVersion: 1
      });
    });

    return messages;
  }
}

const adapter = new GmailAdapter();
adapter.init();
