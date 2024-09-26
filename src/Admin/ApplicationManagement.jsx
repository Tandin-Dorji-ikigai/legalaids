import React, { useState, useEffect } from "react";
import SideNav from "./DashboardNav"; // Assuming you have a SideNav component
import "./css/ApplicationManagement.css"; // Ensure you have a CSS file for styles
import { Modal } from "@mui/material";
import ApplicationPopup from "../components/ApplicationPopup";
import { useGetAllCaseQuery } from "../slices/caseApiSlice";

function ApplicationManagement() {
  const [activeStatus, setActiveStatus] = useState("All Application");
  const { data: cases, error } = useGetAllCaseQuery();
  const [selectedCases, setSelectedCases] = useState([]);

  const handleStatusClick = (status) => {
    setActiveStatus(status);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (cases) {
      const pendingCases = cases.filter(c => c.status === "Pending" || c.status === "Reviewed" || c.status === "Dismissed");
      setSelectedCases(pendingCases);
    }
  }, [error, cases, activeStatus]);

  const [open, setOpen] = React.useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const handleOpen = (caseId) => {
    setSelectedCaseId(caseId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCaseId(null);
  };

  return (
    <div className="dashboard-container">
      <Modal open={open} onClose={handleClose}>
        <ApplicationPopup caseId={selectedCaseId} onClose={handleClose} />
      </Modal>
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Application Management</div>
        <h3 className="stats-header">Statistical Overview</h3>
        <div className="dashboard-stats-container">
          <div className="statistical-overview case-management">
            <div className="stats-card">
              <div className="card-header">Civil Cases</div>
              <div className="card-stat-num">121 Cases</div>
              <div>8 new cases</div>
            </div>
            <div className="stats-card">
              <div className="card-header">Criminal Cases</div>
              <div className="card-stat-num">12 Cases</div>
              <div>2 new cases</div>
            </div>
            <div className="stats-card">
              <div className="card-header">Walk-Ins</div>
              <div className="card-stat-num">121 Walk-Ins</div>
              <div>8 new walk-ins</div>
            </div>
            <div className="stats-card">
              <div className="card-header">Referrals</div>
              <div className="card-stat-num">12 Referrals</div>
              <div>8 new referrals</div>
            </div>
          </div>
        </div>

        <div className="applications-section">
          <h3>Applications</h3>
          <div className="applications-filters">
            <div className="search-bar case-management-search">
              <div className="search-bar-container">
                <input type="text" placeholder="Search" style={{width:"100%"}}/>
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
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#9A9A9A"
                >
                  <path d="M456.18-192Q446-192 439-198.9t-7-17.1v-227L197-729q-9-12-2.74-25.5Q200.51-768 216-768h528q15.49 0 21.74 13.5Q772-741 763-729L528-443v227q0 10.2-6.88 17.1-6.89 6.9-17.06 6.9h-47.88ZM480-498l162-198H317l163 198Zm0 0Z" />
                </svg>
              </div>
              <div className="filter-select-wrapper case-management-select">
                <select className="filter-select case-management-filter-select">
                  <option value="2023">Dzongkhag</option>
                  <option value="2023">Thimphu</option>
                  <option value="2024">Gase</option>
                  <option value="2025">Paro</option>
                  <option value="2027">Haa</option>
                </select>
              </div>
              <div className="filter-select-wrapper case-management-select">
                <select className="filter-select case-management-filter-select">
                  <option value="2023">All Case Type</option>
                  <option value="2023">Walk-In</option>
                  <option value="2024">Walk-In</option>
                </select>
              </div>
              <div className="filter-select-wrapper case-management-select">
                <select className="filter-select case-management-filter-select case-nature">
                  <option value="2023">All Case Nature</option>
                  <option value="2023">Criminal</option>
                  <option value="2024">Civil</option>
                  <option value="2025">Criminal</option>
                  <option value="2027">Civil</option>
                </select>
              </div>
            </div>
          </div>
          <div className="case-status-container">
            <div
              className={`case-status-btn ${activeStatus === "All Application" ? "status-active" : ""
                }`}
              onClick={() => handleStatusClick("All Application")}
            >
              All Cases
            </div>
            <div
              className={`case-status-btn ${activeStatus === "Pending" ? "status-active" : ""
                }`}
              onClick={() => handleStatusClick("Pending")}
            >
              Pending
            </div>
            <div
              className={`case-status-btn ${activeStatus === "Reviewed" ? "status-active" : ""
                }`}
              onClick={() => handleStatusClick("Reviewed")}
            >
              Reviewed
            </div>
            <div
              className={`case-status-btn ${activeStatus === "Dismissed" ? "status-active" : ""
                }`}
              onClick={() => handleStatusClick("Dismissed")}
            >
              Dismissed
            </div>
          </div>
          <div className="application-details">
            <h3>Application Details</h3>
            <table>
              <thead>
                <tr>
                  <th>CID</th>
                  <th>Contact Number</th>
                  <th>Nature of Case</th>
                  <th>Dzongkhag</th>
                  <th>Status</th>
                  <th>Case Type</th>
                </tr>
              </thead>
              <tbody>
                {cases && (
                  <>
                    {(() => {
                      if (activeStatus === "All Application") {
                        return selectedCases.map((caseItem) => (
                          <tr
                            key={caseItem.cid}
                            onClick={() => handleOpen(caseItem.id)}
                          >
                            <td>{caseItem.cid}</td>
                            <td>{caseItem.contactNo}</td>
                            <td>{caseItem.natureOfCase}</td>
                            <td>{caseItem.pdzongkhag}</td>
                            <td>{caseItem.status}</td>
                            <td>{caseItem.caseType}</td>
                          </tr>
                        ));
                      } else if (activeStatus === "Pending") {
                        return selectedCases
                          .filter((caseItem) => caseItem.status === "Pending")
                          .map((caseItem) => (
                            <tr
                              key={caseItem.cid}
                              onClick={() => handleOpen(caseItem.id)}
                            >
                              <td>{caseItem.cid}</td>
                              <td>{caseItem.contactNo}</td>
                              <td>{caseItem.natureOfCase}</td>
                              <td>{caseItem.pdzongkhag}</td>
                              <td>{caseItem.status}</td>
                              <td>{caseItem.caseType}</td>
                            </tr>
                          ));
                      } else if (activeStatus === "Reviewed") {
                        return selectedCases
                          .filter((caseItem) => caseItem.status === "Reviewed")
                          .map((caseItem) => (
                            <tr
                              key={caseItem.cid}
                              onClick={() => handleOpen(caseItem.id)}
                            >
                              <td>{caseItem.cid}</td>
                              <td>{caseItem.contactNo}</td>
                              <td>{caseItem.natureOfCase}</td>
                              <td>{caseItem.pdzongkhag}</td>
                              <td>{caseItem.status}</td>
                              <td>{caseItem.caseType}</td>
                            </tr>
                          ));
                      } else if (activeStatus === "Dismissed") {
                        return selectedCases
                          .filter((caseItem) => caseItem.status === "Dismissed")
                          .map((caseItem) => (
                            <tr
                              key={caseItem.cid}
                              onClick={() => handleOpen(caseItem.id)}
                            >
                              <td>{caseItem.cid}</td>
                              <td>{caseItem.contactNo}</td>
                              <td>{caseItem.natureOfCase}</td>
                              <td>{caseItem.pdzongkhag}</td>
                              <td>{caseItem.status}</td>
                              <td>{caseItem.caseType}</td>
                            </tr>
                          ));
                      } else {
                        return null; // Handle any other statuses or no cases found
                      }
                    })()}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationManagement;