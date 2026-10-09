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
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      // In Extension Mode, proxy the request through the background script to completely bypass CORS
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
          type: 'GENERATE_SUMMARY',
          payload: { messages, config }
        }, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(`Chrome extension error: ${chrome.runtime.lastError.message}`));
          } else if (response && response.success) {
            resolve(response.summary as AISummary);
          } else {
            reject(new Error(response?.error || 'Unknown error from background script'));
          }
        });
      });
    } else {
      // Web Demo Mode (Netlify) - we must make the fetch request directly from the browser.
      // This requires the user to have configured OLLAMA_ORIGINS="*" when starting Ollama.
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
      return JSON.parse(data.message.content) as AISummary;
    }
  } catch (err) {
    console.warn('Failed to generate summary with Ollama, falling back to mock summary for testing.', err);
    // Fallback Mock Summary so the app never totally crashes in demos
    return {
      overview: "Mock Summary: Your Ollama server is currently unreachable. Please start it with `ollama serve`.",
      actionItems: [{ description: "Start local Ollama server", sourceIds: [] }],
      decisions: [],
      directRequests: [],
      deadlines: [],
      itemsToVerify: [],
      uncertainties: [{ description: "Unable to reach AI provider", sourceIds: [] }]
    };
  }
}

async function getOllamaConfig(): Promise<{ url: string | null, model: string | null }> {
  return new Promise((resolve) => {
    if (typeof chrome === 'undefined' || !chrome.storage) {
      // Return defaults if running in web mode (Netlify/Vercel)
      resolve({ url: 'http://localhost:11434', model: 'llama3.1' });
      return;
    }
    
    chrome.storage.sync.get(['ollama_url', 'ollama_model'], (result) => {
      resolve({
        url: result.ollama_url || null,
        model: result.ollama_model || null
      });
    });
  });
}
