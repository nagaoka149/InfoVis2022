class BarChart {
      constructor(config, data) {
          this.config = {
              parent: config.parent,
              width: config.width || 512,
              height: config.height || 512,
              margin: config.margin || { top: 10, right: 10, bottom: 20, left: 60 },
              orientation: config.orientation || 'vertical'
          };

          this.data = data;
          this.init();
          /*
          d3.select('#reverse').on('click', () => {
            this.data.reverse();
            this.update();
          });

          let ascending = false;
          d3.select('#ascend_descend').on('click', () => {
            if (ascending) {
                this.data.sort((a, b) => d3.descending(a.USD, b.USD));
                ascending = false;
            } else {
                this.data.sort((a, b) => d3.ascending(a.USD, b.USD));
                ascending = true;
            }
            this.update();
        });
        */
      }
  
      init() {
          let self = this;
  
          self.svg = d3.select(self.config.parent)
              .attr('width', self.config.width)
              .attr('height', self.config.height);
  
          self.chart = self.svg.append('g')
              .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
  
          self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
          self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
  
          if (self.config.orientation === 'vertical') {
              self.xscale = d3.scaleBand()
                  .domain(self.data.map(d => d.month))
                  .range([0, self.inner_width])
                  .paddingInner(0.1);
  
              self.yscale = d3.scaleLinear()
                  .domain([0, d3.max(self.data, d => d.USD)])
                  .range([self.inner_height, 0]);
          } else if (self.config.orientation === 'horizontal') {
              self.xscale = d3.scaleLinear()
                  .domain([1, d3.max(self.data, d => d.USD)])
                  .range([0, self.inner_width]);
  
              self.yscale = d3.scaleBand()
                  .domain(self.data.map(d => d.month))
                  .range([0, self.inner_height])
                  .paddingInner(0.1);
          }
  
          self.xaxis = d3.axisBottom(self.xscale)
              .ticks(5)
              .tickSizeOuter(0);
  
          self.yaxis = d3.axisLeft(self.yscale)
              .tickSizeOuter(0);
  
          self.xaxis_group = self.chart.append('g')
              .attr('transform', `translate(0, ${self.inner_height})`)
              .call(self.xaxis);
  
          self.yaxis_group = self.chart.append('g')
              .call(self.yaxis);
      }
  
      update() {
          let self = this;

          self.render();
      }
  
      render() {
          let self = this;

          self.chart.selectAll("rect")
              .data(self.data)
              .join("rect")
              .transition().duration(1000)
              .attr("x", d => self.config.orientation === 'vertical' ? self.xscale(d.month) : 0)
              .attr("y", d => self.config.orientation === 'vertical' ? self.yscale(d.USD) : self.yscale(d.month))
              .attr("width", d => self.config.orientation === 'vertical' ? self.xscale.bandwidth() : self.xscale(d.USD))
              .attr("height", d => self.config.orientation === 'vertical' ? self.inner_height - self.yscale(d.USD) : self.yscale.bandwidth())
              .style("fill", "black"); 

          console.log(self.chart.selectAll("rect").data());
  
          // Draw chart title
          self.svg.append('text')
              .attr('x', self.config.width / 2)
              .attr('y', self.config.margin.top - 10)
              .attr('text-anchor', 'middle')
              .style('font-size', '16px')
              .style('font-weight', 'bold')
              .text('Bar Chart "JPY-USD Transition(2023)"');
  
          // Draw X-axis label
          self.svg.append('text')
              .attr('x', self.config.width / 2)
              .attr('y', self.config.height - self.config.margin.bottom / 2 + 10)
              .attr('text-anchor', 'middle')
              .style('font-size', '14px')
              .style('font-weight', 'bold')
              .text('X-Label');
  
          // Draw Y-axis label
          self.svg.append('text')
              .attr('transform', `rotate(-90)`)
              .attr('x', -self.config.height / 2)
              .attr('y', self.config.margin.left / 2)
              .attr('text-anchor', 'middle')
              .style('font-size', '14px')
              .style('font-weight', 'bold')
              .text('Y-Label');
      }
  }
  
  // データの読み込みとBarChartの初期化
  d3.csv("https://nagaoka149.github.io/InfoVis2022/W04/w04_task2_data.csv")
      .then(data => {
          data.forEach(d => {
              d.month = +d.month;
              d.USD = +d.USD;
          });
  
          var config = {
              parent: '#drawing_region',
              width: 512,
              height: 512,
              margin: { top: 40, right: 40, bottom: 60, left: 60 },
              orientation: 'vertical' // ここでバーチャートの方向を設定
          };
  
          const bar_chart = new BarChart(config, data);

          bar_chart.update();

          d3.select('#reverse').on('click', d => {
            data.reverse();
            bar_chart.update();
            console.log("Data reversed! Bar chart updated.");
          });

          // Ascend/Descendボタンの処理
          let ascending = false;
          d3.select('#ascend_descend').on('click', d => {
              if (ascending) {
                  data.sort((a, b) => d3.descending(a.USD, b.USD));
                  ascending = false;
                  console.log("Data sorted in descending order! Bar chart updated.");
              } else {
                  data.sort((a, b) => d3.ascending(a.USD, b.USD));
                  ascending = true;
                  console.log("Data sorted in ascending order! Bar chart updated.");
              }
              bar_chart.update();
          });

      })
      .catch(error => {
          console.log(error);
      });