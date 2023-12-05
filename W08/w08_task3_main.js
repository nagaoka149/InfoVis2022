d3.csv("https://nagaoka149.github.io/InfoVis2022/W08/w08_task3_data.csv").then(data => {
    data.forEach(d => {
        d.amount = +d.amount;
    });

    var width = 512;
    var height = 512;
    var margin = { top: 10, right: 10, bottom: 10, left: 10 };
    var radius = Math.min(width, height) / 2;

    var svg = d3.select('#drawing_region')
        .attr('width', width)
        .attr('height', height +30)
        .append('g')
        .attr('transform', `translate(${width / 2 }, ${height / 2 + 30})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
        .sort(null) // ソートを無効化
        .value(d => d.amount);

    const arc = d3.arc()
        .innerRadius(radius / 3) // 内半径を変更
        .outerRadius(radius);

    const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    class PieChart {
        constructor(svg, data, options) {
            this.svg = svg;
            this.data = data;
            this.width = options.width || 512;
            this.height = options.height || 512;
            this.margin = options.margin || { top: 10, right: 10, bottom: 10, left: 10 };
            this.radius = Math.min(this.width, this.height) / 2;
            this.color = d3.scaleOrdinal(d3.schemeCategory10);
        }

        init() {
            // Draw arcs
            this.render();

            // Draw chart title
            this.svg.append('text')
                .attr('x', 0)
                .attr('y', -(this.height+30)/2)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .style('font-weight', 'bold')
                .text('Pie Chart "Production of Milk(2022)"');
        }

        update() {
            // Update data or settings if needed
            this.render();
        }

        render() {
            const pie = d3.pie()
                .sort(null)
                .value(d => d.amount);

            const arc = d3.arc()
                .innerRadius(this.radius / 3)
                .outerRadius(this.radius);

            const arcs = this.svg.selectAll('arc')
                .data(pie(this.data))
                .enter()
                .append('g')
                .attr('class', 'arc');

            arcs.append('path')
                .attr('d', arc)
                .attr('fill', (d, i) => this.color(i))
                .attr('stroke', 'white')
                .style('stroke-width', '2px');

            const arcLabel = d3.arc().innerRadius(this.radius / 2).outerRadius(this.radius);

            arcs.append('text')
                .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('fill', 'white')
                .style('font-size', '10px')
                .text(d => d.data.area);

        }
    }

    const pieChart = new PieChart(svg, data, { width, height, margin });
    pieChart.init();
}).catch(error => {
    console.log(error);
});