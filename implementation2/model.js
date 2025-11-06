import Grid from "../Grid.js";

export class GridModel {
  #grid;

  constructor(rows, cols) {
    this.#grid = new Grid(rows, cols);
    this._rows = rows;
    this._cols = cols;
  }

  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  set({ row, col }, value) {
    if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
      this.#grid.set({ row, col }, value);
    }
  }

  get({ row, col }) {
    if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
      return this.#grid.get({ row, col });
    }
    return undefined;
  }

  toggle(row, col) {
    const v = this.get({ row, col }) ? 0 : 1;
    this.set({ row, col }, v);
  }

  nextGeneration() {
    const newGeneration = Array.from({ length: this._rows }, () =>
      Array(this._cols).fill(0)
    );

    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        const currentCell = this.#grid.get({ row, col });
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
    this.#grid.updateGrid(newGeneration);
  }

  randomize() {
  for (let row = 0; row < this._rows; row++) {
    for (let col = 0; col < this._cols; col++) {
      this.set({ row, col }, Math.random() < 0.5 ? 1 : 0);
    }
  }
}

}

let modelGrid = null;

export function createModelGrid(rows, cols) {
  modelGrid = new GridModel(rows, cols);
  console.log(modelGrid);
}

export function getModel() {
  return modelGrid;
}

export function readFromCell(row, col) {
  return modelGrid ? modelGrid.get({ row, col }) : 0;
}

export function writeToCell({ row, col }, value) {
  if (modelGrid) {
    modelGrid.set({ row, col }, value);
  }
}

export function randomize() {
  if (modelGrid) {
    modelGrid.randomize();
  }
}
