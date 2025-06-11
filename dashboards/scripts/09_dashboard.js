const map = L.map('map').setView([-14.2350, -51.9253], 3);
var camadaEstados = null;
var max = 0;
var min = 0;

/* Carrega o Mapa */
onload = () => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
    }).addTo(map);
}

function getColor(valor) {
    if (!valor || isNaN(valor) || valor === 0) {
        return 'rgb(230,230,230)'; // cor neutra para ausência de dados
    }

    const intervalo = max - min || 1;
    const percentual = (valor - min) / intervalo;

    // Escala: de amarelo (claro) para vermelho escuro/marrom
    const r = Math.round(255); // vermelho sempre no máximo
    const g = Math.round(255 * (1 - percentual)); // verde decresce
    const b = Math.round(100 * (1 - percentual)); // azul levemente presente, escurece

    return `rgb(${r},${g},${b})`;
}

function Legendas(somas) {
    const listaOrdenada = Object.entries(somas)
        .sort((a, b) => b[1] - a[1]);

    let html = '';

    listaOrdenada.forEach(([estado, valor]) => {
        const cor = getColor(valor);
        html += `<span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: ${cor}; margin-right: 6px;"></span>`;
        html += `${estado}: ${valor.toLocaleString('pt-BR')} habitantes<br/>`;
    });

    document.getElementById('legendas').innerHTML = html;
}


function DadosPopulacionais(tipo = 'Total') {
    if (camadaEstados) map.removeLayer(camadaEstados);

    const somasPopulacao = {};

    fetch('../../dados/br_states.json')
        .then(response => response.json())
        .then(data => {

            console.log(data);

            data.features.forEach(feature => {
                const estado = feature.properties.SIGLA;
                const valor = parseInt(feature.properties[tipo] || 0);
                somasPopulacao[estado] = valor;
            });

            const valores = Object.values(somasPopulacao);
            max = Math.max(...valores);
            min = Math.min(...valores);

            camadaEstados = L.geoJSON(data, {
                style: feature => {
                    const estado = feature.properties.SIGLA;
                    const valor = somasPopulacao[estado] || 0;

                    return {
                        fillColor: getColor(valor),
                        weight: 2,
                        opacity: 1,
                        color: 'black',
                        fillOpacity: 0.7
                    };
                },
                onEachFeature: (feature, layer) => {
                    const estado = feature.properties.SIGLA;
                    const valor = somasPopulacao[estado] || 0;

                    const labelTipo = tipo === 'Total' ? 'habitantes'
                                     : tipo === 'Homens' ? 'homens'
                                     : tipo === 'Mulheres' ? 'mulheres'
                                     : tipo.toLowerCase();

                    layer.bindTooltip(
                        `${estado}: ${valor.toLocaleString('pt-BR')} ${labelTipo}`,
                        { permanent: false, direction: 'center' }
                    );
                }
            }).addTo(map);

            Legendas(somasPopulacao);
        });
}
