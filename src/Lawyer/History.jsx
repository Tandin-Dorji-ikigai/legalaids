import React, { useState } from "react";
import LawyerSideNav from "./LawyerDashboardNav";
import "./css/History.css";
import HistoryPopup from "../components/HistoryPopup";
import { Modal } from "@mui/material";
const History = () => {
  const [activeStatus, setActiveStatus] = useState("All Application");

  const handleStatusClick = (status) => {
    setActiveStatus(status);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="dashboard-container">
      <Modal open={open} onClose={handleClose}>
        <HistoryPopup onClose={handleClose} />
      </Modal>
      <LawyerSideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">History</div>
        <div className="applications-section">
          <div className="applications-filters">
            <div className="search-bar case-management-search">
              <div className="search-bar-container">
                <input type="text" placeholder="Search" />
                <div className="search-bar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#fff"
                  >
                    <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-card case-management-filter">
                <div>Filter</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#9A9A9A"
                >
                  <path d="M456.18-192Q446-192 439-198.9t-7-17.1v-227L197-729q-9-12-2.74-25.5Q200.51-768 216-768h528q15.49 0 21.74 13.5Q772-741 763-729L528-443v227q0 10.2-6.88 17.1-6.89 6.9-17.06 6.9h-47.88ZM480-498l162-198H317l163 198Zm0 0Z" />
                </svg>
              </div>
              <div className="filter-select-wrapper case-management-select">
                <select
                  className="filter-select calse-management-filter-select"
                  onChange={(e) => handleStatusClick(e.target.value)}
                  value={activeStatus}
                >
                  <option value="2023">Dzongkhag</option>
                  <option value="Thimphu">Thimphu</option>
                  <option value="Gase">Gase</option>
                  <option value="Paro">Paro</option>
                  <option value="Haa">Haa</option>
                </select>
              </div>
              <div className="filter-select-wrapper case-management-select">
                <select
                  className="filter-select calse-management-filter-select"
                  onChange={(e) => handleStatusClick(e.target.value)}
                  value={activeStatus}
                >
                  <option value="All Case Type">All Case Type</option>
                  <option value="Walk-In">Walk-In</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="filter-select-wrapper case-management-select">
                <select
                  className="filter-select calse-management-filter-select case-nature"
                  onChange={(e) => handleStatusClick(e.target.value)}
                  value={activeStatus}
                >
                  <option value="All Case Nature">All Case Nature</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>
            </div>
          </div>

          <div className="application-details">
            <h3>Application Details</h3>
            <table>
              <thead>
                <tr>
                  <th>CID</th>
                  <th>Date</th>
                  <th>Nature of Case</th>
                  <th>Dzongkhag</th>
                  <th>Status</th>
                  <th>Case Type</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={handleOpen}>
                  <td>1121850223</td>
                  <td>11/04/2024</td>
                  <td>Criminal</td>
                  <td>Thimphu</td>
                  <td>Pending</td>
                  <td>Walk-In</td>
                </tr>
                <tr onClick={handleOpen}>
                  <td>1141005900</td>
                  <td>11/04/2024</td>
                  <td>Civil</td>
                  <td>Punakha</td>
                  <td>Granted</td>
                  <td>Walk-In</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
