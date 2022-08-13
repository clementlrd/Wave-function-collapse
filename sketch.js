const SIZE = [1000, 800];
const DIM = [25, 20];
var grid;
var tiles;
const FOLDER = {
  path: "demo/",
  len: 5,
};

function mouseClicked() {
  noloop();
}

function setup() {
  createCanvas(...SIZE);
  grid = new Grid(...SIZE, ...DIM);
  grid.resetStates(Array.from({ length: FOLDER.len }, (_, i) => i));
  tiles = loadTiles(FOLDER.path);
}

function draw() {
  background(0);
  wave_function_collapse(grid, tiles);
  grid.display();
  //noLoop();
}
