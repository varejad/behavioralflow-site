let agents = []//pyodide.globals.get("agents");  // JS acessa variável Python, preenchido via Pyodide

function updateAgentsFromPyodide() {
  if (typeof pyodide !== "undefined") {
    try {
      // Pega a variável Python "agents" e transforma em array JavaScript
      let pyAgents = pyodide.globals.get("agents").toJs();
      agents = Array.from(pyAgents);
    } catch (e) {
      console.error("Erro ao acessar agents do Pyodide:", e);
    }
  }
}

function setup() {
  console.log("setup iniciado");
  createCanvas(600, 400);

  // Atualiza os agentes logo no início
  updateAgentsFromPyodide();

  setInterval(updateAgentsFromPyodide, 250);
}

function draw() {
  background(230);
  
/*
  // Atualiza os agentes direto da memória Python
  try {
    agents = pyodide.globals.get("agents").toJs();
  } catch (e) {
    console.log("Aguardando Pyodide...");
    return;
  }
*/

   // Se não tiver agentes ainda, espere
  if (!agents || agents.length === 0) {
    console.log("espera")
    return;
  }

  for (let agent of agents) {
    console.log("chamar drawAgent")
    drawAgent(agent);
  }
}

function drawAgent(agent) {
  console.log(agent.x)
  fill(agent.color || "blue");
  noStroke();
  ellipse(agent.x, agent.y, 20, 20);
}

