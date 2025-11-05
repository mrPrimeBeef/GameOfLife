import Grid from "../Grid.js";

export class Model {
  #arr;
  #grid;

  constructor(rows, cols) {
    this.#arr = Array.from({ length: rows }, () => Array(cols).fill(0));
    this._rows = rows;
    this._cols = cols;
    this.#grid = new Grid(rows, cols);
  }
}
