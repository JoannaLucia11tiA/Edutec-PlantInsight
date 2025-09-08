function getVidas(){
    return localStorage.getItem("vidas")
}

function _setVidas(vidas){
    localStorage.setItem("vidas", vidas)
}

function removeVida(){
    const vidasAtuais = getVidas()
    _setVidas(vidasAtuais-1) 
}

function resetaVidas(){
    _setVidas(3)
}
