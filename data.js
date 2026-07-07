// Base de dados do projeto.
// Para adicionar outro jogador, copie um objeto, altere os campos e salve.
// Os valores abaixo foram organizados para fins de portfólio/dashboard e devem ser revisados quando as estatísticas mudarem.

window.PLAYERS = [
  {
    id: 'neymar',
    name: 'Neymar Jr.',
    fullName: 'Neymar da Silva Santos Júnior',
    initials: 'NJ',
    country: 'Brasil',
    position: 'Meia-atacante / Atacante',
    currentClub: 'Santos',
    birth: '05/02/1992',
    active: true,
    accent: '#00e676',
    stats: {
      totalGoals: 457,
      clubGoals: 377,
      nationalGoals: 80,
      nationalCaps: 130,
      careerMatches: 764,
      ballonDor: 0,
      championsLeague: 1,
      worldCup: 0,
      continentalSelectionTitles: 1,
      seniorTeamTrophies: 31
    },
    clubs: [
      { name: 'Santos', period: '2009-2013 / 2025-', goals: 153 },
      { name: 'Barcelona', period: '2013-2017', goals: 105 },
      { name: 'Paris Saint-Germain', period: '2017-2023', goals: 118 },
      { name: 'Al-Hilal', period: '2023-2025', goals: 1 }
    ],
    summary: 'Um dos maiores talentos brasileiros da geração, conhecido por drible, criatividade, decisões em jogos grandes e liderança técnica na Seleção Brasileira.',
    milestones: [
      'Estreou profissionalmente pelo Santos em 2009.',
      'Foi protagonista do Santos campeão da Libertadores de 2011.',
      'Formou o trio MSN com Messi e Suárez no Barcelona.',
      'Ganhou a Champions League 2014/15 pelo Barcelona.',
      'Virou o maior artilheiro da história da Seleção Brasileira, com 80 gols.',
      'Conquistou o ouro olímpico com o Brasil em 2016.',
      'Chegou a 377 gols por clubes e 457 gols oficiais somando clubes e Seleção.'
    ],
    sources: [
      'Transfermarkt: perfil e jogos/gols pela Seleção',
      'Wikipedia: estatísticas por clube até 2026',
      'Reuters: dados recentes da Seleção Brasileira'
    ]
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    fullName: 'Lionel Andrés Messi',
    initials: 'LM',
    country: 'Argentina',
    position: 'Atacante / Ponta-direita',
    currentClub: 'Inter Miami',
    birth: '24/06/1987',
    active: true,
    accent: '#45b7ff',
    stats: {
      totalGoals: 917,
      clubGoals: 794,
      nationalGoals: 123,
      nationalCaps: 202,
      careerMatches: 1183,
      ballonDor: 8,
      championsLeague: 4,
      worldCup: 1,
      continentalSelectionTitles: 2,
      seniorTeamTrophies: 46
    },
    clubs: [
      { name: 'Barcelona', period: '2004-2021', goals: 672 },
      { name: 'Paris Saint-Germain', period: '2021-2023', goals: 32 },
      { name: 'Inter Miami', period: '2023-', goals: 90 }
    ],
    summary: 'Gênio argentino, recordista de Bolas de Ouro, campeão mundial em 2022 e referência máxima em gols, assistências, criação e regularidade.',
    milestones: [
      'Estreou pelo Barcelona em 2004, aos 17 anos.',
      'Marcou 672 gols oficiais pelo Barcelona.',
      'Ganhou quatro Champions League pelo Barcelona.',
      'Conquistou a Copa América de 2021 e 2024 com a Argentina.',
      'Foi campeão da Copa do Mundo de 2022.',
      'Venceu oito Bolas de Ouro.',
      'Ultrapassou 910 gols oficiais por clubes e Seleção.'
    ],
    sources: [
      'MessiXRonaldo: totais de gols por clube e Seleção',
      'Wikipedia: títulos, prêmios e recordes'
    ]
  },
  {
    id: 'cristiano',
    name: 'Cristiano Ronaldo',
    fullName: 'Cristiano Ronaldo dos Santos Aveiro',
    initials: 'CR',
    country: 'Portugal',
    position: 'Centroavante',
    currentClub: 'Al-Nassr',
    birth: '05/02/1985',
    active: true,
    accent: '#ffcf33',
    stats: {
      totalGoals: 976,
      clubGoals: 830,
      nationalGoals: 146,
      nationalCaps: 233,
      careerMatches: 1300,
      ballonDor: 5,
      championsLeague: 5,
      worldCup: 0,
      continentalSelectionTitles: 2,
      seniorTeamTrophies: 35
    },
    clubs: [
      { name: 'Sporting CP', period: '2002-2003', goals: 5 },
      { name: 'Manchester United', period: '2003-2009 / 2021-2022', goals: 145 },
      { name: 'Real Madrid', period: '2009-2018', goals: 450 },
      { name: 'Juventus', period: '2018-2021', goals: 101 },
      { name: 'Al-Nassr', period: '2023-', goals: 129 }
    ],
    summary: 'Um dos maiores artilheiros da história, símbolo de longevidade, potência física, mentalidade competitiva e decisões em Champions League.',
    milestones: [
      'Começou no Sporting CP e se destacou rapidamente no Manchester United.',
      'Ganhou cinco Champions League, sendo quatro pelo Real Madrid.',
      'É o maior artilheiro da história da Champions League, com 140 gols.',
      'Marcou 450 gols oficiais pelo Real Madrid.',
      'É o maior artilheiro de seleções masculinas, com 146 gols por Portugal.',
      'Conquistou a Euro 2016 e a Nations League por Portugal.',
      'Ultrapassou 970 gols oficiais por clubes e Seleção.'
    ],
    sources: [
      'Wikipedia: conquistas e totais recentes',
      'FOX Sports: gols por clube e Portugal',
      'Transfermarkt: jogos/gols por Portugal'
    ]
  }
];

window.DATA_INFO = {
  updatedAt: '07/07/2026',
  note: 'Dados iniciais para portfólio. Algumas bases podem divergir por critérios de contagem; revise o data.js para manter o projeto sempre atualizado.'
};
