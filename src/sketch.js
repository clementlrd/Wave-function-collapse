const SIZE = [1000, 800];
const DIM = [25, 20];
var grid;
var tiles;
var images;
const TEMPLATE = CIRCUIT;

function mouseClicked() {
  noLoop();
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
  wave_function_collapse(grid, tiles);
  grid.display();
  //noLoop();
}
