const form = document.querySelector(".form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("senha");
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const toggleSenha = document.getElementById("toggleSenha");

// regex email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// regra de senha (mín. 6 caracteres)
function senhaValida(s) {
    return s.length >= 6;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let temErro = false;

    // reset
    erroEmail.style.display = "none";
    emailInput.classList.remove("input-invalido");
    erroSenha.style.display = "none";
    passwordInput.classList.remove("input-invalido");

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
    if (password === "") {
        erroSenha.textContent = "Preencha a senha!";
        erroSenha.style.display = "block";
        passwordInput.classList.add("input-invalido");
        temErro = true;
    } else if (!senhaValida(password)) {
        erroSenha.textContent = "Senha inválida — mínimo 6 caracteres.";
        erroSenha.style.display = "block";
        passwordInput.classList.add("input-invalido");
        temErro = true;
    }

    if (temErro) return;

    alert("Login realizado com sucesso!");
    window.location.href = "../index.html";
});

// limpar erros quando digitar
emailInput.addEventListener("input", () => {
    erroEmail.style.display = "none";
    emailInput.classList.remove("input-invalido");
});

passwordInput.addEventListener("input", () => {
    erroSenha.style.display = "none";
    passwordInput.classList.remove("input-invalido");
});

toggleSenha.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleSenha.src = "olhoaberto.png";
    } else {
        passwordInput.type = "password";
        toggleSenha.src = "olhofechado.png";
    }
});



