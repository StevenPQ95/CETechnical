// Desplazamiento suave para los enlaces del menú
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const seccionObjetivo = document.querySelector(this.getAttribute('href'));
        seccionObjetivo.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simulación de envío del formulario de contacto
const contactForm = document.getElementById('contactForm');
const mensajeExito = document.getElementById('mensajeExito');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue
    
    // Aquí normalmente se enviaría la información a un servidor, 
    // pero para la simulación, mostraremos un mensaje de éxito.
    
    // Ocultar el formulario
    contactForm.style.display = 'none';
    
    // Mostrar el mensaje de éxito
    mensajeExito.classList.remove('oculto');
    
    // Opcional: Volver a mostrar el formulario después de 5 segundos
    setTimeout(() => {
        contactForm.reset(); // Limpia los campos
        contactForm.style.display = 'flex';
        mensajeExito.classList.add('oculto');
    }, 5000);
});
