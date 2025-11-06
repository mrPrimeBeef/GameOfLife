import * as model from "./model.js";
import * as view from "./view.js";

function startController() {
  view.makeGrid();
}

export function createGrid(rows, cols) {
  return model.createModelGrid(rows, cols);
}

export function getGrid() {
  return model.getModel();
}

export function toggleCell(row, col) {
  const current = model.readFromCell(row, col);
  model.writeToCell({ row, col }, current ? 0 : 1);
}

export function randomizeGrid(){
  model.randomize();
}

startController();
