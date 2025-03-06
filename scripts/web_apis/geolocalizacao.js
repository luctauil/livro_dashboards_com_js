

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var precisao = position.coords.accuracy;
            console.log("latitude: " + latitude);
            console.log("longitude: " + longitude);
            console.log("precisao: " + precisao);

            var informacoes = document.getElementById("informacoes");
            informacoes.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude + "<br>Precisão: " + precisao;

    });
}





