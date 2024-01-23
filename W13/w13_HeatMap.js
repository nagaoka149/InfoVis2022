// w13_heatMap.js

// Function to create a gradient colormap from white to the specified color
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
  
  // Function to merge and visualize matrices
  function mergeAndVisualize(prec1, prec2, dfIndex) {
    // Normalize matrices
    const prec1Normalized = normalizeMatrix([...prec1]);
    const prec2Normalized = normalizeMatrix([...prec2]);
  
    const absPrec1 = prec1Normalized.map(row => row.map(val => Math.abs(val)));
    const absPrec2 = prec2Normalized.map(row => row.map(val => Math.abs(val)));
  
    // Merge matrices and create the mergedColors matrix
    // Code for merging matrices and creating the mergedColors matrix goes here
    // ...
  
    // Create gradient colormaps for red and blue
    const redCmap = createGradientColormap('red');
    const blueCmap = createGradientColormap('blue');
  
    // Create a Canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
  
    // Get 2D rendering context
    const ctx = canvas.getContext('2d');
  
    // Draw the mergedColors on the canvas
    for (let i = 0; i < mergedColors.length; i++) {
      for (let j = 0; j < mergedColors[i].length; j++) {
        const [r, g, b, a] = mergedColors[i][j];
        ctx.fillStyle = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
        ctx.fillRect(j * 10, i * 10, 10, 10);
      }
  
      // Display index on the heatmap
      ctx.fillStyle = 'black';
      ctx.font = '8px Arial';
      ctx.fillText(i, mergedColors[i].length * 10 + 5, i * 10 + 8);
    }
  
    // Remove the canvas element after a delay
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 3000);
  }
  
  // Example usage
  // Replace this with the actual data loading and dfIndex value
  const dfIndex = 0;
  
  // Assuming prec_2_x.csv and prec_2_y.csv are loaded asynchronously
  // Replace this with the actual loading code
  const prec_2_x_url = 'https://nagaoka149.github.io/InfoVis2022/W13/prec_2_x.csv';
  const prec_2_y_url = 'https://nagaoka149.github.io/InfoVis2022/W13/prec_2_y.csv';
  
  Promise.all([
    fetch(prec_2_x_url).then(response => response.text()).then(csv => csv.split('\n').map(row => row.split(',').map(Number))),
    fetch(prec_2_y_url).then(response => response.text()).then(csv => csv.split('\n').map(row => row.split(',').map(Number)))
  ]).then(([prec_2_x, prec_2_y]) => {
    mergeAndVisualize(prec_2_x, prec_2_y, dfIndex);
  });