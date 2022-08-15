const MODES = Object.freeze({
  auto: Symbol("auto"),
  click: Symbol("click"),
  finish: Symbol("finish"),
});

const RULES = {
  base: (tile, adjacent_tile, side) =>
    adjacent_tile.adjacency[(side + 2) % 4] == tile.adjacency[side],
  circuit_4_5: (tile, adjacent_tile, side) => {
    if (
      adjacent_tile.id == tile.id &&
      [4, 5].includes(tile.adjacency[side]) &&
      [4, 5].includes(adjacent_tile.adjacency[(side + 2) % 4])
    ) {
      return (
        adjacent_tile.adjacency[(side + 2) % 4] % 2 ==
        (tile.adjacency[side] + 1) % 2
      );
    } else
      return adjacent_tile.adjacency[(side + 2) % 4] == tile.adjacency[side];
  },
};

const PATH = "../tiles/";
const EXT = ".png";

// adjacency : 0 -> up, 1 -> right ...

const DEMO = {
  name: "demo",
  paths: ["blank", "down", "left", "right", "up"].map(
    (x) => PATH + "demo/" + x + EXT
  ),
  images: [],
  adjacencies: [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 0, 1],
  ],
  rule: RULES.base,
};

const DEMO_TRACKS = {
  name: "demo tracks",
  paths: ["blank", "down"].map((x) => PATH + "demo-tracks/" + x + EXT),
  images: [],
  adjacencies: [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
  ],
  rule: RULES.base,
  rotations: [0, 3],
};

const CIRCUIT = {
  name: "circuit",
  paths: Array.from({ length: 13 }, (_, i) => PATH + "circuit/" + i + EXT),
  images: [],
  // 0 - brown | 1 - green | 2 - lightgreen | 3 - gray | 4 - green + brown right | 5 - green + brown left
  adjacencies: [
    [0, 0, 0, 0], // 0
    [1, 1, 1, 1], // 1
    [1, 2, 1, 1], // 2
    [1, 3, 1, 3], // 3
    [4, 2, 5, 0], // 4
    [5, 1, 1, 4], // 5
    [1, 2, 1, 2], // 6
    [3, 2, 3, 2], // 7
    [3, 1, 2, 1], // 8
    [2, 2, 1, 2], // 9
    [2, 2, 2, 2], // 10
    [2, 2, 1, 1], // 11
    [1, 2, 1, 2], // 12
  ],
  rule: RULES.base,
  rules: Array.from({ length: 13 }, (_, i) =>
    [4, 5].includes(i) ? RULES.circuit_4_5 : RULES.base
  ),
  rotations: [0, 0, 3, 1, 3, 3, 1, 1, 3, 3, 1, 3, 1],
};

const CIRCUIT_2 = {
  ...CIRCUIT,
  name: "circuit 2",
  paths: Array.from(
    { length: 13 },
    (_, i) => PATH + "circuit-coding-train/" + i + EXT
  ),
};

const TEMPLATES = [DEMO, CIRCUIT];
