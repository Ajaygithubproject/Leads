
/* ══════════════════════════════════════════
   DATA  — localStorage backed
══════════════════════════════════════════ */
const K={staff:'mg3_staff',leads:'mg3_leads',fu:'mg3_fu',calls:'mg3_calls'};
const defStaff=[
  {id:1,name:'Ahmed',role:'staff',phone:'+91 9111111111',av:'AH',col:'#2F6FED'},
  {id:2,name:'Logeshwari HR',role:'staff',phone:'+91 9222222222',av:'FA',col:'#FA8C16'},
  {id:3,name:'Arul VB',role:'staff',phone:'+91 9333333333',av:'RV',col:'#52C41A'},
  {id:4,name:'Divya HR',role:'admin',phone:'+91 9444444444',av:'ME',col:'#722ED1'},
];
const defLeads=[
  {id:1,name:'Mohammed Irfan',phone:'+91 9876543210',address:'Chennai, Tamil Nadu',remark:'RNR',staff:'Ahmed',notes:'Called twice – try evening.',date:'2025-01-15',timeline:[{msg:'Lead created',date:'2025-01-15',type:'create'},{msg:'Called – RNR. Try 6 PM.',date:'2025-01-15',type:'call'}]},
  {id:2,name:'Sanjay Kumar',phone:'+91 8765432109',address:'Coimbatore, TN',remark:'Not Interested',staff:'Logeshwari HR',notes:'Only looking for local jobs.',date:'2025-01-14',timeline:[{msg:'Lead created',date:'2025-01-14',type:'create'}]},
  {id:3,name:'Ramesh Babu',phone:'+91 7654321098',address:'Madurai, TN',remark:'Others',staff:'Arul VB',notes:'Will callback next week.',date:'2025-01-14',timeline:[{msg:'Lead created',date:'2025-01-14',type:'create'}]},
  {id:4,name:'Priya Devi',phone:'+91 6543210987',address:'Salem, TN',remark:'Switch Off',staff:'Divya HR',notes:'Phone off 2 days.',date:'2025-01-13',timeline:[{msg:'Lead created',date:'2025-01-13',type:'create'}]},
  {id:5,name:'Arjun Raj',phone:'+91 5432109876',address:'Tiruchy, TN',remark:'RNR',staff:'Ahmed',notes:'Try morning slot.',date:'2025-01-13',timeline:[{msg:'Lead created',date:'2025-01-13',type:'create'}]},
  {id:6,name:'Deepika S',phone:'+91 9123456780',address:'Vellore, TN',remark:'Others',staff:'Logeshwari HR',notes:'Interested in Malaysia.',date:'2025-01-12',timeline:[{msg:'Lead created',date:'2025-01-12',type:'create'}]},
  {id:7,name:'Murugan K',phone:'+91 8234567891',address:'Erode, TN',remark:'RNR',staff:'Arul VB',notes:'',date:'2025-01-11',timeline:[{msg:'Lead created',date:'2025-01-11',type:'create'}]},
  {id:8,name:'Lakshmi N',phone:'+91 7345678902',address:'Tirunelveli, TN',remark:'Not Interested',staff:'Divya HR',notes:'Already placed.',date:'2025-01-10',timeline:[{msg:'Lead created',date:'2025-01-10',type:'create'}]},
  {id:9,name:'Vijay T',phone:'+91 6456789013',address:'Kancheepuram, TN',remark:'Others',staff:'Ahmed',notes:'Follow up post visa.',date:'2025-01-10',timeline:[{msg:'Lead created',date:'2025-01-10',type:'create'}]},
  {id:10,name:'Geetha R',phone:'+91 5567890124',address:'Nagercoil, TN',remark:'Switch Off',staff:'Logeshwari HR',notes:'',date:'2025-01-09',timeline:[{msg:'Lead created',date:'2025-01-09',type:'create'}]},
  {id:11,name:'Karthik M',phone:'+91 9988776655',address:'Thanjavur, TN',remark:'RNR',staff:'Arul VB',notes:'',date:'2025-01-08',timeline:[{msg:'Lead created',date:'2025-01-08',type:'create'}]},
  {id:12,name:'Anitha P',phone:'+91 8877665544',address:'Kumbakonam, TN',remark:'Others',staff:'Divya HR',notes:'Interested in Singapore.',date:'2025-01-07',timeline:[{msg:'Lead created',date:'2025-01-07',type:'create'}]},
];
const defFu=[
  {id:1,leadId:1,leadName:'Mohammed Irfan',staff:'Ahmed',datetime:'2025-01-16T18:00',note:'Try calling at 6 PM',priority:'high',done:false},
  {id:2,leadId:5,leadName:'Arjun Raj',staff:'Ahmed',datetime:'2025-01-15T10:00',note:'Morning callback',priority:'normal',done:false},
  {id:3,leadId:3,leadName:'Ramesh Babu',staff:'Arul VB',datetime:'2025-01-20T11:00',note:'Requested next week callback',priority:'normal',done:false},
];
const defCalls=[
  {id:1,leadId:1,leadName:'Mohammed Irfan',outcome:'missed',duration:0,datetime:'2025-01-15T09:30',notes:'No answer'},
  {id:2,leadId:2,leadName:'Sanjay Kumar',outcome:'answered',duration:5,datetime:'2025-01-14T14:00',notes:'Spoke for 5 mins – NI'},
  {id:3,leadId:3,leadName:'Ramesh Babu',outcome:'attempted',duration:0,datetime:'2025-01-14T11:00',notes:'Line busy'},
];
const ld=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):JSON.parse(JSON.stringify(d));}catch{return JSON.parse(JSON.stringify(d));}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
let staff=ld(K.staff,defStaff),leads=ld(K.leads,defLeads),fus=ld(K.fu,defFu),calls=ld(K.calls,defCalls);
let nLid=leads.length?Math.max(...leads.map(l=>l.id))+1:1;
let nFid=fus.length?Math.max(...fus.map(f=>f.id))+1:1;
let nCid=calls.length?Math.max(...calls.map(c=>c.id))+1:1;
let nSid=staff.length?Math.max(...staff.map(s=>s.id))+1:1;
const svL=()=>{sv(K.leads,leads);nLid=leads.length?Math.max(...leads.map(l=>l.id))+1:1;};
const svF=()=>sv(K.fu,fus);
const svC=()=>sv(K.calls,calls);
const svS=()=>sv(K.staff,staff);

/* ══ TABLE STATE ══ */
let fLeads=[...leads],curPg=1;const pp=10;
let sCol='id',sDir='desc',editId=null,delId=null,viewId=null,fuLId=null,curView='table';

/* ══ UTILS ══ */
const $=id=>document.getElementById(id);
const set=(id,v)=>{const e=$(id);if(e)e.textContent=v;};
const RC={'RNR':'b-r','Not Interested':'b-n','Switch Off':'b-s','Others':'b-o'};
const RCL={'RNR':'var(--rnr)','Not Interested':'var(--ni)','Switch Off':'var(--so)','Others':'var(--ot)'};
const bdg=r=>`<span class="bdg ${RC[r]||'b-p'}">${r||'—'}</span>`;
const hl=(t,q)=>q?String(t).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),'<mark class="hl">$1</mark>'):String(t||'');
const today=()=>new Date().toISOString().split('T')[0];
const fmtDt=dt=>new Date(dt).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'});
const staffBy=n=>staff.find(s=>s.name===n)||{name:n,av:n.slice(0,2).toUpperCase(),col:'#2F6FED'};
const notifs=[];let nNid=1;
const addNotif=(msg,meta,type)=>{notifs.unshift({id:nNid++,msg,meta,type,read:false});renderNotifs();};

/* ══ LOGIN ══ */
$('lEy').onclick=()=>{const i=$('lP');i.type=i.type==='password'?'text':'password';$('lEy').className=i.type==='password'?'fas fa-eye lf-eye':'fas fa-eye-slash lf-eye';};
function doLogin(){
  const u=$('lU').value.trim(),p=$('lP').value;
  if(!u||!p){toast('Please enter credentials','er');return;}
  $('lBT').style.display='none';$('lLd').style.display='block';
  setTimeout(()=>{
    $('loginPage').style.opacity='0';
    setTimeout(()=>{$('loginPage').style.display='none';$('app').style.display='block';initApp();},400);
  },1000);
}
function doLogout(){
  $('app').style.display='none';const lp=$('loginPage');
  lp.style.display='flex';lp.style.opacity='0';
  setTimeout(()=>{lp.style.opacity='1';},10);
  $('lBT').style.display='block';$('lLd').style.display='none';
  $('lU').value='';$('lP').value='';
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&$('loginPage').style.display!=='none')doLogin();});

/* ══ INIT ══ */
function initApp(){
  $('todayDate').textContent=new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  populateStaff();updateKPIs();renderRecent();renderPerf();renderDashFu();renderNotifs();renderStaffList();renderCallLog();renderHeatmap();initWaTemplates();updateFuBadge();initWaLeads();
  setTimeout(initCharts,80);
  // set call log dt default
  const dtNow=new Date().toISOString().slice(0,16);
  const cld=$('cl-dt');if(cld)cld.value=dtNow;
  toast('Welcome back, Maverick Ghouse Team! 👋','ok');
}

/* ══ SIDEBAR / NAV ══ */
let sbCol=false;
function toggleSb(){
  const s=$('sb');
  if(window.innerWidth<=960){s.classList.toggle('mob');$('sbOv').classList.toggle('show');}
  else{sbCol=!sbCol;s.classList.toggle('col',sbCol);}
}
function closeMobSb(){$('sb').classList.remove('mob');$('sbOv').classList.remove('show');}

/* ══ PAGE NAV ══ */
let curPage='dashboard';
function go(name,el){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nv').forEach(n=>n.classList.remove('on'));
  const pg=$('pg-'+name);if(pg)pg.classList.add('on');
  if(el)el.classList.add('on');
  else{const n=document.querySelector(`.nv[data-page="${name}"]`);if(n)n.classList.add('on');}
  curPage=name;
  if(name==='leads')renderLeads();
  if(name==='reports'){setTimeout(initRepCharts,80);renderStaffSum();}
  if(name==='followups')renderFu();
  if(name==='calllog')renderCallLog();
  if(name==='heatmap')renderHeatmap();
  if(name==='addlead'){renderTodaySumm();populateStaff();}
  if(name==='whatsapp')initWaLeads();
  if(window.innerWidth<=960)closeMobSb();
}

/* ══ THEME ══ */
let dark=false;
function toggleTheme(){
  dark=!dark;
  document.documentElement.setAttribute('data-theme',dark?'dark':'');
  $('thIco').className=dark?'fas fa-sun':'fas fa-moon';
  toast(dark?'Dark mode on 🌙':'Light mode on ☀️','info');
}

/* ══ DROPDOWNS ══ */
function toggleDd(id,e){e.stopPropagation();const d=$(id);const wasOpen=d.classList.contains('open');document.querySelectorAll('.dd').forEach(x=>x.classList.remove('open'));if(!wasOpen)d.classList.add('open');}
function closeDd(){document.querySelectorAll('.dd').forEach(d=>d.classList.remove('open'));}
document.addEventListener('click',()=>{closeDd();closeSearch();});

/* ══ NOTIFICATIONS ══ */
function renderNotifs(){
  const unread=notifs.filter(n=>!n.read).length;
  const cnt=$('niCnt');if(cnt){cnt.style.display=unread?'flex':'none';cnt.textContent=unread;}
  const icons={create:'fa-plus-circle',followup:'fa-calendar-check',edit:'fa-pen',import:'fa-file-import',call:'fa-phone'};
  const colors={create:'var(--ok)',followup:'var(--ni)',edit:'var(--primary)',import:'var(--pur)',call:'var(--teal)'};
  $('niList').innerHTML=notifs.slice(0,8).map(n=>`
    <div class="ni-item ${n.read?'':'unread'}" onclick="readNotif(${n.id})">
      <div class="ni-ico" style="background:${colors[n.type]||'#eee'}22;color:${colors[n.type]||'#888'}"><i class="fas ${icons[n.type]||'fa-bell'}"></i></div>
      <div><div class="ni-msg">${n.msg}</div><div class="ni-when">${n.meta}</div></div>
    </div>`).join('')||'<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">No notifications yet</div>';
}
function readNotif(id){const n=notifs.find(x=>x.id===id);if(n)n.read=true;renderNotifs();}
function markAllRead(){notifs.forEach(n=>n.read=true);renderNotifs();}

/* ══ STAFF SELECTS ══ */
function populateStaff(){
  const opts=staff.map(s=>`<option>${s.name}</option>`).join('');
  ['al-st','m-st','fS','rSt'].forEach(id=>{
    const e=$(id);if(!e)return;
    const isF=id==='fS'||id==='rSt';
    e.innerHTML=(isF?'<option value="">All Staff</option>':'')+opts;
  });
  // Also populate WhatsApp and call lead selects
  ['waLead','cl-ld'].forEach(id=>{
    const e=$(id);if(!e)return;
    e.innerHTML='<option value="">Select lead…</option>'+leads.map(l=>`<option value="${l.id}">${l.name} · ${l.phone}</option>`).join('');
  });
}

/* ══ KPIs ══ */
function updateKPIs(){
  const t=leads.length,r=leads.filter(l=>l.remark==='RNR').length;
  const n=leads.filter(l=>l.remark==='Not Interested').length;
  const s=leads.filter(l=>l.remark==='Switch Off').length;
  const o=leads.filter(l=>l.remark==='Others').length;
  const td=leads.filter(l=>l.date===today()).length;
  const fuDue=fus.filter(f=>!f.done&&new Date(f.datetime)<=new Date()).length;
  set('kv-t',t);set('kv-r',r);set('kv-n',n);set('kv-s',s);set('kv-o',o);
  set('ws-t',t);set('ws-td',td);set('ws-fu',fuDue);set('ws-cl',calls.length);
  set('dcN',t);set('sbLeadBadge',t);
  if(t){['r','n','s','o'].forEach((c,i)=>{ const vals=[r,n,s,o];const el=$('kb-'+c);if(el)el.style.width=(vals[i]/t*100)+'%'; });}
}

/* ══ FILTERS ══ */
function applyF(){
  const q=($('lSrch')||{}).value.toLowerCase().trim();
  const r=($('fR')||{}).value,s=($('fS')||{}).value,d=($('fD')||{}).value;
  fLeads=leads.filter(l=>{
    const mq=!q||(l.name.toLowerCase().includes(q)||l.phone.includes(q)||(l.address||'').toLowerCase().includes(q));
    return mq&&(!r||l.remark===r)&&(!s||l.staff===s)&&(!d||l.date===d);
  });
  curPg=1;sortFl();
  if(curView==='table')renderTable();else renderKanban();
}
function clearF(){['lSrch','fR','fS','fD'].forEach(id=>{const e=$(id);if(e){if(e.tagName==='SELECT')e.selectedIndex=0;else e.value='';}});applyF();}
function filterRemark(r){go('leads');const e=$('fR');if(e)e.value=r;applyF();}
function sortT(col){sDir=(sCol===col)?(sDir==='asc'?'desc':'asc'):'asc';sCol=col;document.querySelectorAll('.sc-th').forEach(th=>{th.classList.remove('sa','sd');if(th.dataset.col===col)th.classList.add(sDir==='asc'?'sa':'sd');});sortFl();if(curView==='table')renderTable();}
function sortFl(){fLeads.sort((a,b)=>{let av=a[sCol]||'',bv=b[sCol]||'';if(typeof av==='string'){av=av.toLowerCase();bv=bv.toLowerCase();}return sDir==='asc'?(av<bv?-1:av>bv?1:0):(av<bv?1:av>bv?-1:0);});}
function renderLeads(){fLeads=[...leads];sortFl();if(curView==='table')renderTable();else renderKanban();}

/* ══ VIEW TOGGLE ══ */
function setView(v){
  curView=v;
  $('tableView').style.display=v==='table'?'block':'none';
  $('kanbanView').style.display=v==='kanban'?'block':'none';
  ['vTable','vKanban'].forEach(id=>{const e=$(id);if(e)e.classList.toggle('on',id==='v'+v.charAt(0).toUpperCase()+v.slice(1));});
  if(v==='kanban')renderKanban();else renderTable();
}

/* ══ TABLE RENDER ══ */
function renderTable(){
  const total=fLeads.length,pages=Math.max(1,Math.ceil(total/pp));
  if(curPg>pages)curPg=pages;
  const start=(curPg-1)*pp,slice=fLeads.slice(start,start+pp);
  const q=($('lSrch')||{}).value||'';
  const tbody=$('lBody');if(!tbody)return;
  if(!slice.length){tbody.innerHTML=`<tr><td colspan="10"><div class="empty"><span class="empty-em">🔍</span><div class="empty-t">No leads found</div><div class="empty-s">Adjust filters or search term</div></div></td></tr>`;renderPag(0,0,0);return;}
  tbody.innerHTML=slice.map((l,i)=>`
    <tr id="row-${l.id}">
      <td><input type="checkbox" class="rck rc" value="${l.id}" onchange="updBulk()"></td>
      <td style="color:var(--text3);font-size:12px;font-weight:700">${start+i+1}</td>
      <td class="td-n">${hl(l.name,q)}</td>
      <td><div class="td-ph"><a href="tel:${l.phone}">${hl(l.phone,q)}</a><a href="https://wa.me/${l.phone.replace(/\D/g,'')}" target="_blank" class="wa-b" title="WhatsApp"><i class="fab fa-whatsapp"></i></a><a href="tel:${l.phone}" class="cl-b" title="Call"><i class="fas fa-phone"></i></a></div></td>
      <td style="font-size:12px;color:var(--text2);max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${l.address||''}">${hl(l.address||'—',q)}</td>
      <td>${bdg(l.remark)}</td>
      <td><span class="bdg b-p">${l.staff}</span></td>
      <td style="font-size:11.5px;color:var(--text3)">${l.date}</td>
      <td style="font-size:12px;color:var(--text2);max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${l.notes||''}">${l.notes||'—'}</td>
      <td><div style="display:flex;gap:4px">
        <button class="ab ab-v" onclick="viewLead(${l.id})" title="View"><i class="fas fa-eye"></i></button>
        <button class="ab ab-fu" onclick="openFuFor(${l.id})" title="Follow-Up"><i class="fas fa-calendar-plus"></i></button>
        <button class="ab ab-wa" onclick="quickWa(${l.id})" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
        <button class="ab ab-e" onclick="editLead(${l.id})" title="Edit"><i class="fas fa-pen"></i></button>
        <button class="ab ab-d" onclick="askDel(${l.id})" title="Delete"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`).join('');
  renderPag(total,start,Math.min(start+pp,total));
  set('sbLeadBadge',leads.length);
}
function renderPag(total,start,end){
  const pages=Math.max(1,Math.ceil(total/pp));
  const pi=$('pagInfo'),pc=$('pagC');
  if(pi)pi.textContent=total?`Showing ${start+1}–${end} of ${total} leads`:'No results';
  if(!pc)return;
  let h=`<button class="pgb" ${curPg<=1?'disabled':''} onclick="goPg(${curPg-1})"><i class="fas fa-chevron-left" style="font-size:10px"></i></button>`;
  let lo=Math.max(1,curPg-3),hi=Math.min(pages,lo+6);lo=Math.max(1,hi-6);
  for(let i=lo;i<=hi;i++)h+=`<button class="pgb ${i===curPg?'on':''}" onclick="goPg(${i})">${i}</button>`;
  h+=`<button class="pgb" ${curPg>=pages?'disabled':''} onclick="goPg(${curPg+1})"><i class="fas fa-chevron-right" style="font-size:10px"></i></button>`;
  pc.innerHTML=h;
}
function goPg(n){const p=Math.max(1,Math.ceil(fLeads.length/pp));if(n<1||n>p)return;curPg=n;renderTable();}
function togAll(cb){document.querySelectorAll('.rc').forEach(c=>c.checked=cb.checked);updBulk();}
function updBulk(){const n=document.querySelectorAll('.rc:checked').length;const b=$('bulkBtn');if(b){b.style.display=n?'inline-flex':'none';set('bulkTx',`Delete (${n})`);}}
function bulkDel(){const ids=[...document.querySelectorAll('.rc:checked')].map(c=>+c.value);if(!ids.length)return;leads=leads.filter(l=>!ids.includes(l.id));svL();applyF();updateKPIs();renderRecent();toast(`${ids.length} lead(s) deleted`,'ok');}

/* ══ KANBAN RENDER ══ */
function renderKanban(){
  const board=$('kanbanBoard');if(!board)return;
  const cols=['RNR','Not Interested','Switch Off','Others'];
  const colCls={'RNR':'b-r','Not Interested':'b-n','Switch Off':'b-s','Others':'b-o'};
  const colColors={'RNR':'var(--rnr)','Not Interested':'var(--ni)','Switch Off':'var(--so)','Others':'var(--ot)'};
  board.innerHTML=cols.map(col=>{
    const colLeads=fLeads.filter(l=>l.remark===col);
    return`<div class="kb-col" data-col="${col}" ondragover="kbDragOver(event,this)" ondrop="kbDrop(event,'${col}')" ondragleave="kbDragLeave(this)">
      <div class="kb-col-head">
        <span class="kb-col-title">${col}</span>
        <span class="kb-col-cnt bdg ${colCls[col]}">${colLeads.length}</span>
      </div>
      <div class="kb-drop-zone">Drop here</div>
      ${colLeads.map(l=>`
        <div class="kb-card" draggable="true" data-id="${l.id}" ondragstart="kbDragStart(event,${l.id})" ondragend="kbDragEnd(event)">
          <div class="kb-card-name">${l.name}</div>
          <div class="kb-card-phone"><i class="fas fa-phone" style="font-size:10px"></i>${l.phone}</div>
          <div class="kb-card-meta"><span class="kb-card-staff"><i class="fas fa-user" style="font-size:9px"></i> ${l.staff}</span><span class="kb-card-date">${l.date}</span></div>
          ${l.notes?`<div style="font-size:11px;color:var(--text2);margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${l.notes}</div>`:''}
          <div class="kb-card-actions">
            <button class="ab ab-v btn-sm" onclick="viewLead(${l.id})" title="View"><i class="fas fa-eye"></i></button>
            <button class="ab ab-e btn-sm" onclick="editLead(${l.id})" title="Edit"><i class="fas fa-pen"></i></button>
            <button class="ab ab-wa btn-sm" onclick="quickWa(${l.id})" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
            <button class="ab ab-d btn-sm" onclick="askDel(${l.id})" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </div>`).join('')}
    </div>`;
  }).join('');
}
let dragId=null;
function kbDragStart(e,id){dragId=id;setTimeout(()=>e.target.classList.add('dragging'),0);}
function kbDragEnd(e){e.target.classList.remove('dragging');document.querySelectorAll('.kb-col').forEach(c=>c.classList.remove('drag-over'));}
function kbDragOver(e,col){e.preventDefault();col.classList.add('drag-over');}
function kbDragLeave(col){col.classList.remove('drag-over');}
function kbDrop(e,newRemark){
  e.preventDefault();
  const l=leads.find(x=>x.id===dragId);
  if(l&&l.remark!==newRemark){
    l.remark=newRemark;
    l.timeline=l.timeline||[];
    l.timeline.push({msg:`Moved to "${newRemark}"`,date:today(),type:'edit'});
    svL();applyF();updateKPIs();toast(`Lead moved to ${newRemark}`,'ok');
  }
  document.querySelectorAll('.kb-col').forEach(c=>c.classList.remove('drag-over'));
}

/* ══ LEAD MODAL ══ */
function openAddModal(){
  editId=null;
  $('modTitle').innerHTML='<i class="fas fa-user-plus" style="color:var(--primary);margin-right:6px"></i>Add New Lead';
  ['m-n','m-ph','m-ad','m-nt'].forEach(id=>{const e=$(id);if(e)e.value='';});
  ['m-rm','m-st','m-cd'].forEach(id=>{const e=$(id);if(e)e.selectedIndex=0;});
  const mf=$('m-fu');if(mf)mf.value='';
  clearMerr();openModal('leadMod');
}
function editLead(id){
  const l=leads.find(x=>x.id===id);if(!l)return;
  editId=id;$('modTitle').innerHTML='<i class="fas fa-pen" style="color:var(--ni);margin-right:6px"></i>Edit Lead';
  $('m-n').value=l.name;$('m-ph').value=l.phone.replace(/^\+\d+\s?/,'');
  $('m-ad').value=l.address||'';$('m-nt').value=l.notes||'';
  $('m-rm').value=l.remark;$('m-st').value=l.staff;
  const mf=$('m-fu');if(mf)mf.value=l.followup||'';
  clearMerr();openModal('leadMod');
}
function clearMerr(){['mfg-n','mfg-ph','mfg-rm','mfg-st'].forEach(id=>{const e=$(id);if(e)e.classList.remove('er');});}
function val(fgId,ok){const e=$(fgId);if(e){ok?e.classList.remove('er'):e.classList.add('er');}return ok;}
function saveLead(){
  const n=$('m-n').value.trim(),p=$('m-ph').value.trim(),r=$('m-rm').value,s=$('m-st').value;
  if(!val('mfg-n',!!n)|!val('mfg-ph',p.length>=7)|!val('mfg-rm',!!r)|!val('mfg-st',!!s))return;
  const code=$('m-cd').value,fu=$('m-fu').value,now=today();
  if(editId){
    const idx=leads.findIndex(l=>l.id===editId);
    leads[idx]={...leads[idx],name:n,phone:`${code} ${p}`,address:$('m-ad').value,remark:r,staff:s,notes:$('m-nt').value,followup:fu||null};
    leads[idx].timeline=leads[idx].timeline||[];
    leads[idx].timeline.push({msg:`Updated – Remark: ${r}`,date:now,type:'edit'});
    toast('Lead updated!','ok');
  } else {
    const nl={id:nLid++,name:n,phone:`${code} ${p}`,address:$('m-ad').value,remark:r,staff:s,notes:$('m-nt').value,followup:fu||null,date:now,timeline:[{msg:'Lead created',date:now,type:'create'}]};
    leads.unshift(nl);
    if(fu)fus.push({id:nFid++,leadId:nl.id,leadName:n,staff:s,datetime:fu,note:'',priority:'normal',done:false}),svF();
    addNotif(`New lead: ${n}`,`By ${s} · ${r}`,'create');
    toast('Lead added! ✅','ok');
  }
  svL();closeModal('leadMod');applyF();updateKPIs();renderRecent();renderPerf();updateFuBadge();renderDashFu();
}

/* ══ ADD LEAD PAGE ══ */
function saveNewLead(){
  const n=$('al-n').value.trim(),p=$('al-ph').value.trim(),r=$('al-rm').value,s=$('al-st').value;
  let ok=true;
  if(!n){$('afg-n').classList.add('er');ok=false;}else $('afg-n').classList.remove('er');
  if(p.length<7){$('afg-ph').classList.add('er');ok=false;}else $('afg-ph').classList.remove('er');
  if(!r){$('afg-rm').classList.add('er');ok=false;}else $('afg-rm').classList.remove('er');
  if(!s){$('afg-st').classList.add('er');ok=false;}else $('afg-st').classList.remove('er');
  if(!ok)return;
  const code=$('al-cd').value,fu=$('al-fu').value,now=today();
  const nl={id:nLid++,name:n,phone:`${code} ${p}`,address:$('al-ad').value,remark:r,staff:s,notes:$('al-nt').value,followup:fu||null,date:now,timeline:[{msg:'Lead created',date:now,type:'create'}]};
  leads.unshift(nl);
  if(fu)fus.push({id:nFid++,leadId:nl.id,leadName:n,staff:s,datetime:fu,note:'',priority:'normal',done:false}),svF();
  svL();updateKPIs();renderRecent();renderPerf();addNotif(`New lead: ${n}`,`By ${s} · ${r}`,'create');
  toast(`Lead "${n}" saved! 🎉`,'ok');clearAddF();renderTodaySumm();populateStaff();
}
function clearAddF(){
  ['al-n','al-ph','al-ad','al-nt','al-fu'].forEach(id=>{const e=$(id);if(e)e.value='';});
  ['al-rm','al-st'].forEach(id=>{const e=$(id);if(e)e.selectedIndex=0;});
  ['afg-n','afg-ph','afg-rm','afg-st'].forEach(id=>{const e=$(id);if(e)e.classList.remove('er');});
}
function renderTodaySumm(){
  const el=$('todaySumm');if(!el)return;
  const tl=leads.filter(l=>l.date===today());
  el.innerHTML=`
    <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--text2)">Today's Leads</span><b>${tl.length}</b></div>
    <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--rnr)">RNR</span><b>${tl.filter(l=>l.remark==='RNR').length}</b></div>
    <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--ni)">Not Interested</span><b>${tl.filter(l=>l.remark==='Not Interested').length}</b></div>
    <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--ot)">Others</span><b>${tl.filter(l=>l.remark==='Others').length}</b></div>
  `;
}

/* ══ DELETE ══ */
function askDel(id){delId=id;openModal('confMod');}
function execDel(){leads=leads.filter(l=>l.id!==delId);fus=fus.filter(f=>f.leadId!==delId);svL();svF();closeModal('confMod');applyF();updateKPIs();renderRecent();toast('Lead deleted','ok');}

/* ══ VIEW LEAD DETAIL ══ */
function viewLead(id){
  const l=leads.find(x=>x.id===id);if(!l)return;
  viewId=id;
  const tlHtml=(l.timeline||[]).reverse().map(t=>{
    const ic={create:'fa-plus',call:'fa-phone',note:'fa-sticky-note',edit:'fa-pen',followup:'fa-calendar-check'};
    const cl={create:'var(--ok)',call:'var(--primary)',note:'var(--ni)',edit:'var(--pur)',followup:'var(--teal)'};
    return`<div class="tl-item"><div class="tl-ico" style="background:${cl[t.type]||'#ddd'}22;color:${cl[t.type]||'#888'}"><i class="fas ${ic[t.type]||'fa-info'}"></i></div><div><div class="tl-msg">${t.msg}</div><div class="tl-when">${t.date}</div></div></div>`;
  }).join('');
  (l.timeline||[]).reverse(); // restore order
  const fu=fus.find(f=>f.leadId===id&&!f.done);
  $('detContent').innerHTML=`
    <div style="text-align:center">
      <div class="det-av">${l.name.slice(0,2).toUpperCase()}</div>
      <div class="det-nm">${l.name}</div>
      <div class="det-ph"><a href="tel:${l.phone}" style="color:var(--primary);text-decoration:none">${l.phone}</a></div>
      <div style="margin-bottom:12px">${bdg(l.remark)}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:14px">
        <a href="tel:${l.phone}" class="btn bp btn-sm btn-ic" title="Call"><i class="fas fa-phone"></i></a>
        <a href="https://wa.me/${l.phone.replace(/\D/g,'')}" target="_blank" class="btn btn-sm btn-ic" style="background:#25D366;color:#fff;border:none" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
      </div>
      <div class="det-f">
        <div class="df"><div class="df-l">Address</div><div class="df-v">${l.address||'—'}</div></div>
        <div class="df"><div class="df-l">Staff</div><div class="df-v"><span class="bdg b-p">${l.staff}</span></div></div>
        <div class="df"><div class="df-l">Added</div><div class="df-v">${l.date}</div></div>
        ${fu?`<div class="df"><div class="df-l">Next Follow-Up</div><div class="df-v" style="color:var(--ni)">${fmtDt(fu.datetime)}</div></div>`:''}
        <div class="df"><div class="df-l">Notes</div><div class="df-v">${l.notes||'—'}</div></div>
        <div class="df"><div class="df-l">Timeline Events</div><div class="df-v">${(l.timeline||[]).length}</div></div>
      </div>
    </div>
    <div>
      <div class="section-h"><span class="section-t">Activity Timeline</span></div>
      <div class="tl-wrap">${tlHtml||'<div style="color:var(--text3);font-size:13px;padding:10px">No activity yet</div>'}</div>
      <div class="tl-add">
        <input type="text" id="tlNt" placeholder="Add a note…" onkeydown="if(event.key==='Enter')addTlNote(${l.id})">
        <button class="btn bp btn-sm" onclick="addTlNote(${l.id})"><i class="fas fa-plus"></i> Note</button>
      </div>
    </div>`;
  $('detEdBtn').onclick=()=>{closeModal('detMod');editLead(id);};
  $('detFuBtn').onclick=()=>{openFuFor(id);};
  $('detWaBtn').onclick=()=>{closeModal('detMod');quickWa(id);};
  openModal('detMod');
}
function addTlNote(lid){const inp=$('tlNt');if(!inp)return;const msg=inp.value.trim();if(!msg)return;const l=leads.find(x=>x.id===lid);if(!l)return;l.timeline=l.timeline||[];l.timeline.push({msg,date:today(),type:'note'});svL();viewLead(lid);toast('Note added','ok');}

/* ══ FOLLOW-UPS ══ */
function openFuFor(id){const l=leads.find(x=>x.id===id);if(!l)return;fuLId=id;$('fu-nm').value=l.name;const d=new Date();d.setDate(d.getDate()+1);$('fu-dt').value=d.toISOString().slice(0,16);$('fu-nt').value='';$('fu-pr').value='normal';openModal('fuMod');}
function saveFu(){const dt=$('fu-dt').value;if(!dt){toast('Please set date/time','er');return;}const l=leads.find(x=>x.id===fuLId);const fu={id:nFid++,leadId:fuLId,leadName:l?l.name:'Unknown',staff:l?l.staff:'',datetime:dt,note:$('fu-nt').value,priority:$('fu-pr').value,done:false};fus.push(fu);if(l){l.followup=dt;l.timeline=l.timeline||[];l.timeline.push({msg:`Follow-up scheduled: ${fmtDt(dt)}`,date:today(),type:'followup'});svL();}svF();closeModal('fuMod');updateKPIs();renderDashFu();updateFuBadge();toast(`Follow-up scheduled for ${fmtDt(dt)} 📅`,'ok');}
function updateFuBadge(){const n=fus.filter(f=>!f.done).length;set('sbFuBadge',n||'');}
function renderFu(){
  const tbody=$('fuBody');if(!tbody)return;
  const now=new Date(),td=today();
  const getS=f=>{if(f.done)return 'done';const d=new Date(f.datetime);if(d<now)return 'overdue';if(f.datetime.startsWith(td))return 'today';return 'upcoming';};
  const q=($('fuSrch')||{}).value.toLowerCase(),ft=($('fuFT')||{}).value;
  const list=fus.filter(f=>!f.done&&(!q||(f.leadName.toLowerCase().includes(q)||f.staff.toLowerCase().includes(q)))&&(!ft||ft===getS(f)));
  const ov=fus.filter(f=>getS(f)==='overdue').length,tdc=fus.filter(f=>getS(f)==='today').length,up=fus.filter(f=>getS(f)==='upcoming').length;
  set('fuKov',ov);set('fuKtd',tdc);set('fuKup',up);
  if(!list.length){tbody.innerHTML=`<tr><td colspan="8"><div class="empty"><span class="empty-em">📅</span><div class="empty-t">No follow-ups</div><div class="empty-s">Schedule a follow-up from the Leads page</div></div></td></tr>`;return;}
  const pb={'urgent':'b-r','high':'b-n','normal':'b-p'};
  tbody.innerHTML=list.map(f=>{const s=getS(f);const sb=s==='overdue'?'<span class="bdg b-r">Overdue</span>':s==='today'?'<span class="bdg b-n">Today</span>':'<span class="bdg b-p">Upcoming</span>';const l=leads.find(x=>x.id===f.leadId);return`<tr>
    <td class="td-n">${f.leadName}</td>
    <td><div class="td-ph">${l?`<a href="tel:${l.phone}">${l.phone}</a>`:''}</div></td>
    <td><span class="bdg b-p">${f.staff}</span></td>
    <td>${l?bdg(l.remark):'—'}</td>
    <td style="font-size:12px">${fmtDt(f.datetime)}</td>
    <td><span class="bdg ${pb[f.priority]||'b-p'}">${f.priority}</span></td>
    <td>${sb}</td>
    <td><div style="display:flex;gap:4px">
      ${l?`<button class="ab ab-v" onclick="viewLead(${l.id})" title="View"><i class="fas fa-eye"></i></button>`:''}
      <button class="ab ab-e" onclick="markFuDone(${f.id})" title="Done" style="background:#f6ffed;color:var(--ok)"><i class="fas fa-check"></i></button>
      <button class="ab ab-d" onclick="delFu(${f.id})" title="Delete"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`;}).join('');
}
function markFuDone(id){const f=fus.find(x=>x.id===id);if(f)f.done=true;svF();renderFu();updateKPIs();updateFuBadge();renderDashFu();toast('Follow-up done ✅','ok');}
function delFu(id){fus=fus.filter(f=>f.id!==id);svF();renderFu();updateFuBadge();}

/* ══ CALL LOG ══ */
function logCall(){
  const lid=+($('cl-ld').value);const out=$('cl-out').value;const l=leads.find(x=>x.id===lid);
  const cl={id:nCid++,leadId:lid,leadName:l?l.name:'Unknown',outcome:out,duration:+($('cl-dur').value)||0,datetime:$('cl-dt').value||new Date().toISOString().slice(0,16),notes:$('cl-nt').value};
  calls.unshift(cl);svC();
  if(l){l.timeline=l.timeline||[];l.timeline.push({msg:`Call logged – ${out}${cl.duration?' ('+cl.duration+' min)':''}`,date:today(),type:'call'});svL();}
  closeModal('addCallModal');renderCallLog();updateKPIs();set('ws-cl',calls.length);
  toast('Call logged!','ok');
}
function renderCallLog(){
  const el=$('callLogList');if(!el)return;
  set('clAns',calls.filter(c=>c.outcome==='answered').length);
  set('clMis',calls.filter(c=>c.outcome==='missed').length);
  set('clAtt',calls.filter(c=>c.outcome==='attempted').length);
  const ico={answered:'fa-phone',missed:'fa-phone-slash',attempted:'fa-phone-volume'};
  const col={answered:'var(--ok)',missed:'var(--rnr)',attempted:'var(--ni)'};
  if(!calls.length){el.innerHTML='<div class="empty"><span class="empty-em">📞</span><div class="empty-t">No calls logged</div><div class="empty-s">Log your first call above</div></div>';return;}
  el.innerHTML=calls.slice(0,20).map(c=>`
    <div class="cl-item ${c.outcome}">
      <div class="cl-ico" style="background:${col[c.outcome]}22;color:${col[c.outcome]}"><i class="fas ${ico[c.outcome]}"></i></div>
      <div style="flex:1;min-width:0"><div class="cl-nm">${c.leadName}</div><div class="cl-ph">${c.notes||'—'}</div><div class="cl-when">${fmtDt(c.datetime)}</div></div>
      <div style="text-align:right">${c.duration?`<div class="cl-dur">${c.duration} min</div>`:''}
      <div style="font-size:11px;color:var(--text3);margin-top:2px;text-transform:capitalize">${c.outcome}</div></div>
    </div>`).join('');
}
function exportCallLog(){const rows=[['Lead','Outcome','Duration','Date','Notes'],...calls.map(c=>[c.leadName,c.outcome,c.duration,c.datetime,c.notes])];const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv);a.download='CallLog.csv';a.click();toast('Call log exported!','ok');}

/* ══ DASHBOARD WIDGETS ══ */
function renderRecent(){
  const el=$('recentList');if(!el)return;
  el.innerHTML=leads.slice(0,7).map(l=>`<div class="act-item" onclick="viewLead(${l.id})"><div class="act-dot" style="background:${RCL[l.remark]||'#2F6FED'}"></div><div style="flex:1;min-width:0"><div class="act-nm">${l.name}</div><div class="act-mt">${l.phone} · ${l.date}</div></div>${bdg(l.remark)}</div>`).join('');
}
function renderPerf(){
  const el=$('perfList');if(!el)return;
  const cnts={};staff.forEach(s=>cnts[s.name]=leads.filter(l=>l.staff===s.name).length);
  const sorted=Object.entries(cnts).sort((a,b)=>b[1]-a[1]);const max=sorted[0]?sorted[0][1]:1;
  const rkc=['rk-g','rk-s','rk-b','rk-o'];
  el.innerHTML=sorted.map(([n,c],i)=>{const s=staffBy(n);return`<div class="pf-item"><div class="pf-rk ${rkc[i]||'rk-o'}">${i+1}</div><div class="pf-av" style="background:${s.col}">${s.av}</div><div style="flex:1;min-width:0"><div class="pf-nm">${n}</div><div class="pf-rl">${c} leads</div></div><div class="pf-bar"><div class="pf-bf" style="width:${max?c/max*100:0}%;background:${s.col}"></div></div><div class="pf-cnt">${c}</div></div>`;}).join('');
}
function renderDashFu(){
  const el=$('dashFu');if(!el)return;
  const now=new Date(),td=today();
  const list=fus.filter(f=>!f.done).slice(0,5);
  if(!list.length){el.innerHTML='<div style="text-align:center;padding:20px;color:var(--text3);font-size:13px">No pending follow-ups 🎉</div>';return;}
  el.innerHTML=list.map(f=>{const d=new Date(f.datetime);const ov=d<now,tdc=f.datetime.startsWith(td);return`<div class="fu-mini ${ov?'ov':tdc?'td':''}" onclick="go('followups')"><div style="flex:1;min-width:0"><div class="fu-nm">${f.leadName}</div><div class="fu-tm">${fmtDt(f.datetime)} · ${f.staff}</div></div><span class="fu-bx ${ov?'fov':tdc?'ftd':'fup'}">${ov?'Overdue':tdc?'Today':'Soon'}</span></div>`;}).join('');
}

/* ══ HEATMAP ══ */
function renderHeatmap(){
  const cnt=$('hmContainer');if(!cnt)return;
  const yr=+($('hmYear')||{value:'2025'}).value||2025;
  const start=new Date(yr,0,1),end=new Date(yr,11,31);
  // Build date→count map
  const map={};leads.forEach(l=>{if(l.date&&l.date.startsWith(yr))map[l.date]=(map[l.date]||0)+1;});
  const maxV=Math.max(...Object.values(map),1);
  const colors=['#ebedf0','#c6e48b','#7bc96f','#239a3b','#196127'];
  const getC=n=>{if(!n)return colors[0];const i=Math.ceil(n/maxV*4);return colors[Math.min(i,4)];};
  // Months labels
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // Build grid week by week
  let html='<div style="display:flex;gap:3px">';
  // Day labels
  html+='<div style="display:flex;flex-direction:column;gap:3px;margin-right:4px">';
  ['','Mon','','Wed','','Fri',''].forEach(d=>`<div style="height:13px;font-size:9px;color:var(--text3);line-height:13px">${d}</div>`).forEach(x=>html+=x);
  html+='</div>';
  // Weeks
  const firstDay=start.getDay(); // 0=Sun
  let d=new Date(start);d.setDate(d.getDate()-firstDay);
  while(d<=end){
    html+='<div style="display:flex;flex-direction:column;gap:3px">';
    for(let day=0;day<7;day++){
      const ds=d.toISOString().split('T')[0];const inYear=d.getFullYear()===yr;const c=inYear?map[ds]||0:0;
      html+=`<div class="hm-cell" style="width:13px;height:13px;background:${inYear?getC(c):'transparent'}" data-tip="${inYear?`${ds}: ${c} lead${c!==1?'s':''}`:''}" title="${inYear?ds:''}"></div>`;
      d.setDate(d.getDate()+1);
    }
    html+='</div>';
  }
  html+='</div>';
  cnt.innerHTML=html;
  // Legend
  const lb=$('hmLegBar');if(lb)lb.innerHTML=colors.map(c=>`<div class="hm-leg-cell" style="background:${c}"></div>`).join('');
  // Top days
  const td2=$('topDays');if(td2){const top=Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,5);td2.innerHTML=top.map(([d,c])=>`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--text2)">${d}</span><span class="bdg b-p">${c} leads</span></div>`).join('')||'<div style="color:var(--text3);font-size:13px">No data yet</div>';}
  // Monthly
  const ms=$('monthSumm');if(ms){const mo=months.map((nm,i)=>{const pre=`${yr}-${String(i+1).padStart(2,'0')}`;const c=leads.filter(l=>l.date&&l.date.startsWith(pre)).length;return[nm,c];});ms.innerHTML=mo.map(([m,c])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border);font-size:12px"><span style="color:var(--text2);min-width:30px">${m}</span><div style="flex:1;margin:0 10px;height:6px;background:var(--border);border-radius:3px;overflow:hidden"><div style="height:100%;background:var(--primary);border-radius:3px;width:${Math.max(c/Math.max(...mo.map(x=>x[1]),1)*100,0)}%"></div></div><b>${c}</b></div>`).join('');}
}

/* ══ WHATSAPP COMPOSER ══ */
const waTpls=[
  {name:'Follow-Up',msg:'Hi {name},\n\nThis is a follow-up regarding the overseas job opportunity we discussed. Please let us know if you are still interested or have any questions.\n\nBest regards,\nMaverick Ghouse Team'},
  {name:'Job Offer',msg:'Dear {name},\n\nWe have an exciting job opportunity in {country} that matches your profile. Please contact us at your earliest convenience to discuss further details.\n\nMaverick Ghouse Consultancy'},
  {name:'Document Request',msg:'Hello {name},\n\nTo proceed with your application, we require the following documents:\n• Passport copy\n• Educational certificates\n• Work experience letters\n\nKindly share at your earliest.\n\nThank you!'},
  {name:'Interview Reminder',msg:'Hi {name},\n\nThis is a reminder about your interview scheduled with us. Please be present on time and carry all original documents.\n\nGood luck! 🌟\nMaverick Ghouse'},
  {name:'Thank You',msg:'Dear {name},\n\nThank you for your time today. We will review your profile and get back to you shortly regarding the next steps.\n\nBest wishes,\nMaverick Ghouse Team'},
];
function initWaTemplates(){
  const el=$('waTpls');if(!el)return;
  el.innerHTML=waTpls.map((t,i)=>`<span class="wa-tpl" onclick="applyWaTpl(${i})">${t.name}</span>`).join('');
  updateWaPreview();
}
function applyWaTpl(i){
  const lead=leads.find(l=>l.id===+$('waLead').value);
  let msg=waTpls[i].msg;
  if(lead){msg=msg.replace(/{name}/g,lead.name).replace(/{country}/g,'Malaysia / Singapore');}
  $('waMsg').value=msg;updateWaPreview();
  $('waTpls').querySelectorAll('.wa-tpl').forEach((t,j)=>t.classList.toggle('sel',j===i));
}
function updateWaPreview(){
  const msg=$('waMsg').value||'Your message will appear here…';
  $('waPreview').textContent=msg;
  const c=(msg.length);$('waChar').textContent=c;
  const now=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  $('waTime').textContent=now+' ✓✓';
}
function autoFillWa(){const lid=+$('waLead').value;const l=leads.find(x=>x.id===lid);if(l)$('waPhone').value=l.phone;}
function sendWa(){const p=($('waPhone').value||'').replace(/\D/g,'');const msg=$('waMsg').value;if(!p||!msg){toast('Enter phone and message','er');return;}const url=`https://wa.me/${p}?text=${encodeURIComponent(msg)}`;window.open(url,'_blank');toast('Opening WhatsApp…','ok');}
function quickWa(id){const l=leads.find(x=>x.id===id);if(!l)return;const msg=`Hi ${l.name},\n\nThis is Maverick Ghouse Consultancy. We have an exciting overseas job opportunity for you.\n\nPlease let us know if you are interested.\n\nBest regards,\nMaverick Ghouse Team`;const url=`https://wa.me/${l.phone.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`;window.open(url,'_blank');toast('Opening WhatsApp…','ok');}
function copyWaMsg(){const msg=$('waMsg').value;if(!msg)return;navigator.clipboard.writeText(msg).then(()=>toast('Message copied!','ok')).catch(()=>toast('Copy failed','er'));}
function sendBulkWa(){const cked=[...document.querySelectorAll('.rc:checked')].map(c=>+c.value);if(!cked.length){toast('Select leads from the Leads page first','wn');return;}const msg=$('waMsg').value;if(!msg){toast('Write a message first','er');return;}cked.forEach(id=>{const l=leads.find(x=>x.id===id);if(l){const url=`https://wa.me/${l.phone.replace(/\D/g,'')}?text=${encodeURIComponent(msg.replace(/{name}/g,l.name))}`;window.open(url,'_blank');}});toast(`WhatsApp opened for ${cked.length} leads`,'ok');}
function initWaLeads(){const e=$('waLead');if(!e)return;e.innerHTML='<option value="">-- Choose a lead --</option>'+leads.map(l=>`<option value="${l.id}">${l.name} · ${l.phone}</option>`).join('');}

/* ══ GLOBAL SEARCH ══ */
function handleSearch(v){
  const box=$('srchDrop');if(!v||v.length<2){box.classList.remove('open');return;}
  const res=leads.filter(l=>l.name.toLowerCase().includes(v.toLowerCase())||l.phone.includes(v)).slice(0,6);
  if(!res.length){box.innerHTML='<div style="padding:14px;text-align:center;font-size:13px;color:var(--text3)">No leads found</div>';box.classList.add('open');return;}
  box.innerHTML=res.map(l=>`<div class="sri" onclick="pickSrch(${l.id})"><div class="sri-av">${l.name.slice(0,2).toUpperCase()}</div><div><div class="n">${l.name}</div><div class="m">${l.phone} · ${l.remark}</div></div>${bdg(l.remark)}</div>`).join('');
  box.classList.add('open');
}
function pickSrch(id){closeSearch();$('gSrch').value='';viewLead(id);}
function closeSearch(){$('srchDrop').classList.remove('open');}

/* ══ IMPORT CSV ══ */
let importRows=[];
function dzOver(e){e.preventDefault();$('dropZone').classList.add('over');}
function dzLeave(){$('dropZone').classList.remove('over');}
function dzDrop(e){e.preventDefault();$('dropZone').classList.remove('over');const f=e.dataTransfer.files[0];if(f)parseCSV(f);}
function handleCSV(inp){if(inp.files[0])parseCSV(inp.files[0]);}
function parseCSV(file){
  const r=new FileReader();
  r.onload=e=>{
    const lines=e.target.result.split('\n').filter(l=>l.trim());
    if(lines.length<2){toast('CSV must have header + data rows','er');return;}
    const headers=lines[0].split(',').map(h=>h.replace(/"/g,'').trim().toLowerCase());
    importRows=lines.slice(1).map(line=>{
      const vals=line.match(/(".*?"|[^,]+)/g)||[];
      const row={};headers.forEach((h,i)=>row[h]=(vals[i]||'').replace(/"/g,'').trim());
      return{name:row.name||row['full name']||'',phone:row.phone||row['phone number']||'',address:row.address||'',remark:row.remark||row.remarks||'Others',staff:row.staff||row['staff name']||(staff[0]?staff[0].name:''),notes:row.notes||''};
    }).filter(r=>r.name);
    const valid=importRows.filter(r=>r.name&&r.phone);
    const invalid=importRows.length-valid.length;
    const pre=$('importPreview');
    pre.innerHTML=`<div class="import-preview"><table><thead><tr><th>Name</th><th>Phone</th><th>Remark</th><th>Staff</th></tr></thead><tbody>${valid.slice(0,5).map(r=>`<tr><td>${r.name}</td><td>${r.phone}</td><td>${bdg(r.remark)}</td><td>${r.staff}</td></tr>`).join('')}</tbody></table></div>`;
    $('importStats').innerHTML=`<div class="istat" style="background:#f6ffed;color:var(--ok);border:1px solid #b7eb8f">✓ ${valid.length} valid rows</div>${invalid?`<div class="istat" style="background:#fff0f0;color:var(--rnr);border:1px solid #ffccc7">✗ ${invalid} skipped</div>`:''}`;
    $('importBtn').style.display='inline-flex';
    importRows=valid;
  };r.readAsText(file);
}
function confirmImport(){
  if(!importRows.length){toast('No valid rows to import','er');return;}
  const now=today();
  importRows.forEach(r=>{leads.unshift({id:nLid++,name:r.name,phone:r.phone,address:r.address,remark:r.remark,staff:r.staff,notes:r.notes,date:now,timeline:[{msg:'Imported via CSV',date:now,type:'create'}]});});
  svL();closeModal('importModal');applyF();updateKPIs();renderRecent();
  addNotif(`${importRows.length} leads imported from CSV`,'Just now','import');
  toast(`✅ ${importRows.length} leads imported!`,'ok');
  $('importPreview').innerHTML='';$('importStats').innerHTML='';$('importBtn').style.display='none';importRows=[];
}
function downloadTemplate(){
  const csv='"Name","Phone","Address","Remark","Staff","Notes"\n"Mohammed Irfan","+91 9876543210","Chennai, TN","RNR","Ahmed","Interested in Malaysia"\n"Sanjay Kumar","+91 8765432109","Coimbatore, TN","Others","Logeshwari HR","Follow up next week"';
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv);a.download='MG_Import_Template.csv';a.click();toast('Template downloaded','ok');
}

/* ══ EXPORT ══ */
function exportCSV(){
  const rows=[['#','Name','Phone','Address','Remarks','Staff','Date','Notes'],...leads.map((l,i)=>[i+1,l.name,l.phone,l.address||'',l.remark,l.staff,l.date,l.notes||''])];
  const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv);a.download=`MGLeads_${today()}.csv`;a.click();toast('CSV exported 📥','ok');
}

/* ══ STAFF SETTINGS ══ */
function renderStaffList(){
  const el=$('staffListEl');if(!el)return;
  el.innerHTML=staff.map(s=>`<div class="sr-row"><div class="sr-l"><div class="sr-av" style="background:${s.col}">${s.av}</div><div><div class="sr-nm">${s.name}</div><div class="sr-rl">${s.phone||'No phone'}</div></div></div><div style="display:flex;align-items:center;gap:8px"><span class="role-b ${s.role==='admin'?'r-admin':'r-staff'}">${s.role}</span><button class="ab ab-d" onclick="rmStaff(${s.id})"><i class="fas fa-trash"></i></button></div></div>`).join('');
}
function addStaff(){const n=$('ns-n').value.trim();if(!n){toast('Name required','er');return;}const cols=['#2F6FED','#FA8C16','#52C41A','#722ED1','#FF4D4F','#1890FF'];const s={id:nSid++,name:n,role:$('ns-r').value,phone:$('ns-p').value,av:n.slice(0,2).toUpperCase(),col:cols[staff.length%cols.length]};staff.push(s);svS();populateStaff();renderStaffList();closeModal('addStaffMod');$('ns-n').value='';$('ns-p').value='';toast(`Staff "${n}" added!`,'ok');}
function rmStaff(id){const s=staff.find(x=>x.id===id);staff=staff.filter(x=>x.id!==id);svS();populateStaff();renderStaffList();if(s)toast(`${s.name} removed`,'ok');}

/* ══ REPORTS ══ */
function applyReport(){toast('Report filtered!','info');renderStaffSum();}
function renderStaffSum(){
  const el=$('staffSumBody');if(!el)return;
  el.innerHTML=staff.map(s=>{const sl=leads.filter(l=>l.staff===s.name);const t=sl.length,r=sl.filter(l=>l.remark==='RNR').length,n=sl.filter(l=>l.remark==='Not Interested').length,so=sl.filter(l=>l.remark==='Switch Off').length,o=sl.filter(l=>l.remark==='Others').length;const cl=calls.filter(c=>c.leadName&&leads.find(l=>l.staff===s.name&&l.name===c.leadName)).length;const pct=t?Math.round(o/t*100):0;return`<tr><td style="font-weight:700"><div style="display:flex;align-items:center;gap:8px"><div style="width:24px;height:24px;border-radius:6px;background:${s.col};color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center">${s.av}</div>${s.name}</div></td><td>${t}</td><td>${bdg('RNR').replace('>RNR',`>${r}`)}</td><td>${bdg('Not Interested').replace('>Not Interested',`>${n}`)}</td><td>${bdg('Switch Off').replace('>Switch Off',`>${so}`)}</td><td>${bdg('Others').replace('>Others',`>${o}`)}</td><td>${cl}</td><td><span class="bdg ${pct>=60?'b-g':'b-r'}">${pct}%</span></td></tr>`;}).join('');
}

/* ══ CHARTS ══ */
let chartsInit=false,rChartsInit=false;
let dnutInst=null,barInst=null,lineInst=null;
function gc(){return dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.04)';}
function tc(){return dark?'#94a3b8':'#6b7280';}
function initCharts(){
  if(chartsInit)return;chartsInit=true;
  const cols=['#FF4D4F','#FA8C16','#8C8C8C','#1890FF'];
  const t=leads.length,r=leads.filter(l=>l.remark==='RNR').length,n=leads.filter(l=>l.remark==='Not Interested').length,s=leads.filter(l=>l.remark==='Switch Off').length,o=leads.filter(l=>l.remark==='Others').length;
  // Donut
  const dc=$('dnut');if(dc){dnutInst=new Chart(dc,{type:'doughnut',data:{labels:['RNR','Not Interested','Switch Off','Others'],datasets:[{data:[r,n,s,o],backgroundColor:cols,borderWidth:0,hoverOffset:5}]},options:{cutout:'70%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>` ${c.label}: ${c.raw}`}}},animation:{animateScale:true,duration:900}}});const lg=$('dnutLgd');if(lg)lg.innerHTML=['RNR','NI','SW Off','Others'].map((l,i)=>`<div class="lgd"><div class="lgd-c" style="background:${cols[i]}"></div>${l}</div>`).join('');}
  // Bar
  const sn=staff.map(s=>s.name),sc=sn.map(n=>leads.filter(l=>l.staff===n).length);
  const bc=$('barC');if(bc)barInst=new Chart(bc,{type:'bar',data:{labels:sn,datasets:[{label:'Leads',data:sc,backgroundColor:cols.slice(0,sn.length).concat(cols).slice(0,sn.length),borderRadius:7,borderSkipped:false}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:gc()},ticks:{font:{family:'Poppins',size:11},color:tc()}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:11},color:tc()}}},animation:{duration:900}}});
  // Line (cumulative)
  const days=[],dv=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}));const ds=d.toISOString().split('T')[0];dv.push(leads.filter(l=>l.date<=ds).length);}
  const lc=$('lineC');if(lc)lineInst=new Chart(lc,{type:'line',data:{labels:days,datasets:[{label:'Leads',data:dv,borderColor:'#2F6FED',backgroundColor:'rgba(47,111,237,.07)',tension:.42,fill:true,pointBackgroundColor:'#2F6FED',pointRadius:3,pointHoverRadius:5}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:gc()},ticks:{font:{family:'Poppins',size:11},color:tc()}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:11},color:tc(),maxRotation:0,maxTicksLimit:7}}},animation:{duration:1000}}});
}
function swBar(btn,mode){btn.closest('.chtabs').querySelectorAll('.ctab').forEach(b=>b.classList.remove('on'));btn.classList.add('on');if(barInst){const sn=staff.map(s=>s.name);barInst.data.datasets[0].data=sn.map(n=>leads.filter(l=>l.staff===n).length+(mode==='m'?Math.floor(Math.random()*4):0));barInst.update();}}
function swLine(btn,mode){btn.closest('.chtabs').querySelectorAll('.ctab').forEach(b=>b.classList.remove('on'));btn.classList.add('on');if(lineInst){const days=[],dv=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}));const ds=d.toISOString().split('T')[0];dv.push(mode==='c'?leads.filter(l=>l.date<=ds).length:leads.filter(l=>l.date===ds).length);}lineInst.data.labels=days;lineInst.data.datasets[0].data=dv;lineInst.update();}}
function initRepCharts(){
  if(rChartsInit)return;rChartsInit=true;
  const cols=['#FF4D4F','#FA8C16','#8C8C8C','#1890FF'];
  const t=leads.length,r=leads.filter(l=>l.remark==='RNR').length,n=leads.filter(l=>l.remark==='Not Interested').length,s=leads.filter(l=>l.remark==='Switch Off').length,o=leads.filter(l=>l.remark==='Others').length;
  const rp=$('rPie');if(rp)new Chart(rp,{type:'pie',data:{labels:['RNR','Not Interested','Switch Off','Others'],datasets:[{data:[r,n,s,o],backgroundColor:cols,borderWidth:0}]},options:{plugins:{legend:{position:'bottom',labels:{boxWidth:10,font:{family:'Poppins',size:11},color:tc()}}},animation:{animateScale:true}}});
  const rb=$('rBar');if(rb){const sn=staff.map(s=>s.name);new Chart(rb,{type:'bar',data:{labels:sn,datasets:[{label:'Leads',data:sn.map(n=>leads.filter(l=>l.staff===n).length),backgroundColor:'#2F6FED',borderRadius:7,borderSkipped:false}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:gc()},ticks:{font:{family:'Poppins',size:11},color:tc()}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:11},color:tc()}}}}});}
  const rl=$('rLine');if(rl)new Chart(rl,{type:'line',data:{labels:['Sep','Oct','Nov','Dec','Jan','Feb'],datasets:[{label:'Leads',data:[10,15,18,22,leads.length,leads.length+2],borderColor:'#2F6FED',backgroundColor:'rgba(47,111,237,.07)',tension:.4,fill:true,pointBackgroundColor:'#2F6FED',pointRadius:4}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:gc()},ticks:{font:{family:'Poppins',size:11},color:tc()}},x:{grid:{display:false},ticks:{font:{family:'Poppins',size:11},color:tc()}}}}});
}

/* ══ MODALS ══ */
function openModal(id){$(id).classList.add('open');}
function closeModal(id){$(id).classList.remove('open');}
document.querySelectorAll('.mlov').forEach(o=>o.addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');}));

/* ══ PW TOGGLE ══ */
document.querySelectorAll('.pw-ey').forEach(t=>t.addEventListener('click',function(){const i=this.previousElementSibling;i.type=i.type==='password'?'text':'password';this.className=i.type==='password'?'fas fa-eye pw-ey':'fas fa-eye-slash pw-ey';}));

/* ══ TOAST ══ */
function toast(msg,type='info'){
  const ic={ok:'fa-check-circle',er:'fa-times-circle',info:'fa-info-circle',wn:'fa-exclamation-triangle'};
  const t=document.createElement('div');t.className=`toast t-${type}`;
  t.innerHTML=`<i class="fas ${ic[type]||'fa-info-circle'}"></i><span style="flex:1">${msg}</span><i class="fas fa-times tx" onclick="this.parentElement.remove()"></i>`;
  $('toasts').appendChild(t);
  setTimeout(()=>{t.style.animation='tOut .28s ease forwards';setTimeout(()=>t.remove(),280);},4000);
}

/* ══ KEYBOARD SHORTCUTS ══ */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')document.querySelectorAll('.mlov.open').forEach(m=>m.classList.remove('open'));
  if($('app').style.display==='none')return;
  if(e.ctrlKey&&e.key==='n'){e.preventDefault();openAddModal();}
  if(e.ctrlKey&&e.key==='/'){e.preventDefault();$('gSrch').focus();}
  if(e.ctrlKey&&e.key==='d'){e.preventDefault();toggleTheme();}
  if(e.ctrlKey&&e.key==='l'){e.preventDefault();go('leads');}
  if(e.ctrlKey&&e.key==='h'){e.preventDefault();go('dashboard');}
});
