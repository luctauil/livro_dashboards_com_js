function lerArquivo() {
      const input = document.getElementById('inputArquivo'); //Pega o campo de upload do arquivo
      const file = input.files[0]; //Pega o arquivo selecionado. A posição 0 é o primeiro arquivo selecionado, pois existem o JS permite programas com upload de múltiplos arquivos
      if (!file) return alert('Nenhum arquivo selecionado.'); //Verifica se o arquivo foi selecionado

      const leitor = new FileReader(); //Cria um novo objeto FileReader para ler o arquivo
      const extensao = file.name.split('.').pop().toLowerCase(); //Pega a extensão do arquivo e transforma em minúscula

      leitor.readAsText(file); //Faz a leitura do arquivo como texto
      leitor.onload = function (e) { //Aciona quando o arquivo for lido
          let resultado; //Variável para guardar o resultado

          const linhas = e.target.result.trim().split('\n'); //Le todo o conteúdo do arquivo e separa as linhas - \n é o caractere de nova linha
          const colunas = linhas[0].split(','); //Pega a primeira linha do arquivo, que contém os nomes das colunas, utilizando a vírgula como separador. Lembre-se que pode haver planilhas de dados que usam outro tipo de separador. Pode ser ponto e vírgula, tabulação, etc. Para isso, é só trocar a vírgula por outro caractere.

          resultado = linhas.slice(1).map(linha => { //Inicia a leitura de todas as linhas, exceto o cabeçalho por isso inicia na linha 1
              const valores = linha.split(','); //Pega os valores de cada linha, utilizando a vírgula como separador - Lembre que pode ser outro caractere
              const obj = {}; //Cria um objeto vazio para armazenar os valores
              colunas.forEach((chave, i) => { //A chave de cada objeto vem do nome daquela coluna
                  obj[chave.trim()] = valores[i].trim(); //A chave é o nome da coluna e o valor é o valor daquela linha
              });
              return obj; //Retorna o objeto com todos os valores formatados em array de objetos dentro da variavel "resultado"
          });

          console.log(resultado); //Mostra o resultado no console para vermos os dados todos formatados.
          document.getElementById('resultado').textContent = JSON.stringify(resultado, null, 2); //Mostra o resultado na tela, formatado em JSON para ficar mais legível
      };
}