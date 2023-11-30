import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LivingSituationChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', x(0))
      .attr('y', d => y(d.category))
      .attr('width', d => x(d.value) - x(0))
      .attr('height', y.bandwidth())
      .attr('fill', '#190064');

    svg.append('g')
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80, 's'));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LivingSituationChart;
