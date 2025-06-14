let modoOscuro = true; // Variable para controlar el modo oscuro
let botonModo = document.getElementById("modo"); // Botón para cambiar el modo
botonModo.addEventListener("click", cambiarModo); // Evento para cambiar el modo al hacer clic

function cambiarModo() {
    let fondo = document.querySelector("*");
    let btnCont = document.querySelectorAll(".btnCont");
    let btn = document.querySelector("#modo");
    let header = document.querySelector("header");
    let encabezado = document.querySelector(".encabezado");
    let perfil = document.querySelector(".Perfil");
    let descripcion = document.querySelector(".des");
    let tarjeta = document.querySelectorAll(".Tarjeta");
    let globos = document.querySelector(".Globos");
    let iconos = document.querySelector(".Iconos");

    if (modoOscuro) {
        fondo.style.backgroundColor = "#17202a";
        fondo.style.color = "white";
        btnCont.forEach((btnCont) => {
            btnCont.style.backgroundColor = "#1c2833";
        });
        header.style.backgroundColor = "#17202a";
        encabezado.style.backgroundColor = "#17202a";
        perfil.style.boxShadow = "5px 5px 5px black";
        descripcion.style.backgroundColor = "#1c2833";
        descripcion.style.boxShadow = "5px 5px 5px black";

        tarjeta.forEach((tarjeta) => {
            tarjeta.style.backgroundColor = "#1c2833";
            tarjeta.style.boxShadow = "5px 5px 5px black";
        });

        // header.style.backgroundColor = "#17202a";

        globos.style.backgroundColor = "#1c2833";
        globos.style.boxShadow = "5px 5px 5px black";

        iconos.style.backgroundColor = "#1c2833";
        iconos.style.boxShadow = "5px 5px 5px black";

        botonModo.textContent = "☀️"; // Cambia el texto del botón
        botonModo.addEventListener("mouseenter", () => {
            botonModo.style.backgroundColor = "#fff"; // Cambia el cursor al pasar el mouse
        });
        botonModo.addEventListener("mouseleave", () => {
            botonModo.style.backgroundColor = "#1c2833"; // Cambia el cursor al salir el mouse
        });
    } else {
        fondo.style.backgroundColor = "";
        fondo.style.color = "";
        btnCont.forEach((btnCont) => {
            btnCont.style.backgroundColor = "";
        });
        header.style.backgroundColor = "";
        encabezado.style.backgroundColor = "";
        perfil.style.boxShadow = "";
        descripcion.style.backgroundColor = "";
        descripcion.style.boxShadow = "";

        tarjeta.forEach((tarjeta) => {
            tarjeta.style.backgroundColor = "";
            tarjeta.style.boxShadow = "";
        });

        globos.style.backgroundColor = "";
        globos.style.boxShadow = "";

        iconos.style.backgroundColor = "";
        iconos.style.boxShadow = "";

        botonModo.textContent = "🌑"; // Cambia el texto del botón
        botonModo.style.backgroundColor = "#f0f0f0"; // Cambia el color de fondo del botón
        botonModo.addEventListener("mouseenter", () => {
            botonModo.style.backgroundColor = "#1c2833"; // Cambia el cursor al pasar el mouse

        });
        botonModo.addEventListener("mouseleave", () => {
            botonModo.style.backgroundColor = "#f0f0f0";
        });
    }

    modoOscuro = !modoOscuro; // Alterna el estado del modo oscuro
}

document.addEventListener("scroll", () => {
    const header = document.querySelector(".encabezado");
    if (window.scrollY > 50) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado al portapapeles: ' + text);
    });
}