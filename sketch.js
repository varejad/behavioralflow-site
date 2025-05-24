let agents = [];

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


function setup() {
  createCanvas(600, 400);
  
  // Carrega dados mock pela primeira vez
  agents = gerarDadosMock();

  // Atualiza os dados mock a cada 2 segundos
  setInterval(() => {
    agents = gerarDadosMock();
  }, 2000);
}

function draw() {
  background(240);

  for (let agent of agents) {
    fill(100, 150, 255);
    ellipse(agent.x, agent.y, 30, 30);

    fill(0);
    textAlign(CENTER, CENTER);
    text(agent.id, agent.x, agent.y);
  }
}

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
