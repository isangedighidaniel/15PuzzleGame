// script.js

const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
const size = canvas.width;
const rows = 4;
const cols = 4;
const tileSize = size / rows;
const tiles = [];
let emptyTile = { row: 3, col: 3 };

// Initialize the tiles
function initTiles() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (row === 3 && col === 3) {
                tiles.push(null);
            } else {
                tiles.push({ row, col, number: row * cols + col + 1 });
            }
        }
    }
}

// Draw the puzzle
function drawTiles() {
    ctx.clearRect(0, 0, size, size);
    tiles.forEach((tile, index) => {
        if (tile) {
            const x = (index % cols) * tileSize;
            const y = Math.floor(index / cols) * tileSize;
            ctx.fillStyle = '#3498db';
            ctx.fillRect(x, y, tileSize, tileSize);
            ctx.strokeRect(x, y, tileSize, tileSize);
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.fillText(tile.number, x + tileSize / 2 - 5, y + tileSize / 2 + 5);
        }
    });
}

// Shuffle the tiles
function shuffleTiles() {
    for (let i = 0; i < 1000; i++) {
        const direction = Math.floor(Math.random() * 4);
        moveTile(direction);
    }
}

// Move tile in a direction
function moveTile(direction) {
    const { row, col } = emptyTile;
    let newRow = row;
    let newCol = col;

    if (direction === 0 && row > 0) newRow--;
    if (direction === 1 && row < rows - 1) newRow++;
    if (direction === 2 && col > 0) newCol--;
    if (direction === 3 && col < cols - 1) newCol++;

    if (newRow !== row || newCol !== col) {
        const index = newRow * cols + newCol;
        const emptyIndex = row * cols + col;
        tiles[emptyIndex] = tiles[index];
        tiles[index] = null;
        emptyTile = { row: newRow, col: newCol };
    }
}

// Handle click events
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);

    const clickedIndex = row * cols + col;
    const emptyIndex = emptyTile.row * cols + emptyTile.col;

    const neighbors = [
        emptyIndex - cols, // above
        emptyIndex + cols, // below
        emptyIndex - 1,    // left
        emptyIndex + 1     // right
    ];

    if (neighbors.includes(clickedIndex)) {
        tiles[emptyIndex] = tiles[clickedIndex];
        tiles[clickedIndex] = null;
        emptyTile = { row, col };
        drawTiles();
    }
});

// Initialize and draw the puzzle
initTiles();
shuffleTiles();
drawTiles();
