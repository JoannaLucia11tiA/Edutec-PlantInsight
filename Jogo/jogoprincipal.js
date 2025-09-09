// Funções de controle dos Pop-ups
function mostrarPopup1() {
  document.getElementById("popup1").style.display = "flex";
}
function fecharPopup1() {
  const popup1 = document.getElementById("popup1");
  popup1.style.display = "none"; 
  localStorage.setItem("popup1Mostrado", "true"); 
}

function mostrarPopup2() {
  document.getElementById("popup2").style.display = "block";
}
function fecharPopup2() {
  document.getElementById("popup2").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  let destinoSaida = null; // Variável para guardar para onde o usuário quer ir
  let limparProgresso = false; // Flag para saber se precisa limpar o progresso

  // --- LÓGICA DAS VIDAS ---
  // Se não houver vidas no localStorage, define como 3
  if (getVidas() === null) {
    resetaVidas();
  }

  const vidasAtuais = getVidas();
  const heart1 = document.getElementById("heart1");
  const heart2 = document.getElementById("heart2");
  const heart3 = document.getElementById("heart3");

  if (vidasAtuais == 0) {
    window.location.href = "./popup.html";
  } else {
    heart1.src = vidasAtuais < 1 ? "assets.jogos/perdeucoracao.png" : "assets.jogos/corcaovida.png";
    heart2.src = vidasAtuais < 2 ? "assets.jogos/perdeucoracao.png" : "assets.jogos/corcaovida.png";
    heart3.src = vidasAtuais < 3 ? "assets.jogos/perdeucoracao.png" : "assets.jogos/corcaovida.png";
  }

  // --- LÓGICA DO POP-UP DE REGRAS ---
  if (!localStorage.getItem("popup1Mostrado")) {
    mostrarPopup1();
  }

  // --- LÓGICA DO POP-UP "CERTEZA QUE DESEJA SAIR?" ---

  // 1. Ouve os cliques nos links de SAÍDA
  document.querySelectorAll(".sair").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // Impede o link de funcionar imediatamente
      destinoSaida = link.href; // Guarda o endereço do link (ex: index.html)
      
      // Verifica se o link também tem a classe para limpar o progresso
      limparProgresso = link.classList.contains('limpar-local');
      
      mostrarPopup2(); // Mostra o pop-up de confirmação
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


  // --- LÓGICA DE DESBLOQUEIO DE NÍVEIS (COMPLETA) ---
  const desbloquearNivel = (numeroNivel, tipoJogo) => {
    const nivel = document.querySelector(`.nivel-${numeroNivel}`);
    if (nivel) {
      nivel.classList.remove("bloqueado");
      nivel.classList.add("desbloqueado");
      nivel.querySelector('a').innerHTML = numeroNivel;
      nivel.querySelector('a').setAttribute("href", `${tipoJogo}.html`);
    }
  };

  for (let i = 1; i < 20; i++) {
    if (localStorage.getItem(`Fase ${i}`) === 'completa') {
      const proximoNivel = i + 1;
      const tipoJogo = proximoNivel % 2 === 0 ? 'arrastaJogo' : 'perguntas';
      desbloquearNivel(proximoNivel, tipoJogo);
    }
  }

  // --- LÓGICA PARA PEGAR A FASE ATUAL (COM DELEGAÇÃO DE EVENTOS) ---
  document.body.addEventListener("click", (event) => {
    const linkClicado = event.target.closest(".botao-fase a");
    if (linkClicado) {
      const nivelPai = linkClicado.closest(".botao-fase");
      if (nivelPai && nivelPai.classList.contains("desbloqueado")) {
        event.preventDefault();
        const numeroFase = nivelPai.dataset.fase;
        localStorage.setItem("faseAtual", numeroFase);
        window.location.href = linkClicado.href;
      }
    }
  });
});
