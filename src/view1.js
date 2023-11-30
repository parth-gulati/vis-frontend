import React, { useEffect, useRef, useState } from 'react';
import SleepHeatmap from './SleepHeatMap';
import AgeDistributionPyramid from './AgeDistributionPyramid';
import PolarAreaChart from './PolarAreaChart';
import DiagnosisRadarChart from './DiagnosisRadarChart';
import * as d3 from 'd3';
import * as d3Cloud from 'd3-cloud';
import * as topojson from 'topojson';

import './VisualizationPage.css';
// const DiagnosisRadarChart = ({ data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(chartRef.current)
//       .append('svg')
//       .attr('width', 400)
//       .attr('height', 400);

//     const radarChart = {
//       w: 300,
//       h: 400,
//       margin: { top: 20, right: 20, bottom: 20, left: 20 },
//       maxValue: 0.5,
//       levels: 5,
//       roundStrokes: true,
//       color: d3.scaleOrdinal().range(['#6F257F', '#CA0D59']),
//     };

//     const formatPercent = d3.format('.0%');

//     const radarData = data.map((d) => ({
//       parameter: d.parameter,
//       values: d.values.map((v) => v.value),
//     }));

//     const wrap = (text, width) => {
//       text.each(function () {
//         const text = d3.select(this);
//         const words = text.text().split(/\s+/).reverse();
//         let word;
//         let line = [];
//         let lineNumber = 0;
//         const lineHeight = 1.1; // ems
//         const y = text.attr('y');
//         const dy = parseFloat(text.attr('dy'));
//         let tspan = text
//           .text(null)
//           .append('tspan')
//           .attr('x', 0)
//           .attr('y', y)
//           .attr('dy', dy + 'em');
//         while ((word = words.pop())) {
//           line.push(word);
//           tspan.text(line.join(' '));
//           if (tspan.node().getComputedTextLength() > width) {
//             line.pop();
//             tspan.text(line.join(' '));
//             line = [word];
//             tspan = text
//               .append('tspan')
//               .attr('x', 0)
//               .attr('y', y)
//               .attr('dy', ++lineNumber * lineHeight + dy + 'em')
//               .text(word);
//           }
//         }
//       });
//     };
    
//     const allAxis = radarData[0].values.map((i, j) => radarData[0].values[j].category);
//     const total = allAxis.length;
//     const radius = Math.min(radarChart.w / 2, radarChart.h / 2);

//     console.log((2 * Math.PI)/radarData[0].values.length, (2 * (Math.PI)))
//     const angleSlice = (2 * Math.PI)/radarData[0].values.length;

//     const rScale = d3.scaleLinear().range([0, radius]).domain([0, radarChart.maxValue]);

//     const svg1 = svg
//       .append('g')
//       .attr('transform', `translate(${radarChart.w / 2},${radarChart.h / 2})`);

//     const axisGrid = svg1.append('g').attr('class', 'axisWrapper');

//     axisGrid
//       .selectAll('.levels')
//       .data(d3.range(1, radarChart.levels + 1).reverse())
//       .enter()
//       .append('circle')
//       .attr('class', 'gridCircle')
//       .attr('r', (d) => (radius / radarChart.levels) * d)
//       .style('fill', '#CDCDCD')
//       .style('stroke', '#CDCDCD')
//       .style('fill-opacity', 0.1)
//       .style('filter', 'url(#glow)');

//     const axis = axisGrid
//       .selectAll('.axis')
//       .data(allAxis)
//       .enter()
//       .append('g')
//       .attr('class', 'axis');

//     axis
//       .append('line')
//       .attr('x1', 0)
//       .attr('y1', 0)
//       .attr('x2', (d, i) => rScale(radarChart.maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
//       .attr('y2', (d, i) => rScale(radarChart.maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
//       .attr('class', 'line')
//       .style('stroke', 'white')
//       .style('stroke-width', '2px');

//     axis
//       .append('text')
//       .attr('class', 'legend')
//       .style('font-size', '11px')
//       .attr('text-anchor', 'middle')
//       .attr('dy', '0.35em')
//       .attr('x', (d, i) => rScale(radarChart.maxValue * 1.25) * Math.cos(angleSlice * i - Math.PI / 2))
//       .attr('y', (d, i) => rScale(radarChart.maxValue * 1.25) * Math.sin(angleSlice * i - Math.PI / 2))
//       .text((d) => d)
//       .call(wrap, 60);

//     const radarLine = d3
//       .lineRadial()
//       .curve(d3.curveLinearClosed)
//       .radius((d) => rScale(d.value))
//       .angle((d, i) => i * angleSlice);

//     if (radarChart.roundStrokes) {
//       radarLine.curve(d3.curveCardinalClosed);
//     }

//     const blobWrapper = svg1.selectAll('.radarWrapper').data(radarData).enter().append('g').attr('class', 'radarWrapper');

//     blobWrapper
//       .append('path')
//       .attr('class', 'radarArea')
//       .attr('d', (d) => radarLine(d.values))
//       .style('fill', (d, i) => radarChart.color(i))
//       .style('fill-opacity', 0.5);

//     blobWrapper
//       .append('path')
//       .attr('class', 'radarStroke')
//       .attr('d', (d) => {console.log(d.values);radarLine(d.values)})
//       .style('stroke-width', '2px')
//       .style('stroke', (d, i) => radarChart.color(i))
//       .style('fill', 'none');

//     const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('display', 'none');

//     const mouseover = function (event, d) {
//       const [x, y] = d3.pointer(event);
//       tooltip.style('display', 'block').style('left', x + 10 + 'px').style('top', y - 25 + 'px').html(() => {
//         let html = `<strong>${d.parameter}</strong><br>`;
//         d.values.forEach((value) => {
//           html += `${value.category}: ${formatPercent(value.value)}<br>`;
//         });
//         return html;
//       });
//     };

//     const mouseout = function () {
//       tooltip.style('display', 'none');
//     };

//     blobWrapper
//       .selectAll('.radarCircle')
//       .data((d) => {
//         console.log(d)
//         return d.values
//       })
//       .enter()
//       .append('circle')
//       .attr('class', 'radarCircle')
//       .attr('r', 3)
//       .attr('cx', (d, i) =>  rScale(d) * Math.cos(angleSlice * i - Math.PI/2))
//       .attr('cy', (d, i) => rScale(d) * Math.sin(angleSlice * i - Math.PI/2))
//       .style('fill', (d) => radarChart.color(d.category))
//       .style('fill-opacity', 0.8)
//       .on('mouseover', mouseover)
//       .on('mouseout', mouseout);

//     const legend = svg1
//       .selectAll('.legend')
//       .data(radarData[0].values.map((d) => d.category))
//       .enter()
//       .append('g')
//       .attr('class', 'legend')
//       .attr('transform', (d, i) => `translate(0, ${i * 20})`);

//     legend
//       .append('rect')
//       .attr('x', radarChart.w - 18)
//       .attr('width', 18)
//       .attr('height', 18)
//       .style('fill', (d) => radarChart.color(d));

//     legend
//       .append('text')
//       .attr('x', radarChart.w - 24)
//       .attr('y', 9)
//       .attr('dy', '0.35em')
//       .style('text-anchor', 'end')
//       .text((d) => d);

//     return () => {
//       svg.selectAll('*').remove();
//     };
//   }, [data]);

//   return <div ref={chartRef}></div>;
// };
const View1 = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const [toggleValue, setToggleValue] = useState(false);

  useEffect(() => {
    // D3.js code for visualization 1
    const svg1 = d3.select(chartRef1.current)
    .append('svg')
    .attr('width', 400)
    .attr('height', 300);
  
  const wordData = [
    { text: 'ADHD', size: 40 },
    { text: 'Anxiety', size: 30 },
    { text: 'Depression', size: 50 },
    { text: 'Bipolar', size: 25 },
    { text: 'OCD', size: 35 },
    { text: 'Panic Disorder', size: 15 },
    { text: 'Eating Disorder', size: 35 },
    { text: 'Anorexic', size: 25 },
    { text: 'Social Anxiety', size: 35 },
    { text: 'Social phobia', size: 30 },
  ];
  
  const layout = d3Cloud()
    .size([400, 300])
    .words(wordData)
    .padding(5)
    .rotate(() => (Math.random() - 0.5) * 90)
    .fontSize(d => d.size)
    .on('end', draw);
  
  layout.start();
  
  function draw(words) {
    svg1.append('g')
      .attr('transform', 'translate(200, 150)')
      .selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', d => `${d.size}px`)
      .style('fill', 'steelblue')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
      .text(d => d.text)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1);
  
    svg1.selectAll('text')
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill', 'orange')
          .style('font-size', d => `${d.size + 5}px`);
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill', 'steelblue')
          .style('font-size', d => `${d.size}px`);
      });
  }
  

    // D3.js code for visualization 2
    var svg2 = d3.select(chartRef2.current)
      .append('svg')
      .attr('width', 800)
      .attr('height', 600);

    // D3.js code for visualization 3
    const svg3 = d3.select(chartRef3.current)
      .append('svg')
      .attr('width', 400)
      .attr('height', 300);

    //   const svg = d3.select(chartRef1.current)
    //   .append('svg')
    //   .attr('width', 400)
    //   .attr('height', 300);

    // const projection = d3.geoMercator()
    //   .scale(600)
    //   .center([-95, 60]);

    // const path = d3.geoPath(projection);

    // var width = 800,
    //         height = 700;
    //      svg2.append('g')
    //         .attr('width', width)
    //         .attr('height', height);
        var tooltip = d3.select('body').append('div')
			      .attr('class', 'hidden tooltip');

      	var projection = d3.geoAlbers()
          .center([45.4, 75.5])
          .parallels([45, 70])
          .scale(650)
          .translate([0.65 * 800, 0.10 * 600]);

      	var path = d3.geoPath()
		      .projection(projection);
    // D3.js code for Canadian map visualization
    d3.json('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson').then(function(jsondata) {
      // console.table(jsondata.features.length);
      // console.table(jsondata.features[11].properties.name);
    
      svg2.selectAll('.bc')
        .data(jsondata.features)
        .join('path')
          .attr('class', 'province') 
          .attr('d', path)
          .on('mousemove', function(e, d) {
              var mousePosition = [e.x, e.y];
              console.log(mousePosition);
              tooltip.classed('hidden', false)
                  .attr('style', 'left:' + (mousePosition[0] + 15) +
                          'px; top:' + (mousePosition[1] - 35) + 'px')
                  .html(d.properties.name);
          })
          .on('mouseout', function() {
              tooltip.classed('hidden', true);
          });
  });

// Set up the scales
const xScale = d3.scaleBand()
  .domain(excerciseData.map(d => d.exerciseType))
  .range([50, 350])
  .padding(0.2);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(excerciseData, d => d.times)])
  .range([250, 50]);

const radiusScale = d3.scaleSqrt()
  .domain([0, d3.max(excerciseData, d => d.times)])
  .range([0, 20]);

// Draw the bubbles
svg3.selectAll('circle')
  .data(excerciseData)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.exerciseType) + xScale.bandwidth() / 2)
  .attr('cy', 300)
  .attr('r', 0)
  .attr('fill', (d, i) => {
    const colors = ['steelblue', 'orange', 'green'];
    return colors[i];
  })
  .on('mouseover', function (e, d) {
    d3.select(this)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    // Show tooltip
    tooltip1
      .style('left', (e.pageX + 10) + 'px')
      .style('top', (e.pageY - 25) + 'px')
      .style('display', 'inline-block')
      .html(d.exerciseType);
  })
  .on('mouseout', function () {
    d3.select(this)
      .attr('stroke', 'none');

    // Hide tooltip
    tooltip1.style('display', 'none');
  })
  .transition()
  .duration(1000)
  .delay((d, i) => i * 200)
  .attr('cy', d => yScale(d.times))
  .attr('r', d => radiusScale(d.times));

// Add labels
svg3.selectAll('text')
  .data(excerciseData)
  .enter()
  .append('text')
  .text(d => d.times)
  .attr('x', d => xScale(d.exerciseType) + xScale.bandwidth() / 2)
  .attr('y', 300)
  .attr('text-anchor', 'middle')
  .attr('fill', 'white')
  .transition()
  .duration(1000)
  .delay((d, i) => i * 200)
  .attr('y', d => yScale(d.times) + 5);

// Add axis labels
svg3.append('text')
  .text('Exercise Type')
  .attr('x', 200)
  .attr('y', 280)
  .attr('text-anchor', 'middle');

svg3.append('text')
  .text('Times')
  .attr('x', -150)
  .attr('y', 20)
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)');

// Add tooltip element
const tooltip1 = d3.select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('display', 'none');




  // const tooltip = d3.select('body')
  //   .append('div')
  //   .attr('class', 'tooltip')
  //   .style('display', 'block');

    return () => {
      // Clean up D3.js code when component unmounts
      svg1.remove();
      svg2.remove();
      svg3.remove();
    };
  }, []);

  const handleToggleChange = () => {
    setToggleValue(!toggleValue);
  };

    const [gender, setGender] = useState('');
  
    const handleGenderChange = (event) => {
      setGender(event.target.value);
    }

    const ExampleData = [
      {
        parameter: 'Age',
        values: [
          { category: 'Anxiety Disorder', value: 0.6 },
          { category: 'Depression', value: 0.4 },
          { category: 'Bipolar Disorder', value: 0.2 },
          { category: 'Schizophrenia', value: 0.3 },
          { category: 'PTSD', value: 0.5 },
        ],
      },
      {
        parameter: 'Gender',
        values: [
          { category: 'Anxiety Disorder', value: 0.7 },
          { category: 'Depression', value: 0.3 },
          { category: 'Bipolar Disorder', value: 0.4 },
          { category: 'Schizophrenia', value: 0.2 },
          { category: 'PTSD', value: 0.6 },
        ],
      },
      // Add more data for other parameters
    ];

    const excerciseData = [
      { exerciseType: 'Strenuous', times: 32 },
      { exerciseType: 'Moderate', times: 78 },
      { exerciseType: 'Mild', times: 57 },
    ];
  
    const sleepdata = [
      { hoursSleep: 5, rested: 1, moreSleep: 1 },
      { hoursSleep: 7, rested: 2, moreSleep: 2},
      { hoursSleep: 6, rested: 3, moreSleep: 1},
      { hoursSleep: 8, rested: 1, moreSleep: 2},
      { hoursSleep: 7, rested: 1, moreSleep: 1 },
      { hoursSleep: 7, rested: 3, moreSleep: 2 },
      { hoursSleep: 6, rested: 3, moreSleep: 1 },
      { hoursSleep: 8, rested: 1, moreSleep: 2 },
      // Add more data objects as needed
    ];

    const ageData = [
      {
        values: [
          { age: '0-9', value: 0.2 },
          { age: '10-19', value: 0.6 },
          // Include more age ranges and values (values should be between 0 and 1)
        ]
      },
      // Add more groups with their respective values
    ];
    

    return (
      <div className="visualization-page">
        <div className="interact-elm">
          <div className="toggle-switch">
            <span>International: </span>
            <label className="switch">
              <input type="checkbox" checked={toggleValue} onChange={handleToggleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="interact-elm">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value="" onChange={handleGenderChange}>
              <option value="">Select Gender</option>
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className='top-layer'>
        <div className="visualization visualization-1">
        <h2>Visualization 1</h2>
        <div className="visualization-chart" ref={chartRef1}>
          <DiagnosisRadarChart data={ExampleData} />
        </div>
      </div>
      <div className="visualization visualization-3">
          <h2 className="visualization-title">Visualization 3</h2>
          <div className="visualization-chart" ref={chartRef3}>
          </div>
        </div>
        </div>
        
        <div className="visualization visualization-2">
          <h2 className="visualization-title">Visualization 2</h2>
          <div className="visualization-chart" ref={chartRef2}><SleepHeatmap data={sleepdata} /></div>
        </div>
        <PolarAreaChart data={ageData} />
      </div>
    );
  };
  
  export default View1;
