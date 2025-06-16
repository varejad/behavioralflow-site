let agents = []

function updateAgentsFromPyodide() {
  if (typeof pyodide !== "undefined") {
    try {
      // Pega a variável Python "agents" e transforma em array JavaScript (virou um array onde cada item é um array de chaves e valores)
      let pyAgents = pyodide.globals.get("agents").toJs({dict_converter: Object});

      // transformar o array de arrays recebido acima em um objeto JS
      agents = pyAgents.map(arrayOfPairs => {
      // Verificação opcional, mas boa prática, caso algum item não seja um array de pares
      if (Array.isArray(arrayOfPairs)) {
        return Object.fromEntries(arrayOfPairs);
      }
      return arrayOfPairs; // Retorna como está se não for um array (segurança)
      });
    } catch (e) {
      console.error("Erro ao acessar agents do Pyodide:", e);
    }
  }
}

function setup() {
  createCanvas(600, 400);

  // Atualiza os agentes logo no início
  updateAgentsFromPyodide();

  setInterval(updateAgentsFromPyodide, 250);
}

function draw() {
  background(230);

   // Se não tiver agentes ainda, espere
  if (!agents || agents.length === 0) {
    console.log("espera")
    return;
  }

  for (let agent of agents) {
    drawAgent(agent);
  }
}

function drawAgent(agent) {
  fill(agent.color || "blue");
  noStroke();
  ellipse(agent.x, agent.y, 20, 20);
}

