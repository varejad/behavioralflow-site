let agents = []

async function setInitialConditions() {
pyodide.globals.set("WIDTH", width);
pyodide.globals.set("HEIGHT", height);
console.log("width = ", width, "\nheigth = ", height)
}

async function updateAgentsFromPyodide() {
  //const start = performance.now();

  if (typeof pyodide !== "undefined") {
    try {
      await pyodide.runPythonAsync("simular_em_loop()")

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
  } else {console.log("tessstee")}
  //const end = performance.now();
  //console.log(`Execução do passo: ${Math.round(end - start)} ms`);
  setTimeout(updateAgentsFromPyodide, 20);
}

function setup() {
  width = Math.min(windowWidth, 600);
  height = Math.min(windowHeight/2, 800);
  let canvas = createCanvas(width, height);
  canvas.parent("simContainer");

  // Atualiza os agentes logo no início
  updateAgentsFromPyodide();

  //setInitialConditions();
}


function draw() {
  background(230);
   // Se não tiver agentes ainda, espere
  if (!agents || agents.length === 0) {
    return;
  }

  for (let agent of agents) {
    drawAgent(agent);
  }
}

function drawAgent(agent) {
   // Corpo do agente (círculo)
  fill(agent.color || "#cccccc"); // fallback para cinza se não vier nada
  ellipse(agent.positionX, agent.positionY, 20, 20);

  fill(agent.circle_color); // Define a cor do agente
  ellipse(agent.positionX, agent.positionY, 10, 10);
}