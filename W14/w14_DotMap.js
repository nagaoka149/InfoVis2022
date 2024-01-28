// w14_DotMap.js
// w14_DotMap.js
const dotMapData = [
    [1, 10, 10, 25, 20, 30, 35, 10, 40, 60, 20, 50, 35],
    [2, 0, 10, 25, 25, 30, 35, 10, 40, 50, 25, 45, 40],
    [3, 0, 0, 20, 20, 30, 35, 10, 40, 40, 25, 40, 40],
  ];
  
  // Function to create the dot map
  function createDotMap(data) {
    const svg = d3.select("#dotMapContainer");
  
    // Remove existing dots
    svg.selectAll("circle").remove();
  
    // Get the current time from the slider or other input
    const currentTime = getCurrentTime(); // Implement this function based on your UI
  
    // Add dots to the map for the current time
    svg.selectAll("circle")
      .data(data[currentTime].slice(1)) // Exclude the first element (time)
      .enter()
      .append("circle")
      .attr("cx", (_, i) => i * 50 + 50)
      .attr("cy", (_, i) => data[currentTime][2 * i + 2])
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("opacity", 0.7)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  }
  
  // Function to show tooltip on mouseover
  function handleMouseOver(d, i) {
    const tooltip = d3.select(".tooltip");
    tooltip.transition().duration(200).style("opacity", 0.9);
    tooltip.html(`Value: ${d}`)
      .style("left", `${d3.event.pageX}px`)
      .style("top", `${d3.event.pageY - 28}px`);
  }
  
  // Function to hide tooltip on mouseout
  function handleMouseOut() {
    const tooltip = d3.select(".tooltip");
    tooltip.transition().duration(500).style("opacity", 0);
  }
  
  // Function to get the current time from the slider or other input
  function getCurrentTime() {
    // Implement this function based on your UI to get the current time
    // For example, if you have a slider with an ID "timeSlider", you can use:
    // return +d3.select("#timeSlider").property("value");
  }
  
  // Call the function to create the dot map initially
  createDotMap(dotMapData);