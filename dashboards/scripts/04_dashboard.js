const dias = 100;
const baseURL = 'https://api.mercadobitcoin.net/api/v4/candles';
const moedas = ['XRP-BRL', 'DOGE-BRL', 'ADA-BRL', 'USDT-BRL', 'AXL-BRL', 'CAKE-BRL', 'UMA-BRL'];
const historicoPorMoeda = [];

buscarUltimosDias(dias);

async function buscarUltimosDias(dias) {
    const hoje = new Date(); //Cria um objeto de data com a data de agora
    hoje.setDate(hoje.getDate() - 1); //Reduz 1 dia da data atual
    hoje.setHours(23, 59, 59, 999); //Define a hora para o final do dia (23:59:59.999)

    const timestampTo = Math.floor(hoje.getTime() / 1000); //Converte a data para timestamp em segundos
    const timestampFrom = timestampTo - ((dias) * 86400); //Calcula o timestamp de dias atrás (86400 segundos em um dia)

    for (const moeda of moedas) {
        const url = `${baseURL}?symbol=${moeda}&resolution=1d&from=${timestampFrom}&to=${timestampTo}`;
        const resposta = await fetch(url);
        const json = await resposta.json();

        historicoPorMoeda[moeda] = [];

        for (let i = 0; i < dias; i++) {
            historicoPorMoeda[moeda].push({
                data: new Date(json.t[i] * 1000).toLocaleDateString('pt-BR'),
                fechamento: parseFloat(json.c[i])
            });
        }
    }
    MontarDashboard(); //Com os dados prontos no array historico, podemos chamar a montagem do dashboard
}


function MontarDashboard() {
    const ctx = document.getElementById('meu_dashboard').getContext('2d');

    // Assume que todas têm as mesmas datas
    const labels = historicoPorMoeda[moedas[0]].map(d => d.data);

    const cores = ['blue', 'green', 'orange', 'gray', 'purple', 'red', 'black']; // uma cor por moeda
    const datasets = moedas.map((moeda, index) => ({
        label: `Fechamento ${moeda}`,
        data: historicoPorMoeda[moeda].map(d => d.fechamento),
        borderColor: cores[index % cores.length],
    }));

    const dashboard = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
    });
}
