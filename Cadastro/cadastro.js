const form = document.querySelector(".form");
const emailInput = document.getElementById("email");

// Seleciona os campos de Senha e Confirmação
const senhaInput = document.getElementById("senha");
const confirmarInput = document.getElementById("confirmar");

// Seleciona os elementos de erro (novo erroConfirmar)
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const erroConfirmar = document.getElementById("erro-confirmar"); // NOVO ELEMENTO DE ERRO

// Seleciona os ícones de alternância
const toggleSenha = document.getElementById("toggleSenha");
const toggleConfirmar = document.getElementById("toggleConfirmar");

// regex email
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

// regra de senha (mín. 6 caracteres)
function senhaValida(s) {
    return s.length >= 6;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirmar = confirmarInput.value.trim();
    let temErro = false;

    // reset de todos os erros
    erroEmail.textContent = "";
    erroEmail.style.display = "none";
    emailInput.classList.remove("input-invalido");

    // Reset da Senha e Confirmação
    erroSenha.textContent = "";
    erroSenha.style.display = "none";
    erroConfirmar.textContent = ""; // Reset do novo erro
    erroConfirmar.style.display = "none";
    senhaInput.classList.remove("input-invalido");
    confirmarInput.classList.remove("input-invalido");

    // --- valida email ----
    if (email === "") {
        erroEmail.textContent = "Preencha o email!";
        erroEmail.style.display = "block";
        emailInput.classList.add("input-invalido");
        temErro = true;

    } else if (!emailRegex.test(email)) {
        erroEmail.textContent = "Email inválido!";
        erroEmail.style.display = "block";
        emailInput.classList.add("input-invalido");
        temErro = true;
    }
    // --- valida senha ----
    if (senha === "") {
        erroSenha.textContent = "Preencha a senha!";
        erroSenha.style.display = "block";
        senhaInput.classList.add("input-invalido");
        temErro = true;

    } else if (!senhaValida(senha)) {
        erroSenha.textContent = "Senha inválida — mínimo 6 caracteres.";
        erroSenha.style.display = "block";
        senhaInput.classList.add("input-invalido");
        temErro = true;
    }
    // --- valida confirmação ---
    if (confirmar === "") {
        erroConfirmar.textContent = "Confirme a senha!"; // Usa o novo erro
        erroConfirmar.style.display = "block";
        confirmarInput.classList.add("input-invalido");
        temErro = true;

    } else if (senha !== confirmar && !temErro) { // Se a senha principal estiver OK, checa a igualdade
        erroConfirmar.textContent = "As senhas não coincidem!";
        erroConfirmar.style.display = "block";
        senhaInput.classList.add("input-invalido");
        confirmarInput.classList.add("input-invalido");
        temErro = true;

    } else if (senha !== confirmar && temErro && senha !== "") { // Se a senha principal está inválida (temErro=true) e são diferentes
        erroConfirmar.textContent = "As senhas não coincidem!";
        erroConfirmar.style.display = "block";
        confirmarInput.classList.add("input-invalido"); // Não adiciona input-invalido à senhaInput pois ela já pode ter erro
        temErro = true;
    }

    if (temErro) return;

    // Verificar se o e-mail já existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        erroEmail.textContent = "Este e-mail já foi cadastrado.";
        erroEmail.style.display = "block";
        emailInput.classList.add("input-invalido");
        return;
    }
    // Salvar novo usuário
    const newUser = { email, senha };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Ação de sucesso (mudar para a página de login)
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../index.html";
});

// limpar erros quando digitar
emailInput.addEventListener("input", () => {
    erroEmail.style.display = "none";
    emailInput.classList.remove("input-invalido");
});

senhaInput.addEventListener("input", () => {
    erroSenha.style.display = "none";
    senhaInput.classList.remove("input-invalido");// Também limpa o erro de confirmação, caso o usuário comece a digitar na senha
    erroConfirmar.style.display = "none";
    confirmarInput.classList.remove("input-invalido");
});

confirmarInput.addEventListener("input", () => {
    erroConfirmar.style.display = "none"; // Limpa o próprio erro
    confirmarInput.classList.remove("input-invalido"); // Também limpa o input da senha, caso a senha e confirmação coincidam agora
    senhaInput.classList.remove("input-invalido");
});

// --- Lógica para mostrar/ocultar senha (toggle) ---
function toggleVisibility(inputElement, iconElement) {
    if (inputElement.type === "password") {
        inputElement.type = "text";
        iconElement.src = "./olhoaberto.png";
    } else {
        inputElement.type = "password";
        iconElement.src = "./olhofechado.png";
    }
}

toggleSenha.addEventListener("click", () => {
    toggleVisibility(senhaInput, toggleSenha);
});

toggleConfirmar.addEventListener("click", () => {
    toggleVisibility(confirmarInput, toggleConfirmar);
});