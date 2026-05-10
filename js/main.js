'use strict';

/* ── CURSOR ── */
const $c=document.getElementById('cursor');
if($c){
  document.addEventListener('mousemove',e=>{$c.style.left=e.clientX+'px';$c.style.top=e.clientY+'px'});
  document.querySelectorAll('button,a,input,select,textarea,.prod-card,.ath-card,.ins-card,.testi-card,.pillar,.team-card,.brand-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>$c.classList.add('big'));
    el.addEventListener('mouseleave',()=>$c.classList.remove('big'));
  });
}

/* ── SCROLL REVEAL ── */
const rObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rObs.unobserve(e.target);}});
},{threshold:.08});
function initReveal(){document.querySelectorAll('.r,.rs,.rfade').forEach(el=>{el.classList.remove('in');rObs.observe(el)});}

/* ── NAVIGATION ── */
function go(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nav-links button').forEach(b=>b.classList.remove('active'));
  const pg=document.getElementById('page-'+page);
  if(pg)pg.classList.add('on');
  const nl=document.getElementById('nl-'+page);
  if(nl)nl.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(initReveal,80);
  closeMobileNav();
}
function toggleNav(){
  const l=document.querySelector('.nav-links');
  if(!l)return;
  if(l.dataset.open==='1'){closeMobileNav();}
  else{
    l.style.cssText='display:flex;flex-direction:column;position:absolute;top:58px;left:0;right:0;background:rgba(255,255,255,.97);padding:20px 24px;gap:18px;border-bottom:1px solid rgba(0,0,0,.07);backdrop-filter:blur(20px);z-index:599';
    l.dataset.open='1';
  }
}
function closeMobileNav(){
  const l=document.querySelector('.nav-links');
  if(!l)return;
  if(window.innerWidth<=960)l.style.display='';
  l.dataset.open='0';
}
window.addEventListener('resize',()=>{if(window.innerWidth>960){const l=document.querySelector('.nav-links');if(l)l.style.cssText=''}});

/* ── TABS ── */
function aTab(name,btn){
  document.querySelectorAll('.tab-pane').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.atab').forEach(t=>t.classList.remove('on'));
  const p=document.getElementById('tab-'+name);
  if(p)p.classList.add('on');
  if(btn)btn.classList.add('on');
}

/* ── FILTER PILLS (shop + insights) ── */
document.addEventListener('click',e=>{
  const pill=e.target.closest('.fpill');
  if(!pill)return;
  const group=pill.parentElement;
  group.querySelectorAll('.fpill').forEach(p=>p.classList.remove('on'));
  pill.classList.add('on');
  const filter=pill.dataset.filter;
  if(!filter)return;
  // only act on shop-grid
  const grid=document.getElementById('shop-grid');
  if(!grid||!grid.contains(group)&&grid.compareDocumentPosition(group)!==0){return;}
  const items=grid.querySelectorAll('[data-cat]');
  items.forEach(c=>{
    if(filter==='all'||c.dataset.cat===filter){c.style.display='';}
    else{c.style.display='none';}
  });
});

/* ── VARIANT PRICE UPDATE ── */
function updatePrice(productId, price){
  const el=document.getElementById('pp-'+productId);
  if(el)el.textContent='₹'+parseInt(price).toLocaleString('en-IN');
}
function getPrice(productId){
  const sel=document.getElementById('vs-'+productId);
  if(sel)return parseInt(sel.value);
  const el=document.getElementById('pp-'+productId);
  if(el){const m=el.textContent.replace(/[₹,from\s]/g,'');return parseInt(m)||0;}
  return 0;
}

/* ── WHATSAPP ENQUIRY ── */
function waEnquiry(product, price){
  const msg=encodeURIComponent(
    `Hello Amentum Sports! 👋\n\nI am interested in the following:\n\n🏹 *Product:* ${product}\n💰 *Price:* ${price}\n\nPlease share more details on availability, variants, and delivery to my location.\n\nThank you!`
  );
  window.open(`https://wa.me/+919827654830?text=${msg}`,'_blank');
}

/* ── RAZORPAY PAYMENT ── */
let _payProduct='',_payAmount=0;

function buyNow(productName, amountINR, productId){
  _payProduct=productName;
  _payAmount=amountINR;
  const n=document.getElementById('pay-prod-name');
  const pr=document.getElementById('pay-prod-price');
  const bt=document.getElementById('pay-btn-text');
  if(n)n.textContent=productName;
  if(pr)pr.textContent='₹'+amountINR.toLocaleString('en-IN');
  if(bt)bt.textContent='Pay ₹'+amountINR.toLocaleString('en-IN')+' Securely →';
  document.getElementById('pay-modal').classList.add('open');
}
function closePayModal(){
  document.getElementById('pay-modal').classList.remove('open');
  ['pay-name','pay-phone','pay-email','pay-address','pay-notes'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.value='';
  });
}
function initRazorpay(){
  const name=(document.getElementById('pay-name')||{}).value||'';
  const phone=(document.getElementById('pay-phone')||{}).value||'';
  const email=(document.getElementById('pay-email')||{}).value||'';
  const address=(document.getElementById('pay-address')||{}).value||'';
  const notes=(document.getElementById('pay-notes')||{}).value||'';
  if(!name.trim()){toast('Please enter your name.');return;}
  if(!phone.trim()||phone.replace(/\D/g,'').length<10){toast('Please enter a valid 10-digit phone number.');return;}
  if(!address.trim()){toast('Please enter your delivery address.');return;}

  const options={
    // ⚠️  REPLACE WITH YOUR RAZORPAY KEY ID before going live
    key:'rzp_live_x89sYD9BeMKJ8H',
    amount:_payAmount*100,
    currency:'INR',
    name:'Amentum Sports',
    description:_payProduct,
    image:'images/amentum_logo.png',
    handler:function(response){
      closePayModal();
      const msg=encodeURIComponent(
        `✅ *Payment Successful — Amentum Sports*\n\n`+
        `*Product:* ${_payProduct}\n*Amount Paid:* ₹${_payAmount.toLocaleString('en-IN')}\n`+
        `*Razorpay ID:* ${response.razorpay_payment_id}\n\n`+
        `*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email||'Not provided'}\n`+
        `*Address:* ${address}\n*Notes:* ${notes||'None'}\n\nPlease confirm my order and share delivery timeline. Thank you!`
      );
      window.open(`https://wa.me/+919827654830?text=${msg}`,'_blank');
      toast('Payment successful! 🎉 Order confirmed — '+response.razorpay_payment_id);
    },
    prefill:{name,contact:phone,email:email||''},
    notes:{delivery_address:address,product:_payProduct,variant_notes:notes},
    theme:{color:'#c8171a'},
    modal:{ondismiss:function(){const bt=document.getElementById('pay-btn-text');if(bt)bt.textContent='Pay ₹'+_payAmount.toLocaleString('en-IN')+' Securely →';}}
  };

  if(typeof Razorpay==='undefined'){
    // Fallback — WhatsApp order
    const msg=encodeURIComponent(
      `🏹 *New Order — Amentum Sports*\n\n*Product:* ${_payProduct}\n*Amount:* ₹${_payAmount.toLocaleString('en-IN')}\n\n`+
      `*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email||'N/A'}\n*Address:* ${address}\n*Notes:* ${notes||'None'}\n\nPlease send payment link.`
    );
    window.open(`https://wa.me/+919827654830?text=${msg}`,'_blank');
    closePayModal();
    toast('Your order has been sent via WhatsApp. We will share a payment link shortly!');
    return;
  }
  const rzp=new Razorpay(options);
  rzp.on('payment.failed',r=>toast('Payment failed: '+r.error.description));
  rzp.open();
}

/* ── ARTICLE POPUPS ── */
function openArticle(id){
  const el=document.getElementById('art-'+id);
  if(el){el.classList.add('open');document.body.style.overflow='hidden';}
}
function closeArticle(id){
  const el=document.getElementById('art-'+id);
  if(el){el.classList.remove('open');document.body.style.overflow='';}
}
// Close on Escape
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    document.querySelectorAll('.article-overlay.open').forEach(o=>{
      o.classList.remove('open');document.body.style.overflow='';
    });
    closePayModal();
  }
});
// Close article overlay on background click
document.addEventListener('click',e=>{
  if(e.target.classList.contains('article-overlay')){
    e.target.classList.remove('open');
    document.body.style.overflow='';
  }
});

/* ── ENROLL — PROFILE PREVIEW ── */
const pd={};
function upPrev(el,k){
  pd[k]=el.value;
  const fn=pd.fn||'Athlete',ln=pd.ln||'Name';
  const nameEl=document.getElementById('pv-name');
  if(nameEl)nameEl.textContent=fn+' '+ln;
  const avEl=document.getElementById('pv-av');
  if(avEl){const ini=((fn[0]||'')+(ln[0]||'')).toUpperCase();avEl.textContent=ini||'🏃';avEl.style.fontSize=ini?'18px':'24px';}
  const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  s('pv-handle',pd.ig||'@handle');
  s('pv-loc',(pd.st||'State')+' · '+(pd.cat||'Category'));
  s('pv-pb',pd.pb||'—');
  s('pv-age',pd.age||'—');
  s('pv-gear',pd.gear||'Amentum Gear');
}

/* ── FILE UPLOAD ── */
let _uploadedFile=null;
function handleFileSelect(input){
  if(input.files&&input.files[0]){
    _uploadedFile=input.files[0];
    showFilePreview(_uploadedFile.name);
  }
}
function handleDrop(e){
  e.preventDefault();
  document.getElementById('upload-area').classList.remove('dragover');
  const file=e.dataTransfer.files[0];
  if(file&&file.type.startsWith('image/')){
    _uploadedFile=file;
    showFilePreview(file.name);
  } else {toast('Please drop an image file (JPG or PNG).');}
}
function showFilePreview(name){
  const prev=document.getElementById('file-preview');
  const nameEl=document.getElementById('file-name');
  if(prev)prev.classList.add('show');
  if(nameEl)nameEl.textContent=name;
}
function clearFile(){
  _uploadedFile=null;
  const prev=document.getElementById('file-preview');
  const inp=document.getElementById('javelin-photo');
  if(prev)prev.classList.remove('show');
  if(inp)inp.value='';
}

function doEnroll(){
  const fn=(document.querySelector('[oninput*="fn"]')||{}).value||pd.fn||'';
  const ln=(document.querySelector('[oninput*="ln"]')||{}).value||pd.ln||'';
  if(!fn&&!ln){toast('Please enter your name to continue.');return;}
  if(!pd.ig){toast('Please enter your Instagram handle.');return;}
  const msg=encodeURIComponent(
    `🏹 *Athlete Enrollment — Amentum Sports*\n\n`+
    `*Name:* ${fn} ${ln}\n*Instagram:* ${pd.ig||''}\n`+
    `*State:* ${pd.st||'—'} · *Category:* ${pd.cat||'—'}\n`+
    `*Personal Best:* ${pd.pb||'—'}m · *Age:* ${pd.age||'—'}\n`+
    `*Current Gear:* ${pd.gear||'—'}\n`+
    (_uploadedFile?`*Javelin Photo:* ✅ ${_uploadedFile.name} (will be shared separately)\n`:'')+
    `\nI have followed @amentum.sports on Instagram. Please verify and add me to the Athlete Arena!`
  );
  window.open(`https://wa.me/+919827654830?text=${msg}`,'_blank');
  toast('Enrollment sent via WhatsApp! 🎯 We will verify your @amentum.sports follow within 48 hours.');
}

/* ── TOAST ── */
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid=setTimeout(()=>t.classList.remove('show'),4800);
}

/* ── CHATBOT ── */
const KB={
  greet:`Hi! 👋 Welcome to Amentum Sports — Asia's largest javelin store.\n\nHow can I help you today? You can ask about our javelins, how to order, international brands, the Amentum Javelin Championship, pricing, or anything else!`,
  products:`Our complete Amentum range (direct buy):\n\n🥇 *The Nalwa* — 800g/90m · WA Certified · ₹26,000\n🥈 *The Chhatrapati* — 600g/60m ₹16,250 | 800g/80m ₹18,200\n🏅 *Olympic Gold* — 600g ₹13,000 | 700g/800g ₹14,300\n⚡ *Black Panther* — 600g ₹8,000 | 700g ₹8,200 | 800g ₹8,500\n💜 *Purple White* — 500g/50m · ₹7,800\n🔴 *Amentum Red* — 600g · ₹5,460\n⭐ *Gold Kids* — 500g/50m · ₹4,900\n🌿 *Vayuj 400g* — ₹1,298\n🌿 *Vayuj 300g* — ₹1,180\n\nUse the weight dropdown on each product to select your variant.`,
  order:`*How to order Amentum Javelins (direct payment):*\n1. Go to the Shop page\n2. Select your weight/variant from the dropdown\n3. Click "Buy Now"\n4. Enter your details (name, phone, address)\n5. Pay via Razorpay — UPI, Cards, Net Banking, Wallets accepted\n6. WhatsApp confirmation sent automatically\n\n*International Brands (Nemeth, Polanik, Nordic, Gill, Nishi, Denfi, Turbojav):*\n→ Click "Send Enquiry via WhatsApp"\n→ We respond within 24 hrs`,
  international:`We carry 7 world-class brands — all WhatsApp enquiry-based:\n\n🇭🇺 *Nemeth Javelins* — Hungary\n🇵🇱 *Polanik* — Poland\n🇸🇪 *Nordic Sport* — Sweden\n🇺🇸 *Gill Athletics* — USA\n🇯🇵 *Nishi Athletics* — Japan\n🇩🇰 *Denfi Sport* — Denmark\n🌍 *Turbojav* — Global\n\nZero import duty. WhatsApp: +91 9827654830`,
  ajc:`*Amentum Javelin Championship (AJC)* — our flagship annual event:\n\n🏆 Launched 2022\n🗺️ 18+ states represented\n👶 6 age categories (U-12 to Open)\n🎯 Every winner gets an Amentum javelin\n\nMultiple AJC alumni now compete at national and international level. AJC 2026 registrations opening soon — send us a WhatsApp to participate!`,
  ambassador:`Our brand ambassador is *Davinder Singh Kang*:\n\n🏅 First Indian to qualify for World Athletics Championships Javelin Final (London 2017)\n🥉 Asian Athletics Bronze 2017 — 83.29m\n🎯 Personal Best: 84.57m · National Champion\n🇮🇳 Mentor and workshop coach across India\n\nDavinder represents the fighting spirit of Indian javelin.`,
  pricing:`*Exact pricing from amentums.com:*\n\n• Vayuj 300g — ₹1,180\n• Vayuj 400g — ₹1,298\n• Gold Kids — ₹4,900\n• Amentum Red — ₹5,460\n• Purple White 500g — ₹7,800\n• Black Panther 600g — ₹8,000\n• Black Panther 700g — ₹8,200\n• Black Panther 800g — ₹8,500\n• Olympic Gold 600g/50m — ₹13,000\n• Olympic Gold 700g/800g — ₹14,300\n• Chhatrapati 600g/60m — ₹16,250\n• Chhatrapati 800g/80m — ₹18,200\n• The Nalwa 800g/90m — ₹26,000\n\n*International brands:* WhatsApp for pricing`,
  payment:`We accept via Razorpay:\n\n💳 Credit / Debit Cards\n📱 UPI (GPay, PhonePe, Paytm)\n🏦 Net Banking\n👛 Wallets\n\nAll 100% secured by Razorpay. After payment → WhatsApp confirmation with delivery details.`,
  shipping:`Pan-India shipping. Zero customs on all Amentum products.\n\nSaves 15-30% vs. importing javelins yourself.\n\nDelivery: 3–7 business days. Bulk/institutional orders: dedicated logistics support.\n\n📞 +91 9827654830`,
  bulk:`Institutional bulk packages:\n\n📦 Starter — 10 units · ₹28,000\n📦 Academy — 25 units · ₹64,000\n📦 Elite — 50 units · ₹1,18,000\n\nIncludes coach onboarding + training. Pay on the shop page or WhatsApp for custom quote.\n\n💬 wa.me/+919827654830`,
  special_olympics:`Amentum is the *Official Mini-Javelin Partner of Special Olympics India*.\n\nOur Vayuj 300g is Special Olympics Bharat approved — safe rubber tip, aerodynamic fin design.\n\nWe train coaches nationwide on Mini-Javelin systems for specially-abled athletes.`,
  contact:`📞 *+91 9827654830*\n💬 *WhatsApp:* wa.me/+919827654830\n📸 *Instagram:* @amentum.sports\n📘 *Facebook:* facebook.com/amentumsports\n▶️ *YouTube:* @amentumsports5857\n🌐 *amentums.com*`,
  team:`Co-founders:\n\n👤 *Aditya Bhargava* — Masters Biomedical Engineering, UConn USA.\n\n👤 *Siddharth Patil* — India at Asia-Pacific Tchoukball 2010. Co-founded CoachKhoj. Ex Zee TAJ TV (TEN Sports).`,
  default:`Great question! For the most accurate answer contact us:\n\n💬 *WhatsApp:* wa.me/+919827654830\n📞 *+91 9827654830*\n📸 *@amentum.sports*\n\nWe respond within a few hours!`
};
function getChatReply(msg){
  const m=msg.toLowerCase();
  if(m.match(/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|yo\b)/))return KB.greet;
  if(m.match(/product|javelin|model|what.*sell|full list|range|which.*javelin|list.*javelin/))return KB.products;
  if(m.match(/how.*order|place.*order|how.*buy|where.*buy|can i buy/))return KB.order;
  if(m.match(/international|nemeth|polanik|nordic|gill|nishi|denfi|turbojav|foreign brand/))return KB.international;
  if(m.match(/championship|ajc|event|competition|grassroot|tournament|register/))return KB.ajc;
  if(m.match(/ambassador|davinder|kang|brand.*ambassador|who.*ambassador/))return KB.ambassador;
  if(m.match(/price|cost|rupee|inr|₹|how much|rate|expensive|cheap/))return KB.pricing;
  if(m.match(/payment|pay|razorpay|upi|card|net banking|checkout/))return KB.payment;
  if(m.match(/ship|deliver|dispatch|customs|pan.india|how long|when.*arrive/))return KB.shipping;
  if(m.match(/bulk|institution|academy.*order|school.*order|wholesale|large.*order/))return KB.bulk;
  if(m.match(/special olympics|disable|specially.abled|vayuj|mini.*javelin/))return KB.special_olympics;
  if(m.match(/contact|phone|whatsapp|number|email|reach|talk/))return KB.contact;
  if(m.match(/team|founder|aditya|siddharth|co.?founder|who.*built|who.*started/))return KB.team;
  return KB.default;
}
function addMsg(text,role){
  const msgs=document.getElementById('chat-msgs');
  const div=document.createElement('div');
  div.className='msg '+role;
  const now=new Date();
  const t=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
  const fmt=text.replace(/\*(.*?)\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  div.innerHTML=`<div class="msg-bub">${fmt}</div><div class="msg-time">${t}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
}
function showTyping(){
  const msgs=document.getElementById('chat-msgs');
  const d=document.createElement('div');
  d.id='typing-ind';d.className='msg bot';
  d.innerHTML='<div class="typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}
function removeTyping(){const t=document.getElementById('typing-ind');if(t)t.remove();}
function sendMsg(){
  const inp=document.getElementById('chat-inp');
  const msg=inp.value.trim();
  if(!msg)return;
  inp.value='';
  inp.style.height='auto';
  addMsg(msg,'user');
  document.getElementById('chat-quick').style.display='none';
  showTyping();
  setTimeout(()=>{removeTyping();addMsg(getChatReply(msg),'bot');},600+Math.random()*600);
}
function sendQ(msg){document.getElementById('chat-inp').value=msg;sendMsg();}
function openChat(preMsg){
  if(!chatOpen)toggleChat();
  if(preMsg)setTimeout(()=>{document.getElementById('chat-inp').value=preMsg;sendMsg();},400);
}
let chatOpen=false,chatInited=false;
function toggleChat(){
  const win=document.getElementById('chat-win');
  chatOpen=!chatOpen;
  win.classList.toggle('open',chatOpen);
  if(chatOpen&&!chatInited){chatInited=true;setTimeout(()=>addMsg(KB.greet,'bot'),350);}
  if(chatOpen)setTimeout(()=>document.getElementById('chat-inp').focus(),320);
}
// Auto-resize chat textarea
document.addEventListener('input',e=>{
  if(e.target.id==='chat-inp'){
    e.target.style.height='auto';
    e.target.style.height=Math.min(e.target.scrollHeight,100)+'px';
  }
});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded',()=>initReveal());

/* ══════════════════════════════════════
   INSHORTS FEED — Insights Page Logic
══════════════════════════════════════ */

/* ── Reading progress bar ── */
function updateReadProgress(){
  const feed = document.getElementById('ns-feed');
  const bar  = document.getElementById('ns-progress');
  if(!feed||!bar) return;
  const rect = feed.getBoundingClientRect();
  const total = feed.offsetHeight;
  const scrolled = Math.max(0, -rect.top);
  const pct = Math.min(100, (scrolled / (total - window.innerHeight)) * 100);
  bar.style.width = pct + '%';
}
window.addEventListener('scroll', updateReadProgress, {passive:true});

/* ── Category filter pills (Insights) ── */
document.addEventListener('click', e => {
  const pill = e.target.closest('.ns-pill');
  if(!pill) return;
  const group = pill.parentElement;
  group.querySelectorAll('.ns-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  const filter = pill.dataset.nsFilter;
  const cards = document.querySelectorAll('.ns-card');
  cards.forEach(c => {
    if(!filter || filter === 'all') { c.style.display = ''; return; }
    c.style.display = (c.dataset.cat === filter) ? '' : 'none';
  });
});

/* ── Keyboard: Enter/Space to open article on focused card ── */
document.addEventListener('keydown', e => {
  if(e.key === 'Enter' || e.key === ' '){
    const card = document.activeElement && document.activeElement.closest('.ns-card');
    if(card){
      e.preventDefault();
      const id = card.querySelector('[onclick*="openArticle"]');
      if(id){ const m = id.getAttribute('onclick').match(/openArticle\('([^']+)'\)/); if(m) openArticle(m[1]); }
    }
  }
});

/* ── Share article ── */
function shareArticle(id, title){
  const text = `${title}\n\nRead on Amentum Sports Insights →`;
  if(navigator.share){
    navigator.share({ title, text, url: window.location.href }).catch(()=>{});
  } else {
    const waMsg = encodeURIComponent(`${text}\n\nVisit amentums.com for more javelin news!`);
    window.open(`https://wa.me/?text=${waMsg}`, '_blank');
  }
}

/* ── Re-run reveal when navigating to insights ── */
const _origGo = window.go;
window.go = function(page){
  _origGo(page);
  if(page === 'insights') setTimeout(updateReadProgress, 200);
};
