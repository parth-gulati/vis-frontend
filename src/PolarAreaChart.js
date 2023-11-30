import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PolarAreaChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 400)
      .attr('height', 400);

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const circle = d3.scaleLinear()
      .domain([0, 1])
      .range([0, radius]);

    const angle = d3.scaleLinear()
      .range([0, 2 * Math.PI])
      .domain([0, data[0].values.length]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const stack = d3.stack()
      .keys(data.map(d => d.values.map(val => val.value)));

    data.forEach((d, i) => {
      const path = d3.areaRadial()
        .curve(d3.curveCardinalClosed)
        .angle((d, i) => angle(i))
        .outerRadius(d => circle(d[1]))
        .innerRadius(d => circle(d[0]));

      g.append('path')
        .datum(stack(d.values))
        .attr('fill', color(i))
        .attr('stroke', 'black')
        .attr('d', path);
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PolarAreaChart;
