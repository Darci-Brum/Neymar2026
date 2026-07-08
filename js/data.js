// =============================================================
// DADOS DO SITE NEYMAR JR.
// Para atualizar o site, edite os arrays abaixo.
// Observação: números de carreira podem variar por fonte, critério
// de jogo oficial, amistoso, categoria de base e assistência.
// =============================================================

const NEYMAR_DATA = {
  updatedAt: 'Julho de 2026',
  heroStats: [
    { label: 'Seleção', value: '80 gols' },
    { label: 'Pênaltis', value: '94' },
    { label: 'Faltas', value: '24' }
  ],
  topNumbers: [
    { label: 'Jogos pela Seleção Brasileira', value: '130' },
    { label: 'Gols pela Seleção Brasileira', value: '80' },
    { label: 'Títulos oficiais citados', value: '30' },
    { label: 'Prêmios individuais citados', value: '66' }
  ],
  passages: [
    {
      id: 'santos',
      club: 'Santos FC',
      period: '2009–2013 • 2025–2026',
      role: 'Ponta esquerda / atacante / meia ofensivo',
      apps: 256,
      goals: 149,
      assists: 67,
      shirt: '10/11',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_Santos_2011.jpg',
      summary: 'Clube formador, explosão no futebol brasileiro, Libertadores de 2011 e retorno emocional à Vila Belmiro em 2025.',
      highlights: ['Libertadores 2011', 'Copa do Brasil 2010', '3x Paulista', 'Retorno em 2025'],
      importantMatches: [
        'Estreia profissional contra o Oeste, em março de 2009.',
        'Gol na final da Copa do Brasil 2010 contra o Vitória.',
        'Gol na final da Libertadores 2011 contra o Peñarol.',
        'Gol antológico contra o Flamengo que rendeu o Prêmio Puskás.'
      ]
    },
    {
      id: 'barcelona',
      club: 'FC Barcelona',
      period: '2013–2017',
      role: 'Ponta esquerda no trio MSN',
      apps: 186,
      goals: 105,
      assists: 76,
      shirt: '11',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_-_FC_Barcelona_-_2015.jpg',
      summary: 'Fase de auge europeu com Messi e Suárez. Foi decisivo no triplete de 2014/15 e marcou na final da Champions League.',
      highlights: ['Champions 2014/15', 'Mundial 2015', '2x LaLiga', '3x Copa do Rei'],
      importantMatches: [
        'Gol na final da Champions League 2015 contra a Juventus.',
        'Atuação histórica na remontada do Barcelona contra o PSG em 2017.',
        'Artilheiro da Champions League 2014/15 empatado com Messi e Cristiano Ronaldo.',
        'Parte do trio MSN, um dos ataques mais fortes do futebol moderno.'
      ]
    },
    {
      id: 'psg',
      club: 'Paris Saint-Germain',
      period: '2017–2023',
      role: 'Camisa 10, ponta e meia criativo',
      apps: 173,
      goals: 118,
      assists: 77,
      shirt: '10',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_PSG.jpg',
      summary: 'Contratação recorde mundial, domínio nacional na França e campanha até a final da Champions League 2019/20.',
      highlights: ['5x Ligue 1', 'Final da Champions 2020', '3x Copa da França', '2x Copa da Liga'],
      importantMatches: [
        'Estreia com gol e assistência contra o Guingamp em 2017.',
        'Protagonismo na campanha do PSG até a final da Champions 2019/20.',
        'Grandes atuações contra Bayern, Atalanta, Manchester United e RB Leipzig.',
        'Período de muitos títulos nacionais, mas também de lesões importantes.'
      ]
    },
    {
      id: 'alhilal',
      club: 'Al-Hilal',
      period: '2023–2025',
      role: 'Meia-atacante / camisa 10',
      apps: 7,
      goals: 1,
      assists: 3,
      shirt: '10',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_2018.jpg',
      summary: 'Passagem curta na Arábia Saudita, limitada por grave lesão no joelho e poucos jogos oficiais.',
      highlights: ['Transferência histórica', 'Camisa 10', 'Lesão no joelho', 'Retorno ao Brasil'],
      importantMatches: [
        'Estreia na Saudi Pro League em 2023.',
        'Primeiro gol pelo clube na Liga dos Campeões da Ásia.',
        'Lesão pelo Brasil em 2023 interrompeu a sequência no clube.',
        'Rescisão e retorno ao Santos em 2025.'
      ]
    },
    {
      id: 'brasil',
      club: 'Seleção Brasileira',
      period: '2010–2026',
      role: 'Camisa 10, atacante e líder técnico',
      apps: 130,
      goals: 80,
      assists: 58,
      shirt: '10',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_Rio_2016.jpg',
      summary: 'Maior artilheiro histórico da Seleção Brasileira, ouro olímpico em 2016 e campeão da Copa das Confederações 2013.',
      highlights: ['80 gols pelo Brasil', 'Ouro Olímpico 2016', 'Confederações 2013', '4 Copas do Mundo'],
      importantMatches: [
        'Gol na estreia pela Seleção contra os Estados Unidos em 2010.',
        'Gol na final da Copa das Confederações 2013 contra a Espanha.',
        'Gol de falta e pênalti decisivo na final olímpica contra a Alemanha em 2016.',
        'Ultrapassou Pelé como maior artilheiro da Seleção em 2023.'
      ]
    }
  ],
  timeline: [
    { year: '2009', title: 'Estreia profissional no Santos', text: 'Neymar sobe ao profissional com 17 anos, ganha espaço rapidamente e começa a construir a imagem de fenômeno técnico no Brasil.' },
    { year: '2010', title: 'Copa do Brasil e primeira grande temporada', text: 'Vira protagonista no Santos, soma gols em mata-mata e conquista a Copa do Brasil.' },
    { year: '2011', title: 'Libertadores e Prêmio Puskás', text: 'Marca na final da Libertadores contra o Peñarol e ganha o Puskás pelo gol contra o Flamengo.' },
    { year: '2013', title: 'Copa das Confederações e Barcelona', text: 'Brilha com a Seleção, marca na final contra a Espanha e se transfere para o Barcelona.' },
    { year: '2015', title: 'Triplete com o Barcelona', text: 'Ao lado de Messi e Suárez, conquista Champions, LaLiga e Copa do Rei, marcando na decisão europeia.' },
    { year: '2016', title: 'Ouro olímpico no Maracanã', text: 'Faz gol de falta e converte o pênalti decisivo contra a Alemanha, dando ao Brasil o primeiro ouro olímpico no futebol masculino.' },
    { year: '2017', title: 'Transferência recorde para o PSG', text: 'Vai para Paris em uma negociação histórica e assume papel de camisa 10 do projeto francês.' },
    { year: '2020', title: 'Final de Champions pelo PSG', text: 'Conduz o clube à sua primeira final de Champions League, contra o Bayern de Munique.' },
    { year: '2023', title: 'Recorde pela Seleção Brasileira', text: 'Chega ao topo da artilharia histórica da Seleção Brasileira ao ultrapassar a marca de Pelé.' },
    { year: '2025', title: 'Volta ao Santos', text: 'Após passagem curta pelo Al-Hilal e recuperação física, retorna ao clube onde começou.' },
    { year: '2026', title: 'Fechamento de ciclo com a Seleção', text: 'Encerramento simbólico de ciclo internacional após 130 jogos e 80 gols pelo Brasil, segundo bases consultadas.' }
  ],
  titleGroups: {
    coletivos: [
      { meta: 'Santos', title: 'Campeonato Paulista', text: '2010, 2011 e 2012.' },
      { meta: 'Santos', title: 'Copa do Brasil', text: '2010, com participação decisiva no ataque santista.' },
      { meta: 'Santos', title: 'Copa Libertadores', text: '2011, título mais importante da primeira passagem pelo clube.' },
      { meta: 'Santos', title: 'Recopa Sul-Americana', text: '2012, consolidando o ciclo continental.' },
      { meta: 'Barcelona', title: 'UEFA Champions League', text: '2014/15, com gol de Neymar na final contra a Juventus.' },
      { meta: 'Barcelona', title: 'LaLiga', text: '2014/15 e 2015/16.' },
      { meta: 'Barcelona', title: 'Copa do Rei', text: '2014/15, 2015/16 e 2016/17.' },
      { meta: 'Barcelona', title: 'Mundial de Clubes da FIFA', text: '2015, no ciclo do Barcelona campeão europeu.' },
      { meta: 'PSG', title: 'Ligue 1', text: 'Cinco conquistas nacionais no futebol francês.' },
      { meta: 'PSG', title: 'Copas nacionais francesas', text: 'Copa da França, Copa da Liga e Supercopa da França em diferentes temporadas.' },
      { meta: 'Brasil', title: 'Copa das Confederações', text: '2013, com Neymar eleito destaque do torneio.' },
      { meta: 'Brasil Olímpico', title: 'Ouro Olímpico', text: 'Rio 2016, primeiro ouro do Brasil no futebol masculino.' }
    ],
    individuais: [
      { meta: 'FIFA', title: 'Prêmio Puskás', text: '2011, pelo gol contra o Flamengo no Brasileirão.' },
      { meta: 'América do Sul', title: 'Melhor jogador sul-americano', text: 'Reconhecido durante o auge no Santos.' },
      { meta: 'FIFA Confederações', title: 'Bola de Ouro do torneio', text: '2013, eleito melhor jogador da Copa das Confederações.' },
      { meta: 'UEFA', title: 'Artilheiro da Champions', text: '2014/15, terminou no topo da artilharia junto de Messi e Cristiano Ronaldo.' },
      { meta: 'França', title: 'Melhor jogador da Ligue 1', text: '2017/18, destaque individual logo na primeira temporada pelo PSG.' },
      { meta: 'Seleção Brasileira', title: 'Maior artilheiro histórico', text: '80 gols em 130 jogos pela Seleção Brasileira, conforme bases consultadas.' },
      { meta: 'Carreira', title: '21 hat-tricks citados', text: 'Marca registrada de jogos com múltiplos gols e protagonismo ofensivo.' },
      { meta: 'Carreira', title: '66 prêmios individuais citados', text: 'Número consolidado em listas públicas de títulos e prêmios.' }
    ],
    jogos: [
      { meta: 'Santos 5 x 4 Flamengo', title: 'Gol do Puskás', text: 'Jogo de 2011 com arrancada, dribles e finalização que virou prêmio mundial.' },
      { meta: 'Santos 2 x 1 Peñarol', title: 'Final da Libertadores 2011', text: 'Neymar marca na decisão e recoloca o Santos no topo da América.' },
      { meta: 'Brasil 3 x 0 Espanha', title: 'Final da Copa das Confederações 2013', text: 'Gol em final no Maracanã e consagração com a camisa 10 da Seleção.' },
      { meta: 'Barcelona 3 x 1 Juventus', title: 'Final da Champions 2015', text: 'Gol nos acréscimos para fechar o título europeu do Barcelona.' },
      { meta: 'Barcelona 6 x 1 PSG', title: 'Remontada de 2017', text: 'Atuação decisiva com gols e assistência no Camp Nou.' },
      { meta: 'Brasil 1 x 1 Alemanha', title: 'Final Olímpica 2016', text: 'Gol de falta no tempo normal e pênalti decisivo na disputa.' },
      { meta: 'Brasil 5 x 1 Bolívia', title: 'Recorde histórico', text: 'Gols que consolidaram Neymar acima de Pelé na artilharia da Seleção.' },
      { meta: 'PSG na Champions 2020', title: 'Final inédita', text: 'Protagonismo técnico na campanha mais longa do PSG na competição.' }
    ]
  },
  goalTypes: [
    { icon: '🎯', label: 'Pênaltis convertidos', value: '94', text: 'Transfermarkt lista 94 pênaltis marcados na carreira.' },
    { icon: '🧤', label: 'Pênaltis perdidos', value: '22', text: 'Transfermarkt também registra 22 pênaltis desperdiçados.' },
    { icon: '⚡', label: 'Gols de falta', value: '24', text: 'Número citado em listas de títulos e prêmios recebidos por Neymar.' },
    { icon: '🔥', label: 'Hat-tricks', value: '21', text: 'Marca citada em estatísticas consolidadas de carreira.' },
    { icon: '🇧🇷', label: 'Gols em Copas', value: '9', text: '4 em 2014, 2 em 2018, 2 em 2022 e 1 em 2026.' },
    { icon: '🏆', label: 'Gols em competições FIFA', value: '29', text: 'Inclui Copa do Mundo, Eliminatórias e Copa das Confederações.' },
    { icon: '🤝', label: 'Gols em amistosos', value: '46', text: 'Maior parte dos gols pela Seleção veio em amistosos internacionais.' },
    { icon: '🥇', label: 'Gol olímpico decisivo', value: '2016', text: 'Falta no tempo normal e pênalti final contra a Alemanha.' }
  ],
  brazilGoalsByCompetition: [
    { label: 'Amistosos', goals: 46 },
    { label: 'Eliminatórias', goals: 16 },
    { label: 'Copa do Mundo', goals: 9 },
    { label: 'Copa América', goals: 5 },
    { label: 'Confederações', goals: 4 }
  ],
  opponents: [
    // Seleções com contagem de gols, base List of international goals scored by Neymar.
    { name: 'Japão', type: 'Seleção', goals: 9, context: 'Brasil', note: 'Adversário contra quem mais marcou pela Seleção.' },
    { name: 'Peru', type: 'Seleção', goals: 6, context: 'Brasil', note: 'Inclui hat-trick nas Eliminatórias de 2020.' },
    { name: 'Bolívia', type: 'Seleção', goals: 5, context: 'Brasil', note: 'Inclui gols do recorde histórico em 2023.' },
    { name: 'Estados Unidos', type: 'Seleção', goals: 5, context: 'Brasil', note: 'Primeiro gol pela Seleção foi contra os EUA.' },
    { name: 'Colômbia', type: 'Seleção', goals: 4, context: 'Brasil', note: 'Gols em amistosos e Eliminatórias.' },
    { name: 'Croácia', type: 'Seleção', goals: 4, context: 'Brasil', note: 'Marcou em Copas de 2014, 2018 e 2022.' },
    { name: 'Equador', type: 'Seleção', goals: 4, context: 'Brasil', note: 'Gols em Copa América e Eliminatórias.' },
    { name: 'Coreia do Sul', type: 'Seleção', goals: 4, context: 'Brasil', note: 'Inclui gol nas oitavas da Copa de 2022.' },
    { name: 'Argentina', type: 'Seleção', goals: 3, context: 'Brasil', note: 'Gols em Superclássico e Eliminatórias.' },
    { name: 'China', type: 'Seleção', goals: 3, context: 'Brasil', note: 'Hat-trick em amistoso de 2012.' },
    { name: 'África do Sul', type: 'Seleção', goals: 3, context: 'Brasil', note: 'Hat-trick em 2014.' },
    { name: 'Uruguai', type: 'Seleção', goals: 3, context: 'Brasil', note: 'Gols em Eliminatórias e amistosos.' },
    { name: 'Camarões', type: 'Seleção', goals: 2, context: 'Brasil', note: 'Dois gols na Copa de 2014.' },
    { name: 'Chile', type: 'Seleção', goals: 2, context: 'Brasil', note: 'Inclui gol de pênalti nas Eliminatórias.' },
    { name: 'Costa Rica', type: 'Seleção', goals: 2, context: 'Brasil', note: 'Marcou em amistoso e Copa de 2018.' },
    { name: 'México', type: 'Seleção', goals: 2, context: 'Brasil', note: 'Gol na Confederações e na Copa de 2018.' },
    { name: 'Paraguai', type: 'Seleção', goals: 2, context: 'Brasil', note: 'Gols em Eliminatórias.' },
    { name: 'Escócia', type: 'Seleção', goals: 2, context: 'Brasil', note: 'Dois gols em amistoso de 2011.' },
    { name: 'Turquia', type: 'Seleção', goals: 2, context: 'Brasil', note: 'Dois gols em amistoso de 2014.' },
    { name: 'Austrália', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso internacional.' },
    { name: 'Áustria', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso pré-Copa de 2018.' },
    { name: 'El Salvador', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Gol de pênalti em amistoso.' },
    { name: 'França', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso no Stade de France.' },
    { name: 'Alemanha', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso internacional.' },
    { name: 'Iraque', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso de 2012.' },
    { name: 'Itália', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Copa das Confederações 2013.' },
    { name: 'Noruega', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Gol de pênalti na Copa de 2026.' },
    { name: 'Panamá', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso de preparação.' },
    { name: 'Portugal', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso internacional.' },
    { name: 'Espanha', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Final da Copa das Confederações 2013.' },
    { name: 'Tunísia', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Amistoso de 2022.' },
    { name: 'Venezuela', type: 'Seleção', goals: 1, context: 'Brasil', note: 'Copa América 2021.' },

    // Clubes contra quem marcou em bases públicas de gols por partida.
    { name: 'Mogi Mirim', type: 'Clube', goals: null, context: 'Santos', note: 'Primeiros gols no profissional.' },
    { name: 'Rio Branco-AC', type: 'Clube', goals: null, context: 'Santos', note: 'Copa do Brasil.' },
    { name: 'Santo André', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista e mata-mata.' },
    { name: 'Palmeiras', type: 'Clube', goals: null, context: 'Santos', note: 'Clássicos e Brasileirão.' },
    { name: 'Atlético-MG', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão e Copa do Brasil.' },
    { name: 'Barueri', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista e Brasileirão.' },
    { name: 'Athletico-PR', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Náutico', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Internacional', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão e Libertadores.' },
    { name: 'Coritiba', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Cruzeiro', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Oeste', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'São Paulo', type: 'Clube', goals: null, context: 'Santos', note: 'Clássicos paulistas.' },
    { name: 'Corinthians', type: 'Clube', goals: null, context: 'Santos', note: 'Clássicos e finais estaduais.' },
    { name: 'Naviraiense-MS', type: 'Clube', goals: null, context: 'Santos', note: 'Copa do Brasil.' },
    { name: 'Remo', type: 'Clube', goals: null, context: 'Santos', note: 'Copa do Brasil.' },
    { name: 'São Caetano', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'Guarani', type: 'Clube', goals: null, context: 'Santos', note: 'Copa do Brasil e Paulista.' },
    { name: 'Botafogo', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Ceará', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Vitória', type: 'Clube', goals: null, context: 'Santos', note: 'Final da Copa do Brasil 2010.' },
    { name: 'Grêmio', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Avaí', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Goiás', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Portuguesa', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'Colo-Colo', type: 'Clube', goals: null, context: 'Santos', note: 'Libertadores.' },
    { name: 'Deportivo Táchira', type: 'Clube', goals: null, context: 'Santos', note: 'Libertadores.' },
    { name: 'Ponte Preta', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'Once Caldas', type: 'Clube', goals: null, context: 'Santos', note: 'Libertadores.' },
    { name: 'Cerro Porteño', type: 'Clube', goals: null, context: 'Santos', note: 'Libertadores.' },
    { name: 'Peñarol', type: 'Clube', goals: null, context: 'Santos', note: 'Final da Libertadores 2011.' },
    { name: 'Flamengo', type: 'Clube', goals: null, context: 'Santos', note: 'Inclui gol vencedor do Puskás.' },
    { name: 'Bahia', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Fluminense', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Vasco da Gama', type: 'Clube', goals: null, context: 'Santos', note: 'Gol de falta direta em 2011.' },
    { name: 'Kashiwa Reysol', type: 'Clube', goals: null, context: 'Santos', note: 'Mundial de Clubes.' },
    { name: 'Botafogo-SP', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'Juan Aurich', type: 'Clube', goals: null, context: 'Santos', note: 'Libertadores.' },
    { name: 'Guaratinguetá', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'Catanduvense', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'The Strongest', type: 'Clube', goals: null, context: 'Santos', note: 'Libertadores.' },
    { name: 'Universidad de Chile', type: 'Clube', goals: null, context: 'Santos', note: 'Recopa Sul-Americana.' },
    { name: 'Bolívar', type: 'Clube', goals: null, context: 'Santos', note: 'Libertadores.' },
    { name: 'Figueirense', type: 'Clube', goals: null, context: 'Santos', note: 'Brasileirão.' },
    { name: 'Bragantino', type: 'Clube', goals: null, context: 'Santos', note: 'Paulista.' },
    { name: 'Internacional de Limeira', type: 'Clube', goals: null, context: 'Santos', note: 'Retorno ao Santos em 2025.' },

    { name: 'Atlético de Madrid', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga, Copa e Supercopa.' },
    { name: 'Real Madrid', type: 'Clube', goals: null, context: 'Barcelona', note: 'Clássico espanhol.' },
    { name: 'Valencia', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga e Copa do Rei.' },
    { name: 'Sevilla', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga e finais nacionais.' },
    { name: 'Athletic Club', type: 'Clube', goals: null, context: 'Barcelona', note: 'Copa do Rei e LaLiga.' },
    { name: 'Villarreal', type: 'Clube', goals: null, context: 'Barcelona', note: 'Gol e grandes atuações em LaLiga.' },
    { name: 'Real Sociedad', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Granada', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Getafe', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Rayo Vallecano', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Levante', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Celta de Vigo', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Deportivo La Coruña', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Sporting Gijón', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Málaga', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Eibar', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Espanyol', type: 'Clube', goals: null, context: 'Barcelona', note: 'Derby catalão.' },
    { name: 'Las Palmas', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Osasuna', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Real Betis', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Almería', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Elche', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'Córdoba', type: 'Clube', goals: null, context: 'Barcelona', note: 'LaLiga.' },
    { name: 'APOEL', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },
    { name: 'Paris Saint-Germain', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League e remontada.' },
    { name: 'Bayern de Munique', type: 'Clube', goals: null, context: 'Barcelona / PSG', note: 'Champions League.' },
    { name: 'Manchester City', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },
    { name: 'Juventus', type: 'Clube', goals: null, context: 'Barcelona', note: 'Gol na final da Champions 2015.' },
    { name: 'Ajax', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },
    { name: 'Celtic', type: 'Clube', goals: null, context: 'Barcelona / PSG', note: 'Champions League.' },
    { name: 'Roma', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },
    { name: 'BATE Borisov', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },
    { name: 'Bayer Leverkusen', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },
    { name: 'Arsenal', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },
    { name: 'Borussia Mönchengladbach', type: 'Clube', goals: null, context: 'Barcelona', note: 'Champions League.' },

    { name: 'Guingamp', type: 'Clube', goals: null, context: 'PSG', note: 'Estreia com gol e assistência.' },
    { name: 'Toulouse', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Metz', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Dijon', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Bordeaux', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Monaco', type: 'Clube', goals: null, context: 'PSG', note: 'Clássico nacional francês.' },
    { name: 'Marseille', type: 'Clube', goals: null, context: 'PSG', note: 'Le Classique.' },
    { name: 'Lyon', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Lille', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Nantes', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Montpellier', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Angers', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Strasbourg', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Amiens', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Rennes', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1 e copas nacionais.' },
    { name: 'Nice', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Saint-Étienne', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Caen', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Troyes', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Reims', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Nîmes', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Lens', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Lorient', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Brest', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Auxerre', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Clermont', type: 'Clube', goals: null, context: 'PSG', note: 'Ligue 1.' },
    { name: 'Maccabi Haifa', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League.' },
    { name: 'RB Leipzig', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League.' },
    { name: 'Atalanta', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League 2019/20.' },
    { name: 'Manchester United', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League.' },
    { name: 'Liverpool', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League.' },
    { name: 'Estrela Vermelha', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League.' },
    { name: 'Istanbul Basaksehir', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League.' },
    { name: 'Borussia Dortmund', type: 'Clube', goals: null, context: 'PSG', note: 'Champions League.' },
    { name: 'Nassaji Mazandaran', type: 'Clube', goals: null, context: 'Al-Hilal', note: 'Primeiro gol pelo Al-Hilal na AFC Champions League.' }
  ],
  gallery: [
    {
      title: 'Barcelona 2015',
      tag: 'Auge europeu',
      text: 'Neymar no período do trio MSN e da Champions League 2014/15.',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_-_FC_Barcelona_-_2015.jpg'
    },
    {
      title: 'Libertadores com o Santos',
      tag: 'Origem',
      text: 'Final continental de 2011, símbolo da primeira fase no Santos.',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_Santos_2011.jpg'
    },
    {
      title: 'Ouro olímpico 2016',
      tag: 'Brasil',
      text: 'O momento que deu ao Brasil o primeiro ouro olímpico no futebol masculino.',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_Rio_2016.jpg'
    },
    {
      title: 'PSG 2017',
      tag: 'Recorde mundial',
      text: 'Apresentação em Paris após transferência histórica.',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_PSG.jpg'
    },
    {
      title: 'Brasil 2018',
      tag: 'Seleção',
      text: 'Ciclo de Copa do Mundo com protagonismo técnico.',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_2018.jpg'
    }
  ],
  sources: [
    {
      name: 'Transfermarkt — Perfil e estatísticas',
      text: 'Base para clube atual, dados de Seleção, lista de gols por partida e filtros por tipo de gol.',
      url: 'https://www.transfermarkt.com/neymar/profil/spieler/68290'
    },
    {
      name: 'Transfermarkt — Pênaltis',
      text: 'Base usada para pênaltis convertidos e perdidos na carreira.',
      url: 'https://www.transfermarkt.com/neymar/elfmetertore/spieler/68290'
    },
    {
      name: 'Lista de gols pela Seleção',
      text: 'Base para 80 gols, 130 jogos, adversários e distribuição por competição pela Seleção Brasileira.',
      url: 'https://en.wikipedia.org/wiki/List_of_international_goals_scored_by_Neymar'
    },
    {
      name: 'Títulos e prêmios recebidos por Neymar',
      text: 'Base complementar para títulos, prêmios individuais, faltas e hat-tricks citados.',
      url: 'https://pt.wikipedia.org/wiki/Lista_de_t%C3%ADtulos_e_pr%C3%AAmios_recebidos_por_Neymar'
    },
    {
      name: 'Olympics.com — carreira em números',
      text: 'Fonte complementar sobre conquistas olímpicas e carreira internacional.',
      url: 'https://www.olympics.com/en/news/neymar-career-in-numbers-trophies-records-medals-awards'
    },
    {
      name: 'Wikimedia Commons — imagens',
      text: 'Imagens de uso livre/referencial com créditos indicados no README.',
      url: 'https://commons.wikimedia.org/wiki/Neymar'
    }
  ]
};
