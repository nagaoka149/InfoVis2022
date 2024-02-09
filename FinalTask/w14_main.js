// w14_main.js

// Load required modules
import { createDotMap } from './w14_DotMap.js';
import { createHeatmap } from './w14_HeatMap.js';

// Load data files
Promise.all([
    d3.csv('https://nagaoka149.github.io/InfoVis2022/W14/gps_synth_01.csv'),
    d3.csv('https://nagaoka149.github.io/InfoVis2022/W14/prec_x_01.csv'),
    d3.csv('https://nagaoka149.github.io/InfoVis2022/W14/prec_y_01.csv')
]).then(([gpsData, precXData, precYData]) => {
    // Convert string values to numbers
    gpsData.forEach(row => {
        row.Time = +row.Time;
        for (let i = 1; i <= 6; i++) {
            row[`${i}_x`] = +row[`${i}_x`];
            row[`${i}_y`] = +row[`${i}_y`];
        }
    });

    // Convert string values to numbers for prec_x_01 and prec_y_01
    precXData.forEach(row => {
        for (let i = 1; i <= 6; i++) {
            row[i] = +row[i];
        }
    });

    precYData.forEach(row => {
        for (let i = 1; i <= 6; i++) {
            row[i] = +row[i];
        }
    });

    // Draw DotMap
    createDotMap(gpsData);

    // Draw HeatMap
    createHeatmap(precXData, precYData);
});

function updateDotMapBasedOnHeatmap(selectedCell) {
    // Logic to find and update the corresponding dot in the dotmap
    // This might involve changing the dot's color and updating the heatmap to highlight the selected cell
}

// Time Back ボタンをクリックしたときの処理
function onDownButtonClick() {
    currentTime = (currentTime - 1 + dotMapData.length) % dotMapData.length; // 前の時刻へ
    drawDotMap(dotMapData[currentTime]); // DotMapを描画
  }
  
  // Time Next ボタンをクリックしたときの処理
  function onUpButtonClick() {
    currentTime = (currentTime + 1) % dotMapData.length; // 次の時刻へ
    drawDotMap(dotMapData[currentTime]); // DotMapを描画
  }
  
  // ID Back ボタンをクリックしたときの処理
  function onIDDownButtonClick() {
    selectedCell = (selectedCell - 1 + 6) % 6; // 前の時刻へ
    drawDotMap(dotMapData[currentTime]); // DotMapを描画
    drawHeatmap();
  }
  
  
  // ID Next ボタンをクリックしたときの処理
  function onIDUpButtonClick() {
    selectedCell = (selectedCell + 1) % 6; // 次の時刻へ
    drawDotMap(dotMapData[currentTime]); // DotMapを描画
    drawHeatmap();
  }