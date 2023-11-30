
import React, { Component } from "react";
import Chart from "react-apexcharts";
import data from './overtime_stress_avg.json'
import styled from "styled-components";

class PreCovidChart extends React.Component {

  constructor(props) {
    super(props);

    console.log(props)

    let colorScheme = {
        Low: "#C5FFF8",
        Moderate: "#96EFFF",
        High: "#5FBDFF",
        "Very High": "#7B66FF",
      }

      let finData = data
      .filter((x) => this.props.selectedFilters.includes(x.stress_level))
      .map((x) => {
        let obj = {};
        let arr = [];
        for (let i = 1; i <= 10; i++) {
          arr.push(x[`Pre_PSS_${i}`].toFixed(2));
        }
        obj.name = x.stress_level;
        obj.data = arr;

        return obj;
      });


    this.state = {
        selectedFilters: props.selectedFilters,
        series: finData,
        colorScheme: {
          Low: "#C5FFF8",
          Moderate: "#96EFFF",
          High: "#5FBDFF",
          "Very High": "#7B66FF",
        },
        colors: Object.values(colorScheme),
        options: {
          colors: Object.values(colorScheme),
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          tooltip: {
            x: {
              // format: "dd/MM/yy HH:mm",
            },
          },
        },
      };
    }

  componentDidUpdate(prevProps){
    if(prevProps.selectedFilters != this.props.selectedFilters){
      let finData = data.filter((x)=>this.props.selectedFilters.includes(x.stress_level)).map((x)=>{
        let obj = {}
        let arr = []
        for(let i=1;i<=10;i++){
          arr.push((x[`Pre_PSS_${i}`]).toFixed(2))
        }
        obj.name = x.stress_level
        obj.data = arr
  
        return obj
      })

      this.setState({series: finData})
    }

    

  }

  render() {
    return (
      <StyledDiv>
       <StyledH4> 
        Pre Covid Stress distribution of 10 months leading upto Covid
        </StyledH4>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
    margin-top: 10px;
`

const StyledH4 = styled.h4`
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-weight: 100; /* Thin font weight */
`;

export default PreCovidChart