
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
  createHeatmap(prec_2_x, prec_2_y);
});