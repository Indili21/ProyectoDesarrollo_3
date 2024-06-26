// scroll.js

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los enlaces internos que llevan a anclas
    const links = document.querySelectorAll('a[href^="#"]');

    // Recorre cada enlace y agrega un evento de clic
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace

            // Obtiene el objetivo del enlace (el ID del elemento a desplazarse)
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calcula la posición de desplazamiento suave
                const offsetTop = targetElement.offsetTop;
                const scrollOptions = {
                    top: offsetTop,
                    behavior: 'smooth' // Hace que el desplazamiento sea suave
                };

                // Realiza el desplazamiento suave
                window.scrollTo(scrollOptions);
            }
        });
    });
});
