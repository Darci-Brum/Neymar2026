const players = window.PLAYERS || [];
const dataInfo = window.DATA_INFO || {};

const formatter = new Intl.NumberFormat('pt-BR');
const grid = document.querySelector('#playersGrid');
const rankingList = document.querySelector('#rankingList');
const searchInput = document.querySelector('#searchInput');
const sortSelect = document.querySelector('#sortSelect');
const updatedAt = document.querySelector('#updatedAt');

if (updatedAt && dataInfo.updatedAt) {
  updatedAt.textContent = `Atualizado em ${dataInfo.updatedAt}`;
}

function bySort(option) {
  return (a, b) => {
    switch (option) {
      case 'goals-asc':
        return a.stats.totalGoals - b.stats.totalGoals;
      case 'ballon-desc':
        return b.stats.ballonDor - a.stats.ballonDor;
      case 'name-asc':
        return a.name.localeCompare(b.name, 'pt-BR');
      case 'goals-desc':
      default:
        return b.stats.totalGoals - a.stats.totalGoals;
    }
  };
}

function getFilteredPlayers() {
  const term = (searchInput?.value || '').trim().toLowerCase();
  const sort = sortSelect?.value || 'goals-desc';

  return players
    .filter((player) => {
      const clubs = player.clubs.map((club) => club.name).join(' ');
      const searchable = `${player.name} ${player.fullName} ${player.country} ${player.currentClub} ${clubs}`.toLowerCase();
      return searchable.includes(term);
    })
    .sort(bySort(sort));
}

function renderRanking() {
  if (!rankingList) return;

  rankingList.innerHTML = players
    .slice()
    .sort((a, b) => b.stats.totalGoals - a.stats.totalGoals)
    .map((player, index) => `
      <div class="rank-item">
        <div class="avatar" style="--avatar-color: ${player.accent}">${player.initials}</div>
        <div class="rank-info">
          <strong>${index + 1}. ${player.name}</strong>
          <span>${player.country} • ${player.currentClub}</span>
        </div>
        <div class="rank-goals">${formatter.format(player.stats.totalGoals)}</div>
      </div>
    `)
    .join('');
}

function renderPlayers() {
  if (!grid) return;
  const filteredPlayers = getFilteredPlayers();

  if (!filteredPlayers.length) {
    grid.innerHTML = '<div class="empty">Nenhum jogador encontrado com esse filtro.</div>';
    return;
  }

  grid.innerHTML = filteredPlayers
    .map((player) => `
      <article class="card" style="--player-color: ${player.accent}">
        <div class="card-header">
          <div class="avatar" style="--avatar-color: ${player.accent}">${player.initials}</div>
          <div>
            <strong>${player.fullName}</strong>
            <span>${player.country} • ${player.position}</span>
          </div>
        </div>

        <h3>${player.name}</h3>
        <p class="summary">${player.summary}</p>

        <div class="stat-strip">
          <div class="stat-pill">
            <strong>${formatter.format(player.stats.totalGoals)}</strong>
            <span>gols totais</span>
          </div>
          <div class="stat-pill">
            <strong>${formatter.format(player.stats.clubGoals)}</strong>
            <span>gols por clubes</span>
          </div>
          <div class="stat-pill">
            <strong>${formatter.format(player.stats.nationalGoals)}</strong>
            <span>gols pela seleção</span>
          </div>
        </div>

        <ul class="milestones">
          ${player.milestones.map((item) => `<li>${item}</li>`).join('')}
        </ul>

        <div class="club-list">
          ${player.clubs.map((club) => `
            <div class="club-row">
              <span><strong>${club.name}</strong> • ${club.period}</span>
              <span>${formatter.format(club.goals)} gols</span>
            </div>
          `).join('')}
        </div>

        <div class="sources">
          <strong>Fontes usadas:</strong> ${player.sources.join(' • ')}.
        </div>
      </article>
    `)
    .join('');
}

searchInput?.addEventListener('input', renderPlayers);
sortSelect?.addEventListener('change', renderPlayers);

renderRanking();
renderPlayers();
