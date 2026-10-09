export function generateContentHash(content: string): string {
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash) + content.charCodeAt(i); /* hash * 33 + c */
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}
