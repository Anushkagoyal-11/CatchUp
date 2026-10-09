import{C as m}from"./message-schema-1hx2mHKL.js";const c={MESSAGES:"catchup_messages"};class i{static async saveMessages(e){const s=await this.getMessages(),t=new Map(s.map(r=>[r.contentHash||r.id,r]));for(const r of e)t.set(r.contentHash||r.id,r);const n=Array.from(t.values());return new Promise(r=>{chrome.storage.local.set({[c.MESSAGES]:n},()=>{r()})})}static async getMessages(){return new Promise(e=>{chrome.storage.local.get(c.MESSAGES,s=>{e(s[c.MESSAGES]||[])})})}static async clearMessages(){return new Promise(e=>{chrome.storage.local.remove(c.MESSAGES,()=>{e()})})}}console.log("CatchUp Background Service Worker Initialized");class h{constructor(){chrome.runtime.onMessage.addListener(this.routeMessage.bind(this))}routeMessage(e,s,t){return e.type==="SYNC_MESSAGES"?(this.handleSyncMessages(e.payload).then(t),!0):e.type==="GET_MESSAGES"?(this.handleGetMessages().then(t),!0):e.type==="CLEAR_MESSAGES"?(i.clearMessages().then(()=>t({success:!0})),!0):e.type==="GENERATE_SUMMARY"?(this.handleGenerateSummary(e.payload).then(t),!0):!1}async handleGenerateSummary(e){try{const{messages:s,config:t}=e,n=t.url||"http://localhost:11434",r=t.model||"llama3.1",l=`
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
      `,g=`
        Analyze the following recent unread messages and provide a structured summary.
        Identify action items, decisions, direct requests, deadlines, and items needing verification.
        
        Messages:
        ${s.map(o=>`[ID: ${o.id}] [${o.platform}] ${o.senderName}: ${o.content}`).join(`
`)}
      `,a=await fetch(`${n}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,messages:[{role:"system",content:`You are an intelligent communication assistant. ${l}`},{role:"user",content:g}],stream:!1,format:"json"})});if(!a.ok)throw new Error(`Ollama API returned ${a.status}: ${a.statusText}`);const d=await a.json();return{success:!0,summary:JSON.parse(d.message.content)}}catch(s){return{success:!1,error:String(s)}}}async handleSyncMessages(e){try{const s=e.map(t=>{const n=m.safeParse(t);return n.success?n.data:(console.warn("Invalid message payload",n.error),null)}).filter(t=>t!==null);return await i.saveMessages(s),{success:!0,count:s.length}}catch(s){return console.error("Error syncing messages",s),{success:!1,error:String(s)}}}async handleGetMessages(){try{return{success:!0,messages:await i.getMessages()}}catch(e){return{success:!1,error:String(e)}}}}new h;
