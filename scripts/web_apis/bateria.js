
function CapturarStatusBateria() {
    navigator.getBattery()
        .then(function(bateria) {
            var nivel = bateria.level * 100; // Obtém o nível da bateria em porcentagem
            var paragrafo = document.getElementById("status");
            paragrafo.innerHTML = "Status da bateria: " + nivel + "%";
        }).catch(function(error) {
            console.error("Erro ao obter status da bateria:", error);
        });
}

//Adicionar o evento a um botão qualquer da sua tela
var capturar = document.getElementById("capturar");
capturar.addEventListener("click", CapturarStatusBateria);