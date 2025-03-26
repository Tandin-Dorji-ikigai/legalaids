import React, { useState, useEffect } from "react";
import LawyerSideNav from "./LawyerDashboardNav";
import { Modal } from "@mui/material";
import LawerCasesPopup from "../components/LawerCasesPopup";
import { useGetAllCaseQuery } from "../slices/caseApiSlice";
import { useSelector } from "react-redux";

const CurrentCases = () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 10;

  const { data: cases, error } = useGetAllCaseQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedCases, setSelectedCases] = useState([]);

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
    } else if (cases) {
      const pendingCases = cases.filter((caseItem) => caseItem.aLawyer === userInfo.user.username && caseItem.status === "In Progress")
      setSelectedCases(pendingCases);
      // Dropdowns
      if (selectedCases) {
        const status = Array.from(
          new Set(
            selectedCases
              .map(c => c.status)
              .filter(status => status !== undefined && status !== null)
          )
        ).sort();
        setStatuses(status);

        const dzongkhag = Array.from(
          new Set(
            selectedCases
              .map(c => c.pdzongkhag)
              .filter(dzongkhag => dzongkhag !== undefined && dzongkhag !== null)
          )
        ).sort();
        setDzongkhags(dzongkhag);

        const caseType = Array.from(
          new Set(
            selectedCases
              .map(c => c.caseType)
              .filter(caseType => caseType !== undefined && caseType !== null)
          )
        ).sort();
        setCaseType(caseType);

        const natureOfCase = Array.from(
          new Set(
            selectedCases
              .map(c => c.natureOfCase)
              .filter(natureOfCase => natureOfCase !== undefined && natureOfCase !== null)
          )
        ).sort();
        setNatureOfCase(natureOfCase);
      }

    }
  }, [error, cases, selectedCases]);

  const filteredCases = selectedCases
    ? selectedCases.filter((caseItem) => {
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
        <LawerCasesPopup caseId={selectedCaseId} onClose={handleClose} />
      </Modal>
      <LawyerSideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Application Management</div>
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
                {currentCases.map((caseItem) => (
                  <tr key={caseItem.id} onClick={() => handleOpen(caseItem.id)}>
                    <td>{caseItem.cid}</td>
                    <td>{caseItem.contactNo}</td>
                    <td>{caseItem.natureOfCase}</td>
                    <td>{caseItem.pdzongkhag}</td>
                    <td>{caseItem.status}</td>
                    <td>{caseItem.caseType}</td>
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

export default CurrentCases;