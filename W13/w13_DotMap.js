// w13_DotMap.js

export function createDotMap(data) {
    const timestamps = data.map(row => parseFloat(row[0]));
    const headers = data[0].slice(1); // Skip the first column (timestamps)
    const rows = data.slice(1);

    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([timestamps[0], timestamps[timestamps.length - 1]])
        .range([0, width]);

    const dotMap = d3.select('#drawing_region_dotmap')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const g = dotMap.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const dots = g.selectAll('g')
        .data(rows)
        .enter().append('g')
        .attr('transform', (d, i) => `translate(${xScale(timestamps[i])},0)`);

    dots.selectAll('circle')
        .data(d => d.slice(1).map(Number))  // Convert data to numbers
        .enter().append('circle')
        .attr('cy', d => d)
        .attr('r', 3)
        .attr('fill', 'steelblue');

    // Adding tooltip for each dot
    dots.append('title')
        .text((d, i) => {
            const time = new Date(timestamps[i]).toLocaleTimeString();
            return `Timestamp: ${time}\n${headers.map((h, j) => `${h}: ${parseFloat(d[j + 1])}`).join('\n')}`;
        });

    // X-axis
    g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(timestamps.length));

    // X-axis label
    g.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20)
        .style('text-anchor', 'middle')
        .text('Timestamp');
}