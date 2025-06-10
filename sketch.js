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

function setup() {
  createCanvas(600, 400);
  
}

function draw() {
  background(240);

  // teste com quadrado no meio da tela
  let size = 100;
  let x = width / 2 - size / 2;
  let y = height / 2 - size / 2;

  noFill(); // sem cor
  stroke(0);
  strokeWeight(2); // espessura da borda (opcional)
  rect(x, y, size, size);
  // fim do teste

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

  // Corpo do agente (círculo)
  fill(agent.color || "#cccccc"); // fallback para cinza se não vier nada
  ellipse(agent.positionX, agent.positionY, 20, 20);

  fill(agent.circle_color); // Define a cor do agente
  ellipse(agent.positionX, agent.positionY, 10, 10);
 
  pop(); // Restaura o estado do canvas (volta à posição original, sem rotação)
}