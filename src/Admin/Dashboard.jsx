import React from "react";
import "./css/Dashboard.css";
import SideNav from "./DashboardNav";
import { LineChart, PieChart, BarChart } from "@mui/x-charts";

const predefinedData = [
  { pData: 30, uData: 50, xData: 20 },
  { pData: 40, uData: 40, xData: 20 },
  { pData: 50, uData: 30, xData: 20 },
  { pData: 60, uData: 20, xData: 20 },
  { pData: 70, uData: 10, xData: 20 },
  { pData: 70, uData: 10, xData: 20 },
  { pData: 100, uData: 0, xData: 0 },
  { pData: 80, uData: 10, xData: 10 },
  { pData: 70, uData: 20, xData: 10 },
  { pData: 60, uData: 30, xData: 10 },
  { pData: 50, uData: 40, xData: 10 },
  { pData: 100, uData: 0, xData: 0 },
];

const xAxis = [
  "Jan",
  "Fed",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Agu",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const filterData = (data) => {
  return data.map((d) => {
    return {
      pData: d.pData === 100 ? d.pData : d.pData,
      uData: d.uData === 100 ? d.pData : d.uData,
      xData: d.xData === 100 ? d.pData : d.xData,
    };
  });
};

const pieData = [
  { id: 0, value: 15, label: "Acquittal" },
  { id: 1, value: 37, label: "Sentence Reduction" },
  { id: 2, value: 40, label: "Case Negotiation" },
];

const filteredData = filterData(predefinedData);
function Dashboard() {
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
              <option value="2023">This Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>

        <div className="dashboard-stats-container">
          <div className="stats-card-container">
            <div className="stats-card">
              <div className="card-header">Sentence Reduction Rate</div>
              <div className="card-stat-num">15%</div>
              <div className="stats-card-trend-decrease">
                4% increase vs last month
              </div>
            </div>
            <div className="stats-card">
              <div className="card-header">Acquittal Rate</div>
              <div className="card-stat-num">37%</div>
              <div className="stats-card-trend-increase">
                4% decrease vs last month
              </div>
            </div>
            <div className="stats-card">
              <div className="card-header">Case Negotiation Rate</div>
              <div className="card-stat-num">40%</div>
              <div className="stats-card-trend-increase">
                4% increase vs last month
              </div>
            </div>
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
              {" "}
              <LineChart
                width={900}
                height={360}
                series={[
                  {
                    id: "pv",
                    data: filteredData.map((d) => d.pData),
                    curve: "linear",
                  },
                  {
                    id: "uv",

                    data: filteredData.map((d) => d.uData),
                    curve: "linear",
                  },
                  {
                    id: "zv",

                    data: filteredData.map((d) => d.xData),
                    curve: "linear",
                  },
                ]}
                xAxis={[{ scaleType: "point", data: xAxis, line: true }]}
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
                xAxis={[{ scaleType: "band", data: ["2022", "2023", "2024"] }]}
                series={[
                  { data: [8, 3, 5] },
                  { data: [20, 15, 3] },
                  { data: [2, 9, 6] },
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
