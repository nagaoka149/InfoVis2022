// w14_HeatMap.js

let selectedCell = 0;

// Function to create a gradient colormap
function createGradientColormap(color) {
    return [
        { offset: 0, color: 'white' },
        { offset: 1, color: color }
    ];
}
// Function to normalize a matrix
function normalizeMatrix(matrix) {
    // Set diagonal elements to 0
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][i] = 0;
    }

    // Normalize matrix
    const maxAbsValue = Math.max(...matrix.flat().map(Math.abs));
    if (maxAbsValue !== 0) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] /= maxAbsValue;
            }
        }
    }

    return matrix;
}

// Function to create a HeatMap
function createHeatmap(prec1, prec2) {
    // Normalize matrices
    const prec1Normalized = normalizeMatrix([...prec1]);
    const prec2Normalized = normalizeMatrix([...prec2]);
    console.log(prec1);
    console.log(prec2);

    // Calculate the absolute values
    const absPrec1 = prec1Normalized.map(row => row.map(val => Math.abs(val)));
    const absPrec2 = prec2Normalized.map(row => row.map(val => Math.abs(val)));

    // Extract headers (indexes)
    const headers = absPrec1[0].map((_, colIndex) => colIndex);
    const rowIndex = 1; // Skip the first row (headers)

    // Merge matrices and create the mergedColors matrix
    const mergedColors = [];

    for (let i = rowIndex; i < absPrec1.length; i++) {
        const mergedRow = [];
        for (let j = 0; j < absPrec1[i].length; j++) {
            const red = absPrec1[i][j];
            const blue = absPrec2[i][j];
            const alpha = Math.max(red, blue);
            mergedRow.push([red, 0, blue, alpha]);
        }
        mergedColors.push(mergedRow);
    }

    // Create gradient colormaps for red and blue
    const redCmap = createGradientColormap('red');
    const blueCmap = createGradientColormap('blue');

    // Create a Canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    document.getElementById('heatmap-container').appendChild(canvas);

    // Get 2D rendering context
    const ctx = canvas.getContext('2d');

    // Draw the mergedColors on the canvas
    for (let i = 0; i < mergedColors.length; i++) {
        for (let j = 0; j < mergedColors[i].length; j++) {
            const [r, g, b, a] = mergedColors[i][j];
            ctx.fillStyle = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
            ctx.fillRect(j * 10, i * 10, 10, 10);
        }
    }

    // セル描画部分にクリックイベントを追加
    ctx.fillStyle = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
    ctx.fillRect(j * 10, i * 10, 10, 10);

    // クリックイベントリスナーを追加
    ctx.canvas.addEventListener('click', function(event) {
        const rect = ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const clickedRow = Math.floor(y / 10);
        const clickedCol = Math.floor(x / 10);

    cells.on("click", function(event, d) {
        selectedCell = (selectedCell && selectedCell.row === d.row && selectedCell.column === d.column) ? null : { row: d.row, column: d.column };
        drawDotMap(dotMapData[currentTime]);  // Redraw the dot map with the new selection
      });

      // w14_main.js に定義される関数を呼び出してドットマップを更新
    updateDotMap(clickedRow, clickedCol);
    }, false);
}

document.getElementById('idUpButton').addEventListener('click', function() {
    selectedCell = Math.max(0, selectedCell - 1);  // Ensure selectedCell doesn't go below 0
    drawHeatmap();  // Assuming this is the function that draws the heatmap
});

document.getElementById('idDownButton').addEventListener('click', function() {
    selectedCell = selectedCell + 1;  // Increment selectedCell
    // You might want to add logic to ensure selectedCell doesn't exceed the number of cells
    drawHeatMap();  // Redraw the heatmap
});

// Example usage
// Replace this with your actual matrices
const prec1 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0.8, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0.8, 0, 0, 0, 0, 0.8],
    [1, 0, 0, 0, 0, 0.4],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0.8, 0.4, 0, 0]
];

const prec2 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0.2, 0],
    [0, 0, 0, 0.7, 0, 0],
    [1, 0, 0, 0, 0.2, 0.9],
    [0, 0.7, 0, 0, 0, 0],
    [0.2, 0, 0.2, 0, 0, 0],
    [0, 0, 0.9, 0, 0, 0]
];

createHeatmap(prec1, prec2);