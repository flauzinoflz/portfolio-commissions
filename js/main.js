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
