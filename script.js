/* ============================================================
   TINKYTECH — SCRIPT.JS
   Versión 1.0 · Interacciones de la landing page
   ============================================================ */

/* ============================================================
   1. INICIALIZACIÓN
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initProblemSelector();
  initChallenge();
  initServiceForm();
  initBackToTop();
  initCurrentYear();
  initFAQ();
});


/* ============================================================
   2. MENÚ MÓVIL
   ============================================================ */

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (!menuToggle || !mainNav) return;

  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.classList.contains("is-open")) return;

    const clickedInsideHeader =
      event.target.closest(".site-header");

    if (!clickedInsideHeader) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 760) {
      closeMenu();
    }
  });
}


/* ============================================================
   3. HEADER AL HACER SCROLL
   ============================================================ */

function initHeaderScroll() {
  const header = document.getElementById("site-header");

  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 25) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );
}


/* ============================================================
   4. DESPLAZAMIENTO SUAVE
   ============================================================ */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

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

      history.replaceState(null, "", targetId);
    });
  });
}


/* ============================================================
   5. SELECTOR:
      ¿QUÉ PROBLEMA TIENE TU COMPUTADORA?
   ============================================================ */

function initProblemSelector() {
  const problemButtons = document.querySelectorAll(".problem-option");
  const problemResult = document.getElementById("problem-result");

  if (!problemButtons.length || !problemResult) return;

  const problemMessages = {
    "no-enciende": {
      title: "No enciende",
      text:
        "Puede estar relacionado con alimentación eléctrica, fuente de poder, conexiones internas, placa base u otros factores."
    },

    "lenta": {
      title: "Está muy lenta",
      text:
        "Puede deberse al almacenamiento, memoria, programas en segundo plano, sistema operativo, mantenimiento u otras causas."
    },

    "sin-imagen": {
      title: "No muestra imagen",
      text:
        "Puede estar relacionado con memoria RAM, conexiones, monitor, tarjeta gráfica o diferentes componentes."
    },

    "reinicia": {
      title: "Se reinicia",
      text:
        "Puede existir una causa relacionada con temperatura, energía, hardware, controladores o software."
    },

    "calienta": {
      title: "Se calienta",
      text:
        "Puede relacionarse con ventilación, acumulación de polvo, temperatura ambiente, pasta térmica o carga de trabajo."
    },

    "ruido": {
      title: "Hace mucho ruido",
      text:
        "Puede deberse a ventiladores, vibraciones, almacenamiento mecánico u otros elementos del equipo."
    },

    "otro": {
      title: "Otro problema",
      text:
        "Cuéntanos qué ocurre con tu equipo para orientarte mejor y determinar si corresponde realizar una revisión."
    }
  };

  const renderResult = (key) => {
    const data = problemMessages[key];

    if (!data) return;

    problemResult.innerHTML = `
      <div class="result-icon">💡</div>

      <p class="eyebrow">ORIENTACIÓN GENERAL</p>

      <h3>${escapeHTML(data.title)}</h3>

      <p>${escapeHTML(data.text)}</p>

      <p class="result-warning">
        Un mismo síntoma puede tener diferentes causas.
        Recomendamos una revisión técnica para determinar el origen.
      </p>

      <a class="btn btn-primary" href="#contacto">
        Solicitar diagnóstico
      </a>
    `;

    const diagnosisLink =
      problemResult.querySelector('a[href="#contacto"]');

    if (diagnosisLink) {
      diagnosisLink.addEventListener("click", (event) => {
        const target = document.querySelector("#contacto");

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(null, "", "#contacto");
      });
    }
  };

  problemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      problemButtons.forEach((item) => {
        item.classList.remove("is-selected");
      });

      button.classList.add("is-selected");

      const key = button.dataset.problem;

      renderResult(key);
    });
  });
}


/* ============================================================
   6. DESAFÍO TECNOLÓGICO
   ============================================================ */

function initChallenge() {
  const challengeButtons =
    document.querySelectorAll(".challenge-options button");

  const challengeFeedback =
    document.getElementById("challenge-feedback");

  if (!challengeButtons.length || !challengeFeedback) return;

  challengeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      challengeButtons.forEach((item) => {
        item.classList.remove("is-correct", "is-wrong");
      });

      /*
        La opción D representa mejor la idea central:
        un mismo síntoma puede tener diferentes causas.
      */

      if (index === 3) {
        button.classList.add("is-correct");

        challengeFeedback.textContent =
          "✅ ¡Correcto! Un mismo síntoma puede tener diferentes causas. Para conocer el origen real se necesita una revisión técnica completa.";
      } else {
        button.classList.add("is-wrong");

        challengeFeedback.textContent =
          "💡 Esta puede ser una posibilidad, pero no es posible determinar una única causa solo con el síntoma. El diagnóstico requiere una revisión completa.";
      }
    });
  });
}


/* ============================================================
   7. FORMULARIO DE SOLICITUD
   ============================================================ */

function initServiceForm() {
  const form = document.getElementById("service-form");
  const formStatus = document.getElementById("form-status");

  if (!form || !formStatus) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const consentimiento =
      document.getElementById("consentimiento");

    if (!nombre || !telefono || !consentimiento) {
      setFormStatus(
        formStatus,
        "No se pudo validar el formulario. Revisa la estructura HTML.",
        "error"
      );

      return;
    }

    const nombreValue = nombre.value.trim();
    const telefonoValue = telefono.value.trim();

    if (!nombreValue || !telefonoValue) {
      setFormStatus(
        formStatus,
        "Por favor completa los campos obligatorios.",
        "error"
      );

      if (!nombreValue) {
        nombre.focus();
      } else {
        telefono.focus();
      }

      return;
    }

    if (!consentimiento.checked) {
      setFormStatus(
        formStatus,
        "Debes aceptar el uso de tus datos para poder enviar la consulta.",
        "error"
      );

      consentimiento.focus();

      return;
    }

    /*
      Esta primera versión no envía todavía información a un servidor.
      Más adelante podemos conectar el formulario con:
      - WhatsApp
      - Google Forms
      - Google Sheets + Apps Script
      - otro servicio externo
    */

    const formData = new FormData(form);

    const serviceRequest = {
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono"),
      equipo: formData.get("equipo"),
      servicio: formData.get("servicio"),
      modalidad: formData.get("modalidad"),
      zona: formData.get("zona"),
      mensaje: formData.get("mensaje")
    };

    console.log(
      "Solicitud TinkyTech preparada:",
      serviceRequest
    );

    setFormStatus(
      formStatus,
      "✅ Solicitud preparada correctamente. En la siguiente fase conectaremos este formulario con el canal real de atención.",
      "success"
    );

    form.reset();
  });
}


/* ============================================================
   8. ESTADO DEL FORMULARIO
   ============================================================ */

function setFormStatus(element, message, type) {
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
   9. BOTÓN "VOLVER ARRIBA"
   ============================================================ */

function initBackToTop() {
  const backToTop = document.getElementById("back-to-top");

  if (!backToTop) return;

  const updateButton = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  };

  updateButton();

  window.addEventListener(
    "scroll",
    updateButton,
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* ============================================================
   10. AÑO AUTOMÁTICO
   ============================================================ */

function initCurrentYear() {
  const yearElement =
    document.getElementById("current-year");

  if (!yearElement) return;

  yearElement.textContent =
    new Date().getFullYear();
}


/* ============================================================
   11. FAQ
   ============================================================ */

function initFAQ() {
  const faqItems =
    document.querySelectorAll(".faq-item");

  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      /*
        Mantiene el comportamiento sencillo del acordeón.
        No cerramos automáticamente las otras preguntas porque
        en móvil puede ser útil comparar respuestas.
      */
    });
  });
}


/* ============================================================
   12. SEGURIDAD BÁSICA PARA TEXTO DINÁMICO
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
   13. UTILIDADES FUTURAS
   ============================================================ */

/*
  Espacio reservado para próximas funciones de TinkyTech:

  - Galería con modal.
  - Filtros por tipo de evidencia.
  - Formulario conectado a WhatsApp.
  - Google Sheets / Apps Script.
  - Sistema de tickets.
  - Consulta del estado de solicitudes.
  - Validación avanzada de teléfonos.
  - Toasts / notificaciones.
  - Animaciones al entrar en pantalla.
  - Modo accesibilidad.
  - Analítica de uso.

  Estas funciones se irán agregando sin sobrecargar index.html.
*/
