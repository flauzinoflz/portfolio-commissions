/* ============================================================
   main.js — Bootstrap global
   Pequeno de propósito: revelação ao rolar e detalhes vivos.
   Tudo aqui degrada graciosamente sem JS.
   ============================================================ */

// Sinaliza ao CSS que o JS está ativo (gate das animações de reveal)
document.documentElement.classList.add("js");

/**
 * Revelação ao rolar via IntersectionObserver.
 * O CSS só anima sob `prefers-reduced-motion: no-preference`,
 * então usuários com movimento reduzido veem tudo estático.
 */
const revealables = document.querySelectorAll("[data-reveal]");

if (revealables.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // revela uma vez só
        }
      }
    },
    { threshold: 0.12 }
  );

  revealables.forEach((el) => observer.observe(el));
} else {
  // Fallback: sem observer, nada fica escondido
  revealables.forEach((el) => el.classList.add("is-visible"));
}

// Ano corrente no rodapé
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   Transição entre páginas (fallback) · v0.3
   Navegadores com View Transitions multi-página (CSS
   @view-transition) fazem o crossfade nativamente — neles este
   bloco não age. Nos demais, um fade-out curto antes de navegar.
   ============================================================ */

const supportsViewTransitions = "startViewTransition" in document;
const prefersMotion = window.matchMedia(
  "(prefers-reduced-motion: no-preference)"
).matches;

if (!supportsViewTransitions && prefersMotion) {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const isInternalPage =
      url.origin === window.location.origin &&
      url.pathname !== window.location.pathname &&
      !link.hasAttribute("download") &&
      link.target !== "_blank" &&
      !event.metaKey && !event.ctrlKey && !event.shiftKey;

    if (!isInternalPage) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => { window.location.href = url.href; }, 200);
  });

  // bfcache: voltar com o botão do navegador não pode ficar opaco
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-leaving");
  });
}
