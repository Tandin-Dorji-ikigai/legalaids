<<<<<<< HEAD
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
      const pendingCases = cases.filter((caseItem) => caseItem.aLawyer === userInfo.user.username && caseItem.status === "In Progress" )
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
  }, [error, cases]);

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
=======
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, EyeIcon } from "lucide-react";
import LawyerSideNav from "./LawyerDashboardNav";
import "./css/CurrentCases.css";
import { useSelector } from "react-redux";
import { useGetAllCaseQuery } from "../slices/caseApiSlice";
import HouseholdPopup from "../components/HouseholdPopup";

const DocumentItem = ({ label, filename, isLoading, onViewPdf }) => (
  <div className="document-item">
    <div>
      <span className="document-label">{label}</span>
      {isLoading ? (
        <span className="document-filename">Loading...</span>
      ) : (
        <span className="document-filename">
          {filename ? filename.split('/').pop() : 'No file'}
        </span>
      )}
    </div>
    <div className="document-actions">
      <button
        className="icon-button add"
        disabled={isLoading || !filename}
        onClick={() => filename && onViewPdf(filename)}
      >
        <EyeIcon size={18} />
      </button>
    </div>
  </div>
);

const CurrentCases = () => {
  const { data: cases, error: fetchError, isLoading } = useGetAllCaseQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [cas, setCase] = useState([]);

  const [householdNo, setHouseHoldNo] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      if (cas) {
        try {
          const response = await fetch(`http://localhost:8081/api/proxy/citizendetails/${cas.cid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          let result = await response.json();
          result = result.citizenDetailsResponse.citizenDetail[0]
          setHouseHoldNo(result.householdNo)
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [cas]);

  const [showPopup, setShowPopup] = useState(false);

  if (fetchError) {
    console.log(fetchError)
  }

  useEffect(() => {
    if (cases && userInfo) {
      const filteredCase = cases.find(
        (caseItem) =>
          caseItem.aLawyer === userInfo.user.username &&
          caseItem.status === "In Progress"
      );
      setCase(filteredCase);
    }
  }, [cases, userInfo]);

  const [expandedSections, setExpandedSections] = useState({
    applicantInfo: true,
    institutions: true,
    documents: true,
  });

  const [applicantInfo, setApplicantInfo] = useState({
    cidNumber: "",
    name: "",
    occupation: "",
    contactNumber: "",
    householdIncome: "",
    householdMembers: "",
    dzongkhag: "",
    villageCurrent: "",
    gewogCurrent: "",
    dzongkhagCurrent: "",
    villagePermanent: "",
    gewogPermanent: "",
    dzongkhagPermanent: "",
  });

  const [institutionInfo, setInstitutionInfo] = useState({
    institutionName: "",
    officialName: "",
    officialContact: "",
    officialEmail: "",
  });

  const [documents, setDocuments] = useState([
    { label: "CID or Valid Passport", filename: null, docKey: 'cidDoc' },
    { label: "Details of Household members", filename: null, docKey: 'hMemberDoc' },
    { label: "Attachment for household income", filename: null, docKey: 'hIncomeDoc' },
    { label: "Attachment for household disposable capital", filename: null, docKey: 'hCapitalDoc' },
    { label: "Brief Background of the Case*", filename: null, docKey: 'cBackgroundDoc' },
    { label: "Evidence of any form of disability.", filename: null, docKey: 'disabilityDoc' },
  ]);

  useEffect(() => {
    if (cas) {
      setApplicantInfo({
        cidNumber: cas.cid,
        name: cas.name,
        occupation: cas.occupation,
        contactNumber: cas.contactNo,
        householdIncome: cas.income,
        householdMembers: cas.member,
        dzongkhag: cas.cdzongkhag,
        villageCurrent: cas.village,
        gewogCurrent: cas.gewog,
        dzongkhagCurrent: cas.dzongkhag,
        villagePermanent: cas.pvillage,
        gewogPermanent: cas.pgewog,
        dzongkhagPermanent: cas.pdzongkhag,
      });

      setInstitutionInfo({
        institutionName: cas.institutionName,
        officialName: cas.officialName,
        officialContact: cas.officialcNumber,
        officialEmail: cas.officialEmail,
      });

      setDocuments(prev =>
        prev.map(doc => ({
          ...doc,
          filename: cas[doc.docKey] || null
        }))
      );

    }
  }, [cas]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleViewPdf = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="dashboard-container">
      <LawyerSideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Current Cases</div>
        <div className="lawyer-case-details-container">
          <div className="lawyer-section">
            <button
              className="lawyer-section-header"
              onClick={() => toggleSection("applicantInfo")}
            >
              <span>Applicant Information and Details</span>
              {expandedSections.applicantInfo ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.applicantInfo && (
              <div className="lawyer-section-content">
                <h3>Personal Information and Details of Applicant</h3>
                <h4>Applicant Details</h4>
                <div className="lawyer-form-grid">
                  <div className="lawyer-form-field">
                    <label>CID Number</label>
                    <input
                      type="text"
                      value={applicantInfo.cidNumber}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          cidNumber: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Name</label>
                    <input
                      type="text"
                      value={applicantInfo.name}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          name: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Occupation</label>
                    <input
                      type="text"
                      value={applicantInfo.occupation}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          occupation: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      value={applicantInfo.contactNumber}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          contactNumber: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="lawyer-form-grid"></div>

                <h4>Household Details</h4>
                <div className="lawyer-form-grid">
                  <div className="lawyer-form-field">
                    <label>Total Household Income (Nu.)</label>
                    <input
                      type="text"
                      value={applicantInfo.householdIncome}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          householdIncome: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Total Household Members</label>
                    <input
                      type="text"
                      value={applicantInfo.householdMembers}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          householdMembers: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Dzongkhag</label>
                    <input
                      type="text"
                      value={applicantInfo.dzongkhag}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          dzongkhag: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                </div>

                <h4>Current Addresses</h4>
                <div className="lawyer-form-grid">
                  <div className="lawyer-form-field">
                    <label>Village</label>
                    <input
                      type="text"
                      value={applicantInfo.villageCurrent}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          villageCurrent: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Gewog</label>
                    <input
                      type="text"
                      value={applicantInfo.gewogCurrent}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          gewogCurrent: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Dzongkhag</label>
                    <input
                      type="text"
                      value={applicantInfo.dzongkhagCurrent}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          dzongkhagCurrent: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                </div>

                <h4>Permanent Addresses</h4>
                <div className="lawyer-form-grid">
                  <div className="lawyer-form-field">
                    <label>Village</label>
                    <input
                      type="text"
                      value={applicantInfo.villagePermanent}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          villagePermanent: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Gewog</label>
                    <input
                      type="text"
                      value={applicantInfo.gewogPermanent}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          gewogPermanent: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Dzongkhag</label>
                    <input
                      type="text"
                      value={applicantInfo.dzongkhagPermanent}
                      onChange={(e) =>
                        setApplicantInfo({
                          ...applicantInfo,
                          dzongkhagPermanent: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lawyer-section">
            <button
              className="lawyer-section-header"
              onClick={() => toggleSection("institutions")}
            >
              <span>Institution Information</span>
              {expandedSections.institutions ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.institutions && (
              <div className="lawyer-section-content">
                <h4>Name of the Institution</h4>
                <div className="lawyer-form-grid">
                  <div className="lawyer-form-field">
                    <label>Institution Name</label>
                    <input
                      type="text"
                      value={institutionInfo.institutionName}
                      onChange={(e) =>
                        setInstitutionInfo({
                          ...institutionInfo,
                          institutionName: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                </div>

                <h4>Dealing Official/Staff Details</h4>
                <div className="lawyer-form-grid">
                  <div className="lawyer-form-field">
                    <label>Name</label>
                    <input
                      type="text"
                      value={institutionInfo.officialName}
                      onChange={(e) =>
                        setInstitutionInfo({
                          ...institutionInfo,
                          officialName: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      value={institutionInfo.officialContact}
                      onChange={(e) =>
                        setInstitutionInfo({
                          ...institutionInfo,
                          officialContact: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                  <div className="lawyer-form-field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={institutionInfo.officialEmail}
                      onChange={(e) =>
                        setInstitutionInfo({
                          ...institutionInfo,
                          officialEmail: e.target.value,
                        })
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lawyer-section">
            <button
              className="lawyer-section-header"
              onClick={() => toggleSection("documents")}
            >
              <span>Check List of Documents</span>
              {expandedSections.documents ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.documents && (
              <div className="lawyer-section-content">
                <h3>Check List of Documents*</h3>
                <div className="document-list">
                  {documents.map((doc, index) => (
                    <DocumentItem
                      key={index}
                      label={doc.label}
                      filename={doc.filename}
                      isLoading={isLoading}
                      onViewPdf={handleViewPdf}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {householdNo ?
            <div>
              <button
                onClick={() => setShowPopup(true)}
                className="show-popup-btn household-show-popup-btn"
              >
                Show Family Tree
              </button>

              {showPopup && (
                <HouseholdPopup
                  householdNumber={householdNo}
                  closePopup={() => setShowPopup(false)}
                />
              )}
            </div> : null
          }
        </div>
      </div>
    </div>
  );
};

export default CurrentCases;
>>>>>>> 44ef13fda7effc595b98bf535502f6e10f788231
