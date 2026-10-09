import { z } from 'zod';

export enum UnreadStatus {
  UNREAD_CONFIRMED_BY_DOM = 'unread_confirmed_by_dom',
  UNREAD_SUSPECTED = 'unread_suspected',
  READ_INDICATOR_DETECTED = 'read_indicator_detected',
  UNKNOWN = 'unknown'
}

export enum PriorityLevel {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  UNKNOWN = 'Unknown'
}

export const CapturedMessageSchema = z.object({
  id: z.string(),
  platform: z.string(),
  conversationId: z.string().nullable(),
  conversationName: z.string().nullable(),
  senderId: z.string().nullable(),
  senderName: z.string().nullable(),
  timestamp: z.string().nullable(),
  capturedAt: z.string(),
  content: z.string(),
  contentType: z.string(),
  direction: z.enum(['incoming', 'outgoing', 'unknown']),
  accessibilityStatus: z.string(),
  unreadStatus: z.nativeEnum(UnreadStatus),
  unreadEvidence: z.string().nullable(),
  unreadConfidence: z.number().min(0).max(1),
  sourceUrl: z.string(),
  extractionMethod: z.string(),
  contentHash: z.string(),
  schemaVersion: z.number()
});

export type CapturedMessage = z.infer<typeof CapturedMessageSchema>;

export const AISummarySchema = z.object({
  overview: z.string(),
  actionItems: z.array(z.object({ description: z.string(), sourceIds: z.array(z.string()) })),
  decisions: z.array(z.object({ description: z.string(), sourceIds: z.array(z.string()) })),
  directRequests: z.array(z.object({ description: z.string(), sourceIds: z.array(z.string()) })),
  deadlines: z.array(z.object({ description: z.string(), date: z.string().nullable(), sourceIds: z.array(z.string()) })),
  itemsToVerify: z.array(z.object({ description: z.string(), sourceIds: z.array(z.string()) })),
  uncertainties: z.array(z.object({ description: z.string(), sourceIds: z.array(z.string()) }))
});

export type AISummary = z.infer<typeof AISummarySchema>;
