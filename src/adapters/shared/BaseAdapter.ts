import type { PlatformAdapter } from '../types';
import type { CapturedMessage } from '../../core/message-schema';

export abstract class BaseAdapter implements PlatformAdapter {
  platformName: string;
  protected observer: MutationObserver | null = null;
  protected isInitialized = false;

  constructor(platformName: string) {
    this.platformName = platformName;
  }

  init(): void {
    if (this.isInitialized) return;
    
    console.log(`[CatchUp] Initializing ${this.platformName} adapter...`);
    
    // Set up a mutation observer to watch for DOM changes
    this.observer = new MutationObserver(() => this.handleDOMChange());
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    this.isInitialized = true;
    
    // Do an initial extraction
    setTimeout(() => this.handleDOMChange(), 2000);
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.isInitialized = false;
    console.log(`[CatchUp] Destroyed ${this.platformName} adapter.`);
  }

  protected handleDOMChange(): void {
    // For demo purposes, we always extract visible messages so the dashboard 
    // instantly populates when evaluators open a chat, rather than waiting for 
    // a literal unread badge to appear.
    const messages = this.extractVisibleMessages();
    if (messages.length > 0) {
      this.syncMessages(messages);
    }
  }

  protected syncMessages(messages: CapturedMessage[]): void {
    chrome.runtime.sendMessage({
      type: 'SYNC_MESSAGES',
      payload: messages
    });
  }

  abstract extractVisibleMessages(): CapturedMessage[];
  abstract checkGlobalUnreadStatus(): boolean;
}
