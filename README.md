# CatchUp Universal 🚀

CatchUp Universal is a robust, privacy-first, AI-powered Chrome Extension designed to unify your scattered communication. Instead of constantly context-switching between WhatsApp, Slack, Teams, Telegram, Discord, and Gmail, CatchUp continuously extracts unread messages in the background and uses local AI to generate actionable summaries, deadlines, and decisions.

## 🌟 Key Features
- **Universal Platform Support**: Works seamlessly across WhatsApp Web, Telegram Web, Slack, Discord, Microsoft Teams, and Gmail.
- **100% Local & Private AI**: Integrates directly with Ollama (`llama3.1`) running locally on your machine. Your private messages never leave your computer.
- **Smart Summarization**: Extracts Action Items, Decisions, Direct Requests, and Deadlines securely using strict Zod schemas.
- **Manifest V3 Compliant**: Built using the latest Chrome Extension standards with secure Service Workers and scoped DOM Observers.
- **Sleek Dark Mode UI**: A premium, responsive React side-panel interface with micro-animations.

## 🛠️ Architecture
- **Frontend**: React 18, TypeScript, Vite, Lucide-React.
- **Background**: Chrome Service Workers (Manifest V3).
- **Data Layer**: Chrome Local Storage + Sync Storage.
- **AI Engine**: Local Ollama (compatible with OpenAI format).
- **Validation**: Zod (Strict schema enforcement).

## 🚀 Installation & Setup
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile the extension.
4. Open Chrome and navigate to `chrome://extensions/`.
5. Enable **Developer mode** in the top right corner.
6. Click **Load unpacked** and select the generated `dist` folder.
7. Ensure [Ollama](https://ollama.com/) is installed and running on your system (`ollama run llama3.1`).

## 🛡️ Security & Privacy
CatchUp is designed with absolute privacy in mind:
- **No Cloud Servers**: All message extraction happens locally in your browser.
- **Strict Content Security Policy**: The extension only injects scripts into designated messaging URLs.
- **Prompt Injection Defense**: All AI outputs are strictly parsed and validated through Zod schemas before rendering.

## 📝 License
MIT License. See LICENSE file for details.
