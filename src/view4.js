import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import stressData from "./modified.json";
import styled from "styled-components";
import FilterComponent from "./FilterComponent";
import PostCovidChart from "./PostCovidChart";
import PreCovidChart from "./PreCovidChart";
import DumbbellChart from './DumbbellChart'

const View4 = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const sizeref = 31250000.0;
  const [data1, setdata1] = useState(null);
  const [data2, setdata2] = useState(null);
  const [covidStatus, setCovidStatus] = useState('Pre');

  const handleToggle = () => {
    setCovidStatus(covidStatus === 'Pre' ? 'Post' : 'Pre');
  };

  const colorScheme = {
    Low: "#C5FFF8",
    Moderate: "#96EFFF",
    High: "#5FBDFF",
    "Very High": "#7B66FF",
  };

  const layout1 = {
    title:
      "Total Exercise vs. Total Academic Hours (Bubble Size: Total Stress, Color: Stress Level)",
    xaxis: {
      title: "Total Exercise",
      gridcolor: "white",
      type: "log",
      gridwidth: 2,
    },
    yaxis: {
      title: "Total Academic Hours",
      gridcolor: "white",
      gridwidth: 2,
    },
    paper_bgcolor: "rgb(243, 243, 243)",
    plot_bgcolor: "rgb(243, 243, 243)",
    width: 800,
  };

  let datax = [
    {
      type: "funnelarea",
      values: [5, 4, 3, 2, 1],
      text: ["Low", "Moderate", "High", "Very High"],
      marker: {
        colors: Object.values(colorScheme)
      },
      textfont: { family: "Old Standard TT", size: 13, color: "black" },
      opacity: 0.65,
    },
  ];

  const layout2 = {
    funnelmode: "stack",
    showlegend: "True",
    paper_bgcolor: "rgb(243, 243, 243)",
    plot_bgcolor: "rgb(243, 243, 243)",
    width: 300,
    title: "Current distribution"
  };

  useEffect(() => {
    let x = [];
    let y = [];
    let text = [];
    let size = [];
    let name = [];
    let color = [];

    let data = {};
    const count = {};

    for (const label in stressData) {
      if (stressData.hasOwnProperty(label)) {
        const strData = stressData[label];
        if (selectedFilters.includes(strData["stress_level"])) {
            let z = strData['stress_level']
          if(count.hasOwnProperty(z)){
            count[z]+=1
          }
          else{
            count[z]=1
          }
          x.push(strData["exercise_time_avg"]);
          y.push(strData["study_time"]);
          name.push(label);
          text.push(strData["text"]);
          size.push(strData["size"]);
          color.push(colorScheme[strData["stress_level"]]);
        }
      }
    }

    data = {
      x,
      y,
      mode: "markers",
      text,
      marker: {
        size: size,
        sizeref,
        sizemode: "area",
        name,
        color,
      },
    };

    let datax = [
        {
          type: "funnelarea",
          values: [count['Low'], count['Moderate'], count['High'], count['Very High']],
          text: ["Low", "Moderate", "High", "Very High"],
          names: ["Low", "Moderate", "High", "Very High"],
          
          marker: {
            colors: Object.values(colorScheme),
            names: ["Low", "Moderate", "High", "Very High"],
          },
          textfont: {family: "Arial", size: 13, color: "black" },
          opacity: 0.65,
        },
      ];

    console.log(data);

    setdata2(datax)

    setdata1(data);
  }, [selectedFilters]);

  return (
    <Container>
        <StyledH1>Student Stress during Covid: an Overview</StyledH1>
      <FilterComponent
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {data1 && <StyledPlot data={[data1]} layout={layout1} />}
      {data2 && <Plot data={data2} layout={layout2} />}
      <CovidButton active={covidStatus === 'Pre'} onClick={() => handleToggle('Pre')}>
        Pre COVID
      </CovidButton>
      <CovidButton active={covidStatus === 'Post'} onClick={() => handleToggle('Post')}>
        Post COVID
      </CovidButton>
      {covidStatus === 'Pre' && <PreCovidChart selectedFilters={selectedFilters}/>}
      {covidStatus === 'Post' && <PostCovidChart selectedFilters={selectedFilters}/>}
      <DumbbellChart covidStatus={covidStatus}/>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
`;

const StyledPlot = styled(Plot)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjust the shadow as needed */
  margin: 16px;
`;

const StyledH1 = styled.h1`
text-align: center;
font-family: 'Arial', sans-serif; /* or your preferred font */
/* Add any other styles you need */
`;

const CovidButton = styled.button`
  background-color: ${(props) => (props.active ? '#3498db' : '#ecf0f1')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 1px solid #3498db;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  outline: none;
`;

export default View4;