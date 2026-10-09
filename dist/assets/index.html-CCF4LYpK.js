import{r as l,j as e,c as v,R as f}from"./client-BW4HFQ8H.js";import{U as g}from"./message-schema-1hx2mHKL.js";/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var x={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),p=(n,r)=>{const a=l.forwardRef(({color:d="currentColor",size:o=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:m="",children:c,...h},t)=>l.createElement("svg",{ref:t,...x,width:o,height:o,stroke:d,strokeWidth:s?Number(i)*24/Number(o):i,className:["lucide",`lucide-${S(n)}`,m].join(" "),...h},[...r.map(([u,y])=>l.createElement(u,y)),...Array.isArray(c)?c:[c]]));return a.displayName=`${n}`,a};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=p("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=p("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=p("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);async function I(n){const r=await k(),a=r.url||"http://localhost:11434",d=r.model||"llama3.1",o=`
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
  `,i=`
    Analyze the following recent unread messages and provide a structured summary.
    Identify action items, decisions, direct requests, deadlines, and items needing verification.
    
    Messages:
    ${n.map(s=>`[ID: ${s.id}] [${s.platform}] ${s.senderName}: ${s.content}`).join(`
`)}
  `;try{const s=await fetch(`${a}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:d,messages:[{role:"system",content:`You are an intelligent communication assistant. ${o}`},{role:"user",content:i}],stream:!1,format:"json"})});if(!s.ok)throw new Error(`Ollama API returned ${s.status}: ${s.statusText}`);const c=(await s.json()).message.content;return JSON.parse(c)}catch(s){return console.warn("Failed to generate summary with Ollama, falling back to mock summary for testing.",s),{overview:"Mock Summary: Your Ollama server is currently unreachable. Please start it with `ollama serve`.",actionItems:[{description:"Start local Ollama server",sourceIds:[]}],decisions:[],directRequests:[],deadlines:[],itemsToVerify:[],uncertainties:[{description:"Unable to reach AI provider",sourceIds:[]}]}}}async function k(){return new Promise(n=>{chrome.storage.sync.get(["ollama_url","ollama_model"],r=>{n({url:r.ollama_url||null,model:r.ollama_model||null})})})}function b(){const[n,r]=l.useState([]),[a,d]=l.useState(null),[o,i]=l.useState(!1),[s,m]=l.useState(null),c=()=>{if(i(!0),typeof chrome>"u"||!chrome.runtime){setTimeout(()=>{r([{id:"1",platform:"Slack",conversationId:"c1",conversationName:"#engineering",senderId:"u1",senderName:"Alice (Manager)",timestamp:new Date().toISOString(),capturedAt:new Date().toISOString(),content:"We need the final presentation slides submitted by 3 PM today. Please review the current deck and leave comments.",contentType:"text",direction:"incoming",accessibilityStatus:"visible",unreadStatus:g.UNKNOWN,unreadEvidence:null,unreadConfidence:1,sourceUrl:"",extractionMethod:"mock",contentHash:"1",schemaVersion:1},{id:"2",platform:"WhatsApp",conversationId:"c2",conversationName:"Design Sync",senderId:"u2",senderName:"Bob (Designer)",timestamp:new Date().toISOString(),capturedAt:new Date().toISOString(),content:"I updated the UI mockups. It looks much better now. Did you guys approve the new layout?",contentType:"text",direction:"incoming",accessibilityStatus:"visible",unreadStatus:g.UNKNOWN,unreadEvidence:null,unreadConfidence:1,sourceUrl:"",extractionMethod:"mock",contentHash:"2",schemaVersion:1},{id:"3",platform:"Discord",conversationId:"c3",conversationName:"Gaming Buddies",senderId:"u3",senderName:"Charlie",timestamp:new Date().toISOString(),capturedAt:new Date().toISOString(),content:"Are we still on for tonight at 8 PM?",contentType:"text",direction:"incoming",accessibilityStatus:"visible",unreadStatus:g.UNKNOWN,unreadEvidence:null,unreadConfidence:1,sourceUrl:"",extractionMethod:"mock",contentHash:"3",schemaVersion:1}]),i(!1)},500);return}chrome.runtime.sendMessage({type:"GET_MESSAGES"},t=>{t&&t.success&&r(t.messages),i(!1)})};l.useEffect(()=>{c()},[]);const h=async()=>{if(n.length!==0){i(!0),m(null);try{const t=await I(n);d(t)}catch(t){m(String(t))}finally{i(!1)}}};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"CatchUp Dashboard"}),e.jsxs("button",{className:"button",style:{width:"auto",padding:"6px 12px"},onClick:c,children:[e.jsx(w,{size:16,style:{marginRight:"6px"}})," Sync"]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["Recent Unread Messages (",n.length,")"]}),n.length===0&&e.jsx("div",{style:{color:"var(--text-muted)"},children:"No recent messages captured."}),n.slice(0,5).map(t=>e.jsxs("div",{className:"message-item",children:[e.jsxs("div",{className:"message-header",children:[e.jsx("span",{className:"sender",children:t.senderName||"Unknown"}),e.jsx("span",{className:"platform-badge",children:t.platform})]}),e.jsx("div",{className:"message-content",children:t.content})]},t.id))]}),e.jsx("button",{className:"button",onClick:h,disabled:o||n.length===0,children:o?e.jsx("div",{className:"loader"}):e.jsxs(e.Fragment,{children:[e.jsx(j,{size:16,style:{marginRight:"8px"}})," Catch Me Up"]})}),s&&e.jsxs("div",{style:{color:"var(--danger)",fontSize:"0.9rem"},children:["Error: ",s]}),a&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",style:{color:"var(--success)",display:"flex",alignItems:"center"},children:[e.jsx(N,{size:16,style:{marginRight:"6px"}})," AI Summary Ready"]}),e.jsx("div",{style:{fontSize:"0.9rem"},children:a.overview}),a.actionItems.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Action Items"}),e.jsx("ul",{className:"summary-list",children:a.actionItems.map((t,u)=>e.jsx("li",{children:t.description},u))})]}),a.deadlines.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Deadlines"}),e.jsx("ul",{className:"summary-list",children:a.deadlines.map((t,u)=>e.jsxs("li",{children:[t.description," (",t.date,")"]},u))})]})]})]})}v.createRoot(document.getElementById("root")).render(e.jsx(f.StrictMode,{children:e.jsx(b,{})}));
