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

// --- VARIÁVEIS DE ELEMENTOS ---
let currentQuestionIndex = 0;

const menuSection = document.getElementById('menu-section');
const infoSection = document.getElementById('info-section');
const quizSection = document.getElementById('quiz-section');
const gameSection = document.getElementById('game-section');

const startQuizBtn = document.getElementById('start-quiz-btn');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');

// Ouvinte do Menu Inicial
startQuizBtn.addEventListener('click', () => {
    menuSection.classList.add('hidden');
    infoSection.classList.remove('hidden');
    quizSection.classList.remove('hidden');
    startQuiz();
});

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
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion();
            } else {
                quizSection.classList.add('hidden');
                infoSection.classList.add('hidden');
                gameSection.classList.remove('hidden');
                initGame();
            }
        }, 500);
    } else {
        selectedButton.classList.add('wrong');
        selectedButton.disabled = true;
    }
}

// --- LOGICA DO JOGO DO TRATOR APERFEIÇOADO ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let trator, obstaculos, gameScore, gameInterval, isGameOver;

function initGame() {
    trator = {
        x: canvas.width / 2 - 20,
        y: canvas.height - 80,
        width: 40,
        height: 55,
        speedX: 0,
        speedY: 0
    };
    obstaculos = [];
    gameScore = 0;
    isGameOver = false;
    scoreEl.innerText = gameScore;
    restartBtn.classList.add('hidden');
    
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    if(gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 20);
}

function handleKeyDown(e) {
    if (isGameOver) return;
    const key = e.key.toLowerCase();
    if (key === 'd') trator.speedY = -3.5; 
    if (key === 'w') trator.speedX = 4.5;  
    if (key === 'a') trator.speedX = -4.5; 
}

function handleKeyUp(e) {
    const key = e.key.toLowerCase();
    if (key === 'd') trator.speedY = 0;
    if (key === 'w' || key === 'a') trator.speedX = 0;
}

function criarObstaculo() {
    // Frequência de geração aumenta levemente com os pontos obtidos
    let chance = 0.03 + (gameScore * 0.001);
    if (Math.random() < Math.min(chance, 0.08)) {
        let largura = 35 + Math.random() * 35;
        let posX = 60 + Math.random() * (canvas.width - 120 - largura);
        let tipo = Math.random() > 0.4 ? 'tronco' : 'fumaca'; 
        
        obstaculos.push({
            x: posX,
            y: -40,
            width: largura,
            height: tipo === 'tronco' ? 25 : 35,
            tipo: tipo,
            faseFumaca: 0 // Usado para efeitos visuais dinâmicos da fumaça
        });
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. DESENHO DO CENÁRIO (Pista de terra estilizada com vegetação lateral)
    ctx.fillStyle = '#6d4c41'; // Terra fértil
    ctx.fillRect(50, 0, canvas.width - 100, canvas.height);
    
    // Linhas de demarcação do limite da plantação
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(55, 0); ctx.lineTo(55, canvas.height);
    ctx.moveTo(canvas.width - 55, 0); ctx.lineTo(canvas.width - 55, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Detalhes da grama lateral externa
    ctx.fillStyle = '#33691e';
    ctx.fillRect(0, 0, 50, canvas.height);
    ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);
    
    // 2. MOVIMENTAÇÃO DO TRATOR (Com travas de borda seguras)
    trator.x += (trator.x + trator.speedX > 55 && trator.x + trator.speedX < canvas.width - 55 - trator.width) ? trator.speedX : 0;
    trator.y += (trator.y + trator.speedY > 20 && trator.y + trator.speedY < canvas.height - trator.height - 10) ? trator.speedY : 0;
    
    if (trator.speedY === 0 && trator.y < canvas.height - 80) {
        trator.y += 1.2; 
    }

    // 3. DESENHO DO TRATOR MELHORADO TRIDIMENSIONAL
    // Rodas traseiras grandes pretas
    ctx.fillStyle = '#111';
    ctx.fillRect(trator.x - 6, trator.y + 25, 7, 22);
    ctx.fillRect(trator.x + trator.width - 1, trator.y + 25, 7, 22);
    // Rodas dianteiras pequenas
    ctx.fillRect(trator.x - 4, trator.y + 4, 5, 12);
    ctx.fillRect(trator.x + trator.width - 1, trator.y + 4, 5, 12);
    
    // Corpo principal (Verde Clássico Agro)
    ctx.fillStyle = '#2e7d32';
    ctx.fillRect(trator.x, trator.y + 10, trator.width, trator.height - 15);
    // Motor frontal estreito
    ctx.fillRect(trator.x + 6, trator.y, trator.width - 12, 15);
    
    // Cabine do Piloto (Amarelo/Vidro)
    ctx.fillStyle = '#fff59d';
    ctx.fillRect(trator.x + 5, trator.y + 18, trator.width - 10, 16);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(trator.x + 5, trator.y + 18, trator.width - 10, 16);
    
    // Escapamento de fumaça ecológica
    ctx.fillStyle = '#cfd8dc';
    ctx.fillRect(trator.x + 8, trator.y + 4, 3, 6);

    // 4. GERENCIAR OBSTÁCULOS
    criarObstaculo();
    
    for (let i = 0; i < obstaculos.length; i++) {
        let obs = obstaculos[i];
        obs.y += 3.5; // Velocidade de descida
        
        // Desenho customizado por tipo de obstáculo
        if (obs.tipo === 'tronco') {
            // Corpo do tronco (Marrom escuro)
            ctx.fillStyle = '#4e342e';
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            // Textura das extremidades (Anéis de madeira)
            ctx.fillStyle = '#d7ccc8';
            ctx.fillRect(obs.x, obs.y, 6, obs.height);
            ctx.fillRect(obs.x + obs.width - 6, obs.y, 6, obs.height);
        } else {
            // Nuvem de fumaça de carbonização poluente (Círculos cinzas esfumaçados)
            obs.faseFumaca += 0.1;
            ctx.fillStyle = 'rgba(100, 110, 120, 0.75)';
            ctx.beginPath();
            ctx.arc(obs.x + obs.width/2, obs.y + obs.height/2, obs.width/2, 0, Math.PI * 2);
            ctx.arc(obs.x + obs.width/4, obs.y + obs.height/3, obs.width/3, 0, Math.PI * 2);
            ctx.arc(obs.x + (obs.width*3)/4, obs.y + obs.height/3, obs.width/3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Detecção de Colisão Precisa
        if (
            trator.x < obs.x + obs.width &&
            trator.x + trator.width > obs.x &&
            trator.y < obs.y + obs.height &&
            trator.y + trator.height > obs.y
        ) {
            gameOver();
        }
        
        // Passou sem bater: limpa e adiciona pontuação
        if (obs.y > canvas.height) {
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
    
    // Cortina escura estilizada de Game Over
    ctx.fillStyle = 'rgba(26, 42, 24, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Fim de Jogo no Campo!", canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.fillStyle = '#a5d6a7';
    ctx.font = '18px sans-serif';
    ctx.fillText(`Você ajudou a monitorar ${gameScore} setores da fazenda!`, canvas.width / 2, canvas.height / 2 + 15);
    
    restartBtn.classList.remove('hidden');
}

restartBtn.addEventListener('click', initGame);
