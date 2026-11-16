
const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador"
];

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);

    palavraSecreta = palavras[indice];
    letrasCorretas = [];
    letrasUsadas = [];
    tentativas = 6;

    mensagem.textContent = "";
    inputLetra.value = "";
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";

    atualizarPalavra();
}

function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao;
}

function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

function verificarLetra() {
    const letra = inputLetra.value.toLowerCase().trim();

    if (letra === "") {
        mensagem.textContent = "Digite uma letra.";
        return;
    }

    if (letra.length !== 1 || !/[a-z]/.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra.";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Letra já utilizada.";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou!";
    }

    atualizarPalavra();

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        botaoTentar.disabled = true;
    } else if (tentativas === 0) {
        mensagem.textContent = "Você perdeu! A palavra era " + palavraSecreta;
        botaoTentar.disabled = true;
    }

    inputLetra.value = "";
}

botaoTentar.addEventListener("click", verificarLetra);

botaoReiniciar.addEventListener("click", function() {
    botaoTentar.disabled = false;
    iniciarJogo();
});

iniciarJogo();
