import { createModel, writeToCell, readFromCell, getModel } from "./model.js";
import * as view from "./view.js";

function startController() {
  view.registerEventHandlers();
  window.model = { getModel };
}

export function controllerCreateModel(rows, cols) {
  return createModel(rows, cols);
}

export function setCell(row, col, value) {
  writeToCell(row, col, value);
}

export function toggleCell(row, col) {
  const current = readFromCell(row, col) || 0;
  writeToCell(row, col, current ? 0 : 1);
}

startController();
