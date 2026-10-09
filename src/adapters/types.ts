import type { CapturedMessage } from '../core/message-schema';

export interface PlatformAdapter {
  platformName: string;
  
  /**
   * Initialize the adapter and start observing the DOM
   */
  init(): void;
  
  /**
   * Stop observing and clean up
   */
  destroy(): void;
  
  /**
   * Extract messages currently visible on the screen
   */
  extractVisibleMessages(): CapturedMessage[];
  
  /**
   * Check if there are any global unread indicators
   */
  checkGlobalUnreadStatus(): boolean;
}
