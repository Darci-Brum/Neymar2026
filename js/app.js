const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const page = document.body.dataset.page || 'home';
let data = NJR_DATA;

const pageLinks = {
  home: 'index.html',
  clubes: 'clubes.html',
  selecao: 'selecao.html',
  gols: 'gols.html',
  premios: 'premios.html',
  adversarios: 'adversarios.html',
  galeria: 'galeria.html',
  supabase: 'supabase.html'
};

function initLayout(){
  const nav = $('#nav-links');
  if(nav){
    nav.innerHTML = `
      <a href="index.html" data-nav="home">Dashboard</a>
      <a href="clubes.html" data-nav="clubes">Clubes</a>
      <a href="selecao.html" data-nav="selecao">Seleção</a>
      <a href="gols.html" data-nav="gols">Gols</a>
      <a href="premios.html" data-nav="premios">Medalhas & Prêmios</a>
      <a href="adversarios.html" data-nav="adversarios">Adversários</a>
      <a href="galeria.html" data-nav="galeria">Galeria</a>
      <a href="supabase.html" data-nav="supabase">Supabase</a>
    `;
    $$('a', nav).forEach(a => {
      if(a.dataset.nav === page) a.classList.add('active');
    });
  }

  const toggle = $('#mobile-toggle');
  if(toggle && nav){
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const heroImage = data.player.heroImage;
  document.documentElement.style.setProperty('--hero-img', `url('${heroImage}')`);

  const footer = $('#footer-sources');
  if(footer){
    footer.innerHTML = data.sources.map(source => `<a href="${source.url}" target="_blank" rel="noopener">${source.label}</a>`).join('');
  }
  renderSupabaseStatus();
}

function renderSupabaseStatus(){
  const status = $('#supabase-status');
  if(!status) return;
  const s = window.SupabaseStore?.status || { mode:'local', message:'Usando dados locais.' };
  status.innerHTML = `
    <span class="status-dot ${s.mode === 'supabase' ? 'online' : 'offline'}"></span>
    <span>${s.mode === 'supabase' ? 'Supabase conectado' : 'Modo local'}</span>
    <small>${s.message}</small>
  `;
}

function img(url, alt = ''){
  return `<img src="${url}" alt="${alt}" loading="lazy" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg,#10112d,#8c1238)'">`;
}

function format(n){ return Number(n).toLocaleString('pt-BR'); }

function unique(list, key){
  return ['Todos', ...new Set(list.map(item => item[key]).filter(Boolean))];
}

function renderHeroMini(){
  const el = $('#hero-mini');
  if(!el) return;
  el.innerHTML = `
    <div class="player-badge"><span class="player-number">10</span><span>NJR Archive</span></div>
    <h2>${data.player.shortName}</h2>
    <p>${data.player.subtitle}</p>
    <div class="phone-stats">
      <div class="phone-stat"><strong>${(data.nationalTeams.find(t => String(t.team).includes('Principal')) || data.nationalTeams[0] || {goals:0}).goals}</strong><span>Gols Brasil</span></div>
      <div class="phone-stat"><strong>${(data.goalTypes[0] || {value:0}).value}</strong><span>Pênaltis</span></div>
      <div class="phone-stat"><strong>${(data.goalTypes[2] || {value:0}).value}</strong><span>Faltas</span></div>
    </div>
  `;
}

function kpiCards(){
  return data.totals.map(item => `
    <article class="kpi-card">
      <strong>${format(item.value)}${item.suffix}</strong>
      <span>${item.label}</span>
      <small>${item.note}</small>
    </article>
  `).join('');
}

function renderHome(){
  const kpis = $('#kpis');
  if(kpis) kpis.innerHTML = kpiCards();

  const timeline = $('#timeline');
  if(timeline){
    const items = [
      {year:'2009',title:'Estreia profissional',text:'Neymar sobe ao profissional do Santos e começa a trajetória de craque geracional.'},
      {year:'2011',title:'Libertadores + Puskás',text:'Campeão continental e vencedor do prêmio de gol mais bonito do ano.'},
      {year:'2013',title:'Barcelona e Brasil campeão',text:'Chega ao Barcelona e conquista a Copa das Confederações com a Seleção.'},
      {year:'2015',title:'Tríplice coroa europeia',text:'Champions League, La Liga e Copa do Rei no auge do trio MSN.'},
      {year:'2016',title:'Ouro Olímpico',text:'Capitão do Brasil no primeiro ouro olímpico do futebol masculino.'},
      {year:'2017',title:'Transferência recorde',text:'Chegada ao PSG como maior transferência da história do futebol.'},
      {year:'2025',title:'Retorno ao Santos',text:'Volta ao clube formador para nova fase da carreira.'}
    ];
    timeline.innerHTML = items.map(item => `
      <div class="timeline-item">
        <span class="timeline-dot"></span>
        <div class="timeline-box"><strong>${item.year}</strong><h3>${item.title}</h3><p>${item.text}</p></div>
      </div>
    `).join('');
  }

  const chart = $('#club-chart');
  if(chart){
    const max = Math.max(...data.clubPassages.map(c => c.stats.goals));
    chart.innerHTML = data.clubPassages.map(club => `
      <div class="bar-row">
        <div class="bar-label">${club.club}<br><small>${club.period}</small></div>
        <div class="bar-track"><div class="bar-fill" style="--w:${(club.stats.goals / max) * 100}%"></div></div>
        <div class="bar-value">${club.stats.goals}</div>
      </div>
    `).join('');
  }

  const featured = $('#featured-goals');
  if(featured){
    featured.innerHTML = data.importantGoals.slice(0,4).map(goal => goalCard(goal)).join('');
  }
}

function clubCard(club){
  const stats = club.stats;
  return `
    <article class="card club-card" data-club="${club.club}" data-period="${club.period}">
      <div class="card-media">${img(club.image, club.club)}</div>
      <div class="card-body">
        <div class="tag-row"><span class="tag gold">${club.period}</span><span class="tag">${club.country}</span><span class="tag">Camisa ${club.shirt}</span></div>
        <h3>${club.club}</h3>
        <p>${club.summary}</p>
        <div class="stat-list">
          <div class="mini-stat"><strong>${format(stats.games)}</strong><span>Jogos</span></div>
          <div class="mini-stat"><strong>${format(stats.goals)}</strong><span>Gols</span></div>
          <div class="mini-stat"><strong>${format(stats.assists)}</strong><span>Assist.</span></div>
          <div class="mini-stat"><strong>${format(stats.penalties)}</strong><span>Pênaltis</span></div>
          <div class="mini-stat"><strong>${format(stats.freeKicks)}</strong><span>Faltas</span></div>
        </div>
        <div class="tag-row">${club.titles.length ? club.titles.map(t => `<span class="tag">${t}</span>`).join('') : '<span class="tag">Sem título coletivo listado nesta fase</span>'}</div>
        <button class="btn small secondary" data-open-details="${club.id}">Ver jogos importantes</button>
        <div class="details" id="details-${club.id}" hidden>
          <br>
          ${club.importantGames.map(g => `<p><strong>${g.date} — ${g.title}</strong><br>${g.detail}</p>`).join('')}
          <p><strong>Marcos:</strong></p>
          <ul>${club.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
        </div>
      </div>
    </article>
  `;
}

function renderClubes(){
  const grid = $('#clubs-grid');
  const filters = $('#clubs-filters');
  if(!grid || !filters) return;

  const clubNames = unique(data.clubPassages, 'club');
  filters.innerHTML = clubNames.map((club, index) => `<button class="filter-btn ${index===0?'active':''}" data-filter="${club}">${club}</button>`).join('');

  function paint(filter = 'Todos'){
    const list = filter === 'Todos' ? data.clubPassages : data.clubPassages.filter(c => c.club === filter);
    grid.innerHTML = list.map(clubCard).join('');
    bindDetails();
  }
  paint();
  filters.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    $$('.filter-btn', filters).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paint(btn.dataset.filter);
  });
}

function bindDetails(){
  $$('[data-open-details]').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = $(`#details-${btn.dataset.openDetails}`);
      if(el){ el.hidden = !el.hidden; btn.textContent = el.hidden ? 'Ver jogos importantes' : 'Ocultar detalhes'; }
    });
  });
}

function renderSelecao(){
  const grid = $('#national-grid');
  if(grid){
    grid.innerHTML = data.nationalTeams.map(item => `
      <article class="card">
        <div class="card-body">
          <div class="tag-row"><span class="tag gold">${item.period}</span><span class="tag">${item.team}</span></div>
          <h3>${item.team}</h3>
          <p>${item.note}</p>
          <div class="stat-list">
            <div class="mini-stat"><strong>${item.games}</strong><span>Jogos</span></div>
            <div class="mini-stat"><strong>${item.goals}</strong><span>Gols</span></div>
            <div class="mini-stat"><strong>${item.titles.length}</strong><span>Títulos/medalhas</span></div>
          </div>
          <div class="tag-row">${item.titles.length ? item.titles.map(t => `<span class="tag">${t}</span>`).join('') : '<span class="tag">Sem título listado</span>'}</div>
        </div>
      </article>
    `).join('');
  }

  const goals = $('#national-goals');
  if(goals){
    goals.innerHTML = data.importantGoals.filter(g => g.classification === 'Seleção').map(goalCard).join('');
  }
}

function goalCard(goal){
  return `
    <article class="card">
      <div class="card-body">
        <div class="tag-row"><span class="tag gold">${goal.classification}</span><span class="tag">${goal.competition}</span><span class="tag">${goal.type}</span></div>
        <h3>${goal.opponent}</h3>
        <p><strong>${goal.date}</strong> — ${goal.detail}</p>
      </div>
    </article>
  `;
}

function renderGols(){
  const goalBars = $('#goal-types');
  if(goalBars){
    const max = Math.max(...data.goalTypes.map(g => g.value));
    goalBars.innerHTML = data.goalTypes.map(g => `
      <div class="bar-row">
        <div class="bar-label">${g.type}<br><small>${g.source}</small></div>
        <div class="bar-track"><div class="bar-fill" style="--w:${(g.value / max) * 100}%"></div></div>
        <div class="bar-value">${g.value}</div>
      </div>
      <p class="note">${g.description}</p>
    `).join('');
  }

  const filters = $('#goals-filters');
  const grid = $('#goals-grid');
  if(filters && grid){
    const cats = unique(data.importantGoals, 'classification');
    filters.innerHTML = cats.map((cat, i) => `<button class="filter-btn ${i===0?'active':''}" data-filter="${cat}">${cat}</button>`).join('');
    function paint(cat='Todos'){
      const list = cat === 'Todos' ? data.importantGoals : data.importantGoals.filter(g => g.classification === cat);
      grid.innerHTML = list.length ? list.map(goalCard).join('') : '<div class="empty">Nenhum gol encontrado nesse filtro.</div>';
    }
    paint();
    filters.addEventListener('click', e => {
      const btn = e.target.closest('button'); if(!btn) return;
      $$('.filter-btn', filters).forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); paint(btn.dataset.filter);
    });
  }
}

function awardCard(award){
  return `
    <article class="card award-card" data-category="${award.classification}">
      <div class="card-media">${img(award.image, award.title)}</div>
      <div class="card-body">
        <div class="award-class">${award.classification}</div>
        <h3>${award.title}</h3>
        <span class="award-years">${award.years}</span>
        <p>${award.detail}</p>
      </div>
    </article>
  `;
}

function titleCard(title){
  return `
    <article class="card award-card" data-category="${title.category}">
      <div class="card-media">${img(title.image, title.title)}</div>
      <div class="card-body">
        <div class="award-class">${title.category}</div>
        <h3>${title.title}</h3>
        <span class="award-years">${title.years}</span>
      </div>
    </article>
  `;
}

function renderPremios(){
  const filters = $('#awards-filters');
  const grid = $('#awards-grid');
  if(filters && grid){
    const cats = ['Todos', ...new Set(data.individualAwards.map(a => a.classification))];
    filters.innerHTML = cats.map((cat, i) => `<button class="filter-btn ${i===0?'active':''}" data-filter="${cat}">${cat}</button>`).join('');
    function paint(cat='Todos'){
      const list = cat === 'Todos' ? data.individualAwards : data.individualAwards.filter(a => a.classification === cat);
      grid.innerHTML = list.map(awardCard).join('');
    }
    paint();
    filters.addEventListener('click', e => {
      const btn = e.target.closest('button'); if(!btn) return;
      $$('.filter-btn', filters).forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); paint(btn.dataset.filter);
    });
  }

  const tfilters = $('#titles-filters');
  const tgrid = $('#titles-grid');
  if(tfilters && tgrid){
    const cats = ['Todos', ...new Set(data.collectiveTitles.map(t => t.category))];
    tfilters.innerHTML = cats.map((cat, i) => `<button class="filter-btn ${i===0?'active':''}" data-filter="${cat}">${cat}</button>`).join('');
    function paint(cat='Todos'){
      const list = cat === 'Todos' ? data.collectiveTitles : data.collectiveTitles.filter(t => t.category === cat);
      tgrid.innerHTML = list.map(titleCard).join('');
    }
    paint();
    tfilters.addEventListener('click', e => {
      const btn = e.target.closest('button'); if(!btn) return;
      $$('.filter-btn', tfilters).forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); paint(btn.dataset.filter);
    });
  }
}

function renderAdversarios(){
  const filters = $('#opponents-filters');
  const table = $('#opponents-table');
  const search = $('#opponents-search');
  if(!filters || !table || !search) return;
  const cats = ['Todos', ...new Set(data.opponents.map(o => o.category))];
  filters.innerHTML = cats.map((cat, i) => `<button class="filter-btn ${i===0?'active':''}" data-filter="${cat}">${cat}</button>`).join('');
  let current = 'Todos';
  function paint(){
    const q = search.value.trim().toLowerCase();
    const list = data.opponents
      .filter(o => current === 'Todos' || o.category === current)
      .filter(o => !q || `${o.name} ${o.context} ${o.category}`.toLowerCase().includes(q))
      .sort((a,b) => b.goals - a.goals || a.name.localeCompare(b.name));
    table.innerHTML = list.length ? `
      <table>
        <thead><tr><th>Adversário</th><th>Classificação</th><th>Contexto</th><th>Gols registrados</th></tr></thead>
        <tbody>${list.map(o => `<tr><td><strong>${o.name}</strong></td><td>${o.category}</td><td>${o.context}</td><td>${o.goals}</td></tr>`).join('')}</tbody>
      </table>
    ` : '<div class="empty">Nenhum adversário encontrado.</div>';
    const count = $('#opponents-count');
    if(count) count.textContent = `${list.length} adversários encontrados`;
  }
  paint();
  search.addEventListener('input', paint);
  filters.addEventListener('click', e => {
    const btn = e.target.closest('button'); if(!btn) return;
    current = btn.dataset.filter;
    $$('.filter-btn', filters).forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); paint();
  });
}

function renderGaleria(){
  const filters = $('#gallery-filters');
  const grid = $('#gallery-grid');
  if(!filters || !grid) return;
  const cats = ['Todos', ...new Set(data.gallery.map(g => g.tag))];
  filters.innerHTML = cats.map((cat, i) => `<button class="filter-btn ${i===0?'active':''}" data-filter="${cat}">${cat}</button>`).join('');
  function paint(cat='Todos'){
    const list = cat === 'Todos' ? data.gallery : data.gallery.filter(g => g.tag === cat);
    grid.innerHTML = list.map(g => `
      <article class="gallery-card">
        ${img(g.image, g.title)}
        <div class="gallery-info">
          <span class="tag gold">${g.tag}</span>
          <h3>${g.title}</h3>
          <p>${g.credit}</p>
        </div>
      </article>
    `).join('');
  }
  paint();
  filters.addEventListener('click', e => {
    const btn = e.target.closest('button'); if(!btn) return;
    $$('.filter-btn', filters).forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); paint(btn.dataset.filter);
  });
}

async function init(){
  data = window.SupabaseStore ? await window.SupabaseStore.loadSiteData(NJR_DATA) : NJR_DATA;
  if(window.SupabaseStore) window.SupabaseStore.trackPageView(page);
  initLayout();
  renderHeroMini();
  if(page === 'home') renderHome();
  if(page === 'clubes') renderClubes();
  if(page === 'selecao') renderSelecao();
  if(page === 'gols') renderGols();
  if(page === 'premios') renderPremios();
  if(page === 'adversarios') renderAdversarios();
  if(page === 'galeria') renderGaleria();
  if(page === 'supabase') renderSupabasePage();
}

async function renderSupabasePage(){
  renderSupabaseStatus();
  const info = $('#supabase-info');
  if(info){
    const s = window.SupabaseStore?.status;
    info.innerHTML = `
      <div class="kpi-card"><strong>${s?.mode === 'supabase' ? 'ON' : 'LOCAL'}</strong><span>Status dos dados</span><small>${s?.message || 'Sem status disponível.'}</small></div>
      <div class="kpi-card"><strong>${data.clubPassages.length}</strong><span>Passagens</span><small>Clubes/fases carregadas no site.</small></div>
      <div class="kpi-card"><strong>${data.individualAwards.length}</strong><span>Prêmios</span><small>Medalhas e prêmios individuais.</small></div>
      <div class="kpi-card"><strong>${data.opponents.length}</strong><span>Adversários</span><small>Times e seleções cadastrados.</small></div>
    `;
  }

  const table = $('#supabase-tables');
  if(table && window.SupabaseStore){
    const counts = await window.SupabaseStore.getDashboardCounts();
    table.innerHTML = `
      <table>
        <thead><tr><th>Tabela</th><th>Registros</th><th>Uso no site</th></tr></thead>
        <tbody>${Object.entries(counts).map(([name,count]) => `<tr><td><strong>${name}</strong></td><td>${count === null ? 'não encontrada' : count}</td><td>${tableUsage(name)}</td></tr>`).join('')}</tbody>
      </table>
    `;
  }

  const form = $('#feedback-form');
  if(form){
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const msg = $('#feedback-message');
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.page = page;
      payload.path = location.pathname;
      try{
        await window.SupabaseStore.insertFeedback(payload);
        form.reset();
        if(msg) msg.textContent = 'Sugestão enviada para o Supabase com sucesso.';
      }catch(error){
        if(msg) msg.textContent = 'Não foi possível enviar. Verifique se a tabela site_feedback e as policies foram criadas.';
        console.warn(error);
      }
    });
  }
}

function tableUsage(name){
  const map = {
    neymar_profile:'Dados do herói e perfil',
    neymar_totals:'KPIs do dashboard',
    neymar_goal_types:'Gráficos de tipos de gol',
    neymar_club_passages:'Aba Clubes',
    neymar_national_teams:'Aba Seleção',
    neymar_collective_titles:'Títulos coletivos',
    neymar_individual_awards:'Medalhas e prêmios',
    neymar_important_goals:'Gols históricos',
    neymar_opponents:'Aba Adversários',
    neymar_gallery:'Galeria',
    neymar_sources:'Links de fonte'
  };
  return map[name] || 'Integração geral';
}

document.addEventListener('DOMContentLoaded', init);
