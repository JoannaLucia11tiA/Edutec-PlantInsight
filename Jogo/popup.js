// --- LÓGICA DE EXIBIÇÃO DOS POP-UPS ---
window.addEventListener('DOMContentLoaded', () => {
  // 1. PRIMEIRO, verifica se as vidas acabaram.
  // Usamos localStorage.getItem('vidas') porque a função getVidas() do vidas.js pode não estar carregada ainda.
  if (localStorage.getItem('vidas') === '0') {
    // Mostra o pop-up de Fim de Jogo
    document.getElementById('vidasFim').style.display = 'block';

    // Garante que nenhum outro pop-up de resultado apareça junto
    document.getElementById('popup-certo').style.display = 'none';
    document.getElementById('popup-errado').style.display = 'none';
    document.getElementById('acertos-maximo').style.display = 'none';
    document.getElementById('acertos-baixo').style.display = 'none';
    
    // Limpa os resultados de fase para não interferir num próximo jogo
    localStorage.removeItem('resultadoPergunta');
    localStorage.removeItem('acertosFase');

    // Para a execução aqui para não mostrar os outros pop-ups por engano
    return;
  }

  // 2. SE HOUVER VIDAS, mostra o resultado da fase

  // Lógica para o pop-up da fase de PERGUNTAS
  const resultadoPergunta = localStorage.getItem('resultadoPergunta');
  if (resultadoPergunta === 'certo') {
    document.getElementById('popup-certo').style.display = 'block';
  } else if (resultadoPergunta === 'errado') {
    document.getElementById('popup-errado').style.display = 'block';
  }
  localStorage.removeItem('resultadoPergunta'); // Limpa depois de usar

  // Lógica para o pop-up da fase de ARRASTAR
  const acertosFase = localStorage.getItem('acertosFase');
  if (acertosFase === '3') {
    document.getElementById('acertos-maximo').style.display = 'block';
  } else if (acertosFase !== null && acertosFase < 3) { // Se for 0, 1 ou 2
    const popupBaixo = document.getElementById('acertos-baixo');
    popupBaixo.style.display = 'block';
    const h3Popup = popupBaixo.querySelector('h3');
    if (h3Popup) {
        h3Popup.textContent = `${acertosFase}/3`;
    }
  }
  localStorage.removeItem('acertosFase'); // Limpa depois de usar
});


// --- LÓGICA DOS BOTÕES ---

// Função que avança o número da fase no localStorage e redireciona
const avancarFase = () => {
    let faseAtual = parseInt(localStorage.getItem("faseAtual")) || 1;
    localStorage.setItem(`Fase ${faseAtual}`, 'completa');
    faseAtual++;
    localStorage.setItem("faseAtual", faseAtual);
    console.log("Próxima fase será a:", faseAtual);

    // Decide para qual página ir
    const faseAnterior = localStorage.getItem("faseAnterior");
    if (faseAnterior === "1") {
        window.location.href = "arrastaJogo.html";
    } else if (faseAnterior === "2") {
        window.location.href = "perguntas.html";
    } else {
        window.location.href = "jogoprincipal.html"; // Caso seguro
    }
};

// Pega os botões "Próxima Fase" dos popups de acerto
const btnProximaFaseCerto = document.getElementById("play-fase");
const btnProximaFaseMaximo = document.getElementById("play-fase2");

if (btnProximaFaseCerto) {
    btnProximaFaseCerto.addEventListener("click", avancarFase);
}
if (btnProximaFaseMaximo) {
    btnProximaFaseMaximo.addEventListener("click", avancarFase);
}

// Lógica para o botão de "jogar novamente" no popup de fim de jogo
const btnJogarNovamente = document.querySelector("#vidasFim .botoes a");

if(btnJogarNovamente) {
    btnJogarNovamente.addEventListener('click', (e) => {
        e.preventDefault(); 
        // Reseta as vidas para 3 para começar um novo jogo
        localStorage.setItem('vidas', '3');
        // Limpa o progresso de fases
        localStorage.removeItem('faseAtual');
        localStorage.removeItem('Fase 1');
        localStorage.removeItem('Fase 2');
        // Redireciona para a página principal
        window.location.href = e.target.closest('a').href;
    });
}
