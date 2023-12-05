d3.csv("https://nagaoka149.github.io/InfoVis2022/W04/w04_task2_data.csv").then(data => {
    data.forEach(d => {
        d.month = +d.month;
        d.USD = +d.USD;
    });

    var width = 512;
    var height = 512;
    var margin = {top: 10, right: 10, bottom: 40, left: 60};

    var svg = d3.select('#drawing_region')
        .attr('width', width)
        .attr('height', height);

    const inner_width = width - margin.left - margin.right;
    const inner_height = height - margin.top - margin.bottom;

    // Create LineChart instance
    const line_chart = new LineChart(svg, data, { width, height, margin });

    // Draw the line chart
    line_chart.update();
}).catch(error => {
    console.log(error);
});

class LineChart {
    constructor(svg, data, options) {
        this.svg = svg;
        this.data = data;
        this.width = options.width || 512;
        this.height = options.height || 512;
        this.margin = options.margin || { top: 10, right: 10, bottom: 10, left: 10 };

        this.init();
    }

    init() {
        const { width, height, margin } = this;

        this.chart = this.svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        this.inner_width = width - margin.left - margin.right;
        this.inner_height = height - margin.top - margin.bottom;

        this.xscale = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.month)])
            .range([0, this.inner_width]);

        this.yscale = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.USD)])
            .range([this.inner_height, 0]);

        this.xaxis = d3.axisBottom(this.xscale)
            .ticks(5)
            .tickSizeOuter(0);

        this.yaxis = d3.axisLeft(this.yscale)
            .ticks(5)
            .tickSizeOuter(0);

        this.xaxis_group = this.chart.append('g')
            .attr('transform', `translate(0, ${this.inner_height})`)
            .call(this.xaxis);

        this.yaxis_group = this.chart.append('g')
            .call(this.yaxis);
    }

    update() {
        const area = d3.area()
            .x(d => this.xscale(d.month))
            .y1(d => this.yscale(d.USD))
            .y0(this.inner_height);
        
        this.chart.append('path')
            .attr('d', area(this.data))
            .attr('stroke', 'black')
            .attr('fill', 'gray'); // 領域の塗りつぶし色を変更

         // データ点の描画
         this.chart.selectAll("circle")
             .data(this.data)
             .enter().append("circle")
             .attr("cx", d => this.xscale(d.month))
             .attr("cy", d => this.yscale(d.USD))
             .attr("r", 4) // 円の半径
             .attr("fill", "black"); // 円の塗りつぶし色（例えば red に設定）

        
    }
}