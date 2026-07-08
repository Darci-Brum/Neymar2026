const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function formatNumber(value) {
  return value === null || value === undefined ? '—' : new Intl.NumberFormat('pt-BR').format(value);
}

function renderHeroStats() {
  const target = $('#heroStats');
  target.innerHTML = NEYMAR_DATA.heroStats.map(item => `
    <div class="mini-stat">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </div>
  `).join('');
}

function renderTopNumbers() {
  $('#topNumbers').innerHTML = NEYMAR_DATA.topNumbers.map(item => `
    <article class="number-card reveal">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </article>
  `).join('');
}

function renderTimeline() {
  $('#timeline').innerHTML = NEYMAR_DATA.timeline.map(item => `
    <article class="timeline-item reveal">
      <div class="timeline-card">
        <span class="year">${item.year}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `).join('');
}

function renderClubCards() {
  $('#clubCards').innerHTML = NEYMAR_DATA.passages.map(item => `
    <article class="club-card reveal">
      <div class="club-card-body">
        <span class="period">${item.period}</span>
        <h3>${item.club}</h3>
        <p>${item.summary}</p>
        <div class="club-stats" aria-label="Números de ${item.club}">
          <div><strong>${formatNumber(item.apps)}</strong><span>Jogos</span></div>
          <div><strong>${formatNumber(item.goals)}</strong><span>Gols</span></div>
          <div><strong>${formatNumber(item.assists)}</strong><span>Assist.</span></div>
        </div>
        <div class="club-tags">
          ${item.highlights.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
      <div class="club-card-media">
        <img src="${item.image}" alt="Imagem relacionada a ${item.club}" loading="lazy" />
        <span class="club-badge">${item.shirt}</span>
      </div>
    </article>
  `).join('');
}

function renderTitleGroups() {
  Object.entries(NEYMAR_DATA.titleGroups).forEach(([key, items]) => {
    const panel = $(`#${key}`);
    panel.innerHTML = `<div class="tile-grid">${items.map(item => `
      <article class="title-tile reveal">
        <span class="meta">${item.meta}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join('')}</div>`;
  });
}

function renderGoalTypes() {
  $('#goalTypeCards').innerHTML = NEYMAR_DATA.goalTypes.map(item => `
    <article class="goal-type-card reveal">
      <div class="icon" aria-hidden="true">${item.icon}</div>
      <strong>${item.value}</strong>
      <h3>${item.label}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function renderCompetitionBars() {
  const max = Math.max(...NEYMAR_DATA.brazilGoalsByCompetition.map(item => item.goals));
  $('#competitionBars').innerHTML = NEYMAR_DATA.brazilGoalsByCompetition.map(item => `
    <div class="bar-row reveal">
      <span class="bar-label">${item.label}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${(item.goals / max) * 100}%"></span></span>
      <span class="bar-value">${item.goals}</span>
    </div>
  `).join('');
}

function renderOpponents() {
  const search = $('#opponentSearch').value.trim().toLowerCase();
  const type = $('#opponentType').value;
  const items = NEYMAR_DATA.opponents.filter(item => {
    const matchesType = type === 'all' || item.type === type;
    const searchable = `${item.name} ${item.type} ${item.context} ${item.note}`.toLowerCase();
    const matchesSearch = !search || searchable.includes(search);
    return matchesType && matchesSearch;
  });

  const totalNationalGoals = items
    .filter(item => item.type === 'Seleção' && typeof item.goals === 'number')
    .reduce((sum, item) => sum + item.goals, 0);
  const clubs = items.filter(item => item.type === 'Clube').length;
  const countries = items.filter(item => item.type === 'Seleção').length;

  $('#opponentSummary').innerHTML = `
    <span><b>${items.length}</b> resultados</span>
    <span><b>${countries}</b> seleções</span>
    <span><b>${clubs}</b> clubes</span>
    <span><b>${totalNationalGoals}</b> gols em seleções filtradas</span>
  `;

  $('#opponentGrid').innerHTML = items.map(item => `
    <article class="opponent-card reveal visible">
      <span class="type">${item.type}</span>
      <h3>${item.name}</h3>
      <p><strong>${item.context}</strong> — ${item.note}</p>
      <div class="goals">
        <span>${item.goals === null ? 'Gols no banco' : 'Gols'}</span>
        <strong>${item.goals === null ? '✓' : item.goals}</strong>
      </div>
    </article>
  `).join('');
}

function renderGallery() {
  $('#galleryGrid').innerHTML = NEYMAR_DATA.gallery.map(item => `
    <article class="gallery-card reveal">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="gallery-caption">
        <span>${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `).join('');
}

function renderSources() {
  $('#sourceGrid').innerHTML = NEYMAR_DATA.sources.map(item => `
    <article class="source-card reveal">
      <h3>${item.name}</h3>
      <p>${item.text}</p>
      <a href="${item.url}" target="_blank" rel="noopener">Abrir fonte</a>
    </article>
  `).join('');
}

function setupTabs() {
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      $$('.tab-panel').forEach(panel => panel.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      $(`#${tab.dataset.tab}`).classList.add('active');
      observeReveals();
    });
  });
}

function setupMenu() {
  const btn = $('.menu-toggle');
  const nav = $('.main-nav');
  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
  $$('.main-nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

function drawBarChart(canvasId, labels, values, options = {}) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = (rect.width * 0.58) * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.width * 0.58;
  const padding = { top: 28, right: 18, bottom: 76, left: 46 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const max = Math.max(...values) * 1.18;
  const barGap = 18;
  const barWidth = (chartWidth - barGap * (values.length - 1)) / values.length;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(7,17,31,.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  values.forEach((value, index) => {
    const x = padding.left + index * (barWidth + barGap);
    const barHeight = (value / max) * chartHeight;
    const y = padding.top + chartHeight - barHeight;

    const gradient = ctx.createLinearGradient(0, y, 0, padding.top + chartHeight);
    gradient.addColorStop(0, options.gold ? '#f4c21b' : '#a50044');
    gradient.addColorStop(1, options.gold ? '#fff0a7' : '#003b86');

    roundRect(ctx, x, y, barWidth, barHeight, 12, gradient);

    ctx.fillStyle = '#07111f';
    ctx.font = '800 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(formatNumber(value), x + barWidth / 2, y - 8);

    ctx.save();
    ctx.translate(x + barWidth / 2, height - 18);
    ctx.rotate(-Math.PI / 5);
    ctx.fillStyle = '#6d7280';
    ctx.font = '800 11px Inter, sans-serif';
    ctx.fillText(labels[index], 0, 0);
    ctx.restore();
  });
}

function roundRect(ctx, x, y, width, height, radius, fillStyle) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function renderCharts() {
  const labels = NEYMAR_DATA.passages.map(item => item.club.replace('Paris Saint-Germain', 'PSG').replace('Seleção Brasileira', 'Brasil'));
  drawBarChart('goalsChart', labels, NEYMAR_DATA.passages.map(item => item.goals), { gold: false });
  drawBarChart('appsChart', labels, NEYMAR_DATA.passages.map(item => item.apps), { gold: true });
}

function observeReveals() {
  const reveals = $$('.reveal:not(.visible)');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(item => observer.observe(item));
}

function setupFilters() {
  $('#opponentSearch').addEventListener('input', renderOpponents);
  $('#opponentType').addEventListener('change', renderOpponents);
}

function setupGlow() {
  const glow = $('.cursor-glow');
  window.addEventListener('mousemove', event => {
    glow.style.left = `${event.clientX - 170}px`;
    glow.style.top = `${event.clientY - 170}px`;
  }, { passive: true });
}

function init() {
  renderHeroStats();
  renderTopNumbers();
  renderTimeline();
  renderClubCards();
  renderTitleGroups();
  renderGoalTypes();
  renderCompetitionBars();
  renderOpponents();
  renderGallery();
  renderSources();
  setupTabs();
  setupMenu();
  setupFilters();
  setupGlow();
  observeReveals();
  renderCharts();
}

window.addEventListener('load', init);
window.addEventListener('resize', () => {
  clearTimeout(window.__chartResize);
  window.__chartResize = setTimeout(renderCharts, 120);
});
