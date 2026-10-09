const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jszip.min-DY46-47L.js","assets/client-Bli3Ac1C.js"])))=>i.map(i=>d[i]);
import{r as h,j as e,c as $,R as U}from"./client-Bli3Ac1C.js";import{U as A}from"./message-schema-1hx2mHKL.js";const R="modulepreload",_=function(r){return"/"+r},I={},P=function(l,i,p){let d=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),n=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));d=Promise.allSettled(i.map(a=>{if(a=_(a),a in I)return;I[a]=!0;const m=a.endsWith(".css"),y=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${y}`))return;const o=document.createElement("link");if(o.rel=m?"stylesheet":R,m||(o.as="script"),o.crossOrigin="",o.href=a,n&&o.setAttribute("nonce",n),document.head.appendChild(o),m)return new Promise((g,f)=>{o.addEventListener("load",g),o.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${a}`)))})}))}function c(t){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=t,window.dispatchEvent(n),!n.defaultPrevented)throw t}return d.then(t=>{for(const n of t||[])n.status==="rejected"&&c(n.reason);return l().catch(c)})};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var T={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),v=(r,l)=>{const i=h.forwardRef(({color:p="currentColor",size:d=24,strokeWidth:c=2,absoluteStrokeWidth:t,className:n="",children:a,...m},y)=>h.createElement("svg",{ref:y,...T,width:d,height:d,stroke:p,strokeWidth:t?Number(c)*24/Number(d):c,className:["lucide",`lucide-${z(r)}`,n].join(" "),...m},[...l.map(([o,g])=>h.createElement(o,g)),...Array.isArray(a)?a:[a]]));return i.displayName=`${r}`,i};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=v("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=v("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=v("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=v("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=v("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);async function F(r){const l=await Z(),i=l.url||"http://localhost:11434",p=l.model||"llama3.1",d=`
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
  `,c=`
    Analyze the following recent unread messages and provide a structured summary.
    Identify action items, decisions, direct requests, deadlines, and items needing verification.
    
    Messages:
    ${r.map(t=>`[ID: ${t.id}] [${t.platform}] ${t.senderName}: ${t.content}`).join(`
`)}
  `;try{const t=await fetch(`${i}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:p,messages:[{role:"system",content:`You are an intelligent communication assistant. ${d}`},{role:"user",content:c}],stream:!1,format:"json"})});if(!t.ok)throw new Error(`Ollama API returned ${t.status}: ${t.statusText}`);const a=(await t.json()).message.content;return JSON.parse(a)}catch(t){return console.warn("Failed to generate summary with Ollama, falling back to mock summary for testing.",t),{overview:"Mock Summary: Your Ollama server is currently unreachable. Please start it with `ollama serve`.",actionItems:[{description:"Start local Ollama server",sourceIds:[]}],decisions:[],directRequests:[],deadlines:[],itemsToVerify:[],uncertainties:[{description:"Unable to reach AI provider",sourceIds:[]}]}}}async function Z(){return new Promise(r=>{if(typeof chrome>"u"||!chrome.storage){r({url:"http://localhost:11434",model:"llama3.1"});return}chrome.storage.sync.get(["ollama_url","ollama_model"],l=>{r({url:l.ollama_url||null,model:l.ollama_model||null})})})}function B(){const[r,l]=h.useState([]),[i,p]=h.useState(null),[d,c]=h.useState(!1),[t,n]=h.useState(null),a=typeof chrome>"u"||!chrome.runtime,[m,y]=h.useState(""),o=()=>{a||(c(!0),chrome.runtime.sendMessage({type:"GET_MESSAGES"},s=>{chrome.runtime.lastError?n(`Chrome extension error: ${chrome.runtime.lastError.message}`):s&&s.success?l(s.messages):s&&s.error&&n(`Failed to sync: ${s.error}`),c(!1)}))};h.useEffect(()=>{o()},[]);const g=()=>{m.trim()&&(f(m),y(""))},f=(s,u="Evaluator")=>{const j={id:crypto.randomUUID(),platform:"Web Demo",conversationId:"demo",conversationName:"Dynamic Chat",senderId:"demo_user",senderName:u,timestamp:new Date().toISOString(),capturedAt:new Date().toISOString(),content:s,contentType:"text",direction:"incoming",accessibilityStatus:"visible",unreadStatus:A.UNKNOWN,unreadEvidence:null,unreadConfidence:1,sourceUrl:"",extractionMethod:"manual",contentHash:crypto.randomUUID(),schemaVersion:1};l(x=>[j,...x])},k=async s=>{var j;const u=(j=s.target.files)==null?void 0:j[0];if(u)try{if(u.name.endsWith(".zip")){const b=await(await P(async()=>{const{default:S}=await import("./jszip.min-DY46-47L.js").then(N=>N.j);return{default:S}},__vite__mapDeps([0,1]))).default.loadAsync(u);let w=!1;for(const[S,N]of Object.entries(b.files))if(S.endsWith(".txt")){const C=(await N.async("string")).split(`
`).filter(M=>M.trim().length>0).slice(-20);f(`[From ZIP ${S}]:
${C.join(`
`)}`,"ZIP Upload"),w=!0}w||n("No .txt files found inside the ZIP.")}else if(u.name.endsWith(".txt")){const b=(await u.text()).split(`
`).filter(w=>w.trim().length>0).slice(-20);f(`[From TXT]:
${b.join(`
`)}`,"TXT Upload")}else n("Please upload a .zip or .txt file")}catch(x){n(`Failed to process file: ${x}`)}},E=async()=>{if(r.length!==0){c(!0),n(null);try{const s=await F(r);p(s)}catch(s){n(String(s))}finally{c(!1)}}};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"CatchUp Dashboard"}),!a&&e.jsxs("button",{className:"button",style:{width:"auto",padding:"6px 12px"},onClick:o,children:[e.jsx(W,{size:16,style:{marginRight:"6px"}})," Sync"]})]}),a&&e.jsxs("div",{className:"card",style:{marginBottom:"16px"},children:[e.jsx("div",{className:"card-title",children:"Dynamic Data Entry (Web Mode)"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#cbd5e1",marginBottom:"8px"},children:"Since websites cannot read your WhatsApp/Slack tabs due to browser security, paste your messages here to dynamically test the engine!"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("input",{type:"text",value:m,onChange:s=>y(s.target.value),onKeyDown:s=>s.key==="Enter"&&g(),placeholder:"Type a message to summarize...",style:{flex:1,padding:"8px",borderRadius:"6px",border:"1px solid var(--border-color)",background:"rgba(0,0,0,0.2)",color:"white"}}),e.jsx("button",{className:"button",style:{width:"auto",padding:"8px 12px"},onClick:g,children:e.jsx(L,{size:16})}),e.jsxs("label",{className:"button",style:{width:"auto",padding:"8px 12px",cursor:"pointer",display:"flex",alignItems:"center"},children:[e.jsx(q,{size:16}),e.jsx("input",{type:"file",accept:".zip,.txt",style:{display:"none"},onChange:k})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["Recent Unread Messages (",r.length,")"]}),r.length===0&&e.jsx("div",{style:{color:"var(--text-muted)"},children:"No messages captured yet."}),r.slice(0,5).map(s=>e.jsxs("div",{className:"message-item",children:[e.jsxs("div",{className:"message-header",children:[e.jsx("span",{className:"sender",children:s.senderName||"Unknown"}),e.jsx("span",{className:"platform-badge",children:s.platform})]}),e.jsx("div",{className:"message-content",children:s.content})]},s.id))]}),e.jsx("button",{className:"button",onClick:E,disabled:d||r.length===0,children:d?e.jsx("div",{className:"loader"}):e.jsxs(e.Fragment,{children:[e.jsx(O,{size:16,style:{marginRight:"8px"}})," Catch Me Up"]})}),t&&e.jsxs("div",{style:{color:"var(--danger)",fontSize:"0.9rem",marginTop:"12px"},children:["Error: ",t]}),i&&e.jsxs("div",{className:"card",style:{marginTop:"16px"},children:[e.jsxs("div",{className:"card-title",style:{color:"var(--success)",display:"flex",alignItems:"center"},children:[e.jsx(D,{size:16,style:{marginRight:"6px"}})," AI Summary Ready"]}),e.jsx("div",{style:{fontSize:"0.9rem"},children:i.overview}),i.actionItems.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Action Items"}),e.jsx("ul",{className:"summary-list",children:i.actionItems.map((s,u)=>e.jsx("li",{children:s.description},u))})]}),i.deadlines.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Deadlines"}),e.jsx("ul",{className:"summary-list",children:i.deadlines.map((s,u)=>e.jsxs("li",{children:[s.description," (",s.date,")"]},u))})]})]})]})}$.createRoot(document.getElementById("root")).render(e.jsx(U.StrictMode,{children:e.jsx(B,{})}));
