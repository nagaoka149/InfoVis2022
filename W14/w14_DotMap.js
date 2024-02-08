// w14_DotMap.js

// グローバル変数
let dotMapData = [
    [[10, 10], [25, 20], [30, 35], [10, 40], [60, 20], [50, 35], ],
    [[0, 10], [25, 25], [30, 35], [10, 40], [50, 25], [45, 40], ],
    [[0, 0], [20, 20], [30, 35], [10, 40], [40, 25], [40, 40], ],
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

const timeText = svg.append("text")
    .attr("class", "current-time")
    .attr("x", margin.left)
    .attr("y", margin.top - 10) // 上部マージンより少し上に配置
    .style("font-size", "16px")
    .text(`Current Time: ${currentTime}`);

// x軸の描画
// y軸の描画
  svg.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(xScale));
  svg.append("g").attr("class", "y-axis").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

// 初期の時刻を設定
let currentTime = 0;

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
        .attr("fill", "steelblue");

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
  timeText.text(`Current Time: ${currentTime}`);

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
d3.select("#nextTimeButton").on("click", () => {
  currentTime = (currentTime + 1) % dotMapData.length; // 次の時刻へ
  drawDotMap(dotMapData[currentTime]); // DotMapを描画
});

// down ボタンをクリックしたときの処理
function onDownButtonClick() {
  currentTime = (currentTime - 1 + dotMapData.length) % dotMapData.length; // 前の時刻へ
  drawDotMap(dotMapData[currentTime]); // DotMapを描画
}

// up ボタンをクリックしたときの処理
function onUpButtonClick() {
  currentTime = (currentTime + 1) % dotMapData.length; // 次の時刻へ
  drawDotMap(dotMapData[currentTime]); // DotMapを描画
}

// 初回描画
drawDotMap(dotMapData[currentTime]);

// ボタンにイベントリスナーを追加
document.getElementById("upButton").addEventListener("click", onUpButtonClick);
document.getElementById("downButton").addEventListener("click", onDownButtonClick);

// ツールチップを格納するdiv要素を作成
d3.select("#dotmap-container")
  .append("div")
  .attr("id", "tooltip")  // ここを修正
  .attr("class", "hidden")
  .append("p")
  .attr("id", "value");