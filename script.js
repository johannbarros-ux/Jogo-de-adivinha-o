
const palavras = [
    { palavra: "javascript", categoria: "Tecnologia", dica: "Linguagem de programação muito utilizada na Web." },
    { palavra: "html", categoria: "Tecnologia", dica: "Linguagem utilizada para estruturar páginas da Web." },
    { palavra: "css", categoria: "Tecnologia", dica: "Utilizada para estilizar páginas da Web." },
    { palavra: "internet", categoria: "Tecnologia", dica: "Rede mundial de computadores." },
    { palavra: "navegador", categoria: "Tecnologia", dica: "Programa utilizado para acessar sites." },
    { palavra: "computador", categoria: "Tecnologia", dica: "Máquina utilizada para processar informações." },

    { palavra: "elefante", categoria: "Animais", dica: "Animal de grande porte que possui uma tromba." },
    { palavra: "girafa", categoria: "Animais", dica: "Animal conhecido pelo pescoço muito comprido." },
    { palavra: "golfinho", categoria: "Animais", dica: "Mamífero que vive na água e é bastante inteligente." },
    { palavra: "leao", categoria: "Animais", dica: "Conhecido como o rei da selva." },

    { palavra: "paris", categoria: "Cidades", dica: "Cidade francesa conhecida pela Torre Eiffel." },
    { palavra: "londres", categoria: "Cidades", dica: "Capital da Inglaterra." },
    { palavra: "tokyo", categoria: "Cidades", dica: "Capital do Japão." },
    { palavra: "brasilia", categoria: "Cidades", dica: "Capital do Brasil." },

    { palavra: "pizza", categoria: "Alimentos", dica: "Alimento de origem italiana geralmente feito com queijo e molho." },
    { palavra: "chocolate", categoria: "Alimentos", dica: "Doce produzido a partir do cacau." },
    { palavra: "banana", categoria: "Alimentos", dica: "Fruta amarela rica em potássio." },
    { palavra: "lasanha", categoria: "Alimentos", dica: "Prato feito com camadas de massa e recheio." }
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

// Elementos para mostrar a categoria e a dica
const elementoCategoria = document.createElement("p");
const elementoDica = document.createElement("p");

elementoPalavra.parentNode.insertBefore(elementoCategoria, elementoPalavra);
elementoPalavra.parentNode.insertBefore(elementoDica, elementoPalavra);

function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);

    palavraSecreta = palavras[indice].palavra;
    letrasCorretas = [];
    letrasUsadas = [];
    tentativas = 6;

    elementoCategoria.textContent = "Categoria: " + palavras[indice].categoria;
    elementoDica.textContent = "Dica: " + palavras[indice].dica;

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
