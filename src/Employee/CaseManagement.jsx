import React, { useState, useEffect } from "react";
import SideNav from "./DashboardNav";
import EmployeeCasePopup from "../components/EmployeeCasePopup";
import Modal from "@mui/material/Modal";
import { useGetAllCaseQuery } from "../slices/caseApiSlice";
import { useSelector } from "react-redux";

function EmployeeCaseManagement() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 10;

  const { data: cases, error } = useGetAllCaseQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [civil, setCivil] = useState([]);
  const [criminal, setCriminal] = useState([]);
  const [walkIn, setWalkIn] = useState([]);
  const [referral, setReferral] = useState([]);
  const [completedCases, setCompletedCases] = useState([]);


  // Filter dropdown
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedNatureOfCase, setSelectedNatureOfCase] = useState('');
  const [statuses, setStatuses] = useState([])
  const [dzongkhags, setDzongkhags] = useState([])
  const [caseType, setCaseType] = useState([])
  const [natureOfCase, setNatureOfCase] = useState([])

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (cases && userInfo) {
      const filteredCases = cases.filter(
        (caseItem) =>
          (caseItem.aEmployee === userInfo.user.username || caseItem.aEmployee === "All") &&
          (caseItem.status === "Completed" || caseItem.status === "In Progress")
      );
      setCompletedCases(filteredCases);
      const criminalCase = cases.filter(c => c.natureOfCase === "Criminal")
      setCriminal(criminalCase);
      const civilCase = cases.filter(c => c.natureOfCase === "Civil")
      setCivil(civilCase);
      const walkInCase = cases.filter(c => c.caseType === "Walk In")
      setWalkIn(walkInCase);
      const referralCase = cases.filter(c => c.caseType === "Referral")
      setReferral(referralCase);


      // Dropdowns
      if (completedCases) {
        const status = Array.from(
          new Set(
            completedCases
              .map(c => c.status)
              .filter(status => status !== undefined && status !== null)
          )
        ).sort();
        setStatuses(status);

        const dzongkhag = Array.from(
          new Set(
            completedCases
              .map(c => c.pdzongkhag)
              .filter(dzongkhag => dzongkhag !== undefined && dzongkhag !== null)
          )
        ).sort();
        setDzongkhags(dzongkhag);

        const caseType = Array.from(
          new Set(
            completedCases
              .map(c => c.caseType)
              .filter(caseType => caseType !== undefined && caseType !== null)
          )
        ).sort();
        setCaseType(caseType);

        const natureOfCase = Array.from(
          new Set(
            completedCases
              .map(c => c.natureOfCase)
              .filter(natureOfCase => natureOfCase !== undefined && natureOfCase !== null)
          )
        ).sort();
        setNatureOfCase(natureOfCase);
      }
    }
  }, [error, cases, userInfo]);


  const filteredCases = completedCases
    ? completedCases.filter((caseItem) => {
      const matchesStatus = selectedStatus === '' || caseItem.status === selectedStatus;
      const matchesDzongkhag = selectedDzongkhag === '' || caseItem.pdzongkhag === selectedDzongkhag;
      const matchesCaseType = selectedCaseType === '' || caseItem.caseType === selectedCaseType;
      const matchesNatureOfCase = selectedNatureOfCase === '' || caseItem.natureOfCase === selectedNatureOfCase;

      return matchesStatus && matchesDzongkhag && matchesCaseType && matchesNatureOfCase;
    })
    : [];

  const totalPages = Math.ceil(filteredCases.length / casesPerPage);
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);

  const [open, setOpen] = useState(false);
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
        <EmployeeCasePopup caseId={selectedCaseId} onClose={handleClose} />
      </Modal>
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Case Management</div>
        <h3 className="stats-header">Statistical Overview</h3>
        <div className="dashboard-stats-container">
          <div className="statistical-overview case-management">
            <div className="stats-card">
              <div className="card-header">Civil Cases</div>
              {civil ? (
                <div className="card-stat-num">{civil.length} Case(s)</div>
              ) : (
                <div className="card-stat-num">0 Case</div>
              )}
            </div>
            <div className="stats-card">
              <div className="card-header">Criminal Cases</div>
              {criminal ? (
                <div className="card-stat-num">{criminal.length} Case(s)</div>
              ) : (
                <div className="card-stat-num">0 Case</div>
              )}
            </div>
            <div className="stats-card">
              <div className="card-header">Walk-Ins</div>
              {walkIn ? (
                <div className="card-stat-num">{walkIn.length} Walk-In(s)</div>
              ) : (
                <div className="card-stat-num">0 Walk-In</div>
              )}
            </div>
            <div className="stats-card">
              <div className="card-header">Referrals</div>
              {referral ? (
                <div className="card-stat-num">{referral.length} Referral(s)</div>
              ) : (
                <div className="card-stat-num">0 Referral</div>
              )}
            </div>
          </div>
        </div>

        <div className="applications-section">
          <h3>Applications</h3>
          <div className="applications-filters">
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
                <select className="filter-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="">All Applications</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="filter-select-wrapper case-management-select">
                <select
                  className="filter-select calse-management-filter-select "
                  value={selectedDzongkhag}
                  onChange={(e) => setSelectedDzongkhag(e.target.value)}
                >
                  <option value="">All Dzongkhags</option>
                  {dzongkhags.map(dzongkhag => (
                    <option key={dzongkhag} value={dzongkhag}>{dzongkhag}</option>
                  ))}
                </select>
              </div>

              <div className="filter-select-wrapper case-management-select">
                <select
                  className="filter-select calse-management-filter-select"
                  value={selectedCaseType}
                  onChange={(e) => setSelectedCaseType(e.target.value)}
                >
                  <option value="">All Case Types</option>
                  {caseType.map(caseType => (
                    <option key={caseType} value={caseType}>{caseType}</option>
                  ))}
                </select>
              </div>

              <div className="filter-select-wrapper case-management-select">
                <select
                  className="filter-select calse-management-filter-select"
                  value={selectedNatureOfCase}
                  onChange={(e) => setSelectedNatureOfCase(e.target.value)}
                >
                  <option value="">All Nature Of Cases</option>
                  {natureOfCase.map(natureOfCase => (
                    <option key={natureOfCase} value={natureOfCase}>{natureOfCase}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="application-details">
            <h3>Appliction Details</h3>
            <table>
              <thead>
                <tr>
                  <th>CID</th>
                  <th>Phone Number</th>
                  <th>Nature of Case</th>
                  <th>Dzongkhag</th>
                  <th>Status</th>
                  <th>Case Type</th>
                  <th>Case Result</th>
                </tr>
              </thead>
              <tbody>
                {currentCases.map((caseItem) => (
                  <tr key={caseItem.id} onClick={() => handleOpen(caseItem.id)}>
                    <td>{caseItem.cid}</td>
                    <td>{caseItem.contactNo}</td>
                    <td>{caseItem.natureOfCase}</td>
                    <td>{caseItem.pdzongkhag}</td>
                    <td>{caseItem.status}</td>
                    <td>{caseItem.caseType}</td>
                    <td>{caseItem.outcome || "None"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                  {index + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCaseManagement;
