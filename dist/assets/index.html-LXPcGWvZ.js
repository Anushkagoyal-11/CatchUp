const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jszip.min-DY46-47L.js","assets/client-Bli3Ac1C.js"])))=>i.map(i=>d[i]);
import{r as h,j as e,c as $,R as A}from"./client-Bli3Ac1C.js";import{U as R}from"./message-schema-1hx2mHKL.js";const T="modulepreload",_=function(a){return"/"+a},k={},P=function(l,i,p){let m=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),r=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));m=Promise.allSettled(i.map(n=>{if(n=_(n),n in k)return;k[n]=!0;const u=n.endsWith(".css"),y=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${y}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":T,u||(c.as="script"),c.crossOrigin="",c.href=n,r&&c.setAttribute("nonce",r),document.head.appendChild(c),u)return new Promise((g,v)=>{c.addEventListener("load",g),c.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${n}`)))})}))}function d(t){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t}return m.then(t=>{for(const r of t||[])r.status==="rejected"&&d(r.reason);return l().catch(d)})};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var O={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),x=(a,l)=>{const i=h.forwardRef(({color:p="currentColor",size:m=24,strokeWidth:d=2,absoluteStrokeWidth:t,className:r="",children:n,...u},y)=>h.createElement("svg",{ref:y,...O,width:m,height:m,stroke:p,strokeWidth:t?Number(d)*24/Number(m):d,className:["lucide",`lucide-${z(a)}`,r].join(" "),...u},[...l.map(([c,g])=>h.createElement(c,g)),...Array.isArray(n)?n:[n]]));return i.displayName=`${a}`,i};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=x("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=x("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=x("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=x("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=x("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);async function B(a){const l=await Z(),i=l.url||"http://localhost:11434",p=l.model||"llama3.1",m=`
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
  `,d=`
    Analyze the following recent unread messages and provide a structured summary.
    Identify action items, decisions, direct requests, deadlines, and items needing verification.
    
    Messages:
    ${a.map(t=>`[ID: ${t.id}] [${t.platform}] ${t.senderName}: ${t.content}`).join(`
`)}
  `;try{if(typeof chrome<"u"&&chrome.runtime)return new Promise((t,r)=>{chrome.runtime.sendMessage({type:"GENERATE_SUMMARY",payload:{messages:a,config:l}},n=>{chrome.runtime.lastError?r(new Error(`Chrome extension error: ${chrome.runtime.lastError.message}`)):n&&n.success?t(n.summary):r(new Error((n==null?void 0:n.error)||"Unknown error from background script"))})});{const t=await fetch(`${i}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:p,messages:[{role:"system",content:`You are an intelligent communication assistant. ${m}`},{role:"user",content:d}],stream:!1,format:"json"})});if(!t.ok)throw new Error(`Ollama API returned ${t.status}: ${t.statusText}`);const r=await t.json();return JSON.parse(r.message.content)}}catch(t){return console.warn("Failed to generate summary with Ollama, falling back to mock summary for testing.",t),{overview:"Mock Summary: Your Ollama server is currently unreachable. Please start it with `ollama serve`.",actionItems:[{description:"Start local Ollama server",sourceIds:[]}],decisions:[],directRequests:[],deadlines:[],itemsToVerify:[],uncertainties:[{description:"Unable to reach AI provider",sourceIds:[]}]}}}async function Z(){return new Promise(a=>{if(typeof chrome>"u"||!chrome.storage){a({url:"http://localhost:11434",model:"qwen2.5-coder:1.5b"});return}chrome.storage.sync.get(["ollama_url","ollama_model"],l=>{a({url:l.ollama_url||null,model:l.ollama_model||null})})})}function J(){const[a,l]=h.useState([]),[i,p]=h.useState(null),[m,d]=h.useState(!1),[t,r]=h.useState(null),n=typeof chrome>"u"||!chrome.runtime,[u,y]=h.useState(""),c=()=>{n||(d(!0),chrome.tabs.query({active:!0,currentWindow:!0},s=>{const o=s[0];o&&o.id?chrome.tabs.sendMessage(o.id,{type:"FORCE_EXTRACT"},()=>{chrome.runtime.lastError,setTimeout(g,500)}):g()}))},g=()=>{chrome.runtime.sendMessage({type:"GET_MESSAGES"},s=>{chrome.runtime.lastError?r(`Chrome extension error: ${chrome.runtime.lastError.message}`):s&&s.success?l(s.messages):s&&s.error&&r(`Failed to sync: ${s.error}`),d(!1)})};h.useEffect(()=>{c()},[]);const v=()=>{u.trim()&&(S(u),y(""))},S=(s,o="Evaluator")=>{const j={id:crypto.randomUUID(),platform:"Web Demo",conversationId:"demo",conversationName:"Dynamic Chat",senderId:"demo_user",senderName:o,timestamp:new Date().toISOString(),capturedAt:new Date().toISOString(),content:s,contentType:"text",direction:"incoming",accessibilityStatus:"visible",unreadStatus:R.UNKNOWN,unreadEvidence:null,unreadConfidence:1,sourceUrl:"",extractionMethod:"manual",contentHash:crypto.randomUUID(),schemaVersion:1};l(f=>[j,...f])},I=async s=>{var j;const o=(j=s.target.files)==null?void 0:j[0];if(o)try{if(o.name.endsWith(".zip")){const E=await(await P(async()=>{const{default:b}=await import("./jszip.min-DY46-47L.js").then(N=>N.j);return{default:b}},__vite__mapDeps([0,1]))).default.loadAsync(o);let w=!1;for(const[b,N]of Object.entries(E.files))if(b.endsWith(".txt")){const M=(await N.async("string")).split(`
`).filter(U=>U.trim().length>0).slice(-20);S(`[From ZIP ${b}]:
${M.join(`
`)}`,"ZIP Upload"),w=!0}w||r("No .txt files found inside the ZIP.")}else if(o.name.endsWith(".txt")){const E=(await o.text()).split(`
`).filter(w=>w.trim().length>0).slice(-20);S(`[From TXT]:
${E.join(`
`)}`,"TXT Upload")}else r("Please upload a .zip or .txt file")}catch(f){r(`Failed to process file: ${f}`)}},C=async()=>{if(a.length!==0){d(!0),r(null);try{const s=await B(a);p(s)}catch(s){r(String(s))}finally{d(!1)}}};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"CatchUp Dashboard"}),!n&&e.jsxs("button",{className:"button",style:{width:"auto",padding:"6px 12px"},onClick:c,children:[e.jsx(q,{size:16,style:{marginRight:"6px"}})," Sync"]})]}),n&&e.jsxs("div",{className:"card",style:{marginBottom:"16px"},children:[e.jsx("div",{className:"card-title",children:"Dynamic Data Entry (Web Mode)"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#cbd5e1",marginBottom:"8px"},children:"Since websites cannot read your WhatsApp/Slack tabs due to browser security, paste your messages here to dynamically test the engine!"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("input",{type:"text",value:u,onChange:s=>y(s.target.value),onKeyDown:s=>s.key==="Enter"&&v(),placeholder:"Type a message to summarize...",style:{flex:1,padding:"8px",borderRadius:"6px",border:"1px solid var(--border-color)",background:"rgba(0,0,0,0.2)",color:"white"}}),e.jsx("button",{className:"button",style:{width:"auto",padding:"8px 12px"},onClick:v,children:e.jsx(W,{size:16})}),e.jsxs("label",{className:"button",style:{width:"auto",padding:"8px 12px",cursor:"pointer",display:"flex",alignItems:"center"},children:[e.jsx(F,{size:16}),e.jsx("input",{type:"file",accept:".zip,.txt",style:{display:"none"},onChange:I})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["Recent Unread Messages (",a.length,")"]}),a.length===0&&e.jsx("div",{style:{color:"var(--text-muted)"},children:"No messages captured yet."}),a.slice(0,5).map(s=>e.jsxs("div",{className:"message-item",children:[e.jsxs("div",{className:"message-header",children:[e.jsx("span",{className:"sender",children:s.senderName||"Unknown"}),e.jsx("span",{className:"platform-badge",children:s.platform})]}),e.jsx("div",{className:"message-content",children:s.content})]},s.id))]}),e.jsx("button",{className:"button",onClick:C,disabled:m||a.length===0,children:m?e.jsx("div",{className:"loader"}):e.jsxs(e.Fragment,{children:[e.jsx(L,{size:16,style:{marginRight:"8px"}})," Catch Me Up"]})}),t&&e.jsxs("div",{style:{color:"var(--danger)",fontSize:"0.9rem",marginTop:"12px"},children:["Error: ",t]}),i&&e.jsxs("div",{className:"card",style:{marginTop:"16px"},children:[e.jsxs("div",{className:"card-title",style:{color:"var(--success)",display:"flex",alignItems:"center"},children:[e.jsx(D,{size:16,style:{marginRight:"6px"}})," AI Summary Ready"]}),e.jsx("div",{style:{fontSize:"0.9rem"},children:i.overview}),i.actionItems.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Action Items"}),e.jsx("ul",{className:"summary-list",children:i.actionItems.map((s,o)=>e.jsx("li",{children:s.description},o))})]}),i.deadlines.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Deadlines"}),e.jsx("ul",{className:"summary-list",children:i.deadlines.map((s,o)=>e.jsxs("li",{children:[s.description," (",s.date,")"]},o))})]})]})]})}$.createRoot(document.getElementById("root")).render(e.jsx(A.StrictMode,{children:e.jsx(J,{})}));
