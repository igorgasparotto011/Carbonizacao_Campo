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

// --- GESTÃO DE INTERFACES E NAVEGAÇÃO ---
let currentQuestionIndex = 0;

const menuSection = document.getElementById('menu-section');
const infoSection = document.getElementById('info-section');
const quizSection = document.getElementById('quiz-section');
const gameSection = document.getElementById('game-section');

const startQuizBtn = document.getElementById('start-quiz-btn');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');

// Gatilhos do Menu Hambúrguer Lateral
const hamburgerMenu = document.getElementById('hamburger-menu');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const sidebarMoneyEl = document.getElementById('sidebar-money');
const gameMoneyEl = document.getElementById('game-money');
const currentVehicleTxt = document.getElementById('current-vehicle-txt');
const cargoStatsTxt = document.getElementById('cargo-stats-txt');

const switchVehBtn = document.getElementById('switch-veh-btn');
const sidebarStartBtn = document.getElementById('sidebar-start-btn');

// Expansões de Terrenos
const buyLand3Btn = document.getElementById('buy-land-3');
const buyLand4Btn = document.getElementById('buy-land-4');

hamburgerMenu.addEventListener('click', () => sidebar.classList.remove('hidden'));
closeSidebar.addEventListener('click', () => sidebar.classList.add('hidden'));
sidebarStartBtn.addEventListener('click', () => { sidebar.classList.add('hidden'); initFarmSimulator(); });

startQuizBtn.addEventListener('click', () => {
    menuSection.classList.add('hidden');
    infoSection.classList.remove('hidden');
    quizSection.classList.remove('hidden');
    startQuiz();
});

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
                hamburgerMenu.classList.remove('hidden'); 
                initFarmSimulator();
            }
        }, 500);
    } else {
        selectedButton.classList.add('wrong');
        selectedButton.disabled = true;
    }
}

// --- NOVO SISTEMA DO SIMULADOR DA FAZENDA ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let farmWallet = 0;
let activeVehicleIndex = 0; 
let farmLoopInterval = null;
let activeKeys = {};

// Entidades de Jogo
let vehiclesList = [];
let landSectors = [];
let storageSilo = { x: 620, y: 30, w: 110, h: 110 };

function initFarmSimulator() {
    farmWallet = 0;
    activeVehicleIndex = 0;
    activeKeys = {};
    updateUserInterface();

    // Criação da Frota de Veículos (W, A, S, D para controle universal)
    vehiclesList = [
        { id: 0, nome: "Colheitadeira Vermelha (Soja)", tipo: "harvester_soja", x: 120, y: 380, w: 42, h: 50, speed: 2.8, color: "#ef4444", cargoType: null, cargoAmount: 0, cargoMax: 100 },
        { id: 1, nome: "Colheitadeira Amarela (Milho)", tipo: "harvester_milho", x: 240, y: 380, w: 42, h: 50, speed: 2.8, color: "#fbbf24", cargoType: null, cargoAmount: 0, cargoMax: 100 },
        { id: 2, nome: "Caminhão Azul de Caçamba", tipo: "truck", x: 380, y: 380, w: 38, h: 60, speed: 3.8, color: "#3b82f6", cargoType: null, cargoAmount: 0, cargoMax: 300 }
    ];

    // Criação dos Setores de Produção da Fazenda
    landSectors = [
        // Terrenos Iniciais Livres (Índices 0 e 1)
        { id: 1, x: 30, y: 30, w: 140, h: 180, cropType: "milho", label: "Talhão Milho A", harvested: false, regrowthTime: 0, locked: false },
        { id: 2, x: 200, y: 30, w: 140, h: 180, cropType: "soja", label: "Talhão Soja A", harvested: false, regrowthTime: 0, locked: false },
        
        // Terrenos Travados para Compra pelo Menu Hambúrguer (Índices 2 e 3)
        { id: 3, x: 30, y: 240, w: 140, h: 120, cropType: "milho", label: "Expansão Norte", harvested: false, regrowthTime: 0, locked: true, cost: 30 },
        { id: 4, x: 200, y: 240, w: 140, h: 120, cropType: "soja", label: "Expansão Sul", harvested: false, regrowthTime: 0, locked: true, cost: 50 }
    ];

    window.removeEventListener('keydown', registerKeyDown);
    window.removeEventListener('keyup', registerKeyUp);
    window.addEventListener('keydown', registerKeyDown);
    window.addEventListener('keyup', registerKeyUp);

    if (farmLoopInterval) clearInterval(farmLoopInterval);
    farmLoopInterval = setInterval(renderFarmStep, 1000 / 60); // 60 FPS
}

function registerKeyDown(e) {
    activeKeys[e.key.toLowerCase()] = true;

    // Gatilhos Rápidos de Botão Único
    if (e.key.toLowerCase() === 'g') transboardCargo();
    if (e.key.toLowerCase() === 'f') sellCargoAtSilo();
}

function registerKeyUp(e) {
    activeKeys[e.key.toLowerCase()] = false;
}

// Troca de veículos
switchVehBtn.addEventListener('click', () => {
    activeVehicleIndex = (activeVehicleIndex + 1) % vehiclesList.length;
    updateUserInterface();
});

// Compras de Expansão via Menu Lateral
buyLand3Btn.addEventListener('click', () => purchaseSector(3, buyLand3Btn));
buyLand4Btn.addEventListener('click', () => purchaseSector(4, buyLand4Btn));

function purchaseSector(id, buttonEl) {
    let sector = landSectors.find(s => s.id === id);
    if (!sector) return;
    
    if (!sector.locked) {
        alert("Esta área já foi adquirida!");
        return;
    }

    if (farmWallet >= sector.cost) {
        farmWallet -= sector.cost;
        sector.locked = false;
        buttonEl.innerHTML = `${sector.label} <br><strong>[ADQUIRIDO]</strong>`;
        buttonEl.style.background = "#10b981";
        updateUserInterface();
        alert(`Sucesso! O ${sector.label} foi limpo e está pronto para produção.`);
    } else {
        alert(`Saldo insuficiente! Você precisa de R$ ${sector.cost} para este lote.`);
    }
}

function updateUserInterface() {
    gameMoneyEl.innerText = farmWallet;
    sidebarMoneyEl.innerText = farmWallet;

    let current = vehiclesList[activeVehicleIndex];
    currentVehicleTxt.innerText = current.nome;
    
    let typeStr = current.cargoType ? current.cargoType.toUpperCase() : "Vazio";
    cargoStatsTxt.innerText = `Carga: ${typeStr} (${current.cargoAmount}/${current.cargoMax})`;
}

// Ação [G] - Descarregar da Colheitadeira para o Caminhão
function transboardCargo() {
    let current = vehiclesList[activeVehicleIndex];
    if (current.tipo !== "harvester_soja" && current.tipo !== "harvester_milho") {
        alert("Apenas as colheitadeiras realizam transbordo de grãos!");
        return;
    }
    if (current.cargoAmount === 0) {
        alert("Esta colheitadeira está sem carga armazenada.");
        return;
    }

    let truck = vehiclesList.find(v => v.tipo === "truck");
    let distance = Math.hypot((current.x + current.w/2) - (truck.x + truck.w/2), (current.y + current.h/2) - (truck.y + truck.h/2));

    if (distance <= 90) {
        if (truck.cargoType === null || truck.cargoType === current.cargoType) {
            let availableSpace = truck.cargoMax - truck.cargoAmount;
            let amountToMove = Math.min(current.cargoAmount, availableSpace);

            if (amountToMove > 0) {
                truck.cargoType = current.cargoType;
                truck.cargoAmount += amountToMove;
                current.cargoAmount -= amountToMove;
                if (current.cargoAmount === 0) current.cargoType = null;
                updateUserInterface();
                alert(`Transbordo Concluído: +${amountToMove} unidades enviadas ao Caminhão.`);
            } else {
                alert("A caçamba do caminhão azul está cheia!");
            }
        } else {
            alert("Operação negada! Não misture Milho e Soja na mesma caçamba.");
        }
    } else {
        alert("Aproxime-se do Caminhão Azul para efetuar o transbordo!");
    }
}

// Ação [F] - Descarregar do Caminhão para o Galpão/Silo por dinheiro
function sellCargoAtSilo() {
    let current = vehiclesList[activeVehicleIndex];
    if (current.tipo !== "truck") {
        alert("Apenas o Caminhão Azul de Caçamba faz entregas no Silo Comercial!");
        return;
    }
    if (current.cargoAmount === 0) {
        alert("O caminhão não possui carga para venda.");
        return;
    }

    // Validação de intersecção com a área do Silo
    if (current.x + current.w > storageSilo.x && current.x < storageSilo.x + storageSilo.w &&
        current.y + current.h > storageSilo.y && current.y < storageSilo.y + storageSilo.h) {
        
        // Cada ciclo de descarga rende R$ 10 de lucro líquido direto para a carteira
        let payoutCycles = Math.ceil(current.cargoAmount / 50); 
        let totalProfit = payoutCycles * 10;

        farmWallet += totalProfit;
        current.cargoAmount = 0;
        current.cargoType = null;
        updateUserInterface();
        alert(`Venda efetuada no Galpão! Carga líquida convertida em R$ ${totalProfit}.`);
    } else {
        alert("Estacione o Caminhão Azul dentro do Galpão Cinza no canto superior direito.");
    }
}

// --- LAÇO DE RENDERIZAÇÃO REAL-TIME ---
function renderFarmStep() {
    let now = Date.now();

    // 1. LIMPEZA E DESENHO DO TERRENO BASE
    ctx.fillStyle = "#22c55e"; // Cor da grama nativa
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estradas e pátios de manobra
    ctx.fillStyle = "#78350f"; // Terra escura para manobras
    ctx.fillRect(400, 0, 150, canvas.height);
    ctx.fillRect(0, 400, canvas.width, 80);

    // Desenho do Silo / Galpão Comercial
    ctx.fillStyle = "#64748b";
    ctx.fillRect(storageSilo.x, storageSilo.y, storageSilo.w, storageSilo.h);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(storageSilo.x + 20, storageSilo.y + storageSilo.h - 15, storageSilo.w - 40, 15); // Baia de recebimento
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("GALPÃO (F)", storageSilo.x + 22, storageSilo.y + 45);

    // 2. COMPORTAMENTO E RENDERIZAÇÃO DOS TERRENOS
    landSectors.forEach(sector => {
        if (sector.locked) {
            // Área Bloqueada por Grade
            ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
            ctx.fillRect(sector.x, sector.y, sector.w, sector.h);
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 2;
            ctx.strokeRect(sector.x, sector.y, sector.w, sector.h);
            ctx.fillStyle = "#ffffff";
            ctx.font = "11px sans-serif";
            ctx.fillText("🔒 BLOQUEADO", sector.x + 25, sector.y + sector.h / 2);
            ctx.fillText(`Custo: R$ ${sector.cost}`, sector.x + 35, sector.y + sector.h / 2 + 15);
            return;
        }

        // Se o terreno estiver liberado, processa ciclo de crescimento
        if (sector.harvested && now >= sector.regrowthTime) {
            sector.harvested = false; // Cresceu de novo!
        }

        if (!sector.harvested) {
            // Renderiza Plantação Pronta para Colheita
            ctx.fillStyle = (sector.cropType === "milho") ? "#f59e0b" : "#854d0e";
            ctx.fillRect(sector.x, sector.y, sector.w, sector.h);
            
            // Detalhes estéticos das fileiras plantadas
            ctx.fillStyle = (sector.cropType === "milho") ? "#fef08a" : "#a16207";
            for (let i = 10; i < sector.w; i += 25) {
                ctx.fillRect(sector.x + i, sector.y + 5, 4, sector.h - 10);
            }
        } else {
            // Renderiza Terra Arada aguardando o tempo de 2 minutos
            ctx.fillStyle = "#451a03";
            ctx.fillRect(sector.x, sector.y, sector.w, sector.h);
            
            let secondsLeft = Math.max(0, Math.round((sector.regrowthTime - now) / 1000));
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 12px monospace";
            ctx.fillText(`Crescendo: ${secondsLeft}s`, sector.x + 15, sector.y + sector.h / 2);
        }
    });

    // 3. FÍSICA E ATUALIZAÇÃO DO VEÍCULO SELECIONADO
    let currentVeh = vehiclesList[activeVehicleIndex];
    
    if (activeKeys['w']) currentVeh.y -= currentVeh.speed;
    if (activeKeys['s']) currentVeh.y += currentVeh.speed;
    if (activeKeys['a']) currentVeh.x -= currentVeh.speed;
    if (activeKeys['d']) currentVeh.x += currentVeh.speed;

    // Confinamento de colisão com as bordas do canvas
    currentVeh.x = Math.max(0, Math.min(canvas.width - currentVeh.w, currentVeh.x));
    currentVeh.y = Math.max(0, Math.min(canvas.height - currentVeh.h, currentVeh.y));

    // 4. VERIFICAÇÃO DE SOBREPOSIÇÃO PARA COLHEITA AUTOMÁTICA
    landSectors.forEach(sector => {
        if (!sector.locked && !sector.harvested) {
            // Detecção de colisão AABB simples
            if (currentVeh.x < sector.x + sector.w && currentVeh.x + currentVeh.w > sector.x &&
                currentVeh.y < sector.y + sector.h && currentVeh.y + currentVeh.h > sector.y) {
                
                // Validação de funções solicitadas por tipo
                if (currentVeh.tipo === "harvester_milho" && sector.cropType === "milho" && currentVeh.cargoAmount < currentVeh.cargoMax) {
                    sector.harvested = true;
                    sector.regrowthTime = now + 120000; // 120000ms = Exatamente 2 Minutos
                    currentVeh.cargoType = "milho";
                    currentVeh.cargoAmount = Math.min(currentVeh.cargoMax, currentVeh.cargoAmount + 25);
                    updateUserInterface();
                }
                else if (currentVeh.tipo === "harvester_soja" && sector.cropType === "soja" && currentVeh.cargoAmount < currentVeh.cargoMax) {
                    sector.harvested = true;
                    sector.regrowthTime = now + 120000; // Exatamente 2 Minutos
                    currentVeh.cargoType = "soja";
                    currentVeh.cargoAmount = Math.min(currentVeh.cargoMax, currentVeh.cargoAmount + 25);
                    updateUserInterface();
                }
            }
        }
    });

    // 5. RENDERIZAÇÃO DOS GRÁFICOS DOS VEÍCULOS
    vehiclesList.forEach(v => {
        ctx.fillStyle = v.color;
        ctx.fillRect(v.x, v.y, v.w, v.h);

        // Cabines dos operadores
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(v.x + 5, v.y + 8, v.w - 10, 12);

        // Rodas laterais pretas
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(v.x - 3, v.y + 10, 4, 12);
        ctx.fillRect(v.x + v.w, v.y + 10, 4, 12);
        ctx.fillRect(v.x - 3, v.y + v.h - 18, 4, 12);
        ctx.fillRect(v.x + v.w, v.y + v.h - 18, 4, 12);

        // Caixa de Carga Interna (Visual da Caçamba Enchendo)
        if (v.cargoAmount > 0) {
            let fillPercentage = v.cargoAmount / v.cargoMax;
            ctx.fillStyle = (v.cargoType === "milho") ? "#f59e0b" : "#b45309";
            ctx.fillRect(v.x + 6, v.y + v.h - 16, (v.w - 12) * fillPercentage, 8);
        }

        // Indicador de Controle Ativo ("VOCÊ")
        if (v.id === vehiclesList[activeVehicleIndex].id) {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.strokeRect(v.x - 5, v.y - 5, v.w + 10, v.h + 10);
            
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 10px sans-serif";
            ctx.fillText("ATIVO", v.x + 3, v.y - 8);
        }
    });
}
