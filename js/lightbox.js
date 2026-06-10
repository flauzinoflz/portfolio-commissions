/* ============================================================
   lightbox.js — O nó do mapa
   Painel expandido de cada obra: título, descrição e imagens
   adicionais. Clicar num card é "entrar num nó".

   Acessibilidade implementada:
   - role="dialog" + aria-modal, foco movido para dentro ao abrir
   - focus trap (Tab circula apenas dentro do painel)
   - Esc fecha; ← → navegam entre obras da galeria atual
   - foco devolvido ao card de origem ao fechar
   Deep-linking: abrir uma obra grava #obra=<id> na URL — o link
   pode ser compartilhado e abre direto no nó.
   ============================================================ */

const lightbox = document.querySelector("[data-lightbox]");

if (lightbox) {
  const els = {
    coord: lightbox.querySelector("[data-lb-coord]"),
    cover: lightbox.querySelector("[data-lb-cover]"),
    title: lightbox.querySelector("[data-lb-title]"),
    desc: lightbox.querySelector("[data-lb-desc]"),
    extras: lightbox.querySelector("[data-lb-extras]"),
    prev: lightbox.querySelector("[data-lb-prev]"),
    next: lightbox.querySelector("[data-lb-next]"),
    close: lightbox.querySelector("[data-lb-close]"),
  };

  let currentIndex = -1;
  let originCard = null; // card que abriu o nó — recebe o foco de volta

  /* ---- Abertura ------------------------------------------ */

  // Delegação: a galeria é renderizada depois deste script rodar
  document.addEventListener("click", (event) => {
    const card = event.target.closest(".work-card");
    if (!card) return;
    originCard = card;
    open(Number(card.dataset.index));
  });

  // Deep link: #obra=slug presente ao carregar a página
  document.addEventListener("gallery:ready", () => {
    const match = window.location.hash.match(/^#obra=(.+)$/);
    if (!match) return;
    const index = window.FLZ.works.findIndex((w) => w.id === match[1]);
    if (index >= 0) open(index);
  });

  function open(index) {
    const works = window.FLZ?.works;
    if (!works || !works[index]) return;

    currentIndex = index;
    render(works[index], index, works.length);

    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    history.replaceState(null, "", `#obra=${works[index].id}`);

    els.close.focus();
  }

  function render(work, index, total) {
    els.title.textContent = work.title;
    els.desc.textContent = FLZ.localized(work.description);
    els.coord.textContent =
      `NÓ ${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;

    els.cover.src = work.cover;
    els.cover.alt = FLZ.localized(work.alt) || work.title;

    // Imagens adicionais (array opcional no JSON)
    els.extras.innerHTML = "";
    for (const url of work.images || []) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = `${work.title} — ${FLZ.t("lb.extraAlt")}`;
      img.loading = "lazy";
      img.decoding = "async";
      els.extras.appendChild(img);
    }

    els.prev.disabled = index === 0;
    els.next.disabled = index === total - 1;
  }

  // Idioma trocado com o nó aberto: re-renderiza o conteúdo
  document.addEventListener("langchange", () => {
    if (!lightbox.classList.contains("is-open")) return;
    const works = window.FLZ?.works;
    if (works?.[currentIndex]) {
      render(works[currentIndex], currentIndex, works.length);
    }
  });

  /* ---- Navegação e fechamento ----------------------------- */

  function step(delta) {
    const works = window.FLZ?.works;
    const target = currentIndex + delta;
    if (!works || !works[target]) return;
    currentIndex = target;
    render(works[target], target, works.length);
    lightbox.scrollTo({ top: 0, behavior: "instant" });
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    history.replaceState(null, "", window.location.pathname);
    originCard?.focus(); // devolve o foco ao ponto de origem
  }

  els.prev.addEventListener("click", () => step(-1));
  els.next.addEventListener("click", () => step(1));
  els.close.addEventListener("click", close);

  // Clique no fundo (fora do painel) fecha
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  /* ---- Teclado -------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    switch (event.key) {
      case "Escape":
        close();
        break;
      case "ArrowLeft":
        step(-1);
        break;
      case "ArrowRight":
        step(1);
        break;
      case "Tab":
        trapFocus(event);
        break;
    }
  });

  /** Mantém o Tab circulando dentro do painel enquanto aberto. */
  function trapFocus(event) {
    const focusables = lightbox.querySelectorAll(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
