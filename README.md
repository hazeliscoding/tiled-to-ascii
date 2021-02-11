# Tiled To ASCII
Convert Tiled Maps/Tiles (JSON) to ASCII representation. This app is hosted on GitHub Pages and can be accessed [here](https://segfault0x61.github.io/tiled-to-ascii/).

## How To Use
* You need to set tile's type to a desired ASCII character (otherwise it will be considered as space).
* Export both map and tileset as JSON.
* Drop both JSON files on the file drop zone.
* Press "Generate ASCII Map".

After these steps you'll get an output like this (example for a 16x16 map):
```
?###############
??#####?##?#####
#############<##
###..###########
###.....##?#####
##.......#######
#........#######
#........#######
..........######
................
#...............
#.........######
#........#######
##......######<#
######..########
?###############
```
