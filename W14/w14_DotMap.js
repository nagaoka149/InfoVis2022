// w14_DotMap.js

// グローバル変数
let dotMapData = [
    [1, 10, 10, 25, 20, 30, 35, 10, 40, 60, 20, 50, 35],
    [2, 0, 10, 25, 25, 30, 35, 10, 40, 50, 25, 45, 40],
    [3, 0, 0, 20, 20, 30, 35, 10, 40, 40, 25, 40, 40],
  ];
  let currentTimeIndex = 0;
  
  function updateDotMap() {
    // ドットマップを更新するコードをここに追加
  
    // 例: ドットを描画する
    const svg = d3.select("#dotMapSvg");
  
    const timeIndex = currentTimeIndex % dotMapData.length;
  
    const dots = svg.selectAll("circle").data(dotMapData[timeIndex].slice(1));
  
    dots
      .enter()
      .append("circle")
      .attr("cx", (d, i) => (i + 1) * 50) // 適切な x 座標を計算する
      .attr("cy", d => d * 5) // 適切な y 座標を計算する
      .attr("r", 5)
      .attr("fill", "red");
  
    dots.exit().remove();
  }
  
  // up ボタンをクリックしたときの処理
  function onUpButtonClick() {
    currentTimeIndex += 1;
    updateDotMap();
  }
  
  // down ボタンをクリックしたときの処理
  function onDownButtonClick() {
    currentTimeIndex -= 1;
    if (currentTimeIndex < 0) {
      currentTimeIndex = dotMapData.length - 1;
    }
    updateDotMap();
  }
  
  // 初回描画
  updateDotMap();
  
  // ボタンにイベントリスナーを追加
  document.getElementById("upButton").addEventListener("click", onUpButtonClick);
  document.getElementById("downButton").addEventListener("click", onDownButtonClick);
