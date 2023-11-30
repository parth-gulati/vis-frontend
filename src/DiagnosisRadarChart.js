import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DiagnosisRadarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', 400)
      .attr('height', 400);

    const radarChart = {
      w: 300,
      h: 400,
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
      maxValue: 1, // Adjust the maximum value as needed based on your data
      levels: 5,
      roundStrokes: true,
      color: d3.scaleOrdinal().range(['#6F257F', '#CA0D59']), // Adjust the colors as needed
    };

    const formatPercent = d3.format('.0%');

    // Transforming data to match the expected structure
    const radarData = data.map((d) => ({
      parameter: d.parameter,
      values: d.values.map((v) => ({ category: v.category, value: v.value })),
    }));

    // Rest of the code remains unchanged...
  }, [data]);

  // Rest of the code remains unchanged...

  return <div ref={chartRef}></div>;
};

export default DiagnosisRadarChart;
