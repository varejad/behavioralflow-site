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

function setup() {
  createCanvas(600, 400);
  
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
    ellipse(agent.positionX, agent.positionY, 20, 20); // Exemplo simples de visualização
  }

  frameCounter++;
}
