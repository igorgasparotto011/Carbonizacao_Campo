// --- DADOS DO QUIZ ---
const quizData = [
    {
        question: "O que é o processo de carbonização da biomassa no campo?",
        answers: [
            { text: "A queima completa da madeira transformando-a em cinzas puras.", correct: false },
            { text: "A decomposição térmica da matéria orgânica na ausência ou escassez de oxigênio.", correct: true },
            { text: "O processo de irrigação excessiva que apodrece as raízes.", correct: false },
            { text: "A pintura das árvores com tinta preta para proteção solar.", correct: false }
        ]
    },
    {
        question: "Qual o principal produto sólido derivado da carbonização da madeira?",
        answers: [
            { text: "Carvão vegetal", correct: true },
            { text: "Petróleo bruto", correct: false },
            { text: "Gás natural", correct: false },
            { text: "Fertilizante líquido", correct: false }
        ]
    },
    {
        question: "Como o sequestro de carbono ajuda o solo agrícola?",
        answers: [
            { text: "Tornando o solo totalmente impermeável à água.", correct: false },
            { text: "Aumentando a quantidade de pragas na plantação.", correct: false },
            { text: "Melhorando a fertilidade, estrutura e retenção de água do solo.", correct: true },
            { text: "Acelerando a erosão das camadas superficiais.", correct: false }
        ]
    },
    {
        question: "Qual gás de efeito estufa é liberado em grande quantidade se a carbonização for feita por queima descontrolada?",
        answers: [
            { text: "Oxigênio", correct: false },
            { text: "Dióxido de Carbono (CO2)", correct: true },
            { text: "Argônio", correct: false },
            { text: "Hélio", correct: false }
        ]
    },
    {
        question: "O que é o 'Biochar' ou biocarvão?",
        answers: [
            { text: "Um combustível fóssil altamente poluente extraído de minas.", correct: false },
            { text: "Carvão vegetal adicionado ao solo para melhorar suas propriedades.", correct: true },
            { text: "Um tipo de agrotóxico proibido por lei.", correct: false },
            { text: "Um plástico biodegradável usado em estufas.", correct: false }
        ]
    },
    {
        question: "Qual dessas práticas ajuda a reter carbono no campo de forma sustentável?",
        answers: [
            { text: "Plantio direto e rotação de culturas.", correct: true },
            { text: "Desmatamento e queimada total do terreno.", correct: false },
            { text: "Uso intensivo de tratores sem vegetação de cobertura.", correct: false },
            { text: "Monocultura repetida por décadas no mesmo local.", correct: false }
        ]
    },
    {
        question: "A queima de resíduos agrícolas a céu aberto sem controle é considerada uma prática:",
        answers: [
            { text: "Benéfica, pois limpa os nutrientes ruins do ar.", correct: false },
            { text: "Prejudicial, pois emite poluentes e destrói microrganismos benéficos.", correct: true },
            { text: "Obrigatória por leis internacionais de agricultura.", correct: false },
            { text: "Inofensiva para a atmosfera e para a saúde humana.", correct: false }
        ]
    },
    {
        question: "Qual o papel das plantas no ciclo do carbono no campo?",
        answers: [
            { text: "Elas absorvem CO2 da atmosfera através da fotossíntese.", correct: true },
            { text: "Elas criam carbono do nada através das raízes.", correct: false },
            { text: "Elas apenas destroem o carbono do solo.", correct: false },
            { text: "Elas transformam oxigênio em carvão mineral.", correct: false }
        ]
    },
    {
        question: "Forno de alvenaria mal projetado na produção de carvão gera qual problema?",
        answers: [
            { text: "Desperdício de energia e alta emissão de fumaça poluidora.", correct: true },
            { text: "Produção excessiva de diamantes.", correct: false },
            { text: "Resfriamento instantâneo do solo da fazenda.", correct: false },
            { text: "Transformação da madeira em ouro líquido.", correct: false }
        ]
    },
    {
        question: "A integração Lavoura-Pecuária-Floresta (ILPF) ajuda no balanço de carbono porque:",
        answers: [
            { text: "Elimina totalmente a necessidade de água na fazenda.", correct: false },
            { text: "As árvores plantadas compensam as emissões de gases do sistema.", correct: true },
            { text: "Impede o crescimento de árvores nativas.", correct: false },
            { text: "Faz com que os animais parem de respirar.", correct: false }
        ]
    }
];

// --- VARIÁVEIS DO QUIZ ---
let currentQuestionIndex = 0;

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const quizSection = document.getElementById('quiz-section');
const gameSection = document.getElementById('game-section');

// --- INICIALIZAR QUIZ ---
function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    optionsContainerEl.innerHTML = '';
    let currentQuestion = quizData[currentQuestionIndex];
    
    questionNumberEl.innerText = `Pergunta ${currentQuestionIndex + 1} de 10`;
    questionTextEl.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        optionsContainerEl.appendChild(button);
    });
}

function selectAnswer(selectedButton, isCorrect) {
    if (isCorrect) {
        selectedButton.classList.add('correct');
        // Pequeno atraso para o usuário ver que acertou e passar para a próxima
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion();
            } else {
                // Fim do quiz -> Libera o jogo
                quizSection.classList.add('hidden');
                gameSection.classList.remove('hidden');
                initGame();
            }
        }, 500);
    } else {
        selectedButton.classList.add('wrong');
        selectedButton.disabled = true; // Desabilita a resposta errada clicada
    }
}

// --- LOGICA DO JOGO DO TRATOR ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let trator, obstaculos, gameScore, gameInterval, isGameOver;

function initGame() {
    trator = {
        x: canvas.width / 2 - 20,
        y: canvas.height - 70,
        width: 40,
        height: 50,
        speedX: 0,
        speedY: 0
    };
    obstaculos = [];
    gameScore = 0;
    isGameOver = false;
    scoreEl.innerText = gameScore;
    restartBtn.classList.add('hidden');
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    if(gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 20);
}

function handleKeyDown(e) {
    if (isGameOver) return;
    const key = e.key.toLowerCase();
    
    if (key === 'd') {
        trator.speedY = -3; // Anda para "frente" (sobe na tela na nossa pista vertical)
    }
    if (key === 'w') {
        trator.speedX = 4;  // Vai para a direita
    }
    if (key === 'a') {
        trator.speedX = -4; // Vai para a esquerda
    }
}

function handleKeyUp(e) {
    const key = e.key.toLowerCase();
    if (key === 'd' || key === 'w' || key === 'a') {
        if (key === 'd') trator.speedY = 0;
        if (key === 'w' || key === 'a') trator.speedX = 0;
    }
}

function criarObstaculo() {
    // Cria obstáculos no topo e eles descem em direção ao trator
    if (Math.random() < 0.03) {
        let largura = 40 + Math.random() * 40;
        let posX = Math.random() * (canvas.width - largura);
        // Alterna entre tipo tronco (marrom) e fumaça de carbonização (cinza)
        let tipo = Math.random() > 0.5 ? '#795548' : '#757575'; 
        obstaculos.push({
            x: posX,
            y: -30,
            width: largura,
            height: 25,
            color: tipo
        });
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha a Pista/Estrada da fazenda de fundo
    ctx.fillStyle = '#7d5c32'; // Pista de terra
    ctx.fillRect(50, 0, canvas.width - 100, canvas.height);
    
    // Movimentação do Trator com limites de tela
    trator.x += trator.x + trator.speedX > 50 && trator.x + trator.speedX < canvas.width - 90 ? trator.speedX : 0;
    trator.y += trator.y + trator.speedY > 50 && trator.y + trator.speedY < canvas.height - 60 ? trator.speedY : 0;
    
    // Se o trator não estiver subindo acelerado, ele desce um pouco simulando a velocidade da pista
    if (trator.speedY === 0 && trator.y < canvas.height - 70) {
        trator.y += 1; 
    }

    // Desenha o Trator (Verde)
    ctx.fillStyle = '#1b5e20';
    ctx.fillRect(trator.x, trator.y, trator.width, trator.height);
    // Detalhe das rodas do trator
    ctx.fillStyle = '#000';
    ctx.fillRect(trator.x - 5, trator.y + 5, 5, 15);
    ctx.fillRect(trator.x + trator.width, trator.y + 5, 5, 15);
    ctx.fillRect(trator.x - 5, trator.y + 30, 5, 18);
    ctx.fillRect(trator.x + trator.width, trator.y + 30, 5, 18);

    // Gerenciar Obstáculos
    criarObstaculo();
    
    for (let i = 0; i < obstaculos.length; i++) {
        obstaculos[i].y += 3; // Velocidade com que os obstáculos descem
        
        // Desenha Obstáculo
        ctx.fillStyle = obstaculos[i].color;
        ctx.fillRect(obstaculos[i].x, obstaculos[i].y, obstaculos[i].width, obstaculos[i].height);
        
        // Verificação de Colisão
        if (
            trator.x < obstaculos[i].x + obstaculos[i].width &&
            trator.x + trator.width > obstaculos[i].x &&
            trator.y < obstaculos[i].y + obstaculos[i].height &&
            trator.y + trator.height > obstaculos[i].y
        ) {
            gameOver();
        }
        
        // Remove obstáculos que saíram da tela e pontua
        if (obstaculos[i].y > canvas.height) {
            obstaculos.splice(i, 1);
            i--;
            gameScore++;
            scoreEl.innerText = gameScore;
        }
    }
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Fim de Jogo na Fazenda!", canvas.width / 2, canvas.height / 2 - 10);
    
    restartBtn.classList.remove('hidden');
}

restartBtn.addEventListener('click', initGame);

// Inicia o Quiz ao carregar a página
startQuiz();
