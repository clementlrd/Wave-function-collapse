class Tile {
  constructor(path, adjacency, rule) {
    this.image = loadImage(path);
    this.adjacency = adjacency;
    this.rule = rule;
  }

  display(x, y, width, height) {
    image(this.image, x * width, y * height, width, height);
  }

  setRule(rule) {
    this.rule = (...args) => rule(this, ...args);
    return this;
  }

  isTileAllowed(adjacent_tile, side) {
    return this.rule(adjacent_tile, side);
  }
}

const PATH = "./tiles/";
const EXT = ".png";

// adjacency : 0 -> up, 1 -> right ...

function loadTiles(folder) {
  switch (folder.slice(0, folder.length - 1)) {
    case "circuit":
      return Array.from(
        { length: 13 },
        (_, i) => new Tile(PATH + folder + i + EXT)
      );
    case "demo":
    default:
      const adjacencies = [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [1, 0, 1, 1],
        [1, 1, 1, 0],
        [1, 1, 0, 1],
      ];
      const rule = (tile, adjacent_tile, side) =>
        adjacent_tile.adjacency[(side + 2) % 4] == tile.adjacency[side];
      return ["blank", "down", "left", "right", "up"].map((x, i) =>
        new Tile(PATH + folder + x + EXT, adjacencies[i]).setRule(rule)
      );
  }
}
