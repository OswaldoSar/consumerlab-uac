/* CONSUMERLAB UAC | asistencia y recursos por sesión 2026-II
 * Leerá asistencias-config.json generado desde la cuenta del docente.
 * No contiene nombres ni notas. Compatible con ruta.html y unidad-1/2/3.html.
 */
(function () {
  'use strict';
  const scriptUrl = document.currentScript && document.currentScript.src;
  const configUrl = new URL('asistencias-config.json', scriptUrl || window.location.href);
  const page = (location.pathname.split('/').pop() || '').toLowerCase();
  const START = [1, 7, 13], END = [6, 12, 20];
  const DAYS = ['Lunes', 'Miércoles', 'Viernes'];
  const id = name => document.getElementById(name);

  function addStyle() {
    if (id('asistencias-uac-estilo')) return;
    const s = document.createElement('style');
    s.id = 'asistencias-uac-estilo';
    s.textContent = `
      .uac-asistencia {border:1px solid #dce7f5;border-radius:20px;padding:19px;margin:18px 0;background:linear-gradient(125deg,#fff,#f0f6ff);box-shadow:0 6px 22px rgba(27,50,99,.06)}
      .uac-asistencia h3 {margin:3px 0 9px;font-size:1.18rem;color:#002158}
      .uac-asistencia p {margin:0 0 10px;color:#5f6d89;font-size:.88rem}
      .uac-asistencia small {font-size:.73rem;color:#64748b;line-height:1.5}
      .uac-botones {display:flex;flex-wrap:wrap;gap:8px}
      .uac-boton {display:inline-flex;align-items:center;justify-content:center;text-decoration:none!important;background:#002158;color:white!important;font-weight:750;font-size:.8rem;border-radius:10px;padding:8px 10px;line-height:1.4;border:1px solid #002158}
      .uac-boton.uac-sec {background:white;color:#002158!important;border-color:#b9cce3}
      .uac-sesion {margin:10px 0;padding:12px;border:1px solid #dce7f5;background:#f8fbff;border-radius:13px}
      .uac-sesion summary {cursor:pointer;font-size:.86rem;font-weight:800;color:#002158}
      .uac-dias {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}
      .uac-dia {background:white;border:1px solid #e1eaf7;padding:9px;border-radius:11px}
      .uac-dia b {display:block;margin-bottom:8px;color:#17213d;font-size:.78rem}
      .uac-dia .uac-boton {display:flex;width:100%;margin-top:5px;text-align:center}
      .uac-pendiente {font-weight:750;color:#9a3412}
      .uac-rubrica-access {display:flex;flex-wrap:wrap;align-items:center;gap:11px;margin-top:17px;padding:15px;border:1px solid #c9d8f0;background:linear-gradient(115deg,#f5f8ff,#e7f7ff);border-radius:15px}
      .uac-rubrica-access p {margin:0;color:#425779;font-size:.86rem;flex:1 1 240px}
      .uac-rubrica-access .uac-boton {flex:0 0 auto}
      .uac-rubrica-hero {margin:7px 0}
      .uac-recursos-sesion {margin-top:10px;padding:12px;border-radius:12px;background:#f6fbff;border:1px solid #c9e6f0}
      .uac-recursos-sesion p {margin:0 0 9px;color:#455873;font-size:.8rem;line-height:1.55}
      .uac-recursos-sesion .uac-boton {font-size:.77rem}
      .uac-fotos-sesion {margin-top:10px;padding:10px 12px;border-radius:11px;background:white;border:1px solid #dae5f2}
      .uac-fotos-sesion summary {cursor:pointer;font-size:.79rem;font-weight:850;color:#002158}
      .uac-fotos-sesion .uac-botones {margin-top:10px}
      .uac-fotos-sesion .uac-boton {flex:1}
      .uac-material-etiquetas {display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
      .uac-material-etiquetas span {padding:4px 7px;border-radius:8px;background:#e4efff;color:#002158;font-size:.7rem;font-weight:750}

      @media(max-width:690px){.uac-dias{grid-template-columns:1fr}.uac-boton{width:100%}}
    `;
    document.head.appendChild(s);
  }
  function anchor(text,url,secondary=false){
    const a=document.createElement('a');a.className='uac-boton'+(secondary?' uac-sec':'');
    a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=text;return a;
  }
  function col(n){let s='';while(n>0){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s;}
  function unitForWeek(w){return w<=6?0:w<=12?1:2;}
  function sheetTab(config,u){return config.sheetIds['unidad'+(u+1)];}
  function sheetUrl(config,gid,range){return config.spreadsheetUrl+'#gid='+gid+(range?'&range='+range:'');}
  function folderUrl(fid){return 'https://drive.google.com/drive/folders/'+fid;}
  function dayPanel(config,w){
    const u=unitForWeek(w),wrap=document.createElement('details');wrap.className='uac-sesion';
    const sum=document.createElement('summary');sum.textContent='📋 Semana '+String(w).padStart(2,'0')+' · registrar asistencia';wrap.appendChild(sum);
    const grid=document.createElement('div');grid.className='uac-dias';
    DAYS.forEach((day,d)=>{
      const cell=document.createElement('div');cell.className='uac-dia';
      const title=document.createElement('b');title.textContent=day;cell.appendChild(title);
      const localCol=col(4+(w-START[u])*3+d);
      cell.appendChild(anchor('✓ Marcar asistencia',sheetUrl(config,sheetTab(config,u),localCol+'7:'+localCol+'34')));
      grid.appendChild(cell);
    });
    wrap.appendChild(grid);
    return wrap;
  }
  function sessionResources(config,w,card){
    const folderId=config.weekFolderIds?.[w-1];
    if(!folderId)return;
    let slot=card.querySelector('.resource-box,.resource-slot');
    if(!slot){
      slot=document.createElement('div');slot.className='resource-box';
      card.appendChild(slot);
    }
    // Sustituir SOLO los botones de materiales que todavía son marcadores deshabilitados.
    const placeholders=slot.querySelector('.resource-links,.resource-actions');
    if(placeholders){
      const old=[...placeholders.querySelectorAll('a')];
      if(old.length && old.every(a=>a.classList.contains('disabled') || a.getAttribute('aria-disabled')==='true' || !a.getAttribute('href'))){
        placeholders.style.display='none';
        const hint=slot.querySelector('small');if(hint)hint.style.display='none';
      }
    }
    if(slot.querySelector('.uac-recursos-sesion'))return;
    const section=document.createElement('div');section.className='uac-recursos-sesion';
    const p=document.createElement('p');
    p.textContent='Carpeta privada de la sesión: presentaciones PPT, material complementario y fotos de las listas de asistencia.';
    section.appendChild(p);
    const tags=document.createElement('div');tags.className='uac-material-etiquetas';
    ['📊 PPT y presentaciones','📚 Otros materiales','📷 Fotos de asistencia'].forEach(label=>{
      const el=document.createElement('span');el.textContent=label;tags.appendChild(el);
    });
    section.appendChild(tags);
    const buttons=document.createElement('div');buttons.className='uac-botones';
    buttons.appendChild(anchor('📁 Abrir carpeta de esta sesión',folderUrl(folderId)));
    section.appendChild(buttons);
    const fotos=document.createElement('details');fotos.className='uac-fotos-sesion';
    const summary=document.createElement('summary');summary.textContent='📷 Subir fotos de asistencia de esta sesión';
    fotos.appendChild(summary);
    const dias=document.createElement('div');dias.className='uac-botones';
    DAYS.forEach((day,d)=>{
      const dayId=config.dayFolderIds?.[w-1]?.[d];
      if(dayId)dias.appendChild(anchor('📸 '+day,folderUrl(dayId),true));
    });
    fotos.appendChild(dias);section.appendChild(fotos);
    slot.appendChild(section);
  }
  function unitOverview(config,u){
    const block=document.createElement('div');block.className='uac-asistencia';
    const h=document.createElement('h3');h.textContent='Asistencia · Unidad '+['I','II','III'][u];block.appendChild(h);
    const p=document.createElement('p');p.textContent='Control para lunes, miércoles y viernes de las semanas '+START[u]+' a '+END[u]+'. Cada sesión tiene su carpeta de materiales y fotos.';block.appendChild(p);
    const buttons=document.createElement('div');buttons.className='uac-botones';
    buttons.appendChild(anchor('📋 Abrir esta unidad',sheetUrl(config,sheetTab(config,u))));
    buttons.appendChild(anchor('📈 Resumen general',sheetUrl(config,config.sheetIds.resumen),true));
    buttons.appendChild(anchor('📁 Carpetas de las sesiones',folderUrl(config.unitFolderIds[u]),true));
    block.appendChild(buttons);
    const foot=document.createElement('small');foot.textContent='La nómina, las notas y las fotos son privadas: Google solicitará iniciar sesión con la cuenta autorizada.';block.appendChild(foot);
    return block;
  }
  function placeNearProgress(section,node){
    const target=section.querySelector('.progress-panel,.progress');
    if(target)target.parentNode.insertBefore(node,target);
    else (section.querySelector('.container')||section).prepend(node);
  }
  function route(config){
    const section=id('semanas');if(!section)return;
    const block=document.createElement('div');block.className='uac-asistencia';
    const h=document.createElement('h3');h.textContent='Asistencia docente · las tres unidades';block.appendChild(h);
    const p=document.createElement('p');p.textContent='Registro privado de 26 estudiantes y 60 días planificados; los materiales y las fotos están dentro de cada sesión.';block.appendChild(p);
    const buttons=document.createElement('div');buttons.className='uac-botones';
    buttons.appendChild(anchor('📋 Unidad I',sheetUrl(config,config.sheetIds.unidad1)));
    buttons.appendChild(anchor('📋 Unidad II',sheetUrl(config,config.sheetIds.unidad2)));
    buttons.appendChild(anchor('📋 Unidad III',sheetUrl(config,config.sheetIds.unidad3)));
    buttons.appendChild(anchor('📊 Resumen',sheetUrl(config,config.sheetIds.resumen),true));
    buttons.appendChild(anchor('📁 Carpetas de las sesiones',folderUrl(config.rootFolderId),true));
    block.appendChild(buttons);
    placeNearProgress(section,block);
    section.querySelectorAll('.week-card').forEach((card,i)=>{
      const match=(card.querySelector('.week-number')?.textContent||'').match(/\d+/);
      const w=match?Number(match[0]):i+1;
      if(w>=1&&w<=20){
        sessionResources(config,w,card);
        const label=card.querySelector('label');const panel=dayPanel(config,w);
        if(label)card.insertBefore(panel,label);else card.appendChild(panel);
      }
    });
  }
  function unitPage(config,u){
    const section=id('sesiones');if(!section)return;
    placeNearProgress(section,unitOverview(config,u));
    const cards=section.querySelectorAll('.session-card');
    cards.forEach((card,i)=>{
      const m=(card.querySelector('.session-top')?.textContent||'').match(/Semana\s*(\d+)/i);
      const w=m?Number(m[1]):START[u]+i;
      if(w<START[u]||w>END[u])return;
      sessionResources(config,w,card);
      const target=card.querySelector('.done,.check-row,label');
      const panel=dayPanel(config,w);
      if(target)card.insertBefore(panel,target);else card.appendChild(panel);
    });
    if(u===2){
      const list=section.querySelector('.sessions-grid')||section.querySelector('.sessions');
      [19,20].forEach(w=>{
        if(!list||[...cards].some(c=>(c.querySelector('.session-top')?.textContent||'').includes('Semana '+w)))return;
        const holder=document.createElement('article');holder.className='uac-asistencia';
        const heading=document.createElement('h3');heading.textContent='Semana '+w+' · '+(w===19?'Sprint de mejora':'Portafolio y reflexión final');holder.appendChild(heading);
        sessionResources(config,w,holder);
        holder.appendChild(dayPanel(config,w));list.appendChild(holder);
      });
    }
  }
  function showConfigIssue(){
    const container=id('semanas')||id('sesiones');if(!container)return;
    const box=document.createElement('div');box.className='uac-asistencia';
    const h=document.createElement('h3');h.textContent='Asistencia: falta conectar la nueva cuenta';box.appendChild(h);
    const p=document.createElement('p');p.className='uac-pendiente';p.textContent='Crea el registro con Code.gs desde oswaand1@gmail.com y publica el archivo asistencias-config.json en GitHub.';box.appendChild(p);
    placeNearProgress(container,box);
  }
  // Progreso académico local: independiente de la asistencia docente.
  function enhanceProgress(unitNo){
    const checks=[...document.querySelectorAll('input[data-session]')];
    if(!checks.length)return;
    const key=unitNo===1?'u1progress':'consumerlab-unit'+unitNo+'-progress';
    const total=checks.length;
    let previously=[];
    try {
      const parsed=JSON.parse(localStorage.getItem(key)||'[]');
      if(Array.isArray(parsed))previously=parsed.map(Number).filter(Number.isFinite);
    }catch(e){console.warn('Progreso anterior inválido; se reinicia el contador.');}
    checks.forEach(input=>{input.checked=previously.includes(Number(input.dataset.session));});
    const render=()=>{
      const done=checks.filter(input=>input.checked).map(input=>Number(input.dataset.session));
      try{localStorage.setItem(key,JSON.stringify(done));}catch(e){console.warn('El navegador impidió guardar el progreso:',e);}
      const percentage=Math.round(done.length/total*100);
      const textEl=id('progressText'),fill=id('progressFill')||id('fill'),pct=id('progressPercent')||id('pct');
      if(textEl)textEl.textContent=done.length+' de '+total+' sesiones completadas';
      if(fill){fill.style.width=percentage+'%';fill.setAttribute('role','progressbar');fill.setAttribute('aria-valuemin','0');fill.setAttribute('aria-valuemax','100');fill.setAttribute('aria-valuenow',String(percentage));}
      if(pct)pct.textContent=percentage+'%';
    };
    checks.forEach(input=>input.addEventListener('change',render));
    render();
  }
  // Acceso a una nueva página informativa de rúbricas, sin notas de estudiantes.
  function enhanceRubricLinks(unitNo){
    const rubricUrl='rubricas.html?unidad='+unitNo;
    const nav=document.querySelector('nav.menu');
    if(nav&&!nav.querySelector('a[data-uac-rubrica]')){
      const link=document.createElement('a');link.href=rubricUrl;link.textContent='Rúbricas';link.setAttribute('data-uac-rubrica','');
      const cta=nav.querySelector('.cta');if(cta)nav.insertBefore(link,cta);else nav.appendChild(link);
    }
    const heroActions=document.querySelector('.hero .actions,.hero .hero-actions');
    if(heroActions&&!heroActions.querySelector('[data-uac-rubrica]')){
      const link=document.createElement('a');link.className='btn secondary uac-rubrica-hero';
      link.href=rubricUrl;link.textContent='📋 Rúbrica de calificación';link.setAttribute('data-uac-rubrica','');heroActions.appendChild(link);
    }
    const evaluationCards=document.querySelector('.evaluation-grid,.evaluation');
    if(evaluationCards && !document.querySelector('.uac-rubrica-access')){
      const box=document.createElement('div');box.className='uac-rubrica-access';
      const p=document.createElement('p');p.textContent='Consulta los criterios, las evidencias, la evaluación de examen, la colaboración y los niveles de desempeño de esta unidad.';box.appendChild(p);
      const button=anchor('📋 Abrir rúbrica de calificación',rubricUrl);box.appendChild(button);
      evaluationCards.insertAdjacentElement('afterend',box);
    }
  }
  function run(){
    addStyle();
    const match=page.match(/^unidad-([123])\.html$/);
    if(match){const unitNo=Number(match[1]);enhanceProgress(unitNo);enhanceRubricLinks(unitNo);}
    fetch(configUrl.toString(),{cache:'no-store'})
      .then(r=>{if(!r.ok)throw new Error('No se encontró asistencias-config.json');return r.json();})
      .then(config=>{
        if(!config.spreadsheetUrl||!Array.isArray(config.weekFolderIds)||config.weekFolderIds.length!==20||!Array.isArray(config.dayFolderIds)||config.dayFolderIds.length!==20||!config.sheetIds)throw new Error('Configuración incompleta');
        if(page==='ruta.html')route(config);
        else if(page==='unidad-1.html')unitPage(config,0);
        else if(page==='unidad-2.html')unitPage(config,1);
        else if(page==='unidad-3.html')unitPage(config,2);
      })
      .catch(err=>{console.error('ConsumerLab asistencia:',err);showConfigIssue();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();

