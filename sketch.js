let agents = [];

function setup() {
  createCanvas(600, 400);
  
  // Criar 10 agentes com posições aleatórias
  for (let i = 0; i < 10; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
}

function draw() {
  background(240);

  for (let agent of agents) {
    agent.move();
    agent.display();
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
