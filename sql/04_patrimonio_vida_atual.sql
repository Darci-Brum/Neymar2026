-- 04_patrimonio_vida_atual.sql
-- Rode este arquivo no Supabase SQL Editor para adicionar as novas abas:
-- Patrimônio, bens divulgados e vida atual/família.

create table if not exists neymar_wealth_estimates (
  slug text primary key,
  label text not null,
  net_worth_usd numeric not null default 0,
  annual_earnings_usd numeric not null default 0,
  exchange_rate_brl numeric not null default 5.45,
  base_date date default current_date,
  source_label text,
  source_url text,
  method_note text,
  updated_at_label text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_assets (
  slug text primary key,
  category text not null,
  item_name text not null,
  estimated_value text,
  location text,
  status_label text,
  image_url text,
  description text,
  source_label text,
  source_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists neymar_family_life (
  slug text primary key,
  section text not null,
  title text not null,
  value text,
  date_label text,
  status_label text,
  image_url text,
  description text,
  source_label text,
  source_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create index if not exists idx_neymar_assets_category on neymar_assets(category);
create index if not exists idx_neymar_family_life_section on neymar_family_life(section);

alter table neymar_wealth_estimates enable row level security;
alter table neymar_assets enable row level security;
alter table neymar_family_life enable row level security;

drop policy if exists "public read neymar_wealth_estimates" on neymar_wealth_estimates;
drop policy if exists "public read neymar_assets" on neymar_assets;
drop policy if exists "public read neymar_family_life" on neymar_family_life;

create policy "public read neymar_wealth_estimates" on neymar_wealth_estimates for select using (true);
create policy "public read neymar_assets" on neymar_assets for select using (true);
create policy "public read neymar_family_life" on neymar_family_life for select using (true);

grant select on neymar_wealth_estimates to anon, authenticated;
grant select on neymar_assets to anon, authenticated;
grant select on neymar_family_life to anon, authenticated;

-- Patrimônio e contador:
-- net_worth_usd: estimativa pública/não auditada.
-- annual_earnings_usd: usado somente para calcular o contador visual por segundo/minuto/hora.
-- exchange_rate_brl: câmbio editável manualmente no Supabase.
insert into neymar_wealth_estimates (slug, label, net_worth_usd, annual_earnings_usd, exchange_rate_brl, base_date, source_label, source_url, method_note, updated_at_label, sort_order) values
('patrimonio-estimado-2026', 'Patrimônio estimado público — não auditado', 450000000, 76000000, 5.45, '2026-01-01', 'Estimativas públicas + Forbes 2025 earnings', 'https://www.forbes.com/profile/neymar/', 'O contador é uma projeção visual: patrimônio estimado + ganhos anuais estimados divididos por segundo. Não representa saldo bancário real nem dados privados.', 'Atualizado em 08/07/2026', 1)
on conflict (slug) do update set label=excluded.label, net_worth_usd=excluded.net_worth_usd, annual_earnings_usd=excluded.annual_earnings_usd, exchange_rate_brl=excluded.exchange_rate_brl, base_date=excluded.base_date, source_label=excluded.source_label, source_url=excluded.source_url, method_note=excluded.method_note, updated_at_label=excluded.updated_at_label, sort_order=excluded.sort_order;

insert into neymar_assets (slug, category, item_name, estimated_value, location, status_label, image_url, description, source_label, source_url, sort_order) values
('mangaratiba-portobello', 'Imóveis', 'Mansão em Mangaratiba / Portobello', 'aprox. R$ 28 mi / € 8 mi em reportagens de 2016', 'Mangaratiba, Rio de Janeiro, Brasil', 'Compra divulgada', null, 'Propriedade de alto padrão relatada publicamente, com suítes, heliponto/pier, área de lazer e estrutura de luxo. O imóvel voltou às notícias por obras e lago artificial.', 'AS / Architectural Digest / ABC News', 'https://as.com/futbol/2016/10/28/primera/1477668490_193205.html', 1),
('castelldefels-barcelona', 'Imóveis', 'Mansão em Castelldefels', 'aprox. US$ 5,2 mi conforme publicações', 'Castelldefels, região de Barcelona, Espanha', 'Compra divulgada', null, 'Imóvel associado à fase Barcelona, relatado em levantamentos sobre o portfólio imobiliário internacional de Neymar.', 'Architectural Digest', 'https://www.architecturaldigest.com/story/inside-neymars-international-real-estate-portfolio', 2),
('imovel-sao-paulo-2021', 'Imóveis', 'Propriedade em São Paulo', 'aprox. US$ 3 mi conforme publicações', 'São Paulo, Brasil', 'Compra divulgada', null, 'Propriedade de sete quartos e estrutura ampla citada em reportagens sobre seu portfólio imobiliário.', 'Architectural Digest', 'https://www.architecturaldigest.com/story/inside-neymars-international-real-estate-portfolio', 3),
('dubai-bugatti-penthouse', 'Imóveis', 'Penthouse Bugatti Residences em Dubai', 'aprox. £ 43 mi em reportagens', 'Dubai, Emirados Árabes Unidos', 'Reportado pela imprensa', null, 'Compra relatada por tabloides e portais internacionais; manter como item reportado, não como confirmação auditada.', 'The Sun / reportagens públicas', 'https://www.thesun.co.uk/sport/31814711/neymar-new-dubai-penthouse-al-hilal/', 4),
('yacht-nadine', 'Náutico', 'Iate Nadine / Azimut', 'aprox. € 3,5 mi a US$ 8 mi conforme fonte/ano', 'Brasil', 'Divulgado publicamente', null, 'Iate citado em reportagens sobre bens de Neymar e processos fiscais antigos. Valores variam por fonte e ano.', 'Boat International / AP / AS', 'https://www.boatinternational.com/yachts/news/neymars-yacht-seized-by-court--29441', 5),
('embraer-phenom-jato', 'Aeronaves', 'Jato particular Embraer Phenom 100E', 'aprox. US$ 4 mi a US$ 10 mi conforme fonte/ano', 'Brasil / viagens internacionais', 'Divulgado publicamente', null, 'Aeronave privada relatada publicamente. Alguns registros vieram à tona em reportagens sobre bloqueio judicial de bens em 2016.', 'AP News / AS / Scripps News', 'https://apnews.com/general-news-475d695dd6f2420a8f16d3c806fa2387', 6),
('hangar-rio', 'Aeronaves', 'Projeto de casa com hangar para jato', 'valor não consolidado', 'Rio de Janeiro, Brasil', 'Reportado pela imprensa', null, 'Reportagem da Folha citou projeto de casa com hangar para guardar jato privado, reforçando a ligação da estrutura com deslocamentos particulares.', 'Folha de S.Paulo', 'https://www1.folha.uol.com.br/internacional/en/sports/2018/01/1954105-neymar-to-build-house-with-hangar-in-rio-for-storing-private-jet.shtml', 7),
('colecao-carros-luxo', 'Carros', 'Coleção de carros de luxo', 'valores variam muito por modelo e ano', 'Brasil / Europa / Oriente Médio', 'Reportado pela imprensa', null, 'Coleção divulgada em reportagens com modelos como Audi R8, Audi RS7, Ferrari 458 Italia, Ferrari Purosangue, Rolls-Royce Ghost, Bentley, Mercedes G-Wagon e Aston Martin DBX. Lista não deve ser tratada como inventário oficial.', 'Carmoola / The Sun / reportagens públicas', 'https://www.carmoola.co.uk/blog/neymars-multimillion-car-collection', 8)
on conflict (slug) do update set category=excluded.category, item_name=excluded.item_name, estimated_value=excluded.estimated_value, location=excluded.location, status_label=excluded.status_label, image_url=excluded.image_url, description=excluded.description, source_label=excluded.source_label, source_url=excluded.source_url, sort_order=excluded.sort_order;

insert into neymar_family_life (slug, section, title, value, date_label, status_label, image_url, description, source_label, source_url, sort_order) values
('nascimento', 'Perfil', 'Neymar da Silva Santos Júnior', 'Nascido em Mogi das Cruzes, SP', '05/02/1992', 'Dado biográfico', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Jr.%20with%20Al%20Hilal%2C%203%20October%202023%20-%2003.jpg', 'Atacante brasileiro, camisa 10 da Seleção em grande parte da carreira e jogador formado no Santos.', 'Transfermarkt / dados públicos', 'https://www.transfermarkt.com/neymar/profil/spieler/68290', 1),
('clube-atual-santos-2026', 'Vida atual', 'Clube atual', 'Santos FC', 'Contrato até o fim de 2026', 'Atual', 'https://commons.wikimedia.org/wiki/Special:FilePath/Neymar%20Santos%202011.jpg', 'Neymar retornou ao Santos em 2025 e renovou seu contrato até o fim de 2026, segundo anúncio do clube noticiado pela Reuters.', 'Reuters', 'https://www.reuters.com/sports/soccer/neymar-extends-santos-deal-through-2026-eyeing-world-cup-return-2026-01-07/', 2),
('bruna-biancardi', 'Relacionamento', 'Bruna Biancardi', 'Companheira / namorada', 'Relacionamento público', 'Parceira atual conforme fontes públicas', null, 'Fontes públicas recentes tratam Bruna Biancardi como namorada/companheira de Neymar. O site evita chamar de esposa sem confirmação pública de casamento formal.', 'People', 'https://people.com/neymar-children-everything-to-know-11989577', 3),
('davi-lucca', 'Filhos', 'Davi Lucca da Silva Santos', 'Filho', '24/08/2011', 'Filho com Carolina Dantas', null, 'Primeiro filho de Neymar. Já apareceu publicamente com o pai em jogos, eventos e comemorações.', 'People', 'https://people.com/neymar-children-everything-to-know-11989577', 4),
('mavie', 'Filhos', 'Mavie da Silva Santos', 'Filha', '06/10/2023', 'Filha com Bruna Biancardi', null, 'Primeira filha de Neymar com Bruna Biancardi, frequentemente mencionada em publicações familiares.', 'People', 'https://people.com/neymar-children-everything-to-know-11989577', 5),
('helena', 'Filhos', 'Helena da Silva Santos', 'Filha', '03/07/2024', 'Filha com Amanda Kimberlly', null, 'Filha de Neymar com Amanda Kimberlly, anunciada publicamente em 2024.', 'People', 'https://people.com/neymar-children-everything-to-know-11989577', 6),
('mel', 'Filhos', 'Mel da Silva Santos', 'Filha', 'Julho/2025', 'Filha com Bruna Biancardi', null, 'Segunda filha de Neymar com Bruna Biancardi e quarta criança do jogador, segundo publicações de 2026.', 'People', 'https://people.com/neymar-children-everything-to-know-11989577', 7),
('quinto-bebe', 'Filhos', 'Quinto bebê', 'Outra filha a caminho', 'Anúncio em junho/2026', 'Gestação anunciada', null, 'Neymar e Bruna Biancardi anunciaram em junho de 2026 que esperavam outra menina, segundo a People.', 'People', 'https://people.com/neymar-children-everything-to-know-11989577', 8),
('neymar-pai', 'Família', 'Neymar Santos Sr.', 'Pai e gestor de carreira', 'Informação pública', 'Família', null, 'Pai de Neymar e figura recorrente na gestão da carreira e dos negócios familiares.', 'Netflix / reportagens públicas', 'https://www.netflix.com/br/title/81005126', 9),
('nadine-mae', 'Família', 'Nadine Gonçalves', 'Mãe', 'Informação pública', 'Família', null, 'Mãe de Neymar; o nome do iate Nadine foi relatado por publicações como homenagem a ela.', 'AS / reportagens públicas', 'https://as.com/futbol/2016/10/28/primera/1477668490_193205.html', 10),
('rafaella-irma', 'Família', 'Rafaella Santos', 'Irmã', 'Informação pública', 'Família', null, 'Irmã de Neymar e presença pública frequente em eventos e publicações da família.', 'Dados públicos / redes sociais', 'https://www.netflix.com/br/title/81005126', 11)
on conflict (slug) do update set section=excluded.section, title=excluded.title, value=excluded.value, date_label=excluded.date_label, status_label=excluded.status_label, image_url=excluded.image_url, description=excluded.description, source_label=excluded.source_label, source_url=excluded.source_url, sort_order=excluded.sort_order;

insert into neymar_sources (slug, label, url, sort_order) values
('forbes-profile-2025-earnings-neymar', 'Forbes — Neymar profile / 2025 earnings', 'https://www.forbes.com/profile/neymar/', 300),
('people-neymar-children-2026', 'People — Neymar children and family 2026', 'https://people.com/neymar-children-everything-to-know-11989577', 301),
('architectural-digest-real-estate', 'Architectural Digest — international real estate portfolio', 'https://www.architecturaldigest.com/story/inside-neymars-international-real-estate-portfolio', 302),
('folha-casa-hangar-jato', 'Folha — casa com hangar para jato', 'https://www1.folha.uol.com.br/internacional/en/sports/2018/01/1954105-neymar-to-build-house-with-hangar-in-rio-for-storing-private-jet.shtml', 303),
('ap-neymar-assets-jet-yacht', 'AP — assets, jet and yacht in 2016 court report', 'https://apnews.com/general-news-475d695dd6f2420a8f16d3c806fa2387', 304),
('boat-international-yacht-nadine', 'Boat International — yacht Nadine report', 'https://www.boatinternational.com/yachts/news/neymars-yacht-seized-by-court--29441', 305),
('carmoola-neymar-car-collection', 'Carmoola — reported car collection', 'https://www.carmoola.co.uk/blog/neymars-multimillion-car-collection', 306)
on conflict (slug) do update set label=excluded.label, url=excluded.url, sort_order=excluded.sort_order;

select 'neymar_wealth_estimates' as tabela, count(*) as registros from neymar_wealth_estimates
union all select 'neymar_assets', count(*) from neymar_assets
union all select 'neymar_family_life', count(*) from neymar_family_life;


-- Patch de imagens dos bens/patrimônio
-- 05_imagens_patrimonio_hotfix.sql
-- Rode este arquivo no Supabase SQL Editor para preencher as imagens dos bens/patrimônio.
-- Motivo do erro visual: os registros da tabela neymar_assets existiam, mas image_url estava NULL.
-- Observação: algumas imagens são fotos de reportagens sobre o próprio bem; outras são imagens públicas do modelo/local citado quando não há foto oficial/auditada do item.

alter table neymar_assets enable row level security;
grant select on neymar_assets to anon, authenticated;

drop policy if exists "public read neymar_assets" on neymar_assets;
create policy "public read neymar_assets" on neymar_assets for select using (true);

insert into neymar_assets
(slug, category, item_name, estimated_value, location, status_label, image_url, description, source_label, source_url, sort_order)
values
('mangaratiba-portobello', 'Imóveis', 'Mansão em Mangaratiba / Portobello', 'aprox. R$ 28 mi / € 8 mi em reportagens de 2016', 'Mangaratiba, Rio de Janeiro, Brasil', 'Compra divulgada', 'https://odia.ig.com.br/_midias/jpg/2024/11/08/1200x750/1_dji_0019_scaled_easy_resize_com_-34532245.jpg', 'Propriedade de alto padrão relatada publicamente em Mangaratiba/Portobello. A imagem usada vem de reportagem pública sobre a região/condomínio ligado ao jogador. O imóvel e valores devem ser tratados como informações divulgadas, não como inventário auditado.', 'Meia Hora/Jogada10 + AS + Architectural Digest', 'https://www.meiahora.com.br/esportes/jogada10/2024/11/6950055-mansao-de-neymar-em-mangaratiba-saiba-detalhes-do-local.html', 1),
('castelldefels-barcelona', 'Imóveis', 'Mansão em Castelldefels', 'aprox. US$ 5,2 mi conforme publicações', 'Castelldefels, região de Barcelona, Espanha', 'Compra divulgada', 'https://i1.wp.com/elioreproperties.com/wp-content/uploads/2017/08/neymarcasa2-1.jpg?resize=1200%2C455', 'Imóvel associado à fase Barcelona. A imagem vem de publicação imobiliária sobre a casa de Neymar em Castelldefels/Bellamar; trate como registro público de reportagem, não como confirmação patrimonial oficial.', 'Eliore Properties + Architectural Digest', 'https://elioreproperties.com/en/neymar-and-messi-houses-in-barcelona/', 2),
('imovel-sao-paulo-2021', 'Imóveis', 'Propriedade em São Paulo / Alphaville', 'aprox. US$ 3 mi / £ 2,5 mi conforme publicações', 'São Paulo / Alphaville, Brasil', 'Compra divulgada', 'https://www.the-sun.com/wp-content/uploads/sites/6/2021/12/NINTCHDBPICT000702141902.jpg?quality=90&strip=all&w=900', 'Propriedade de sete quartos, piscina, squash e garagem ampla citada em reportagens. A imagem vem de matéria pública sobre a mansão; valores e detalhes podem variar por fonte.', 'The Sun + Architectural Digest', 'https://www.the-sun.com/sport/4342515/psg-neymar-mansion-marquinhos-robinho/', 3),
('dubai-bugatti-penthouse', 'Imóveis', 'Penthouse Bugatti Residences em Dubai', 'aprox. £ 43 mi / US$ 54,45 mi em reportagens', 'Dubai, Emirados Árabes Unidos', 'Reportado pela imprensa', 'https://1newhomes.ae/assets/cache_image/assets/cities/ae/houses/binghatti-developers-dubai/bugatti-residences-dubai/1-10_1000x0_221.jpg', 'Compra relatada por portais internacionais. A imagem é render/divulgação do Bugatti Residences em Dubai, empreendimento associado às reportagens sobre a compra.', '1newhomes / fäm Properties / Architectural Digest', 'https://1newhomes.ae/bugatti-residences-dubai/gallery', 4),
('yacht-nadine', 'Náutico', 'Iate Nadine / Azimut', 'aprox. € 3,5 mi a US$ 8 mi conforme fonte/ano', 'Brasil / viagens internacionais', 'Divulgado publicamente', 'https://www.marani.ma/web/files/blog_pics/blog16.jpg', 'Iate citado em reportagens sobre bens de Neymar e processos fiscais antigos. A imagem vem de publicação pública sobre o iate Nadine; valores variam muito por fonte e ano.', 'Marani + Boat International + AP', 'https://www.marani.ma/blog/article/le-nouveau-yacht-de-neymar-nadine.html', 5),
('embraer-phenom-jato', 'Aeronaves', 'Jato particular Embraer Phenom 100E', 'aprox. US$ 4 mi a US$ 10 mi conforme fonte/ano', 'Brasil / viagens internacionais', 'Divulgado publicamente', 'https://sportal365images.com/process/smp-images-production/ringier.africa/07092025/443ca481-cb8c-4b0a-8642-0e4a15087165.png?operations=autocrop%28700%3A467%29', 'Aeronave privada relatada publicamente. A imagem vem de publicação sobre patrimônio/jet de Neymar; alguns registros vieram à tona em reportagens sobre bloqueio judicial de bens em 2016.', 'Pulse Sports + AP News', 'https://www.pulsesports.ng/story/neymar-jr-net-worth-2025-2023081717210581400', 6),
('hangar-rio', 'Aeronaves', 'Projeto de casa com hangar para jato', 'valor não consolidado', 'Rio de Janeiro, Brasil', 'Reportado pela imprensa', 'https://commons.wikimedia.org/wiki/Special:FilePath/Private_-_Embraer_Phenom_100_-_N629AS_%2826_365%29_%284307175681%29.jpg', 'Reportagem da Folha citou projeto de casa com hangar para guardar jato privado. A imagem é de um Embraer Phenom 100 em arquivo público, usada como referência visual do tipo de aeronave.', 'Wikimedia Commons + Folha de S.Paulo', 'https://www1.folha.uol.com.br/internacional/en/sports/2018/01/1954105-neymar-to-build-house-with-hangar-in-rio-for-storing-private-jet.shtml', 7),
('colecao-carros-luxo', 'Carros', 'Coleção de carros de luxo', 'valores variam muito por modelo e ano', 'Brasil / Europa / Oriente Médio', 'Reportado pela imprensa', 'https://www.carmoola.co.uk/hs-fs/hubfs/white-Ferrari-458-Italia.webp?height=480&name=white-Ferrari-458-Italia.webp&width=900', 'Coleção divulgada em reportagens com modelos como Audi R8, Ferrari 458 Italia, Rolls-Royce Ghost, Bentley, Mercedes G-Wagon e Aston Martin DBX. A imagem representa modelo citado publicamente, não uma confirmação de placa/inventário oficial.', 'Carmoola / The Sun / reportagens públicas', 'https://www.carmoola.co.uk/blog/neymars-multimillion-car-collection', 8),
('ferrari-458-italia', 'Carros', 'Ferrari 458 Italia', 'aprox. £ 180 mil em reportagens antigas', 'Coleção divulgada publicamente', 'Modelo citado', 'https://www.carmoola.co.uk/hs-fs/hubfs/white-Ferrari-458-Italia.webp?height=480&name=white-Ferrari-458-Italia.webp&width=900', 'Modelo citado em listas públicas de carros associados a Neymar. Use como item reportado pela imprensa, não como inventário oficial atualizado.', 'Carmoola', 'https://www.carmoola.co.uk/blog/neymars-multimillion-car-collection', 9),
('audi-r8-v10', 'Carros', 'Audi R8 Spyder / V10', 'valor varia por versão e ano', 'Coleção divulgada publicamente', 'Modelo citado', 'https://www.carmoola.co.uk/hs-fs/hubfs/Audi_R8_V10.webp?height=480&name=Audi_R8_V10.webp&width=900', 'Modelo citado em publicações sobre a coleção de carros de Neymar. Imagem ilustrativa do modelo divulgado.', 'Carmoola', 'https://www.carmoola.co.uk/blog/neymars-multimillion-car-collection', 10),
('lamborghini-veneno', 'Carros', 'Lamborghini Veneno', 'aprox. £ 4 mi em reportagens sobre o modelo', 'Coleção divulgada publicamente', 'Modelo citado', 'https://www.carmoola.co.uk/hs-fs/hubfs/Lamborghini_Veneno_Roadster.webp?height=480&name=Lamborghini_Veneno_Roadster.webp&width=900', 'Modelo citado em listas públicas de carros associados a Neymar. A raridade do modelo exige tratar a informação como reportada, não como dado patrimonial auditado.', 'Carmoola', 'https://www.carmoola.co.uk/blog/neymars-multimillion-car-collection', 11),
('rolls-royce-ghost', 'Carros', 'Rolls-Royce Ghost', 'valor varia por ano/configuração', 'Coleção divulgada publicamente', 'Modelo citado', 'https://commons.wikimedia.org/wiki/Special:FilePath/Rolls-Royce_Ghost.JPG', 'Modelo frequentemente citado em matérias sobre carros de luxo ligados a Neymar. Imagem pública do modelo, usada como referência visual.', 'Wikimedia Commons + reportagens públicas', 'https://commons.wikimedia.org/wiki/File:Rolls-Royce_Ghost.JPG', 12),
('mercedes-g-wagon', 'Carros', 'Mercedes-Benz G-Class / G-Wagon', 'valor varia por versão e ano', 'Coleção divulgada publicamente', 'Modelo citado', 'https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes_G_Class.jpg', 'Modelo citado em listas públicas de veículos de luxo associados a Neymar. Imagem pública do modelo, usada como referência visual.', 'Wikimedia Commons + reportagens públicas', 'https://commons.wikimedia.org/wiki/File:Mercedes_G_Class.jpg', 13)
on conflict (slug) do update set
  category=excluded.category,
  item_name=excluded.item_name,
  estimated_value=excluded.estimated_value,
  location=excluded.location,
  status_label=excluded.status_label,
  image_url=excluded.image_url,
  description=excluded.description,
  source_label=excluded.source_label,
  source_url=excluded.source_url,
  sort_order=excluded.sort_order;

insert into neymar_sources (slug, label, url, sort_order) values
('meiahora-portobello-mangaratiba-image', 'Meia Hora/Jogada10 — imagens e detalhes de Mangaratiba/Portobello', 'https://www.meiahora.com.br/esportes/jogada10/2024/11/6950055-mansao-de-neymar-em-mangaratiba-saiba-detalhes-do-local.html', 330),
('eliore-castelldefels-neymar-house-images', 'Eliore Properties — imagens e detalhes da casa em Castelldefels', 'https://elioreproperties.com/en/neymar-and-messi-houses-in-barcelona/', 331),
('the-sun-sao-paulo-mansion-images', 'The Sun — imagens da mansão em São Paulo/Alphaville', 'https://www.the-sun.com/sport/4342515/psg-neymar-mansion-marquinhos-robinho/', 332),
('bugatti-residences-gallery-images', '1newhomes — galeria Bugatti Residences Dubai', 'https://1newhomes.ae/bugatti-residences-dubai/gallery', 333),
('marani-yacht-nadine-images', 'Marani — imagens do iate Nadine', 'https://www.marani.ma/blog/article/le-nouveau-yacht-de-neymar-nadine.html', 334),
('pulse-neymar-jet-image', 'Pulse Sports — imagem pública do jato/ativos de Neymar', 'https://www.pulsesports.ng/story/neymar-jr-net-worth-2025-2023081717210581400', 335),
('carmoola-neymar-car-images', 'Carmoola — imagens de modelos citados na coleção de carros', 'https://www.carmoola.co.uk/blog/neymars-multimillion-car-collection', 336)
on conflict (slug) do update set label=excluded.label, url=excluded.url, sort_order=excluded.sort_order;

select 'neymar_assets' as tabela, count(*) as registros_com_imagem
from neymar_assets
where image_url is not null and image_url <> '';
