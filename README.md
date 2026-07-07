# Barça Legends — Neymar & Messi

Site em **HTML, CSS e JavaScript puro**, pronto para publicar no GitHub Pages.

## Páginas

- `index.html`: página de dados dos jogadores, com foco em Neymar no Barcelona e Messi.
- `dashboard.html`: dashboard comparativo com gráficos em Canvas, sem depender de biblioteca externa.

## Arquivos principais

- `data.js`: onde ficam todos os dados. Para adicionar mais jogadores, copie um objeto dentro do array `players` e altere as informações.
- `styles.css`: visual inspirado no modelo enviado, com azul-grená, cards arredondados, visual de app esportivo e painel dashboard.
- `main.js`: monta automaticamente os cards e linha do tempo.
- `dashboard.js`: monta KPIs, gráficos e tabela comparativa.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto para o repositório.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Salve e aguarde o link do GitHub Pages.

## Observação sobre os dados

Os números de futebol podem variar conforme a fonte considera amistosos, competições oficiais e atualizações de carreira. A estrutura foi feita para você editar rapidamente no arquivo `data.js`.
