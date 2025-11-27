function popupCadastrar() {
    document.getElementById("popupCadastrar").style.display = "block";
  }

  window.onload = function () {
    popupCadastrar();
    document.getElementById("popupCadastrar").style.display = "flex";

};

  function fecharPopupCadastrar() {
    document.getElementById("popupCadastrar").style.display = "none";
  }

  function mostrarCadastro() {
    const popup = document.getElementById("popupCadastrar");
  
    popup.innerHTML = `
      <div class="popup-conteudo">
        <h2>Cadastro</h2>
  
        <label for="nomeUsuario">Digite seu nome:</label>
        <input type="text" id="nomeUsuario" placeholder="Seu nome">
  
        <button onclick="cadastrarUsuario()">Cadastrar</button>
      </div>
    `;
  }
  function cadastrarUsuario() {
    const nome = document.getElementById("nomeUsuario").value;

    if (nome.trim() === "") {
        alert("Digite um nome!");
        return;
    }

    // Recupera os pontos do localStorage
    const pontos = parseInt(localStorage.getItem("Pontosplayer")) || 0;
    localStorage.setItem("Nomeplayer", nome);
    
    fetch("http://localhost:3000/salvar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        pontos: pontos
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));

    // Cria um array para armazenar os cadastros
    // Cada item do array será um objeto { nome, pontos }
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    // Adiciona o novo usuário
    ranking.push({ nome: nome, pontos: pontos });

    // Salva novamente no localStorage
    localStorage.setItem("ranking", JSON.stringify(ranking));

    // Mostra popup de sucesso
    const popup = document.getElementById("popupCadastrar");
    popup.innerHTML = `
        <div class="popup-conteudo">
            <h2>Cadastro realizado com sucesso!</h2>
            <h2>Nome: ${nome}</h2>
            <h2>Pontos: ${pontos}</h2>
        </div>
    `  
    ;

    // Fecha popup depois de 2s
    setTimeout(() => {
        fecharPopupCadastrar();
    }, 3500);
}

