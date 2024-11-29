import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import SideNav from "./DashboardNav";
import { LineChart, PieChart, BarChart } from "@mui/x-charts";
import { useGetAllCaseQuery } from "../slices/caseApiSlice";

function Dashboard() {
  const [caseCount, setCaseCount] = useState({});
  const [lineGraphData, setLineGraphData] = useState({
    acquittal: [],
    sentenceReduction: [],
    caseNegotiation: []
  });
  const [xAxisData, setXAxisData] = useState([]);
  const [barChartData, setBarChartData] = useState({
    years: [],
    acquittal: [],
    sentenceReduction: [],
    caseNegotiation: []
  });

  const { data: cases, error } = useGetAllCaseQuery();

  useEffect(() => {
    if (Array.isArray(cases) && cases !== null) {
      const outcomes = cases.map(c => c.outcome).filter(outcome => outcome !== undefined && outcome !== null);
      const outcomeCount = outcomes.reduce((acc, outcome) => {
        acc[outcome] = (acc[outcome] || 0) + 1;
        return acc;
      }, {});
      setCaseCount(outcomeCount);

      // Process line graph data
      const processedLineData = processLineGraphData(cases);
      setLineGraphData(processedLineData.seriesData);
      setXAxisData(processedLineData.xAxis);

      // Process bar chart data
      const processedBarData = processBarChartData(cases);
      setBarChartData(processedBarData);
    }
  }, [cases]);

  // Function to process line graph data
  const processLineGraphData = (casesData) => {
    // Group cases by month
    const monthlyData = {};
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Initialize monthly data with zeros
    monthNames.forEach(month => {
      monthlyData[month] = {
        'Acquittal': 0,
        'Sentence Reduction': 0,
        'Case Negotiation': 0
      };
    });

    casesData.forEach(caseItem => {
      if (caseItem.aDate) {
        const date = new Date(caseItem.aDate);
        const monthKey = monthNames[date.getMonth()];

        // Safely increment the count for the specific outcome
        const outcome = caseItem.outcome || 'Unknown';
        if (monthlyData[monthKey].hasOwnProperty(outcome)) {
          monthlyData[monthKey][outcome] += 1;
        }
      }
    });

    // Prepare series data
    const seriesData = {
      acquittal: [],
      sentenceReduction: [],
      caseNegotiation: []
    };

    const xAxis = monthNames;

    // Fill in data for each series
    xAxis.forEach(month => {
      seriesData.acquittal.push(monthlyData[month]['Acquittal'] || 0);
      seriesData.sentenceReduction.push(monthlyData[month]['Sentence Reduction'] || 0);
      seriesData.caseNegotiation.push(monthlyData[month]['Case Negotiation'] || 0);
    });

    return { seriesData, xAxis };
  };

  // Function to process bar chart data
  const processBarChartData = (casesData) => {
    // Group cases by year and outcome
    const yearlyData = {};

    casesData.forEach(caseItem => {
      if (caseItem.aDate) {
        const year = new Date(caseItem.aDate).getFullYear();
        const outcome = caseItem.outcome || 'Unknown';

        if (!yearlyData[year]) {
          yearlyData[year] = {
            'Acquittal': 0,
            'Sentence Reduction': 0,
            'Case Negotiation': 0
          };
        }

        if (yearlyData[year].hasOwnProperty(outcome)) {
          yearlyData[year][outcome] += 1;
        }
      }
    });

    // Prepare bar chart data
    const years = Object.keys(yearlyData).sort();
    const acquittalData = years.map(year => yearlyData[year]['Acquittal'] || 0);
    const sentenceReductionData = years.map(year => yearlyData[year]['Sentence Reduction'] || 0);
    const caseNegotiationData = years.map(year => yearlyData[year]['Case Negotiation'] || 0);

    return {
      years,
      acquittal: acquittalData,
      sentenceReduction: sentenceReductionData,
      caseNegotiation: caseNegotiationData
    };
  };

  const pieData = Object.keys(caseCount).map((label, index) => ({
    id: index,
    value: caseCount[label],
    label: label
  }));

  const total = Object.values(caseCount).reduce((sum, count) => sum + count, 0);

  const percentages = Object.entries(caseCount).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()),
    percentage: ((value / total) * 100).toFixed(0) + "%"
  }));

  return (
    <div className="dashboard-container">
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Dashboard</div>
        <div className="dashboard-sm-header"> Statistical Overview</div>

        <div className="filter-container">
          <div className="filter-card">
            <div>Filter</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#9A9A9A"
            >
              <path d="M456.18-192Q446-192 439-198.9t-7-17.1v-227L197-729q-9-12-2.74-25.5Q200.51-768 216-768h528q15.49 0 21.74 13.5Q772-741 763-729L528-443v227q0 10.2-6.88 17.1-6.89 6.9-17.06 6.9h-47.88ZM480-498l162-198H317l163 198Zm0 0Z" />
            </svg>
          </div>
          <div className="filter-select-wrapper">
            <select className="filter-select">
              {barChartData.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="dashboard-stats-container">
          <div className="stats-card-container">
            {percentages.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="card-header">{stat.label} Rate</div>
                <div className="card-stat-nums">{stat.percentage}</div>
              </div>
            ))}
          </div>

          <div className="stats-graph-container">
            <div className="graph-stats-heading">
              <div className="heading-header">Case Analytics</div>
              <div className="case-data">Total Client</div>
              <div className="stat-change">
                250
                <span className="stat-change-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="17px"
                    viewBox="0 -960 960 960"
                    width="17px"
                    fill="#00C96E"
                  >
                    <path d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z" />
                  </svg>
                  <div>5%</div>
                </span>
              </div>
            </div>
            <div className="graph-legend-container">
              <div className="graph-legend">
                <div className="graph-legend-circle-green"></div>
                <div>Acquittal</div>
              </div>
              <div className="graph-legend">
                <div className="graph-legend-circle-blue"></div>
                <div>Sentence Reduction</div>
              </div>
              <div className="graph-legend">
                <div className="graph-legend-circle-pink"></div>
                <div>Case Negotiation</div>
              </div>
            </div>
            <div className="line-graph">
              <LineChart
                width={900}
                height={360}
                series={[
                  {
                    id: "pv",
                    data: lineGraphData.acquittal,
                    curve: "linear",
                  },
                  {
                    id: "uv",
                    data: lineGraphData.sentenceReduction,
                    curve: "linear",
                  },
                  {
                    id: "zv",
                    data: lineGraphData.caseNegotiation,
                    curve: "linear",
                  }
                ]}
                xAxis={[{ scaleType: "point", data: xAxisData, line: true }]}
              />
            </div>
          </div>
        </div>
        <div className="additional-charts-row">
          <div className="chart-container pie-chart-container">
            <div className="chart-header"> Total Case Distribution</div>
            <div className="pi-chart">
              <PieChart
                series={[
                  {
                    data: pieData,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={300}
                width={590}
                legend={{
                  position: { vertical: "middle", horizontal: "right" },
                  itemMarkWidth: 20,
                  itemMarkHeight: 20,
                  markShape: "circle",
                }}
              />
            </div>
          </div>

          <div className="chart-container bar-chart-container">
            <div className="chart-header">Yearly Comparison</div>
            <div className="bar-chart">
              <BarChart
                xAxis={[{ scaleType: "band", data: barChartData.years }]}
                series={[
                  {
                    data: barChartData.acquittal,
                    label: 'Acquittal'
                  },
                  {
                    data: barChartData.sentenceReduction,
                    label: 'Sentence Reduction'
                  },
                  {
                    data: barChartData.caseNegotiation,
                    label: 'Case Negotiation'
                  }
                ]}
                width={400}
                height={300}
                barLabel="value"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;