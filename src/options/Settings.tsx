import { useState, useEffect } from 'react';
import './index.css';

export default function Settings() {
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [ollamaModel, setOllamaModel] = useState('llama3.1');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['ollama_url', 'ollama_model'], (result) => {
      if (result.ollama_url) setOllamaUrl(result.ollama_url);
      if (result.ollama_model) setOllamaModel(result.ollama_model);
    });
  }, []);

  const handleSave = () => {
    chrome.storage.sync.set({ 
      ollama_url: ollamaUrl,
      ollama_model: ollamaModel 
    }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <div className="container">
      <h1>CatchUp Settings</h1>
      
      <div className="card">
        <div className="form-group">
          <label htmlFor="ollamaUrl">Local Ollama API URL</label>
          <input
            id="ollamaUrl"
            type="text"
            value={ollamaUrl}
            onChange={(e) => setOllamaUrl(e.target.value)}
            placeholder="http://localhost:11434"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ollamaModel">Local Model Name</label>
          <input
            id="ollamaModel"
            type="text"
            value={ollamaModel}
            onChange={(e) => setOllamaModel(e.target.value)}
            placeholder="llama3.1"
          />
          <div className="help-text">
            Ensure you have Ollama installed and the model downloaded (e.g., run `ollama run llama3.1` in your terminal). Your data stays 100% locally on your machine.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="button" onClick={handleSave}>
            Save Configuration
          </button>
          
          <button 
            className="button" 
            style={{ backgroundColor: 'var(--danger)' }}
            onClick={() => chrome.storage.local.remove('catchup_messages', () => alert('Messages cleared!'))}
          >
            Clear Data
          </button>
        </div>

        {saved && <div className="toast">Settings saved successfully!</div>}
      </div>
    </div>
  );
}
