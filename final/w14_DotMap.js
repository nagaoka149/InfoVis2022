// w14_DotMap.js

// グローバル変数
let dotMapData = [
    [[10, 10], [25, 20], [30, 35], [10, 40], [60, 20], [50, 35], ],
    [[0, 10], [25, 25], [40, 40], [10, 35], [50, 25], [45, 40], ],
    [[0, 0], [20, 20], [40, 40], [15, 30], [40, 25], [40, 40], ],
    [[10, 0], [20, 15], [45, 35], [15, 40], [35, 30], [45, 35], ],
    [[15, 5], [25, 10], [45, 30], [10, 35], [40, 30], [50, 35], ],
    [[20, 10], [25, 15], [50, 20], [15, 35], [35, 35], [55, 30], ],
    [[25, 10], [20, 15], [50, 20], [10, 40], [30, 35], [55, 35], ],
    [[20, 5], [20, 10], [55, 15], [5, 35], [25, 40], [50, 35], ],
  ];
// SVGの幅と高さを設定
const width = 400;
const height = 200;

// SVG要素を作成
const svg = d3.select("#dotmap-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// margin の定義
const margin = { top: 20, right: 20, bottom: 20, left: 25 };

const allXValues = dotMapData.flat().map(d => d[0]);
const allYValues = dotMapData.flat().map(d => d[1]);
const xScale = d3.scaleLinear().domain([d3.min(allXValues), d3.max(allXValues)]).range([margin.left, width - margin.right]);
const yScale = d3.scaleLinear().domain([d3.min(allYValues), d3.max(allYValues)]).range([height - margin.bottom, margin.top]);

//const timeText = svg.append("text")
//    .attr("class", "current-time")
//    .attr("x", margin.left)
//    .attr("y", margin.top - 10) // 上部マージンより少し上に配置
//    .style("font-size", "10px")
//    .text(`Current Time: ${currentTime}`);

// x軸の描画
// y軸の描画
  svg.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(xScale));
  svg.append("g").attr("class", "y-axis").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

// 初期の時刻を設定
let currentTime = 0;

let selectedCell = 0;  

// DotMapの描画関数
function drawDotMap(data) {
  // 軸を削除
  // svg.selectAll("*").remove();

  // 円を描画
  // データ点の描画
    const circles = svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d[0])) // xScaleを使用
        .attr("cy", d => yScale(d[1])) // yScaleを使用
        .attr("r", 5)
        //.attr("fill", "steelblue");
        .attr("fill", (d, i) => {
          if (selectedCell && selectedCell.row === Math.floor(i / 6) && selectedCell.column === i % 6) {
              return "red";  // Change to red if the dot corresponds to the selected cell
          }
          return "steelblue";  // Default color
      });
        

  // ツールチップの表示
  circles.on("mouseover", (event, d) => {
    // ツールチップの位置を設定
    const xPosition = d[0] + 10;
    const yPosition = d[1] - 10;

    // ツールチップを表示
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#value")
      .text(`(${d[0]}, ${d[1]})`);

    d3.select("#tooltip").classed("hidden", false);
  });

  // ツールチップの非表示
  circles.on("mouseout", () => {
    d3.select("#tooltip").classed("hidden", true);
  });

  // 現在の時間を表示するテキストを更新
  //timeText.text(`Current Time: ${currentTime}`);

// サンプルコード：x軸およびy軸のスケールを設定
const xValues = dotMapData[currentTime].map(point => point[0]);
const yValues = dotMapData[currentTime].map(point => point[1]);

// x軸の描画
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

// y軸の描画
svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));
}

// 初回描画
drawDotMap(dotMapData[currentTime]);

// 時刻変更ボタンのクリックイベント
//d3.select("#nextTimeButton").on("click", () => {
//  currentTime = (currentTime + 1) % dotMapData.length; // 次の時刻へ
//  drawDotMap(dotMapData[currentTime]); // DotMapを描画
//});

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
  //drawHeatmap();
}


// ID Next ボタンをクリックしたときの処理
function onIDUpButtonClick() {
  selectedCell = (selectedCell + 1) % 6; // 次の時刻へ
  drawDotMap(dotMapData[currentTime]); // DotMapを描画
  //drawHeatmap();
}

// 初回描画
drawDotMap(dotMapData[currentTime]);

// ボタンにイベントリスナーを追加
document.getElementById("upButton").addEventListener("click", onUpButtonClick);
document.getElementById("downButton").addEventListener("click", onDownButtonClick);
document.getElementById("idUpButton").addEventListener("click", onIDUpButtonClick);
document.getElementById("idDownButton").addEventListener("click", onIDDownButtonClick);

// ツールチップを格納するdiv要素を作成
d3.select("#dotmap-container")
  .append("div")
  .attr("id", "tooltip") 
  .attr("class", "hidden")
  .append("p")
  .attr("id", "value");