# Legends Stats

Site estático com 2 páginas para publicar no GitHub Pages:

- `index.html`: página de dados com marcos, gols e resumo da carreira.
- `dashboard.html`: dashboard comparativo com gráficos.

## Como rodar

Abra o arquivo `index.html` no navegador ou use a extensão Live Server no VS Code.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto.
3. Vá em `Settings` > `Pages`.
4. Em `Build and deployment`, selecione `Deploy from a branch`.
5. Escolha a branch `main` e a pasta `/root`.
6. Salve e aguarde o link do site.

## Como adicionar jogadores

Abra `data.js`, copie um dos objetos dentro de `window.PLAYERS`, cole abaixo e altere:

- `id`
- `name`
- `country`
- `currentClub`
- `stats`
- `clubs`
- `milestones`

Os cards e gráficos serão atualizados automaticamente.

## Observação sobre os dados

Algumas bases estatísticas divergem por critérios de contagem, como amistosos, competições oficiais, categorias de base e data de atualização. Os dados iniciais foram organizados para fins de portfólio e devem ser revisados em `data.js` quando houver mudanças.

Fontes consultadas: Transfermarkt, Reuters, FOX Sports, Wikipedia e MessiXRonaldo.
