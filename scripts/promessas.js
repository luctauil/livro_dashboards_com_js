function verificarNumero(numero) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (numero % 2 === 0) {
                resolve(`O número ${numero} é par!`);
            } else {
                reject(`O número ${numero} é ímpar!`);
            }
        }, 3000); // Simula uma operação assíncrona de 3 segundo
    });
}

console.log("Início da verificação...");

verificarNumero(4)
    .then(resultado => console.log("Sucesso: " + resultado)) //Caso de sucesso
    .catch(erro => console.log("Erro: " + erro)) //Caso de erro

console.log("Aguardando resultado...");
