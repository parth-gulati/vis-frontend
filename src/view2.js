import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as d3Cloud from "d3-cloud";
import "./view2.css";
import DiagnosedDonutChart from "./DonutChart";
import BarChart from "./BarChart";
import LivingSituationChart from "./HorizontalBar";

const View2 = () => {
  const chartRef1 = useRef(null);
  // const chartRef2 = useRef(null);
  const chartRef3 = useRef();
  const chartRef4 = useRef(null);
  const chartRef5 = useRef(null);
  const [toggleValue, setToggleValue] = useState(false);
  const [data, setData] = useState(null);
  const aData = [
    { ageGroup: "17-19", count: 0 },
    { ageGroup: "20-23", count: 0 },
    { ageGroup: "24-27", count: 0 },
    { ageGroup: "28-31", count: 0 },
  ];
  const [fetchDataEnabled, setFetchDataEnabled] = useState(true);
  const [ageData, setAgeData] = useState(aData);
  const [isAgeData, setisAgeData] = useState(false);
  const [diagnosedData, setDiagnosedData] = useState([
    {
      yes: 0,
      no: 0,
      noAns: 0,
    },
  ]);
  const [isDiagData, setisDiagData] = useState(false);
  const [selectedBarValue, setSelectedVBarValue] = useState(null);
  const provinces = {
    1: "British Columbia",
    2: "Alberta",
    3: "Saskatchewan",
    4: "Manitoba",
    5: "Ontario",
    6: "Quebec",
    7: "New Brunswick",
    8: "Newfoundland and Labrador",
    9: "Nova Scotia",
    10: "Prince Edward Island",
    11: "Yukon Territory",
    12: "Northwest Territories",
    13: "Nunavut",
  };
  //                    {'British Columbia': "23",  'Alberta': "23", 'Saskatchewan': "23", 'Manitoba': "23", 'Ontario': "23",  'Quebec':"23",
  // 'New Brunswick': "23",'Newfoundland and Labrador': "23", 'Nova Scotia': "23",  'Prince Edward Island' : "23",  'Yukon Territory': "23",
  // 'Northwest Territories' : "23",  'Nunavut' : "23"}
  const [selectedProvinces, setSelectedProvinces] = useState({});
  let provdata = {};

  const processProvData = (data) => {
    // Calculate the frequency of each province with 'Diagnosed' set to 'yes'
    const provinceFrequency = data.reduce((frequency, person) => {
      if (person.Diagnosis === "1") {
        frequency[person.Province] = (frequency[person.Province] || 0) + 1;
      }
      return frequency;
    }, {});

    for (let key in provinceFrequency) {
      if (
        provinceFrequency.hasOwnProperty(key) &&
        provinces.hasOwnProperty(key)
      ) {
        provdata[provinces[key]] = provinceFrequency[key];
      }
    }
    setSelectedProvinces(provdata);
  };

  const processDiagData = (data) => {
    const updatedDiagData = [...diagnosedData];
    updatedDiagData[0]["yes"] = 0;
    updatedDiagData[0]["no"] = 0;
    updatedDiagData[0]["noAns"] = 0;
    data.forEach((row) => {
      if (row.Diagnosis == "1") {
        updatedDiagData[0]["yes"]++;
      } else if (row.Diagnosis == "2") {
        updatedDiagData[0]["no"]++;
      } else {
        updatedDiagData[0]["noAns"]++;
      }
    });
    setDiagnosedData(updatedDiagData);
    setisDiagData(true);
  };

  const handleBarClick = (value) => {
    setFetchDataEnabled(false);
    const minAge = value.split("-")[0];
    const maxAge = value.split("-")[1];
    setSelectedVBarValue(value);
    // Filter the data based on the age range
    const filteredData = data.filter((d) => d.Age >= minAge && d.Age <= maxAge);
    // Extract the unique provinces from the filtered data
    // const provincesWithSelectedAges = [...new Set(filteredData.map((d) => d.Province))];

    processProvData(filteredData);
    processDiagData(filteredData);
  };

  useEffect(() => {
    // let svg3;
    document.title = "Visualization view";

    // Fetch the CSV data and update the ageData state
    const fetchData = async () => {
      try {
        const csvData = await d3.csv("02_Student_Mental_Health_2021-10-10.csv");

        // Update the ageData state
        const updatedAgeData = [...ageData];

        csvData.forEach((row) => {
          const age = parseInt(row.Age);

          if (age >= 17 && age <= 19) {
            updatedAgeData[0].count++;
          } else if (age >= 20 && age <= 23) {
            updatedAgeData[1].count++;
          } else if (age >= 24 && age <= 27) {
            updatedAgeData[2].count++;
          } else if (age >= 28 && age <= 31) {
            updatedAgeData[3].count++;
          }
        });
        // setDiagnosedData(updatedDiagData);
        setAgeData(updatedAgeData); // Update the state with the new ageData
        processDiagData(csvData);
        setisAgeData(true);
        setisDiagData(true);
        processProvData(csvData);
        setData(csvData);
        // D3.js code for visualization 3
        //  svg3 = d3.select(chartRef3.current)
        //   .append('svg')
        //   .attr('width', 400)
        //   .attr('height', 300);

        // Add your D3.js visualization code for svg3 here using the csvData
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    if (fetchDataEnabled) {
      fetchData();
      // if(data){
      //   processProvData(data);
      // }
    }

    // D3.js code for visualization 1
    const svg1 = d3
      .select(chartRef1.current)
      .append("svg")
      .attr("width", 700)
      .attr("height", 500);

    // D3.js code for visualization 4
    const svg4 = d3
      .select(chartRef4.current)
      .append("svg")
      .attr("width", 400)
      .attr("height", 300);

    // D3.js code for visualization 5
    const svg5 = d3
      .select(chartRef4.current)
      .append("svg")
      .attr("width", 400)
      .attr("height", 300);

    const wordData = [
      { text: "ADHD", size: 40 },
      { text: "Anxiety", size: 30 },
      { text: "Depression", size: 50 },
      { text: "Bipolar", size: 25 },
      { text: "OCD", size: 35 },
      { text: "Panic Disorder", size: 15 },
      { text: "Eating Disorder", size: 35 },
      { text: "Anorexic", size: 25 },
      { text: "Social Anxiety", size: 35 },
      { text: "Social phobia", size: 30 },
    ];
    const draw = (words) => {
      svg5
        .append("g")
        .attr("transform", "translate(200, 150)")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", "steelblue")
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
        )
        .text((d) => d.text)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      svg5
        .selectAll("text")
        .on("mouseover", () => {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill", "orange")
            .style("font-size", (d) => `${d.size + 5}px`);
        })
        .on("mouseout", () => {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill", "steelblue")
            .style("font-size", (d) => `${d.size}px`);
        });
    };

    const layout = d3Cloud()
      .size([400, 300])
      .words(wordData)
      .padding(5)
      .rotate(() => (Math.random() - 0.5) * 90)
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    //map

    var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "hidden tooltip");

    var projection = d3
      .geoAlbers()
      .center([60.4, 70.5])
      .parallels([45, 70])
      .scale(650)
      .translate([0.65 * 700, 0.1 * 500]);

    var path = d3.geoPath().projection(projection);
    // D3.js code for Canadian map visualization
    d3.json(
      "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson"
    ).then((jsondata) => {
      const colorScale = d3
        .scaleLinear()
        .domain([0, d3.max(Object.values(selectedProvinces))])
        .range(["#ffffff", "#ff0000"]);

      svg1
        .selectAll(".bc")
        .data(jsondata.features)
        .join("path")
        .attr("class", "province")
        .attr("d", path)
        // .style("fill", "#e6550d")
        // .attr('class', 'change')
        .attr("class", (d) => {
          const provinceName = d.properties.name;
          const frequency = selectedProvinces[provinceName];
          return frequency ? "change province" : "province"; // Use a default color if frequency is not available
          // return 'change'
        });

      svg1
        .selectAll(".province")
        .on("click", function (e, d) {
          // Handle province selection here
          d3.select(this)
            .attr("class", "selected-province")
            .attr('class', 'change')
            .style("fill", "pink");
          tooltip.classed("hidden", true);
          const p = d.properties.name;
          setFetchDataEnabled(false);
          setSelectedProvinces({ [p]: "23" });
        })
        .on("mousemove", (e, d) => {
          var mousePosition = [e.x, e.y];
          tooltip
            .classed("hidden", false)
            .attr(
              "style",
              "left:" +
                (mousePosition[0] + 15) +
                "px; top:" +
                (mousePosition[1] - 35) +
                "px"
            )
            .html(d.properties.name);
        })
        .on("mouseout", function () {
          tooltip.classed("hidden", true);
        });
    });

    return () => {
      // Clean up D3.js code when component unmounts
      svg1.remove();
      svg4.remove();
    };
  }, [selectedBarValue, setDiagnosedData, setisDiagData]);

  const employmentData = {
    name: "Employment Status",
    children: [
      { name: "Full-time", value: 20 },
      { name: "Part-time", value: 15 },
      { name: "Not Employed", value: 30 },
      // Add more employment status categories as needed
    ],
  };

  const handleToggleChange = () => {
    setToggleValue(!toggleValue);
  };

  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const livingSituationData = [
    { category: "Residences/On-campus", value: 25 },
    { category: "Off-campus with family", value: 40 },
    { category: "Off-campus with friends/roommates", value: 30 },
    { category: "Off-campus alone", value: 20 },
  ];

  return (
    <div className="visualization-page">
      <div className="container2">
        <div className="vis visualization-1">
          <h2>Demographic Chart</h2>
          <div className="visualization-chart" ref={chartRef1}></div>
        </div>
        <div className="vis visualization-2">
          <h2 className="visualization-title">Diagnosed</h2>
          <div className="visualization-chart" >
            {isDiagData && (
              <DiagnosedDonutChart diagnosedData={diagnosedData[0]} />
            )}
          </div>
        </div>
        <div className="vis visualization-3">
          <h2 className="visualization-title">Age Group Distributions</h2>
          <div className="visualization-chart">
            {isAgeData && (
              <BarChart ageData={ageData} onBarClick={handleBarClick} />
            )}
          </div>
        </div>
      </div>
      <div></div>
      <div className="hh">
        <div className="vis visualization-4">
          <h2 className="visualization-title"></h2>
          <div classame="c4" ref={chartRef4}>
            <div className="toggle-switch">
              <div>
                <span>International: </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={toggleValue}
                    onChange={handleToggleChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="gender">
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
            <div className="l1">
              {" "}
              <LivingSituationChart data={livingSituationData} />
            </div>
          </div>
        </div>
        {/* <div className="vis visualization-5">
  <div classame="c4" ref={chartRef5}>

  </div>

  </div> */}
      </div>
    </div>
  );
};

export default View2;
