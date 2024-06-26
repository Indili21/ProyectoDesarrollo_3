



/*****************************TARJETA 1***************************************/
/**document.getElementById("agendaBtn").addEventListener("click", function() {
    // Aquí colocas la URL que deseas abrir en una nueva pestaña
    var url = "https://koalendar.com/e/Zvyeprc5c3cqlBtMy2j_a-koal?embed=true";
    // Abre la URL en una nueva pestaña
    window.open(url, "_blank");
});*/

// Seleccionar el elemento h2
var tituloTarjeta = document.getElementById("tituloTarjeta");
// Seleccionar el elemento h2
var tituloTarjeta = document.getElementById("tituloTarjeta");

// Agregar un evento de clic al elemento h2
tituloTarjeta.addEventListener("click", function() {
    // Seleccionar todos los elementos h4 dentro del contenedor
    var elementosH4 = document.querySelectorAll(".contenedorH3 h4");

    // Iterar sobre los elementos h4 y cambiar su estilo de display
    elementosH4.forEach(function(elemento) {
        // Alternar la clase "oculto" para mostrar u ocultar los elementos h4
        elemento.classList.toggle("oculto");
    });

    // Seleccionar la tarjeta y cambiar su altura
    var tarjeta = document.querySelector(".tarjeta1");
    // Si algún elemento h4 se muestra, aumentar la altura de la tarjeta
    if (tarjeta.querySelector(".contenedorH3 h4:not(.oculto)")) {
        tarjeta.style.height = "300px"; // Cambiar la altura de la tarjeta a 300px (o el valor que desees)
    } else {
        tarjeta.style.height = "200px"; // Cambiar la altura de la tarjeta de vuelta a 200px si no hay elementos h4 mostrados
    }
});

/**************************************************************/



// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Configura el mapa
    var map = L.map('map').setView([40.7128, -74.0060], 15); // Coordenadas y nivel de zoom
  
    // Añade una capa de mapa (Mapa base)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Añade un marcador en la ubicación exacta
    var marker = L.marker([40.7128, -74.0060]).addTo(map)
      .bindPopup('Ubicación exacta')
      .openPopup();
  });
  


