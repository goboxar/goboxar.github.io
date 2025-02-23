// Configuración inicial
const form = document.getElementById('location-form');
const mapContainer = document.getElementById('map');
const confirmationContainer = document.getElementById('confirmation');
const sucursalName = document.getElementById('sucursal-name');
const confirmSucursalButton = document.getElementById('confirm-sucursal');

// Función para configurar el mapa y mostrarlo
function initializeMap(lat, lng, sucursal) {
    mapContainer.style.display = 'block'; // Mostrar el mapa

    var map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${sucursal}</b><br>${sucursal === "Sucursal Parada Cero" ? "Coronel Pringles, 9 de Julio 2, CP 7530" : "Coronel Suárez, Villegas 200, CP 7540"}`).openPopup();
}

// Función para manejar el formulario
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const country = document.getElementById('country').value;
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;

    // Verificar la ciudad y configurar el mapa
    if (city === "coronel-pringles") {
        initializeMap(-37.98871, -61.34527, "Sucursal Parada Cero");
        sucursalName.textContent = "Sucursal Parada Cero: Coronel Pringles, 9 de Julio 2, CP 7530";
    } else if (city === "coronel-suarez") {
        initializeMap(-37.45859, -61.93616, "Sucursal Renzo");
        sucursalName.textContent = "Sucursal Renzo: Partido de Coronel Suárez, Villegas 200, CP 7540";
    }

    confirmationContainer.style.display = 'block'; // Mostrar la confirmación
});

// Confirmar sucursal y redirigir
confirmSucursalButton.addEventListener('click', function() {
    // Obtener la sucursal seleccionada
    const city = document.getElementById('city').value;

    if (city === "coronel-pringles") {
        window.location.href = "paradacero.html";  // Redirigir a la página de Parada Cero
    } else if (city === "coronel-suarez") {
        window.location.href = "renzo.html";  // Redirigir a la página de Renzo
    }
});
