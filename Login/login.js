const form = document.querySelector(".form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("senha");
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const toggleSenha = document.getElementById("toggleSenha");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function senhaValida(s) {
    return s.length >= 6;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let temErro = false;

    erroEmail.style.display = "none";
    emailInput.classList.remove("input-invalido");
    erroSenha.style.display = "none";
    passwordInput.classList.remove("input-invalido");

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

    const user = { email, password };

    try {
        const resposta = await fetch("http://localhost:3333/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user })
        });

        const dados = await resposta.json();

        if (dados.message) {
            alert("Email ou senha incorretos.");
            return;
        }

        const { id, name } = dados;

        sessionStorage.setItem("user", JSON.stringify({ id, name }));

        alert("Login realizado com sucesso!");

        document.querySelector(".form").style.display = "none";

        window.location.href = "../index.html";

    } catch (error) {
        alert("Erro no servidor. Tente novamente.");
        console.error(error);
    }
});

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
