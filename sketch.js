const SIZE = [500, 500];
const DIM = [4, 4];
var grid;

function setup() {
  createCanvas(...SIZE);
  grid = new Grid(...SIZE, ...DIM);
}

function draw() {
  background(0);
  grid.display();
  noLoop();
}
