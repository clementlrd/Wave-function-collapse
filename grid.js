class Grid {
  constructor(width, height, dimX, dimY) {
    this.width = width;
    this.height = height;
    this.dim = [dimX, dimY];
    this.grid = [];
    this._fillGrid();
  }

  _fillGrid() {
    console.log(".");
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
}

class Cell {
  constructor(x, y, width, height) {
    this.pos = [x, y];
    this.width = width;
    this.height = height;
    this.tile;
  }

  get collapsed() {
    return !!this.tile;
  }

  display() {
    if (this.collapsed) {
    } else {
      fill(0);
    }
    stroke(255);
    rect(this.pos[0] * this.width, this.pos[1] * this.height, width, height);
  }
}
