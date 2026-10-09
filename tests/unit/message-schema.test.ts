import { describe, it, expect } from 'vitest';
import { CapturedMessageSchema, UnreadStatus } from '../../src/core/message-schema';

describe('CapturedMessageSchema', () => {
  it('validates a correct message payload', () => {
    const validMessage = {
      id: '123',
      platform: 'WhatsApp',
      conversationId: 'chat_1',
      conversationName: 'Team Sync',
      senderId: 'user_2',
      senderName: 'Alice',
      timestamp: new Date().toISOString(),
      capturedAt: new Date().toISOString(),
      content: 'Hello team!',
      contentType: 'text',
      direction: 'incoming',
      accessibilityStatus: 'visible',
      unreadStatus: UnreadStatus.UNREAD_CONFIRMED_BY_DOM,
      unreadEvidence: 'Has unread dot',
      unreadConfidence: 0.9,
      sourceUrl: 'https://web.whatsapp.com',
      extractionMethod: 'dom_scraping',
      contentHash: 'hash123',
      schemaVersion: 1
    };

    const result = CapturedMessageSchema.safeParse(validMessage);
    expect(result.success).toBe(true);
  });

  it('fails if required fields are missing', () => {
    const invalidMessage = {
      platform: 'WhatsApp'
    };

    const result = CapturedMessageSchema.safeParse(invalidMessage);
    expect(result.success).toBe(false);
  });

  it('fails if confidence is out of bounds', () => {
    const invalidMessage = {
      id: '123',
      platform: 'WhatsApp',
      conversationId: null,
      conversationName: null,
      senderId: null,
      senderName: 'Alice',
      timestamp: null,
      capturedAt: new Date().toISOString(),
      content: 'Hello',
      contentType: 'text',
      direction: 'incoming',
      accessibilityStatus: 'visible',
      unreadStatus: UnreadStatus.UNKNOWN,
      unreadEvidence: null,
      unreadConfidence: 1.5, // Invalid, max is 1
      sourceUrl: 'https://web.whatsapp.com',
      extractionMethod: 'dom_scraping',
      contentHash: 'hash',
      schemaVersion: 1
    };

    const result = CapturedMessageSchema.safeParse(invalidMessage);
    expect(result.success).toBe(false);
  });
});
