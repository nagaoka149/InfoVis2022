d3.csv("https://nagaoka149.github.io/InfoVis2022/W04/w04_task1_data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:40, right:40, bottom:60, left:40}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 512,
            height: config.height || 512,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);
            
        // グラフ描画エリア全体を包括するためのグループ要素を作成し、マージンを適用
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] ); // Y軸の方向を下から上に変更

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6)
            .tickSize(-self.inner_height) // X軸の目盛り線の長さを調整
            .tickPadding(8); // 目盛りの軸からの距離を調整

        self.yaxis = d3.axisLeft( self.yscale ) // Y軸の作成
            .ticks(6)
            .tickSize(-self.inner_width) // Y軸の目盛り線の長さを調整
            .tickPadding(8); // 目盛りの軸からの距離を調整

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g') // Y軸を追加
            .attr('transform', `translate(0, 0)`);

        // タイトルを追加
        self.svg.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top-10)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('font-weight', 'bold')
            .text('Chart Title');

        // X軸ラベルを追加
        self.svg.append('text')
            .attr('x', self.config.width / 2 )
            .attr('y', self.config.height - self.config.margin.bottom / 2 +10)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .text('X-label');

        // Y軸ラベルを追加
        self.svg.append('text')
            .attr('transform', `rotate(-90)`)
            .attr('x', -self.config.height / 2 -20)
            .attr('y', self.config.margin.left / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .text('Y-label');

        // X軸の最小値ラベルを追加
        self.svg.append('text')
            //.attr('transform', `rotate(-90)`)
            .attr('x', self.config.margin.left)
            .attr('y', self.config.height - self.config.margin.bottom / 2)
            .attr('text-anchor', 'start')
            .style('font-size', '10px')
            .text('x-min');
    
        // X軸の最大値ラベルを追加
        self.svg.append('text')
            //.attr('transform', `rotate(-90)`)
            .attr('x', self.config.width - self.config.margin.right)
            .attr('y', self.config.height - self.config.margin.bottom / 2)
            .attr('text-anchor', 'end')
            .style('font-size', '10px')
            .text('x-max');
    
        // Y軸の最小値ラベルを追加
        self.svg.append('text')
            .attr('x', self.config.margin.left -35)
            .attr('y', self.config.height - self.config.margin.bottom + 15)
            .attr('text-anchor', 'start')
            .style('font-size', '10px')
            .text('y-min');
    
        // Y軸の最大値ラベルを追加
        self.svg.append('text')
            .attr('x', self.config.margin.left -35)
            .attr('y', self.config.margin.top -15)
            .attr('text-anchor', 'start')
            .style('font-size', '10px')
            .text('y-max');
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        const circleResize = 2; // 円の半径を指定

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r / circleResize);

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group // Y軸を描画
            .call( self.yaxis );
    }
}
