import{C as h}from"./message-schema-1hx2mHKL.js";const i={MESSAGES:"catchup_messages"};class d{static async saveMessages(e){const s=await this.getMessages(),t=new Map(s.map(r=>[r.contentHash||r.id,r]));for(const r of e)t.set(r.contentHash||r.id,r);const a=Array.from(t.values());return new Promise(r=>{chrome.storage.local.set({[i.MESSAGES]:a},()=>{r()})})}static async getMessages(){return new Promise(e=>{chrome.storage.local.get(i.MESSAGES,s=>{e(s[i.MESSAGES]||[])})})}static async clearMessages(){return new Promise(e=>{chrome.storage.local.remove(i.MESSAGES,()=>{e()})})}}console.log("CatchUp Background Service Worker Initialized");class S{constructor(){chrome.runtime.onMessage.addListener(this.routeMessage.bind(this))}routeMessage(e,s,t){return e.type==="SYNC_MESSAGES"?(this.handleSyncMessages(e.payload).then(t),!0):e.type==="GET_MESSAGES"?(this.handleGetMessages().then(t),!0):e.type==="CLEAR_MESSAGES"?(d.clearMessages().then(()=>t({success:!0})),!0):e.type==="GENERATE_SUMMARY"?(this.handleGenerateSummary(e.payload).then(t),!0):!1}async handleGenerateSummary(e){try{const{messages:s,config:t}=e,a=t.url||"http://localhost:11434",r=t.model||"qwen2.5-coder:1.5b",g=`
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
      `,m=`
        Analyze the following recent unread messages and provide a structured summary.
        Identify action items, decisions, direct requests, deadlines, and items needing verification.
        
        Messages:
        ${s.map(o=>`[ID: ${o.id}] [${o.platform}] ${o.senderName}: ${o.content}`).join(`
`)}
      `,c=await fetch(`${a}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,messages:[{role:"system",content:`You are an intelligent communication assistant. ${g}`},{role:"user",content:m}],stream:!1,format:"json"})});if(!c.ok)throw new Error(`Ollama API returned ${c.status}: ${c.statusText}`);const u=(await c.json()).message.content;let n;try{n=JSON.parse(u),!n.overview&&!n.actionItems&&(n={overview:"Raw Output: "+u,actionItems:[],deadlines:[]})}catch{n={overview:u,actionItems:[],deadlines:[]}}return{success:!0,summary:n}}catch(s){return{success:!1,error:String(s)}}}async handleSyncMessages(e){try{const s=e.map(t=>{const a=h.safeParse(t);return a.success?a.data:(console.warn("Invalid message payload",a.error),null)}).filter(t=>t!==null);return await d.saveMessages(s),{success:!0,count:s.length}}catch(s){return console.error("Error syncing messages",s),{success:!1,error:String(s)}}}async handleGetMessages(){try{return{success:!0,messages:await d.getMessages()}}catch(e){return{success:!1,error:String(e)}}}}new S;
