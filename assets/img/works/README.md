# assets/img/works/

Imagens das obras do portfolio, **uma pasta por obra**, nomeada pelo `id` (slug)
usado em `data/portfolio.json`:

```
works/
└── nome-da-obra/        ← mesmo slug do campo "id" no JSON
    ├── cover.webp       ← imagem principal (capa do card)
    ├── 01.webp          ← imagens adicionais, numeradas
    └── 02.webp
```

## Convenções

- **Slug**: minúsculas, sem acentos, hífens no lugar de espaços (`vigia-do-deserto`).
- **Formato**: prefira `.webp` (qualidade 80–85) ou `.jpg`. Os `.svg` atuais são
  placeholders — substitua-os pelas artes reais e atualize as URLs no JSON.
- **Capa**: proporção próxima de 4:5 (ex.: 1200×1500px) encaixa perfeitamente no
  grid sem corte agressivo. Outras proporções funcionam (`object-fit: cover`).
- **Peso**: mire em ≤ 400 KB por imagem. O site usa `loading="lazy"`, mas imagem
  leve continua sendo a melhor otimização que existe.

## Adicionando uma obra nova

1. Crie a pasta `works/minha-obra-nova/` com `cover` + detalhes.
2. Adicione a entrada correspondente em `data/portfolio.json`.
3. Commit + push — o site reflete automaticamente.

URLs externas (ArtStation, CDN) também funcionam no JSON, mas hospedar aqui no
repositório evita rate limit e bloqueio de hotlink.
