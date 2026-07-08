-- HOTFIX: leitura pública + fotos/vídeos de mídia
-- Rode este arquivo no Supabase SQL Editor se as tabelas existem, mas o site mostra "Sem dados".

-- 1) Grants necessários para a Data API com chave publishable/anon.
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert on public.site_feedback, public.site_page_views to anon, authenticated;

-- 2) RLS + policies públicas de leitura para as tabelas do site.
do $$
declare
  t text;
begin
  foreach t in array array[
    'neymar_profile',
    'neymar_stat_cards',
    'neymar_club_passages',
    'neymar_national_teams',
    'neymar_goal_methods',
    'neymar_goal_assist_by_team',
    'neymar_important_goals',
    'neymar_career_milestones',
    'neymar_titles',
    'neymar_awards',
    'neymar_opponents',
    'neymar_media_photos',
    'neymar_media_videos',
    'neymar_transfers_contracts',
    'neymar_sources'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', 'public read ' || t, t);
    execute format('create policy %I on public.%I for select to anon, authenticated using (true)', 'public read ' || t, t);
  end loop;
end $$;

-- 3) Reinsere/atualiza fotos de mídia. Isso não apaga o que você já tem.
insert into public.neymar_media_photos
(slug, title, tag, image_url, credit, description, sort_order) values
('neymar-no-auge-pelo-barcelona', 'Neymar no auge pelo Barcelona', 'Barcelona', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20-%20FC%20Barcelona%20-%202015.jpg', 'Wikimedia Commons / Alex Fau', 'Fase de auge europeu no Barcelona.', 1),
('apresentacao-no-barcelona', 'Apresentação no Barcelona', 'Barcelona', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Barcelona%20presentation%202.jpg', 'Wikimedia Commons', 'Chegada ao FC Barcelona em 2013.', 2),
('msn-foto-iconica-fcbarcelona', 'MSN — Neymar, Messi e Suárez em foto icônica', 'Companheiros', 'https://www.fcbarcelona.com/photo-resources/2019/03/13/5c882168-e50b-4fda-a2b6-6287312fc385/VpEMnXlt.jpg?height=750&width=1200', 'FC Barcelona / imagem externa pública', 'Foto oficial destacada pelo FC Barcelona com Neymar, Messi e Suárez.', 3),
('msn-laliga-costas-2016', 'MSN — trio por trás das camisas 11, 10 e 9', 'Companheiros', 'https://assets.laliga.com/assets/2020/01/21/large/b7005fde4423215334_q3a7045_1.jpeg', 'LALIGA / imagem externa pública', 'Neymar, Messi e Suárez juntos na fase MSN.', 4),
('msn-laliga-comemoracao-2016', 'Neymar comemorando com Messi e Suárez', 'Companheiros', 'https://assets.laliga.com/assets/201602/w_900x700_14222900_q3a3973_1.jpg', 'LALIGA / imagem externa pública', 'Comemoração do trio MSN em jogo pelo Barcelona.', 5),
('brasil-ouro-olimpico', 'Brasil e ouro olímpico', 'Seleção', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Rio%202016.jpg', 'Agência Brasil / Wikimedia Commons', 'Fase do ouro olímpico com a Seleção Brasileira.', 6),
('neymar-pela-selecao', 'Neymar pela Seleção Brasileira', 'Seleção', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20contra%20uruguai.jpg', 'Wikimedia Commons', 'Neymar em jogo pela Seleção.', 7),
('neymar-no-psg', 'Neymar no PSG', 'PSG', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20PSG.jpg', 'Wikimedia Commons', 'Passagem pelo Paris Saint-Germain.', 8),
('neymar-jovem-no-santos', 'Neymar jovem no Santos', 'Santos', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Junior%20the%20Future%20of%20Brazil%202.jpg', 'Wikimedia Commons', 'Fase de revelação no Santos.', 9),
('trofeu-champions-league', 'Troféu Champions League', 'Troféu', 'https://commons.wikimedia.org/wiki/Special:FilePath/Champions%20League%20Trophy%20%2852736201132%29.jpg', 'Wikimedia Commons', 'Representação do título da Champions League 2014/15.', 10),
('trofeu-libertadores', 'Troféu Libertadores', 'Troféu', 'https://commons.wikimedia.org/wiki/Special:FilePath/Trof%C3%A9u%20da%20Copa%20Libertadores%20da%20Am%C3%A9rica%20de%202023.jpg', 'Wikimedia Commons', 'Representação do título continental vencido pelo Santos.', 11),
('copa-das-confederacoes-2013', 'Copa das Confederações 2013', 'Seleção', 'https://commons.wikimedia.org/wiki/Special:FilePath/Confed.Cup2013Champions.jpg', 'Wikimedia Commons', 'Brasil campeão da Copa das Confederações 2013.', 12)
on conflict (slug) do update set
  title=excluded.title,
  tag=excluded.tag,
  image_url=excluded.image_url,
  credit=excluded.credit,
  description=excluded.description,
  sort_order=excluded.sort_order;

-- 4) Reinsere/atualiza vídeos/documentários.
insert into public.neymar_media_videos
(slug, title, classification, phase, platform, embed_url, external_url, description, sort_order) values
('perfect-chaos-trailer', 'Neymar: The Perfect Chaos — Official Trailer', 'Documentário / Netflix', 'Carreira completa', 'YouTube / Netflix', 'https://www.youtube.com/embed/dpL5zS-PngE', 'https://www.youtube.com/watch?v=dpL5zS-PngE', 'Trailer oficial da docussérie da Netflix sobre Neymar.', 1),
('perfect-chaos-teaser', 'Neymar: The Perfect Chaos — Official Teaser', 'Documentário / Netflix', 'Carreira completa', 'YouTube / Netflix', 'https://www.youtube.com/embed/-MjLl8SpZ6c', 'https://www.youtube.com/watch?v=-MjLl8SpZ6c', 'Teaser oficial da série documental.', 2),
('caos-perfeito-trailer-br', 'Neymar: O Caos Perfeito — Trailer Oficial', 'Documentário / Netflix Brasil', 'Carreira completa', 'YouTube / Netflix Brasil', 'https://www.youtube.com/embed/HSC6htNW9co', 'https://www.youtube.com/watch?v=HSC6htNW9co', 'Trailer em português da série documental.', 3),
('netflix-serie', 'Neymar: O Caos Perfeito — página oficial', 'Série documental', 'Santos, Barcelona, PSG, Seleção e família', 'Netflix', null, 'https://www.netflix.com/br/title/81005126', 'Página oficial da série documental.', 4),
('globoplay-trajetoria-santos', 'Escola, futsal, amigos e moicano: trajetória até o Santos', 'Reportagem documental', 'Infância, futsal e Santos', 'Globoplay / Esporte Espetacular', null, 'https://globoplay.globo.com/v/1686913/', 'Reportagem sobre a trajetória até o Santos.', 5),
('redbull-praia-grande-paris', 'Neymar Jr Childhood Documentary: Praia Grande to Paris', 'Documentário curto', 'Infância e ascensão', 'Red Bull', null, 'https://www.redbull.com/us-en/neymar-childhood-documentary', 'Documentário da Red Bull sobre a infância e ascensão.', 6),
('redbull-best-moments', 'Neymar Jr''s Best Moments With Red Bull', 'Vídeo / melhores momentos', 'Bastidores e carreira', 'YouTube / Red Bull', 'https://www.youtube.com/embed/Ap9aruq1eb0', 'https://www.youtube.com/watch?v=Ap9aruq1eb0', 'Compilado da Red Bull com momentos da carreira.', 7)
on conflict (slug) do update set
  title=excluded.title,
  classification=excluded.classification,
  phase=excluded.phase,
  platform=excluded.platform,
  embed_url=excluded.embed_url,
  external_url=excluded.external_url,
  description=excluded.description,
  sort_order=excluded.sort_order;

-- 5) Fontes relacionadas a mídia.
insert into public.neymar_sources (slug, label, url, sort_order) values
('fc-barcelona-foto-iconica-msn', 'FC Barcelona — foto icônica de Suárez, Neymar e Messi', 'https://www.fcbarcelona.com/en/news/1103799/suarez-neymar-and-messi-in-an-iconic-photograph', 200),
('laliga-glory-history-msn', 'LALIGA — Glory and history for prolific MSN', 'https://www.laliga.com/en-GB/news/glory-and-history-for-prolific-msn', 201),
('netflix-neymar-o-caos-perfeito', 'Netflix — Neymar: O Caos Perfeito', 'https://www.netflix.com/br/title/81005126', 202),
('red-bull-childhood-documentary', 'Red Bull — Childhood Documentary', 'https://www.redbull.com/us-en/neymar-childhood-documentary', 203),
('globoplay-trajetoria-ate-o-santos', 'Globoplay — trajetória até o Santos', 'https://globoplay.globo.com/v/1686913/', 204)
on conflict (slug) do update set
  label=excluded.label,
  url=excluded.url,
  sort_order=excluded.sort_order;

-- 6) Conferência final. O resultado precisa mostrar registros > 0.
select 'neymar_media_photos' as tabela, count(*) as registros from public.neymar_media_photos
union all
select 'neymar_media_videos' as tabela, count(*) as registros from public.neymar_media_videos
union all
select 'neymar_sources' as tabela, count(*) as registros from public.neymar_sources;
