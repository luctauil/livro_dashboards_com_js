function Notificacao(){
    Toastify({
        text: "Vamos para o site Espaço Dev?", //Texto do toast
        duration: 5000, //Duração em millisegundos
        destination: "https://espaco.dev", //Link ao clicar no toast
        newWindow: true, //Nova aba ao clicar no toast
        gravity: "top", // 'top' ou 'bottom' - Opções de posicionamento vertical
        position: "right", // 'left', 'center' ou 'right' - Opções de posicionamento horizontal
        stopOnFocus: true, // Se o mouse estiver em cima o toast não some
        style: {
            background: "blue", //Cor de fundo do toast
        },
        onClick: function(){} // Callback after click
    }).showToast();
}