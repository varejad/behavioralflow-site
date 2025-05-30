let agents = [];
let frameCounter = 0;
const FETCH_INTERVAL_FRAMES = 15; // Atualiza a cada 15 frames (~4 vezes por segundo)

function fetchAgentsFromAPI() {
  return fetch('https://behavioralflow-api.onrender.com/estate')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}
/*
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
*/

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
    drawAgent(agent)
    //ellipse(agent.positionX, agent.positionY, 20, 20); // Exemplo simples de visualização
  }

  frameCounter++;
}

function drawAgent(agent) {
  push(); // Salva o estado atual do canvas (posição, rotação, etc.)

  translate(agent.positionX, agent.positionY); // Move o sistema de coordenadas para a posição (x, y) do agente

  rotate(agent.angle); // Rotaciona o canvas em torno do ponto (x, y)

  // Corpo do agente (círculo)
  fill(agent.color || "#cccccc"); // fallback para cinza se não vier nada
  ellipse(0, 0, 20, 20);

  fill(agent.triangle_color); // Define a cor do agente
  noStroke();         // Remove a borda do desenho
  // Desenha um triângulo apontando para cima (posição padrão antes da rotação)
  //    Os três pontos do triângulo são:
  //    (-10, 10) → canto inferior esquerdo
  //    (10, 10)  → canto inferior direito
  //    (0, -15)  → ponta superior (aponta para a direção do ângulo após rotação)
  triangle(-7, -7, -7, 7, 13, 0);

  pop(); // Restaura o estado do canvas (volta à posição original, sem rotação)
}

