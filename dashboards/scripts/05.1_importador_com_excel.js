function lerArquivoPadronizado() {
      const input = document.getElementById('inputArquivo'); //Pega o campo de upload do arquivo
      const file = input.files[0]; //Pega o arquivo selecionado. A posição 0 é o primeiro arquivo selecionado, pois existem o JS permite programas com upload de múltiplos arquivos
      if (!file) return alert('Nenhum arquivo selecionado.'); //Verifica se o arquivo foi selecionado

      const leitor = new FileReader(); //Cria um novo objeto FileReader para ler o arquivo
      const extensao = file.name.split('.').pop().toLowerCase(); //Pega a extensão do arquivo e transforma em minúscula

      if (extensao === 'csv') { //Verifica se a extensão é CSV, se sim, lê o arquivo como texto
          leitor.readAsText(file);
      } else if (extensao === 'xlsx') { //Verifica se a extensão é XLSX, se sim, lê o arquivo como binário
          // Para arquivos XLSX, é necessário usar a biblioteca XLSX.js pois o Excel não é um arquivo de texto simples
          leitor.readAsBinaryString(file);
      }

      leitor.onload = function (e) { //Aqui dentro desta função faz todo os passos para ler o arquivo
          let resultado;

          if (extensao === 'csv') {
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

          } else if (extensao === 'xlsx') {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const primeiraAba = workbook.SheetNames[0];
            const planilha = workbook.Sheets[primeiraAba];
            resultado = XLSX.utils.sheet_to_json(planilha);
          } else {
            return alert('Formato não suportado. Envie um arquivo CSV ou XLSX.');
          }

          document.getElementById('resultado').textContent = JSON.stringify(resultado, null, 2);
      };


}