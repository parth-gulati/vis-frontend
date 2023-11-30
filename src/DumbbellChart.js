import ReactApexChart from "react-apexcharts";
import React from "react";
import data from "./gender_data.json";

class DumbbellChart extends React.Component {
  constructor(props) {
    super(props);
    let covidStatus = this.props.covidStatus;
    
    let colorScheme = {
        Low: "#C5FFF8",
        Moderate: "#96EFFF",
        High: "#5FBDFF",
        "Very High": "#7B66FF",
      };

    let finData = [];

    for (let i = 1; i <= 10; i++) {
      finData.push({
        x: i,
        y: [
          data[0][`${this.props.covidStatus}_PSS_${i}`].toFixed(2),
          data[1][`${this.props.covidStatus}_PSS_${i}`].toFixed(2),
        ],
      });
    }

    this.state = {
      series: [
        {
          data: finData,
        },
      ],
      options: {
        chart: {
          height: 390,
          type: "rangeBar",
          zoom: {
            enabled: false,
          },
        },
        colors: Object.values(colorScheme).reverse(),
        plotOptions: {
          bar: {
            horizontal: false,
            isDumbbell: true,
            dumbbellColors: [Object.values(colorScheme).reverse()],
          },
        },
        title: {
          text: "Stress Disparity by Gender",
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: "top",
          horizontalAlign: "left",
          customLegendItems: ["Male", "Female"],
        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["#36BDCB"],
            inverseColors: false,
            stops: [0, 100],
          },
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedFilters != this.props.selectedFilters) {
      let finData = [];

      for (let i = 1; i <= 10; i++) {
        finData.push({
          x: i,
          y: [
            data[0][`${this.props.covidStatus}_PSS_${i}`].toFixed(2),
            data[1][`${this.props.covidStatus}_PSS_${i}`].toFixed(2),
          ],
        });
      }

      this.setState({ series: finData });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="rangeBar"
          height={390}
        />
      </div>
    );
  }
}

export default DumbbellChart;
