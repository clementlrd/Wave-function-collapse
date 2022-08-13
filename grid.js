class Grid {
  constructor(width, height, dimX, dimY) {
    this.width = width;
    this.height = height;
    this.dim = [dimX, dimY];
    this.grid = [];
    this.flat_grid = [];
    this._fillGrid();
  }

  _fillGrid() {
    for (let i = 0; i < this.dim[0]; i++) {
      const row = [];
      for (let j = 0; j < this.dim[1]; j++) {
        row.push(
          new Cell(i, j, this.width / this.dim[0], this.height / this.dim[1])
        );
      }
      this.grid.push(row);
    }
    this.flat_grid = this.grid.flat();
  }

  display() {
    this.grid.forEach((x) => x.forEach((y) => y.display()));
  }

  findCell(x, y) {
    return this.grid?.[x]?.[y];
  }

  setTile(x, y, tile) {
    const cell = this.findCell(x, y);
    if (cell) cell.setTile(tile);
    else return console.log("cell not found at position x:" + x + " y:" + y);
  }

  resetStates(states) {
    this.grid.forEach((x) => x.forEach((y) => (y.states = states)));
  }
}

class Cell {
  constructor(x, y, width, height) {
    this.pos = [x, y];
    this.width = width;
    this.height = height;
    this.tile;
    this.states = [];
  }

  get collapsed() {
    return !!this.tile;
  }

  setTile(tile) {
    this.tile = tile;
    this.states = [];
  }

  display() {
    if (this.collapsed) {
      this.tile.display(...this.pos, this.width, this.height);
    } else {
      fill(0);
      stroke(255);
      rect(this.pos[0] * this.width, this.pos[1] * this.height, width, height);
    }
  }
}
