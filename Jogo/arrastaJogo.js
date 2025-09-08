localStorage.setItem("faseAnterior", 2);

var draggedElement = null
var items
let questoesDisponiveis = []
let contadorQuestao = 0

function handleDragStart(e){
  this.style.opacity = "0.4"
  draggedElement = this

  e.dataTransfer.effectAllowed = "move"
  e.dataTransfer.setData("item", this.innerHTML)
}

function handleDragOver(e){
  if(e.preventDefault)
    e.preventDefault()

  e.dataTransfer.dropEffect = "move"
  return false
  
}
function handleDragEnter(e){
  this.classList.add("dragover")
}

function handleDragLeave(e){
  this.classList.remove("dragover")
}

function handleDrop(e) {
  if (e.stopPropagation) e.stopPropagation();

  if (draggedElement !== this) {
    let draggedImg = draggedElement.querySelector("img");
    let targetImg = this.querySelector("img");

    // Troca apenas o src das imagens
    let tempSrc = draggedImg.src;
    draggedImg.src = targetImg.src;
    targetImg.src = tempSrc;
  }
}


function handleDragEnd(e){
  this.style.opacity = "1"

  items.forEach(function(item){
    item.classList.remove("dragover")
  })
}

document.addEventListener("DOMContentLoaded", event => {
  items = document.querySelectorAll(".container .box")


  items.forEach(function(item){
    item.addEventListener("dragstart", handleDragStart)
    item.addEventListener("dragenter", handleDragEnter)
    item.addEventListener("dragover", handleDragOver)
    item.addEventListener("dragleave", handleDragLeave)
    item.addEventListener("drop", handleDrop)
    item.addEventListener("dragend", handleDragEnd)
  })
})
/*-------------------------------------------------------------*/


const desafios = [
  { id: 1, 
    imagem: "sol.png",
    respostaImg: "plantadrop.png", 
    resultado: "Fotossíntese",  
   },
  { id: 2, 
    imagem: "agua.png", 
    respostaImg: "raizdrop.png", 
    resultado: "Absorção de nutrientes", 
    },
  { id: 3, 
    imagem: "co2drop.png",
    respostaImg: "sol.png", 
    resultado: "Produção de oxigênio", 
     },
  { id: 4, 
    imagem: "flordrop.png", 
    resultado: "Polinização", 
    respostaImg: "abelha.png" },
  { id: 5, 
    imagem: "sementedrop.png", 
    resultado: "Germinação", 
    respostaImg: "soloterrenodrop.png" },
  { id: 6, 
    imagem: "folhadrop.png", 
    resultado: "Fotossíntese",   
    respostaImg: "clorosplasto.png" },
  { id: 7, 
    imagem: "ventodrop.png", 
    resultado: "Dispersão",  
    respostaImg: "polendrop.png" },
  { id: 8, 
    imagem: "macafrutodrop.png", 
    resultado: "Dispersão de sementes",  
    respostaImg: "esquilodrop.png" },
  { id: 9, 
    imagem: "xilemadrop.png", 
    resultado: "Transporte para a planta", 
    respostaImg: "agua.png" },
  { id: 10, 
    imagem: "floemadrop.png", 
    resultado: "Distribuição pela planta",  
    respostaImg: "nutrientesdrop.png" },
  { id: 11, 
    imagem: "raizdrop.png", 
    resultado: "Fixação da planta", 
    respostaImg: "soloterrenodrop.png" },
  { id: 12, 
    imagem: "agua.png", 
    resultado: "Resfriamento da planta",  
    respostaImg: "transpiracaofolhadrop.png" },
  { id: 13, 
    imagem: "sol.png", 
    resultado: "Produção de energia",  
    respostaImg: "clorosplasto.png" },
  { id: 14, 
    imagem: "folhadrop.png", 
    resultado: "Entrada para fotossíntese", 
    respostaImg: "co2drop.png" },
  { id: 15, 
    imagem: "musgo.png", 
    resultado: "Reprodução eficiente", 
    respostaImg: "humidade.png" },
  { id: 16, 
    imagem: "plantadrop.png", 
    resultado: "Crescimento saudável", 
    respostaImg: "soloterrenodrop.png" },
  { id: 17, 
    imagem: "cauledrop.png", 
    resultado: "Estrutura da planta", 
    respostaImg: "sustentacaodrop.png" },
  { id: 18, 
    imagem: "raizdrop.png", 
    resultado: "Fixação da planta", 
    respostaImg: "soloterrenodrop.png" },
  { id: 19, 
    imagem: "folhadrop.png", 
    resultado: "Observação do crescimento", 
    respostaImg: "sol.png" },
  { id: 20, 
    imagem: "plantadrop.png", 
    resultado: "Distribuição geográfica",  
    respostaImg: "climas.png" },
  { id: 21, 
    imagem: "raizdrop.png", 
    resultado: "Absorção de nutrientes",  
    respostaImg: "agua.png" },
  { id: 22, 
    imagem: "cauledrop.png", 
    resultado: "Transporte de substâncias",   
    respostaImg: "ceivadrop.png" },
  { id: 23, 
    imagem: "folhadrop.png", 
    resultado: "Fotossíntese",  
    respostaImg: "clorosplasto.png" },
  { id: 24, 
    imagem: "flordrop.png", 
    resultado: "Polinização", 
    respostaImg: "abelha.png" },
  { id: 25, 
    imagem: "sementedrop.png", 
    resultado: "Germinação", 
    respostaImg: "soloterrenodrop.png" },
  { id: 26, 
    imagem: "flordrop.png", 
    resultado: "Formação do fruto", 
    respostaImg: "ovulofecundadodrop.png" },
  { id: 27, 
    imagem: "polendrop.png", 
    resultado: "Polinização anemófila",  
    respostaImg: "ventodrop.png" },
  { id: 28, 
    imagem: "musgo.png", 
    resultado: "Reprodução eficiente", 
    respostaImg: "humidade.png" },
  { id: 29, 
    imagem: "raizdrop.png", 
    resultado: "Geotropismo",  
    respostaImg: "gravidade.png" },
  { id: 30, 
    imagem: "formadrop.png", 
    resultado: "Morfologia vegetal",  
    respostaImg: "folhadrop.png" },
  { id: 31, 
    imagem: "flordrop.png", 
    resultado: "Compostos químicos atraentes",  
    respostaImg: "fragancia.png" }
];
//------------------------------------------------------------------------------------------
const comecarJogo = () => {
  contadorQuestao = 0;
  questoesDisponiveis = [...desafios];
  let questoesEscolhidas = []
  let numeroQuestoesEscolhidas = 0
  while (numeroQuestoesEscolhidas < 3) {
    let indiceAleatorio = Math.floor(Math.random() * questoesDisponiveis.length);
    if (!questoesEscolhidas.includes(questoesDisponiveis[indiceAleatorio])) {
      questoesEscolhidas.push(questoesDisponiveis[indiceAleatorio]);
      numeroQuestoesEscolhidas++
    }
    
  }

  const opcoes = document.querySelectorAll(".container .desafio");
  const baloes = document.querySelectorAll(".soltarOpcoes .balao > img");
  const respostas = document.querySelectorAll(".soltarOpcoes .balao > h3");


  opcoes.forEach((opcao, index) => {
    if (questoesEscolhidas[index]) {
      opcao.src = `assets.jogos/${questoesEscolhidas[index].imagem}`;
    }
  });
  baloes.forEach((opcao, index) => {
    if (questoesEscolhidas[index]) {
      opcao.src = `assets.jogos/${questoesEscolhidas[index].respostaImg}`;

      // 🔹 Salva a resposta certa no dropzone correspondente
    document.getElementById(`dropzone${index+1}`).dataset.respostaCorreta = questoesEscolhidas[index].respostaImg;
    }
  });
  respostas.forEach((opcao, index) => {
    if (questoesEscolhidas[index]) {
      opcao.textContent = questoesEscolhidas[index].resultado;
    }
  });
  
};
// 🔹 Listeners das áreas de soltar
document.querySelectorAll(".areasoltar").forEach(area => {
  area.addEventListener("dragover", e => e.preventDefault());
  area.addEventListener("drop", e => {
    e.preventDefault();
    area.innerHTML = "";
    let draggedImg = draggedElement.querySelector("img").cloneNode(true);
    area.appendChild(draggedImg);

    // 🔹 Conferir se acertou
    let respostaJogador = draggedImg.src.split("/").pop(); // só o nome do arquivo
    let respostaCorreta = area.dataset.respostaCorreta;

    if (respostaJogador === respostaCorreta) {
      area.dataset.acertou = "true";
    } else {
      area.dataset.acertou = "false";
    }

    verificarDropzones();
  });
});

function verificarDropzones() {
  const dz1 = document.getElementById("dropzone1");
  const dz2 = document.getElementById("dropzone2");
  const dz3 = document.getElementById("dropzone3");

  if (dz1.innerHTML.trim() !== "<h2>?</h2>" &&
      dz2.innerHTML.trim() !== "<h2>?</h2>" &&
      dz3.innerHTML.trim() !== "<h2>?</h2>") {

    // 🔹 Conta os acertos da fase
    let acertosFase = 0;
    [dz1, dz2, dz3].forEach(dz => {
      if (dz.dataset.acertou === "true") acertosFase++;
    });

    // 🔹 Pega o total de acertos anterior do localStorage
    let totalAcertos = parseInt(localStorage.getItem("totalAcertos")) || 0;

    // 🔹 Soma os acertos da fase ao total
    totalAcertos += acertosFase;

    // 🔹 Salva o novo total no localStorage
    localStorage.setItem("totalAcertos", totalAcertos);

    // Mostra botão de continuar
    document.getElementById("button-continuar").innerHTML = `
      <a href="popup.html">
        <button class="button-continuar">Continuar</button>
      </a>
    `;
  }
}

comecarJogo();
