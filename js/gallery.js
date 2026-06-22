/* ============================================================
   gallery.js — Render da galeria · v2 (i18n-aware)
   Lê data/portfolio.json, filtra pela categoria declarada em
   <main data-category="..."> e monta o grid. A home usa
   data-category="featured".

   Descrições no JSON são bilíngues: { "en": "...", "pt": "..." }.
   Strings de interface vêm de FLZ.t() (js/i18n.js). No evento
   "langchange" o grid re-renderiza — barato, são só os cards.
   ============================================================ */

const grid = document.querySelector("[data-gallery]");
const category = document.querySelector("main")?.dataset.category;

/* Modo de exibição derivado do container: a galeria empilhada
   (.gallery-stack, páginas de Ilustrações/Concept Art) mostra só
   a imagem; o grid (.gallery-grid) mantém a legenda. */
const isStack = grid?.classList.contains("gallery-stack");

/* Setores das Ilustrações. Ordem fixa controlada aqui (ALL sempre
   primeiro); só renderiza os que têm obra no JSON. A chave casa com
   o campo `subcategory`; o rótulo vem do i18n (sector.*). */
const SECTOR_ORDER = ["key-art", "posters", "book-covers", "personal"];

let categoryWorks = [];      // todas as obras da categoria desta página
let activeSector = "all";    // setor selecionado ("all" = todos)
const sectorBar = document.querySelector("[data-sectors]");

if (grid) loadGallery();

async function loadGallery() {
  // Spinner: micro-retícula (rotação com propósito, não decoração)
  grid.innerHTML = `
    <p class="gallery-status" role="status">
      <svg class="spinner-reticle" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" stroke-width="1.4">
          <circle cx="24" cy="24" r="21" stroke-dasharray="3 7" />
          <circle cx="24" cy="24" r="12" />
          <path d="M24 1v6 M24 41v6 M1 24h6 M41 24h6" />
        </g>
      </svg>
      <span class="coord">${FLZ.t("gallery.loading")}</span>
    </p>`;

  try {
    const response = await fetch("data/portfolio.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { works } = await response.json();

    // Ordena por `order` (menor primeiro); obras sem order vão ao fim
    const ordered = [...works].sort(
      (a, b) => (a.order ?? 9999) - (b.order ?? 9999)
    );

    // Lista completa da categoria desta página (base dos filtros)
    categoryWorks = filterWorks(ordered, category);

    // Setores (subcategorias) presentes nas Ilustrações — derivados
    // do JSON, na ordem fixa definida em SECTOR_ORDER. Só aparecem os
    // que têm ao menos uma obra. Concept-art e home não usam setores.
    if (isStack && category === "illustration") {
      buildSectorFilters();
    }

    applyFilter(); // popula FLZ.works conforme o setor ativo
    document.addEventListener("langchange", () => {
      renderSectorLabels();
      renderGrid();
    });

    // Avisa o lightbox que os cards existem (resolve deep links)
    document.dispatchEvent(new CustomEvent("gallery:ready"));
  } catch (error) {
    console.error("[gallery] Falha ao carregar portfolio.json:", error);
    grid.innerHTML =
      `<p class="gallery-status coord">${FLZ.t("gallery.error")}</p>`;
  }
}

function filterWorks(works, category) {
  if (category === "featured") return works.filter((w) => w.featured);
  if (category) return works.filter((w) => w.category === category);
  return works;
}

/* Monta a barra de setores a partir das subcategorias presentes.
   ALL sempre primeiro; depois os de SECTOR_ORDER que têm ao menos
   uma obra. Botão ativo recebe a classe is-active. */
function buildSectorFilters() {
  if (!sectorBar) return;

  const present = SECTOR_ORDER.filter((sec) =>
    categoryWorks.some((w) => w.subcategory === sec)
  );
  // Sem subcategorias no JSON → não mostra a barra
  if (present.length === 0) return;

  const sectors = ["all", ...present];

  sectorBar.innerHTML = "";
  sectors.forEach((sec, i) => {
    const count =
      sec === "all"
        ? categoryWorks.length
        : categoryWorks.filter((w) => w.subcategory === sec).length;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sector" + (sec === activeSector ? " is-active" : "");
    btn.dataset.sector = sec;
    btn.setAttribute("aria-pressed", String(sec === activeSector));

    const dot = document.createElement("span");
    dot.className = "sector__dot";
    dot.setAttribute("aria-hidden", "true");

    const txt = document.createElement("span");
    txt.className = "sector__txt";

    const name = document.createElement("span");
    name.className = "sector__name";
    name.dataset.sectorName = sec;

    const meta = document.createElement("span");
    meta.className = "sector__meta coord";
    meta.dataset.sectorMeta = sec;
    meta.textContent =
      sec === "all"
        ? `${count} ${FLZ.t("sector.nodes")}`
        : `${FLZ.t("sector.sector")} ${String(i).padStart(2, "0")}`;

    txt.append(name, meta);
    btn.append(dot, txt);
    sectorBar.appendChild(btn);
  });

  renderSectorLabels();

  sectorBar.addEventListener("click", (event) => {
    const btn = event.target.closest(".sector");
    if (!btn) return;
    activeSector = btn.dataset.sector;
    sectorBar.querySelectorAll(".sector").forEach((b) => {
      const on = b.dataset.sector === activeSector;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    applyFilter();
  });
}

// Rótulos dos setores (re-render no langchange)
function renderSectorLabels() {
  if (!sectorBar) return;
  sectorBar.querySelectorAll("[data-sector-name]").forEach((el) => {
    const sec = el.dataset.sectorName;
    el.textContent = sec === "all" ? FLZ.t("sector.all") : FLZ.t(`sector.${sec}`);
  });
}

// Aplica o setor ativo a FLZ.works e re-renderiza o grid + lightbox
function applyFilter() {
  FLZ.works =
    activeSector === "all"
      ? categoryWorks
      : categoryWorks.filter((w) => w.subcategory === activeSector);
  renderGrid();
}

function renderGrid() {
  if (!FLZ.works || FLZ.works.length === 0) {
    grid.innerHTML =
      `<p class="gallery-status coord">${FLZ.t("gallery.empty")}</p>`;
    return;
  }

  grid.innerHTML = "";
  FLZ.works.forEach((work, index) => grid.appendChild(buildCard(work, index)));
}

/**
 * Resolve um campo bilíngue do JSON: aceita string simples ou
 * objeto { en, pt }, sempre com fallback para o inglês.
 */
function localized(field) {
  if (typeof field === "string") return field;
  return field?.[FLZ.lang] ?? field?.en ?? "";
}

/**
 * Card de obra. Construído com createElement (não innerHTML com
 * dados) para que título/descrição do JSON nunca virem HTML.
 */
function buildCard(work, index) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "work-card";
  card.dataset.index = index;
  card.dataset.id = work.id;
  card.setAttribute("aria-label", `${FLZ.t("gallery.open")} ${work.title}`);

  const media = document.createElement("div");
  media.className = "work-card__media";

  const img = document.createElement("img");
  img.src = work.cover;
  img.alt = localized(work.alt) || work.title;
  img.loading = "lazy";
  img.decoding = "async";
  /* width/height reais do JSON: o navegador deriva o aspect-ratio
     e reserva o espaço exato antes do download — zero layout shift.
     Na stack a altura é natural; no grid o CSS força 4:5. */
  if (work.width && work.height) {
    img.width = work.width;
    img.height = work.height;
  }
  media.appendChild(img);

  card.appendChild(media);

  /* Galeria empilhada: só a imagem. Sem legenda, título ou coord. */
  if (isStack) return card;

  const meta = document.createElement("div");
  meta.className = "work-card__meta";

  const title = document.createElement("span");
  title.className = "work-card__title";
  title.textContent = work.title;

  const coord = document.createElement("span");
  coord.className = "coord";
  coord.setAttribute("aria-hidden", "true");
  const tag = work.category === "concept-art" ? "CPT" : "ILL";
  coord.textContent = `${String(index + 1).padStart(2, "0")}/${tag}`;

  meta.append(title, coord);
  card.appendChild(meta);
  return card;
}

// Exposto para o lightbox reutilizar a resolução bilíngue
FLZ.localized = localized;
