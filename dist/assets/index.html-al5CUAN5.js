import{r as l,j as e,c as y,R as x}from"./client-BW4HFQ8H.js";/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var j={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),g=(a,n)=>{const r=l.forwardRef(({color:d="currentColor",size:c=24,strokeWidth:i=2,absoluteStrokeWidth:t,className:m="",children:o,...u},s)=>l.createElement("svg",{ref:s,...j,width:c,height:c,stroke:d,strokeWidth:t?Number(i)*24/Number(c):i,className:["lucide",`lucide-${f(a)}`,m].join(" "),...u},[...n.map(([h,p])=>l.createElement(h,p)),...Array.isArray(o)?o:[o]]));return r.displayName=`${a}`,r};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=g("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=g("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=g("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);async function S(a){const n=await I(),r=n.url||"http://localhost:11434",d=n.model||"llama3.1",c=`
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
    ${a.map(t=>`[ID: ${t.id}] [${t.platform}] ${t.senderName}: ${t.content}`).join(`
`)}
  `;try{const t=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:d,messages:[{role:"system",content:`You are an intelligent communication assistant. ${c}`},{role:"user",content:i}],stream:!1,format:"json"})});if(!t.ok)throw new Error(`Ollama API returned ${t.status}: ${t.statusText}`);const o=(await t.json()).message.content;return JSON.parse(o)}catch(t){throw console.error("Failed to generate summary with Ollama",t),t}}async function I(){return new Promise(a=>{chrome.storage.sync.get(["ollama_url","ollama_model"],n=>{a({url:n.ollama_url||null,model:n.ollama_model||null})})})}function k(){const[a,n]=l.useState([]),[r,d]=l.useState(null),[c,i]=l.useState(!1),[t,m]=l.useState(null),o=()=>{i(!0),chrome.runtime.sendMessage({type:"GET_MESSAGES"},s=>{s&&s.success&&n(s.messages),i(!1)})};l.useEffect(()=>{o()},[]);const u=async()=>{if(a.length!==0){i(!0),m(null);try{const s=await S(a);d(s)}catch(s){m(String(s))}finally{i(!1)}}};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"CatchUp Dashboard"}),e.jsxs("button",{className:"button",style:{width:"auto",padding:"6px 12px"},onClick:o,children:[e.jsx(w,{size:16,style:{marginRight:"6px"}})," Sync"]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["Recent Unread Messages (",a.length,")"]}),a.length===0&&e.jsx("div",{style:{color:"var(--text-muted)"},children:"No recent messages captured."}),a.slice(0,5).map(s=>e.jsxs("div",{className:"message-item",children:[e.jsxs("div",{className:"message-header",children:[e.jsx("span",{className:"sender",children:s.senderName||"Unknown"}),e.jsx("span",{className:"platform-badge",children:s.platform})]}),e.jsx("div",{className:"message-content",children:s.content})]},s.id))]}),e.jsx("button",{className:"button",onClick:u,disabled:c||a.length===0,children:c?e.jsx("div",{className:"loader"}):e.jsxs(e.Fragment,{children:[e.jsx(N,{size:16,style:{marginRight:"8px"}})," Catch Me Up"]})}),t&&e.jsxs("div",{style:{color:"var(--danger)",fontSize:"0.9rem"},children:["Error: ",t]}),r&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",style:{color:"var(--success)",display:"flex",alignItems:"center"},children:[e.jsx(v,{size:16,style:{marginRight:"6px"}})," AI Summary Ready"]}),e.jsx("div",{style:{fontSize:"0.9rem"},children:r.overview}),r.actionItems.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Action Items"}),e.jsx("ul",{className:"summary-list",children:r.actionItems.map((s,h)=>e.jsx("li",{children:s.description},h))})]}),r.deadlines.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Deadlines"}),e.jsx("ul",{className:"summary-list",children:r.deadlines.map((s,h)=>e.jsxs("li",{children:[s.description," (",s.date,")"]},h))})]})]})]})}y.createRoot(document.getElementById("root")).render(e.jsx(x.StrictMode,{children:e.jsx(k,{})}));
