// =========================================================================
// FUNÇÕES DE CONTROLE DO JOGO
// =========================================================================

/**
 * Limpa todo o progresso de fases do jogo salvo no navegador.
 * Isso é usado ao perder ou ao vencer, para preparar um novo jogo.
 */
function limparProgressoFases() {
  console.log("Limpando progresso de fases...");
  localStorage.removeItem('faseAtual');
  for (let i = 1; i <= 20; i++) {
      localStorage.removeItem(`Fase ${i}`);
  }
  localStorage.removeItem('resultadoPergunta');
  localStorage.removeItem('acertosFase');
  localStorage.removeItem('popup1Mostrado');
}

/**
* Reinicia completamente o estado do jogo.
* Reseta as vidas para 3 e limpa todo o progresso.
*/
function reiniciarJogoCompleto() {
  console.log("Reiniciando o jogo completamente...");
  localStorage.setItem('vidas', '3');
  limparProgressoFases();
}


// =========================================================================
// LÓGICA PRINCIPAL DE EXIBIÇÃO DOS POP-UPS
// =========================================================================

// Este evento espera todo o HTML da página ser carregado antes de rodar o código.
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM carregado. Verificando estado do jogo...");

  // --- 1. VERIFICAÇÃO DE VITÓRIA (Prioridade Máxima) ---
  if (localStorage.getItem('Fase 20') === 'completa') {
      console.log("Condição de vitória atendida: Fase 20 está completa.");
      const popupVitoria = document.getElementById('vitoriaJogo');
      if (popupVitoria) {
          console.log("Popup de vitória encontrado. Exibindo...");
          popupVitoria.style.display = 'block';
          
          // Limpa o progresso para que o botão \"Jogar Novamente\" funcione
          limparProgressoFases(); 

          const btnJogarNovamenteVitoria = document.getElementById('jogar-novamente-vitoria');
          if (btnJogarNovamenteVitoria) {
              btnJogarNovamenteVitoria.addEventListener('click', (e) => {
                  e.preventDefault();
                  reiniciarJogoCompleto(); // Reseta vidas e limpa tudo de novo (garantia)
                  window.location.href = './jogojogar.html';
              });
          }
      } else {
          console.error("ERRO: Fase 20 completa, mas o pop-up com id 'vitoria-final' não foi encontrado no HTML.");
      }
      return; // Para a execução para não mostrar outros pop-ups
  }

  // --- 2. VERIFICAÇÃO DE DERROTA (Se não houve vitória) ---
  if (localStorage.getItem('vidas') === '0') {
      console.log("Condição de derrota: 0 vidas.");
      const popupFim = document.getElementById('vidasFim');
      if (popupFim) {
          popupFim.style.display = 'block';
          limparProgressoFases(); // Limpa o tabuleiro para o próximo jogo
          reiniciarJogoCompleto();
          const btnJogarNovamenteDerrota = popupFim.querySelector('a');
          if(btnJogarNovamenteDerrota) {
              btnJogarNovamenteDerrota.addEventListener('click', (e) => {
                  e.preventDefault();
                  reiniciarJogoCompleto(); // Reseta as vidas e o progresso
                  window.location.href = e.target.closest('a').href;
              });
          }
      }
      return;
  }

  // --- 3. EXIBIÇÃO NORMAL (Se não houve vitória nem derrota) ---
  const resultadoPergunta = localStorage.getItem('resultadoPergunta');
  if (resultadoPergunta) {
      document.getElementById(resultadoPergunta === 'certo' ? 'popup-certo' : 'popup-errado').style.display = 'block';
      localStorage.removeItem('resultadoPergunta');
  }

  const acertosFase = localStorage.getItem('acertosFase');
  if (acertosFase !== null) {
      if (acertosFase === '3') {
          document.getElementById('acertos-maximo').style.display = 'block';
      } else {
          const popupBaixo = document.getElementById('acertos-baixo');
          if (popupBaixo) {
              popupBaixo.style.display = 'block';
              const acertosValor = document.getElementById('acertos-valor');
              if (acertosValor) {
                  acertosValor.textContent = `${acertosFase}/3`;
              }
          }
      }
      localStorage.removeItem('acertosFase');
  }
});


// =========================================================================
// LÓGICA DOS BOTÕES DE NAVEGAÇÃO
// =========================================================================

const avancarFase = () => {
  let faseAtual = parseInt(localStorage.getItem("faseAtual")) || 1;
  localStorage.setItem(`Fase ${faseAtual}`, 'completa');

  if (faseAtual === 20) {
      // Vitória! Redireciona para o popup para a verificação de vitória acontecer.
      window.location.href = "popup.html";
      return;
  }
  
  faseAtual++;
  localStorage.setItem("faseAtual", faseAtual);

  const faseAnterior = localStorage.getItem("faseAnterior");
  // Alterna entre os jogos
  window.location.href = faseAnterior === "1" ? "arrastaJogo.html" : "perguntas.html";
};

// Adiciona o evento aos botões de "próxima fase" de forma segura
document.getElementById("play-fase")?.addEventListener("click", avancarFase);
document.getElementById("play-fase2")?.addEventListener("click", avancarFase);


// =========================================================================
// LÓGICA DO POP-UP DE "SAIR"
// =========================================================================

let destinoSaida = '';
let limparProgresso = false;



document.querySelectorAll(".sair").forEach(link => {
  link.addEventListener("click", e => {
      e.preventDefault();
      destinoSaida = link.href;
      limparProgresso = link.classList.contains('limpar-local');
      const popupSair = document.getElementById("popup2popup");
      if(popupSair) popupSair.style.display = "block";
  });
});

document.getElementById('popup-sim')?.addEventListener('click', () => {
  if (limparProgresso) {
      reiniciarJogoCompleto();
  }
  window.location.href = destinoSaida;
});

document.getElementById('fechar')?.addEventListener('click', () => {
  const popupSair = document.getElementById("popup2popup");
  if(popupSair) popupSair.style.display = "none";
});


// 1. Ouve os cliques nos links de SAÍDA
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".sairpagina").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        destinoSaida = link.href;
        limparProgresso = link.classList.contains('limpar-local');
        popup2popup();
      });
    });
  });
  
  // 2. Ouve o clique no botão "NÃO"
  document.getElementById("fechar").addEventListener("click", () => {
    fecharPopup2();
    destinoSaida = null; // Esquece o destino
    limparProgresso = false; // Esquece se precisa limpar
  });

  // 3. Ouve o clique no botão "SIM"
  document.getElementById("popup-sim").addEventListener("click", () => {
    if (destinoSaida) {
      if (limparProgresso) {
        localStorage.clear(); // Se precisar, limpa o progresso
      }
      window.location.href = destinoSaida; // Leva o usuário para o destino
      
    }
  });
  function popup2popup() {
    document.getElementById("popup2arrasta").style.display = "block";
  }
  function fecharPopup2() {
    document.getElementById("popup2arrasta").style.display = "none";
  }
