# Neymar Jr Archive — versão com Supabase

Site premium em HTML, CSS e JavaScript para GitHub Pages, com integração ao Supabase via REST.

## O que foi incluído

- Páginas separadas: Dashboard, Clubes, Seleção, Gols, Medalhas & Prêmios, Adversários, Galeria e Supabase.
- Filtros por classificação em várias abas.
- Imagens reais externas em fontes abertas/URLs públicas.
- Dados locais em `js/data.js` como fallback.
- Integração Supabase em:
  - `js/supabase-config.js`
  - `js/supabase-service.js`
  - `sql/supabase-schema.sql`
- Aba `supabase.html` para verificar status da conexão, tabelas e enviar sugestões de atualização.

## Como publicar no GitHub Pages

1. Extraia o ZIP.
2. Suba todos os arquivos para um repositório no GitHub.
3. Vá em **Settings > Pages**.
4. Escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/root`.
6. Salve e aguarde o link do GitHub Pages.

## Como conectar ao Supabase

A configuração já está em `js/supabase-config.js` com a URL REST e a publishable key informadas.

> Atenção: no front-end use somente `publishable` ou `anon public key`. Nunca coloque `service_role` no GitHub, HTML ou JavaScript público.

## Como criar as tabelas no Supabase

1. Abra seu projeto no Supabase.
2. Vá em **SQL Editor**.
3. Copie todo o conteúdo de `sql/supabase-schema.sql`.
4. Execute o SQL.
5. Abra o site e entre na aba **Supabase**.
6. Se aparecer “Supabase conectado”, os dados já estão vindo do banco.

## Como atualizar os dados

Você pode atualizar de duas formas:

### Opção 1 — Pelo Supabase
Edite as tabelas diretamente no Supabase, por exemplo:

- `neymar_club_passages`
- `neymar_individual_awards`
- `neymar_collective_titles`
- `neymar_opponents`
- `neymar_gallery`

Depois de salvar, atualize o site no navegador.

### Opção 2 — Pelo arquivo local
Edite `js/data.js`. O site usa esse arquivo automaticamente quando as tabelas do Supabase não existem ou não estão liberadas por policy.

## Tabelas principais

- `neymar_profile`: dados gerais do Neymar e imagem principal.
- `neymar_totals`: KPIs do dashboard.
- `neymar_goal_types`: pênaltis, faltas, pé direito, pé esquerdo e cabeça.
- `neymar_club_passages`: passagens por clubes, jogos, gols, assistências, pênaltis e faltas.
- `neymar_national_teams`: Seleção de base, olímpica e principal.
- `neymar_collective_titles`: títulos coletivos.
- `neymar_individual_awards`: medalhas e prêmios individuais.
- `neymar_important_goals`: gols históricos.
- `neymar_opponents`: times e seleções contra quem marcou.
- `neymar_gallery`: galeria de imagens.
- `site_feedback`: sugestões enviadas pela aba Supabase.
- `site_page_views`: registros simples de acesso às páginas.

## Observação sobre números

Os números de gols, assistências, faltas e pênaltis podem variar conforme critério da fonte, competição considerada e atualização da carreira. O projeto está estruturado para facilitar ajustes rápidos no Supabase.
