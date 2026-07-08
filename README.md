# Neymar Jr. | Site Completo

Projeto estático em HTML, CSS e JavaScript, pronto para subir no GitHub Pages.

## Arquivos

- `index.html` — página principal do site.
- `css/style.css` — identidade visual, responsividade e animações.
- `js/data.js` — banco de dados editável do site.
- `js/app.js` — renderização dinâmica, filtros, abas e gráficos.

## Como rodar

Abra o arquivo `index.html` no navegador.

Para evitar restrições de navegador com fontes/imagens externas, você também pode rodar com uma extensão tipo **Live Server** no VS Code.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto para a raiz do repositório.
3. Acesse `Settings` > `Pages`.
4. Em `Build and deployment`, selecione `Deploy from a branch`.
5. Escolha a branch `main` e a pasta `/root`.
6. Salve e aguarde o link do GitHub Pages.

## Como editar os dados

Abra `js/data.js` e altere:

- `passages`: clubes, Seleção, jogos, gols, assistências e imagens.
- `timeline`: linha do tempo.
- `titleGroups`: títulos coletivos, prêmios individuais e jogos históricos.
- `goalTypes`: pênaltis, faltas, hat-tricks e outros dados.
- `brazilGoalsByCompetition`: gols do Brasil por competição.
- `opponents`: seleções e clubes contra quem Neymar marcou.
- `gallery`: imagens da galeria.
- `sources`: links das fontes.

## Observação importante sobre estatísticas

Os números de Neymar podem variar entre fontes porque alguns sites incluem ou excluem:

- amistosos de clubes;
- categorias de base;
- jogos oficiais e não oficiais;
- critérios diferentes para assistência;
- atualizações posteriores à data de consulta.

Por isso, o projeto deixa todos os dados concentrados em `js/data.js`, para facilitar atualização.

## Fontes usadas como base

- Transfermarkt — perfil de Neymar: https://www.transfermarkt.com/neymar/profil/spieler/68290
- Transfermarkt — todos os gols: https://www.transfermarkt.com/neymar/alletore/spieler/68290
- Transfermarkt — pênaltis: https://www.transfermarkt.com/neymar/elfmetertore/spieler/68290
- Lista de gols de Neymar pela Seleção: https://en.wikipedia.org/wiki/List_of_international_goals_scored_by_Neymar
- Lista de títulos e prêmios recebidos por Neymar: https://pt.wikipedia.org/wiki/Lista_de_t%C3%ADtulos_e_pr%C3%AAmios_recebidos_por_Neymar
- Olympics.com — carreira em números: https://www.olympics.com/en/news/neymar-career-in-numbers-trophies-records-medals-awards
- Wikimedia Commons — imagens de Neymar: https://commons.wikimedia.org/wiki/Neymar

## Créditos de imagens

As imagens são carregadas por links externos do Wikimedia Commons via `Special:Redirect/file/...`. Verifique a licença individual de cada arquivo antes de uso comercial.

Arquivos usados:

- `Neymar_-_FC_Barcelona_-_2015.jpg`
- `Neymar_Santos_2011.jpg`
- `Neymar_Rio_2016.jpg`
- `Neymar_PSG.jpg`
- `Neymar_2018.jpg`

## Personalização rápida

No `css/style.css`, altere as variáveis do `:root`:

```css
--barca-blue:#003b86;
--barca-red:#a50044;
--gold:#f4c21b;
```

Você pode trocar para uma identidade mais brasileira usando verde e amarelo, ou manter o visual azul-grená inspirado no auge de Neymar no Barcelona.
