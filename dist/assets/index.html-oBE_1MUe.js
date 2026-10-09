const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jszip.min-DY46-47L.js","assets/client-Bli3Ac1C.js"])))=>i.map(i=>d[i]);
import{r as h,j as e,c as T,R as U}from"./client-Bli3Ac1C.js";import{U as A}from"./message-schema-1hx2mHKL.js";const R="modulepreload",_=function(n){return"/"+n},k={},O=function(c,i,p){let m=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),r=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));m=Promise.allSettled(i.map(a=>{if(a=_(a),a in k)return;k[a]=!0;const u=a.endsWith(".css"),y=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${y}`))return;const l=document.createElement("link");if(l.rel=u?"stylesheet":R,u||(l.as="script"),l.crossOrigin="",l.href=a,r&&l.setAttribute("nonce",r),document.head.appendChild(l),u)return new Promise((g,v)=>{l.addEventListener("load",g),l.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${a}`)))})}))}function d(s){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=s,window.dispatchEvent(r),!r.defaultPrevented)throw s}return m.then(s=>{for(const r of s||[])r.status==="rejected"&&d(r.reason);return c().catch(d)})};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var P={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),x=(n,c)=>{const i=h.forwardRef(({color:p="currentColor",size:m=24,strokeWidth:d=2,absoluteStrokeWidth:s,className:r="",children:a,...u},y)=>h.createElement("svg",{ref:y,...P,width:m,height:m,stroke:p,strokeWidth:s?Number(d)*24/Number(m):d,className:["lucide",`lucide-${z(n)}`,r].join(" "),...u},[...c.map(([l,g])=>h.createElement(l,g)),...Array.isArray(a)?a:[a]]));return i.displayName=`${n}`,i};/**
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
 */const F=x("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);async function B(n){const c=await Z(),i=c.url||"http://localhost:11434",p=c.model||"llama3.1",m=`
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
    ${n.map(s=>`[ID: ${s.id}] [${s.platform}] ${s.senderName}: ${s.content}`).join(`
`)}
  `;try{const s=await fetch(`${i}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:p,messages:[{role:"system",content:`You are an intelligent communication assistant. ${m}`},{role:"user",content:d}],stream:!1,format:"json"})});if(!s.ok)throw new Error(`Ollama API returned ${s.status}: ${s.statusText}`);const a=(await s.json()).message.content;return JSON.parse(a)}catch(s){return console.warn("Failed to generate summary with Ollama, falling back to mock summary for testing.",s),{overview:"Mock Summary: Your Ollama server is currently unreachable. Please start it with `ollama serve`.",actionItems:[{description:"Start local Ollama server",sourceIds:[]}],decisions:[],directRequests:[],deadlines:[],itemsToVerify:[],uncertainties:[{description:"Unable to reach AI provider",sourceIds:[]}]}}}async function Z(){return new Promise(n=>{if(typeof chrome>"u"||!chrome.storage){n({url:"http://localhost:11434",model:"llama3.1"});return}chrome.storage.sync.get(["ollama_url","ollama_model"],c=>{n({url:c.ollama_url||null,model:c.ollama_model||null})})})}function J(){const[n,c]=h.useState([]),[i,p]=h.useState(null),[m,d]=h.useState(!1),[s,r]=h.useState(null),a=typeof chrome>"u"||!chrome.runtime,[u,y]=h.useState(""),l=()=>{a||(d(!0),chrome.tabs.query({active:!0,currentWindow:!0},t=>{const o=t[0];o&&o.id?chrome.tabs.sendMessage(o.id,{type:"FORCE_EXTRACT"},()=>{chrome.runtime.lastError,setTimeout(g,500)}):g()}))},g=()=>{chrome.runtime.sendMessage({type:"GET_MESSAGES"},t=>{chrome.runtime.lastError?r(`Chrome extension error: ${chrome.runtime.lastError.message}`):t&&t.success?c(t.messages):t&&t.error&&r(`Failed to sync: ${t.error}`),d(!1)})};h.useEffect(()=>{l()},[]);const v=()=>{u.trim()&&(S(u),y(""))},S=(t,o="Evaluator")=>{const j={id:crypto.randomUUID(),platform:"Web Demo",conversationId:"demo",conversationName:"Dynamic Chat",senderId:"demo_user",senderName:o,timestamp:new Date().toISOString(),capturedAt:new Date().toISOString(),content:t,contentType:"text",direction:"incoming",accessibilityStatus:"visible",unreadStatus:A.UNKNOWN,unreadEvidence:null,unreadConfidence:1,sourceUrl:"",extractionMethod:"manual",contentHash:crypto.randomUUID(),schemaVersion:1};c(f=>[j,...f])},E=async t=>{var j;const o=(j=t.target.files)==null?void 0:j[0];if(o)try{if(o.name.endsWith(".zip")){const N=await(await O(async()=>{const{default:b}=await import("./jszip.min-DY46-47L.js").then(I=>I.j);return{default:b}},__vite__mapDeps([0,1]))).default.loadAsync(o);let w=!1;for(const[b,I]of Object.entries(N.files))if(b.endsWith(".txt")){const M=(await I.async("string")).split(`
`).filter($=>$.trim().length>0).slice(-20);S(`[From ZIP ${b}]:
${M.join(`
`)}`,"ZIP Upload"),w=!0}w||r("No .txt files found inside the ZIP.")}else if(o.name.endsWith(".txt")){const N=(await o.text()).split(`
`).filter(w=>w.trim().length>0).slice(-20);S(`[From TXT]:
${N.join(`
`)}`,"TXT Upload")}else r("Please upload a .zip or .txt file")}catch(f){r(`Failed to process file: ${f}`)}},C=async()=>{if(n.length!==0){d(!0),r(null);try{const t=await B(n);p(t)}catch(t){r(String(t))}finally{d(!1)}}};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"CatchUp Dashboard"}),!a&&e.jsxs("button",{className:"button",style:{width:"auto",padding:"6px 12px"},onClick:l,children:[e.jsx(q,{size:16,style:{marginRight:"6px"}})," Sync"]})]}),a&&e.jsxs("div",{className:"card",style:{marginBottom:"16px"},children:[e.jsx("div",{className:"card-title",children:"Dynamic Data Entry (Web Mode)"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#cbd5e1",marginBottom:"8px"},children:"Since websites cannot read your WhatsApp/Slack tabs due to browser security, paste your messages here to dynamically test the engine!"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("input",{type:"text",value:u,onChange:t=>y(t.target.value),onKeyDown:t=>t.key==="Enter"&&v(),placeholder:"Type a message to summarize...",style:{flex:1,padding:"8px",borderRadius:"6px",border:"1px solid var(--border-color)",background:"rgba(0,0,0,0.2)",color:"white"}}),e.jsx("button",{className:"button",style:{width:"auto",padding:"8px 12px"},onClick:v,children:e.jsx(W,{size:16})}),e.jsxs("label",{className:"button",style:{width:"auto",padding:"8px 12px",cursor:"pointer",display:"flex",alignItems:"center"},children:[e.jsx(F,{size:16}),e.jsx("input",{type:"file",accept:".zip,.txt",style:{display:"none"},onChange:E})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:["Recent Unread Messages (",n.length,")"]}),n.length===0&&e.jsx("div",{style:{color:"var(--text-muted)"},children:"No messages captured yet."}),n.slice(0,5).map(t=>e.jsxs("div",{className:"message-item",children:[e.jsxs("div",{className:"message-header",children:[e.jsx("span",{className:"sender",children:t.senderName||"Unknown"}),e.jsx("span",{className:"platform-badge",children:t.platform})]}),e.jsx("div",{className:"message-content",children:t.content})]},t.id))]}),e.jsx("button",{className:"button",onClick:C,disabled:m||n.length===0,children:m?e.jsx("div",{className:"loader"}):e.jsxs(e.Fragment,{children:[e.jsx(L,{size:16,style:{marginRight:"8px"}})," Catch Me Up"]})}),s&&e.jsxs("div",{style:{color:"var(--danger)",fontSize:"0.9rem",marginTop:"12px"},children:["Error: ",s]}),i&&e.jsxs("div",{className:"card",style:{marginTop:"16px"},children:[e.jsxs("div",{className:"card-title",style:{color:"var(--success)",display:"flex",alignItems:"center"},children:[e.jsx(D,{size:16,style:{marginRight:"6px"}})," AI Summary Ready"]}),e.jsx("div",{style:{fontSize:"0.9rem"},children:i.overview}),i.actionItems.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Action Items"}),e.jsx("ul",{className:"summary-list",children:i.actionItems.map((t,o)=>e.jsx("li",{children:t.description},o))})]}),i.deadlines.length>0&&e.jsxs("div",{className:"summary-section",children:[e.jsx("h3",{children:"Deadlines"}),e.jsx("ul",{className:"summary-list",children:i.deadlines.map((t,o)=>e.jsxs("li",{children:[t.description," (",t.date,")"]},o))})]})]})]})}T.createRoot(document.getElementById("root")).render(e.jsx(U.StrictMode,{children:e.jsx(J,{})}));
