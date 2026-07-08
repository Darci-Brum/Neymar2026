// Base de dados editável do site Neymar Jr Archive
// Observação: números de gols/jogos podem variar por critério de fonte.
// Esta base foi organizada para apresentação em site e pode ser atualizada no próprio arquivo.

const NJR_DATA = {
  updatedAt: "08/07/2026",
  player: {
    name: "Neymar da Silva Santos Júnior",
    shortName: "Neymar Jr.",
    birth: "05/02/1992",
    birthplace: "Mogi das Cruzes, Brasil",
    position: "Atacante / Meia-atacante",
    height: "1,75 m",
    dominantFoot: "Destro",
    heroImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg",
    subtitle: "Arquivo premium da carreira: clubes, Seleção, gols, títulos, medalhas e prêmios."
  },
  totals: [
    { label: "Gols pela Seleção", value: 80, suffix: "+", note: "Base Transfermarkt, caps/gols da página de conquistas" },
    { label: "Pênaltis convertidos", value: 94, suffix: "", note: "Transfermarkt: total de pênaltis marcados" },
    { label: "Faltas diretas", value: 14, suffix: "", note: "StatBunker: direct free kick em competições cobertas" },
    { label: "Títulos coletivos listados", value: 28, suffix: "+", note: "Clubes + Seleção, variando por critério" }
  ],
  goalTypes: [
    { type: "Pênalti", value: 94, source: "Transfermarkt", description: "Pênaltis convertidos na carreira profissional, incluindo clubes e Seleção." },
    { type: "Pênaltis perdidos", value: 22, source: "Transfermarkt", description: "Cobranças não convertidas, conforme registro público por jogo." },
    { type: "Falta direta", value: 14, source: "StatBunker", description: "Gols de falta direta em competições cobertas pelo StatBunker." },
    { type: "Pé direito", value: 160, source: "StatBunker", description: "Gols com o pé direito em competições cobertas." },
    { type: "Pé esquerdo", value: 61, source: "StatBunker", description: "Gols com o pé esquerdo em competições cobertas." },
    { type: "Cabeça", value: 9, source: "StatBunker", description: "Gols de cabeça em competições cobertas." }
  ],
  clubPassages: [
    {
      id: "santos-1",
      club: "Santos FC",
      period: "2009–2013",
      country: "Brasil",
      role: "Revelação, protagonista e campeão continental",
      shirt: "11",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg",
      summary: "Surgiu como fenômeno no Santos, decidiu mata-matas, liderou geração campeã da Libertadores e consolidou-se como maior promessa brasileira do período.",
      stats: { games: 225, goals: 136, assists: 64, penalties: 20, freeKicks: 4 },
      highlights: [
        "Estreia profissional em 2009.",
        "Campeão da Copa do Brasil 2010 com artilharia da competição.",
        "Campeão da Libertadores 2011, encerrando jejum histórico do Santos.",
        "Gol que venceu o Prêmio Puskás 2011 contra o Flamengo.",
        "Eleito melhor jogador sul-americano em 2011 e 2012."
      ],
      titles: ["Campeonato Paulista 2010, 2011 e 2012", "Copa do Brasil 2010", "Copa Libertadores 2011", "Recopa Sul-Americana 2012"],
      importantGames: [
        { date: "27/07/2011", title: "Santos x Flamengo", detail: "Gol antológico que rendeu o FIFA Puskás Award de 2011." },
        { date: "22/06/2011", title: "Santos x Peñarol", detail: "Final da Libertadores 2011; Neymar marcou na decisão." },
        { date: "2010", title: "Copa do Brasil", detail: "Artilheiro com 11 gols e campeão nacional." }
      ]
    },
    {
      id: "barcelona",
      club: "FC Barcelona",
      period: "2013–2017",
      country: "Espanha",
      role: "Trio MSN, auge europeu e Champions League",
      shirt: "11",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg",
      summary: "No Barcelona, Neymar viveu seu auge europeu. Formou o trio MSN com Messi e Suárez, venceu a Champions e decidiu jogos gigantes.",
      stats: { games: 186, goals: 105, assists: 76, penalties: 10, freeKicks: 5 },
      highlights: [
        "Chegada oficial em 2013 e adaptação ao futebol europeu.",
        "Temporada 2014/15 histórica com Champions, La Liga e Copa do Rei.",
        "Artilheiro da Champions 2014/15 ao lado de Messi e Cristiano Ronaldo, com 10 gols.",
        "Gol na final da Champions contra a Juventus em Berlim.",
        "Protagonista da remontada contra o PSG em 2017."
      ],
      titles: ["La Liga 2014/15 e 2015/16", "Copa do Rei 2014/15, 2015/16 e 2016/17", "Champions League 2014/15", "Mundial de Clubes 2015", "Supercopa da Espanha 2013"],
      importantGames: [
        { date: "06/06/2015", title: "Barcelona 3 x 1 Juventus", detail: "Gol no fim da final da Champions League 2014/15." },
        { date: "08/03/2017", title: "Barcelona 6 x 1 PSG", detail: "Dois gols e uma assistência na remontada histórica." },
        { date: "21/04/2015", title: "Barcelona x PSG", detail: "Dois gols nas quartas da Champions." }
      ]
    },
    {
      id: "psg",
      club: "Paris Saint-Germain",
      period: "2017–2023",
      country: "França",
      role: "Transferência recorde, camisa 10 e final europeia",
      shirt: "10",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg",
      summary: "Contratação mais cara da história, Neymar levou criatividade e decisão ao PSG, conquistou títulos nacionais e chegou à final da Champions em 2020.",
      stats: { games: 173, goals: 118, assists: 77, penalties: 24, freeKicks: 7 },
      highlights: [
        "Transferência recorde mundial em 2017.",
        "Eleito melhor jogador da Ligue 1 em 2017/18.",
        "Conduziu o PSG à primeira final de Champions League do clube em 2020.",
        "Passou dos 100 gols pelo PSG.",
        "Quarto maior artilheiro da história do clube no período."
      ],
      titles: ["Ligue 1 2017/18, 2018/19, 2019/20, 2021/22 e 2022/23", "Copa da França 2017/18, 2019/20 e 2020/21", "Copa da Liga Francesa 2017/18 e 2019/20", "Supercopa da França 2018, 2020 e 2022"],
      importantGames: [
        { date: "2020", title: "PSG na final da Champions", detail: "Participação central na campanha europeia histórica do clube." },
        { date: "02/12/2020", title: "Manchester United x PSG", detail: "Atuação decisiva com gols em Old Trafford." },
        { date: "2018", title: "Primeira temporada", detail: "Temporada de impacto com título francês e prêmio de jogador do ano." }
      ]
    },
    {
      id: "alhilal",
      club: "Al-Hilal SFC",
      period: "2023–2025",
      country: "Arábia Saudita",
      role: "Projeto saudita e título nacional",
      shirt: "10",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Al-Hilal%20SFC%202023.jpg",
      summary: "Passagem marcada por alta expectativa, lesão grave e participação reduzida. Ainda assim, integrou elenco campeão saudita.",
      stats: { games: 7, goals: 1, assists: 3, penalties: 0, freeKicks: 0 },
      highlights: [
        "Chegada ao futebol saudita em 2023.",
        "Primeiro gol pelo clube em competição asiática.",
        "Campeão saudita 2023/24 com o Al-Hilal.",
        "Lesão no joelho reduziu drasticamente sua sequência."
      ],
      titles: ["Saudi Pro League 2023/24"],
      importantGames: [
        { date: "03/10/2023", title: "Al-Hilal x Nassaji", detail: "Primeiro gol pelo Al-Hilal." }
      ]
    },
    {
      id: "santos-2",
      club: "Santos FC",
      period: "2025–atual",
      country: "Brasil",
      role: "Retorno ao clube formador",
      shirt: "10",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Barcelona%20presentation%202.jpg",
      summary: "Retorno ao Santos com status de ídolo máximo contemporâneo, assumindo camisa 10 e função de liderança técnica.",
      stats: { games: 36, goals: 15, assists: 8, penalties: 6, freeKicks: 1 },
      highlights: [
        "Retorno anunciado após ciclo no exterior.",
        "Camisa 10 e referência técnica do elenco.",
        "Nova fase com foco em liderança, protagonismo e recuperação de ritmo."
      ],
      titles: [],
      importantGames: [
        { date: "2025", title: "Volta à Vila Belmiro", detail: "Retorno simbólico ao clube que o revelou." }
      ]
    }
  ],
  nationalTeams: [
    { team: "Brasil Sub-17", period: "2009", games: 3, goals: 1, titles: [], note: "Primeira vitrine internacional de base." },
    { team: "Brasil Sub-20", period: "2011", games: 7, goals: 9, titles: ["Sul-Americano Sub-20 2011"], note: "Campeão e destaque ofensivo." },
    { team: "Brasil Olímpico / Sub-23", period: "2012–2016", games: 14, goals: 8, titles: ["Prata Olímpica 2012", "Ouro Olímpico 2016"], note: "Capitão e cobrador decisivo no ouro do Rio 2016." },
    { team: "Seleção Brasileira Principal", period: "2010–2026", games: 130, goals: 80, titles: ["Copa das Confederações 2013"], note: "Maior artilheiro da história da Seleção Brasileira segundo base Transfermarkt." }
  ],
  collectiveTitles: [
    { category: "Santos", title: "Campeonato Paulista", years: "2010, 2011, 2012", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pacaembu%20Santos%202010.jpg" },
    { category: "Santos", title: "Copa do Brasil", years: "2010", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Copa%20do%20Brasil%20trophy.jpg" },
    { category: "Santos", title: "Copa Libertadores", years: "2011", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg" },
    { category: "Santos", title: "Recopa Sul-Americana", years: "2012", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Copa%20Libertadores%20trophy.jpg" },
    { category: "Barcelona", title: "La Liga", years: "2014/15, 2015/16", image: "https://commons.wikimedia.org/wiki/Special:FilePath/La%20Liga%20trophy%202019.jpg" },
    { category: "Barcelona", title: "Copa do Rei", years: "2014/15, 2015/16, 2016/17", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Copa%20del%20Rey%20Trophy.jpg" },
    { category: "Barcelona", title: "UEFA Champions League", years: "2014/15", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg" },
    { category: "Barcelona", title: "Mundial de Clubes FIFA", years: "2015", image: "https://commons.wikimedia.org/wiki/Special:FilePath/FIFA%20Club%20World%20Cup%20trophy.jpg" },
    { category: "PSG", title: "Ligue 1", years: "2017/18, 2018/19, 2019/20, 2021/22, 2022/23", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Troph%C3%A9e%20de%20Ligue%201%20Uber%20Eats.jpg" },
    { category: "PSG", title: "Copas nacionais francesas", years: "Coupe de France, Coupe de la Ligue e Supercopas", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Coupe%20de%20France%20Trophy.jpg" },
    { category: "Al-Hilal", title: "Saudi Pro League", years: "2023/24", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Al-Hilal%20SFC%20Logo.svg" },
    { category: "Seleção", title: "Copa das Confederações FIFA", years: "2013", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg" },
    { category: "Seleção", title: "Ouro Olímpico", years: "Rio 2016", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg" }
  ],
  individualAwards: [
    {
      classification: "Prêmio individual",
      title: "FIFA Puskás Award",
      years: "2011",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/FIFA%20Puskas%20Award%202009%20CR7%20Museum.jpg",
      detail: "Venceu pelo gol contra o Flamengo, marcado pelo Santos em 2011."
    },
    {
      classification: "Prêmio individual",
      title: "Futebolista Sul-Americano do Ano",
      years: "2011 e 2012",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg",
      detail: "Reconhecimento continental no período de maior domínio pelo Santos."
    },
    {
      classification: "Prêmio de torneio",
      title: "Bola de Ouro da Copa das Confederações",
      years: "2013",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Brasil%20copa%20confedera%C3%A7%C3%B5es2013.jpg",
      detail: "Melhor jogador da competição vencida pelo Brasil."
    },
    {
      classification: "Prêmio individual",
      title: "Jogador do Ano da Ligue 1",
      years: "2017/18",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg",
      detail: "Prêmio de melhor jogador do campeonato francês em sua primeira temporada no PSG."
    },
    {
      classification: "Artilharia",
      title: "Artilheiro da UEFA Champions League",
      years: "2014/15 — 10 gols",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg",
      detail: "Dividiu a artilharia com Messi e Cristiano Ronaldo."
    },
    {
      classification: "Artilharia",
      title: "Artilheiro da Copa do Brasil",
      years: "2010 — 11 gols",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg",
      detail: "Marcou em campanha campeã do Santos."
    },
    {
      classification: "Artilharia",
      title: "Artilheiro do Campeonato Paulista",
      years: "2012 — 20 gols",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg",
      detail: "Temporada de enorme domínio estadual pelo Santos."
    },
    {
      classification: "Artilharia",
      title: "Artilheiro da Libertadores",
      years: "2012 — 8 gols",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg",
      detail: "Destaque ofensivo continental pelo Santos."
    },
    {
      classification: "Medalha",
      title: "Medalha de Ouro Olímpica",
      years: "Rio 2016",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg",
      detail: "Capitão do Brasil; marcou falta no tempo normal e converteu o pênalti decisivo na final contra a Alemanha."
    },
    {
      classification: "Medalha",
      title: "Medalha de Prata Olímpica",
      years: "Londres 2012",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/2012%20Summer%20Olympics%20football%20men%20Brazil%20team.jpg",
      detail: "Vice-campeão olímpico com a Seleção Brasileira Sub-23."
    }
  ],
  importantGoals: [
    { classification: "Santos", date: "27/07/2011", opponent: "Flamengo", competition: "Brasileirão", type: "Gol histórico / Puskás", detail: "Arrancada com dribles em sequência e finalização; vencedor do Puskás." },
    { classification: "Santos", date: "22/06/2011", opponent: "Peñarol", competition: "Libertadores", type: "Jogo corrido", detail: "Gol na final da Libertadores 2011." },
    { classification: "Barcelona", date: "06/06/2015", opponent: "Juventus", competition: "Champions League", type: "Jogo corrido", detail: "Gol no fim da final que confirmou o título europeu." },
    { classification: "Barcelona", date: "08/03/2017", opponent: "PSG", competition: "Champions League", type: "Falta + pênalti", detail: "Dois gols e assistência na remontada de 6 x 1." },
    { classification: "Seleção", date: "30/06/2013", opponent: "Espanha", competition: "Copa das Confederações", type: "Jogo corrido", detail: "Gol na final vencida pelo Brasil no Maracanã." },
    { classification: "Seleção", date: "20/08/2016", opponent: "Alemanha Olímpica", competition: "Jogos Olímpicos", type: "Falta + pênalti decisivo", detail: "Gol de falta e pênalti final no ouro olímpico." },
    { classification: "PSG", date: "02/12/2020", opponent: "Manchester United", competition: "Champions League", type: "Jogo corrido", detail: "Dois gols em vitória decisiva fora de casa." },
    { classification: "Al-Hilal", date: "03/10/2023", opponent: "Nassaji Mazandaran", competition: "AFC Champions League", type: "Jogo corrido", detail: "Primeiro gol pelo Al-Hilal." }
  ],
  opponents: [
    // Seleções principais e olímpicas
    { name: "Estados Unidos", category: "Seleção", context: "Brasil principal", goals: 4 },
    { name: "Argentina", category: "Seleção", context: "Brasil principal", goals: 3 },
    { name: "México", category: "Seleção", context: "Brasil principal", goals: 4 },
    { name: "Japão", category: "Seleção", context: "Brasil principal", goals: 9 },
    { name: "Colômbia", category: "Seleção", context: "Brasil principal", goals: 4 },
    { name: "Bolívia", category: "Seleção", context: "Brasil principal", goals: 5 },
    { name: "Chile", category: "Seleção", context: "Brasil principal", goals: 2 },
    { name: "Espanha", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Itália", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Croácia", category: "Seleção", context: "Brasil principal", goals: 3 },
    { name: "Cameroon", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Peru", category: "Seleção", context: "Brasil principal", goals: 5 },
    { name: "Equador", category: "Seleção", context: "Brasil principal", goals: 2 },
    { name: "Uruguai", category: "Seleção", context: "Brasil principal", goals: 2 },
    { name: "Paraguai", category: "Seleção", context: "Brasil principal", goals: 2 },
    { name: "Costa Rica", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Áustria", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Coreia do Sul", category: "Seleção", context: "Brasil principal", goals: 5 },
    { name: "Tunísia", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Venezuela", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Gana", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Sérvia", category: "Seleção", context: "Brasil principal", goals: 1 },
    { name: "Honduras Olímpica", category: "Seleção", context: "Brasil Olímpico", goals: 1 },
    { name: "Alemanha Olímpica", category: "Seleção", context: "Brasil Olímpico", goals: 1 },
    { name: "Haiti", category: "Seleção", context: "Copa América Centenário", goals: 1 },
    // Clubes brasileiros / América do Sul
    { name: "Flamengo", category: "Clube brasileiro", context: "Santos", goals: 3 },
    { name: "Palmeiras", category: "Clube brasileiro", context: "Santos", goals: 6 },
    { name: "São Paulo", category: "Clube brasileiro", context: "Santos", goals: 5 },
    { name: "Corinthians", category: "Clube brasileiro", context: "Santos", goals: 4 },
    { name: "Atlético-MG", category: "Clube brasileiro", context: "Santos", goals: 3 },
    { name: "Cruzeiro", category: "Clube brasileiro", context: "Santos", goals: 3 },
    { name: "Grêmio", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Internacional", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Fluminense", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Vasco", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Botafogo", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Athletico-PR", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Ceará", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Avaí", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Vitória", category: "Clube brasileiro", context: "Santos", goals: 2 },
    { name: "Mogi Mirim", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Rio Branco-AC", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Santo André", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Guarani", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Ponte Preta", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Oeste", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Ituano", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Linense", category: "Clube brasileiro", context: "Santos", goals: 1 },
    { name: "Peñarol", category: "Clube sul-americano", context: "Santos / Libertadores", goals: 1 },
    { name: "Cerro Porteño", category: "Clube sul-americano", context: "Santos / Libertadores", goals: 2 },
    { name: "Bolívar", category: "Clube sul-americano", context: "Santos / Libertadores", goals: 1 },
    { name: "The Strongest", category: "Clube sul-americano", context: "Santos / Libertadores", goals: 1 },
    { name: "Vélez Sarsfield", category: "Clube sul-americano", context: "Santos / Libertadores", goals: 1 },
    // Barcelona / Europa
    { name: "Real Madrid", category: "Clube europeu", context: "Barcelona", goals: 3 },
    { name: "Atlético de Madrid", category: "Clube europeu", context: "Barcelona", goals: 7 },
    { name: "Villarreal", category: "Clube europeu", context: "Barcelona", goals: 5 },
    { name: "Juventus", category: "Clube europeu", context: "Barcelona", goals: 1 },
    { name: "PSG", category: "Clube europeu", context: "Barcelona", goals: 6 },
    { name: "Bayern de Munique", category: "Clube europeu", context: "Barcelona", goals: 2 },
    { name: "Manchester City", category: "Clube europeu", context: "Barcelona", goals: 4 },
    { name: "Celtic", category: "Clube europeu", context: "Barcelona / PSG", goals: 4 },
    { name: "Ajax", category: "Clube europeu", context: "Barcelona", goals: 3 },
    { name: "Arsenal", category: "Clube europeu", context: "Barcelona", goals: 1 },
    { name: "Sevilla", category: "Clube europeu", context: "Barcelona", goals: 4 },
    { name: "Athletic Club", category: "Clube europeu", context: "Barcelona", goals: 5 },
    { name: "Espanyol", category: "Clube europeu", context: "Barcelona", goals: 3 },
    { name: "Granada", category: "Clube europeu", context: "Barcelona", goals: 3 },
    { name: "Rayo Vallecano", category: "Clube europeu", context: "Barcelona", goals: 4 },
    { name: "Celta de Vigo", category: "Clube europeu", context: "Barcelona", goals: 2 },
    { name: "Deportivo La Coruña", category: "Clube europeu", context: "Barcelona", goals: 2 },
    { name: "Elche", category: "Clube europeu", context: "Barcelona", goals: 3 },
    { name: "Eibar", category: "Clube europeu", context: "Barcelona", goals: 2 },
    { name: "Getafe", category: "Clube europeu", context: "Barcelona", goals: 2 },
    { name: "Las Palmas", category: "Clube europeu", context: "Barcelona", goals: 2 },
    { name: "Málaga", category: "Clube europeu", context: "Barcelona", goals: 1 },
    { name: "Real Sociedad", category: "Clube europeu", context: "Barcelona", goals: 1 },
    { name: "Borussia Mönchengladbach", category: "Clube europeu", context: "Barcelona", goals: 1 },
    { name: "BATE Borisov", category: "Clube europeu", context: "Barcelona", goals: 1 },
    // PSG / Europa e França
    { name: "Olympique de Marseille", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Monaco", category: "Clube europeu", context: "PSG", goals: 4 },
    { name: "Lyon", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Lille", category: "Clube europeu", context: "PSG", goals: 4 },
    { name: "Rennes", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Nice", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Bordeaux", category: "Clube europeu", context: "PSG", goals: 4 },
    { name: "Guingamp", category: "Clube europeu", context: "PSG", goals: 5 },
    { name: "Toulouse", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Amiens", category: "Clube europeu", context: "PSG", goals: 2 },
    { name: "Dijon", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Montpellier", category: "Clube europeu", context: "PSG", goals: 4 },
    { name: "Angers", category: "Clube europeu", context: "PSG", goals: 2 },
    { name: "Metz", category: "Clube europeu", context: "PSG", goals: 2 },
    { name: "Nantes", category: "Clube europeu", context: "PSG", goals: 2 },
    { name: "Saint-Étienne", category: "Clube europeu", context: "PSG", goals: 2 },
    { name: "Caen", category: "Clube europeu", context: "PSG", goals: 1 },
    { name: "Strasbourg", category: "Clube europeu", context: "PSG", goals: 1 },
    { name: "Manchester United", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Liverpool", category: "Clube europeu", context: "PSG", goals: 1 },
    { name: "Istanbul Başakşehir", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "Estrela Vermelha", category: "Clube europeu", context: "PSG", goals: 3 },
    { name: "RB Leipzig", category: "Clube europeu", context: "PSG", goals: 1 },
    { name: "Nassaji Mazandaran", category: "Clube asiático", context: "Al-Hilal", goals: 1 }
  ],
  gallery: [
    { title: "Neymar no auge pelo Barcelona", tag: "Barcelona", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg", credit: "Wikimedia Commons / Alex Fau" },
    { title: "Apresentação no Barcelona", tag: "Barcelona", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Barcelona%20presentation%202.jpg", credit: "Wikimedia Commons" },
    { title: "Brasil e ouro olímpico", tag: "Seleção", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg", credit: "Agência Brasil / Wikimedia Commons" },
    { title: "Neymar pela Seleção", tag: "Seleção", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20contra%20uruguai.jpg", credit: "Wikimedia Commons" },
    { title: "Camisa do PSG", tag: "PSG", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg", credit: "Wikimedia Commons" },
    { title: "Troféu Champions League", tag: "Troféu", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg", credit: "Wikimedia Commons" },
    { title: "Troféu Libertadores", tag: "Troféu", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg", credit: "Wikimedia Commons" },
    { title: "Copa das Confederações 2013", tag: "Seleção", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg", credit: "Wikimedia Commons" }
  ],
  sources: [
    { label: "Transfermarkt — Perfil, gols, pênaltis e conquistas", url: "https://www.transfermarkt.com/neymar" },
    { label: "StatBunker — tipos de gol por pé, cabeça, falta e pênalti", url: "https://www.statbunker.com/players/getPlayerStats?player_id=37759" },
    { label: "Wikimedia Commons — imagens reais em licenças abertas", url: "https://commons.wikimedia.org/wiki/Neymar" },
    { label: "Wikipedia — títulos e estatísticas gerais", url: "https://pt.wikipedia.org/wiki/Neymar" }
  ]
};
