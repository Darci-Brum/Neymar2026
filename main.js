const playersGrid = document.querySelector('#players-data');
const timelineList = document.querySelector('#timeline-list');

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

function createPlayerCard(player) {
  const clubs = player.career.clubs.map((club) => `<span>${club}</span>`).join('');
  const milestones = player.milestones
    .map((item) => `<li><b>${item.year}</b><span>${item.text}</span></li>`)
    .join('');

  return `
    <article class="player-card" style="--accent:${player.accent}; --secondary:${player.secondary}">
      <div class="player-card-head">
        <span class="shirt-number">${player.number}</span>
        <div>
          <p class="eyebrow">${player.country}</p>
          <h3>${player.name}</h3>
          <small>${player.nickname}</small>
        </div>
      </div>

      <p class="player-bio">${player.shortBio}</p>

      <div class="mini-stats">
        <span><b>${formatNumber(player.barcelona.matches)}</b><small>Jogos Barça</small></span>
        <span><b>${formatNumber(player.barcelona.goals)}</b><small>Gols Barça</small></span>
        <span><b>${formatNumber(player.barcelona.assists)}</b><small>Assistências</small></span>
        <span><b>${formatNumber(player.barcelona.titles)}</b><small>Títulos</small></span>
      </div>

      <div class="highlight-box">
        <b>${player.barcelona.seasons}</b>
        <span>${player.barcelona.highlight}</span>
      </div>

      <div class="club-tags">${clubs}</div>

      <details>
        <summary>Ver principais marcos</summary>
        <ul class="milestone-list">${milestones}</ul>
      </details>
    </article>
  `;
}

function renderPlayers() {
  playersGrid.innerHTML = players.map(createPlayerCard).join('');
}

function renderTimeline() {
  const selected = players
    .filter((player) => ['neymar', 'messi'].includes(player.id))
    .flatMap((player) =>
      player.milestones.map((milestone) => ({
        ...milestone,
        player: player.name,
        accent: player.accent
      }))
    );

  timelineList.innerHTML = selected
    .map(
      (item) => `
        <article class="timeline-item" style="--accent:${item.accent}">
          <span>${item.year}</span>
          <div>
            <b>${item.player}</b>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join('');
}

renderPlayers();
renderTimeline();
