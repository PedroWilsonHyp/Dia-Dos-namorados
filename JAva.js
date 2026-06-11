// =========================================
// 1 a 4. MANUTENÇÃO DOS EFEITOS BÁSICOS
// =========================================
const text = "Feliz Dia dos Namorados!";
let index = 0;
const typingElement = document.getElementById("typing-text");

function typeWriter() {
    if (typingElement && index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); 
    }
}
if (typingElement) { window.addEventListener("load", typeWriter); }

const btn = document.getElementById("surprise-btn");
const message = document.getElementById("hidden-message");
if (btn && message) {
    btn.addEventListener("click", () => {
        message.classList.remove("hidden"); 
        btn.style.display = "none"; 
    });
}

function createHeart() {
    const heart = document.createElement("div"); 
    heart.classList.add("heart"); 
    heart.innerText = "❤️"; 
    heart.style.left = Math.random() * 100 + "vw"; 
    heart.style.animationDuration = Math.random() * 5 + 3 + "s"; 
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    const container = document.getElementById("hearts-container");
    if (container) { container.appendChild(heart); }
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 300);

const imageContainer = document.getElementById("floating-images-container");
const fotos = [];
const quantidadeDeFotos = 35; 
for (let i = 1; i <= quantidadeDeFotos; i++) { fotos.push(`fotos/Foto (${i}).jpg`); }

function createFloatingImage() {
    if (!imageContainer) return;
    const img = document.createElement("img"); 
    img.src = fotos[Math.floor(Math.random() * fotos.length)]; 
    img.classList.add("floating-img"); 
    img.style.left = Math.random() * 90 + "vw"; 
    img.style.animationDuration = Math.random() * 10 + 15 + "s"; 
    imageContainer.appendChild(img);
    setTimeout(() => { img.remove(); }, 26000);
}
if (imageContainer) { setInterval(createFloatingImage, 4000); }


// =========================================
// 5. CONTADOR DE TEMPO
// =========================================
const dataDeInicio = new Date(2023, 5, 12); 
function atualizarContador() {
    const diasEl = document.getElementById("days");
    if (!diasEl) return; 
    const agora = new Date(); const diferenca = agora - dataDeInicio;
    diasEl.innerText = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    document.getElementById("minutes").innerText = Math.floor((diferenca / 1000 / 60) % 60);
    document.getElementById("seconds").innerText = Math.floor((diferenca / 1000) % 60);
}
setInterval(atualizarContador, 1000); atualizarContador();


// =========================================
// 6. BOTÃO FUJÃO
// =========================================
const btnNo = document.getElementById("btn-no");
const btnYes = document.getElementById("btn-yes");
const questionContainer = document.getElementById("question-container");
const letterContainer = document.getElementById("letter-container");

if (btnNo && btnYes && questionContainer && letterContainer) {
    btnNo.addEventListener("mouseover", () => {
        document.body.appendChild(btnNo);
        const randomX = Math.floor(Math.random() * (window.innerWidth - btnNo.offsetWidth));
        const randomY = Math.floor(Math.random() * (window.innerHeight - btnNo.offsetHeight));
        btnNo.style.position = "fixed"; 
        btnNo.style.left = randomX + "px"; 
        btnNo.style.top = randomY + "px";
    });
    btnYes.addEventListener("click", () => {
        questionContainer.style.display = "none"; 
        letterContainer.classList.remove("hidden"); 
        btnNo.style.display = "none";
    });
}


// =========================================
// 7. MÁQUINA DE MOTIVOS
// =========================================
const reasonBtn = document.getElementById("reason-btn");
const reasonDisplay = document.getElementById("reason-display");
const motivos = [
    "Pelo seu sorriso que ilumina meu dia inteiro.",
    "Porque você tem o abraço mais gosotoso do mundo.",
    "Por estes seus olhos que me fazem delirar.",
    "Pelas risadas que a gente compartilha, mesmo nas coisas mais bobas.",
    "Porque você é minha Senhorita, Minha Princesa e meu amor ao mesmo tempo.",
    "Porque com você, até não fazer nada se torna algo incrível."
];
if (reasonBtn && reasonDisplay) {
    reasonBtn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * motivos.length);
        reasonDisplay.style.opacity = 0;
        setTimeout(() => { 
            reasonDisplay.innerText = motivos[randomIndex]; 
            reasonDisplay.style.opacity = 1; 
        }, 300); 
    });
}


// =========================================
// 8. LÓGICA DO QUIZ
// =========================================
const perguntasQuiz = [
    {
        pergunta: "Onde foi o nosso primeiro encontro?",
        opcoes: ["No cinema", "Na praça", "Em um restaurante", "Na casa de amigos"],
        correta: 2 
    },
    {
        pergunta: "Qual foi o nosso primeiro filme assistido juntos?",
        opcoes: ["Your Name", "Harry Potter", "Senhor dos Anéis", "Invocação do Mal"],
        correta: 1 
    },
    {
        pergunta: "Quem é mais provável de dormir no meio de um filme?",
        opcoes: ["Eu", "Você", "Nós dois capotamos", "Nenhum, a gente 😈"],
        correta: 3 
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

const questionEl = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("quiz-options");
const resultEl = document.getElementById("quiz-result");
const quizArea = document.getElementById("quiz-area");

function carregarPergunta() {
    if (!questionEl) return;
    optionsContainer.innerHTML = "";
    
    const dadosDaPergunta = perguntasQuiz[perguntaAtual];
    questionEl.innerText = `${perguntaAtual + 1}. ${dadosDaPergunta.pergunta}`;
    
    dadosDaPergunta.opcoes.forEach((opcao, index) => {
        const button = document.createElement("button");
        button.innerText = opcao;
        button.classList.add("quiz-option-btn");
        
        button.addEventListener("click", () => verificarResposta(index, button));
        optionsContainer.appendChild(button);
    });
}

function verificarResposta(escolha, botaoClicado) {
    const dadosDaPergunta = perguntasQuiz[perguntaAtual];
    const todosOsBotoes = optionsContainer.children;
    for(let i = 0; i < todosOsBotoes.length; i++) {
        todosOsBotoes[i].disabled = true;
    }

    if (escolha === dadosDaPergunta.correta) {
        botaoClicado.classList.add("correct");
        pontuacao++;
    } else {
        botaoClicado.classList.add("wrong");
        todosOsBotoes[dadosDaPergunta.correta].classList.add("correct");
    }

    setTimeout(() => {
        perguntaAtual++;
        if (perguntaAtual < perguntasQuiz.length) {
            carregarPergunta();
        } else {
            mostrarResultado();
        }
    }, 1500);
}

function mostrarResultado() {
    quizArea.style.display = "none";
    resultEl.classList.remove("hidden");
    
    if (pontuacao === perguntasQuiz.length) {
        resultEl.innerText = `Você acertou ${pontuacao} de ${perguntasQuiz.length}! Você realmente sabe tudo sobre nós! ❤️`;
    } else if (pontuacao > 0) {
        resultEl.innerText = `Você acertou ${pontuacao} de ${perguntasQuiz.length}! Quase perfeito! 🥰`;
    } else {
        resultEl.innerText = `Você acertou 0... Acho que alguém tá precisando de um beijo pra refrescar a memória! 😅`;
    }
}
carregarPergunta();


// =========================================
// 9. LÓGICA DO PORTA-RETRATOS
// =========================================
const viagens = [
    { img: "fotos/viagem1.jpg", legenda: "Itacaré 🌴" },
    { img: "fotos/viagem2.jpg", legenda: "Porto Seguro 🏖️" },
    { img: "fotos/viagem3.jpg", legenda: "Pirenópolis ❤️" }
];

let viagemAtual = 0;
const imgTravel = document.getElementById("travel-img");
const captionTravel = document.getElementById("travel-caption");
const btnPrevTravel = document.getElementById("prev-travel");
const btnNextTravel = document.getElementById("next-travel");

function atualizarViagem() {
    if (!imgTravel || !captionTravel) return;
    imgTravel.style.opacity = 0;
    setTimeout(() => {
        imgTravel.src = viagens[viagemAtual].img;
        captionTravel.innerText = viagens[viagemAtual].legenda;
        imgTravel.style.opacity = 1;
    }, 300);
}

if (btnNextTravel && btnPrevTravel) {
    btnNextTravel.addEventListener("click", () => {
        viagemAtual = (viagemAtual + 1) % viagens.length;
        atualizarViagem();
    });

    btnPrevTravel.addEventListener("click", () => {
        viagemAtual = (viagemAtual - 1 + viagens.length) % viagens.length;
        atualizarViagem();
    });
}


// =========================================
// 10. CRONÔMETRO DA TELA DE ABERTURA (NOVO)
// =========================================
window.addEventListener("load", () => {
    const cortina = document.getElementById("cortina-amor");
    const binario = document.getElementById("passo1-binario");
    const texto = document.getElementById("passo2-texto");
    const coracao = document.getElementById("passo3-coracao");

    if(!cortina) return;

    setTimeout(() => { if(binario) binario.classList.add("visivel"); }, 500);

    setTimeout(() => {
        if(binario) binario.classList.remove("visivel");
        if(texto) texto.classList.add("visivel");
    }, 3000);

    setTimeout(() => {
        if(texto) texto.classList.remove("visivel");
        if(coracao) {
            coracao.classList.add("visivel");
            coracao.classList.add("pulsar");
        }
    }, 5500);

    setTimeout(() => {
        cortina.style.opacity = "0";
        setTimeout(() => { cortina.style.display = "none"; }, 2000);
    }, 8500);
});


// =========================================
// 11. EASTER EGGS DA CÁPSULA DO TEMPO (CORRIGIDO E SEM PORTAL)
// =========================================
function dispararMundoMistico(conteudo) {
    // 1. Cria apenas o Elemento que vai pular (Gato ou Avião)
    // Removemos a parte que criava e adicionava o portal.
    const sujeito = document.createElement("div");
    sujeito.className = "mega-sujeito";
    sujeito.innerHTML = conteudo; 
    document.body.appendChild(sujeito);

    // 2. Remove o elemento da tela depois de 3 segundos (quando a animação acaba)
    setTimeout(() => {
        // Apenas removemos o sujeito agora.
        if (sujeito) sujeito.remove();
    }, 3000);
}

/* =========================================
   EFEITO MÁQUINA DE ESCREVER
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const elemento = document.getElementById("texto-maquina");
    
    if (elemento) {
        // Pega o texto que você escreveu no HTML
        const texto = elemento.innerText; 
        
        // Limpa a tela imediatamente antes de ela ver
        elemento.innerHTML = ""; 
        
        let i = 0;
        function maquinaDeEscrever() {
            if (i < texto.length) {
                // Adiciona letra por letra. Se for uma quebra de linha (\n), ele cria um <br> do HTML
                elemento.innerHTML += texto.charAt(i) === '\n' ? '<br>' : texto.charAt(i);
                i++;
                // Velocidade da digitação: 40 milissegundos por letra
                setTimeout(maquinaDeEscrever, 40); 
            }
        }
        
        // Espera 1 segundo após a página carregar para começar o show
        setTimeout(maquinaDeEscrever, 1000);
    }
});