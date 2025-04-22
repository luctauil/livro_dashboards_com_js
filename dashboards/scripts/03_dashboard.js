const dias = 100;
const baseURL = 'https://api.mercadobitcoin.net/api/v4/candles';
const historico = [];

buscarUltimosDias(dias);

async function buscarUltimosDias(dias) {
    const hoje = new Date(); //Cria um objeto de data com a data de agora
    hoje.setDate(hoje.getDate() - 1); //Reduz 1 dia da data atual
    hoje.setHours(23, 59, 59, 999); //Define a hora para o final do dia (23:59:59.999)

    const timestampTo = Math.floor(hoje.getTime() / 1000); //Converte a data para timestamp em segundos
    const timestampFrom = timestampTo - ((dias) * 86400); //Calcula o timestamp de dias atrás (86400 segundos em um dia)

    /* Essas conversões de datas temos que fazer pois é o formato que a API obriga. Quando estamos usando uma API externa, temos que programar conforme as regras da API */

    const url = `${baseURL}?symbol=BTC-BRL&resolution=1d&from=${timestampFrom}&to=${timestampTo}`; //link da API

    const resposta = await fetch(url); //JavaScript efetuando a busca dos dados na API
    const json = await resposta.json(); //Resposta guardada em uma variável

    /*Os dados estão todos na variável json. O for a seguir, pega esses dados e formata dentro de um array de objetos. É a preparação dos dados. */

    for (let i = 0; i < dias; i++) { //O organização dos dados acontece na quantidade de dias que pedidos.
        /* O trecho a seguir vai montar um array de objetos com o seguinte formato:
        [ ... 
          {data: 'XX/XX/XXXX', fechamento: XXX.XX}, 
          {data: 'XX/XX/XXXX', fechamento: XXX.XX}, 
          {data: 'XX/XX/XXXX', fechamento: XXX.XX}, 
        ... ]
        */
        
        historico.push({
            data: new Date(json.t[i] * 1000).toLocaleDateString('pt-BR'),
            fechamento: parseFloat(json.c[i]), // valor representativo do dia
        });

        /* json.t[i] é o formato que a API retorna. Temos que respeitar o nome da variável da API.
        o formato é multiplicado por 1000 para converter de segundos para milissegundos, e depois usamos toLocaleDateString para formatar a data.
        json.c[i] é o valor de fechamento do dia. O valor é convertido para float para garantir que seja um número decimal. */
    }
    MontarDashboard(); //Com os dados prontos no array historico, podemos chamar a montagem do dashboard
}


function MontarDashboard() {

// Extrai os dados do array
const labels = historico.map(d => d.data); // ['18/04', '19/04', ..., 'Hoje']
const valores = historico.map(d => d.fechamento); // [502000, 508000, ..., 520350]

// Cria o gráfico
const ctx = document.getElementById('meu_dashboard').getContext('2d');
const grafico = new Chart(ctx, {
    type: 'line', //Só muda para o tipo linhas.
    data: {
        labels: labels,
        datasets: [{
            label: 'Fechamento BTC-BRL',
            data: valores,
            fill: false,
            borderColor: 'blue',
        }]
    },
});

}

