class Tile {
  constructor(image, adjacency, rule) {
    this.image = image;
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

  setId(id) {
    this.id = id;
    return this;
  }

  isTileAllowed(adjacent_tile, side) {
    return this.rule(adjacent_tile, side);
  }
}

function loadTiles() {
  return (
    TEMPLATE.images
      // create tile base
      .map((image, i) => new Tile(image, TEMPLATE.adjacencies[i]))
      .map((tile, i) => tile.setId(i))
      // rotate and add rule
      .map((tile, i) =>
        TEMPLATE.rotations
          ? Array.from({ length: TEMPLATE.rotations[i] + 1 }).map((_, j) =>
              rotateTile(tile, i, j)
            )
          : tile.setRule(
              !TEMPLATE.rules?.length ? TEMPLATE.rule : TEMPLATE.rules[i]
            )
      )
      .flat()
  );
}

// rotate clockwise
function rotateTile(tile, index, rotation) {
  const [w, h] = [tile.image.width, tile.image.height];
  const newImage = createGraphics(w, h);
  newImage.imageMode(CENTER);
  newImage.translate(w / 2, h / 2);
  newImage.rotate(HALF_PI * rotation);
  newImage.image(tile.image, 0, 0);
  const adjacency = [...tile.adjacency];
  for (let i = 0; i < rotation; i++) adjacency.unshift(adjacency.pop());
  return new Tile(newImage, adjacency)
    .setRule(!TEMPLATE.rules?.length ? TEMPLATE.rule : TEMPLATE.rules[index])
    .setId(tile.id);
}
