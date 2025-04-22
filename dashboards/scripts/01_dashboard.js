const categorias = ['SP', 'RJ', 'MG', 'PR']; //Categorias - Rótulos do eixo X
const valores = [70000, 120352.99, 87000, 62998.87]; //Valores - Dados do eixo Y
const cores = ['blue', 'green', 'orange', 'red']; //Cores - Cores para cada barra

const ctx = document.getElementById('meu_dashboard').getContext('2d'); //Captura do elemento canvas que está no nosso HTML

/* A seguir toda a criação do primeiro Dashboard. Esse formato é padronizado para o Chart.js e só temos que associar nossas variáveis aos eixos de exibição */
const meu_dashboard = new Chart(ctx, {
    type: 'bar', //Define tipo de Barras
    data: {
        labels: categorias, //Rótulos do eixo X
        datasets: [{
            label: 'Valores', //Rótulo do eixo Y
            data: valores, //Dados do eixo Y
            backgroundColor: cores, //Cores para cada barra
        }]
    },
    options: { //Opções adicionais que podem ser configuradas
        plugins: {
            legend: {
                display: false // Habilita ou desabilita legenda padrão
            }
        }
    }
});