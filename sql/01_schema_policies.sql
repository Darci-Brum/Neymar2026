
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


-- Tabela da faixa superior de escudos/fases
-- 06_tema_escudos_hotfix.sql
-- Rode este arquivo no Supabase SQL Editor para adicionar a faixa de escudos no topo
-- e cadastrar os times/fases principais de Neymar Jr. O site lê esta tabela via REST API.

create table if not exists neymar_team_crests (
  slug text primary key,
  team_name text not null,
  abbreviation text,
  period_label text,
  focus_label text,
  logo_url text,
  theme_color text,
  link_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

alter table neymar_team_crests enable row level security;
drop policy if exists "public read neymar_team_crests" on neymar_team_crests;
create policy "public read neymar_team_crests" on neymar_team_crests for select using (true);
grant select on neymar_team_crests to anon, authenticated;

