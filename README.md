# Wave-function-collapse
Wave function collapse (WFC) Algorithm 

## Introduction

This algorithm is a personnal adaption of the wave function collapse algorithm, initially presented in the [mxgmn](https://github.com/mxgmn/WaveFunctionCollapse) github repository.
I've tried my own implementation after seeing the [coding train](https://www.youtube.com/watch?v=rI_y2GAlQFM)'s youtube video.

The algorithm take tiles in input to generate a consistent pattern according to predefined adjency and rules. The idea of this algorithm comes from Quantum mechanics. Indeed at first, all the states ar in a superposition of possible states. The determination of a cell (collapse of the wave function) update the nearby cell's states. At the end we obtain a random but consistent pattern.

## Algorithm

- Take a tiles among those with the least entropy (minimum of state possible here).
- Collapse a state among those available (random here).
- Propagate information to nearby cells, in all directions :
  - if the information comes from a collapsed cell, keep only the available states according to the cell's tile rule.
  - else keep the states that are matching one of the tile's rule (corresponding to the available states of the cell).
  - if an update has been made, continue to Propagate information in all directions except where it comes from.


## Repository

All the patterns available are in the `tiles/` folder. 
Configurations of the pattern are in the `config.js` file.

To create a pattern, insert tiles in the new folder (`tiles/new_pattern`) and add the following informations to the configuration file : 
- File names 
- Adjacency number for each tiles 
- Combination rule 
- Rotations number if tile can be created by rotation of an existing tile.

You can change in the `sketch.js` file the following constants :
- the TEMPLATE structure you've created in the `config.js` file
- the MODE of display. There is two modes available : MODES.click / MODES.auto (default) 
- the SIZE of the grid : [width, height] (default : [1000, 800])
- the number of cells in the grid (DIM) : [n width, n height] (default: [25, 20])

You can run the program by serving the `index.html` file in the `public/` folder.

## Examples

The algorithm made the following images from these patterns :
- circuit tiles
- circuit tiles from the coding train
- demo tiles
- demo tracks tiles
- mountains tiles
- polka tiles
- roads tiles

![generated circuit image](/doc/images/circuit.png)
![generated circuit 2 image](/doc/images/circuit_2.png)
![generated demo image](/doc/images/demo.png)
![generated demo tracks image](/doc/images/demo_tracks.png)
![generated mountains image](/doc/images/mountains.png)
![generated polka image](/doc/images/polka.png)
![generated roads image](/doc/images/roads.png)