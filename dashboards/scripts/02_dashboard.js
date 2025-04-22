// Rótulos que serão mostrados como fatias da pizza
const vendedores = [];
const valores = [];
const cores = [];

// Captura do elemento <canvas> no HTML onde o gráfico será renderizado
const ctx = document.getElementById('meu_dashboard').getContext('2d');

/* Criação do gráfico tipo 'pizza' (pie). Este formato distribui os valores proporcionalmente em um círculo. */
const meu_dashboard = new Chart(ctx, {
    type: 'pie', // Define tipo como pizza
    data: {
        labels: vendedores, // Rótulos das fatias
        datasets: [{
            data: valores, // Valores de cada fatia
            backgroundColor: cores, // Cores das fatias
        }]
    },
    options: {
        plugins: {
            legend: {
                display: true, // Exibe a legenda com cores e rótulos
                position: 'bottom' // Posição da legenda
            },
            title: {
                display: true,
                text: 'Distribuição por Vendedor',
                font: {
                    size: 18
                }
            }
        }
    }
});


function AdicionarValor(){
    let vendedor = document.getElementById('vendedor').value; // Captura o nome do vendedor
    let valor = parseFloat(document.getElementById('valor').value); // Captura o valor a ser adicionado
    let cor = document.getElementById('escolha_cor').value; // Captura a cor da fatia

    vendedores.push(vendedor); // Adiciona o vendedor ao array
    valores.push(valor); // Adiciona o valor ao array
    cores.push(cor); // Adiciona a cor ao array

    meu_dashboard.update(); // Atualiza o gráfico com os novos dados
    document.getElementById('vendedor').value = ''; // Limpa o campo do vendedor
    document.getElementById('valor').value = ''; // Limpa o campo do valor
}
