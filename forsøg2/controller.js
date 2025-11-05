import * as model from "./model.js";
import * as view from "./view.js";

function startController() {
  view.makeGrid();
  
}

export function createGrid(rows, cols) {
  return model.createModelGrid(rows, cols);
}

export function getGrid(){
  return model.getModel();
}

startController();
