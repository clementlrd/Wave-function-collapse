class Grid {
  constructor(width, height, dimX, dimY) {
    this.width = width;
    this.height = height;
    this.dim = [dimX, dimY];
    this.grid = [];
    this._fillGrid();
  }

  _fillGrid() {
    for (let i = 0; i < this.dim[0]; i++) {
      for (let j = 0; j < this.dim[1]; j++) {
        this.grid.push(
          new Cell(i, j, this.width / this.dim[0], this.height / this.dim[1])
        );
      }
    }
  }

  display() {
    this.grid.forEach((x) => x.display());
  }

  findCell(x, y) {
    return this.grid.find((cell) => [x, y].join() == cell.pos.join());
  }

  setTile(x, y, tile) {
    if (0 <= x < this.dim[0] && 0 <= y < this.dim[1])
      this.findCell(x, y).tile = tile;
    else return console.log("wrong cell position x:" + x + " y:" + y);
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
