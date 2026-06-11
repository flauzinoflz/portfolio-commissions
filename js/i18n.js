/* ============================================================
   i18n.js — Idiomas EN/PT
   O HTML é escrito em inglês (idioma padrão — clientes nos EUA).
   Cada elemento traduzível carrega data-i18n="chave"; este módulo
   troca o textContent a partir do dicionário abaixo.

   - Persistência: localStorage ("flz-lang")
   - <html lang> atualizado para leitores de tela
   - Evento "langchange" avisa gallery.js e lightbox.js
   - API global mínima: FLZ.lang e FLZ.t(chave)
   ============================================================ */

const I18N = {
  en: {
    "skip": "Skip to content",
    "nav.home": "Home",
    "nav.illustrations": "Illustrations",
    "nav.concept": "Concept Art",
    "nav.commissions": "Commissions",
    "nav.about": "About",
    "banner.text": "Commissions are open",
    "banner.cta": "Request a quote →",
    "hero.tag": "Digital illustration and concept art — worlds mapped one stroke at a time.",
    "home.featured": "Featured",
    "home.featuredCoord": "HIGHLIGHTED NODES",
    "feat.work": "Work with me",
    "feat.explore": "Explore →",
    "feat.open": "Open →",
    "page.illustrations": "Illustrations",
    "page.concept": "Concept Art",
    "page.commissions": "Commissions",
    "page.about": "About",
    "about.bioTitle": "Biography",
    "about.bio1": "I'm Gabriel Flauzino — a freelance digital illustrator and concept artist based in Brazil, working with clients across the United States. My practice covers character illustration and concept design for games, books and music projects.",
    "about.bio2": "I approach every piece like a cartographer approaches unknown territory: survey the idea, plot its structure, then render the world in detail. Clean shapes, deliberate light, and silhouettes that read in half a second.",
    "about.exp": "Experience",
    "about.exp1": "Freelance illustrator & concept artist — character and world design for international clients.",
    "about.exp2": "Commissioned character illustration for indie game and tabletop projects.",
    "about.exp3": "Foundations — digital painting studies, visual development and the first published commissions.",
    "gallery.loading": "Loading map…",
    "gallery.empty": "No works in this region yet.",
    "gallery.error": "Could not load the works. Serve the site over HTTP (see README).",
    "gallery.open": "Open details of",
    "lb.label": "Artwork details",
    "lb.prev": "← Prev",
    "lb.next": "Next →",
    "lb.close": "Close ✕",
    "lb.extraAlt": "additional view",
    "comm.status": "Status: open",
    "comm.intro": "I take commissions for digital illustration and concept art — from character portraits to environment and prop design. Every project starts with a conversation: you describe the idea, I reply with scope, timeline and price.",
    "comm.styles": "Available styles",
    "comm.styles.1": "Character illustration — bust, half body or full body",
    "comm.styles.2": "Character, creature and prop concept art",
    "comm.styles.3": "Environment concept art and keyframes",
    "comm.styles.4": "Covers and promotional art (games, books, music)",
    "comm.terms": "Terms",
    "comm.terms.1": "50% upfront, 50% on final delivery",
    "comm.terms.2": "Up to two revision rounds included at sketch stage",
    "comm.terms.3": "Timelines set per project — 2 to 4 weeks on average",
    "comm.terms.4": "Commercial use negotiated separately; personal use included",
    "comm.terms.5": "Not accepted: hateful content, plagiarism of living artists, NFT",
    "comm.process": "How it works",
    "comm.process.1": "Brief — you send references and a description of the idea",
    "comm.process.2": "Proposal — scope, timeline and budget agreed in writing",
    "comm.process.3": "Sketch — composition approved before final rendering",
    "comm.process.4": "Delivery — high-resolution file + web-ready versions",
    "comm.contact": "Contact",
    "comm.contactText": "Send your idea by email with the subject “Commission”. I reply within 48 business hours.",
    "footer.commissions": "Commissions open →",
    "footer.gallery": "View gallery →",
  },

  pt: {
    "skip": "Pular para o conteúdo",
    "nav.home": "Início",
    "nav.illustrations": "Ilustrações",
    "nav.concept": "Concept Art",
    "nav.commissions": "Comissões",
    "nav.about": "Sobre",
    "banner.text": "Comissões abertas",
    "banner.cta": "Pedir orçamento →",
    "hero.tag": "Ilustração digital e concept art — mundos mapeados um traço por vez.",
    "home.featured": "Destaques",
    "home.featuredCoord": "NÓS EM EVIDÊNCIA",
    "feat.work": "Trabalhe comigo",
    "feat.explore": "Explorar →",
    "feat.open": "Abrir →",
    "page.illustrations": "Ilustrações",
    "page.concept": "Concept Art",
    "page.commissions": "Comissões",
    "page.about": "Sobre",
    "about.bioTitle": "Biografia",
    "about.bio1": "Sou Gabriel Flauzino — ilustrador digital e concept artist freelancer no Brasil, trabalhando com clientes nos Estados Unidos. Atuo com ilustração de personagens e concept design para jogos, livros e projetos musicais.",
    "about.bio2": "Abordo cada peça como um cartógrafo aborda território desconhecido: exploro a ideia, traço sua estrutura e então renderizo o mundo em detalhe. Formas limpas, luz deliberada e silhuetas que se leem em meio segundo.",
    "about.exp": "Experiência",
    "about.exp1": "Ilustrador e concept artist freelancer — design de personagens e mundos para clientes internacionais.",
    "about.exp2": "Ilustração de personagens sob encomenda para projetos indie de jogos e RPG de mesa.",
    "about.exp3": "Fundamentos — estudos de pintura digital, desenvolvimento visual e as primeiras comissões publicadas.",
    "gallery.loading": "Carregando mapa…",
    "gallery.empty": "Nenhuma obra nesta região ainda.",
    "gallery.error": "Falha ao carregar as obras. Sirva o site por HTTP (ver README).",
    "gallery.open": "Abrir detalhes de",
    "lb.label": "Detalhes da obra",
    "lb.prev": "← Ant",
    "lb.next": "Próx →",
    "lb.close": "Fechar ✕",
    "lb.extraAlt": "vista adicional",
    "comm.status": "Status: aberto",
    "comm.intro": "Trabalho com ilustração digital e concept art sob encomenda — de retratos de personagem a design de ambientes e props. Cada projeto começa com uma conversa: você descreve a ideia, eu retorno com escopo, prazo e valor.",
    "comm.styles": "Estilos disponíveis",
    "comm.styles.1": "Ilustração de personagem — busto, meio corpo ou corpo inteiro",
    "comm.styles.2": "Concept art de personagens, criaturas e props",
    "comm.styles.3": "Concept art de ambientes e keyframes",
    "comm.styles.4": "Capas e artes promocionais (jogos, livros, música)",
    "comm.terms": "Termos",
    "comm.terms.1": "50% do valor no início, 50% na entrega final",
    "comm.terms.2": "Até duas rodadas de revisão inclusas na fase de esboço",
    "comm.terms.3": "Prazos definidos por projeto — em média 2 a 4 semanas",
    "comm.terms.4": "Uso comercial negociado à parte; uso pessoal incluso",
    "comm.terms.5": "Não aceito: conteúdo de ódio, plágio de artistas vivos, NFT",
    "comm.process": "Como funciona",
    "comm.process.1": "Briefing — você envia referências e descrição da ideia",
    "comm.process.2": "Proposta — escopo, prazo e orçamento fechados por escrito",
    "comm.process.3": "Esboço — composição aprovada antes da arte final",
    "comm.process.4": "Entrega — arquivo em alta resolução + versões para web",
    "comm.contact": "Contato",
    "comm.contactText": "Envie sua ideia por e-mail com o assunto “Commission”. Respondo em até 48h úteis.",
    "footer.commissions": "Comissões abertas →",
    "footer.gallery": "Ver galeria →",
  },
};

/* ---- Estado global mínimo -------------------------------- */

window.FLZ = window.FLZ || {};

/** Traduz uma chave no idioma corrente (fallback: inglês). */
window.FLZ.t = (key) => I18N[window.FLZ.lang]?.[key] ?? I18N.en[key] ?? key;

/* ---- Aplicação ------------------------------------------- */

function applyLanguage(lang) {
  window.FLZ.lang = lang;
  try {
    localStorage.setItem("flz-lang", lang);
  } catch {
    /* navegação privada: segue sem persistir */
  }

  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  // Texto visível
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = window.FLZ.t(el.dataset.i18n);
  });

  // Atributos aria-label (navegação, diálogo)
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", window.FLZ.t(el.dataset.i18nAria));
  });

  // O botão mostra o idioma de DESTINO, não o atual
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.textContent = lang === "en" ? "PT" : "EN";
    btn.setAttribute(
      "aria-label",
      lang === "en" ? "Mudar para português" : "Switch to English"
    );
  });

  // gallery.js e lightbox.js re-renderizam o que for dinâmico
  document.dispatchEvent(new CustomEvent("langchange"));
}

/* ---- Inicialização ---------------------------------------- */

let saved = null;
try {
  saved = localStorage.getItem("flz-lang");
} catch {
  /* sem storage disponível */
}

applyLanguage(saved === "pt" ? "pt" : "en"); // padrão: inglês

document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(window.FLZ.lang === "en" ? "pt" : "en");
  });
});
