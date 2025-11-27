function getVidas(){
    return localStorage.getItem("vidas")
}

function _setVidas(vidas){
    localStorage.setItem("vidas", vidas)
}

function removeVida(){
    const vidasAtuais = getVidas()
    _setVidas(vidasAtuais-1) 

    let pontosAtuais = Number(localStorage.getItem("Pontosplayer")) || 0;

    // Garante que nunca fica abaixo de 0
    let novosPontos = Math.max(0, pontosAtuais - 100);

    localStorage.setItem("Pontosplayer", novosPontos);
} 

function resetaVidas(){
    _setVidas(3)
}
