const kpiGrid = document.querySelector('#kpi-grid');
const comparisonTable = document.querySelector('#comparison-table');

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

function getMax(items, accessor) {
  return Math.max(...items.map(accessor), 1);
}

function renderKpis() {
  const neymar = players.find((player) => player.id === 'neymar');
  const messi = players.find((player) => player.id === 'messi');
  const totalBarcaGoals = neymar.barcelona.goals + messi.barcelona.goals;
  const totalBarcaAssists = neymar.barcelona.assists + messi.barcelona.assists;

  const cards = [
    { label: 'Gols Neymar + Messi no Barça', value: totalBarcaGoals, detail: 'soma dos dois no clube' },
    { label: 'Assistências Neymar + Messi', value: totalBarcaAssists, detail: 'participação em criação' },
    { label: 'Títulos de Messi no Barça', value: messi.barcelona.titles, detail: 'maior vencedor do clube' },
    { label: 'Títulos de Neymar no Barça', value: neymar.barcelona.titles, detail: 'incluindo Champions 14/15' }
  ];

  kpiGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="kpi-card">
          <small>${card.label}</small>
          <strong>${formatNumber(card.value)}</strong>
          <span>${card.detail}</span>
        </article>
      `
    )
    .join('');
}

function drawBarChart(canvasId, items, accessor, options = {}) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = canvas.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = canvas.height / dpr;
  const padding = { top: 24, right: 22, bottom: 64, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = getMax(items, accessor);
  const barGap = 18;
  const barWidth = Math.max(28, (chartWidth - barGap * (items.length - 1)) / items.length);

  ctx.clearRect(0, 0, width, height);
  ctx.font = '600 12px Inter, sans-serif';
  ctx.textBaseline = 'middle';

  // linhas de fundo
  ctx.strokeStyle = 'rgba(255,255,255,0.10)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  items.forEach((item, index) => {
    const value = accessor(item);
    const x = padding.left + index * (barWidth + barGap);
    const barHeight = (value / maxValue) * chartHeight;
    const y = padding.top + chartHeight - barHeight;

    const gradient = ctx.createLinearGradient(0, y, 0, padding.top + chartHeight);
    gradient.addColorStop(0, item.accent || '#e31b3f');
    gradient.addColorStop(1, item.secondary || '#244bd6');

    roundRect(ctx, x, y, barWidth, barHeight, 14, gradient);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '800 14px Inter, sans-serif';
    ctx.fillText(formatNumber(value), x + barWidth / 2, y - 12);

    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.font = '700 11px Inter, sans-serif';
    const label = options.shortNames ? item.name.split(' ')[0] : item.name;
    ctx.fillText(label, x + barWidth / 2, height - 38);
  });
}

function drawGroupedCareerChart() {
  const canvas = document.getElementById('careerChart');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = canvas.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = canvas.height / dpr;
  const padding = { top: 26, right: 24, bottom: 72, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = getMax(players, (p) => p.career.goals);
  const groupWidth = chartWidth / players.length;
  const barWidth = Math.max(18, groupWidth / 4);

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(255,255,255,0.10)';
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  players.forEach((player, index) => {
    const center = padding.left + groupWidth * index + groupWidth / 2;
    const values = [
      { label: 'Barça', value: player.barcelona.goals, colorA: player.accent, colorB: player.secondary },
      { label: 'Carreira', value: player.career.goals, colorA: '#ffffff', colorB: 'rgba(255,255,255,0.35)' }
    ];

    values.forEach((bar, barIndex) => {
      const barHeight = (bar.value / maxValue) * chartHeight;
      const x = center - barWidth - 5 + barIndex * (barWidth + 10);
      const y = padding.top + chartHeight - barHeight;
      const gradient = ctx.createLinearGradient(0, y, 0, padding.top + chartHeight);
      gradient.addColorStop(0, bar.colorA);
      gradient.addColorStop(1, bar.colorB);
      roundRect(ctx, x, y, barWidth, barHeight, 10, gradient);
    });

    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.font = '700 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(player.name.split(' ')[0], center, height - 42);
  });

  ctx.textAlign = 'left';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Claro: gols na carreira • Colorido: gols no Barcelona', padding.left, height - 16);
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

function renderTable() {
  comparisonTable.innerHTML = players
    .map(
      (player) => `
        <tr>
          <td><b>${player.name}</b><small>${player.nickname}</small></td>
          <td>${player.country}</td>
          <td>${player.era}</td>
          <td>${formatNumber(player.barcelona.matches)}</td>
          <td>${formatNumber(player.barcelona.goals)}</td>
          <td>${formatNumber(player.barcelona.assists)}</td>
          <td>${formatNumber(player.barcelona.titles)}</td>
          <td>${formatNumber(player.career.goals)}</td>
        </tr>
      `
    )
    .join('');
}

function renderDashboard() {
  renderKpis();
  drawBarChart('barcaGoalsChart', players, (player) => player.barcelona.goals, { shortNames: true });
  drawBarChart('assistsChart', players, (player) => player.barcelona.assists, { shortNames: true });
  drawGroupedCareerChart();
  renderTable();
}

window.addEventListener('resize', () => {
  clearTimeout(window.__chartResize);
  window.__chartResize = setTimeout(renderDashboard, 150);
});

renderDashboard();
