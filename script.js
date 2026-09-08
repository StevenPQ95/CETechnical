/* ============================================================
   TINKYTECH — SCRIPT.JS (VERSIÓN PROFESIONAL)
   Interactividad, animaciones y conexión a WhatsApp
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initRevealAnimations();
  initServiceForm();
  initBackToTop();
  initCurrentYear();
});

/* ============================================================
   1. MENÚ MÓVIL
   ============================================================ */
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {
    // Si está oculto (display none), lo mostramos como flex
    if (mainNav.style.display === "flex") {
      mainNav.style.display = "none";
    } else {
      mainNav.style.display = "flex";
      mainNav.style.flexDirection = "column";
      mainNav.style.position = "absolute";
      mainNav.style.top = "100%";
      mainNav.style.left = "0";
      mainNav.style.width = "100%";
      mainNav.style.background = "rgba(3, 17, 31, 0.95)";
      mainNav.style.padding = "20px";
      mainNav.style.backdropFilter = "blur(10px)";
    }
  });

  // Cerrar menú al hacer click en un enlace (en versión móvil)
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 900) {
        mainNav.style.display = "none";
      }
    });
  });
}

/* ============================================================
   2. HEADER AL HACER SCROLL (Efecto Cristal)
   ============================================================ */
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/* ============================================================
   3. DESPLAZAMIENTO SUAVE ENTRE SECCIONES
   ============================================================ */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ============================================================
   4. ANIMACIONES REVEAL (Aparición al hacer scroll)
   ============================================================ */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Opcional: dejar de observar una vez que aparece
        // observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.12 }); // Se activa cuando el 12% del elemento es visible

  reveals.forEach(element => {
    observer.observe(element);
  });
}

/* ============================================================
   5. FORMULARIO DE SOLICITUD (CONECTADO A WHATSAPP)
   ============================================================ */
function initServiceForm() {
  const form = document.getElementById("service-form");
  const formStatus = document.getElementById("form-status");

  if (!form || !formStatus) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Capturar los valores de los inputs
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const equipo = document.getElementById("equipo").value;
    const servicioElem = document.getElementById("servicio");
    const servicio = servicioElem.options[servicioElem.selectedIndex].text;
    const mensaje = document.getElementById("mensaje").value.trim();
    const consentimiento = document.getElementById("consentimiento");

    // Validaciones básicas
    if (!nombre || !telefono) {
      setFormStatus(formStatus, "⚠️ Por favor completa tu nombre y número de contacto.", "error");
      return;
    }

    if (!consentimiento.checked) {
      setFormStatus(formStatus, "⚠️ Debes aceptar el envío de datos para cotizar.", "error");
      return;
    }

    // Número de teléfono de TinkyTech (IMPORTANTE: Reemplazar por el número real del proyecto)
    // No usar el símbolo '+'
    const numeroWhatsApp = "51938342188"; 
    
    // Crear el mensaje formateado usando saltos de línea codificados (%0A)
    let textoWhatsApp = `*¡Hola equipo TinkyTech!* 🔧%0AMi nombre es *${nombre}* y quisiera solicitar un servicio:%0A%0A`;
    
    if (equipo !== "No especificado") {
      textoWhatsApp += `💻 *Mi equipo:* ${equipo}%0A`;
    }
    
    if (servicioElem.value !== "No especificado") {
      textoWhatsApp += `🛠️ *Servicio requerido:* ${servicio}%0A`;
    }
    
    if (mensaje) {
      textoWhatsApp += `📝 *Detalle del problema:* ${mensaje}%0A`;
    }
    
    textoWhatsApp += `%0AMi número de contacto es: ${telefono}`;

    // Abrir WhatsApp en una nueva pestaña (EncodeURIComponent asegura que los espacios funcionen bien)
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;
    window.open(urlWhatsApp, '_blank');

    // Mensaje de éxito en la página
    setFormStatus(formStatus, "✅ ¡Listo! Te estamos redirigiendo a WhatsApp de manera segura.", "success");
    
    // Limpiar formulario tras unos segundos
    setTimeout(() => {
      form.reset();
      formStatus.style.display = 'none';
    }, 4000);
  });
}

// Función auxiliar para mostrar el mensaje de estado del formulario
function setFormStatus(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.className = "form-status";
  
  if (type === "error") element.classList.add("is-error");
  if (type === "success") element.classList.add("is-success");
}

/* ============================================================
   6. BOTÓN VOLVER ARRIBA
   ============================================================ */
function initBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  const updateButton = () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  };

  updateButton();
  window.addEventListener("scroll", updateButton, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================================
   7. AÑO AUTOMÁTICO EN EL FOOTER
   ============================================================ */
function initCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
