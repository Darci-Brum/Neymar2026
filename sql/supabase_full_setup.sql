
-- Neymar Jr Supabase Strict Setup
-- Execute este arquivo no SQL Editor do Supabase.
-- O site não possui data.js nem fallback local: tudo vem destas tabelas.

create extension if not exists pgcrypto;

create table if not exists neymar_profile (
  slug text primary key,
  name text,
  short_name text,
  birth text,
  birthplace text,
  position text,
  height text,
  dominant_foot text,
  hero_image text,
  cover_image text,
  subtitle text,
  bio text,
  updated_at_label text,
  sort_order int default 1,
  updated_at timestamptz default now()
);

create table if not exists neymar_stat_cards (
  slug text primary key,
  label text not null,
  value numeric not null default 0,
  suffix text,
  note text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_club_passages (
  slug text primary key,
  club text not null,
  period text,
  country text,
  role text,
  shirt text,
  image_url text,
  summary text,
  games int default 0,
  goals int default 0,
  assists int default 0,
  penalties int default 0,
  free_kicks int default 0,
  highlights jsonb default '[]'::jsonb,
  titles jsonb default '[]'::jsonb,
  important_games jsonb default '[]'::jsonb,
  source_note text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_national_teams (
  slug text primary key,
  team text not null,
  period text,
  games int default 0,
  goals int default 0,
  assists int,
  titles jsonb default '[]'::jsonb,
  note text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_goal_methods (
  slug text primary key,
  type text not null,
  value int default 0,
  source text,
  description text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_goal_assist_by_team (
  slug text primary key,
  classification text,
  team text not null,
  period text,
  games int default 0,
  goals int default 0,
  assists int default 0,
  penalties int default 0,
  free_kicks int default 0,
  goals_per_game numeric default 0,
  goal_participations int default 0,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_important_goals (
  slug text primary key,
  classification text,
  date_label text,
  opponent text,
  competition text,
  goal_type text,
  detail text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_career_milestones (
  slug text primary key,
  year_label text,
  classification text,
  title text not null,
  description text,
  image_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_titles (
  slug text primary key,
  classification text,
  category text,
  title text not null,
  years text,
  image_url text,
  detail text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_awards (
  slug text primary key,
  classification text,
  title text not null,
  years text,
  image_url text,
  detail text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_opponents (
  slug text primary key,
  name text not null,
  category text,
  context text,
  goals int default 0,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_media_photos (
  slug text primary key,
  title text not null,
  tag text,
  image_url text,
  credit text,
  description text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_media_videos (
  slug text primary key,
  title text not null,
  classification text,
  phase text,
  platform text,
  embed_url text,
  external_url text,
  description text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_transfers_contracts (
  slug text primary key,
  date_label text,
  from_team text,
  to_team text,
  movement_type text,
  reported_fee text,
  estimated_salary text,
  market_value text,
  detail text,
  source_label text,
  source_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_sources (
  slug text primary key,
  label text not null,
  url text not null,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists site_feedback (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text not null,
  page text,
  path text,
  created_at timestamptz default now()
);

create table if not exists site_page_views (
  id uuid primary key default gen_random_uuid(),
  page text,
  path text,
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

-- Índices úteis
create index if not exists idx_neymar_opponents_category on neymar_opponents(category);
create index if not exists idx_neymar_opponents_context on neymar_opponents(context);
create index if not exists idx_neymar_media_photos_tag on neymar_media_photos(tag);
create index if not exists idx_neymar_awards_classification on neymar_awards(classification);
create index if not exists idx_neymar_titles_category on neymar_titles(category);

-- RLS e policies públicas de leitura para GitHub Pages.
alter table neymar_profile enable row level security;
alter table neymar_stat_cards enable row level security;
alter table neymar_club_passages enable row level security;
alter table neymar_national_teams enable row level security;
alter table neymar_goal_methods enable row level security;
alter table neymar_goal_assist_by_team enable row level security;
alter table neymar_important_goals enable row level security;
alter table neymar_career_milestones enable row level security;
alter table neymar_titles enable row level security;
alter table neymar_awards enable row level security;
alter table neymar_opponents enable row level security;
alter table neymar_media_photos enable row level security;
alter table neymar_media_videos enable row level security;
alter table neymar_transfers_contracts enable row level security;
alter table neymar_sources enable row level security;
alter table site_feedback enable row level security;
alter table site_page_views enable row level security;

-- Recria policies sem quebrar se já existirem.
do $$
begin
  execute 'drop policy if exists "public read neymar_profile" on neymar_profile';
  execute 'drop policy if exists "public read neymar_stat_cards" on neymar_stat_cards';
  execute 'drop policy if exists "public read neymar_club_passages" on neymar_club_passages';
  execute 'drop policy if exists "public read neymar_national_teams" on neymar_national_teams';
  execute 'drop policy if exists "public read neymar_goal_methods" on neymar_goal_methods';
  execute 'drop policy if exists "public read neymar_goal_assist_by_team" on neymar_goal_assist_by_team';
  execute 'drop policy if exists "public read neymar_important_goals" on neymar_important_goals';
  execute 'drop policy if exists "public read neymar_career_milestones" on neymar_career_milestones';
  execute 'drop policy if exists "public read neymar_titles" on neymar_titles';
  execute 'drop policy if exists "public read neymar_awards" on neymar_awards';
  execute 'drop policy if exists "public read neymar_opponents" on neymar_opponents';
  execute 'drop policy if exists "public read neymar_media_photos" on neymar_media_photos';
  execute 'drop policy if exists "public read neymar_media_videos" on neymar_media_videos';
  execute 'drop policy if exists "public read neymar_transfers_contracts" on neymar_transfers_contracts';
  execute 'drop policy if exists "public read neymar_sources" on neymar_sources';
  execute 'drop policy if exists "public insert site_feedback" on site_feedback';
  execute 'drop policy if exists "public insert site_page_views" on site_page_views';
end $$;

create policy "public read neymar_profile" on neymar_profile for select using (true);
create policy "public read neymar_stat_cards" on neymar_stat_cards for select using (true);
create policy "public read neymar_club_passages" on neymar_club_passages for select using (true);
create policy "public read neymar_national_teams" on neymar_national_teams for select using (true);
create policy "public read neymar_goal_methods" on neymar_goal_methods for select using (true);
create policy "public read neymar_goal_assist_by_team" on neymar_goal_assist_by_team for select using (true);
create policy "public read neymar_important_goals" on neymar_important_goals for select using (true);
create policy "public read neymar_career_milestones" on neymar_career_milestones for select using (true);
create policy "public read neymar_titles" on neymar_titles for select using (true);
create policy "public read neymar_awards" on neymar_awards for select using (true);
create policy "public read neymar_opponents" on neymar_opponents for select using (true);
create policy "public read neymar_media_photos" on neymar_media_photos for select using (true);
create policy "public read neymar_media_videos" on neymar_media_videos for select using (true);
create policy "public read neymar_transfers_contracts" on neymar_transfers_contracts for select using (true);
create policy "public read neymar_sources" on neymar_sources for select using (true);
create policy "public insert site_feedback" on site_feedback for insert with check (true);
create policy "public insert site_page_views" on site_page_views for insert with check (true);


-- Dados iniciais. Edite diretamente no Supabase para atualizar o site.
INSERT INTO neymar_profile (slug, name, short_name, birth, birthplace, position, height, dominant_foot, hero_image, cover_image, subtitle, bio, updated_at_label, sort_order) VALUES
('neymar', 'Neymar da Silva Santos Júnior', 'Neymar Jr.', '05/02/1992', 'Mogi das Cruzes, Brasil', 'Atacante / Meia-atacante', '1,75 m', 'Destro', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Barcelona%20presentation%202.jpg', 'Arquivo premium da carreira: clubes, Seleção, gols, títulos, medalhas e prêmios.', 'Arquivo digital premium dedicado à carreira profissional de Neymar Jr., com dados mantidos no Supabase: clubes, Seleção, gols, assistências, títulos, prêmios, transferências, salários estimados, imagens e vídeos documentais.', '08/07/2026', 1)
ON CONFLICT (slug) DO UPDATE SET name=excluded.name, short_name=excluded.short_name, birth=excluded.birth, birthplace=excluded.birthplace, position=excluded.position, height=excluded.height, dominant_foot=excluded.dominant_foot, hero_image=excluded.hero_image, cover_image=excluded.cover_image, subtitle=excluded.subtitle, bio=excluded.bio, updated_at_label=excluded.updated_at_label, sort_order=excluded.sort_order;
INSERT INTO neymar_stat_cards (slug, label, value, suffix, note, sort_order) VALUES
('total-gols-carreira', 'Gols oficiais na carreira', 465, '+', 'Soma aproximada considerando clubes + Seleção principal, variando conforme critério da fonte.', 1),
('assistencias-carreira', 'Assistências registradas', 286, '+', 'Transfermarkt/levantamentos públicos por clube e Seleção; pode variar conforme competição coberta.', 2),
('gols-brasil', 'Gols pelo Brasil principal', 80, '', 'Marca divulgada em reportagens de 2026: 80 gols em 130 jogos.', 3),
('assistencias-brasil', 'Assistências pelo Brasil principal', 58, '', 'Estimativa jornalística pós-Copa de 2026.', 4),
('penaltis', 'Pênaltis convertidos', 94, '', 'Referência Transfermarkt por registros públicos.', 5),
('faltas-diretas', 'Gols de falta direta', 14, '', 'Referência StatBunker em competições cobertas.', 6),
('titulos-coletivos', 'Títulos coletivos listados', 28, '+', 'Inclui clubes, base/olímpico e Seleção; pode variar por critério.', 7),
('maior-transferencia', 'Maior transferência', 222, ' mi €', 'Barcelona para PSG em 2017, recorde mundial.', 8)
ON CONFLICT (slug) DO UPDATE SET label=excluded.label, value=excluded.value, suffix=excluded.suffix, note=excluded.note, sort_order=excluded.sort_order;
INSERT INTO neymar_club_passages (slug, club, period, country, role, shirt, image_url, summary, games, goals, assists, penalties, free_kicks, highlights, titles, important_games, source_note, sort_order) VALUES
('santos-fc-1', 'Santos FC', '2009–2013', 'Brasil', 'Revelação, protagonista e campeão continental', '11', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 'Surgiu como fenômeno no Santos, decidiu mata-matas, liderou geração campeã da Libertadores e consolidou-se como maior promessa brasileira do período.', 225, 136, 64, 20, 4, '["Estreia profissional em 2009.", "Campeão da Copa do Brasil 2010 com artilharia da competição.", "Campeão da Libertadores 2011, encerrando jejum histórico do Santos.", "Gol que venceu o Prêmio Puskás 2011 contra o Flamengo.", "Eleito melhor jogador sul-americano em 2011 e 2012."]'::jsonb, '["Campeonato Paulista 2010, 2011 e 2012", "Copa do Brasil 2010", "Copa Libertadores 2011", "Recopa Sul-Americana 2012"]'::jsonb, '[{"date": "27/07/2011", "title": "Santos x Flamengo", "detail": "Gol antológico que rendeu o FIFA Puskás Award de 2011."}, {"date": "22/06/2011", "title": "Santos x Peñarol", "detail": "Final da Libertadores 2011; Neymar marcou na decisão."}, {"date": "2010", "title": "Copa do Brasil", "detail": "Artilheiro com 11 gols e campeão nacional."}]'::jsonb, 'Números consolidados de bases públicas; revise no Supabase conforme seu critério.', 1),
('fc-barcelona-2', 'FC Barcelona', '2013–2017', 'Espanha', 'Trio MSN, auge europeu e Champions League', '11', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg', 'No Barcelona, Neymar viveu seu auge europeu. Formou o trio MSN com Messi e Suárez, venceu a Champions e decidiu jogos gigantes.', 186, 105, 76, 10, 5, '["Chegada oficial em 2013 e adaptação ao futebol europeu.", "Temporada 2014/15 histórica com Champions, La Liga e Copa do Rei.", "Artilheiro da Champions 2014/15 ao lado de Messi e Cristiano Ronaldo, com 10 gols.", "Gol na final da Champions contra a Juventus em Berlim.", "Protagonista da remontada contra o PSG em 2017."]'::jsonb, '["La Liga 2014/15 e 2015/16", "Copa do Rei 2014/15, 2015/16 e 2016/17", "Champions League 2014/15", "Mundial de Clubes 2015", "Supercopa da Espanha 2013"]'::jsonb, '[{"date": "06/06/2015", "title": "Barcelona 3 x 1 Juventus", "detail": "Gol no fim da final da Champions League 2014/15."}, {"date": "08/03/2017", "title": "Barcelona 6 x 1 PSG", "detail": "Dois gols e uma assistência na remontada histórica."}, {"date": "21/04/2015", "title": "Barcelona x PSG", "detail": "Dois gols nas quartas da Champions."}]'::jsonb, 'Números consolidados de bases públicas; revise no Supabase conforme seu critério.', 2),
('paris-saint-germain-3', 'Paris Saint-Germain', '2017–2023', 'França', 'Transferência recorde, camisa 10 e final europeia', '10', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg', 'Contratação mais cara da história, Neymar levou criatividade e decisão ao PSG, conquistou títulos nacionais e chegou à final da Champions em 2020.', 173, 118, 77, 24, 7, '["Transferência recorde mundial em 2017.", "Eleito melhor jogador da Ligue 1 em 2017/18.", "Conduziu o PSG à primeira final de Champions League do clube em 2020.", "Passou dos 100 gols pelo PSG.", "Quarto maior artilheiro da história do clube no período."]'::jsonb, '["Ligue 1 2017/18, 2018/19, 2019/20, 2021/22 e 2022/23", "Copa da França 2017/18, 2019/20 e 2020/21", "Copa da Liga Francesa 2017/18 e 2019/20", "Supercopa da França 2018, 2020 e 2022"]'::jsonb, '[{"date": "2020", "title": "PSG na final da Champions", "detail": "Participação central na campanha europeia histórica do clube."}, {"date": "02/12/2020", "title": "Manchester United x PSG", "detail": "Atuação decisiva com gols em Old Trafford."}, {"date": "2018", "title": "Primeira temporada", "detail": "Temporada de impacto com título francês e prêmio de jogador do ano."}]'::jsonb, 'Números consolidados de bases públicas; revise no Supabase conforme seu critério.', 3),
('al-hilal-sfc-4', 'Al-Hilal SFC', '2023–2025', 'Arábia Saudita', 'Projeto saudita e título nacional', '10', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Al-Hilal%20SFC%202023.jpg', 'Passagem marcada por alta expectativa, lesão grave e participação reduzida. Ainda assim, integrou elenco campeão saudita.', 7, 1, 3, 0, 0, '["Chegada ao futebol saudita em 2023.", "Primeiro gol pelo clube em competição asiática.", "Campeão saudita 2023/24 com o Al-Hilal.", "Lesão no joelho reduziu drasticamente sua sequência."]'::jsonb, '["Saudi Pro League 2023/24"]'::jsonb, '[{"date": "03/10/2023", "title": "Al-Hilal x Nassaji", "detail": "Primeiro gol pelo Al-Hilal."}]'::jsonb, 'Números consolidados de bases públicas; revise no Supabase conforme seu critério.', 4),
('santos-fc-5', 'Santos FC', '2025–atual', 'Brasil', 'Retorno ao clube formador', '10', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Barcelona%20presentation%202.jpg', 'Retorno ao Santos com status de ídolo máximo contemporâneo, assumindo camisa 10 e função de liderança técnica.', 36, 15, 8, 6, 1, '["Retorno anunciado após ciclo no exterior.", "Camisa 10 e referência técnica do elenco.", "Nova fase com foco em liderança, protagonismo e recuperação de ritmo."]'::jsonb, '[]'::jsonb, '[{"date": "2025", "title": "Volta à Vila Belmiro", "detail": "Retorno simbólico ao clube que o revelou."}]'::jsonb, 'Números consolidados de bases públicas; revise no Supabase conforme seu critério.', 5)
ON CONFLICT (slug) DO UPDATE SET club=excluded.club, period=excluded.period, country=excluded.country, role=excluded.role, shirt=excluded.shirt, image_url=excluded.image_url, summary=excluded.summary, games=excluded.games, goals=excluded.goals, assists=excluded.assists, penalties=excluded.penalties, free_kicks=excluded.free_kicks, highlights=excluded.highlights, titles=excluded.titles, important_games=excluded.important_games, source_note=excluded.source_note, sort_order=excluded.sort_order;
INSERT INTO neymar_national_teams (slug, team, period, games, goals, assists, titles, note, sort_order) VALUES
('brasil-sub-17', 'Brasil Sub-17', '2009', 3, 1, NULL, '[]'::jsonb, 'Primeira vitrine internacional de base.', 1),
('brasil-sub-20', 'Brasil Sub-20', '2011', 7, 9, NULL, '["Sul-Americano Sub-20 2011"]'::jsonb, 'Campeão e destaque ofensivo.', 2),
('brasil-ol-mpico-sub-23', 'Brasil Olímpico / Sub-23', '2012–2016', 14, 8, NULL, '["Prata Olímpica 2012", "Ouro Olímpico 2016"]'::jsonb, 'Capitão e cobrador decisivo no ouro do Rio 2016.', 3),
('sele-o-brasileira-principal', 'Seleção Brasileira Principal', '2010–2026', 130, 80, 58, '["Copa das Confederações 2013"]'::jsonb, 'Maior artilheiro da história da Seleção Brasileira segundo base Transfermarkt.', 4)
ON CONFLICT (slug) DO UPDATE SET team=excluded.team, period=excluded.period, games=excluded.games, goals=excluded.goals, assists=excluded.assists, titles=excluded.titles, note=excluded.note, sort_order=excluded.sort_order;
INSERT INTO neymar_goal_methods (slug, type, value, source, description, sort_order) VALUES
('p-nalti', 'Pênalti', 94, 'Transfermarkt', 'Pênaltis convertidos na carreira profissional, incluindo clubes e Seleção.', 1),
('p-naltis-perdidos', 'Pênaltis perdidos', 22, 'Transfermarkt', 'Cobranças não convertidas, conforme registro público por jogo.', 2),
('falta-direta', 'Falta direta', 14, 'StatBunker', 'Gols de falta direta em competições cobertas pelo StatBunker.', 3),
('p-direito', 'Pé direito', 160, 'StatBunker', 'Gols com o pé direito em competições cobertas.', 4),
('p-esquerdo', 'Pé esquerdo', 61, 'StatBunker', 'Gols com o pé esquerdo em competições cobertas.', 5),
('cabe-a', 'Cabeça', 9, 'StatBunker', 'Gols de cabeça em competições cobertas.', 6)
ON CONFLICT (slug) DO UPDATE SET type=excluded.type, value=excluded.value, source=excluded.source, description=excluded.description, sort_order=excluded.sort_order;
INSERT INTO neymar_goal_assist_by_team (slug, classification, team, period, games, goals, assists, penalties, free_kicks, goals_per_game, goal_participations, sort_order) VALUES
('santos-fc-1', 'Clube', 'Santos FC', '2009–2013', 225, 136, 64, 20, 4, 0.604, 200, 1),
('fc-barcelona-2', 'Clube', 'FC Barcelona', '2013–2017', 186, 105, 76, 10, 5, 0.565, 181, 2),
('paris-saint-germain-3', 'Clube', 'Paris Saint-Germain', '2017–2023', 173, 118, 77, 24, 7, 0.682, 195, 3),
('al-hilal-sfc-4', 'Clube', 'Al-Hilal SFC', '2023–2025', 7, 1, 3, 0, 0, 0.143, 4, 4),
('santos-fc-5', 'Clube', 'Santos FC', '2025–atual', 36, 15, 8, 6, 1, 0.417, 23, 5),
('brasil-principal', 'Seleção', 'Brasil principal', '2010–2026', 130, 80, 58, 22, 5, 0.615, 138, 10)
ON CONFLICT (slug) DO UPDATE SET classification=excluded.classification, team=excluded.team, period=excluded.period, games=excluded.games, goals=excluded.goals, assists=excluded.assists, penalties=excluded.penalties, free_kicks=excluded.free_kicks, goals_per_game=excluded.goals_per_game, goal_participations=excluded.goal_participations, sort_order=excluded.sort_order;
INSERT INTO neymar_important_goals (slug, classification, date_label, opponent, competition, goal_type, detail, sort_order) VALUES
('27-07-2011-flamengo-brasileir-o', 'Santos', '27/07/2011', 'Flamengo', 'Brasileirão', 'Gol histórico / Puskás', 'Arrancada com dribles em sequência e finalização; vencedor do Puskás.', 1),
('22-06-2011-pe-arol-libertadores', 'Santos', '22/06/2011', 'Peñarol', 'Libertadores', 'Jogo corrido', 'Gol na final da Libertadores 2011.', 2),
('06-06-2015-juventus-champions-league', 'Barcelona', '06/06/2015', 'Juventus', 'Champions League', 'Jogo corrido', 'Gol no fim da final que confirmou o título europeu.', 3),
('08-03-2017-psg-champions-league', 'Barcelona', '08/03/2017', 'PSG', 'Champions League', 'Falta + pênalti', 'Dois gols e assistência na remontada de 6 x 1.', 4),
('30-06-2013-espanha-copa-das-confedera-es', 'Seleção', '30/06/2013', 'Espanha', 'Copa das Confederações', 'Jogo corrido', 'Gol na final vencida pelo Brasil no Maracanã.', 5),
('20-08-2016-alemanha-ol-mpica-jogos-ol-mpicos', 'Seleção', '20/08/2016', 'Alemanha Olímpica', 'Jogos Olímpicos', 'Falta + pênalti decisivo', 'Gol de falta e pênalti final no ouro olímpico.', 6),
('02-12-2020-manchester-united-champions-league', 'PSG', '02/12/2020', 'Manchester United', 'Champions League', 'Jogo corrido', 'Dois gols em vitória decisiva fora de casa.', 7),
('03-10-2023-nassaji-mazandaran-afc-champions-league', 'Al-Hilal', '03/10/2023', 'Nassaji Mazandaran', 'AFC Champions League', 'Jogo corrido', 'Primeiro gol pelo Al-Hilal.', 8)
ON CONFLICT (slug) DO UPDATE SET classification=excluded.classification, date_label=excluded.date_label, opponent=excluded.opponent, competition=excluded.competition, goal_type=excluded.goal_type, detail=excluded.detail, sort_order=excluded.sort_order;
INSERT INTO neymar_career_milestones (slug, year_label, classification, title, description, image_url, sort_order) VALUES
('futsal-portuguesa-gremetal', '1998–2003', 'Base / Futsal', 'Futsal e primeiros fundamentos', 'Passagem pela Portuguesa Santista, Gremetal e base em Santos, fase em que desenvolveu improviso, drible curto e controle de bola.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 1),
('real-madrid-teste-2006', '2006', 'Proposta / Real Madrid', 'Teste no Real Madrid aos 14 anos', 'Neymar treinou em Valdebebas e chegou a ter documentação de inscrição, mas a negociação não avançou e ele permaneceu ligado ao Santos.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Valdebebas.jpg', 2),
('estreia-profissional-santos', '2009', 'Santos', 'Estreia profissional no Santos', 'Começo da trajetória profissional no clube formador.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 3),
('libertadores-puskas', '2011', 'Santos', 'Libertadores e Puskás', 'Ano símbolo: Libertadores pelo Santos e prêmio Puskás pelo gol contra o Flamengo.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg', 4),
('barcelona-msn', '2013–2017', 'Barcelona', 'Barcelona e trio MSN', 'Auge europeu com Messi e Suárez, Champions League e jogos históricos.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg', 5),
('psg-recorde', '2017', 'PSG', 'Transferência recorde mundial', 'PSG pagou a multa rescisória de €222 milhões ao Barcelona.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg', 6),
('ouro-olimpico', '2016', 'Seleção', 'Ouro olímpico no Rio', 'Capitão, gol de falta na final e pênalti decisivo na disputa contra a Alemanha.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg', 7),
('al-hilal-saudi', '2023–2025', 'Al-Hilal', 'Capítulo saudita e lesão', 'Chegada ao Al-Hilal, lesão grave pela Seleção e curta passagem em campo.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg', 8),
('retorno-santos', '2025–2026', 'Santos', 'Retorno ao Santos', 'Volta ao clube de origem em 2025 e extensão de contrato até 2026.', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 9)
ON CONFLICT (slug) DO UPDATE SET year_label=excluded.year_label, classification=excluded.classification, title=excluded.title, description=excluded.description, image_url=excluded.image_url, sort_order=excluded.sort_order;
INSERT INTO neymar_titles (slug, classification, category, title, years, image_url, detail, sort_order) VALUES
('santos-campeonato-paulista', 'Título coletivo', 'Santos', 'Campeonato Paulista', '2010, 2011, 2012', 'https://commons.wikimedia.org/wiki/Special:FilePath/Pacaembu%20Santos%202010.jpg', 'Conquista coletiva listada no arquivo da carreira.', 1),
('santos-copa-do-brasil', 'Título coletivo', 'Santos', 'Copa do Brasil', '2010', 'https://commons.wikimedia.org/wiki/Special:FilePath/Copa%20do%20Brasil%20trophy.jpg', 'Conquista coletiva listada no arquivo da carreira.', 2),
('santos-copa-libertadores', 'Título coletivo', 'Santos', 'Copa Libertadores', '2011', 'https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg', 'Conquista coletiva listada no arquivo da carreira.', 3),
('santos-recopa-sul-americana', 'Título coletivo', 'Santos', 'Recopa Sul-Americana', '2012', 'https://commons.wikimedia.org/wiki/Special:FilePath/Copa%20Libertadores%20trophy.jpg', 'Conquista coletiva listada no arquivo da carreira.', 4),
('barcelona-la-liga', 'Título coletivo', 'Barcelona', 'La Liga', '2014/15, 2015/16', 'https://commons.wikimedia.org/wiki/Special:FilePath/La%20Liga%20trophy%202019.jpg', 'Conquista coletiva listada no arquivo da carreira.', 5),
('barcelona-copa-do-rei', 'Título coletivo', 'Barcelona', 'Copa do Rei', '2014/15, 2015/16, 2016/17', 'https://commons.wikimedia.org/wiki/Special:FilePath/Copa%20del%20Rey%20Trophy.jpg', 'Conquista coletiva listada no arquivo da carreira.', 6),
('barcelona-uefa-champions-league', 'Título coletivo', 'Barcelona', 'UEFA Champions League', '2014/15', 'https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg', 'Conquista coletiva listada no arquivo da carreira.', 7),
('barcelona-mundial-de-clubes-fifa', 'Título coletivo', 'Barcelona', 'Mundial de Clubes FIFA', '2015', 'https://commons.wikimedia.org/wiki/Special:FilePath/FIFA%20Club%20World%20Cup%20trophy.jpg', 'Conquista coletiva listada no arquivo da carreira.', 8),
('psg-ligue-1', 'Título coletivo', 'PSG', 'Ligue 1', '2017/18, 2018/19, 2019/20, 2021/22, 2022/23', 'https://commons.wikimedia.org/wiki/Special:FilePath/Troph%C3%A9e%20de%20Ligue%201%20Uber%20Eats.jpg', 'Conquista coletiva listada no arquivo da carreira.', 9),
('psg-copas-nacionais-francesas', 'Título coletivo', 'PSG', 'Copas nacionais francesas', 'Coupe de France, Coupe de la Ligue e Supercopas', 'https://commons.wikimedia.org/wiki/Special:FilePath/Coupe%20de%20France%20Trophy.jpg', 'Conquista coletiva listada no arquivo da carreira.', 10),
('al-hilal-saudi-pro-league', 'Título coletivo', 'Al-Hilal', 'Saudi Pro League', '2023/24', 'https://commons.wikimedia.org/wiki/Special:FilePath/Al-Hilal%20SFC%20Logo.svg', 'Conquista coletiva listada no arquivo da carreira.', 11),
('sele-o-copa-das-confedera-es-fifa', 'Título coletivo', 'Seleção', 'Copa das Confederações FIFA', '2013', 'https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg', 'Conquista coletiva listada no arquivo da carreira.', 12),
('sele-o-ouro-ol-mpico', 'Título coletivo', 'Seleção', 'Ouro Olímpico', 'Rio 2016', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg', 'Conquista coletiva listada no arquivo da carreira.', 13),
('brasil-ol-mpico-medalha-de-ouro-ol-mpica-rio-2016', 'Medalha / Seleção', 'Brasil Olímpico', 'Medalha de ouro olímpica', 'Rio 2016', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg', 'Capitão, marcou falta na final e converteu o pênalti decisivo contra a Alemanha.', 14),
('brasil-ol-mpico-medalha-de-prata-ol-mpica-londres-2012', 'Medalha / Seleção', 'Brasil Olímpico', 'Medalha de prata olímpica', 'Londres 2012', 'https://commons.wikimedia.org/wiki/Special:FilePath/Football%20at%20the%202012%20Summer%20Olympics%20-%20Men%27s%20tournament%20-%20Gold%20medal%20match%20-%20Brazil%20v%20Mexico.jpg', 'Campanha olímpica com a Seleção Sub-23.', 15),
('brasil-copa-das-confedera-es-2013', 'Medalha / Seleção', 'Brasil', 'Copa das Confederações', '2013', 'https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg', 'Título pela Seleção principal no Maracanã, com Neymar eleito destaque do torneio.', 16)
ON CONFLICT (slug) DO UPDATE SET classification=excluded.classification, category=excluded.category, title=excluded.title, years=excluded.years, image_url=excluded.image_url, detail=excluded.detail, sort_order=excluded.sort_order;
INSERT INTO neymar_awards (slug, classification, title, years, image_url, detail, sort_order) VALUES
('fifa-pusk-s-award-2011', 'Prêmio individual', 'FIFA Puskás Award', '2011', 'https://commons.wikimedia.org/wiki/Special:FilePath/FIFA%20Puskas%20Award%202009%20CR7%20Museum.jpg', 'Venceu pelo gol contra o Flamengo, marcado pelo Santos em 2011.', 1),
('futebolista-sul-americano-do-ano-2011-e-2012', 'Prêmio individual', 'Futebolista Sul-Americano do Ano', '2011 e 2012', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 'Reconhecimento continental no período de maior domínio pelo Santos.', 2),
('bola-de-ouro-da-copa-das-confedera-es-2013', 'Prêmio de torneio', 'Bola de Ouro da Copa das Confederações', '2013', 'https://commons.wikimedia.org/wiki/Special:FilePath/Brasil%20copa%20confedera%C3%A7%C3%B5es2013.jpg', 'Melhor jogador da competição vencida pelo Brasil.', 3),
('jogador-do-ano-da-ligue-1-2017-18', 'Prêmio individual', 'Jogador do Ano da Ligue 1', '2017/18', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg', 'Prêmio de melhor jogador do campeonato francês em sua primeira temporada no PSG.', 4),
('artilheiro-da-uefa-champions-league-2014-15-10-gols', 'Artilharia', 'Artilheiro da UEFA Champions League', '2014/15 — 10 gols', 'https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg', 'Dividiu a artilharia com Messi e Cristiano Ronaldo.', 5),
('artilheiro-da-copa-do-brasil-2010-11-gols', 'Artilharia', 'Artilheiro da Copa do Brasil', '2010 — 11 gols', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 'Marcou em campanha campeã do Santos.', 6),
('artilheiro-do-campeonato-paulista-2012-20-gols', 'Artilharia', 'Artilheiro do Campeonato Paulista', '2012 — 20 gols', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 'Temporada de enorme domínio estadual pelo Santos.', 7),
('artilheiro-da-libertadores-2012-8-gols', 'Artilharia', 'Artilheiro da Libertadores', '2012 — 8 gols', 'https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg', 'Destaque ofensivo continental pelo Santos.', 8),
('medalha-de-ouro-ol-mpica-rio-2016', 'Medalha', 'Medalha de Ouro Olímpica', 'Rio 2016', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg', 'Capitão do Brasil; marcou falta no tempo normal e converteu o pênalti decisivo na final contra a Alemanha.', 9),
('medalha-de-prata-ol-mpica-londres-2012', 'Medalha', 'Medalha de Prata Olímpica', 'Londres 2012', 'https://commons.wikimedia.org/wiki/Special:FilePath/2012%20Summer%20Olympics%20football%20men%20Brazil%20team.jpg', 'Vice-campeão olímpico com a Seleção Brasileira Sub-23.', 10),
('artilheiro-da-copa-do-brasil-2010', 'Artilharia', 'Artilheiro da Copa do Brasil', '2010', 'https://commons.wikimedia.org/wiki/Special:FilePath/Copa%20do%20Brasil%20trophy.jpg', 'Neymar terminou como artilheiro da competição no ano em que o Santos foi campeão.', 11),
('bola-de-ouro-da-copa-das-confedera-es-2013', 'Seleção / Torneio', 'Bola de Ouro da Copa das Confederações', '2013', 'https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg', 'Eleito melhor jogador da Copa das Confederações de 2013.', 12),
('chuteira-de-bronze-da-copa-das-confedera-es-2013', 'Seleção / Torneio', 'Chuteira de Bronze da Copa das Confederações', '2013', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20contra%20uruguai.jpg', 'Reconhecimento individual pelo desempenho ofensivo na competição.', 13),
('fifa-fifpro-world11-2015-2017', 'FIFA', 'FIFA FIFPro World11', '2015, 2017', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg', 'Presença em seleções globais de melhores jogadores do ano.', 14)
ON CONFLICT (slug) DO UPDATE SET classification=excluded.classification, title=excluded.title, years=excluded.years, image_url=excluded.image_url, detail=excluded.detail, sort_order=excluded.sort_order;
INSERT INTO neymar_opponents (slug, name, category, context, goals, sort_order) VALUES
('brasil-principal-estados-unidos', 'Estados Unidos', 'Seleção', 'Brasil principal', 4, 1),
('brasil-principal-argentina', 'Argentina', 'Seleção', 'Brasil principal', 3, 2),
('brasil-principal-m-xico', 'México', 'Seleção', 'Brasil principal', 4, 3),
('brasil-principal-jap-o', 'Japão', 'Seleção', 'Brasil principal', 9, 4),
('brasil-principal-col-mbia', 'Colômbia', 'Seleção', 'Brasil principal', 4, 5),
('brasil-principal-bol-via', 'Bolívia', 'Seleção', 'Brasil principal', 5, 6),
('brasil-principal-chile', 'Chile', 'Seleção', 'Brasil principal', 2, 7),
('brasil-principal-espanha', 'Espanha', 'Seleção', 'Brasil principal', 1, 8),
('brasil-principal-it-lia', 'Itália', 'Seleção', 'Brasil principal', 1, 9),
('brasil-principal-cro-cia', 'Croácia', 'Seleção', 'Brasil principal', 3, 10),
('brasil-principal-cameroon', 'Cameroon', 'Seleção', 'Brasil principal', 1, 11),
('brasil-principal-peru', 'Peru', 'Seleção', 'Brasil principal', 5, 12),
('brasil-principal-equador', 'Equador', 'Seleção', 'Brasil principal', 2, 13),
('brasil-principal-uruguai', 'Uruguai', 'Seleção', 'Brasil principal', 2, 14),
('brasil-principal-paraguai', 'Paraguai', 'Seleção', 'Brasil principal', 2, 15),
('brasil-principal-costa-rica', 'Costa Rica', 'Seleção', 'Brasil principal', 1, 16),
('brasil-principal-ustria', 'Áustria', 'Seleção', 'Brasil principal', 1, 17),
('brasil-principal-coreia-do-sul', 'Coreia do Sul', 'Seleção', 'Brasil principal', 5, 18),
('brasil-principal-tun-sia', 'Tunísia', 'Seleção', 'Brasil principal', 1, 19),
('brasil-principal-venezuela', 'Venezuela', 'Seleção', 'Brasil principal', 1, 20),
('brasil-principal-gana', 'Gana', 'Seleção', 'Brasil principal', 1, 21),
('brasil-principal-s-rvia', 'Sérvia', 'Seleção', 'Brasil principal', 1, 22),
('brasil-ol-mpico-honduras-ol-mpica', 'Honduras Olímpica', 'Seleção', 'Brasil Olímpico', 1, 23),
('brasil-ol-mpico-alemanha-ol-mpica', 'Alemanha Olímpica', 'Seleção', 'Brasil Olímpico', 1, 24),
('copa-am-rica-centen-rio-haiti', 'Haiti', 'Seleção', 'Copa América Centenário', 1, 25),
('santos-flamengo', 'Flamengo', 'Clube brasileiro', 'Santos', 3, 26),
('santos-palmeiras', 'Palmeiras', 'Clube brasileiro', 'Santos', 6, 27),
('santos-s-o-paulo', 'São Paulo', 'Clube brasileiro', 'Santos', 5, 28),
('santos-corinthians', 'Corinthians', 'Clube brasileiro', 'Santos', 4, 29),
('santos-atl-tico-mg', 'Atlético-MG', 'Clube brasileiro', 'Santos', 3, 30),
('santos-cruzeiro', 'Cruzeiro', 'Clube brasileiro', 'Santos', 3, 31),
('santos-gr-mio', 'Grêmio', 'Clube brasileiro', 'Santos', 2, 32),
('santos-internacional', 'Internacional', 'Clube brasileiro', 'Santos', 2, 33),
('santos-fluminense', 'Fluminense', 'Clube brasileiro', 'Santos', 2, 34),
('santos-vasco', 'Vasco', 'Clube brasileiro', 'Santos', 2, 35),
('santos-botafogo', 'Botafogo', 'Clube brasileiro', 'Santos', 2, 36),
('santos-athletico-pr', 'Athletico-PR', 'Clube brasileiro', 'Santos', 2, 37),
('santos-cear', 'Ceará', 'Clube brasileiro', 'Santos', 2, 38),
('santos-ava', 'Avaí', 'Clube brasileiro', 'Santos', 2, 39),
('santos-vit-ria', 'Vitória', 'Clube brasileiro', 'Santos', 2, 40),
('santos-mogi-mirim', 'Mogi Mirim', 'Clube brasileiro', 'Santos', 1, 41),
('santos-rio-branco-ac', 'Rio Branco-AC', 'Clube brasileiro', 'Santos', 1, 42),
('santos-santo-andr', 'Santo André', 'Clube brasileiro', 'Santos', 1, 43),
('santos-guarani', 'Guarani', 'Clube brasileiro', 'Santos', 1, 44),
('santos-ponte-preta', 'Ponte Preta', 'Clube brasileiro', 'Santos', 1, 45),
('santos-oeste', 'Oeste', 'Clube brasileiro', 'Santos', 1, 46),
('santos-ituano', 'Ituano', 'Clube brasileiro', 'Santos', 1, 47),
('santos-linense', 'Linense', 'Clube brasileiro', 'Santos', 1, 48),
('santos-libertadores-pe-arol', 'Peñarol', 'Clube sul-americano', 'Santos / Libertadores', 1, 49),
('santos-libertadores-cerro-porte-o', 'Cerro Porteño', 'Clube sul-americano', 'Santos / Libertadores', 2, 50),
('santos-libertadores-bol-var', 'Bolívar', 'Clube sul-americano', 'Santos / Libertadores', 1, 51),
('santos-libertadores-the-strongest', 'The Strongest', 'Clube sul-americano', 'Santos / Libertadores', 1, 52),
('santos-libertadores-v-lez-sarsfield', 'Vélez Sarsfield', 'Clube sul-americano', 'Santos / Libertadores', 1, 53),
('barcelona-real-madrid', 'Real Madrid', 'Clube europeu', 'Barcelona', 3, 54),
('barcelona-atl-tico-de-madrid', 'Atlético de Madrid', 'Clube europeu', 'Barcelona', 7, 55),
('barcelona-villarreal', 'Villarreal', 'Clube europeu', 'Barcelona', 5, 56),
('barcelona-juventus', 'Juventus', 'Clube europeu', 'Barcelona', 1, 57),
('barcelona-psg', 'PSG', 'Clube europeu', 'Barcelona', 6, 58),
('barcelona-bayern-de-munique', 'Bayern de Munique', 'Clube europeu', 'Barcelona', 2, 59),
('barcelona-manchester-city', 'Manchester City', 'Clube europeu', 'Barcelona', 4, 60),
('barcelona-psg-celtic', 'Celtic', 'Clube europeu', 'Barcelona / PSG', 4, 61),
('barcelona-ajax', 'Ajax', 'Clube europeu', 'Barcelona', 3, 62),
('barcelona-arsenal', 'Arsenal', 'Clube europeu', 'Barcelona', 1, 63),
('barcelona-sevilla', 'Sevilla', 'Clube europeu', 'Barcelona', 4, 64),
('barcelona-athletic-club', 'Athletic Club', 'Clube europeu', 'Barcelona', 5, 65),
('barcelona-espanyol', 'Espanyol', 'Clube europeu', 'Barcelona', 3, 66),
('barcelona-granada', 'Granada', 'Clube europeu', 'Barcelona', 3, 67),
('barcelona-rayo-vallecano', 'Rayo Vallecano', 'Clube europeu', 'Barcelona', 4, 68),
('barcelona-celta-de-vigo', 'Celta de Vigo', 'Clube europeu', 'Barcelona', 2, 69),
('barcelona-deportivo-la-coru-a', 'Deportivo La Coruña', 'Clube europeu', 'Barcelona', 2, 70),
('barcelona-elche', 'Elche', 'Clube europeu', 'Barcelona', 3, 71),
('barcelona-eibar', 'Eibar', 'Clube europeu', 'Barcelona', 2, 72),
('barcelona-getafe', 'Getafe', 'Clube europeu', 'Barcelona', 2, 73),
('barcelona-las-palmas', 'Las Palmas', 'Clube europeu', 'Barcelona', 2, 74),
('barcelona-m-laga', 'Málaga', 'Clube europeu', 'Barcelona', 1, 75),
('barcelona-real-sociedad', 'Real Sociedad', 'Clube europeu', 'Barcelona', 1, 76),
('barcelona-borussia-m-nchengladbach', 'Borussia Mönchengladbach', 'Clube europeu', 'Barcelona', 1, 77),
('barcelona-bate-borisov', 'BATE Borisov', 'Clube europeu', 'Barcelona', 1, 78),
('psg-olympique-de-marseille', 'Olympique de Marseille', 'Clube europeu', 'PSG', 3, 79),
('psg-monaco', 'Monaco', 'Clube europeu', 'PSG', 4, 80),
('psg-lyon', 'Lyon', 'Clube europeu', 'PSG', 3, 81),
('psg-lille', 'Lille', 'Clube europeu', 'PSG', 4, 82),
('psg-rennes', 'Rennes', 'Clube europeu', 'PSG', 3, 83),
('psg-nice', 'Nice', 'Clube europeu', 'PSG', 3, 84),
('psg-bordeaux', 'Bordeaux', 'Clube europeu', 'PSG', 4, 85),
('psg-guingamp', 'Guingamp', 'Clube europeu', 'PSG', 5, 86),
('psg-toulouse', 'Toulouse', 'Clube europeu', 'PSG', 3, 87),
('psg-amiens', 'Amiens', 'Clube europeu', 'PSG', 2, 88),
('psg-dijon', 'Dijon', 'Clube europeu', 'PSG', 3, 89),
('psg-montpellier', 'Montpellier', 'Clube europeu', 'PSG', 4, 90),
('psg-angers', 'Angers', 'Clube europeu', 'PSG', 2, 91),
('psg-metz', 'Metz', 'Clube europeu', 'PSG', 2, 92),
('psg-nantes', 'Nantes', 'Clube europeu', 'PSG', 2, 93),
('psg-saint-tienne', 'Saint-Étienne', 'Clube europeu', 'PSG', 2, 94),
('psg-caen', 'Caen', 'Clube europeu', 'PSG', 1, 95),
('psg-strasbourg', 'Strasbourg', 'Clube europeu', 'PSG', 1, 96),
('psg-manchester-united', 'Manchester United', 'Clube europeu', 'PSG', 3, 97),
('psg-liverpool', 'Liverpool', 'Clube europeu', 'PSG', 1, 98),
('psg-istanbul-ba-ak-ehir', 'Istanbul Başakşehir', 'Clube europeu', 'PSG', 3, 99),
('psg-estrela-vermelha', 'Estrela Vermelha', 'Clube europeu', 'PSG', 3, 100),
('psg-rb-leipzig', 'RB Leipzig', 'Clube europeu', 'PSG', 1, 101),
('al-hilal-nassaji-mazandaran', 'Nassaji Mazandaran', 'Clube asiático', 'Al-Hilal', 1, 102)
ON CONFLICT (slug) DO UPDATE SET name=excluded.name, category=excluded.category, context=excluded.context, goals=excluded.goals, sort_order=excluded.sort_order;
INSERT INTO neymar_media_photos (slug, title, tag, image_url, credit, description, sort_order) VALUES
('neymar-no-auge-pelo-barcelona', 'Neymar no auge pelo Barcelona', 'Barcelona', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg', 'Wikimedia Commons / Alex Fau', 'Imagem real usada como referência visual da fase ou conquista.', 1),
('apresenta-o-no-barcelona', 'Apresentação no Barcelona', 'Barcelona', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Barcelona%20presentation%202.jpg', 'Wikimedia Commons', 'Imagem real usada como referência visual da fase ou conquista.', 2),
('brasil-e-ouro-ol-mpico', 'Brasil e ouro olímpico', 'Seleção', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg', 'Agência Brasil / Wikimedia Commons', 'Imagem real usada como referência visual da fase ou conquista.', 3),
('neymar-pela-sele-o', 'Neymar pela Seleção', 'Seleção', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20contra%20uruguai.jpg', 'Wikimedia Commons', 'Imagem real usada como referência visual da fase ou conquista.', 4),
('camisa-do-psg', 'Camisa do PSG', 'PSG', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg', 'Wikimedia Commons', 'Imagem real usada como referência visual da fase ou conquista.', 5),
('trof-u-champions-league', 'Troféu Champions League', 'Troféu', 'https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg', 'Wikimedia Commons', 'Imagem real usada como referência visual da fase ou conquista.', 6),
('trof-u-libertadores', 'Troféu Libertadores', 'Troféu', 'https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg', 'Wikimedia Commons', 'Imagem real usada como referência visual da fase ou conquista.', 7),
('copa-das-confedera-es-2013', 'Copa das Confederações 2013', 'Seleção', 'https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg', 'Wikimedia Commons', 'Imagem real usada como referência visual da fase ou conquista.', 8),
('neymar-no-psg-apresenta-o-oficial-9', 'Neymar no PSG — apresentação oficial', 'PSG', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg', 'Wikimedia Commons / Antoine Dellenbach', 'Apresentação no Paris Saint-Germain em agosto de 2017.', 9),
('neymar-jovem-no-santos-10', 'Neymar jovem no Santos', 'Santos', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 'Wikimedia Commons', 'Imagem da fase de revelação no Santos.', 10),
('neymar-em-campo-pelo-barcelona-11', 'Neymar em campo pelo Barcelona', 'Barcelona', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg', 'Wikimedia Commons / Alex Fau', 'Fase do auge europeu no Barcelona.', 11),
('barcelona-apresenta-o-no-camp-nou-12', 'Barcelona — apresentação no Camp Nou', 'Barcelona', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Barcelona%20presentation%202.jpg', 'Wikimedia Commons', 'Chegada ao FC Barcelona.', 12),
('brasil-campanha-ol-mpica-13', 'Brasil — campanha olímpica', 'Seleção', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg', 'Agência Brasil / Wikimedia Commons', 'Neymar pela Seleção em 2016.', 13),
('copa-das-confedera-es-2013-14', 'Copa das Confederações 2013', 'Troféu', 'https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg', 'Wikimedia Commons', 'Brasil campeão em 2013.', 14),
('ta-a-da-champions-league-15', 'Taça da Champions League', 'Troféu', 'https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg', 'Wikimedia Commons', 'Representação da Champions League vencida em 2014/15.', 15),
('trof-u-da-copa-libertadores-16', 'Troféu da Copa Libertadores', 'Troféu', 'https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg', 'Wikimedia Commons', 'Representação do título continental vencido pelo Santos em 2011.', 16)
ON CONFLICT (slug) DO UPDATE SET title=excluded.title, tag=excluded.tag, image_url=excluded.image_url, credit=excluded.credit, description=excluded.description, sort_order=excluded.sort_order;
INSERT INTO neymar_media_videos (slug, title, classification, phase, platform, embed_url, external_url, description, sort_order) VALUES
('perfect-chaos-trailer', 'Neymar: The Perfect Chaos — Official Trailer', 'Documentário / Netflix', 'Carreira completa', 'YouTube / Netflix', 'https://www.youtube.com/embed/dpL5zS-PngE', 'https://www.youtube.com/watch?v=dpL5zS-PngE', 'Trailer oficial da docussérie da Netflix sobre Neymar, com carreira, família, bastidores e críticas.', 1),
('perfect-chaos-teaser', 'Neymar: The Perfect Chaos — Official Teaser', 'Documentário / Netflix', 'Carreira completa', 'YouTube / Netflix', 'https://www.youtube.com/embed/-MjLl8SpZ6c', 'https://www.youtube.com/watch?v=-MjLl8SpZ6c', 'Teaser oficial da série documental.', 2),
('caos-perfeito-trailer-br', 'Neymar: O Caos Perfeito — Trailer Oficial', 'Documentário / Netflix Brasil', 'Carreira completa', 'YouTube / Netflix Brasil', 'https://www.youtube.com/embed/HSC6htNW9co', 'https://www.youtube.com/watch?v=HSC6htNW9co', 'Trailer em português da série documental.', 3),
('netflix-serie', 'Neymar: O Caos Perfeito — página oficial', 'Série documental', 'Santos, Barcelona, PSG, Seleção e família', 'Netflix', NULL, 'https://www.netflix.com/br/title/81005126', 'Página oficial com episódios: Juninho, Neymar do Brasil e O Pai tá on.', 4),
('globoplay-trajetoria-santos', 'Escola, futsal, amigos e moicano: trajetória até o Santos', 'Reportagem documental', 'Infância, futsal e Santos', 'Globoplay / Esporte Espetacular', NULL, 'https://globoplay.globo.com/v/1686913/', 'Reportagem sobre a trajetória até o Santos, com escola, futsal e pessoas próximas.', 5),
('redbull-praia-grande-paris', 'Neymar Jr Childhood Documentary: Praia Grande to Paris', 'Documentário curto', 'Infância e ascensão', 'Red Bull', NULL, 'https://www.redbull.com/us-en/neymar-childhood-documentary', 'Documentário da Red Bull sobre a infância e o caminho até o estrelato.', 6),
('redbull-best-moments', 'Neymar Jr''s Best Moments With Red Bull', 'Vídeo / melhores momentos', 'Bastidores e carreira', 'YouTube / Red Bull', 'https://www.youtube.com/embed/Ap9aruq1eb0', 'https://www.youtube.com/watch?v=Ap9aruq1eb0', 'Compilado da Red Bull com momentos de Neymar ao longo da carreira.', 7),
('redbull-neymars-five', 'Red Bull Neymar Jr''s Five World Final', 'Evento / futsal society', 'Projeto Neymar Jr e futebol 5', 'YouTube / Red Bull', 'https://www.youtube.com/embed/3lXjGmRiQxo', 'https://www.youtube.com/watch?v=3lXjGmRiQxo', 'Vídeo relacionado ao torneio de futebol 5 ligado ao Instituto Projeto Neymar Jr.', 8)
ON CONFLICT (slug) DO UPDATE SET title=excluded.title, classification=excluded.classification, phase=excluded.phase, platform=excluded.platform, embed_url=excluded.embed_url, external_url=excluded.external_url, description=excluded.description, sort_order=excluded.sort_order;
INSERT INTO neymar_transfers_contracts (slug, date_label, from_team, to_team, movement_type, reported_fee, estimated_salary, market_value, detail, source_label, source_url, sort_order) VALUES
('real-madrid-teste-2006', '2006', 'Base no Brasil', 'Real Madrid — teste não concluído', 'Teste / proposta', 'Não concretizado', 'Não divulgado', '—', 'Aos 14 anos, Neymar treinou no Real Madrid e teve documentação de inscrição, mas a negociação não avançou. O episódio é importante para mostrar o assédio europeu antes da explosão no Santos.', 'AS / El País / relatos históricos', 'https://as.com/futbol/2013/09/05/primera/1378335347_835605.html', 1),
('santos-profissional-2009', '2009', 'Base do Santos', 'Santos FC profissional', 'Promoção ao profissional', '—', 'Base inicial, não pública', '—', 'Estreia profissional no clube formador.', 'Transfermarkt / biografias públicas', 'https://www.transfermarkt.com/neymar/profil/spieler/68290', 2),
('santos-barcelona-2013', 'Junho/2013', 'Santos FC', 'FC Barcelona', 'Transferência internacional', '€57,1 mi divulgados; custo total depois informado como €86,2 mi por fontes públicas', 'Valores contratuais não consolidados no site; consultar fonte salarial', '€50 mi aprox. na época', 'Chegada ao Barcelona em 2013 e início da fase MSN. O valor do negócio teve controvérsia pública e variações conforme critérios de contabilização.', 'Catalan News / Guinness / ESPN', 'https://www.catalannews.com/sports/item/fc-barcelona-offers-detailed-figures-of-neymar-transfer', 3),
('barcelona-psg-2017', 'Agosto/2017', 'FC Barcelona', 'Paris Saint-Germain', 'Multa rescisória / recorde mundial', '€222 mi', 'Estimativas variam por fonte; PSG elevou Neymar ao topo salarial mundial', '€100 mi+', 'Transferência mais cara da história: PSG pagou a multa rescisória ao Barcelona.', 'Guinness World Records / Transfermarkt', 'https://www.guinnessworldrecords.com/world-records/most-expensive-football-player-%28soccer-player%29-combined-transfer-fees', 4),
('psg-alhilal-2023', 'Agosto/2023', 'Paris Saint-Germain', 'Al-Hilal SFC', 'Transferência', 'cerca de €90 mi / US$97,6 mi', 'aprox. US$80–100 mi/ano em estimativas públicas', '€60 mi aprox.', 'Capítulo saudita; passagem reduzida por lesão grave sofrida pela Seleção em 2023.', 'Reuters / Front Office Sports', 'https://www.reuters.com/sports/soccer/brazil-forward-neymar-return-santos-2025-01-30/', 5),
('alhilal-santos-2025', 'Jan/2025', 'Al-Hilal SFC', 'Santos FC', 'Rescisão + retorno', 'Sem taxa de transferência após acordo/rescisão', 'Base menor + participação comercial, conforme reportagens', '€15 mi aprox.', 'Retorno ao clube formador após acordo para deixar o Al-Hilal.', 'Reuters', 'https://www.reuters.com/sports/soccer/brazil-forward-neymar-return-santos-2025-01-30/', 6),
('santos-renovacao-2026', 'Jan/2026', 'Santos FC', 'Santos FC', 'Renovação contratual', '—', 'estimativas variam; contrato até o fim de 2026', '€8 mi aprox.', 'Extensão de contrato com o Santos até o fim de 2026.', 'Reuters / Capology como salário estimado', 'https://www.reuters.com/sports/soccer/neymar-extends-santos-deal-through-2026-eyeing-world-cup-return-2026-01-07/', 7)
ON CONFLICT (slug) DO UPDATE SET date_label=excluded.date_label, from_team=excluded.from_team, to_team=excluded.to_team, movement_type=excluded.movement_type, reported_fee=excluded.reported_fee, estimated_salary=excluded.estimated_salary, market_value=excluded.market_value, detail=excluded.detail, source_label=excluded.source_label, source_url=excluded.source_url, sort_order=excluded.sort_order;
INSERT INTO neymar_sources (slug, label, url, sort_order) VALUES
('transfermarkt-perfil-gols-p-naltis-e-conquistas', 'Transfermarkt — Perfil, gols, pênaltis e conquistas', 'https://www.transfermarkt.com/neymar', 1),
('statbunker-tipos-de-gol-por-p-cabe-a-falta-e-p-nalti', 'StatBunker — tipos de gol por pé, cabeça, falta e pênalti', 'https://www.statbunker.com/players/getPlayerStats?player_id=37759', 2),
('wikimedia-commons-imagens-reais-em-licen-as-abertas', 'Wikimedia Commons — imagens reais em licenças abertas', 'https://commons.wikimedia.org/wiki/Neymar', 3),
('wikipedia-t-tulos-e-estat-sticas-gerais', 'Wikipedia — títulos e estatísticas gerais', 'https://pt.wikipedia.org/wiki/Neymar', 4),
('reuters-retorno-ao-santos-em-2025', 'Reuters — retorno ao Santos em 2025', 'https://www.reuters.com/sports/soccer/brazil-forward-neymar-return-santos-2025-01-30/', 5),
('reuters-contrato-santos-at-2026', 'Reuters — contrato Santos até 2026', 'https://www.reuters.com/sports/soccer/neymar-extends-santos-deal-through-2026-eyeing-world-cup-return-2026-01-07/', 6),
('reuters-80-gols-e-58-assist-ncias-pelo-brasil', 'Reuters — 80 gols e 58 assistências pelo Brasil', 'https://www.reuters.com/sports/soccer/neymar-signals-brazil-farewell-after-shock-world-cup-exit-norway-2026-07-06/', 7),
('guinness-transfer-ncias-combinadas-e-recorde-psg', 'Guinness — transferências combinadas e recorde PSG', 'https://www.guinnessworldrecords.com/world-records/most-expensive-football-player-%28soccer-player%29-combined-transfer-fees', 8),
('capology-sal-rios-estimados-com-aviso-de-estimativa', 'Capology — salários estimados, com aviso de estimativa', 'https://www.capology.com/player/neymar-33639/', 9),
('netflix-neymar-o-caos-perfeito', 'Netflix — Neymar: O Caos Perfeito', 'https://www.netflix.com/br/title/81005126', 10),
('red-bull-childhood-documentary', 'Red Bull — Childhood Documentary', 'https://www.redbull.com/us-en/neymar-childhood-documentary', 11),
('globoplay-trajet-ria-at-o-santos', 'Globoplay — trajetória até o Santos', 'https://globoplay.globo.com/v/1686913/', 12)
ON CONFLICT (slug) DO UPDATE SET label=excluded.label, url=excluded.url, sort_order=excluded.sort_order;


-- Fotos adicionais com companheiros, cadastradas no Supabase.
INSERT INTO neymar_media_photos (slug, title, tag, image_url, credit, description, sort_order) VALUES
('msn-foto-iconica-fcbarcelona', 'MSN — Neymar, Messi e Suárez em foto icônica', 'Companheiros', 'https://www.fcbarcelona.com/photo-resources/2019/03/13/5c882168-e50b-4fda-a2b6-6287312fc385/VpEMnXlt.jpg?height=750&width=1200', 'FC Barcelona / imagem externa pública', 'Foto oficial destacada pelo FC Barcelona com Neymar, Messi e Suárez correndo juntos após gol contra o Atlético de Madrid.', 100),
('msn-laliga-costas-2016', 'MSN — trio por trás das camisas 11, 10 e 9', 'Companheiros', 'https://assets.laliga.com/assets/2020/01/21/large/b7005fde4423215334_q3a7045_1.jpeg', 'LALIGA / imagem externa pública', 'Neymar, Messi e Suárez juntos durante a fase de domínio do Barcelona na LaLiga.', 101),
('msn-laliga-comemoracao-2016', 'Neymar comemorando com Messi e Suárez', 'Companheiros', 'https://assets.laliga.com/assets/201602/w_900x700_14222900_q3a3973_1.jpg', 'LALIGA / imagem externa pública', 'Comemoração do trio MSN em jogo pelo Barcelona.', 102)
ON CONFLICT (slug) DO UPDATE SET title=excluded.title, tag=excluded.tag, image_url=excluded.image_url, credit=excluded.credit, description=excluded.description, sort_order=excluded.sort_order;

INSERT INTO neymar_sources (slug, label, url, sort_order) VALUES
('fc-barcelona-foto-iconica-msn', 'FC Barcelona — foto icônica de Suárez, Neymar e Messi', 'https://www.fcbarcelona.com/en/news/1103799/suarez-neymar-and-messi-in-an-iconic-photograph', 200),
('laliga-glory-history-msn', 'LALIGA — Glory and history for prolific MSN', 'https://www.laliga.com/en-GB/news/glory-and-history-for-prolific-msn', 201)
ON CONFLICT (slug) DO UPDATE SET label=excluded.label, url=excluded.url, sort_order=excluded.sort_order;
