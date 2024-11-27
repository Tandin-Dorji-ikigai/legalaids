import React, { useState, forwardRef, useEffect } from "react";
import { Plus, Minus, EyeIcon } from "lucide-react";
import "./DetailsPopup.css";
import { useGetCaseIdQuery } from "../slices/caseApiSlice";
import { useUpdateCaseMutation } from "../slices/caseApiSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

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


const ApplicationPopup = forwardRef(({ caseId, onClose }, ref) => {
  const { data: cas, error: fetchError, isLoading } = useGetCaseIdQuery(caseId);
  const navigate = useNavigate();

  const [updateCase] = useUpdateCaseMutation();

  const [caseInfo, setCaseInfo] = useState({
    caseType: "",
    natureOfCase: ""
  })


  const handleViewPdf = (url) => {
    window.open(url, '_blank');
  };

  if (fetchError) {
    console.log(fetchError)
  }
  
  const [expandedSections, setExpandedSections] = useState({
    applicantInfo: false,
    caseDetails: true,
    institutions: false,
    documents: false,
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
      // Update applicantInfo
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

      // Update institutionInfo
      setInstitutionInfo({
        institutionName: cas.institutionName,
        officialName: cas.officialName,
        officialContact: cas.officialcNumber,
        officialEmail: cas.officialEmail,
      });

      // Update documents
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

  const handleConfirm = async () => {
    const {
      cidNumber: cid,
      name,
      occupation,
      contactNumber: contactNo,
      householdIncome: income,
      householdMembers: member,
      dzongkhag: cdzongkhag,
      villageCurrent: village,
      gewogCurrent: gewog,
      dzongkhagCurrent: dzongkhag,
      villagePermanent: pvillage,
      gewogPermanent: pgewog,
      dzongkhagPermanent: pdzongkhag
    } = applicantInfo;

    const {
      institutionName,
      officialName,
      officialContact: officialcNumber,
      officialEmail
    } = institutionInfo;

    const status = "In Progress";

    try {
      await updateCase({
        id: caseId,
        cid,
        occupation,
        name,
        contactNo,
        income,
        member,
        cdzongkhag,
        village,
        gewog,
        dzongkhag,
        pvillage,
        pgewog,
        pdzongkhag,
        institutionName,
        officialName,
        officialcNumber,
        officialEmail,
        status
      }).unwrap();

      Swal.fire({
        title: "Success!",
        text: "The case has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/caseManagement");

    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the case.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleCancel = () => {
    console.log("Cancelled");
    onClose();
  };

  return (
    <div className="popup-overlay" ref={ref}>

      {isLoading ? (
        <div className="loading-container">
          <Loader />
        </div>
      ) : (
        <div className="popup-container">
          <div className="popup-header">
            <h2>Application Details</h2>
            <button onClick={onClose} className="close-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1C1B1F"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>
          </div>

          <div className="popup-content">
            <div className="section">
              <button
                className="section-header"
                aria-expanded={expandedSections.caseDetails}
                onClick={() => toggleSection("caseDetails")}
              >
                <span>Case Details and Information</span>
                <div className="section-btn-container">
                  {expandedSections.caseDetails ? (
                    <Minus color="#15605C" />
                  ) : (
                    <Plus color="#15605C" />
                  )}
                </div>
              </button>
              {expandedSections.caseDetails && (
                <div className="section-content">
                  <h3>Case Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Type</label>
                      <select
                        value={caseInfo.caseType}
                        onChange={(e) =>
                          setCaseInfo({
                            ...caseInfo,
                            caseType: e.target.value,
                          })
                        }

                        class="selectFields"
                      >

                        <option value="criminal">Walk In</option>
                        <option value="civil">Referral</option>
                      </select>

                    </div>
                    <div className="form-field">
                      <label>Nature Of Case</label>
                      <select
                        value={caseInfo.natureOfCase}
                        onChange={(e) =>
                          setCaseInfo({
                            ...caseInfo,
                            natureOfCase: e.target.value,
                          })
                        }
                        class="selectFields"
                      >

                        <option value="criminal">Criminal</option>
                        <option value="civil">Civil</option>
                      </select>

                    </div>
                  </div>


                </div>
              )}
            </div>

            <div className="section">
              <button
                className="section-header"
                aria-expanded={expandedSections.applicantInfo}
                onClick={() => toggleSection("applicantInfo")}
              >
                <span>Applicant Information and Details</span>
                <div className="section-btn-container">
                  {expandedSections.applicantInfo ? (
                    <Minus color="#15605C" />
                  ) : (
                    <Plus color="#15605C" />
                  )}
                </div>
              </button>
              {expandedSections.applicantInfo && (
                <div className="section-content">
                  <h3>Personal Information and Details of Applicant</h3>
                  <h4>Applicant Details</h4>
                  <div className="form-grid">
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                  </div>

                  <h4>Occupation Details</h4>
                  <div className="form-grid">
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                  </div>

                  <h4>Household Details</h4>
                  <div className="form-grid">
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                  </div>

                  <h4>Current Addresses</h4>
                  <div className="form-grid">
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                  </div>

                  <h4>Permanent Addresses</h4>
                  <div className="form-grid">
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div className="section">
              <button
                className="section-header header-btn"
                aria-expanded={expandedSections.institutions}
                onClick={() => toggleSection("institutions")}
              >
                <span>Institutions facilitating legal aid applications</span>
                <div className="section-btn-container">
                  {expandedSections.institutions ? (
                    <Minus color="#15605C" />
                  ) : (
                    <Plus color="#15605C" />
                  )}
                </div>
              </button>
              {expandedSections.institutions && (
                <div className="section-content">
                  <h4>Name of the Institution</h4>
                  <div className="form-grid">
                    <div className="form-field">
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
                      />
                    </div>
                  </div>

                  <h4>Dealing Official/Staff Details</h4>
                  <div className="form-grid">
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                    <div className="form-field">
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
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="section">
              <button
                className="section-header"
                aria-expanded={expandedSections.documents}
                onClick={() => toggleSection("documents")}
              >
                <span>Check List of Documents</span>
                <div className="section-btn-container">
                  {expandedSections.documents ? (
                    <Minus color="#15605C" />
                  ) : (
                    <Plus color="#15605C" />
                  )}
                </div>
              </button>
              {expandedSections.documents && (
                <div className="section-content">
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
          </div>

          <div className="popup-footer">
            <button onClick={handleConfirm} className="confirm-button">
              Approve
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Decline
            </button>
          </div>
        </div>
      )}
    </div>

  );

});

export default ApplicationPopup;