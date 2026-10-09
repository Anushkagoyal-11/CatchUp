# CatchUp AI Prompt Engineering

This document outlines the core prompts and system instructions used by the CatchUp AI Engine to summarize communication streams. 

The AI interactions are currently driven by a local LLM (e.g., Llama 3.1) via the Ollama API, allowing complete privacy for sensitive communication data.

---

## 1. System Instruction

The System Instruction primes the LLM for its role and rigidly enforces the expected output format. We use strict JSON formatting constraints because the output needs to be immediately mapped to our TypeScript schemas (`AISummary` interface).

**Role & Schema Definition:**
```text
You are an intelligent communication assistant. 

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
```

---

## 2. Dynamic User Prompt

The User Prompt is dynamically generated based on the active messages captured from the DOM (WhatsApp, Slack, etc.). The prompt injects contextual metadata (`platform`, `senderName`, `id`) into the text so the LLM can trace decisions and action items back to specific messages (using `sourceIds`).

**Template:**
```text
Analyze the following recent unread messages and provide a structured summary.
Identify action items, decisions, direct requests, deadlines, and items needing verification.

Messages:
[ID: <uuid>] [<Platform>] <Sender>: <Message Content>
[ID: <uuid>] [<Platform>] <Sender>: <Message Content>
...
```

**Example Instantiation:**
```text
Analyze the following recent unread messages and provide a structured summary.
Identify action items, decisions, direct requests, deadlines, and items needing verification.

Messages:
[ID: 1a2b3c] [WhatsApp] Alice: Did you finish the deployment script?
[ID: 4d5e6f] [WhatsApp] Alice: We need it by 5 PM tomorrow for the hackathon judging.
[ID: 7g8h9i] [WhatsApp] Bob: I'm almost done, just debugging a CORS issue.
```

---

## 3. Why This Structure?

1. **Deterministic UI Rendering:** By forcing a strict JSON schema, the frontend React Dashboard can map directly over `summary.actionItems` and `summary.deadlines` to render individual task cards.
2. **Context Traceability:** Injecting `sourceIds` allows us to eventually build features where clicking on an Action Item in the dashboard highlights the exact WhatsApp message that created it.
3. **Local Privacy:** The prompt is kept intentionally concise to ensure it runs quickly and efficiently on local, lower-parameter models (like `llama3.1:8b`) without requiring a cloud API key.
