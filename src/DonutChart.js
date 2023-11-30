import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const DiagnosedDonutChart = ({ ...diagnosedData }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
  

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal().range(['#e6550d', '#fdae6b', '#fee6ce']); 

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);
      const diagData = diagnosedData['diagnosedData'];
    const data = [
      { category: 'Yes', value: diagData.yes },
      { category: 'No', value: diagData.no },
      { category: 'No Answer', value: diagData.noAns },
    ];
    const path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

    const arc = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => color(d.data.category));

    arc.append('text')
      .attr('transform', d => `translate(${path.centroid(d)})`)
      .text(d => d.data.category)
      .style('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#fff');
  }, [diagnosedData]);

  return <svg ref={svgRef}></svg>;
};

export default DiagnosedDonutChart;
