import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AgeDistributionPyramid = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { ageGroup: '17-21', count: 500 },
      { ageGroup: '22-25', count: 300 },
      { ageGroup: '25-30', count: 250 },
      { ageGroup: '>30', count: 100 },
      // Add more age groups with respective counts
    ];

    const svg = d3.select(svgRef.current);

    const total = data.reduce((acc, d) => acc + d.count, 0);

    const pyramidHeight = 100;
    const pyramidWidth = 100;

    const pyramid = svg.append('g')
      .attr('transform', `translate(${pyramidWidth / 2},${pyramidHeight})`);

    const yScale = d3.scaleLinear()
      .domain([0, total])
      .range([0, pyramidHeight]);

    const xScale = d3.scaleLinear()
      .domain([0, total / 2, total])
      .range([0, pyramidWidth / 2, 0]);

    pyramid.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => (i < data.length / 2 ? -xScale(d.count) : 0))
      .attr('y', (d, i) => pyramidHeight - yScale(d.count))
      .attr('width', (d) => Math.abs(xScale(d.count * 2)))
      .attr('height', (d) => yScale(d.count))
      .attr('fill', 'pink');

  }, []);

  return (
    <svg ref={svgRef} width={400} height={400}></svg>
  );
};

export default AgeDistributionPyramid;
