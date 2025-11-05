import * as controller from "./controller.js";

let simulationInterval = null;
let generation = 0;

export function renderGrid() {
  const cells = document.querySelectorAll(".cell");
  const model = window.model.getModel();

  if (!model) return;

  cells.forEach((cell, index) => {
    const rows = model.rows();
    const row = Math.floor(index / model.cols());
    const col = index % model.cols();

    const value = model.get({ row, col });

    if (value === 1) {
      cell.classList.add("alive");
    } else {
      cell.classList.remove("alive");
    }
  });
}

export function updateGenerationCounter() {
  const genText = document.getElementById("genText");
  genText.textContent = generation;
}

export function startSimulation() {
  const model = window.model.getModel();
  if (!model || simulationInterval) return;

  simulationInterval = setInterval(() => {
    generation++;
    model.nextGeneration();
    renderGrid();
    updateGenerationCounter();
  }, 500);
}

export function stopSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
}

export function resetGeneration() {
  generation = 0;
  updateGenerationCounter();
}

export function registerEventHandlers() {
  console.log("register event handlers");
  makeGrid();
}

function makeGrid() {
  const grid = document.getElementById("grid");
  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const generateBtn = document.getElementById("generate");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");

  generateBtn.addEventListener("click", () => {
    const rows = parseInt(rowsInput.value, 10);
    const cols = parseInt(colsInput.value, 10);

    stopSimulation();
    resetGeneration();
    controller.controllerCreateModel(rows, cols);

    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 20px)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.addEventListener("click", () => {
          controller.toggleCell(r, c);
          renderGrid();
        });

        grid.appendChild(cell);
      }
    }

    renderGrid();
  });

  startBtn.addEventListener("click", startSimulation);
  stopBtn.addEventListener("click", stopSimulation);
}
