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
    FLZ.works = filterWorks(works, category); // compartilhado c/ lightbox

    renderGrid();
    document.addEventListener("langchange", renderGrid);

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

function renderGrid() {
  if (FLZ.works.length === 0) {
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
  media.appendChild(img);

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
  card.append(media, meta);
  return card;
}

// Exposto para o lightbox reutilizar a resolução bilíngue
FLZ.localized = localized;
