import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const partition = data => {
      const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
      return d3.partition()
        .size([2 * Math.PI, radius])
        (root);
    };

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => Math.sqrt(d.y0))
      .outerRadius(d => Math.sqrt(d.y1));

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('font', '10px sans-serif');

    const root = partition(data);

    svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .selectAll('path')
      .data(root.descendants().slice(1))
      .enter().append('path')
      .attr('fill', d => color((d.children ? d : d.parent).data.name))
      .attr('d', arc)
      .append('title')
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join('/')}\n${d.value.toLocaleString()}`);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default SunburstChart;
