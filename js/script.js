// MENU
function toggleMenu() {
    playClick();
    const menu = document.getElementById("menu");
    // Toggle a class on body so CSS can respond (shift content when menu open)
    document.body.classList.toggle('menu-open');
    if (document.body.classList.contains('menu-open')) {
        menu.style.left = '0px';
    } else {
        menu.style.left = '-200px';
    }
}

function mostrarSeccion(id) {

    document.querySelectorAll(".seccion").forEach(sec => {
        sec.classList.remove("activa");
    });

    const seccion = document.getElementById(id);
    seccion.classList.add("activa");

    activarGlitchTitulo(id);

    // Si la sección tiene un loader marcado con la clase `.loader-text`, usar iniciarCarga
    const loaderText = seccion.querySelector('.loader-text');
    if (loaderText) {
        // iniciarCarga manejará la ocultación/mostrado y la animación de progreso
        iniciarCarga(id);
        return;
    }

    // Si no hay `.loader-text`, mantener el comportamiento previo (si existe un elemento id-loader)
    const loader = document.getElementById(id + "-loader");
    const elementos = seccion.querySelectorAll(".dato, li, .grid-datos div");

    if (loader) {
        loader.classList.add("activo");
        loader.style.opacity = "1";
        loader.textContent = "Conectando a servidor seguro...";

        // Ocultar contenido
        elementos.forEach(el => el.style.opacity = "0");

        setTimeout(() => {
            loader.textContent = "Verificando credenciales...";
        }, 800);

        setTimeout(() => {
            loader.textContent = "Descifrando información...";
        }, 1600);

        setTimeout(() => {
            loader.textContent = "Acceso autorizado ✔";
            loader.style.animation = "none";
        }, 2400);

        setTimeout(() => {
            loader.classList.remove("activo");
            loader.style.opacity = "0";

            // Mostrar contenido uno por uno
            elementos.forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.animation = "fadeIn 0.4s ease";
                }, i * 120);
            });

        }, 3000);
    }
}


function activarGlitchTitulo(seccionId) {
    const titulo = document.querySelector(`#${seccionId} .glitch-title`);
    
    if (titulo) {
        titulo.classList.add("glitch-activo");

        setTimeout(() => {
            titulo.classList.remove("glitch-activo");
        }, 400);
    }
}

// MATRIX EFFECT
const canvas = document.getElementById("matrix");

if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letras = "01HACKER";
    const arrayLetras = letras.split("");

    const tamaño = 16;
    const columnas = canvas.width / tamaño;

    const gotas = [];
    for (let i = 0; i < columnas; i++) {
        gotas[i] = 1;
    }

    function dibujar() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0f0";
        ctx.font = tamaño + "px monospace";

        for (let i = 0; i < gotas.length; i++) {
            const texto = arrayLetras[Math.floor(Math.random() * arrayLetras.length)];
            ctx.fillText(texto, i * tamaño, gotas[i] * tamaño);

            if (gotas[i] * tamaño > canvas.height && Math.random() > 0.975)
                gotas[i] = 0;

            gotas[i]++;
        }
    }

    setInterval(dibujar, 33);
}

// BOTÓN EXPLOTA
const boton = document.getElementById("boton");

if (boton) {
    boton.addEventListener("click", () => {
        document.getElementById("terminal").innerHTML =
            "⚠ SISTEMA COMPROMETIDO ⚠ <br> Acceso concedido...";
    });
}

// AUDIO DE FONDO: intentar autoplay y ofrecer fallback si se bloquea
const bgAudio = new Audio('audio/hacker.mp3');
bgAudio.loop = true;
bgAudio.preload = 'auto';

function tryAutoplayAudio() {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // reproducción automática iniciada
        }).catch(() => {
            // Autoplay bloqueado: mostrar botón de reproducción
            showAudioPlayButton();
        });
    }
}

function showAudioPlayButton() {
    if (document.getElementById('audio-play-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'audio-play-btn';
    btn.className = 'btn-hacker';
    btn.textContent = 'Activar audio';
    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.zIndex = '9999';
    btn.addEventListener('click', () => {
        bgAudio.play().catch(() => {});
        btn.remove();
    });
    document.body.appendChild(btn);
}

// Intentar autoplay al cargar
window.addEventListener('load', () => {
    tryAutoplayAudio();
});

// Si el usuario interactúa, intentar reproducir (por si autoplay falló)
document.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
        playClick();
    }
});
function toggleDato(elemento) {
    const dato = elemento.parentElement;
    dato.classList.toggle("abierto");

    if (dato.classList.contains("abierto")) {
        elemento.innerHTML = elemento.innerHTML.replace("🔒", "🔓");
    } else {
        elemento.innerHTML = elemento.innerHTML.replace("🔓", "🔒");
    }
}
function revelarTodo() {

    document.querySelectorAll(".dato-contenido").forEach(d => {
        d.style.display = "block";
    });

    document.getElementById("mensaje-acceso").textContent =
        "🟢 ACCESO AUTORIZADO";

    document.querySelectorAll(".dato").forEach(dato => {
        dato.classList.add("abierto");
        const header = dato.querySelector(".dato-header");
        const contenido = dato.querySelector(".terminal-text");

        header.innerHTML = header.innerHTML.replace("🔒", "🔓");
        escribirTerminal(contenido);
    });
}
function toggleDato(elemento) {
    const dato = elemento.parentElement;
    const contenido = dato.querySelector(".terminal-text");
    const mensaje = document.getElementById("mensaje-acceso");

    dato.classList.toggle("abierto");

    if (dato.classList.contains("abierto")) {
        elemento.innerHTML = elemento.innerHTML.replace("🔒", "🔓");
        escribirTerminal(contenido);
        mensaje.innerHTML = "✅ ACCESO AUTORIZADO";
        mensaje.classList.add("autorizado");
    } else {
        elemento.innerHTML = elemento.innerHTML.replace("🔓", "🔒");
        contenido.innerHTML = "";
        mensaje.innerHTML = "🔐 SISTEMA BLOQUEADO";
        mensaje.classList.remove("autorizado");
    }
}

function escribirTerminal(elemento) {
    const texto = elemento.getAttribute("data-text");
    elemento.innerHTML = "";
    let i = 0;

    const intervalo = setInterval(() => {
        elemento.innerHTML += texto.charAt(i);
        i++;
        if (i >= texto.length) {
            clearInterval(intervalo);
        }
    }, 30);
}
function activarGlitchTitulo(seccionId) {
    const titulo = document.querySelector(`#${seccionId} h2`);
    if (titulo) {
        titulo.classList.add("glitch-activo");
        setTimeout(() => {
            titulo.classList.remove("glitch-activo");
        }, 400);
    }
}
function glitchLogros() {
    const items = document.querySelectorAll("#logros .logro-item");
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = "glitch 0.3s linear";
            setTimeout(() => {
                item.style.animation = "";
            }, 300);
        }, index * 200);
    });
}
window.addEventListener("load", () => {
    activarGlitchTitulo("inicio");
    // Si la sección 'inicio' tiene loader, iniciarlo al cargar
    const inicioSec = document.getElementById('inicio');
    if (inicioSec && inicioSec.querySelector('.loader-text')) {
        iniciarCarga('inicio');
    }
});

// Click sound: use Audio object so it works even without an <audio> element
const clickSound = document.getElementById("clickSound");

function playClick() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
}

// Global click handler: play click sound on most clicks and ensure bgAudio starts after user interaction
document.addEventListener("click", function(e) {
    const tag = e.target.tagName;

    if (tag === "BUTTON" || tag === "A" || e.target.classList.contains("dato-header")) {
        playClick();
    }
});
let visitas = 1;

setInterval(() => {
    visitas += Math.floor(Math.random() * 3);
    document.getElementById("contador-visitas").textContent =
        "VISITAS: " + visitas.toString().padStart(6, "0");
}, 2000);
function actualizarFecha() {
    const ahora = new Date();
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    document.getElementById("fecha-actual").textContent =
        "🛰️ " + ahora.toLocaleDateString("es-ES", opciones);
}

setInterval(actualizarFecha, 1000);
actualizarFecha();

const fakeLocations = [
    "IP detectada: 192.168.0.45",
    "Nodo activo: Sucre, BO",
    "Proxy detectado: Nivel 2",
    "Lat: -19.03 | Long: -65.26",
    "Red segura: CHQ-Server-09",
    "Rastreo satelital activo..."
];

function cambiarUbicacion() {
    const random = fakeLocations[
        Math.floor(Math.random() * fakeLocations.length)
    ];

    document.getElementById("fake-location").textContent = random;
}

setInterval(cambiarUbicacion, 3000);

function actualizarSistema() {

    let threat = Math.floor(Math.random() * 100);
    let power = Math.floor(Math.random() * 100);

    document.getElementById("threat-bar").style.width = threat + "%";
    document.getElementById("threat-text").textContent = threat + "%";

    document.getElementById("power-bar").style.width = power + "%";
    document.getElementById("power-text").textContent = power + "%";

    const firewall = document.getElementById("firewall-status");

    if (threat > 70) {
        firewall.textContent = "BREACH DETECTED";
        firewall.style.color = "red";
    } else {
        firewall.textContent = "ACTIVE";
        firewall.style.color = "#00ff88";
    }
}

setInterval(actualizarSistema, 4000);
actualizarSistema();
function mostrarSeccion(id) {

    document.querySelectorAll(".seccion").forEach(sec => {
        sec.classList.remove("activa");
    });

    const seccion = document.getElementById(id);
    seccion.classList.add("activa");

    activarGlitchTitulo(id);

    const loader = seccion.querySelector(".loader-text");
    const elementos = seccion.querySelectorAll(".dato, li, .grid-datos div");

    if (loader) {

        loader.style.opacity = "1";
        loader.textContent = "Conectando al sistema...";

        elementos.forEach(el => el.style.opacity = "0");

        setTimeout(() => loader.textContent = "Verificando credenciales...", 700);
        setTimeout(() => loader.textContent = "Descifrando información...", 1400);
        setTimeout(() => loader.textContent = "Acceso autorizado ✔", 2100);

        setTimeout(() => {

            loader.style.opacity = "0";

            if (id === "inicio") {
        const contenido = document.getElementById("inicio-contenido");
        contenido.classList.add("visible");
    }

            elementos.forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    el.style.animation = "fadeIn 0.4s ease";
                }, i * 120);
            });

        }, 2600);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    mostrarSeccion("inicio");
});

function efectoNoInteractivo(elemento) {

    elemento.classList.add("feedback-click");

    // 🔥 TEXTO FLOTANTE
    const aviso = document.createElement("div");
    aviso.textContent = "⚠ ACCESS DENIED";
    aviso.style.position = "fixed";
    aviso.style.right = "40px";
    aviso.style.top = "80px";
    aviso.style.color = "#ff4444";
    aviso.style.fontFamily = "monospace";
    aviso.style.fontSize = "14px";
    aviso.style.zIndex = "99999";
    aviso.style.animation = "fadeIn 0.3s ease";

    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.remove();
        elemento.classList.remove("feedback-click");
    }, 800);
}

const noInteractivos = [
    document.getElementById("system-info"),
    document.getElementById("contador-visitas"),
    document.getElementById("system-right-panel")
];

noInteractivos.forEach(el => {
    el.classList.add("no-click");

    el.addEventListener("click", () => {
        efectoNoInteractivo(el);
    });
});