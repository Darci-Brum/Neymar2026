/*
  Banco de dados simples do site.
  Para adicionar novos jogadores, copie um bloco abaixo, altere os dados e salve.
  O site atualiza a página de dados e o dashboard automaticamente.
*/

const players = [
  {
    id: 'neymar',
    name: 'Neymar Jr',
    nickname: 'Ousadia e Alegria',
    country: 'Brasil',
    number: 11,
    era: 'Barcelona: 2013–2017',
    accent: '#e31b3f',
    secondary: '#f4c430',
    shortBio:
      'Chegou ao Barcelona em 2013 e formou, ao lado de Messi e Suárez, o histórico trio MSN. Foi peça-chave na Champions League 2014/15 e marcou em momentos decisivos.',
    barcelona: {
      seasons: '2013–2017',
      matches: 186,
      goals: 105,
      assists: 76,
      titles: 8,
      ucl: 1,
      shirt: 11,
      highlight: 'Gol na final da Champions League 2014/15 contra a Juventus.'
    },
    career: {
      goals: 439,
      nationalGoals: 79,
      clubs: ['Santos', 'Barcelona', 'PSG', 'Al-Hilal', 'Santos']
    },
    milestones: [
      { year: '2013', text: 'Transferência do Santos para o Barcelona.' },
      { year: '2014/15', text: 'Triplete com La Liga, Copa do Rei e Champions League.' },
      { year: '2015', text: 'Finalista da Bola de Ouro ao lado de Messi e Cristiano Ronaldo.' },
      { year: '2016/17', text: 'Atuação histórica na remontada contra o PSG.' }
    ]
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    nickname: 'La Pulga',
    country: 'Argentina',
    number: 10,
    era: 'Barcelona: 2004–2021',
    accent: '#244bd6',
    secondary: '#f4c430',
    shortBio:
      'Maior artilheiro da história do Barcelona e símbolo de uma era. Liderou o clube em títulos, gols, assistências e noites inesquecíveis no Camp Nou.',
    barcelona: {
      seasons: '2004–2021',
      matches: 778,
      goals: 672,
      assists: 303,
      titles: 35,
      ucl: 4,
      shirt: 10,
      highlight: 'Recordista de gols, jogos e títulos pelo Barcelona.'
    },
    career: {
      goals: 880,
      nationalGoals: 112,
      clubs: ['Barcelona', 'PSG', 'Inter Miami']
    },
    milestones: [
      { year: '2004', text: 'Estreia profissional pelo Barcelona.' },
      { year: '2009', text: 'Primeira Bola de Ouro e primeiro triplete com o clube.' },
      { year: '2011', text: 'Show na Champions League e título contra o Manchester United.' },
      { year: '2012', text: 'Ano de 91 gols, uma das marcas individuais mais famosas do futebol.' },
      { year: '2021', text: 'Saiu do Barcelona como maior ídolo e recordista histórico do clube.' }
    ]
  },
  {
    id: 'cristiano',
    name: 'Cristiano Ronaldo',
    nickname: 'CR7',
    country: 'Portugal',
    number: 7,
    era: 'Rival histórico da era Barça',
    accent: '#ffffff',
    secondary: '#e31b3f',
    shortBio:
      'Maior rival individual de Messi na era moderna. Mesmo sem passagem pelo Barcelona, entra no dashboard para comparação histórica com Neymar e Messi.',
    barcelona: {
      seasons: 'Sem passagem',
      matches: 0,
      goals: 0,
      assists: 0,
      titles: 0,
      ucl: 0,
      shirt: 7,
      highlight: 'Rivalidade Messi x Cristiano marcou El Clásicos e a Champions League.'
    },
    career: {
      goals: 910,
      nationalGoals: 130,
      clubs: ['Sporting', 'Manchester United', 'Real Madrid', 'Juventus', 'Al-Nassr']
    },
    milestones: [
      { year: '2008', text: 'Primeira Bola de Ouro pelo Manchester United.' },
      { year: '2009–2018', text: 'Período histórico no Real Madrid, rivalizando com o Barcelona.' },
      { year: '2016', text: 'Campeão da Euro por Portugal.' },
      { year: '2018', text: 'Quinta Champions League da carreira.' }
    ]
  }
];

const barcaEra = {
  title: 'Era Barcelona: Neymar & Messi',
  subtitle: 'Um site com visual inspirado em aplicativo esportivo, usando azul-grená, cards arredondados, dashboard e comparação de dados.',
  msn: {
    seasons: '2014–2017',
    trio: 'Messi • Suárez • Neymar',
    goalsTogether: 364,
    note: 'O trio MSN ficou marcado por intensidade, criatividade e muitos gols em jogos decisivos.'
  }
};
