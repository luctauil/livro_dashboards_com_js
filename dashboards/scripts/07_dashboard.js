const url_geojson = '../../dados/br_states.json';


/* Carrega o Mapa */
onload = () => {
    const map = L.map('map').setView([-14.2350, -51.9253], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
    }).addTo(map);

    fetch(url_geojson)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            L.geoJSON(data, { style: Estilos } ).addTo(map);
        });
}

function Estilos(feature) {
    const estado = feature.properties.SIGLA;
    console.log(`Carregando estado: ${estado}`);

    let cor = 'green';
    if (estado === 'SP') cor = 'blue';
    else if (estado === 'RJ') cor = 'red';
    else if (estado === 'MG') cor = 'orange';

    return {
        fillColor: cor, // Cor interna
        weight: 2, // Espessura da borda
        opacity: 1, // Opacidade da borda
        color: 'black', // Cor da borda
        fillOpacity: 0.7 // Opacidade da área preenchida
    };
}



