let map, tileset;
const ascii_map = document.getElementById('ascii_map');
const generateButton = document.getElementById('generate_map');

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object

  // files is a FileList of File objects. List some properties
  var output = [];
  for (var i = 0, file; (file = files[i]); i++) {
    output.push(
      '<li><strong>',
      escape(file.name),
      '</strong> (',
      file.type || 'n/a',
      ') - ',
      file.size,
      ' bytes, last modified: ',
      file.lastModifiedDate.toLocaleDateString(),
      '</li>'
    );

    var reader = new FileReader();

    // Closure to capture the file information
    reader.onload = (function (theFile) {
      return function (e) {
        const parsedObject = JSON.parse(e.target.result);
        if (parsedObject.type === 'map') {
          map = parsedObject;
          output.push('<span class="success">Map loaded</span><br>');
          refreshOutput(output);
        }

        if (parsedObject.type === 'tileset') {
          tileset = parsedObject;
          output.push('<span class="success">Tileset loaded</span><br>');
          refreshOutput(output);
        }

        if (!!map && !!tileset) {
          generateButton.disabled = false;
        }
      };
    })(file);

    // Read in the image file as a data URL
    reader.readAsText(file);
  }
  refreshOutput(output);
}

function refreshOutput(output) {
  document.getElementById('list').innerHTML =
    '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy
}

function generateMap() {
  const mapHeight = map.layers[0].height;
  const mapWidth = map.layers[0].width;
  const mapData = map.layers[0].data;
  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      const tileId = mapData[y * mapWidth + x] - 1;
      const tile = tileset.tiles.find((t) => t.id == tileId);
      const tileChar = !!tile ? tile.type : ' ';
      ascii_map.innerHTML += tileChar;
    }
    ascii_map.innerHTML += '\n';
  }
}

// Setup the dnd listeners
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

document
  .getElementById('generate_map')
  .addEventListener('click', generateMap, false);
