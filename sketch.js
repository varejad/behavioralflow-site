let agents = [];
let frameCounter = 0;
const FETCH_INTERVAL_FRAMES = 30; // Atualiza a cada 30 frames (~2 vezes por segundo)

function fetchAgentsFromAPI() {
  return fetch('https://behavioralflow-api.onrender.com/estate')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

function mockFetchAgents() {
  return new Promise((resolve) => {
    const data = [];

    for (let i = 0; i < 5; i++) {
      data.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
      });
    }

    // Simulate network delay
    setTimeout(() => resolve(data), 200);
  });
}

/*
function gerarDadosMock() {
  const dados = [];

  // Simula 5 agentes com posições aleatórias
  for (let i = 0; i < 5; i++) {
    dados.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
    });
  }

  return dados;
}
*/

function setup() {
  createCanvas(600, 400);
  
  /*// Carrega dados mock pela primeira vez
  agents = gerarDadosMock(); // essa linha é parte de uma versão mais antiga

  // Atualiza os dados mock a cada 2 segundos
  setInterval(() => {
    mockFetchAgents().then((data) => {
      agents = data;
    });
  }, 2000);*/
}

function draw() {
  background(240);

  // Atualizar dados da API a cada N frames
  if (frameCounter % FETCH_INTERVAL_FRAMES === 0) {
    fetchAgentsFromAPI()
      .then(data => {
        agents = data;
      })
      .catch(error => {
        console.error('Failed to fetch agents:', error);
      });
  }

  // Desenhar os agentes
  for (let agent of agents) {
    ellipse(agent.x, agent.y, 20, 20); // Exemplo simples de visualização
  }

  frameCounter++;
  /*for (let agent of agents) {
    fill(100, 150, 255);
    ellipse(agent.x, agent.y, 30, 30);

    fill(0);
    textAlign(CENTER, CENTER);
    text(agent.id, agent.x, agent.y);
  }*/
}

/*
class Agent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }

  move() {
    // Movimento aleatório simples
    this.x += random(-1, 1);
    this.y += random(-1, 1);

    // Limitar dentro da tela
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    fill(50, 100, 200);
    ellipse(this.x, this.y, this.size);
  }
}
*/