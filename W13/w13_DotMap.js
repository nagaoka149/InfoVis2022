// w13_DotMap.js

function createDotMap(data) {
    // Extract headers (indexes)
    const headers = data[0].slice(1); // Skip the first column (timestamps)
    const rows = data.slice(1);
  
    // Create the dot map
    const dotMap = d3.select('#drawing_region_dotmap')
      .append('svg')
      .attr('width', 600)
      .attr('height', 400);
  
    // Append dots to the dot map
    const dots = dotMap.selectAll('circle')
      .data(rows)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => i * 10) // Adjust spacing as needed
      .attr('cy', d => parseFloat(d[1])) // Use the y-coordinate (2_y) for vertical positioning
      .attr('r', 3) // Radius of the dots
      .attr('fill', 'steelblue'); // Dot color (you can customize)
  
    // Adding tooltip for each dot
    dots.append('title')
      .text((d, i) => `Index: ${i + 1}, Y-coordinate: ${parseFloat(d[1])}, X-coordinate: ${parseFloat(d[2])}`);
  }
  