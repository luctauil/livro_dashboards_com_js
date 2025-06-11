const url_geojson = '../../dados/br_states.json';

const map = L.map('map').setView([-14.2350, -51.9253], 3);
var camadaEstados = null;
const somasPorEstado = {};
var max = 0;
var min = 0;

/* Carrega o Mapa */
onload = () => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
    }).addTo(map);
}


function CarregarTotaisPorImposto() {
    if (camadaEstados) {
        console.log("Removendo camada anterior");
        map.removeLayer(camadaEstados); // Remove a camada anterior, se existir
    }
    
    const impostoSelecionado = 'IMPOSTO TERRITORIAL RURAL'; // Troque aqui para testar outros impostos IPI - FUMO, IPI - BEBIDAS, IMPOSTO TERRITORIAL RURAL
    
    // Soma os valores do imposto por estado
    resultado.forEach(linha => {
        const estado = linha.UF;
        if (!somasPorEstado[estado]) somasPorEstado[estado] = 0;

        if (linha[impostoSelecionado]) {
            let valor = parseFloat(linha[impostoSelecionado].replace(',', '.'));
            if (!isNaN(valor)) somasPorEstado[estado] += valor;
        }
    });

    console.log("Total arrecadado por estado:", somasPorEstado);

    // Encontra mínimo e máximo para usar na escala de cores
    const valores = Object.values(somasPorEstado);
    max = Math.max(...valores);
    min = Math.min(...valores);

    // Atualiza o mapa com as cores
    fetch(url_geojson)
        .then(response => response.json())
        .then(data => {

            console.log("Dados dos estados:", data);

            camadaEstados = L.geoJSON(data, {
                style: feature => {
                    const estado = feature.properties.SIGLA;
                    const valor = somasPorEstado[estado] || 0;
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
                    const valor = somasPorEstado[estado] || 0;

                    layer.bindTooltip(
                        `${estado}: R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                        { permanent: false, direction: 'center' }
                    );
                }
            }).addTo(map); // `map` precisa estar no escopo global
        });
    
    Legendas(somasPorEstado);
}

function getColor(valor) {
    const percentual = (valor - min) / (max - min); // Normaliza entre 0 e 1
    const red = Math.round(255 * percentual);
    const green = Math.round(255 * (1 - percentual));
    return `rgb(${red},${green},0)`; // De verde (baixo) a vermelho (alto)
}

function Legendas(somas) {
    const listaOrdenada = Object.entries(somas)
        .sort((a, b) => b[1] - a[1]);

    let html = '';

    listaOrdenada.forEach(([estado, valor]) => {
        const cor = getColor(valor);
        html += `<span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: ${cor}; margin-right: 6px;"></span>`;
        html += `${estado}: R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br/>`;
    });

    document.getElementById('legendas').innerHTML = html;
}


function CarregarTotaisPorAno() {
    if (camadaEstados) map.removeLayer(camadaEstados);

    const anoSelecionado = document.getElementById('selectAno').value;
    const impostoSelecionado = 'IMPOSTO TERRITORIAL RURAL';
    
    const somasPorEstadoAno = {};

    resultado.forEach(linha => {
        if (linha.Ano === anoSelecionado) {
            const estado = linha.UF;
            let valor = parseFloat(linha[impostoSelecionado]?.replace(',', '.') || 0);

            if (!somasPorEstadoAno[estado]) somasPorEstadoAno[estado] = 0;
            if (!isNaN(valor)) somasPorEstadoAno[estado] += valor;
        }
    });

    console.log(`Soma por ano`, somasPorEstadoAno);

    const valores = Object.values(somasPorEstadoAno);
    max = Math.max(...valores);
    min = Math.min(...valores);

    fetch(url_geojson)
        .then(r => r.json())
        .then(data => {
            camadaEstados = L.geoJSON(data, {
                style: feature => {
                    const estado = feature.properties.SIGLA;
                    const valor = somasPorEstadoAno[estado] || 0;
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
                    const valor = somasPorEstadoAno[estado] || 0;
                    layer.bindTooltip(
                        `${estado} (${anoSelecionado}): R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`
                    );
                }
            }).addTo(map);
        });

    Legendas(somasPorEstadoAno);
}
