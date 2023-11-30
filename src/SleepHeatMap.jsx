import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SleepHeatmap = ({ data }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(heatmapRef.current)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);

    const colorScale = d3.scaleOrdinal()
      .domain([1, 2])
      .range(['#FF0000', '#00FF00']); // Assign different colors here

    const cells = svg.selectAll('.cell')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => (d.hoursSleep - 1) * 50)
      .attr('y', d => (d.rested - 1) * 50)
      .attr('width', 50)
      .attr('height', 50)
      .style('fill', d => colorScale(d.moreSleep)); // Use colorScale to assign colors

    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => (d.hoursSleep - 1) * 50 + 25)
      .attr('y', d => (d.rested - 1) * 50 + 25)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(d => d.moreSleep === 1 ? 'Yes' : 'No');

    // Add labels or text
    svg.append('text')
      .attr('x', 250)
      .attr('y', 490)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text('Hours Slept');

    svg.append('text')
      .attr('x', -250)
      .attr('y', 250)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Feeling Rested');

  }, [data]);

  return (
    <div ref={heatmapRef}></div>
  );
};

export default SleepHeatmap;
