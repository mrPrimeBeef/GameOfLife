import Grid from "./Grid.js";

export class Model {
  #arr;
  #grid;

  constructor(rows, cols) {
    this.#arr = Array.from({ length: rows }, () => Array(cols).fill(0));
    this._rows = rows;
    this._cols = cols;
    this.#grid = new Grid(rows, cols);
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

  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  nextGeneration() {
    const newGeneration = Array.from({ length: this._rows }, () =>
      Array(this._cols).fill(0)
    );
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        const currentCell = this.#arr[row][col];
        const neighbourValues = this.#grid.neighbourValues({ row, col });
        const aliveNeighbours = neighbourValues.filter((v) => v === 1).length;

        if (currentCell === 1) {
          if (aliveNeighbours === 2 || aliveNeighbours === 3) {
            newGeneration[row][col] = 1;
          }
        } else {
          if (aliveNeighbours === 3) {
            newGeneration[row][col] = 1;
          }
        }
      }
    }
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        this.#arr[row][col] = newGeneration[row][col];
        this.#grid.set({ row, col }, newGeneration[row][col]);
      }
    }
  }
}

let _model = null;

export function createModel(rows, cols) {
  _model = new Model(rows, cols);
  return _model;
}

export function getModel() {
  return _model;
}

export function writeToCell(row, col, value) {
  _model && _model.set({ row, col }, value);
}

export function readFromCell(row, col) {
  return _model ? _model.get({ row, col }) : undefined;
}
