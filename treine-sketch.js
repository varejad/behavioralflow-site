let agentStates = []; // preenchido via Pyodide
let agents = pyodide.globals.get("agents");  // JS acessa variável Python

function setup() {
  createCanvas(600, 400);

  // Atualiza os agentes logo no início
  updateAgentsFromPyodide();

  setInterval(updateAgentsFromPyodide, 250);
}

function draw() {
  background(230);

  for (let agent of agents) {
    drawAgent(agent);
  }
}

function drawAgent(agent) {
  fill(agent.color || "blue");
  noStroke();
  ellipse(agent.x, agent.y, 20, 20);
}

function updateAgentsFromPyodide() {
  if (typeof pyodide !== "undefined") {
    try {
      // Pega a variável Python "agents" e transforma em array JavaScript
      let pyAgents = pyodide.globals.get("agents").toJs();
      agentStates = Array.from(pyAgents);
    } catch (e) {
      console.error("Erro ao acessar agents do Pyodide:", e);
    }
  }
}