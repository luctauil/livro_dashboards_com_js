

var intervalo = setInterval(() => {
    var d = new Date();
    var relogio = document.getElementById("paragrafo");    
    relogio.innerHTML = d.toLocaleString();
    if(d.getMinutes() == 0) {
        clearInterval(intervalo);
    }
}, 1000);
