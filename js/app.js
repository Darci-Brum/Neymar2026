
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const page = document.body.dataset.page || 'home';

const TABLES = {
  profile: 'neymar_profile',
  statCards: 'neymar_stat_cards',
  clubs: 'neymar_club_passages',
  national: 'neymar_national_teams',
  goalMethods: 'neymar_goal_methods',
  byTeam: 'neymar_goal_assist_by_team',
  importantGoals: 'neymar_important_goals',
  milestones: 'neymar_career_milestones',
  titles: 'neymar_titles',
  awards: 'neymar_awards',
  opponents: 'neymar_opponents',
  photos: 'neymar_media_photos',
  videos: 'neymar_media_videos',
  transfers: 'neymar_transfers_contracts',
  wealth: 'neymar_wealth_estimates',
  assets: 'neymar_assets',
  life: 'neymar_family_life',
  teamCrests: 'neymar_team_crests',
  sources: 'neymar_sources'
};

const state = {
  data: {},
  status: { connected:false, message:'Carregando dados do Supabase...', loaded:0, errors:[] }
};

const navItems = [
  ['home','Dashboard','index.html'],
  ['clubes','Clubes','clubes.html'],
  ['selecao','Seleção','selecao.html'],
  ['estatisticas','Gols & Assist.','estatisticas.html'],
  ['premios','Medalhas & Prêmios','premios.html'],
  ['adversarios','Adversários','adversarios.html'],
  ['transferencias','Transferências','transferencias.html'],
  ['patrimonio','Patrimônio','patrimonio.html'],
  ['vida','Vida atual','vida-atual.html'],
  ['midia','Fotos & Vídeos','midia.html'],
  ['supabase','Supabase','supabase.html']
];

function config(){ return window.NJR_SUPABASE_CONFIG || {}; }
function restUrl(){ return String(config().restUrl || '').replace(/\/$/,''); }
function apiKey(){ return config().apiKey || ''; }
function isConfigured(){ return restUrl().includes('/rest/v1') && apiKey().length > 20; }
function headers(prefer='return=representation'){
  return { apikey: apiKey(), Authorization: `Bearer ${apiKey()}`, 'Content-Type':'application/json', Prefer: prefer };
}
async function request(table, query='select=*&order=sort_order.asc&limit=1000'){
  if(!isConfigured()) throw new Error('Configuração do Supabase ausente ou inválida.');
  const res = await fetch(`${restUrl()}/${table}?${query}`, { headers: headers() });
  if(!res.ok) throw new Error(`${table}: HTTP ${res.status} — ${await res.text()}`);
  return res.json();
}
async function insert(table, body){
  const res = await fetch(`${restUrl()}/${table}`, { method:'POST', headers: headers('return=minimal'), body: JSON.stringify(body) });
  if(!res.ok) throw new Error(`${table}: HTTP ${res.status} — ${await res.text()}`);
}
async function safeTable(key, table, query){
  try{
    const rows = await request(table, query);
    state.data[key] = Array.isArray(rows) ? rows : [];
    state.status.loaded += 1;
  }catch(err){
    state.data[key] = [];
    state.status.errors.push(err.message);
  }
}
async function loadAllData(){
  showLoading(true);
  if(!isConfigured()){
    state.status = { connected:false, message:'Supabase não configurado. Edite js/supabase-config.js e execute o SQL.', loaded:0, errors:['Configuração inválida'] };
    showLoading(false); return;
  }
  state.status = { connected:false, message:'Carregando dados do Supabase...', loaded:0, errors:[] };
  await Promise.all([
    safeTable('profile', TABLES.profile, 'select=*&limit=1'),
    safeTable('statCards', TABLES.statCards),
    safeTable('clubs', TABLES.clubs),
    safeTable('national', TABLES.national),
    safeTable('goalMethods', TABLES.goalMethods),
    safeTable('byTeam', TABLES.byTeam),
    safeTable('importantGoals', TABLES.importantGoals),
    safeTable('milestones', TABLES.milestones),
    safeTable('titles', TABLES.titles),
    safeTable('awards', TABLES.awards),
    safeTable('opponents', TABLES.opponents, 'select=*&order=goals.desc,name.asc&limit=1500'),
    safeTable('photos', TABLES.photos),
    safeTable('videos', TABLES.videos),
    safeTable('transfers', TABLES.transfers),
    safeTable('wealth', TABLES.wealth),
    safeTable('assets', TABLES.assets),
    safeTable('life', TABLES.life),
    safeTable('teamCrests', TABLES.teamCrests),
    safeTable('sources', TABLES.sources)
  ]);
  const totalRows = Object.values(state.data).reduce((acc, rows) => acc + (Array.isArray(rows) ? rows.length : 0), 0);
  state.status.connected = totalRows > 0 && state.status.loaded > 0;
  state.status.message = state.status.connected ? `Dados carregados diretamente do Supabase: ${totalRows} registros em ${state.status.loaded} tabelas.` : 'Nenhum dado encontrado. Execute sql/supabase_full_setup.sql no Supabase.';
  try{ await insert('site_page_views', { page, path: location.pathname, referrer: document.referrer || null, user_agent: navigator.userAgent }); }catch(e){ /* sem bloqueio */ }
  showLoading(false);
}

function showLoading(on){
  let el = $('#loading');
  if(on && !el){
    document.body.insertAdjacentHTML('beforeend', `<div class="loading" id="loading"><div class="loader-card"><div class="spinner"></div><strong>Carregando Supabase</strong><p>Buscando todos os dados no banco. Não existe fallback local neste site.</p></div></div>`);
  }
  if(!on && el) el.remove();
}
function fmt(n){ return Number(n || 0).toLocaleString('pt-BR'); }
function money(n, currency='USD', decimals=0){ return new Intl.NumberFormat('pt-BR', { style:'currency', currency, maximumFractionDigits:decimals, minimumFractionDigits:decimals }).format(Number(n || 0)); }
function compactMoney(n, currency='USD'){ return new Intl.NumberFormat('pt-BR', { style:'currency', currency, notation:'compact', maximumFractionDigits:2 }).format(Number(n || 0)); }
function esc(v=''){ return String(v ?? '').replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m])); }
function img(url, alt=''){
  if(!url) return `<div class="video-placeholder">Imagem não cadastrada no Supabase</div>`;
  return `<img src="${esc(url)}" alt="${esc(alt)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.innerHTML='<div class=&quot;video-placeholder&quot;>Imagem externa indisponível</div>'">`;
}
function profile(){ return (state.data.profile && state.data.profile[0]) || {}; }
function list(key){ return Array.isArray(state.data[key]) ? state.data[key] : []; }
function unique(rows, field){ return ['Todos', ...new Set(rows.map(r => r[field]).filter(Boolean))]; }
function empty(text='Nenhum dado encontrado no Supabase para esta seção.'){
  const errors = state.status.errors && state.status.errors.length
    ? `<br><br><strong>Diagnóstico da API:</strong><ul>${state.status.errors.slice(0,6).map(e => `<li>${esc(e)}</li>`).join('')}</ul>`
    : '';
  return `<div class="empty"><strong>Sem dados.</strong><br>${esc(text)}<br><br>Confira se existem registros na tabela correta, se o arquivo <code>sql/supabase_full_setup.sql</code> foi executado até o fim e se as permissões <code>GRANT</code> + <code>RLS SELECT</code> estão ativas.${errors}</div>`;
}

function initLayout(){
  const nav = $('#nav-links');
  if(nav){
    nav.innerHTML = navItems.map(([key,label,url]) => `<a href="${url}" data-nav="${key}" class="${key===page?'active':''}">${label}</a>`).join('');
  }
  const toggle = $('#mobile-toggle');
  if(toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
  const p = profile();
  if(p.hero_image) document.documentElement.style.setProperty('--hero-img', `url('${p.hero_image.replace(/'/g,"%27")}')`);
  const brandName = $('#brand-name'); if(brandName) brandName.textContent = p.short_name || 'Neymar Jr';
  const updated = $('#updated-label'); if(updated) updated.textContent = p.updated_at_label ? `Atualizado em ${p.updated_at_label}` : 'Dados do Supabase';
  renderStatus();
  renderSources();
}

function renderStatus(){
  const el = $('#supabase-status');
  if(!el) return;
  el.innerHTML = `<span class="status-dot ${state.status.connected?'online':''}"></span><span>${state.status.connected?'Supabase conectado':'Aguardando Supabase'}</span><small>${esc(state.status.message)}</small>`;
}
function renderSources(){
  const el = $('#footer-sources');
  if(!el) return;
  const rows = list('sources');
  el.innerHTML = rows.length ? rows.slice(0,12).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('') : '<span>Nenhuma fonte cadastrada.</span>';
}

function renderHero(){
  const p = profile();
  const el = $('#hero-copy');
  if(!el) return;
  el.innerHTML = `
    <p class="eyebrow">Santos • Barcelona • Seleção Brasileira • 100% Supabase</p>
    <h1>${esc(p.short_name || 'Neymar Jr.')} em eras e conquistas.</h1>
    <p class="lead">${esc(p.bio || p.subtitle || 'Configure os dados no Supabase para preencher o site.')}</p>
    <div class="hero-actions"><a class="btn" href="clubes.html">Ver passagens</a><a class="btn secondary" href="midia.html">Fotos e vídeos</a></div>`;
  const mini = $('#hero-mini');
  if(mini){
    const cards = list('statCards');
    mini.innerHTML = `<div class="player-badge"><span class="player-number">10</span><span>${esc(p.short_name || 'NJR')}</span></div><h2>${esc(p.name || 'Neymar')}</h2><p>${esc(p.subtitle || '')}</p><div class="phone-stats">${cards.slice(0,3).map(c=>`<div class="phone-stat"><strong>${fmt(c.value)}${esc(c.suffix||'')}</strong><span>${esc(c.label)}</span></div>`).join('')}</div>`;
  }
}
function renderKpis(){
  const el = $('#kpis'); if(!el) return;
  const rows = list('statCards');
  el.innerHTML = rows.length ? rows.map(c => `<article class="kpi-card"><strong>${fmt(c.value)}${esc(c.suffix||'')}</strong><span>${esc(c.label)}</span><small>${esc(c.note||'')}</small></article>`).join('') : empty('Cadastre neymar_stat_cards.');
}
function renderTimeline(){
  const el = $('#timeline'); if(!el) return;
  const rows = list('milestones');
  el.innerHTML = rows.length ? rows.map(m => `<div class="timeline-item"><span class="timeline-dot"></span><div class="timeline-box"><strong>${esc(m.year_label)}</strong><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p></div></div>`).join('') : empty('Cadastre neymar_career_milestones.');
}
function renderClubChart(){
  const el = $('#club-chart'); if(!el) return;
  const rows = list('byTeam').filter(r => r.classification !== 'Seleção');
  if(!rows.length){ el.innerHTML = empty('Cadastre neymar_goal_assist_by_team.'); return; }
  const max = Math.max(...rows.map(r => Number(r.goal_participations || 0)), 1);
  el.innerHTML = rows.map(r => `<div class="bar-row"><div class="bar-label">${esc(r.team)}<br><small>${esc(r.period)}</small></div><div class="bar-track"><div class="bar-fill" style="--w:${(Number(r.goal_participations||0)/max)*100}%"></div></div><div class="bar-value">${fmt(r.goal_participations)}</div></div>`).join('');
}
function renderFeaturedGoals(){
  const el = $('#featured-goals'); if(!el) return;
  const rows = list('importantGoals').slice(0,4);
  el.innerHTML = rows.length ? rows.map(goalCard).join('') : empty('Cadastre neymar_important_goals.');
}
function goalCard(g){
  return `<article class="card"><div class="card-body"><div class="tag-row"><span class="tag gold">${esc(g.classification)}</span><span class="tag">${esc(g.competition)}</span><span class="tag">${esc(g.goal_type)}</span></div><h3>${esc(g.opponent)}</h3><p><strong>${esc(g.date_label)}</strong> — ${esc(g.detail)}</p></div></article>`;
}

function clubCard(c){
  const ig = Array.isArray(c.important_games) ? c.important_games : [];
  const highlights = Array.isArray(c.highlights) ? c.highlights : [];
  const titles = Array.isArray(c.titles) ? c.titles : [];
  return `<article class="card club-card"><div class="card-media">${img(c.image_url,c.club)}</div><div class="card-body"><div class="tag-row"><span class="tag gold">${esc(c.period)}</span><span class="tag">${esc(c.country)}</span><span class="tag">Camisa ${esc(c.shirt)}</span></div><h3>${esc(c.club)}</h3><p>${esc(c.summary)}</p><div class="stat-list"><div class="mini-stat"><strong>${fmt(c.games)}</strong><span>Jogos</span></div><div class="mini-stat"><strong>${fmt(c.goals)}</strong><span>Gols</span></div><div class="mini-stat"><strong>${fmt(c.assists)}</strong><span>Assist.</span></div><div class="mini-stat"><strong>${fmt(c.penalties)}</strong><span>Pênaltis</span></div><div class="mini-stat"><strong>${fmt(c.free_kicks)}</strong><span>Faltas</span></div></div><div class="tag-row">${titles.length ? titles.map(t=>`<span class="tag">${esc(t)}</span>`).join('') : '<span class="tag">Sem título nesta fase</span>'}</div><button class="btn small secondary" data-detail="${esc(c.slug)}">Jogos e marcos</button><div class="details" id="detail-${esc(c.slug)}" hidden><br>${ig.map(g=>`<p><strong>${esc(g.date)} — ${esc(g.title)}</strong><br>${esc(g.detail)}</p>`).join('')}<p><strong>Marcos:</strong></p><ul>${highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul><p class="note">${esc(c.source_note||'')}</p></div></div></article>`;
}
function renderClubes(){
  const filters=$('#clubs-filters'), grid=$('#clubs-grid'); if(!filters||!grid) return;
  const rows=list('clubs');
  if(!rows.length){ grid.innerHTML=empty('Cadastre neymar_club_passages.'); return; }
  const cats=unique(rows,'club');
  filters.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
  const paint=(cat='Todos')=>{ const out = cat==='Todos'?rows:rows.filter(r=>r.club===cat); grid.innerHTML=out.map(clubCard).join(''); bindDetails(); };
  paint(); filters.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return; $$('.filter-btn',filters).forEach(x=>x.classList.remove('active')); b.classList.add('active'); paint(b.dataset.filter);});
}
function bindDetails(){ $$('[data-detail]').forEach(btn => btn.addEventListener('click',()=>{ const el=$(`#detail-${CSS.escape(btn.dataset.detail)}`); if(el){el.hidden=!el.hidden;btn.textContent=el.hidden?'Jogos e marcos':'Ocultar detalhes';}})); }
function renderSelecao(){
  const grid=$('#national-grid'); if(grid){ const rows=list('national'); grid.innerHTML=rows.length?rows.map(n=>`<article class="card"><div class="card-body"><div class="tag-row"><span class="tag gold">${esc(n.period)}</span><span class="tag">${esc(n.team)}</span></div><h3>${esc(n.team)}</h3><p>${esc(n.note)}</p><div class="stat-list"><div class="mini-stat"><strong>${fmt(n.games)}</strong><span>Jogos</span></div><div class="mini-stat"><strong>${fmt(n.goals)}</strong><span>Gols</span></div><div class="mini-stat"><strong>${n.assists==null?'—':fmt(n.assists)}</strong><span>Assist.</span></div><div class="mini-stat"><strong>${Array.isArray(n.titles)?n.titles.length:0}</strong><span>Títulos</span></div></div><div class="tag-row">${Array.isArray(n.titles)&&n.titles.length?n.titles.map(t=>`<span class="tag">${esc(t)}</span>`).join(''):'<span class="tag">Sem título cadastrado</span>'}</div></div></article>`).join(''):empty('Cadastre neymar_national_teams.'); }
  const goals=$('#national-goals'); if(goals){ const rows=list('importantGoals').filter(g=>g.classification==='Seleção'); goals.innerHTML=rows.length?rows.map(goalCard).join(''):empty('Cadastre gols importantes da Seleção.'); }
}
function renderEstatisticas(){
  const bars=$('#goal-methods'); if(bars){ const rows=list('goalMethods'); const max=Math.max(...rows.map(r=>Number(r.value||0)),1); bars.innerHTML=rows.length?rows.map(r=>`<div class="bar-row"><div class="bar-label">${esc(r.type)}<br><small>${esc(r.source)}</small></div><div class="bar-track"><div class="bar-fill" style="--w:${(Number(r.value||0)/max)*100}%"></div></div><div class="bar-value">${fmt(r.value)}</div></div><p class="note">${esc(r.description)}</p>`).join(''):empty('Cadastre neymar_goal_methods.'); }
  const table=$('#assist-table'); if(table){ const rows=list('byTeam'); table.innerHTML=rows.length?`<table><thead><tr><th>Classificação</th><th>Time</th><th>Período</th><th>Jogos</th><th>Gols</th><th>Assistências</th><th>Participações</th><th>Pênaltis</th><th>Faltas</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.classification)}</td><td><strong>${esc(r.team)}</strong></td><td>${esc(r.period)}</td><td>${fmt(r.games)}</td><td>${fmt(r.goals)}</td><td>${fmt(r.assists)}</td><td>${fmt(r.goal_participations)}</td><td>${fmt(r.penalties)}</td><td>${fmt(r.free_kicks)}</td></tr>`).join('')}</tbody></table>`:empty('Cadastre neymar_goal_assist_by_team.'); }
  const filters=$('#goals-filters'), grid=$('#goals-grid'); if(filters&&grid){ const rows=list('importantGoals'); const cats=unique(rows,'classification'); filters.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join(''); const paint=(cat='Todos')=>{const out=cat==='Todos'?rows:rows.filter(r=>r.classification===cat); grid.innerHTML=out.length?out.map(goalCard).join(''):empty('Nenhum gol neste filtro.');}; paint(); filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('.filter-btn',filters).forEach(x=>x.classList.remove('active'));b.classList.add('active');paint(b.dataset.filter);}); }
}
function renderPremios(){
  const af=$('#awards-filters'), ag=$('#awards-grid'); if(af&&ag){ const rows=list('awards'); const cats=unique(rows,'classification'); af.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join(''); const paint=(cat='Todos')=>{const out=cat==='Todos'?rows:rows.filter(r=>r.classification===cat); ag.innerHTML=out.length?out.map(awardCard).join(''):empty('Nenhum prêmio neste filtro.');}; paint(); af.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('.filter-btn',af).forEach(x=>x.classList.remove('active'));b.classList.add('active');paint(b.dataset.filter);}); }
  const tf=$('#titles-filters'), tg=$('#titles-grid'); if(tf&&tg){ const rows=list('titles'); const cats=unique(rows,'category'); tf.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join(''); const paint=(cat='Todos')=>{const out=cat==='Todos'?rows:rows.filter(r=>r.category===cat); tg.innerHTML=out.length?out.map(titleCard).join(''):empty('Nenhum título neste filtro.');}; paint(); tf.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('.filter-btn',tf).forEach(x=>x.classList.remove('active'));b.classList.add('active');paint(b.dataset.filter);}); }
}
function awardCard(a){ return `<article class="card award-card"><div class="card-media">${img(a.image_url,a.title)}</div><div class="card-body"><div class="award-class">${esc(a.classification)}</div><h3>${esc(a.title)}</h3><span class="award-years">${esc(a.years)}</span><p>${esc(a.detail)}</p></div></article>`; }
function titleCard(t){ return `<article class="card award-card"><div class="card-media">${img(t.image_url,t.title)}</div><div class="card-body"><div class="award-class">${esc(t.category)}</div><h3>${esc(t.title)}</h3><span class="award-years">${esc(t.years)}</span><p>${esc(t.detail||'')}</p></div></article>`; }
function renderAdversarios(){
  const filters=$('#opponents-filters'), table=$('#opponents-table'), search=$('#opponents-search'); if(!filters||!table||!search) return;
  const rows=list('opponents'); if(!rows.length){ table.innerHTML=empty('Cadastre neymar_opponents.'); return; }
  const cats=unique(rows,'category'); filters.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join(''); let current='Todos';
  const paint=()=>{ const q=search.value.trim().toLowerCase(); const out=rows.filter(r=>(current==='Todos'||r.category===current)&&(!q||`${r.name} ${r.context} ${r.category}`.toLowerCase().includes(q))).sort((a,b)=>Number(b.goals||0)-Number(a.goals||0)||String(a.name).localeCompare(String(b.name))); table.innerHTML=out.length?`<table><thead><tr><th>Adversário</th><th>Classificação</th><th>Contexto</th><th>Gols</th></tr></thead><tbody>${out.map(o=>`<tr><td><strong>${esc(o.name)}</strong></td><td>${esc(o.category)}</td><td>${esc(o.context)}</td><td>${fmt(o.goals)}</td></tr>`).join('')}</tbody></table>`:empty('Nenhum adversário encontrado.'); const count=$('#opponents-count'); if(count) count.textContent=`${out.length} adversários encontrados`; };
  paint(); search.addEventListener('input',paint); filters.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return; current=b.dataset.filter; $$('.filter-btn',filters).forEach(x=>x.classList.remove('active')); b.classList.add('active'); paint();});
}
function renderTransferencias(){
  const table=$('#transfers-table'); if(!table) return;
  const rows=list('transfers'); table.innerHTML=rows.length?`<table><thead><tr><th>Data</th><th>Movimento</th><th>Origem → Destino</th><th>Valor/Taxa</th><th>Salário estimado</th><th>Detalhe</th><th>Fonte</th></tr></thead><tbody>${rows.map(t=>`<tr><td><strong>${esc(t.date_label)}</strong></td><td>${esc(t.movement_type)}</td><td>${esc(t.from_team)} → <strong>${esc(t.to_team)}</strong></td><td>${esc(t.reported_fee)}</td><td>${esc(t.estimated_salary)}</td><td>${esc(t.detail)}</td><td>${t.source_url?`<a href="${esc(t.source_url)}" target="_blank" rel="noopener">${esc(t.source_label||'Fonte')}</a>`:esc(t.source_label||'')}</td></tr>`).join('')}</tbody></table>`:empty('Cadastre neymar_transfers_contracts.');
}
function renderMidia(){
  const pf=$('#photos-filters'), pg=$('#photos-grid'); if(pf&&pg){ const rows=list('photos'); const cats=unique(rows,'tag'); pf.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join(''); const paint=(cat='Todos')=>{const out=cat==='Todos'?rows:rows.filter(r=>r.tag===cat); pg.innerHTML=out.length?out.map(photoCard).join(''):empty('Nenhuma foto neste filtro.');}; paint(); pf.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('.filter-btn',pf).forEach(x=>x.classList.remove('active'));b.classList.add('active');paint(b.dataset.filter);}); }
  const vf=$('#videos-filters'), vg=$('#videos-grid'); if(vf&&vg){ const rows=list('videos'); const cats=unique(rows,'classification'); vf.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join(''); const paint=(cat='Todos')=>{const out=cat==='Todos'?rows:rows.filter(r=>r.classification===cat); vg.innerHTML=out.length?out.map(videoCard).join(''):empty('Nenhum vídeo neste filtro.');}; paint(); vf.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('.filter-btn',vf).forEach(x=>x.classList.remove('active'));b.classList.add('active');paint(b.dataset.filter);}); }
}
function photoCard(p){ return `<article class="gallery-card">${img(p.image_url,p.title)}<div class="gallery-info"><span class="tag gold">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.description||p.credit||'')}</p></div></article>`; }
function videoCard(v){ return `<article class="card video-card"><div class="card-body">${v.embed_url?`<iframe src="${esc(v.embed_url)}" title="${esc(v.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`:`<div class="video-placeholder">${esc(v.platform||'Vídeo externo')}<br><small>Link externo</small></div>`}<div class="tag-row"><span class="tag gold">${esc(v.classification)}</span><span class="tag">${esc(v.phase)}</span></div><h3>${esc(v.title)}</h3><p>${esc(v.description)}</p>${v.external_url?`<a class="btn small" href="${esc(v.external_url)}" target="_blank" rel="noopener">Abrir vídeo</a>`:''}</div></article>`; }

function renderPatrimonio(){
  const counter=$('#wealth-counter'), rates=$('#wealth-rates'), note=$('#wealth-note');
  const rows=list('wealth');
  const w=rows[0] || null;
  if(counter){
    if(!w){ counter.innerHTML=empty('Cadastre neymar_wealth_estimates.'); }
    else{
      const annual = Number(w.annual_earnings_usd || 0);
      const net = Number(w.net_worth_usd || 0);
      const fx = Number(w.exchange_rate_brl || 1);
      const base = w.base_date ? new Date(`${w.base_date}T00:00:00Z`) : new Date();
      const perSecond = annual / 31536000;
      const tick = () => {
        const elapsed = Math.max(0, (Date.now() - base.getTime()) / 1000);
        const estimate = net + (perSecond * elapsed);
        counter.innerHTML = `
          <article class="wealth-card primary">
            <span class="tag gold">${esc(w.label || 'Patrimônio estimado')}</span>
            <strong class="money-big">${money(estimate, 'USD')}</strong>
            <small>${money(estimate * fx, 'BRL')} • câmbio editável no Supabase: ${fx.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})}</small>
            <p>${esc(w.method_note || 'Estimativa matemática com base nos valores cadastrados no Supabase.')}</p>
            <div class="tag-row"><span class="tag">Base: ${esc(w.base_date || 'não informada')}</span><span class="tag">Fonte: ${esc(w.source_label || 'não informada')}</span></div>
            ${w.source_url ? `<a class="btn small" href="${esc(w.source_url)}" target="_blank" rel="noopener">Abrir fonte</a>` : ''}
          </article>`;
      };
      tick();
      if(window.__wealthTimer) clearInterval(window.__wealthTimer);
      window.__wealthTimer = setInterval(tick, 1000);
    }
  }
  if(rates){
    if(!w){ rates.innerHTML=''; }
    else{
      const annual=Number(w.annual_earnings_usd||0); const fx=Number(w.exchange_rate_brl||1);
      const values=[
        ['Por segundo', annual/31536000],
        ['Por minuto', annual/525600],
        ['Por hora', annual/8760],
        ['Por dia', annual/365],
        ['Por mês', annual/12],
        ['Por ano', annual]
      ];
      rates.innerHTML=values.map(([label,val])=>`<article class="rate-card"><span>${label}</span><strong>${money(val,'USD', label==='Por segundo'?2:0)}</strong><small>${money(val*fx,'BRL', label==='Por segundo'?2:0)}</small></article>`).join('');
    }
  }
  if(note && w){ note.innerHTML=`<strong>Importante:</strong> patrimônio real não é público/auditado. Este contador não consulta banco em tempo real a cada segundo; ele calcula uma projeção visual no navegador usando <code>net_worth_usd</code>, <code>annual_earnings_usd</code>, <code>exchange_rate_brl</code> e <code>base_date</code> cadastrados no Supabase. Atualize esses campos quando quiser trocar a estimativa.`; }

  const filters=$('#assets-filters'), grid=$('#assets-grid');
  if(filters&&grid){
    const assets=list('assets');
    if(!assets.length){ grid.innerHTML=empty('Cadastre neymar_assets.'); return; }
    const cats=unique(assets,'category');
    filters.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
    const paint=(cat='Todos')=>{ const out=cat==='Todos'?assets:assets.filter(a=>a.category===cat); grid.innerHTML=out.length?out.map(assetCard).join(''):empty('Nenhum bem divulgado neste filtro.'); };
    paint();
    filters.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return; $$('.filter-btn',filters).forEach(x=>x.classList.remove('active')); b.classList.add('active'); paint(b.dataset.filter);});
  }
}
function assetCard(a){
  const credit = a.source_label ? `<small class="media-credit">Imagem/dado: ${esc(a.source_label)}</small>` : '';
  return `<article class="card asset-card"><div class="card-media">${img(a.image_url,a.item_name)}</div><div class="card-body"><div class="tag-row"><span class="tag gold">${esc(a.category)}</span><span class="tag">${esc(a.status_label||'Divulgado publicamente')}</span></div><h3>${esc(a.item_name)}</h3><p>${esc(a.description)}</p>${credit}<div class="asset-meta"><strong>${esc(a.estimated_value||'Valor não confirmado')}</strong><span>${esc(a.location||'Local não informado')}</span></div>${a.source_url?`<a class="btn small" href="${esc(a.source_url)}" target="_blank" rel="noopener">Fonte</a>`:''}</div></article>`;
}
function renderVidaAtual(){
  const grid=$('#life-grid'), filters=$('#life-filters'), summary=$('#life-summary');
  const rows=list('life');
  const p=profile();
  if(summary){
    summary.innerHTML = `<article class="kpi-card"><strong>${esc(p.birth || '—')}</strong><span>Data de nascimento</span><small>${esc(p.birthplace || 'Mogi das Cruzes, SP')}</small></article><article class="kpi-card"><strong>${esc(p.position || 'Atacante')}</strong><span>Posição</span><small>${esc(p.dominant_foot || 'Pé direito')} • ${esc(p.height || '')}</small></article><article class="kpi-card"><strong>Santos</strong><span>Clube atual</span><small>Contrato e contexto atual cadastrados no Supabase.</small></article>`;
  }
  if(!grid||!filters) return;
  if(!rows.length){ grid.innerHTML=empty('Cadastre neymar_family_life.'); return; }
  const cats=unique(rows,'section');
  filters.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
  const paint=(cat='Todos')=>{ const out=cat==='Todos'?rows:rows.filter(r=>r.section===cat); grid.innerHTML=out.length?out.map(lifeCard).join(''):empty('Nenhum item neste filtro.'); };
  paint();
  filters.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return; $$('.filter-btn',filters).forEach(x=>x.classList.remove('active')); b.classList.add('active'); paint(b.dataset.filter);});
}
function lifeCard(l){
  return `<article class="card life-card"><div class="card-media">${img(l.image_url,l.title)}</div><div class="card-body"><div class="tag-row"><span class="tag gold">${esc(l.section)}</span><span class="tag">${esc(l.status_label||'Info pública')}</span></div><h3>${esc(l.title)}</h3><div class="life-value">${esc(l.value||'')}</div><p>${esc(l.description||'')}</p><div class="family-meta"><span>${esc(l.date_label||'')}</span>${l.source_url?`<a href="${esc(l.source_url)}" target="_blank" rel="noopener">${esc(l.source_label||'Fonte')}</a>`:''}</div></div></article>`;
}

async function renderSupabasePage(){
  renderStatus();
  const info=$('#supabase-info'); if(info){ info.innerHTML=`<article class="kpi-card"><strong>${state.status.connected?'ON':'OFF'}</strong><span>Status</span><small>${esc(state.status.message)}</small></article><article class="kpi-card"><strong>${state.status.loaded}</strong><span>Tabelas carregadas</span><small>${state.status.errors.length} erro(s) de leitura.</small></article><article class="kpi-card"><strong>${Object.values(state.data).reduce((a,r)=>a+(Array.isArray(r)?r.length:0),0)}</strong><span>Registros lidos</span><small>Todo o conteúdo vem do Supabase.</small></article>`; }
  const table=$('#supabase-tables'); if(table){ const entries=Object.entries(TABLES); table.innerHTML=`<table><thead><tr><th>Tabela</th><th>Registros lidos</th><th>Status</th></tr></thead><tbody>${entries.map(([key,name])=>`<tr><td><strong>${name}</strong></td><td>${Array.isArray(state.data[key])?state.data[key].length:'—'}</td><td>${Array.isArray(state.data[key])?'OK':'Não carregada'}</td></tr>`).join('')}</tbody></table>`; }
  const errors=$('#supabase-errors'); if(errors){ errors.innerHTML=state.status.errors.length?`<div class="error-box"><strong>Erros de leitura:</strong><ul>${state.status.errors.map(e=>`<li>${esc(e)}</li>`).join('')}</ul></div>`:''; }
  const form=$('#feedback-form'); if(form){ form.addEventListener('submit',async e=>{ e.preventDefault(); const msg=$('#feedback-message'); const payload=Object.fromEntries(new FormData(form).entries()); payload.page=page; payload.path=location.pathname; try{ await insert('site_feedback', payload); form.reset(); if(msg) msg.textContent='Sugestão enviada ao Supabase.'; }catch(err){ if(msg) msg.textContent='Falha ao enviar. Confira a tabela site_feedback e a policy de insert.'; } }); }
}

async function init(){
  await loadAllData();
  initLayout();
  renderHero(); renderKpis(); renderTimeline(); renderClubChart(); renderFeaturedGoals();
  if(page==='clubes') renderClubes();
  if(page==='selecao') renderSelecao();
  if(page==='estatisticas') renderEstatisticas();
  if(page==='premios') renderPremios();
  if(page==='adversarios') renderAdversarios();
  if(page==='transferencias') renderTransferencias();
  if(page==='patrimonio') renderPatrimonio();
  if(page==='vida') renderVidaAtual();
  if(page==='midia') renderMidia();
  if(page==='supabase') renderSupabasePage();
}
document.addEventListener('DOMContentLoaded', init);
