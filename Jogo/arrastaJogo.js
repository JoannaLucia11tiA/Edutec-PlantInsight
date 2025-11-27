let draggedElement = null;
let acertosFase = 0;
 
const desafios = [
    { id: 1, imagem: "sol.png", respostaImg: "plantadrop.png", resultado: "Fotossíntese" },
    { id: 2, imagem: "agua.png", respostaImg: "raizdrop.png", resultado: "Absorção de nutrientes" },
    { id: 4, imagem: "flordrop.png", resultado: "Polinização", respostaImg: "abelha.png" },
    { id: 5, imagem: "sementedrop.png", resultado: "Germinação", respostaImg: "soloterrenodrop.png" },
    { id: 6, imagem: "folhadrop.png", resultado: "Fotossíntese", respostaImg: "clorosplasto.png" },
    { id: 7, imagem: "ventodrop.png", resultado: "Dispersão", respostaImg: "polendrop.png" },
    { id: 8, imagem: "macafrutodrop.png", resultado: "Dispersão de sementes", respostaImg: "esquilodrop.png" },
    { id: 9, imagem: "xilemadrop.png", resultado: "Transporte para a planta", respostaImg: "agua.png" },
    { id: 10, imagem: "floemadrop.png", resultado: "Distribuição pela planta", respostaImg: "nutrientesdrop.png" },
    { id: 13, imagem: "sol.png", resultado: "Produção de energia", respostaImg: "clorosplasto.png" },
    { id: 15, imagem: "musgo.png", resultado: "Reprodução eficiente", respostaImg: "humidade.png" },
    { id: 17, imagem: "cauledrop.png", resultado: "Estrutura da planta", respostaImg: "sustentacaodrop.png" },
    { id: 22, imagem: "cauledrop.png", resultado: "Transporte de substâncias", respostaImg: "ceivadrop.png" },
    { id: 26, imagem: "flordrop.png", resultado: "Formação do fruto", respostaImg: "ovulofecundadodrop.png" },
    { id: 29, imagem: "raizdrop.png", resultado: "Geotropismo", respostaImg: "gravidade.png" },
];   
//salvar
let limparProgresso = false;

 // 1. Ouve os cliques nos links de SAÍDA
 document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".sairpagina").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        destinoSaida = link.href;
        limparProgresso = link.classList.contains('limpar-local');
        popup2arrasta();
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
  function popup2arrasta() {
    document.getElementById("popup2arrasta").style.display = "block";
  }
  function fecharPopup2() {
    document.getElementById("popup2arrasta").style.display = "none";
  }


// --- Funções de Drag and Drop (sem alterações) ---
function handleDragStart(e) {
    this.style.opacity = "0.4";
    draggedElement = this; 
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.src);
}
function handleDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }
function handleDragEnter(e) { this.classList.add("dragover"); }
function handleDragLeave(e) { this.classList.remove("dragover"); }
function handleDragEnd(e) {
    if (draggedElement) draggedElement.style.opacity = "1";
    document.querySelectorAll(".areasoltar").forEach(area => area.classList.remove("dragover"));
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove("dragover");
    if (draggedElement) {
        const respostaJogador = draggedElement.src.split("/").pop();
        this.innerHTML = "";
        this.appendChild(draggedElement);
        draggedElement.style.opacity = "1";
        this.dataset.acertou = (respostaJogador === this.dataset.respostaCorreta) ? "true" : "false";
        draggedElement = null; 
        verificarSeTodasPreenchidas(); // Apenas mostra o botão
    }
}

// --- Lógica do Jogo (CORRIGIDA E SIMPLIFICADA) ---

// Função chamada quando o botão "Verificar" é clicado
function checarRespostas() {
    const dropzones = document.querySelectorAll(".areasoltar");
    document.querySelectorAll(".desafio-opcao").forEach(opcao => { opcao.draggable = false; });

    acertosFase = [...dropzones].filter(dz => dz.dataset.acertou === "true").length;
    localStorage.setItem("acertosFase", acertosFase);
    
// --- MARCAR FASE COMPLETA E DAR PONTOS ---
let faseAtual = Number(localStorage.getItem("faseAtual"));

if (acertosFase === 3) {
    let faseJaCompleta = localStorage.getItem(`Fase ${faseAtual}`) === "completa";

    if (!faseJaCompleta) {
        localStorage.setItem(`Fase ${faseAtual}`, "completa");

        let pontosAtuais = Number(localStorage.getItem("Pontosplayer")) || 0;
        localStorage.setItem("Pontosplayer", pontosAtuais + 10);
    }
}


    if (acertosFase < 3) {
        removeVida();
    }

    window.location.href = "./popup.html";
}

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

// Mostra o botão que já existe no HTML
function verificarSeTodasPreenchidas() {
    const dropzones = document.querySelectorAll(".areasoltar");
    const todasPreenchidas = [...dropzones].every(dz => dz.querySelector("img"));

    if (todasPreenchidas) {
        const button = document.getElementById('verificar-btn');
        if (button) {
            button.style.display = 'block'; // Mostra o botão
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const comecarJogo = () => {
    localStorage.setItem("faseAnterior", 2);
    acertosFase = 0;
    
    const button = document.getElementById('verificar-btn');
    if (button) {
        button.style.display = 'none'; // Esconde o botão no início
    }

    const questoesEscolhidas = shuffle([...desafios]).slice(0, 3);
    const opcoesRespostas = shuffle(questoesEscolhidas.map(q => q.respostaImg));

    const balaoImgs = [document.getElementById('balao-1'), document.getElementById('balao-2'), document.getElementById('balao-3')];
    const dropzones = [document.getElementById('dropzone1'), document.getElementById('dropzone2'), document.getElementById('dropzone3')];
    const respostasTexto = document.querySelectorAll('.balao h3');
    const opcoesImagens = document.querySelectorAll(".desafio-opcao");

    questoesEscolhidas.forEach((questao, index) => {
        balaoImgs[index].src = `assets.jogos/${questao.imagem}`;
        balaoImgs[index].alt = questao.resultado;
        respostasTexto[index].textContent = questao.resultado;
        const dropzone = dropzones[index];
        dropzone.dataset.respostaCorreta = questao.respostaImg;
        dropzone.dataset.acertou = "false"; 
        dropzone.innerHTML = '<h2>?</h2>';
    });
    
    opcoesImagens.forEach((opcao, index) => {
        if (opcoesRespostas[index]) {
            opcao.src = `assets.jogos/${opcoesRespostas[index]}`;
            opcao.style.display = "block";
        } else {
            opcao.style.display = "none";
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".desafio-opcao").forEach(opcao => {
        opcao.addEventListener("dragstart", handleDragStart);
        opcao.addEventListener("dragend", handleDragEnd);
    });
    document.querySelectorAll(".areasoltar").forEach(area => {
        area.addEventListener("dragover", handleDragOver);
        area.addEventListener("dragenter", handleDragEnter);
        area.addEventListener("dragleave", handleDragLeave);
        area.addEventListener("drop", handleDrop);
    });
    
    // Pega o botão do HTML e atribui a função ao clique
    const button = document.getElementById('verificar-btn');
    if (button) {
        button.addEventListener('click', checarRespostas);
    }

    comecarJogo();
});
