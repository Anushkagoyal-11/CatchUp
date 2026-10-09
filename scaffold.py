import os

files = {
    "manifest.json": """{
  "manifest_version": 3,
  "name": "CatchUp Universal",
  "version": "1.0.0",
  "description": "AI-powered communication catch-up system.",
  "permissions": ["storage", "sidePanel"],
  "host_permissions": [
    "https://web.whatsapp.com/*",
    "https://web.telegram.org/*",
    "https://app.slack.com/*",
    "https://discord.com/*",
    "https://teams.microsoft.com/*",
    "https://mail.google.com/*"
  ],
  "background": {
    "service_worker": "src/background/service-worker.ts",
    "type": "module"
  },
  "side_panel": {
    "default_path": "src/sidepanel/index.html"
  },
  "options_ui": {
    "page": "src/options/index.html",
    "open_in_tab": true
  },
  "content_scripts": [
    {
      "matches": ["https://web.whatsapp.com/*"],
      "js": ["src/adapters/whatsapp/adapter.ts"]
    },
    {
      "matches": ["https://web.telegram.org/*"],
      "js": ["src/adapters/telegram/adapter.ts"]
    },
    {
      "matches": ["https://app.slack.com/*"],
      "js": ["src/adapters/slack/adapter.ts"]
    },
    {
      "matches": ["https://discord.com/*"],
      "js": ["src/adapters/discord/adapter.ts"]
    },
    {
      "matches": ["https://teams.microsoft.com/*"],
      "js": ["src/adapters/teams/adapter.ts"]
    },
    {
      "matches": ["https://mail.google.com/*"],
      "js": ["src/adapters/gmail/adapter.ts"]
    }
  ],
  "action": {
    "default_title": "Open CatchUp"
  }
}
""",
    "vite.config.ts": """import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
});
""",
    "tsconfig.json": """{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
""",
    "package.json": """{
  "name": "catchup",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.300.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@crxjs/vite-plugin": "^2.0.0-beta.21",
    "@types/chrome": "^0.0.254",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
""",
    "src/sidepanel/index.html": """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CatchUp Universal - Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/sidepanel/main.tsx"></script>
  </body>
</html>
""",
    "src/sidepanel/main.tsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""",
    "src/sidepanel/App.tsx": """import React from 'react'

export default function App() {
  return (
    <div>
      <h1>CatchUp Universal Dashboard</h1>
    </div>
  )
}
""",
    "src/options/index.html": """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CatchUp Universal - Settings</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/options/main.tsx"></script>
  </body>
</html>
""",
    "src/options/main.tsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import Settings from './Settings'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>,
)
""",
    "src/options/Settings.tsx": """import React from 'react'

export default function Settings() {
  return (
    <div>
      <h1>CatchUp Universal Settings</h1>
    </div>
  )
}
""",
    "src/background/service-worker.ts": """chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  console.log("CatchUp Universal installed");
});
"""
}

for filepath, content in files.items():
    with open(filepath, 'w') as f:
        f.write(content)
