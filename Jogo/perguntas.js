

localStorage.setItem("faseAnterior", 1); 
const textoPergunta = document.getElementById("texto-pergunta")
const opcoesRespostas = Array.from(document.getElementsByClassName('opcao-texto'))
console.log(opcoesRespostas)

let fase = parseInt(localStorage.getItem("faseAtual")) || 1
let questaoAtual = {}
let aceitandoRespostas = false
let contadorQuestao = 0
let questoesDisponiveis = []

let questoesQuiz = [
  {
    pergunta: "Qual processo as plantas usam para converter energia luminosa em energia química?",
    alternativas: ["Respiração celular", "Fotossíntese", "Transpiração", "Fototropismo"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual pigmento é essencial para a fotossíntese?",
    alternativas: ["Clorofila", "Carotenoides", "Xantofila", "Antocianina"],
    respostaCorreta: 0
  },
  {
    pergunta: "Onde ocorre a fotossíntese na célula vegetal?",
    alternativas: ["Mitocôndria", "Cloroplasto", "Núcleo", "Vacúolo"],
    respostaCorreta: 1
  },
  {
    pergunta: "Que estrutura da folha controla a entrada e saída de gases?",
    alternativas: ["Cutícula", "Estômato", "Xilema", "Floema"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual tecido transporta água e sais minerais nas plantas?",
    alternativas: ["Floema", "Xilema", "Estômato", "Cloroplasto"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual tecido transporta seiva elaborada (açúcares)?",
    alternativas: ["Xilema", "Floema", "Lenticela", "Estômato"],
    respostaCorreta: 1
  },
  {
    pergunta: "Como as plantas perdem água em forma de vapor?",
    alternativas: ["Respiração", "Fotossíntese", "Transpiração", "Germinação"],
    respostaCorreta: 2
  },
  {
    pergunta: "Qual hormônio vegetal está relacionado ao alongamento celular?",
    alternativas: ["Giberelina", "Auxina", "Etileno", "Citocinina"],
    respostaCorreta: 1
  },

  // --- Reprodução das Plantas ---
  {
    pergunta: "Qual é a principal estrutura reprodutiva das angiospermas?",
    alternativas: ["Fruto", "Flor", "Semente", "Raiz"],
    respostaCorreta: 1
  },
  {
    pergunta: "Como é chamada a reprodução que precisa de dois gametas?",
    alternativas: ["Sexuada", "Assexuada", "Vegetativa", "Clonagem"],
    respostaCorreta: 0
  },
  {
    pergunta: "Como se chama a reprodução que ocorre sem gametas?",
    alternativas: ["Sexuada", "Assexuada", "Fecundação", "Cruzamento"],
    respostaCorreta: 1
  },
  {
    pergunta: "O que é polinização?",
    alternativas: ["Formação do fruto", "Formação da raiz", "Transferência de pólen ao estigma", "Crescimento da semente"],
    respostaCorreta: 2
  },
  {
    pergunta: "Qual órgão da flor produz grãos de pólen?",
    alternativas: ["Estigma", "Ovário", "Antera", "Sépala"],
    respostaCorreta: 2
  },
  {
    pergunta: "Qual parte da flor se desenvolve em fruto após a fecundação?",
    alternativas: ["Ovário", "Estame", "Pétala", "Antera"],
    respostaCorreta: 0
  },
  {
    pergunta: "Como se chama a reprodução onde um pedaço da planta origina outra?",
    alternativas: ["Sexuada", "Multiplicação vegetativa", "Geração alternada", "Polinização"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual estrutura se forma após a fecundação do óvulo?",
    alternativas: ["Fruto", "Semente", "Flor", "Raiz"],
    respostaCorreta: 1
  },

  // --- Estudo das Plantas ---
  {
    pergunta: "Qual é o nome da ciência que estuda as plantas?",
    alternativas: ["Zoologia", "Botânica", "Ecologia", "Biologia Celular"],
    respostaCorreta: 1
  },
  {
    pergunta: "Quem é considerado o 'pai da Botânica'?",
    alternativas: ["Darwin", "Lineu", "Teofrasto", "Aristóteles"],
    respostaCorreta: 2
  },
  {
    pergunta: "Qual é a divisão da Botânica que estuda a forma das plantas?",
    alternativas: ["Morfologia vegetal", "Anatomia animal", "Ecologia", "Genética"],
    respostaCorreta: 0
  },
  {
    pergunta: "Como se chama o estudo das funções vitais das plantas?",
    alternativas: ["Genética", "Fisiologia vegetal", "Ecologia", "Taxonomia"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual área da botânica estuda fósseis de plantas?",
    alternativas: ["Paleobotânica", "Micologia", "Ficologia", "Fitogeografia"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual parte da botânica estuda as algas?",
    alternativas: ["Micologia", "Ficologia", "Morfologia", "Taxonomia"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual parte da botânica estuda os fungos?",
    alternativas: ["Ficologia", "Micologia", "Fitopatologia", "Ecologia"],
    respostaCorreta: 1
  },
  {
    pergunta: "Como se chama a área que estuda a relação das plantas com o ambiente?",
    alternativas: ["Fisiologia", "Ecologia vegetal", "Taxonomia", "Anatomia"],
    respostaCorreta: 1
  },

  // --- Diversidade Vegetal ---
  {
    pergunta: "As plantas pertencem a qual reino?",
    alternativas: ["Fungi", "Protista", "Plantae", "Animalia"],
    respostaCorreta: 2
  },
  {
    pergunta: "Como se chamam as plantas que não produzem sementes?",
    alternativas: ["Angiospermas", "Gimnospermas", "Pteridófitas", "Briófitas"],
    respostaCorreta: 2
  },
  {
    pergunta: "Como se chamam as plantas com flores e frutos?",
    alternativas: ["Briófitas", "Angiospermas", "Gimnospermas", "Pteridófitas"],
    respostaCorreta: 1
  },
  {
    pergunta: "Como se chamam as plantas com sementes, mas sem frutos?",
    alternativas: ["Angiospermas", "Gimnospermas", "Pteridófitas", "Briófitas"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual é o grupo mais simples de plantas?",
    alternativas: ["Angiospermas", "Briófitas", "Pteridófitas", "Gimnospermas"],
    respostaCorreta: 1
  },
  {
    pergunta: "O musgo é exemplo de qual grupo de plantas?",
    alternativas: ["Pteridófitas", "Gimnospermas", "Briófitas", "Angiospermas"],
    respostaCorreta: 2
  },
  {
    pergunta: "As samambaias pertencem a qual grupo?",
    alternativas: ["Briófitas", "Angiospermas", "Pteridófitas", "Gimnospermas"],
    respostaCorreta: 2
  },
  {
    pergunta: "O pinheiro-do-paraná é exemplo de qual grupo?",
    alternativas: ["Gimnospermas", "Angiospermas", "Pteridófitas", "Briófitas"],
    respostaCorreta: 0
  },

  // --- Classificação das Plantas ---
  {
    pergunta: "Quem criou o sistema binomial de nomenclatura científica?",
    alternativas: ["Darwin", "Lamarck", "Lineu", "Teofrasto"],
    respostaCorreta: 2
  },
  {
    pergunta: "Qual é a hierarquia correta de classificação?",
    alternativas: ["Reino, filo, ordem, classe, família, gênero, espécie",
                  "Reino, classe, ordem, família, gênero, espécie",
                  "Reino, filo, classe, ordem, família, gênero, espécie",
                  "Reino, gênero, espécie"],
    respostaCorreta: 2
  },
  {
    pergunta: "O nome científico deve ser escrito em qual idioma?",
    alternativas: ["Inglês", "Latim", "Grego", "Espanhol"],
    respostaCorreta: 1
  },
  {
    pergunta: "O nome científico é composto por quantas palavras?",
    alternativas: ["1", "2", "3", "4"],
    respostaCorreta: 1
  },
  {
    pergunta: "A primeira palavra do nome científico corresponde a quê?",
    alternativas: ["Espécie", "Família", "Classe", "Gênero"],
    respostaCorreta: 3
  },
  {
    pergunta: "A segunda palavra do nome científico corresponde a quê?",
    alternativas: ["Espécie", "Gênero", "Família", "Ordem"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual grupo é maior: gênero ou família?",
    alternativas: ["Família", "Espécie", "Gênero", "Classe"],
    respostaCorreta: 0
  },
  {
    pergunta: "O feijão pertence a qual família de plantas?",
    alternativas: ["Poaceae", "Fabaceae", "Solanaceae", "Asteraceae"],
    respostaCorreta: 1
  },
  {
    pergunta: "O milho pertence a qual família?",
    alternativas: ["Solanaceae", "Asteraceae", "Fabaceae", "Poaceae"],
    respostaCorreta: 3
  },

  // --- Química das Plantas ---
  {
    pergunta: "Qual gás é absorvido pelas plantas durante a fotossíntese?",
    alternativas: ["Oxigênio", "Gás carbônico (CO₂)", "Nitrogênio", "Ozônio"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual gás é liberado na fotossíntese?",
    alternativas: ["Oxigênio", "Gás carbônico (CO₂)", "Nitrogênio", "Metano"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual molécula é a principal fonte de energia nas células vegetais?",
    alternativas: ["Amido", "Glicose", "Celulose", "Frutose"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual substância forma a parede celular das plantas?",
    alternativas: ["Amido", "Celulose", "Quitina", "Lignina"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual molécula as plantas produzem e armazenam como reserva energética?",
    alternativas: ["Amido", "Celulose", "Glicogênio", "Proteína"],
    respostaCorreta: 0
  },
  {
    pergunta: "Que mineral é essencial para a produção de clorofila?",
    alternativas: ["Magnésio", "Ferro", "Cálcio", "Enxofre"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual gás é necessário para a respiração celular das plantas?",
    alternativas: ["Oxigênio", "Gás carbônico", "Nitrogênio", "Metano"],
    respostaCorreta: 0
  },
  {
    pergunta: "Durante a respiração celular, qual gás é liberado?",
    alternativas: ["Oxigênio", "Gás carbônico", "Ozônio", "Nitrogênio"],
    respostaCorreta: 1
  }
]

//Constantes
const maximoQuestoes = 1

comecarJogo = () =>{
  contadorQuestao = 0
  questoesDisponiveis = [...questoesQuiz]
  console.log(questoesDisponiveis)

  pegarNovaQuestao()
}

pegarNovaQuestao = () => {

    

  contadorQuestao++
  const questionIndex = Math.floor(Math.random() * questoesDisponiveis.length)
  questaoAtual = questoesDisponiveis[questionIndex]
  textoPergunta.innerText = questaoAtual.pergunta

  questoesDisponiveis = [...questoesQuiz]

  opcoesRespostas.forEach(opcao => {
    const number = opcao.dataset["number"] // pega o número do data-number
    opcao.innerText = questaoAtual.alternativas[number - 1] // ajusta para índice do array
  })

   questoesDisponiveis.splice(questionIndex, 1)

   aceitandoRespostas = true

}

opcoesRespostas.forEach(opcao => {
  opcao.addEventListener('click', e => {
  if(!aceitandoRespostas)return

  aceitandoRespostas = false 

  const opcaoClicada = e.target
  const opcaoResposta = opcaoClicada.dataset['number']-1

  let adicionarClass = 'incorreto'
  if(opcaoResposta == questaoAtual.respostaCorreta){
    adicionarClass = 'correto'
    let faseAtual = parseInt(localStorage.getItem("faseAtual")) || 1;

    // Marca a fase anterior como completa
    localStorage.setItem(`Fase ${faseAtual }`, 'completa');
  
  }
  opcaoClicada.classList.add(adicionarClass)
  if(adicionarClass == 'correto'){
    
  }
  
  if(opcaoResposta == questaoAtual.respostaCorreta){
    localStorage.setItem('resultadoPergunta', 'certo');

    


} else {
    localStorage.setItem('resultadoPergunta', 'errado');
    removeVida()
}

  opcoesRespostas.forEach(botao => botao.disabled = true)

  // criar botão "Próxima questão"
  document.getElementById("button-continuar").innerHTML = `
  <a href="popup.html">
    <button class="button-continuar">Continuar</button>
  </a>
`

 
  })
})


comecarJogo()



