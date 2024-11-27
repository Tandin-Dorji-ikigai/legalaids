import React, { useState, forwardRef, useEffect } from "react";
import { X, Trash2, Plus, Minus, EyeIcon } from "lucide-react";
import "./DetailsPopup.css";
import { useGetCaseIdQuery } from "../slices/caseApiSlice";
import { useUpdateCaseMutation } from "../slices/caseApiSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DocumentItem = ({ label, filename }) => (
  <div className="document-item">
    <div>
      <span className="document-label">{label}</span>
      <span className="document-filename">{filename}</span>
    </div>
    <div className="document-actions">
      {/* <button className="icon-button delete">
        <Trash2 size={18} />
      </button> */}
      {/* Only include add button if needed */}
      <button className="icon-button add">
        <EyeIcon size={18} />
      </button>
    </div>
  </div>
);

const ApplicationPopup = forwardRef(({ caseId, onClose }, ref) => {
  const { data: cas, error: fetchError } = useGetCaseIdQuery(caseId);
  console.log(cas)
  const navigate = useNavigate();

  const [updateCase] = useUpdateCaseMutation();

  if (fetchError) {
    console.log(fetchError);
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
    { label: "CID or Valid Passport", filename: "passport.pdf" },
    { label: "Details of Household members", filename: "passport.pdf" },
    { label: "Attachment for household income", filename: "passport.pdf" },
    { label: "Attachment for household disposable capital", filename: "passport.pdf" },
    { label: "Brief Background of the Case*", filename: "passport.pdf" },
    { label: "Evidence of any form of disability.", filename: "passport.pdf" },
  ]);

  const [caseInfo, setCaseInfo] = useState({
    caseType: "",
    natureOfCase: ""
  })

  useEffect(() => {
    if (cas) {
      // Update applicantInfo
      setApplicantInfo({
        ...applicantInfo,
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
        // add other fields as needed from cas
      });

      // Update institutionInfo
      setInstitutionInfo({
        ...institutionInfo,
        institutionName: cas.institutionName,
        officialName: cas.officialName,
        officialContact: cas.officialcNumber,
        officialEmail: cas.officialEmail,
      });

      // Update documents
      if (Array.isArray(cas.documentFilenames)) {
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc, index) => ({
            ...doc,
            filename: cas.documentFilenames[index] || doc.filename,
          }))
        );
      } else {
        console.error('cas.documentFilenames is not an array:', cas.documentFilenames);
      }
    }
  }, [cas]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleConfirm = async () => {
    const cid = applicantInfo.cidNumber;
    const occupation = applicantInfo.occupation;
    const name = applicantInfo.name;
    const contactNo = applicantInfo.contactNumber;
    const income = applicantInfo.householdIncome;
    const member = applicantInfo.householdMembers;
    const cdzongkhag = applicantInfo.dzongkhag;
    const village = applicantInfo.villageCurrent;
    const gewog = applicantInfo.gewogCurrent;
    const dzongkhag = applicantInfo.dzongkhagCurrent;
    const pvillage = applicantInfo.villagePermanent;
    const pgewog = applicantInfo.gewogPermanent;
    const pdzongkhag = applicantInfo.dzongkhagPermanent;
    const institutionName = institutionInfo.institutionName;
    const officialName = institutionInfo.officialName;
    const officialcNumber = institutionInfo.officialContact;
    const officialEmail = institutionInfo.officialEmail;
    const status = "In Progress";

    try {
      const id = caseId; // Assuming caseId is defined in your component
      await updateCase({
        id,
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

      // Display success alert
      Swal.fire({
        title: "Success!",
        text: "The case has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/caseManagement")

    } catch (err) {
      console.log(err);

      // Optionally, you can display an error alert here
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the case.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };


  const handleCancel = () => {
    // Add your cancellation logic here
    console.log("Cancelled");
    onClose(); // Close the popup on cancel
  };

  return (
    <div className="popup-overlay" ref={ref}>
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

                      class = "selectFields"
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
                      class = "selectFields"
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
    </div>
  );
});

export default ApplicationPopup;
