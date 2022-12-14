function wave_function_collapse(grid, tiles) {
  // Find minimum of entropy
  const min_entropy = grid.flat_grid.reduce(
    (x, cell) =>
      !cell.collapsed && cell.states.length < x ? cell.states.length : x,
    Infinity
  );
  const low_entropy_cells = grid.flat_grid.filter(
    (cell) => !cell.collapsed && cell.states.length == min_entropy
  );
  if (!low_entropy_cells.length) {
    if (VERBOSE) {
      console.log("no options");
      console.log(grid);
    }
    MODE = MODES.finish;
    return;
  }

  // choose random cell and collapse it
  const cell = random(low_entropy_cells);
  if (!cell.states.length) {
    cell.collapsed = true;
    if (VERBOSE) console.log("no available cells");
    return;
  }

  if (VERBOSE) console.log("states : ", cell.states);
  cell.setTile(random(tiles.filter((_, i) => cell.states.includes(i))));

  // propagate information
  const visited_cells = [];
  propagate_info(grid, tiles, cell, -1, visited_cells);
  // display visited cells (actually not)
  if (false)
    console.log(
      visited_cells.sort((posA, posB) => {
        const a = posA.split(",").map(Number);
        const b = posB.split(",").map(Number);
        return a[0] != b[0] ? a[0] - b[0] : a[1] - b[1];
      })
    );
  return visited_cells;
}

function propagate_info(grid, tiles, cell, dir, visited_cells) {
  const dirs = [
    [0, 0, -1], // up
    [1, 1, 0], // right
    [2, 0, 1], // down
    [3, -1, 0], // left
  ];
  dirs
    .filter((_, i) => dir == -1 || i != (dir + 2) % 4)
    .forEach(([side, dirX, dirY]) => {
      const new_cell = grid.findCell(cell.pos[0] + dirX, cell.pos[1] + dirY);
      if (!new_cell || new_cell.collapsed) return;
      visited_cells.push(new_cell.pos.join(","));
      const len = new_cell.states.length;
      new_cell.states = new_cell.states.filter((new_state) => {
        // check if states are allowed next to the new tile or next all the possible states
        if (cell.tile)
          return (
            cell.tile.isTileAllowed(tiles[new_state], side) &&
            tiles[new_state].isTileAllowed(cell.tile, (side + 2) % 4)
          );
        else
          return cell.states.reduce(
            (bool, state) =>
              bool ||
              (tiles[state].isTileAllowed(tiles[new_state], side) &&
                tiles[new_state].isTileAllowed(tiles[state], (side + 2) % 4)),
            false
          );
      });
      if (len != new_cell.states.length)
        propagate_info(grid, tiles, new_cell, -1, visited_cells);
    });
}
