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

insert into neymar_team_crests
(slug, team_name, abbreviation, period_label, focus_label, logo_url, theme_color, link_url, sort_order)
values
('santos-fc', 'Santos FC', 'SAN', '2009–2013 • 2025–', 'Formação e retorno', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Santos_logo.svg', '#ffffff', 'clubes.html', 1),
('fc-barcelona', 'FC Barcelona', 'BAR', '2013–2017', 'Auge europeu / MSN', 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', '#A50044', 'clubes.html', 2),
('brasil-selecao', 'Seleção Brasileira', 'BRA', '2010–', 'Camisa 10 do Brasil', 'https://upload.wikimedia.org/wikipedia/en/0/05/Brazilian_Football_Confederation_logo.svg', '#009B3A', 'selecao.html', 3),
('psg', 'Paris Saint-Germain', 'PSG', '2017–2023', 'Recorde mundial', 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg', '#004170', 'clubes.html', 4),
('al-hilal', 'Al-Hilal', 'HIL', '2023–2025', 'Arábia Saudita', 'https://upload.wikimedia.org/wikipedia/en/1/12/Al_Hilal_SFC_logo.svg', '#0057B8', 'clubes.html', 5)
on conflict (slug) do update set
  team_name=excluded.team_name,
  abbreviation=excluded.abbreviation,
  period_label=excluded.period_label,
  focus_label=excluded.focus_label,
  logo_url=excluded.logo_url,
  theme_color=excluded.theme_color,
  link_url=excluded.link_url,
  sort_order=excluded.sort_order,
  updated_at=now();

insert into neymar_sources (slug, label, url, sort_order) values
('club-crests-wikimedia-wikipedia', 'Escudos: URLs públicas Wikimedia/Wikipedia usadas na faixa superior', 'https://commons.wikimedia.org/', 350)
on conflict (slug) do update set label=excluded.label, url=excluded.url, sort_order=excluded.sort_order;

select 'neymar_team_crests' as tabela, count(*) as registros from neymar_team_crests;
