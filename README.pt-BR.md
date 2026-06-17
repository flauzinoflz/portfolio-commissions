# FLZ — Portfolio de Gabriel Flauzino

🇺🇸 [Read in English →](README.md)

Site de portfolio profissional de ilustração digital e concept art, construído
com **HTML, CSS e JavaScript puros** — sem frameworks, sem build step, sem
dependências de runtime. O site é, ele próprio, uma peça de portfolio: tanto
das artes quanto da engenharia por trás delas.

**Identidade visual:** UI cartográfica inspirada nas telas de mapa de
Destiny 2 — fundo de papel quente, linhas finas, coordenadas decorativas,
uma retícula em rotação lenta e um lightbox que se comporta como um "nó de
mapa" expandido. O vermelho escuro (`#7a1f1a`) é reservado para banners e
ênfase; o `#1b1313` é a tinta.

---

## Stack e decisões de arquitetura

| Camada | Escolha | Por quê |
|---|---|---|
| Markup | HTML5 semântico, multi-page | SEO real por página, zero custo de roteamento, acessível por padrão |
| Estilo | CSS puro com custom properties | `tokens.css` é a fonte única da identidade — o rebrand v1→v2 (escuro→claro) tocou quase só este arquivo |
| Comportamento | Vanilla JS (4 módulos) | `i18n.js` (idiomas) · `main.js` (global) · `gallery.js` (render) · `lightbox.js` (nó do mapa) |
| Conteúdo | `data/portfolio.json` | Adicionar obra = editar JSON + push. Nenhum HTML é tocado |
| Idiomas | Toggle EN/PT, sem biblioteca | Dicionário de ~40 chaves, atributos `data-i18n`, persistência em `localStorage`. Inglês é o padrão (clientes nos EUA) |
| Tipografia | Syncopate · Hanken Grotesk · IBM Plex Mono | Syncopate como stand-in da Sackers Gothic (marca FLZ), com slot pronto para a fonte licenciada |

**Por que sem frameworks?** Para um site de conteúdo com quatro páginas, um
framework adiciona peso, build pipeline e manutenção sem retorno
proporcional. Esta arquitetura carrega ~0 KB de JavaScript de terceiros e
ainda assim entrega galeria dinâmica, dois idiomas, deep linking e um painel
modal totalmente acessível.

## Destaques de engenharia

- **Sistema de design tokenizado** — cores, tipografia, espaçamento e curvas
  de animação centralizados em [`css/tokens.css`](css/tokens.css), com nomes
  semânticos (`--bg`, `--ink`, `--accent`): inverter o tema é mudança só de
  tokens
- **Conteúdo desacoplado** — galeria renderizada de
  [`data/portfolio.json`](data/portfolio.json) via `fetch`, com filtro por
  categoria declarado no HTML (`<main data-category="...">`)
- **i18n sem dependências** — toda string de interface tem chave em
  [`js/i18n.js`](js/i18n.js); descrições do JSON são objetos bilíngues
  (`{ "en": …, "pt": … }`) resolvidos no render, com re-render ao vivo na
  troca de idioma (inclusive com o lightbox aberto)
- **Acessibilidade de verdade, não checkbox**: skip link, landmarks, focus
  trap no lightbox, `Esc`/setas, foco devolvido ao card de origem,
  `prefers-reduced-motion` respeitado em tudo, `<html lang>` sincronizado
  com o idioma ativo
- **Performance**: `loading="lazy"`, `aspect-ratio` reservando espaço (zero
  layout shift), visuais ambientes desenhados só com SVG inline e CSS
- **Deep linking**: cada obra aberta grava `#obra=<id>` na URL — links
  compartilháveis que abrem direto no painel
- **Segurança básica**: dados do JSON entram no DOM via
  `textContent`/atributos, nunca interpolados como HTML

## Estrutura de pastas

```
flz-portfolio/
├── index.html              # Home — hero + destaques
├── ilustracoes.html        # Galeria filtrada: illustration
├── concept-art.html        # Galeria filtrada: concept-art
├── commissions.html        # Termos, estilos e contato
├── about.html              # Bio, foto, redes, timeline de experiência
├── data/
│   └── portfolio.json      # Fonte única de conteúdo (campos bilíngues)
├── css/
│   ├── tokens.css          # Design tokens (cor, tipo, movimento)
│   ├── base.css            # Reset, tipografia, primitivos de a11y
│   ├── components.css      # Nav, cards, banner, lightbox, rodapé
│   └── pages.css           # Hero e layouts específicos
├── js/
│   ├── i18n.js             # Dicionário EN/PT + toggle de idioma
│   ├── main.js             # Reveal-on-scroll, detalhes globais
│   ├── gallery.js          # Fetch + filtro + render do grid
│   └── lightbox.js         # Painel "nó do mapa" acessível
└── assets/
    └── img/works/          # Uma pasta por obra (ver README interno)
```

## Rodando localmente

A galeria usa `fetch()` para ler o JSON, então o site precisa ser servido
por HTTP (abrir o arquivo direto no navegador bloqueia por CORS):

```bash
git clone https://github.com/SEU-USUARIO/flz-portfolio.git
cd flz-portfolio

# Opção 1 — Python
python -m http.server 8000

# Opção 2 — Node
npx serve .
```

Abra `http://localhost:8000`. Sem instalação, sem build.

## Atualizando o conteúdo

1. Coloque as imagens em `assets/img/works/<slug-da-obra>/`
   (convenção documentada em [`assets/img/works/README.md`](assets/img/works/README.md))
2. Adicione a entrada em `data/portfolio.json` (descrições nos dois idiomas)
3. Commit e push — o site reflete automaticamente

## Desenvolvimento assistido por IA

Este projeto foi construído em parceria com um LLM (Claude), usado de forma
deliberada — não como gerador de código aceito às cegas, mas como ferramenta
dentro de um processo com controle de qualidade humano:

1. **Arquitetura antes de código** — estrutura de arquivos, schema do JSON e
   decisões de stack foram propostas, discutidas e aprovadas antes de
   qualquer implementação
2. **Briefing de design rigoroso** — paleta, referências visuais (UI do
   Destiny 2, layout editorial) e anti-objetivos ("zero aparência genérica
   de IA") definidos por escrito, restringindo o espaço de soluções
3. **Revisão crítica** — cada arquivo gerado é lido, testado e ajustado;
   o LLM acelera a digitação, não substitui a decisão técnica
4. **Restrições como qualidade** — exigir vanilla JS, tokens de design e
   acessibilidade explícita força o LLM a produzir código defensável, não
   o caminho mais curto

O que quero demonstrar: saber **especificar, dirigir e auditar** trabalho
de IA é hoje parte do ofício de desenvolvimento.

## Roadmap

- [x] **v1 — Frontend estático** (tema escuro)
- [x] **v2 — Rebrand + i18n**: tema claro "papel Destiny", sistema de
  idiomas EN/PT, minimalismo editorial
- [x] **v0.3 — Polimento**: fix de overflow no mobile, transições nativas
  entre páginas (View Transitions API + fallback JS), bandas escuras para
  reduzir o cansaço visual, spinner-retícula no carregamento e fix do
  prompt de tradução do navegador
- [x] **v0.4 — Página About**: `about.html` dedicada (foto, bio, redes,
  timeline de experiência); transições profissionais com nav/rodapé
  persistentes — só o conteúdo da página faz o crossfade
- [ ] **v3 — API de comissões**: backend em **FastAPI + PostgreSQL** com
  formulário de pedido, fila com status público e painel administrativo.
  O frontend já está pronto: a página Commissions passa a consumir a API
  mantendo o mesmo design system
- [ ] **v4 — Domínio próprio + deploy**: domínio personalizado, CDN para
  imagens, analytics leve e CI simples (validação de JSON + lint no push)
- [ ] **v5 — Conteúdo**: Sackers Gothic licenciada no lugar da Syncopate e
  artes finais no lugar dos placeholders

## Licença

Código sob MIT. **As obras de arte são de Gabriel Flauzino — todos os
direitos reservados.** Não reutilize as imagens sem autorização.
