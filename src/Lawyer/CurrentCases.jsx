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
