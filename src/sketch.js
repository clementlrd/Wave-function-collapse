const SIZE = [1000, 800];
const DIM = [25, 20];
var grid;
var tiles;
var images;
const TEMPLATE = CIRCUIT;
const MODE = AUTO;
let is_looping = true;

function mouseClicked() {
  if (MODE == AUTO) {
    if (is_looping) {
      noLoop();
      is_looping = false;
    } else {
      loop();
      is_looping = true;
    }
  }
  loop();
}

function preload() {
  TEMPLATE.images = TEMPLATE.paths.map((path) => loadImage(path));
}

function setup() {
  createCanvas(...SIZE);
  grid = new Grid(...SIZE, ...DIM);
  tiles = loadTiles();
  grid.resetStates(Array.from({ length: tiles.length }, (_, i) => i));
}

function draw() {
  background(0);
  const cells_updated = wave_function_collapse(grid, tiles);
  grid.display(cells_updated);
  MODE == AUTO ? loop() : noLoop();
}
