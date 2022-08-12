function wave_function_collapse(grid, tiles) {
  // Find minimum of entropy
  const min_entropy = grid.grid.reduce(
    (x, cell) =>
      !cell.collapsed && cell.states.length < x ? cell.states.length : x,
    Infinity
  );
  const low_entropy_cells = grid.grid.filter(
    (cell) => cell.states.length == min_entropy
  );
  if (!low_entropy_cells.length) return;

  // choose random cell and collapse it
  const cell = random(low_entropy_cells);
  cell.setTile(random(tiles.filter((_, i) => cell.states.includes(i))));

  // propagate information
  propagate_info(grid, tiles, cell, -1);
}

function propagate_info(grid, tiles, cell, dir) {
  const dirs = [
    [0, 0, -1], // up
    [1, 1, 0], // right
    [2, 0, 1], // down
    [3, -1, 0], // left
  ];
  dirs
    .filter((_, i) => dir == -1 || i != (dir + 2) % 4)
    .forEach(([i, dirX, dirY]) => {
      const new_cell = grid.findCell(cell.pos[0] + dirX, cell.pos[1] + dirY);
      if (!new_cell || new_cell.collapsed) return;
      const len = new_cell.states.length;
      new_cell.states = new_cell.states.filter((new_state) => {
        // check if states are allowed
        if (cell.collapsed) return cell.tile.isTileAllowed(tiles[new_state], i);
        else
          return cell.states.reduce(
            (bool, state) =>
              bool | tiles[state].isTileAllowed(tiles[new_state], i),
            true
          );
      });
      if (len != new_cell.states.length)
        propagate_info(grid, tiles, new_cell, i);
    });
}
