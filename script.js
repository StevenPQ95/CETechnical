/* ============================================================
   TINKYTECH — SCRIPT.JS V2
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURACIÓN CENTRAL
   ------------------------------------------------------------ */

const TINKYTECH_CONFIG = {
  /*
    Número PROVISIONAL.
    Cuando tengas el número real de WhatsApp, cambia SOLO este valor.
    Formato internacional sin +, espacios ni guiones.
  */
  whatsapp: "51999999999",

  whatsappDefaultMessage:
    "Hola TinkyTech, quisiera consultar por un servicio.",

  whatsappFormPrefix:
    "Hola TinkyTech, quiero solicitar información."
};


/* ------------------------------------------------------------
   INICIO
   ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initRevealAnimations();
  initActiveNavigation();
  initProblemSelector();
  initChallenge();
  initServiceForm();
  initGalleryModal();
  initBackToTop();
  initCurrentYear();
  initWhatsAppLinks();
  initFAQ();
});


/* ============================================================
   1. HEADER AL HACER SCROLL
   ============================================================ */

function initHeaderScroll() {
  const header = document.getElementById("site-header");

  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );
}


/* ============================================================
   2. MENÚ MÓVIL
   ============================================================ */

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (!menuToggle || !mainNav) return;

  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );

    document.body.classList.toggle("menu-open", isOpen);
  };

  menuToggle.addEventListener("click", toggleMenu);

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mainNav.classList.contains("is-open")
    ) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.classList.contains("is-open")) return;

    const clickedHeader = event.target.closest(".site-header");

    if (!clickedHeader) {
      closeMenu();
    }
  });

  /*
    CSS y JS utilizan el mismo breakpoint:
    900px.
  */
  const mediaQuery = window.matchMedia("(min-width: 900px)");

  const handleBreakpoint = (event) => {
    if (event.matches) {
      closeMenu();
    }
  };

  mediaQuery.addEventListener("change", handleBreakpoint);
}


/* ============================================================
   3. DESPLAZAMIENTO SUAVE
   ============================================================ */

function initSmoothScroll() {
  const links = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
  );

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      /*
        No modificamos el historial con cada click.
        Esto evita que el botón "Atrás" se vuelva incómodo
        por tener muchas entradas de navegación.
      */
    });
  });
}


/* ============================================================
   4. ANIMACIONES REVEAL
   ============================================================ */

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  /*
    Respeta a usuarios que prefieren menos movimiento.
  */
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("active");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("active");
        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}


/* ============================================================
   5. NAVEGACIÓN ACTIVA
   ============================================================ */

function initActiveNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navLinks.length) return;

  const sections = [
    "inicio",
    "servicios",
    "problemas",
    "proceso",
    "trabajos",
    "nosotros"
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio
        );

      if (!visibleSections.length) return;

      const activeId = visibleSections[0].target.id;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${activeId}`
        );
      });
    },
    {
      threshold: [0.18, 0.35, 0.55],
      rootMargin:
        `-${Math.round(window.innerHeight * 0.12)}px 0px -45% 0px`
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}


/* ============================================================
   6. SELECTOR DE PROBLEMAS
   ============================================================ */

function initProblemSelector() {
  const buttons = document.querySelectorAll(".problem-option");
  const result = document.getElementById("problem-result");

  if (!buttons.length || !result) return;

  const messages = {
    "no-enciende": {
      title: "No enciende",
      icon: "bx-power-off",
      text:
        "Puede estar relacionado con alimentación eléctrica, fuente de poder, conexiones internas, placa base u otros factores."
    },

    lenta: {
      title: "Está lenta",
      icon: "bx-timer",
      text:
        "Puede deberse al almacenamiento, memoria, programas en segundo plano, sistema operativo, mantenimiento u otras causas."
    },

    "sin-imagen": {
      title: "No muestra imagen",
      icon: "bx-desktop",
      text:
        "Puede relacionarse con memoria RAM, conexiones, monitor, tarjeta gráfica u otros componentes."
    },

    reinicia: {
      title: "Se reinicia",
      icon: "bx-refresh",
      text:
        "Puede existir una causa relacionada con temperatura, alimentación, hardware, controladores o software."
    },

    calienta: {
      title: "Se calienta",
      icon: "bx-thermometer",
      text:
        "Puede estar relacionado con ventilación, acumulación de polvo, temperatura, pasta térmica o carga de trabajo."
    },

    ruido: {
      title: "Hace mucho ruido",
      icon: "bx-volume-full",
      text:
        "Puede deberse a ventiladores, vibraciones, almacenamiento mecánico u otros elementos del equipo."
    },

    otro: {
      title: "Otro problema",
      icon: "bx-message-rounded-dots",
      text:
        "Cuéntanos qué ocurre con tu equipo para orientarte mejor y determinar si corresponde realizar una revisión."
    }
  };

  const renderResult = (key) => {
    const data = messages[key];

    if (!data) return;

    result.innerHTML = `
      <div class="result-icon">
        <i class="bx ${escapeHTML(data.icon)}"></i>
      </div>

      <p class="eyebrow">ORIENTACIÓN GENERAL</p>

      <h3>${escapeHTML(data.title)}</h3>

      <p>${escapeHTML(data.text)}</p>

      <p class="result-warning">
        Un mismo síntoma puede tener diferentes causas.
        Recomendamos una revisión técnica para determinar el origen.
      </p>

      <a class="btn btn-primary" href="#contacto">
        Solicitar revisión
      </a>
    `;

    const diagnosisLink = result.querySelector(
      'a[href="#contacto"]'
    );

    if (diagnosisLink) {
      diagnosisLink.addEventListener("click", (event) => {
        const target = document.getElementById("contacto");

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        item.classList.remove("is-selected");
      });

      button.classList.add("is-selected");

      renderResult(button.dataset.problem);

      /*
        En móvil desplazamos ligeramente al resultado
        para que la respuesta quede visible.
      */
      if (window.innerWidth < 760) {
        setTimeout(() => {
          result.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }, 100);
      }
    });
  });
}


/* ============================================================
   7. DESAFÍO TECNOLÓGICO
   ============================================================ */

function initChallenge() {
  const buttons = document.querySelectorAll(
    ".challenge-options button"
  );

  const feedback = document.getElementById(
    "challenge-feedback"
  );

  if (!buttons.length || !feedback) return;

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        item.classList.remove("is-correct", "is-wrong");
      });

      if (index === 3) {
        button.classList.add("is-correct");

        feedback.textContent =
          "✅ ¡Correcto! Un mismo síntoma puede tener diferentes causas. La revisión técnica permite conocer mejor el origen.";
      } else {
        button.classList.add("is-wrong");

        feedback.textContent =
          "💡 Esa puede ser una posibilidad, pero el síntoma por sí solo no permite determinar una única causa. Se necesita una revisión completa.";
      }
    });
  });
}


/* ============================================================
   8. FORMULARIO
   ============================================================ */

function initServiceForm() {
  const form = document.getElementById("service-form");
  const status = document.getElementById("form-status");

  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const consentimiento =
      document.getElementById("consentimiento");

    if (!nombre || !telefono || !consentimiento) {
      setFormStatus(
        status,
        "No se pudo validar el formulario. Revisa la estructura HTML.",
        "error"
      );
      return;
    }

    const nombreValue = nombre.value.trim();
    const telefonoValue = telefono.value.trim();

    if (!nombreValue) {
      setFormStatus(
        status,
        "Escribe tu nombre completo.",
        "error"
      );

      nombre.focus();
      return;
    }

    if (!telefonoValue) {
      setFormStatus(
        status,
        "Escribe un número de WhatsApp para poder responderte.",
        "error"
      );

      telefono.focus();
      return;
    }

    if (!consentimiento.checked) {
      setFormStatus(
        status,
        "Debes aceptar el uso de los datos para continuar.",
        "error"
      );

      consentimiento.focus();
      return;
    }

    const formData = new FormData(form);

    const data = {
      nombre: String(formData.get("nombre") || "").trim(),
      telefono: String(formData.get("telefono") || "").trim(),
      equipo: String(formData.get("equipo") || "").trim(),
      servicio: String(formData.get("servicio") || "").trim(),
      mensaje: String(formData.get("mensaje") || "").trim()
    };

    const whatsappMessage = buildWhatsAppMessage(data);

    const whatsappUrl =
      `https://wa.me/${TINKYTECH_CONFIG.whatsapp}` +
      `?text=${encodeURIComponent(whatsappMessage)}`;

    setFormStatus(
      status,
      "✅ Listo. Se abrirá WhatsApp con la información de tu solicitud.",
      "success"
    );

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  });
}


/* ============================================================
   9. MENSAJE DE WHATSAPP
   ============================================================ */

function buildWhatsAppMessage(data) {
  const lines = [
    TINKYTECH_CONFIG.whatsappFormPrefix,
    "",
    `Nombre: ${data.nombre}`,
    `WhatsApp: ${data.telefono}`
  ];

  if (data.equipo) {
    lines.push(`Equipo: ${data.equipo}`);
  }

  if (data.servicio) {
    lines.push(`Servicio: ${data.servicio}`);
  }

  if (data.mensaje) {
    lines.push(
      "",
      `Descripción: ${data.mensaje}`
    );
  }

  return lines.join("\n");
}


/* ============================================================
   10. ACTUALIZAR LINKS DE WHATSAPP
   ============================================================ */

function initWhatsAppLinks() {
  const links = document.querySelectorAll(
    ".js-whatsapp-link"
  );

  if (!links.length) return;

  const defaultUrl =
    `https://wa.me/${TINKYTECH_CONFIG.whatsapp}` +
    `?text=${encodeURIComponent(
      TINKYTECH_CONFIG.whatsappDefaultMessage
    )}`;

  links.forEach((link) => {
    link.href = defaultUrl;
  });
}


/* ============================================================
   11. GALERÍA / MODAL
   ============================================================ */

function initGalleryModal() {
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("gallery-modal-image");
  const modalTitle = document.getElementById("gallery-modal-title");
  const modalDescription =
    document.getElementById("gallery-modal-description");

  const cards = document.querySelectorAll(
    ".work-card[data-gallery-image]"
  );

  const closeTriggers = document.querySelectorAll(
    "[data-close-gallery]"
  );

  if (
    !modal ||
    !modalImage ||
    !modalTitle ||
    !modalDescription ||
    !cards.length
  ) {
    return;
  }

  let lastFocusedElement = null;

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    /*
      Pequeño tiempo para evitar lectura accidental
      del contenido al cerrar.
    */
    setTimeout(() => {
      modalImage.src = "";
      modalImage.alt = "";
    }, 250);

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const openModal = (card) => {
    const image =
      card.dataset.galleryImage || "";

    const title =
      card.dataset.galleryTitle || "Evidencia TinkyTech";

    const description =
      card.dataset.galleryDescription ||
      "Evidencia del proyecto.";

    modalImage.src = image;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    lastFocusedElement = card;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeButton =
      modal.querySelector(".gallery-modal-close");

    if (closeButton) {
      closeButton.focus();
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card);
    });
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeModal();
    }
  });
}


/* ============================================================
   12. FAQ
   ============================================================ */

function initFAQ() {
  const faqItems =
    document.querySelectorAll(".faq-item");

  if (!faqItems.length) return;

  /*
    Cerramos una FAQ anterior cuando abrimos otra.
    Esto mantiene la sección compacta, especialmente en celular.
  */
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
}


/* ============================================================
   13. BOTÓN VOLVER ARRIBA
   ============================================================ */

function initBackToTop() {
  const button =
    document.getElementById("back-to-top");

  if (!button) return;

  const updateVisibility = () => {
    button.classList.toggle(
      "is-visible",
      window.scrollY > 500
    );
  };

  updateVisibility();

  window.addEventListener(
    "scroll",
    updateVisibility,
    { passive: true }
  );

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* ============================================================
   14. AÑO ACTUAL
   ============================================================ */

function initCurrentYear() {
  const yearElement =
    document.getElementById("current-year");

  if (!yearElement) return;

  yearElement.textContent =
    String(new Date().getFullYear());
}


/* ============================================================
   15. ESTADO DEL FORMULARIO
   ============================================================ */

function setFormStatus(
  element,
  message,
  type
) {
  if (!element) return;

  element.textContent = message;
  element.className = "form-status";

  if (type === "error") {
    element.classList.add("is-error");
  }

  if (type === "success") {
    element.classList.add("is-success");
  }
}


/* ============================================================
   16. ESCAPE DE HTML
   ============================================================ */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ============================================================
   17. PROTECCIÓN DE CIERRE DE MODAL CON TAB / CLICK
   ============================================================ */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;

  const modal =
    document.getElementById("gallery-modal");

  if (
    !modal ||
    !modal.classList.contains("is-open")
  ) {
    return;
  }

  /*
    Mantener el foco dentro del modal.
    Es una mejora pequeña de accesibilidad.
  */
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    document.activeElement === last
  ) {
    event.preventDefault();
    first.focus();
  }
});
