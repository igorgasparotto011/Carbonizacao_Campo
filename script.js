/* ==========================================================================
   1. GERENCIAMENTO E LOGICA DO QUIZ INTERATIVO
   ========================================================================== */

let perguntaAtual = 0;
let pontuacaoQuiz = 0;
let respostaSelecionadaNestaRodada = false;

// Elementos da Interface (DOM)
const textoPergunta = document.getElementById("texto-pergunta");
const numPergunta = document.getElementById("num-pergunta");
const caixaAlternativas = document.getElementById("caixa-alternativas");
const barraProgresso = document.getElementById("barra-progresso");
const dicaNavegacao = document.getElementById("dica-navegacao");
const quizFluxo = document.getElementById("quiz-fluxo");
const quizResultado = document.getElementById("quiz-resultado");
const pontosFinais = document.getElementById("pontos-finais");

// Inicializa o Quiz assim que a página carregar
window.addEventListener("DOMContentLoaded", () => {
    carregarPergunta();
    
    // Ouvinte de teclado para avançar a pergunta com a tecla 'D'
    window.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "d" && respostaSelecionadaNestaRodada) {
            proximaPergunta();
        }
    });
});

// Carrega a pergunta atual na tela
function carregarPergunta() {
    respostaSelecionadaNestaRodada = false;
    dicaNavegacao.classList.add("hidden");
    caixaAlternativas.innerHTML = "";

    const dadosPergunta = perguntasQuiz[perguntaAtual];
    
    // Atualiza textos e barra de progresso
    numPergunta.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}`;
    textoPergunta.textContent = dadosPergunta.pergunta;
    
    const porcentagemProgresso = ((perguntaAtual + 1) / perguntasQuiz.length) * 100;
    barraProgresso.style.width = `${porcentagemProgresso}%`;

    // Renderiza os botões das alternativas
    dadosPergunta.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.className = "btn-alternativa";
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(index, botao);
        caixaAlternativas.appendChild(botao);
    });
}

// Valida a resposta do usuário
function verificarResposta(indexSelecionado, botaoClicado) {
    if (respostaSelecionadaNestaRodada) return; // Evita cliques múltiplos
    respostaSelecionadaNestaRodada = true;

    const correta = perguntasQuiz[perguntaAtual].correta;
    const todosBotoes = caixaAlternativas.querySelectorAll(".btn-alternativa");

    if (indexSelecionado === correta) {
        botaoClicado.style.backgroundColor = "var(--success-light)";
        botaoClicado.style.borderColor = "var(--success)";
        pontuacaoQuiz++;
    } else {
        botaoClicado.style.backgroundColor = "var(--error-light)";
        botaoClicado.style.borderColor = "var(--error)";
        // Destaca a correta para o aluno aprender
        todosBotoes[correta].style.backgroundColor = "var(--success-light)";
        todosBotoes[correta].style.borderColor = "var(--success)";
    }

    // Desabilita os outros botões
    todosBotoes.forEach(btn => btn.disabled = true);

    // Mostra feedback de navegação
    dicaNavegacao.classList.remove("hidden");
}

// Avança para a próxima pergunta ou encerra o quiz
function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntasQuiz.length) {
        carregarPergunta();
    } else {
        // Mostra tela de resultados
        quizFluxo.classList.add("hidden");
        quizResultado.classList.remove("hidden");
        pontosFinais.textContent = pontuacaoQuiz;
    }
}

// Libera a seção do jogo do trator
function liberarJogo() {
    const sectionJogo = document.getElementById("trator-game");
    sectionJogo.style.display = "block";
    sectionJogo.scrollIntoView({ behavior: 'smooth' });
    inicializarJogo();
}


/* ==========================================================================
   2. MOTOR DO MINI GAME DO TRATOR (CANVAS)
   ========================================================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("game-score");
const btnReset = document.getElementById("btn-reset-game");

let gameInterval;
let gameActive = false;
let score = 0;

// Configurações do Jogador (Trator)
const trator = {
    x: 175,
    y: 420,
    width: 50,
    height: 60,
    speed: 8
};

// Controles por teclado
const teclas = {
    ArrowLeft: false,
    ArrowRight: false,
    a: false,
    d: false
};

// Configurações dos Obstáculos (Madeiras/Resíduos)
let obstaculos = [];
let spawnTimer = 0;
let spawnRate = 60; // Frequência com que surgem novos obstáculos
let gameSpeed = 4;   // Velocidade de descida

// Escutadores do Teclado para Movimentação
window.addEventListener("keydown", (e) => {
    if (e.key in teclas) teclas[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key in teclas) teclas[e.key] = false;
});

// Inicializa as variáveis do jogo
function inicializarJogo() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    gameSpeed = 4;
    spawnRate = 60;
    obstaculos = [];
    trator.x = (canvas.width / 2) - (trator.width / 2);
    scoreDisplay.textContent = score;
    btnReset.classList.add("hidden");
    
    // Roda o loop do jogo a 60 frames por segundo
    gameInterval = setInterval(updateGame, 1000 / 60);
}

// Desenha o Trator (Estilizado geometricamente em formato de Trator de fazenda)
function desenharTrator() {
    // Corpo Principal (Verde Agrinho)
    ctx.fillStyle = "#1b5e20";
    ctx.fillRect(trator.x + 5, trator.y + 15, 40, 35);
    
    // Cabine do Motorista
    ctx.fillStyle = "#a5d6a7";
    ctx.fillRect(trator.x + 10, trator.y, 30, 20);
    
    // Rodas Grandes Traseiras (Pretas)
    ctx.fillStyle = "#212529";
    ctx.fillRect(trator.x, trator.y + 30, 8, 25);
    ctx.fillRect(trator.x + 42, trator.y + 30, 8, 25);

    // Rodas Dianteiras Pequenas
    ctx.fillRect(trator.x + 3, trator.y + 5, 6, 12);
    ctx.fillRect(trator.x + 41, trator.y + 5, 6, 12);
