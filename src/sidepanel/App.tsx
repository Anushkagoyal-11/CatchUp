import { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw, CheckCircle2, Plus, Upload } from 'lucide-react';
import { CapturedMessage, AISummary, UnreadStatus } from '../core/message-schema';
import { generateAISummary } from '../ai/client';
import './index.css';

export default function App() {
  const [messages, setMessages] = useState<CapturedMessage[]>([]);
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // For Web Demo dynamic input
  const isWebMode = typeof chrome === 'undefined' || !chrome.runtime;
  const [demoInput, setDemoInput] = useState('');

  const fetchMessages = () => {
    if (isWebMode) return; // In web mode, we rely on manual input
    
    setLoading(true);
    chrome.runtime.sendMessage({ type: 'GET_MESSAGES' }, (response) => {
      if (chrome.runtime.lastError) {
        setError(`Chrome extension error: ${chrome.runtime.lastError.message}`);
      } else if (response && response.success) {
        setMessages(response.messages);
      } else if (response && response.error) {
        setError(`Failed to sync: ${response.error}`);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleAddDemoMessage = () => {
    if (!demoInput.trim()) return;
    
    addManualMessage(demoInput);
    setDemoInput('');
  };

  const addManualMessage = (text: string, source: string = 'Evaluator') => {
    const newMsg: CapturedMessage = {
      id: crypto.randomUUID(),
      platform: 'Web Demo',
      conversationId: 'demo',
      conversationName: 'Dynamic Chat',
      senderId: 'demo_user',
      senderName: source,
      timestamp: new Date().toISOString(),
      capturedAt: new Date().toISOString(),
      content: text,
      contentType: 'text',
      direction: 'incoming',
      accessibilityStatus: 'visible',
      unreadStatus: UnreadStatus.UNKNOWN,
      unreadEvidence: null,
      unreadConfidence: 1,
      sourceUrl: '',
      extractionMethod: 'manual',
      contentHash: crypto.randomUUID(),
      schemaVersion: 1
    };
    
    setMessages(prev => [newMsg, ...prev]);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (file.name.endsWith('.zip')) {
        const JSZip = (await import('jszip')).default;
        const zip = await JSZip.loadAsync(file);
        
        let foundTxt = false;
        for (const [filename, fileData] of Object.entries(zip.files)) {
          if (filename.endsWith('.txt')) {
            const text = await fileData.async('string');
            // Add chunks or lines
            const lines = text.split('\n').filter(l => l.trim().length > 0).slice(-20); // last 20 lines for demo
            addManualMessage(`[From ZIP ${filename}]:\n${lines.join('\n')}`, 'ZIP Upload');
            foundTxt = true;
          }
        }
        if (!foundTxt) setError('No .txt files found inside the ZIP.');
      } else if (file.name.endsWith('.txt')) {
        const text = await file.text();
        const lines = text.split('\n').filter(l => l.trim().length > 0).slice(-20);
        addManualMessage(`[From TXT]:\n${lines.join('\n')}`, 'TXT Upload');
      } else {
        setError('Please upload a .zip or .txt file');
      }
    } catch (err) {
      setError(`Failed to process file: ${err}`);
    }
  };

  const handleGenerateSummary = async () => {
    if (messages.length === 0) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await generateAISummary(messages);
      setSummary(result);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>CatchUp Dashboard</h1>
        {!isWebMode && (
          <button className="button" style={{ width: 'auto', padding: '6px 12px' }} onClick={fetchMessages}>
            <RefreshCw size={16} style={{ marginRight: '6px' }} /> Sync
          </button>
        )}
      </div>

      {isWebMode && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <div className="card-title">Dynamic Data Entry (Web Mode)</div>
          <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px' }}>
            Since websites cannot read your WhatsApp/Slack tabs due to browser security, paste your messages here to dynamically test the engine!
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddDemoMessage()}
              placeholder="Type a message to summarize..."
              style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
            />
            <button className="button" style={{ width: 'auto', padding: '8px 12px' }} onClick={handleAddDemoMessage}>
              <Plus size={16} />
            </button>
            <label className="button" style={{ width: 'auto', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Upload size={16} />
              <input type="file" accept=".zip,.txt" style={{ display: 'none' }} onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Recent Unread Messages ({messages.length})</div>
        {messages.length === 0 && <div style={{ color: 'var(--text-muted)' }}>No messages captured yet.</div>}
        
        {messages.slice(0, 5).map(msg => (
          <div key={msg.id} className="message-item">
            <div className="message-header">
              <span className="sender">{msg.senderName || 'Unknown'}</span>
              <span className="platform-badge">{msg.platform}</span>
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <button 
        className="button" 
        onClick={handleGenerateSummary}
        disabled={loading || messages.length === 0}
      >
        {loading ? <div className="loader" /> : <><MessageSquare size={16} style={{ marginRight: '8px' }}/> Catch Me Up</>}
      </button>

      {error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem', marginTop: '12px' }}>Error: {error}</div>}

      {summary && (
        <div className="card" style={{ marginTop: '16px' }}>
          <div className="card-title" style={{ color: 'var(--success)', display: 'flex', alignItems: 'center' }}>
            <CheckCircle2 size={16} style={{ marginRight: '6px' }} /> AI Summary Ready
          </div>
          <div style={{ fontSize: '0.9rem' }}>{summary.overview}</div>
          
          {summary.actionItems.length > 0 && (
            <div className="summary-section">
              <h3>Action Items</h3>
              <ul className="summary-list">
                {summary.actionItems.map((item, idx) => <li key={idx}>{item.description}</li>)}
              </ul>
            </div>
          )}

          {summary.deadlines.length > 0 && (
            <div className="summary-section">
              <h3>Deadlines</h3>
              <ul className="summary-list">
                {summary.deadlines.map((item, idx) => <li key={idx}>{item.description} ({item.date})</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
