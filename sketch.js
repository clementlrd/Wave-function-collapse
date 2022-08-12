const SIZE = [500, 500];
const DIM = [4, 4];
var grid;
var tiles;

function setup() {
  createCanvas(...SIZE);
  grid = new Grid(...SIZE, ...DIM);
  tiles = loadTiles("demo/");
  grid.setTile(0, 0, tiles[1]);
}

function draw() {
  //background(0);
  grid.display();
  //noLoop();
}
