import { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw, CheckCircle2 } from 'lucide-react';
import type { CapturedMessage, AISummary } from '../core/message-schema';
import { generateAISummary } from '../ai/client';
import './index.css';

export default function App() {
  const [messages, setMessages] = useState<CapturedMessage[]>([]);
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = () => {
    setLoading(true);
    // If running on the web instead of Chrome Extension
    if (typeof chrome === 'undefined' || !chrome.runtime) {
      setTimeout(() => {
        setMessages([
          {
            id: '1', platform: 'Slack', conversationId: 'c1', conversationName: '#engineering', senderId: 'u1', senderName: 'Alice (Manager)', timestamp: new Date().toISOString(), capturedAt: new Date().toISOString(), content: 'We need the final presentation slides submitted by 3 PM today. Please review the current deck and leave comments.', contentType: 'text', direction: 'incoming', accessibilityStatus: 'visible', unreadStatus: 1, unreadEvidence: null, unreadConfidence: 1, sourceUrl: '', extractionMethod: 'mock', contentHash: '1', schemaVersion: 1
          },
          {
            id: '2', platform: 'WhatsApp', conversationId: 'c2', conversationName: 'Design Sync', senderId: 'u2', senderName: 'Bob (Designer)', timestamp: new Date().toISOString(), capturedAt: new Date().toISOString(), content: 'I updated the UI mockups. It looks much better now. Did you guys approve the new layout?', contentType: 'text', direction: 'incoming', accessibilityStatus: 'visible', unreadStatus: 1, unreadEvidence: null, unreadConfidence: 1, sourceUrl: '', extractionMethod: 'mock', contentHash: '2', schemaVersion: 1
          },
          {
            id: '3', platform: 'Discord', conversationId: 'c3', conversationName: 'Gaming Buddies', senderId: 'u3', senderName: 'Charlie', timestamp: new Date().toISOString(), capturedAt: new Date().toISOString(), content: 'Are we still on for tonight at 8 PM?', contentType: 'text', direction: 'incoming', accessibilityStatus: 'visible', unreadStatus: 1, unreadEvidence: null, unreadConfidence: 1, sourceUrl: '', extractionMethod: 'mock', contentHash: '3', schemaVersion: 1
          }
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    chrome.runtime.sendMessage({ type: 'GET_MESSAGES' }, (response) => {
      if (response && response.success) {
        setMessages(response.messages);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
        <button className="button" style={{ width: 'auto', padding: '6px 12px' }} onClick={fetchMessages}>
          <RefreshCw size={16} style={{ marginRight: '6px' }} /> Sync
        </button>
      </div>

      <div className="card">
        <div className="card-title">Recent Unread Messages ({messages.length})</div>
        {messages.length === 0 && <div style={{ color: 'var(--text-muted)' }}>No recent messages captured.</div>}
        
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

      {error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>Error: {error}</div>}

      {summary && (
        <div className="card">
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
