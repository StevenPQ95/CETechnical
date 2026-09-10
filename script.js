/* ============================================================
   TINKYTECH — SCRIPT.JS (EDICIÓN CORPORATIVA PREMIUM)
   ============================================================ */

const TINKYTECH_CONFIG = {
  /* REEMPLAZAR AQUÍ POR EL NÚMERO REAL. Sin símbolos. */
  whatsapp: "51938342188"
};

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initRevealAnimations();
  initServiceForm();
  initDynamicWhatsAppLinks();
  initSmoothScroll();
});

/* ============================================================
   1. HEADER CRISTAL Y SCROLL
   ============================================================ */
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });
}

/* ============================================================
   2. ANIMACIONES REVEAL (Aparición Suave Premium)
   ============================================================ */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observerInstance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   3. INTELIGENCIA WHATSAPP (Saludo por Hora)
   ============================================================ */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

function initDynamicWhatsAppLinks() {
  const links = document.querySelectorAll(".js-whatsapp-link");
  const greeting = getGreeting();
  const defaultMessage = `¡${greeting} equipo TinkyTech! Necesito orientación sobre un servicio.`;
  
  links.forEach(link => {
    link.href = `https://wa.me/${TINKYTECH_CONFIG.whatsapp}?text=${encodeURIComponent(defaultMessage)}`;
  });
}

/* ============================================================
   4. FORMULARIO CORPORATIVO (Validación y UX)
   ============================================================ */
function initServiceForm() {
  const form = document.getElementById("service-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Limpiar errores previos
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.style.borderColor = "");
    status.style.display = "none";

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const consentimiento = document.getElementById("consentimiento");
    
    let hasError = false;

    // Validación Visual (Bordes rojos y vibración)
    if (!nombre.value.trim()) {
      showInputError(nombre);
      hasError = true;
    }
    if (!telefono.value.trim()) {
      showInputError(telefono);
      hasError = true;
    }
    if (!consentimiento.checked) {
      hasError = true;
    }

    if (hasError) {
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 400);
      setFormStatus(status, "⚠️ Por favor, completa los campos obligatorios para continuar.", "error");
      return;
    }

    // Preparar Data
    const formData = new FormData(form);
    const greeting = getGreeting();
    
    let wppText = `¡${greeting} TinkuyTech! 🚀%0AMi nombre es *${formData.get("nombre").trim()}* y quisiera cotizar un servicio:%0A%0A`;
    
    if(formData.get("equipo")) wppText += `💻 *Mi equipo es:* ${formData.get("equipo")}%0A`;
    if(formData.get("servicio")) wppText += `🔧 *Servicio de interés:* ${formData.get("servicio")}%0A`;
    if(formData.get("mensaje").trim()) wppText += `📝 *Detalles:* ${formData.get("mensaje").trim()}%0A`;
    
    wppText += `%0AMi número es: ${formData.get("telefono").trim()}`;

    // Éxito y Redirección
    setFormStatus(status, "✅ Solicitud lista. Redirigiendo a WhatsApp corporativo...", "success");
    
    setTimeout(() => {
      window.open(`https://wa.me/${TINKYTECH_CONFIG.whatsapp}?text=${wppText}`, "_blank");
      form.reset();
      status.style.display = "none";
    }, 1500);
  });
}

function showInputError(inputElement) {
  inputElement.style.borderColor = "#dc2626";
}

function setFormStatus(element, message, type) {
  element.textContent = message;
  element.className = `form-status is-${type}`;
  element.style.display = "block";
}

/* ============================================================
   5. UTILIDADES (Smooth Scroll)
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
