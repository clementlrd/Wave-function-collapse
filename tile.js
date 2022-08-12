class Tile {
  constructor(path) {
    this.image = loadImage(path);
  }

  display(x, y, width, height) {
    image(this.image, x * width, y * height, width, height);
  }
}

const PATH = "./tiles/";
const EXT = ".png";

function loadTiles(folder) {
  switch (folder.slice(0, folder.length - 1)) {
    case "circuit":
      return Array.from(
        { length: 13 },
        (_, i) => new Tile(PATH + folder + i + EXT)
      );
    case "demo":
    default:
      return ["blank", "down", "left", "right", "up"].map(
        (x) => new Tile(PATH + folder + x + EXT)
      );
  }
}
