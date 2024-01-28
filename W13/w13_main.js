// w13_main.js
import { loadCSV, Filter } from './w13_DotMap.js';
import { drawHeatmap } from './w13_HeatMap.js';

let dotMapData;
let dotMap;
let heatmapData;
let heatmap;

Promise.all([
    loadCSV("https://nagaoka149.github.io/InfoVis2022/W13/merged_gps_1218_0800_1200_50.csv"),
    loadCSV("https://nagaoka149.github.io/InfoVis2022/W13/prec_2_x.csv"),
    loadCSV("https://nagaoka149.github.io/InfoVis2022/W13/prec_2_y.csv")
]).then(([mergedData, xData, yData]) => {
    dotMapData = mergedData;
    heatmapData = { x: xData, y: yData };
    
    dotMap = new DotMap({
        parent: '#drawing_region_dotmap',
        width: 600,
        height: 600,
        margin: { top: 10, right: 10, bottom: 50, left: 50 },
        data: dotMapData
    });
    dotMap.update();

    heatmap = drawHeatmap({
        parent: '#drawing_region_heatmap',
        width: 600,
        height: 600,
        margin: { top: 10, right: 10, bottom: 50, left: 50 },
        data: heatmapData
    });
});

function updateData() {
    dotMap.update();
    heatmap.update();
}