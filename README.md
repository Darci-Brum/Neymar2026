# Neymar Jr Supabase Archive — Strict Mode

Site premium em **HTML + CSS + JavaScript** para GitHub Pages, com uma regra central:

> **Nenhum dado da carreira fica no código do site. Tudo é buscado estritamente do Supabase.**

Não existe `data.js` e não existe fallback local. Se o Supabase não estiver com as tabelas criadas e populadas, o site mostra aviso de banco vazio.

## Páginas incluídas

- `index.html` — dashboard geral
- `clubes.html` — passagens por clubes com filtros
- `selecao.html` — Seleção Brasileira e categorias
- `estatisticas.html` — gols, assistências, pênaltis, faltas e gols importantes
- `premios.html` — medalhas, prêmios individuais e títulos coletivos com imagens
- `adversarios.html` — times e seleções contra quem Neymar marcou gol
- `transferencias.html` — propostas, transferências, salários estimados e contratos
- `midia.html` — fotos reais e vídeos/documentários/entrevistas
- `supabase.html` — status da conexão e formulário de correções

## Como ativar no Supabase

1. Abra seu projeto no Supabase.
2. Vá em **SQL Editor**.
3. Copie todo o conteúdo de `sql/supabase_full_setup.sql`.
4. Execute o script.
5. Publique os arquivos do site no GitHub Pages.
6. Abra `supabase.html` para confirmar as tabelas carregadas.

## Configuração do banco

O arquivo `js/supabase-config.js` já está configurado com a URL REST e a chave publishable que você enviou:

```js
window.NJR_SUPABASE_CONFIG = {
  restUrl: 'https://jiefqjpvxbgzxyhufpib.supabase.co/rest/v1',
  apiKey: 'SUA_CHAVE_PUBLICA'
};
```

Use apenas chave pública/publishable no front-end. **Nunca coloque service_role no GitHub.**

## Como editar dados depois

Edite diretamente as tabelas no Supabase:

- `neymar_profile`
- `neymar_stat_cards`
- `neymar_club_passages`
- `neymar_national_teams`
- `neymar_goal_methods`
- `neymar_goal_assist_by_team`
- `neymar_important_goals`
- `neymar_career_milestones`
- `neymar_titles`
- `neymar_awards`
- `neymar_opponents`
- `neymar_media_photos`
- `neymar_media_videos`
- `neymar_transfers_contracts`
- `neymar_sources`

## Observação sobre imagens e vídeos

As imagens e vídeos não ficam dentro do projeto. O banco guarda URLs públicas, principalmente de Wikimedia Commons, Netflix, Red Bull, Globoplay e YouTube. Isso mantém o projeto leve para GitHub Pages.

## Observação sobre salários

Salários de jogadores raramente são oficiais. A tabela `neymar_transfers_contracts` tem campo `estimated_salary`, com observação de fonte. Atualize esse campo se quiser usar outro critério.

## Fontes usadas como referência

As fontes também foram cadastradas na tabela `neymar_sources`, incluindo Transfermarkt, StatBunker, Reuters, Guinness World Records, Capology, Netflix, Red Bull e Globoplay.

## Fotos com companheiros

A seed inclui fotos de Neymar com Messi e Suárez na fase MSN, usando URLs externas do FC Barcelona e da LALIGA em `neymar_media_photos`, filtro **Companheiros/MSN** na aba de mídia.


## Correção 08/07/2026

O arquivo SQL foi ajustado para remover slug duplicado na tabela `neymar_awards`. Se você já tentou executar a versão anterior e recebeu erro de `ON CONFLICT DO UPDATE command cannot affect row a second time`, execute novamente `sql/supabase_full_setup.sql` desta versão corrigida.


## Correção rápida se aparecer “Sem dados” na página Fotos & Vídeos

Se as tabelas existem no Supabase, mas o site mostra vazio, rode no SQL Editor o arquivo:

```text
sql/03_grants_rls_media_hotfix.sql
```

Ele aplica `GRANT`, recria as policies públicas de leitura e reinsere/atualiza fotos, vídeos e fontes de mídia sem apagar seus registros.

## Atualização: Patrimônio, bens e vida atual

Esta versão adiciona duas novas páginas:

- `patrimonio.html`: patrimônio estimado, contador por segundo/minuto/hora/dia/mês/ano e bens divulgados publicamente.
- `vida-atual.html`: data de nascimento, clube atual, companheira, filhos, pais e família.

### Como ativar no seu Supabase já existente

Se você já rodou o SQL anterior e o site está funcionando, rode apenas:

```text
sql/04_patrimonio_vida_atual.sql
```

Esse arquivo cria e popula as tabelas:

- `neymar_wealth_estimates`
- `neymar_assets`
- `neymar_family_life`

Ele também libera `GRANT SELECT` e políticas RLS públicas de leitura para o GitHub Pages.

### Observação importante sobre patrimônio

O patrimônio real de Neymar não é público/auditado. O contador usa uma estimativa cadastrada no Supabase e calcula uma projeção visual usando:

- `net_worth_usd`
- `annual_earnings_usd`
- `exchange_rate_brl`
- `base_date`

Para atualizar, edite esses campos diretamente na tabela `neymar_wealth_estimates`.

## Correção das imagens do patrimônio

Se a página `patrimonio.html` mostrar “Imagem não cadastrada no Supabase”, significa que a tabela `neymar_assets` existe, mas o campo `image_url` dos bens está vazio.

Para corrigir em um banco que já está criado, rode apenas:

```text
sql/05_imagens_patrimonio_hotfix.sql
```

Esse hotfix preenche as imagens dos imóveis, iate, jato e carros divulgados publicamente. Algumas imagens são fotos de reportagens sobre o bem; outras são imagens públicas do modelo/local citado quando não existe foto oficial/auditada disponível.

Depois de executar o SQL, atualize o GitHub Pages com Ctrl + F5.


## Atualização visual: Santos + Barcelona + Seleção

Esta versão muda a tipografia e a paleta para um tema mais focado nas fases **Santos**, **Barcelona** e **Seleção Brasileira**. Também adiciona uma faixa superior com os escudos de todos os clubes profissionais em que Neymar jogou, mais a Seleção Brasileira.

Para quem já executou os SQLs anteriores, rode apenas:

```text
sql/06_tema_escudos_hotfix.sql
```

Depois envie todos os arquivos atualizados para o GitHub Pages e recarregue o site com **Ctrl + F5**.

Os escudos ficam na tabela `neymar_team_crests`, então você pode trocar URLs, nomes, períodos e ordem diretamente no Supabase.
