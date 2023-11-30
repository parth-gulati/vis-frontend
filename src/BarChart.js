import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

const BarChart = ({ ageData , onBarClick }) => {
  const svgRef = useRef();
  let selectedValue;

  useEffect(() => {
    const margin = { top: 10, right: 20, bottom: 70, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(ageData.map(d => d.ageGroup));

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 1776]);

    const yScale = d3.scaleLinear()
      .domain([0, 1776])
      .range([height, 0]);

      const yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(d3.format("d"));

      svg.append('g')
        .call(yAxis);

    svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-45)');
  

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(ageData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.ageGroup))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth() - 10)
      .attr('height', d => height - y(d.count))
      .attr('fill', '#fee6ce');

      d3.select(svgRef.current)
      .selectAll('.bar')
      .on('click', function (event, d) {
        d3.selectAll('.bar').classed('selected', false);
        d3.selectAll('.bar').style('fill', '#fee6ce');
        d3.select(this).style('fill', 'green');
         selectedValue = d.ageGroup;
        onBarClick(selectedValue);
      });

      return () => {
        svg.remove();
      }
  }, [ageData, onBarClick, selectedValue]);

  return <div>
    <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>;
    <div>&nbsp;&nbsp;&nbsp; Click on the bars to see the changes.</div>
    </div>
};

export default BarChart;