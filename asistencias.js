/* ConsumerLab UAC | Integracion de asistencia 2026-II
   Solo crea accesos a Google Sheets y Drive. No publica datos ni notas de estudiantes.
   Requiere: <script src="asistencias.js" defer></script> en cada HTML. */
(function(){
'use strict';
const CFG={"sheet":"https://docs.google.com/spreadsheets/d/1C--sHLoNG9locUu6cgm28v4aL3y1L6A_3i15rspgEZ4/edit","weekFolders":["1EOdp8Aw9bxwm1FRlRIrGxA5zqOSDribR","1IwOthFogJTHSv0KOVxV1G6iAmTO7oOd1","1Ru1pvOmALch-WZYAAVqAsPow0rdr9cFD","19IvKoFt2rhkqOn74tGOn0t0VWbOYIltY","1BPok18e9oVgB47bZzgKCKfiX-yz7h7B0","1HiDVmdDkUEtOPE2RXyFDq9OAQX9E9WC1","1s9d9-FByd66F4Btg-MibsI5iw8SvNOE1","1cr3oW_-7XEHzZhM224Mu6tmzvMEijIS1","1fsxhMLTd1ZHdgPJ_ZsRhciFL28tmnIMf","18dK2Gg2DRiFTBK0GRVj7CPZRI1uAMeH9","1_VD75JdqxUU4Zk8wySrTfBrq6KziakHk","1fH9K_R2eHl4yqzC6_9EU-5gc-8AGMBcr","1ItG-BYQfTTXDoTD9tu6a8swl2mqxy4Wr","1_PpuXG_QYkAOULR270lgMfgbjgi8UrwG","1hAv-sz-RbV-XA0CCWDR_pFy2dn-WLAUj","1mziNdg8uh_yqjai0nb_CF_vhi7Zi636J","1SQ3hM41ir-yysvFFwxAcAmQq4Hot-dGL","17zQPAfZAcMiEyfTnc215yvfL4usO54vs","1s6QgUzud_4ZSOdUukXd0Xv1aJmxbGiie","18zkk2z99V_D6M527XxcfZiUHUkDArorp"],"dayFolders":[["1uzVqDhmvfjdBhPPCeh1aZ8J5KlhUmGKx","1uUacesclAzCMmVfkmzY4c8YdThMQkycg","17dc0cdr1nmWBiAn-yn6Kpk1SMN99azqi"],["1_4XaRhwn4HUiNlrwaZk5Z3GkcXDCa5Z9","1d-kAydv8Q428K4pEIvtli6kuBn7tFxCS","1972E6FpYhI2r1FoaaWRgrfb8SUatwtK4"],["1eQKTL_RxRFTNqkob3PnqOgFiVGg8v5xE","1UtZcXW2PDxbb-_Lc3NdJ4Ds_8qNDItlg","1kiFehFFbYcwhO1wdJ1GN_kR5hLqwsTdi"],["1PWZTkDqNUDKrgfEwAMGB6QIG-fqKEC80","1gaCTw65x-wMwDrxZ7fFQ3xRJq9OtP653","1jWEShOOXowDOKfa-HDxezuGM-N9rnTo8"],["1W2G3sggJGlR1_oRSX38q9ad9PGbXfFGD","1nUIU0wv2IMsnoyxM0r5J5bJCojm_WPWi","1Bp_aBFm7-Pg0-gasHyVMqWtnF2QBANqU"],["1WeEmjlUr-niTRzVpz0p_Gr6G_th7iqcd","17Iw4otlfXftB49VCb8IHuFkB1lO8SK55","1Jm27ITVTRelQuzyKVfC--4vA5gslekKD"],["1Tb4iKUy3OYIHT8Z3zLUQm35NQmiHVb2Q","158ir7E4Pxo50qiRCI7leqAcl4PdkDH53","1hYx9FGSBukRmfkz-fX6P4uCSh9L8lwSm"],["1tDXK6SGikj4bcs2nAJSPe5PiB9qyuwAM","1uJVXCD8hJ6Le2JtZphNBvSHFYdhzyewm","1ir3bALxOf7vUK66sSd8l6MpjOFpyVZU0"],["1-lMr85o7IJb9xFfMwqnBHTsrudTKPnjy","10N1n_RSUDjMxuTRc89hNOLAf-zKbM90M","1UQTtqtS3ZRsUu6x2DBxdaiTSMuDSUe4o"],["16mJqjr2wXlyT4r85E57S8aByYQLDnF7j","10jdgA57fvM_hhgEdergK0KdQWpdL4kI9","1kIXp_5R3Zpf4Z8f71CLKq_971qhSU-IA"],["1Be4lihhJZEd2jMPXewoX7Ob7nAw0_TD-","1xsE0i-yT1Vr_00MXHof9NEUlTLK-8WAf","1f8mw_JD06pd6ei2FTZUiaVVBD8u_Y6r5"],["1e977a7ORzyWxrW6YjzjNzqK8Q8l-1U3S","1mmuT1gNcIp_QtGs-QkWk77oKMeZz2Kdn","15bBtrclF-08pBue9hscYs04kjL4lbOXH"],["1C9c-5uTcy6zSkspwNrP0aO6MzGsd4LmL","1onBClzCypKMyWnQ-1voFleE6lt93JJBZ","1n49Lwnp67Z1o-fGzoKcwyi4uUMy3nVAV"],["1pnWqvmo6jDX36eGq9M-kDXOqKxxtPMKt","1kISmuNdFyapGJ6oIpa0Ekm7kUzcEezSa","1_WinDygIiw4PIXCLj76visXNaXis077W"],["1UV2whWeGnzeleO2o6UxO067O8nH44Em6","1FeitRiY4wwX4ahHORsF4yTSqbdafEF8w","1bylu3I158orkDujc5v5Mok3PtNXXTzf8"],["1DAXT3_wVmY2eD9BJGob9Y9pBU0LUDJW2","1e6AOMbSuvIaNsTbgEF2IpDkqRjf4vDtd","1BZSkkh6_zy2cyoH5SSjLJ5sow9g5AeqP"],["1Cd4dNM9MU82f1Nbs3mpuRlQRzyr_v1bm","1RicuhJtKKES7pVDusDk8h4mDhoWsDqhx","1CX1aJli6PyfDBUyHxsHxVhnV-nQmn2Pe"],["1Ce4X820Ah4tZgh4TNCoVSEjkfsdtqf8Y","1qyD1CglTNxZNMGMOyznYSpBuUbPLPQou","1SjKBEDsf845PVPiEYp4UGdgOLnaNqAd8"],["1-mGAaZsKqnNIbKiZPvylP3fB-dEq2tI7","16yjcW_Ebz2E2MupISnzVquF_6vrIsnpL","1e7md5V911Wp4pWAbhVH-dw3wAu6r7cnL"],["1fxaxzgHjY7HUuVlu-tEVGCJccv31PTRl","1mVVbvTSvh26Yb28r5yKisQcWeXwMttlx","1YZ_HLTHUUws1ULul00Y9nuIW2_qZOWyi"]],"unitFolders":["1NA3J-EjDFIGs__-7i6RoM0KWetjOVsOZ","1rKg9bqql3TV6YYSDmcy_3Xg_ylTij6w_","1gSkDKstfnNEJsXHx8k5IQAMDGSuXJLs2"]};
const SHEET=CFG.sheet;
const DAYS=['Lunes','Miércoles','Viernes'];
const UNIT_START={1:1,2:7,3:13};
const UNIT_END={1:6,2:12,3:20};
const UNIT_NAMES={1:'Investigación de mercados',2:'Comportamiento del consumidor',3:'Marketing y estrategia digital'};
const UNIT_RANGES={1:'D4:F30',2:'G4:I30',3:'J4:L30'};
const FOLDER='https://drive.google.com/drive/folders/';
const doc=document;
const page=(window.location.pathname.split('/').pop()||'').toLowerCase();
if(doc.getElementById('cl-attendance-css'))return;
const style=doc.createElement('style');style.id='cl-attendance-css';style.textContent=`
.cl-overview{border:1px solid #d7e4f9;background:linear-gradient(135deg,#ffffff,#eef6ff);padding:20px;border-radius:20px;margin:22px 0 24px;box-shadow:0 8px 25px rgba(25,60,120,.06);color:#192545}
.cl-overview h3{margin:4px 0 8px;font-size:1.32rem;color:#111a3a}.cl-overview p{margin:0 0 14px;font-size:.9rem;color:#5f6d89}
.cl-links{display:flex;gap:8px;flex-wrap:wrap}.cl-a{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:9px 12px;background:#4f46e5;border-radius:10px;color:#fff!important;text-decoration:none!important;font-size:.83rem;font-weight:800;line-height:1.3;border:1px solid #4f46e5}
.cl-a:hover{filter:brightness(.94)}.cl-a.secondary{color:#3c42a7!important;background:#fff;border-color:#ccd9ee}
.cl-week{margin:13px 0;padding:10px 12px;border-radius:13px;border:1px solid #d9e4f4;background:#f6f9ff;color:#192545}
.cl-week summary{cursor:pointer;font-weight:850;font-size:.85rem;list-style:revert}.cl-week-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:12px 0 8px}
.cl-day{padding:9px;background:#fff;border:1px solid #e0e8f5;border-radius:11px}.cl-day strong{display:block;font-size:.77rem;margin-bottom:7px;color:#17213d}.cl-day .cl-a{width:100%;font-size:.76rem;padding:8px 6px;margin-bottom:5px}
.cl-notice{font-size:.76rem;line-height:1.5;color:#62718e;display:block;margin-top:9px}
.cl-append{margin:10px 0 0;padding:13px;border:1px dashed #bfcced;border-radius:14px;background:#fbfcff}.cl-append h3{margin:0 0 5px;font-size:.98rem}
@media(max-width:620px){.cl-week-grid{grid-template-columns:1fr}.cl-a{width:100%}.cl-overview{padding:15px}}
`;
doc.head.appendChild(style);
function weekUnit(w){return w<=6?1:(w<=12?2:3)}
function xlCol(n){let str='';for(n=n+1;n;n=Math.floor((n-1)/26))str=String.fromCharCode(65+(n-1)%26)+str;return str}
function sheetDay(w,di){const c=xlCol(3+(w-1)*3+di);return SHEET+'#gid=19000021&range='+c+'8:'+c+'35'}
function makeLink(label,href,secondary){const a=doc.createElement('a');a.className='cl-a'+(secondary?' secondary':'');a.textContent=label;a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a}
function weekControls(w){const details=doc.createElement('details');details.className='cl-week';details.dataset.week=String(w);
 const summary=doc.createElement('summary');summary.textContent='📋 Asistencia y fotos · lunes, miércoles y viernes';details.appendChild(summary);
 const grid=doc.createElement('div');grid.className='cl-week-grid';
 DAYS.forEach((day,di)=>{const div=doc.createElement('div');div.className='cl-day';const h=doc.createElement('strong');h.textContent=day;div.appendChild(h);
 div.appendChild(makeLink('✓ Marcar asistencia',sheetDay(w,di),false));div.appendChild(makeLink('📷 Subir lista física',FOLDER+CFG.dayFolders[w-1][di],true));grid.appendChild(div)});
 details.appendChild(grid);const foot=doc.createElement('small');foot.className='cl-notice';foot.textContent='La lista digital se marca en Google Sheets. La fotografía se guarda en Drive, con acceso restringido.';details.appendChild(foot);return details}
function overview(unit){const box=doc.createElement('section');box.className='cl-overview';box.id='asistencia-unidad-'+unit;
 const kicker=doc.createElement('small');kicker.textContent='CONTROL DE ASISTENCIA · UNIDAD '+['','I','II','III'][unit];box.appendChild(kicker);
 const h=doc.createElement('h3');h.textContent='Lista general, registro diario y evidencias';box.appendChild(h);
 const p=doc.createElement('p');p.textContent=`Semanas ${UNIT_START[unit]} a ${UNIT_END[unit]}. Se utiliza una única nómina de 26 estudiantes y registros por lunes, miércoles y viernes. Las notas y los nombres NO se muestran en esta web pública.`;box.appendChild(p);
 const links=doc.createElement('div');links.className='cl-links';
 links.appendChild(makeLink('📋 Abrir lista general',SHEET+'#gid=19000021',false));
 links.appendChild(makeLink('📈 Asistencia de esta unidad',SHEET+'#gid=19000023&range='+UNIT_RANGES[unit],true));
 links.appendChild(makeLink('📂 Fotos de asistencia',FOLDER+CFG.unitFolders[unit-1],true));
 box.appendChild(links);const small=doc.createElement('small');small.className='cl-notice';small.textContent='Solo el docente o los usuarios con permiso podrán registrar datos y subir las fotos de las listas firmadas.';box.appendChild(small);return box}
function putBefore(element,reference){if(reference&&reference.parentNode)reference.parentNode.insertBefore(element,reference)}
function enrichRoute(){const section=doc.getElementById('semanas');if(!section)return;const progress=section.querySelector('.progress-panel');
 if(progress){const box=doc.createElement('section');box.className='cl-overview';const h=doc.createElement('h3');h.textContent='Asistencia general · Unidades I, II y III';box.appendChild(h);
 const p=doc.createElement('p');p.textContent='Accesos al registro privado y a las fotografías de lunes, miércoles y viernes de las 20 semanas.';box.appendChild(p);
 const links=doc.createElement('div');links.className='cl-links';links.appendChild(makeLink('✓ Lista general (26 estudiantes)',SHEET+'#gid=19000021',false));links.appendChild(makeLink('📈 Resumen de las 3 unidades',SHEET+'#gid=19000023',true));links.appendChild(makeLink('📂 Carpeta de evidencias',FOLDER+'1jyijWuU9gNMj6L1JQtTdNBTIyYEgvNrW',true));box.appendChild(links);putBefore(box,progress)}
 const cards=section.querySelectorAll('.week-card');cards.forEach((card,index)=>{const title=card.querySelector('.week-number');const match=(title?.textContent||'').match(/(\d{1,2})/);const n=match?parseInt(match[1],10):index+1;
 if(n>=1&&n<=20&&!card.querySelector('.cl-week')){const ck=card.querySelector('label');const panel=weekControls(n);if(ck)putBefore(panel,ck);else card.appendChild(panel)}})}
function enrichUnit(unit){const section=doc.getElementById('sesiones');if(!section)return;
 const lead=section.querySelector('.progress-panel, .progress');if(lead)putBefore(overview(unit),lead);else section.querySelector('.container')?.prepend(overview(unit));
 const cards=section.querySelectorAll('.session-card');cards.forEach((card,index)=>{
 const title=card.querySelector('.session-top');const match=(title?.textContent||'').match(/Semana\s*(\d{1,2})/i);const n=match?parseInt(match[1],10):UNIT_START[unit]+index;
 if(n>=UNIT_START[unit]&&n<=UNIT_END[unit]&&!card.querySelector('.cl-week')){const checkbox=card.querySelector('.done, .check-row, label');if(checkbox)putBefore(weekControls(n),checkbox);else card.appendChild(weekControls(n))}});
 // Unidad III tiene seis sesiones detalladas, pero la ruta abarca las semanas 13–20.
 if(unit===3){const missing=[19,20].filter(n=>![...cards].some(c=>(c.querySelector('.session-top')?.textContent||'').includes('Semana '+n)));
 if(missing.length){const container=section.querySelector('.sessions-grid')||section.querySelector('.container');
 missing.forEach(n=>{const article=doc.createElement('article');article.className='cl-append';const h=doc.createElement('h3');h.textContent='Semana '+n+' · '+(n===19?'Sprint de mejora':'Portafolio y reflexión final');article.appendChild(h);article.appendChild(weekControls(n));container.appendChild(article)})}}}
function run(){if(page==='ruta.html')enrichRoute();else if(page==='unidad-1.html')enrichUnit(1);else if(page==='unidad-2.html')enrichUnit(2);else if(page==='unidad-3.html')enrichUnit(3)}
if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
