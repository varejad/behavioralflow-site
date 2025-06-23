let agents = []
let agent;
let canvaWidth;
let canvaHeight;


async function setInitialConditionsAndStart() {
  const selectedColor = document.getElementById("agentColor").value;
  const agentName = document.getElementById("agentName").value || "Sem nome";
  // Passa os valores do JS para variáveis globais no Python
  pyodide.globals.set("js_color", selectedColor);
  pyodide.globals.set("js_name", agentName);

  // Agora usa essas variáveis no código Python
  await pyodide.runPythonAsync(`
    agents = [
      Agents(responses, prob_variacao=0.0, positionX=50, positionY=50, color=js_color, name=js_name),
    ]
  `);
  agent = pyodide.globals.get("agents").get(0);
  pyodide.globals.set("WIDTH", canvaWidth);
  pyodide.globals.set("HEIGHT", canvaHeight);
  document.getElementById("main").style.display = "block"; // mostra a div
  document.getElementById("setAgent").style.display = "none";   // esconde o botão

  updateAgentsFromPyodide();
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
  } else {console.log("pyodide ainda não iniciado")}
  //const end = performance.now();
  //console.log(`Execução do passo: ${Math.round(end - start)} ms`);
  setTimeout(updateAgentsFromPyodide, 20);
}

function setup() {
  canvaWidth = Math.min(windowWidth - 10, 600);
  canvaHeight = Math.min(windowHeight/2, 800);
  let canvas = createCanvas(canvaWidth, canvaHeight);
  canvas.parent("simContainer");

  // Atualiza os agentes logo no início
  //updateAgentsFromPyodide();

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