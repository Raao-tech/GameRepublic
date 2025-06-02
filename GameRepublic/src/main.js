import L from 'leaflet';                 // Importas la librería Leaflet
import 'leaflet/dist/leaflet.css';       // Importas el estilo para que se vea correctamente


// Creas el mapa centrado en París y con nivel de zoom 4
const map = L.map('map').setView([10.48, -66.9], 18);

// Cargas los "tiles" (las imágenes del mapa de OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Cargar archivo GeoJSON con los países del mundo
fetch('/data/countries.geo.json') // ← Pido el archivo de países
  .then(response => response.json()) // ← Convierto la respuesta (texto) en objeto JSON
  .then(geojsonData => {             // ← Cuando el JSON está listo...

      // Dibujo todos los países usando Leaflet y su método geoJSON
      L.geoJSON(geojsonData, {
        
        // Le digo cómo quiero que se vean los países
        style: {
          color: 'blue',            // Color del borde
          weight: 1,                // Grosor de línea
          fillColor: 'lightblue',   // Color del interior
          fillOpacity: 0.9          // Qué tan transparente es el interior
        },

        // Para cada país, hago esto:
        onEachFeature: (feature, layer) => {
          // Muestro una ventanita con su nombre al hacer clic
          layer.bindPopup(`<b>${feature.properties.name}</b>`);
        }

         }).addTo(map); // ← Agrego todo eso al mapa
  });



// Añades un marcador sobre París
const marker = L.marker([10.48, -66.9]).addTo(map);
marker.bindPopup('<b>París</b><br>Capital de Francia').openPopup();