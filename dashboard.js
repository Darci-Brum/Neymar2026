const players = window.PLAYERS || [];
const formatter = new Intl.NumberFormat('pt-BR');

const labels = players.map((player) => player.name);
const colors = players.map((player) => player.accent);

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const textColor = cssVar('--text') || '#f8fafc';
const mutedColor = cssVar('--muted') || '#aab4c8';
const borderColor = 'rgba(255,255,255,0.12)';

Chart.defaults.color = mutedColor;
Chart.defaults.font.family = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function baseOptions(extra = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          font: { weight: '700' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(7, 11, 24, 0.95)',
        borderColor,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label(context) {
            const label = context.dataset.label ? `${context.dataset.label}: ` : '';
            const value = typeof context.parsed.y === 'number' ? context.parsed.y : context.parsed;
            return `${label}${formatter.format(value)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: mutedColor, font: { weight: '700' } }
      },
      y: {
        beginAtZero: true,
        grid: { color: borderColor },
        ticks: { color: mutedColor }
      }
    },
    ...extra
  };
}

function renderRanking() {
  const element = document.querySelector('#dashboardRanking');
  if (!element) return;

  element.innerHTML = players
    .slice()
    .sort((a, b) => b.stats.totalGoals - a.stats.totalGoals)
    .map((player) => `
      <div class="rank-item">
        <div class="avatar" style="--avatar-color: ${player.accent}">${player.initials}</div>
        <div class="rank-info">
          <strong>${player.name}</strong>
          <span>${player.stats.ballonDor} Bola(s) de Ouro • ${player.stats.championsLeague} Champions</span>
        </div>
        <div class="rank-goals">${formatter.format(player.stats.totalGoals)}</div>
      </div>
    `)
    .join('');
}

function renderKpis() {
  const element = document.querySelector('#kpiGrid');
  if (!element) return;

  const totalGoals = players.reduce((sum, player) => sum + player.stats.totalGoals, 0);
  const topScorer = players.slice().sort((a, b) => b.stats.totalGoals - a.stats.totalGoals)[0];
  const mostBallons = players.slice().sort((a, b) => b.stats.ballonDor - a.stats.ballonDor)[0];
  const bestNationalRatio = players
    .map((player) => ({ ...player, ratio: player.stats.nationalGoals / player.stats.nationalCaps }))
    .sort((a, b) => b.ratio - a.ratio)[0];

  const kpis = [
    { label: 'Gols somados', value: formatter.format(totalGoals) },
    { label: 'Maior artilheiro', value: topScorer.name },
    { label: 'Mais Bolas de Ouro', value: mostBallons.name },
    { label: 'Melhor média na seleção', value: `${bestNationalRatio.name} (${bestNationalRatio.ratio.toFixed(2)})` }
  ];

  element.innerHTML = kpis
    .map((item) => `
      <div class="stat-card">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </div>
    `)
    .join('');
}

function renderTable() {
  const table = document.querySelector('#comparisonTable');
  if (!table) return;

  table.innerHTML = players
    .slice()
    .sort((a, b) => b.stats.totalGoals - a.stats.totalGoals)
    .map((player) => `
      <tr>
        <td><strong>${player.name}</strong></td>
        <td>${player.country}</td>
        <td><span class="badge">${player.currentClub}</span></td>
        <td>${formatter.format(player.stats.totalGoals)}</td>
        <td>${formatter.format(player.stats.clubGoals)}</td>
        <td>${formatter.format(player.stats.nationalGoals)}</td>
        <td>${formatter.format(player.stats.ballonDor)}</td>
        <td>${formatter.format(player.stats.championsLeague)}</td>
      </tr>
    `)
    .join('');
}

function createCharts() {
  const goalsCanvas = document.querySelector('#goalsChart');
  const clubNationalCanvas = document.querySelector('#clubNationalChart');
  const trophiesCanvas = document.querySelector('#trophiesChart');
  const ratioCanvas = document.querySelector('#ratioChart');

  if (goalsCanvas) {
    new Chart(goalsCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Gols totais',
          data: players.map((player) => player.stats.totalGoals),
          backgroundColor: colors,
          borderRadius: 14
        }]
      },
      options: baseOptions()
    });
  }

  if (clubNationalCanvas) {
    new Chart(clubNationalCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Clubes',
            data: players.map((player) => player.stats.clubGoals),
            backgroundColor: 'rgba(96, 165, 250, 0.78)',
            borderRadius: 14
          },
          {
            label: 'Seleção',
            data: players.map((player) => player.stats.nationalGoals),
            backgroundColor: 'rgba(110, 231, 183, 0.78)',
            borderRadius: 14
          }
        ]
      },
      options: baseOptions({ scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true, grid: { color: borderColor } } } })
    });
  }

  if (trophiesCanvas) {
    new Chart(trophiesCanvas, {
      type: 'radar',
      data: {
        labels: ['Bolas de Ouro', 'Champions', 'Copa do Mundo', 'Títulos seleção', 'Troféus senior'],
        datasets: players.map((player) => ({
          label: player.name,
          data: [
            player.stats.ballonDor,
            player.stats.championsLeague,
            player.stats.worldCup,
            player.stats.continentalSelectionTitles,
            player.stats.seniorTeamTrophies / 5
          ],
          borderColor: player.accent,
          backgroundColor: `${player.accent}33`,
          pointBackgroundColor: player.accent
        }))
      },
      options: baseOptions({
        scales: {
          r: {
            beginAtZero: true,
            grid: { color: borderColor },
            angleLines: { color: borderColor },
            pointLabels: { color: textColor, font: { weight: '700' } },
            ticks: { backdropColor: 'transparent', color: mutedColor }
          }
        }
      })
    });
  }

  if (ratioCanvas) {
    new Chart(ratioCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Gols por jogo na seleção',
          data: players.map((player) => Number((player.stats.nationalGoals / player.stats.nationalCaps).toFixed(2))),
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255,255,255,0.16)',
          pointBackgroundColor: colors,
          pointBorderColor: colors,
          pointRadius: 7,
          pointHoverRadius: 9,
          tension: 0.35,
          fill: true
        }]
      },
      options: baseOptions({
        scales: {
          x: { grid: { display: false }, ticks: { color: mutedColor, font: { weight: '700' } } },
          y: { beginAtZero: true, max: 1, grid: { color: borderColor }, ticks: { color: mutedColor } }
        }
      })
    });
  }
}

renderRanking();
renderKpis();
renderTable();
createCharts();
