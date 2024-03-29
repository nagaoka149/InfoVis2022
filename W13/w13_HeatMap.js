// w13_HeatMap.js

export function createGradientColormap(color) {
    return [
        { offset: 0, color: 'white' },
        { offset: 1, color: color }
    ];
}

export function normalizeMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][i] = 0;
    }

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

export function createHeatmap(prec1, prec2) {
    const prec1Normalized = normalizeMatrix([...prec1]);
    const prec2Normalized = normalizeMatrix([...prec2]);

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
    canvas.width = 600;
    canvas.height = 600;
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
}