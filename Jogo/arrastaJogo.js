localStorage.setItem("faseAnterior", 2);

let draggedElement = null;
let acertosFase = 0;

// Desafios disponíveis no jogo
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

// --- Funções de Drag and Drop ---

function handleDragStart(e) {
    this.style.opacity = "0.4";
    draggedElement = this; // O elemento arrastado é a própria imagem
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.src);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function handleDragEnter(e) {
    this.classList.add("dragover");
}

function handleDragLeave(e) {
    this.classList.remove("dragover");
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove("dragover");

    if (draggedElement) {
        // Pega o nome do arquivo da imagem arrastada
        const respostaJogador = draggedElement.src.split("/").pop();
        // Pega a resposta correta armazenada no dropzone
        const respostaCorreta = this.dataset.respostaCorreta;

        // Limpa a área de soltar e adiciona a imagem arrastada
        this.innerHTML = "";
        this.appendChild(draggedElement);
        draggedElement.style.opacity = "1"; // Garante que a opacidade volte ao normal

        // Verifica se a resposta está correta
        if (respostaJogador === respostaCorreta) {
            this.dataset.acertou = "true";
        } else {
            this.dataset.acertou = "false";
        }
        
        draggedElement = null; // Limpa o elemento arrastado
        verificarDropzones(); // Verifica se todos os dropzones foram preenchidos
    }
}

function handleDragEnd(e) {
    // Se o elemento não foi solto em um alvo válido, ele retorna à opacidade normal
    if (draggedElement) {
        draggedElement.style.opacity = "1";
    }
    // Remove a classe de highlight de todos os dropzones
    document.querySelectorAll(".areasoltar").forEach(area => area.classList.remove("dragover"));
}


// --- Lógica do Jogo ---

// Função para embaralhar um array (algoritmo de Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const comecarJogo = () => {
    acertosFase = 0; // Reseta os acertos da fase
    const desafiosDisponiveis = [...desafios];
    
    // Escolhe 3 desafios aleatórios sem repetição
    const questoesEscolhidas = shuffle(desafiosDisponiveis).slice(0, 3);
    
    // Pega as 3 respostas corretas e embaralha para as opções
    const opcoesRespostas = shuffle(questoesEscolhidas.map(q => q.respostaImg));

    const desafiosImagens = document.querySelectorAll(".soltarOpcoes .balao > img");
    const respostasTexto = document.querySelectorAll(".soltarOpcoes .balao > h3");
    const dropzones = document.querySelectorAll(".areasoltar");
    const opcoesImagens = document.querySelectorAll(".desafio-opcao");

    // Preenche os desafios e as áreas de soltar
    questoesEscolhidas.forEach((questao, index) => {
        // Define a imagem do desafio (ex: sol.png)
        desafiosImagens[index].src = `assets.jogos/${questao.imagem}`;
        desafiosImagens[index].alt = questao.resultado;

        // Define o texto do resultado (ex: Fotossíntese)
        respostasTexto[index].textContent = questao.resultado;

        // Armazena a resposta correta no dataset do dropzone correspondente
        dropzones[index].dataset.respostaCorreta = questao.respostaImg;
        dropzones[index].dataset.acertou = "false"; // Inicializa como falso
        dropzones[index].innerHTML = '<h2>?</h2>'; // Reseta o conteúdo
    });

    // Preenche as opções de resposta arrastáveis
    opcoesImagens.forEach((opcao, index) => {
        if (opcoesRespostas[index]) {
            opcao.src = `assets.jogos/${opcoesRespostas[index]}`;
            opcao.style.opacity = "1"; // Garante que a imagem esteja visível
            // Adiciona a imagem de volta ao seu container original se necessário
            document.querySelectorAll(".container .box")[index].appendChild(opcao);
        }
    });
};

function verificarDropzones() {
    const dropzones = document.querySelectorAll(".areasoltar");
    const todasPreenchidas = [...dropzones].every(dz => dz.querySelector("img"));

    if (todasPreenchidas) {
        // Conta os acertos da fase
        acertosFase = [...dropzones].filter(dz => dz.dataset.acertou === "true").length;

        // Pega o total de acertos anterior do localStorage
        let totalAcertos = parseInt(localStorage.getItem("totalAcertos")) || 0;

        // Soma os acertos da fase ao total
        totalAcertos += acertosFase;

        // Salva o novo total e os acertos da fase no localStorage
        localStorage.setItem("totalAcertos", totalAcertos);
        localStorage.setItem("acertosFase", acertosFase);


        // Mostra botão de continuar
        document.getElementById("button-continuar").innerHTML = `
      <a href="popup.html">
        <button class="button-continuar">Continuar</button>
      </a>
    `;
    }
}

// Roda o código quando o HTML estiver totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
    const opcoesArrastaveis = document.querySelectorAll(".desafio-opcao");
    const areasSoltar = document.querySelectorAll(".areasoltar");

    opcoesArrastaveis.forEach(opcao => {
        opcao.addEventListener("dragstart", handleDragStart);
        opcao.addEventListener("dragend", handleDragEnd);
    });

    areasSoltar.forEach(area => {
        area.addEventListener("dragover", handleDragOver);
        area.addEventListener("dragenter", handleDragEnter);
        area.addEventListener("dragleave", handleDragLeave);
        area.addEventListener("drop", handleDrop);
    });

    comecarJogo();
});
