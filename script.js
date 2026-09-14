/* =====================================================
   TINKUYTECH
   SCRIPT.JS
   FUNCIONALIDADES PRINCIPALES
===================================================== */


/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */


const CONFIG = {

    whatsapp: "51938342188"

};





document.addEventListener(
"DOMContentLoaded",
()=>{


    initMenu();

    initHeaderScroll();

    initReveal();

    initProblems();

    initFAQ();

    initWhatsApp();

    initForm();

    initTopButton();


});








/* =====================================================
   MENÚ MÓVIL
===================================================== */


function initMenu(){


const button =
document.getElementById("menu-btn");


const nav =
document.getElementById("nav");



if(!button || !nav)
return;



button.addEventListener(
"click",
()=>{


nav.classList.toggle("active");


button.classList.toggle("open");


});





nav.querySelectorAll("a")
.forEach(link=>{


link.addEventListener(
"click",
()=>{


nav.classList.remove("active");


});


});



}










/* =====================================================
   HEADER AL HACER SCROLL
===================================================== */


function initHeaderScroll(){


const header =
document.getElementById("header");



if(!header)
return;



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 40){

header.classList.add("scrolled");


}

else{


header.classList.remove("scrolled");


}


});


}









/* =====================================================
   ANIMACIONES SCROLL
===================================================== */


function initReveal(){


const elements =
document.querySelectorAll(
".service-card, .trust-card, .process-card, .work-card, .value-card"
);



if(!elements.length)
return;




const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"active"
);


observer.unobserve(
entry.target
);


}



});


},
{

threshold:.15

}
);





elements.forEach(
element=>{


element.classList.add(
"reveal"
);


observer.observe(
element
);


});


}









/* =====================================================
   SELECTOR DE PROBLEMAS
===================================================== */


function initProblems(){


const buttons =
document.querySelectorAll(
".problem-btn"
);



const result =
document.getElementById(
"problem-result"
);



if(!buttons.length || !result)
return;



const answers = {


lenta:

"Una computadora lenta puede tener diferentes causas como almacenamiento lleno, falta de mantenimiento, programas innecesarios o limitaciones del hardware. Recomendamos una revisión técnica.",



enciende:

"Si el equipo no enciende puede existir un problema relacionado con energía, componentes internos o conexiones. Es necesario realizar una evaluación.",



imagen:

"La ausencia de imagen puede estar relacionada con pantalla, cables, memoria RAM, tarjeta gráfica u otros componentes. Se recomienda revisar el equipo.",



calor:

"El calentamiento puede aparecer por acumulación de polvo, ventilación insuficiente o problemas térmicos. Una revisión permite determinar la causa.",



ruido:

"Los sonidos extraños pueden relacionarse con ventiladores, discos u otros componentes. Es recomendable realizar una inspección.",



otro:

"Cada equipo puede presentar diferentes síntomas. Explícanos el problema para orientarte correctamente."


};





buttons.forEach(
button=>{


button.addEventListener(
"click",
()=>{


const type =
button.dataset.problem;



result.innerHTML = `

<i class="bx bx-info-circle"></i>

<p>

${answers[type]}

</p>

`;



buttons.forEach(
btn=>
btn.classList.remove("selected")
);



button.classList.add(
"selected"
);



});


});


}









/* =====================================================
   FAQ ACORDEÓN
===================================================== */


function initFAQ(){


const questions =
document.querySelectorAll(
".faq-question"
);



questions.forEach(
question=>{


question.addEventListener(
"click",
()=>{


const item =
question.parentElement;



item.classList.toggle(
"active"
);



});


});


}









/* =====================================================
   WHATSAPP
===================================================== */


function initWhatsApp(){



const links =
document.querySelectorAll(
".js-whatsapp"
);



if(!links.length)
return;



const message =

"Hola TinkuyTech 👋. Deseo solicitar orientación técnica sobre mi equipo.";




links.forEach(
link=>{


link.href =

`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;



link.target="_blank";


});


}









/* =====================================================
   FORMULARIO
===================================================== */


function initForm(){



const form =
document.getElementById(
"service-form"
);



if(!form)
return;



form.addEventListener(
"submit",
(event)=>{


event.preventDefault();



const nombre =
document.getElementById(
"nombre"
).value.trim();



const telefono =
document.getElementById(
"telefono"
).value.trim();



const equipo =
document.getElementById(
"equipo"
).value;



const servicio =
document.getElementById(
"servicio"
).value;



const mensaje =
document.getElementById(
"mensaje"
).value.trim();



const privacidad =
document.getElementById(
"privacidad"
).checked;



const response =
document.getElementById(
"form-message"
);





if(
nombre === "" ||
telefono === "" ||
!privacidad
){


response.innerHTML =
"⚠️ Completa los datos obligatorios antes de enviar.";


response.style.color =
"red";


return;


}







const text =

`

Hola TinkuyTech 👋


Deseo solicitar orientación técnica.


👤 Nombre:
${nombre}


📱 WhatsApp:
${telefono}


💻 Equipo:
${equipo}


🔧 Servicio:
${servicio}


📝 Problema:
${mensaje}


`;






response.innerHTML =

"✅ Solicitud preparada. Abriendo WhatsApp...";



response.style.color =
"green";




setTimeout(
()=>{


window.open(

`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`,

"_blank"

);



},
1000
);



});


}









/* =====================================================
   BOTÓN SUBIR ARRIBA
===================================================== */


function initTopButton(){


const button =
document.getElementById(
"top-button"
);



if(!button)
return;



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 500){


button.classList.add(
"show"
);


}

else{


button.classList.remove(
"show"
);


}


});





button.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});



}
