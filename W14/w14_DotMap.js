// w14_DotMap.js

// Function to create a DotMap
function createDotMap(data) {
    // Extract necessary data from the CSV file
    const timestamps = data.map(row => row.Time);
    const headers = Object.keys(data[0]).slice(1); // Skip the first column (Time)
    const rows = data.map(row => headers.map(header => +row[header]));

    // Set up the DotMap dimensions
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create scales for X and Y axes
    const xScale = d3.scaleLinear()
        .domain([timestamps[0], timestamps[timestamps.length - 1]])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(rows.flat())])
        .range([height, 0]);

    // Create SVG container for DotMap
    const dotMap = d3.select('#dotmap-container')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const g = dotMap.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create groups for each data point
    const dots = g.selectAll('g')
        .data(rows)
        .enter().append('g')
        .attr('transform', (d, i) => `translate(${xScale(timestamps[i])},${yScale(d[1])})`);

    // Append circles to represent data points
    dots.selectAll('circle')
        .data(d => d.slice(1))
        .enter().append('circle')
        .attr('cy', d => yScale(d))
        .attr('r', 3)
        .attr('fill', 'steelblue');

    // Adding tooltip for each dot
    dots.append('title')
        .text((d, i) => {
            const time = new Date(timestamps[i] * 1000).toLocaleTimeString();
            return `Timestamp: ${time}\n${headers.map((h, j) => `${h}: ${d[j + 1]}`).join('\n')}`;
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

// Export the function for external use
export { createDotMap };