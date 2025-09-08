window.addEventListener('DOMContentLoaded', () => {
  const resultado = localStorage.getItem('resultadoPergunta');
  console.log("Resultado salvo:", resultado);

  if(resultado === 'certo'){
      document.getElementById('popup-certo').style.display = 'block';
  } else if(resultado === 'errado'){
      document.getElementById('popup-errado').style.display = 'block';
  }

  // limpa depois de mostrar
  localStorage.removeItem('resultadoPergunta');
});
window.addEventListener('DOMContentLoaded', () => {
  const resultado = localStorage.getItem('acertosFase');
  console.log("Resultado salvo:", resultado);

  if(resultado === '3'){
      document.getElementById('acertos-maximo').style.display = 'block';
  } else if(resultado === '1' || resultado === '0'){
      document.getElementById('acertos-baixo').style.display = 'block';
      const h3Popup = document.querySelector('#acertos-baixo h3'); // Pega o H3
           h3Popup.textContent = `${resultado}/3`; // Altera o texto de
  }

  // limpa depois de mostrar
  localStorage.removeItem('acertosFase');
});

let faseAnterior = localStorage.getItem("faseAnterior");
faseAnterior = faseAnterior ? parseInt(faseAnterior) : 0;

// Só roda quando clicar no botão
function jogar() {
  if (faseAnterior === 1) {
    // Vai para o jogo 2
    window.location.href = "arrastaJogo.html";
  } else if (faseAnterior === 2) {
    // Vai para a página 1
    window.location.href = "perguntas.html";
  } else {
    alert("Nenhuma fase anterior encontrada.");
  }
}

// Atribui a função ao botão
document.getElementById("play-fase").onclick = jogar;
document.getElementById("play-fase2").onclick = jogar;



// Pega o botão "Próxima Fase"
const btnProxima = document.getElementById("play-fase");
const btnProxima2 = document.getElementById("play-fase2");


// Quando clicar, aumenta faseAtual +1
btnProxima.addEventListener("click", () => {
  // Pega a fase atual do localStorage (ou 0 se não existir)
  let faseAtual = parseInt(localStorage.getItem("faseAtual")) || 0;

  // Incrementa
  faseAtual++;

  // Salva de volta no localStorage
  localStorage.setItem("faseAtual", faseAtual);
  console.log("Próxima fase:", faseAtual);

  // Aqui você pode redirecionar ou carregar a fase
  // window.location.href = "jogo.html";
});
btnProxima2.addEventListener("click", () => {
  // Pega a fase atual do localStorage (ou 0 se não existir)
  let faseAtual = parseInt(localStorage.getItem("faseAtual")) || 0;

  // Incrementa
  faseAtual++;

  // Salva de volta no localStorage
  localStorage.setItem("faseAtual", faseAtual);
  console.log("Próxima fase:", faseAtual);

  // Aqui você pode redirecionar ou carregar a fase
  // window.location.href = "jogo.html";
});
