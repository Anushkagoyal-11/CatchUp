# CatchUp Universal Chrome Extension

## ROLE AND MISSION
Act as a principal software engineer specializing in Chrome Extensions, TypeScript, browser security, AI applications, frontend engineering, and automated testing.
Build CatchUp Universal, a robust AI-powered communication catch-up system delivered as a Chrome Extension using Manifest V3.

## 1. PRODUCT VISION
People use multiple communication platforms throughout the day. Important decisions, deadlines, requests, meeting updates, and action items become scattered across conversations.
CatchUp Universal provides one dashboard that helps users understand what they missed and what they need to do.

The product answers:
- What happened across my accessible conversations?
- Which items have a verified or suspected unread indicator?
- What requires my attention?
- What decisions were made?
- What tasks were assigned to me?
- What deadlines were explicitly mentioned?
- Which messages require a reply or verification?
- Which items are uncertain and require human review?

The extension distinguishes actual extracted facts from AI inferences.

## 2. TARGET PLATFORMS
Implement platform-specific integrations for:
- WhatsApp Web — https://web.whatsapp.com/
- Telegram Web — https://web.telegram.org/
- Slack — https://app.slack.com/
- Discord — https://discord.com/
- Microsoft Teams — https://teams.microsoft.com/
- Gmail — https://mail.google.com/

## 3. ARCHITECTURE OVERVIEW
- **Manifest V3 Core**: Use service workers, declarativeNetRequest (if needed), and content scripts.
- **Content Scripts (Adapters)**: DOM observers that extract data from each messaging platform safely without disrupting the user experience.
- **Background Worker**: Central message router and state manager.
- **Local Storage Database**: Deduplicates and safely stores extracted unread messages.
- **Side Panel UI (React/Vite)**: A persistent dashboard built with React, Vite, TypeScript, and premium CSS styling.
- **AI Processing (Ollama)**: Local AI summarization pipeline querying Ollama (llama3.1) at `http://localhost:11434` to ensure privacy and avoid API costs.
- **Strict Zod Schemas**: Guarantees type safety for captured messages and AI summary structures.

## 4. CURRENT STATE
- Built with Vite, React, and TypeScript (`@crxjs/vite-plugin`).
- Secure Options page for AI model configuration.
- Vitest test suite for schema validation.
- Deployed locally to the Chrome Browser.
