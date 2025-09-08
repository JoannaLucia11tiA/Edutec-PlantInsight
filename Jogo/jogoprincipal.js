// if (!sessionStorage.getItem("sessao_ativa")) {
//   // Se não existir, é porque o usuário saiu antes → limpa o localStorage
//   localStorage.clear();
// }

// // Marca que a sessão está ativa
// sessionStorage.setItem("sessao_ativa", "true");

function mostrarPopup2() {
  document.getElementById("popup2").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function fecharPopup2() {
  document.getElementById("popup2").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

document.getElementById("fechar").addEventListener("click", fecharPopup2);


window.addEventListener("pageshow", () => {
  if (!localStorage.getItem("visitou")) {
    
    localStorage.setItem("visitou", "sim");
  }
});


document.querySelectorAll("a.limpar-local").forEach(link => {
  link.addEventListener("click", () => {
    localStorage.clear();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const popup1 = document.getElementById("popup1");

  
  if (!localStorage.getItem("popup1Mostrado")) {
    popup1.style.display = "flex"; 
  }
});

function fecharPopup1() {
  const popup1 = document.getElementById("popup1");
  popup1.style.display = "none"; 
  localStorage.setItem("popup1Mostrado", "true"); 
}
  function fecharPopup2() {
    document.getElementById("popup2").style.display = "none";
  }

  const links = document.querySelectorAll(".sair");
  const popup = document.getElementById("popup2");
  const fechar = document.getElementById("fechar");
  
 
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      popup.style.display = "flex";
    });
  });
  
  fechar.addEventListener("click", () => {
    popup.style.display = "none";
  });
  //-------------------------------------------------------------------------------------------------------
  const niveis = document.querySelectorAll(".nivel"); // pega todos os elementos com a classe "nivel"

  niveis.forEach(nivel => {
      if(nivel.classList.contains("desbloqueado")) {
          // Seleciona todos os botões de fase
        const botoesFases = document.querySelectorAll(".botao-fase");

        botoesFases.forEach(botao => {
        botao.addEventListener("click", () => {
        const numeroFase = parseInt(botao.dataset.fase); // pega o número da fase
        localStorage.setItem("faseAtual", numeroFase); // salva no localStorage
        console.log("Fase selecionada:", numeroFase);

    // Redireciona para a página do jogo (opcional)
    // window.location.href = "jogo.html";
  });
});
      }
  });
  
  //-----------------------------------
  if (localStorage.getItem('Fase 1') === 'completa') {
      const niveis = document.querySelectorAll(".nivel-2")
      niveis[0].classList.remove("bloqueado")
      niveis[0].classList.add("desbloqueado")
      niveis[0].children[0].innerHTML = 2
      niveis[0].children[0].setAttribute("href", "arrastaJogo.html"); 

} if (localStorage.getItem('Fase 2') === 'completa') {
      const niveis = document.querySelectorAll(".nivel-3")
      niveis[0].classList.remove("bloqueado")
      niveis[0].classList.add("desbloqueado")
      niveis[0].children[0].innerHTML = 3
      niveis[0].children[0].setAttribute("href", "perguntas.html"); 

} if (localStorage.getItem('fase3') === 'completa') {
      const niveis = document.querySelectorAll(".nivel-4")
      niveis[0].classList.remove("bloqueado")
      niveis[0].classList.add("desbloqueado")
      niveis[0].children[0].innerHTML = 4
      niveis[0].children[0].setAttribute("href", "arrastaJogo.html"); 


}
// ... continue até a fase 20

  

 // if(localStorage.getItem('Fase 1') === 'completa'){
  //   const niveis = document.querySelectorAll(".nivel")
  //   niveis[0].classList.remove("bloqueado")
  //   niveis[0].classList.add("desbloqueado")
  //   niveis[0].children[0].innerHTML = 2
  // }
  
 

