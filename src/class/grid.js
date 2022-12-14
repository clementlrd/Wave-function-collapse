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
    for (let j = 0; j < this.dim[1]; j++) {
      const row = [];
      for (let i = 0; i < this.dim[0]; i++) {
        row.push(
          new Cell(i, j, this.width / this.dim[0], this.height / this.dim[1])
        );
      }
      this.grid.push(row);
    }
    this.flat_grid = this.grid.flat();
  }

  display(visited_cells) {
    this.grid.forEach((row) =>
      row.forEach((cell) =>
        cell.display(
          visited_cells && visited_cells.includes(cell.pos.join(",")) ? 255 : 0
        )
      )
    );
  }

  findCell(x, y) {
    return this.grid?.[y]?.[x];
  }

  setTile(x, y, tile) {
    const cell = this.findCell(x, y);
    if (cell) cell.setTile(tile);
    if (VERBOSE) console.log(tile);
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
    this.collapsed = false;
  }

  setTile(tile) {
    this.tile = tile;
    this.states = [];
    this.collapsed = true;
  }

  display(color = 0) {
    if (this.tile) {
      this.tile.display(...this.pos, this.width, this.height);
    } else {
      push();
      fill(color);
      stroke(255);
      rect(this.pos[0] * this.width, this.pos[1] * this.height, width, height);
      if (VERBOSE && this.pos.includes(0)) {
        const padding = [4, 10];
        fill(255);
        text(
          this.pos[Number(!this.pos[0])],
          this.pos[0] * this.width + padding[0],
          this.pos[1] * this.height + padding[1]
        );
      }
      pop();
    }
    return this;
  }
}
