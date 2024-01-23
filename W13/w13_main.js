// w13_main.js

import { createHeatmap } from './w13_HeatMap.js';

// Example usage
const prec_2_x_url = 'https://nagaoka149.github.io/InfoVis2022/W13/prec_2_x.csv';
const prec_2_y_url = 'https://nagaoka149.github.io/InfoVis2022/W13/prec_2_y.csv';

Promise.all([
  fetch(prec_2_x_url).then(response => response.text()).then(csv => csv.split('\n').map(row => row.split(',').map(Number))),
  fetch(prec_2_y_url).then(response => response.text()).then(csv => csv.split('\n').map(row => row.split(',').map(Number)))
]).then(([prec_2_x, prec_2_y]) => {
  createHeatmap(prec_2_x, prec_2_y);
});