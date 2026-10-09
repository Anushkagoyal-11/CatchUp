import type { CapturedMessage, AISummary } from '../core/message-schema';

export async function generateAISummary(messages: CapturedMessage[]): Promise<AISummary> {
  const config = await getOllamaConfig();
  const url = config.url || 'http://localhost:11434';
  const model = config.model || 'llama3.1';

  const schemaInstruction = `
    You must respond ONLY with a JSON object that strictly adheres to this schema:
    {
      "overview": "string",
      "actionItems": [{ "description": "string", "sourceIds": ["string"] }],
      "decisions": [{ "description": "string", "sourceIds": ["string"] }],
      "directRequests": [{ "description": "string", "sourceIds": ["string"] }],
      "deadlines": [{ "description": "string", "date": "string or null", "sourceIds": ["string"] }],
      "itemsToVerify": [{ "description": "string", "sourceIds": ["string"] }],
      "uncertainties": [{ "description": "string", "sourceIds": ["string"] }]
    }
  `;

  const prompt = `
    Analyze the following recent unread messages and provide a structured summary.
    Identify action items, decisions, direct requests, deadlines, and items needing verification.
    
    Messages:
    ${messages.map(m => `[ID: ${m.id}] [${m.platform}] ${m.senderName}: ${m.content}`).join('\n')}
  `;

  try {
    const response = await fetch(`${url}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: `You are an intelligent communication assistant. ${schemaInstruction}` },
          { role: 'user', content: prompt }
        ],
        stream: false,
        format: 'json'
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data.message.content;
    const parsed = JSON.parse(rawContent);
    
    // In a real app we'd validate with Zod here before returning
    return parsed as AISummary;
    
  } catch (err) {
    console.error('Failed to generate summary with Ollama', err);
    throw err;
  }
}

async function getOllamaConfig(): Promise<{ url: string | null, model: string | null }> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['ollama_url', 'ollama_model'], (result) => {
      resolve({
        url: result.ollama_url || null,
        model: result.ollama_model || null
      });
    });
  });
}
