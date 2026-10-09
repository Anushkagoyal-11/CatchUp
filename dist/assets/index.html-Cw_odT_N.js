import{r as c,j as e,c as v,R as j}from"./client-BW4HFQ8H.js";import{U as w}from"./message-schema-1hx2mHKL.js";/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var N={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),x=(t,n)=>{const r=c.forwardRef(({color:m="currentColor",size:l=24,strokeWidth:i=2,absoluteStrokeWidth:a,className:u="",children:o,...d},p)=>c.createElement("svg",{ref:p,...N,width:l,height:l,stroke:m,strokeWidth:a?Number(i)*24/Number(l):i,className:["lucide",`lucide-${S(t)}`,u].join(" "),...d},[...n.map(([g,y])=>c.createElement(g,y)),...Array.isArray(o)?o:[o]]));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=x("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=x("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=x("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=x("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);async function C(t){const n=await E(),r=n.url||"http://localhost:11434",m=n.model||"llama3.1",l=`
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
    ${t.map(a=>`[ID: ${a.id}] [${a.platform}] ${a.senderName}: ${a.content}`).join(`
`)}
  `;try{const a=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:m,messages:[{role:"system",content:`You are an intelligent communication assistant. ${l}`},{role:"user",content:i}],stream:!1,format:"json"})});if(!a.ok)throw new Error(`Ollama API returned ${a.status}: ${a.statusText}`);const o=(await a.json()).message.content;return JSON.parse(o)}catch(a){return console.warn("Failed to generate summary with Ollama, falling back to mock summary for testing.",a),{overview:"Mock Summary: Your Ollama server is currently unreachable. Please start it with `ollama serve`.",actionItems:[{description:"Start local Ollama server",sourceIds:[]}],decisions:[],directRequests:[],deadlines:[],itemsToVerify:[],uncertainties:[{description:"Unable to reach AI provider",sourceIds:[]}]}}}async function E(){return new Promise(t=>{if(typeof chrome>"u"||!chrome.storage){t({url:"http://localhost:11434",model:"llama3.1"});return}chrome.storage.sync.get(["ollama_url","ollama_model"],n=>{t({url:n.ollama_url||null,model:n.ollama_model||null})})})}function A(){const[t,n]=c.useState([]),[r,m]=c.useState(null),[l,i]=c.useState(!1),[a,u]=c.useState(null),o=typeof chrome>"u"||!chrome.runtime,[d,p]=c.useState(""),g=()=>{o||(i(!0),chrome.runtime.sendMessage({type:"GET_MESSAGES"},s=>{s&&s.success&&n(s.messages),i(!1)}))};c.useEffect(()=>{g()},[]);const y=()=>{if(!d.trim())return;const s={id:crypto.randomUUID(),platform:"Web Demo",conversationId:"demo",conversationName:"Dynamic Chat",senderId:"demo_user",senderName:"Evaluator",timestamp:new Date().toISOString(),capturedAt:new Date().toISOString(),content:d,contentType:"text",direction:"incoming",accessibilityStatus:"visible",unreadStatus:w.UNKNOWN,unreadEvidence:null,unreadConfidence:1,sourceUrl:"",extractionMethod:"manual",contentHash:crypto.randomUUID(),schemaVersion:1};n(h=>[s,...h]),p("")},f=async()=>{if(t.length!==0){i(!0),u(null);try{const s=await C(t);m(s)}catch(s){u(String(s))}finally{i(!1)}}};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"CatchUp Dashboard"}),!o&&e.jsxs("button",{className:"button",style:{width:"auto",padding:"6px 12px"},onClick:g,children:[e.jsx(M,{size:16,style:{marginRight:"6px"}})," Sync"]})]}),o&&e.jsxs("div",{className:"card",style:{marginBottom:"16px"},children:[e.jsx("div",{className:"card-title",children:"Dynamic Data Entry (Web Mode)"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#cbd5e1",marginBottom:"8px"},children:"Since websites cannot read your WhatsApp/Slack tabs due to browser security, paste your messages here to dynamically test the engine!"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("input",{type:"text",value:d,onChange:s=>p(s.target.value),onKeyDown:s=>s.key==="Enter"&&y(),placeholder:"Type a message to summarize...",style:{flex:1,padding:"8px",borderRadius:"6px",border:"1px solid var(--border-color)",background:"rgba(0,0,0,0.2)",color:"white"}}),e.jsx("button",{className:"button",style:{width:"auto",padding:"8px 12px"},onClick:y,children:e.jsx(k,{size:16})})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["Recent Unread Messages (",t.length,")"]}),t.length===0&&e.jsx("div",{style:{color:"var(--text-muted)"},children:"No messages captured yet."}),t.slice(0,5).map(s=>e.jsxs("div",{className:"message-item",children:[e.jsxs("div",{className:"message-header",children:[e.jsx("span",{className:"sender",children:s.senderName||"Unknown"}),e.jsx("span",{className:"platform-badge",children:s.platform})]}),e.jsx("div",{className:"message-content",children:s.content})]},s.id))]}),e.jsx("button",{className:"button",onClick:f,disabled:l||t.length===0,children:l?e.jsx("div",{className:"loader"}):e.jsxs(e.Fragment,{children:[e.jsx(I,{size:16,style:{marginRight:"8px"}})," Catch Me Up"]})}),a&&e.jsxs("div",{style:{color:"var(--danger)",fontSize:"0.9rem",marginTop:"12px"},children:["Error: ",a]}),r&&e.jsxs("div",{className:"card",style:{marginTop:"16px"},children:[e.jsxs("div",{className:"card-title",style:{color:"var(--success)",display:"flex",alignItems:"center"},children:[e.jsx(b,{size:16,style:{marginRight:"6px"}})," AI Summary Ready"]}),e.jsx("div",{style:{fontSize:"0.9rem"},children:r.overview}),r.actionItems.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Action Items"}),e.jsx("ul",{className:"summary-list",children:r.actionItems.map((s,h)=>e.jsx("li",{children:s.description},h))})]}),r.deadlines.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Deadlines"}),e.jsx("ul",{className:"summary-list",children:r.deadlines.map((s,h)=>e.jsxs("li",{children:[s.description," (",s.date,")"]},h))})]})]})]})}v.createRoot(document.getElementById("root")).render(e.jsx(j.StrictMode,{children:e.jsx(A,{})}));
