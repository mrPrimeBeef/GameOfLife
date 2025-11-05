import Grid from "../Grid.js";

export class GridModel {
  #arr;
  #grid;

  constructor(rows, cols) {
    this.#arr = Array.from({ length: rows }, () => Array(cols).fill(0));
    this._rows = rows;
    this._cols = cols;
    this.#grid = new Grid(rows, cols);
  }

  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

   set({ row, col }, value) {
    if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
      this.#arr[row][col] = value;
      this.#grid.set({ row, col }, value);
    }
  }

  get({ row, col }) {
    if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
      return this.#arr[row][col];
    }
    return undefined;
  }

  toggle(row, col) {
    const v = this.get({ row, col }) ? 0 : 1;
    this.set({ row, col }, v);
  }

}

let modelGrid = null;

export function createModelGrid(rows, cols){
  modelGrid = new GridModel(rows, cols);
  console.log(modelGrid);
}

export function getModel() {
  return modelGrid;
}
