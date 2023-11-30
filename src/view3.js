import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as d3Cloud from 'd3-cloud';
import './view3.css'
import LivingSituationChart from './HorizontalBar';

const View3 = () => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);
    const chartRef4 = useRef(null);
    const [toggleValue, setToggleValue] = useState(false);
   
        const [selectedOption, setSelectedOption] = useState('');
      
        const handleOptionChange = (e) => {
          setSelectedOption(e.target.value);
        };
  
    useEffect(() => {
      // D3.js code for visualization 1
      const svg1 = d3.select(chartRef1.current)
      .append('svg')
      .attr('width', 700)
      .attr('height', 500);
    
  
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

        // D3.js code for visualization 4
      const svg4 = d3.select(chartRef3.current)
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
          .style('fill', 'Teal')
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
              .style('fill', 'Teal')
              .style('font-size', d => `${d.size}px`);
          });
      }
  
  
      return () => {
        // Clean up D3.js code when component unmounts
        svg1.remove();
        svg2.remove();
        svg3.remove();
        svg4.remove();
      };
    }, []);

  
    
  
      return (
        <div className="visualization-page">
          <div className="container3">
  <div className="vis visualization-1">
    <h2>Illness</h2>
    <div className="visualization-chart" ref={chartRef1}></div>
  </div>
  <div className="vis visualization-2">
    <h2 className="visualization-title">Study</h2>
    <div>
      <label>
        <input
          type="radio"
          value="part-time"
          checked={selectedOption === 'part-time'}
          onChange={handleOptionChange}
        />
        Part-time
      </label>

      <label>
        <input
          type="radio"
          value="full-time"
          checked={selectedOption === 'full-time'}
          onChange={handleOptionChange}
        />
       Full-time
      </label>
    </div>
  </div>
  </div>
  <div className="vis visualization-3">
    <h2 className="visualization-title">Age Group Distributions</h2>
    <div className="visualization-chart" ref={chartRef3}></div>
  </div>

<div className="vis visualization-4">
    <h2 className="visualization-title"></h2>
    <div classame="visualization-chart" ref={chartRef4}>
    </div>
  </div>

        </div>
        
      );
    };
    
    export default View3;