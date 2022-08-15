const TEMPLATE = MOUNTAINS;
var MODE = MODES.auto;
const VERBOSE = true;
const SIZE = [1000, 800];
const DIM = [25, 20];

var grid;
var tiles;
var images;
let is_looping = true;

function mouseClicked() {
  switch (MODE) {
    case MODES.auto:
      if (is_looping) {
        is_looping = false;
        return noLoop();
      } else {
        is_looping = true;
        return loop();
      }
    case MODES.click:
      return loop();
    case MODES.finish:
    default:
      return;
  }
}

function preload() {
  TEMPLATE.images = TEMPLATE.paths.map((path) => loadImage(path));
}

function setup() {
  createCanvas(...SIZE);
  textSize(8);
  grid = new Grid(...SIZE, ...DIM);
  tiles = loadTiles();
  grid.resetStates(Array.from({ length: tiles.length }, (_, i) => i));
}

function draw() {
  background(0);
  const cells_updated = wave_function_collapse(grid, tiles);
  grid.display(cells_updated);
  switch (MODE) {
    case MODES.auto:
      return loop();
    case MODES.click:
    case MODES.finish:
    default:
      return noLoop();
  }
}
