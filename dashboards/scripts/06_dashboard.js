

function CarregarDashboards() {
    GerarDashboardVendedores(resultado);
    GerarDashboardTotais(resultado);
}

function GerarDashboardVendedores(dados){
    //Array meses e vendedores passar por filtros, pois são informações que se repetem e só precisamos deles nos rótulos.
    const meses = dados.map(d => d.mes).filter((mes, i, self) => self.indexOf(mes) === i);
    const vendedores = dados.map(d => d.vendedor).filter((v, i, self) => self.indexOf(v) === i);
    const cores = ['darkblue', 'pink', 'blue', 'black', 'orange', 'lightgreen', 'purple', 'darkgreen', 'gray']; //Definimos as cores das linhas. Uma para cada vendedor.

    const datasets = [];

    // Para cada vendedor...
    for (let i = 0; i < vendedores.length; i++) {
        const vendedor = vendedores[i];

        // ...geramos os dados de vendas por mês
        const vendasPorMes = meses.map(mes => {
            const item = dados.find(d => d.vendedor === vendedor && d.mes === mes);
            return item ? parseInt(item.vendas) : 0;
        });

        // Montamos o dataset individual e adicionamos ao array final
        datasets.push({
            label: vendedor, // nome do vendedor na legenda
            data: vendasPorMes, // array com os valores mês a mês
            borderColor: cores[i % cores.length], // cor diferente para cada linha
        });
    }

    const ctx = document.getElementById('meu_dashboard').getContext('2d');
    const dashboard = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: datasets
        },
    });
}

function GerarDashboardTotais(dados) {
    // Filtramos os vendedores únicos
    const vendedores = dados.map(d => d.vendedor).filter((v, i, self) => self.indexOf(v) === i);

    // Definimos as cores das colunas
    const cores = ['darkblue', 'pink', 'blue', 'black', 'orange', 'lightgreen', 'purple', 'darkgreen', 'gray'];

    // Para cada vendedor, somamos todas as vendas
    const totais = [];
    // Para cada vendedor...
    for (let i = 0; i < vendedores.length; i++) {
        const vendedor = vendedores[i];
        // ...filtramos todos os registros dele
        const vendasDoVendedor = dados.filter(d => d.vendedor === vendedor);
        // ...somamos todas as vendas usando reduce
        const total = vendasDoVendedor.reduce((acc, atual) => acc + parseFloat(atual.vendas), 0);
        // ...e adicionamos ao array de totais
        totais.push(total);
    }
    const ctx = document.getElementById('meu_dashboard2').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: vendedores,
            datasets: [{
                label: 'Total Geral por Vendedor',
                data: totais,
                backgroundColor: "darkgreen"
            }]
        },

    });
}
