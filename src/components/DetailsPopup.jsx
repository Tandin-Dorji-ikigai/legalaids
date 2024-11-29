import React, { useState, forwardRef, useEffect } from "react";
import { X, Plus, Minus, EyeIcon } from "lucide-react";
import "./DetailsPopup.css";
import { useGetCaseIdQuery } from "../slices/caseApiSlice";
import { useUpdateCaseMutation } from "../slices/caseApiSlice";
import Swal from "sweetalert2";
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
const DetailsPopup = forwardRef(({ caseId, onClose }, ref) => {
  const { data: cas, error: fetchError, isLoading } = useGetCaseIdQuery(caseId);
  const [updateCase] = useUpdateCaseMutation();

  const handleViewPdf = (url) => {
    window.open(url, '_blank');
  };

  if (fetchError) {
    console.log(fetchError);
  }


  const [expandedSections, setExpandedSections] = useState({
    caseDetails: true,
    applicantInfo: false,
    institutions: false,
    documents: false,
  });

  const [applicantInfo, setApplicantInfo] = useState({
    email: "",
    contactNo: "",
    caseStatus: "",
    caseType: "",
    natureOfCase: "",
    remarks: "",
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
      console.log(cas)
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
        caseType: cas.caseType,
        natureOfCase: cas.natureOfCase
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
    const remarks = applicantInfo.remarks;
    const status = applicantInfo.caseStatus;
    const aLawyer = applicantInfo.email
    const caseType = applicantInfo.caseType
    const natureOfCase = applicantInfo.natureOfCase
    try {
      const id = caseId;
      await updateCase({
        id, cid, occupation, name, contactNo, income, member,
        cdzongkhag, village, gewog, dzongkhag, pvillage, pgewog, pdzongkhag, institutionName, officialName, officialcNumber,
        officialEmail, remarks, status, aLawyer, caseType, natureOfCase
      }).unwrap();

      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Case details have been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      onClose(); // Close the popup after successful update
    } catch (err) {
      console.log(err);
      // Show error message using SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update case details. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  const handleCancel = () => {
    onClose();
  };

  const handleDeleteDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
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
            <h2>Case Details</h2>
            <button onClick={onClose} className="close-button">
              <X size={24} color="#1C1B1F" />
            </button>
          </div>

          <div className="popup-content">
            {/* Case Details Section */}
            <div className="section">
              <button
                className="section-header"
                aria-expanded={expandedSections.caseDetails}
                onClick={() => toggleSection("caseDetails")}
              >
                <span>Case Details</span>
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
                  <h4>Lawyer Details</h4>
                  <div className="form-grid layer-detail-container">
                    <div className="form-field">
                      <label>Email</label>
                      <input
                        type="text"
                        value={applicantInfo.email}
                        onChange={(e) =>
                          setApplicantInfo({
                            ...applicantInfo,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                  </div>

                  <h4>Case Status and Documents</h4>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Status</label>
                      <input
                        type="text"
                        value={applicantInfo.caseStatus}
                        onChange={(e) =>
                          setApplicantInfo({
                            ...applicantInfo,
                            caseStatus: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-field">
                      <label>Case Type</label>
                      <select
                        className="case-type-select"
                        value={applicantInfo.caseType}
                        onChange={(e) =>
                          setApplicantInfo({
                            ...applicantInfo,
                            caseType: e.target.value,
                          })
                        }
                      >
                        <option value="Walk In">Walk In</option>
                        <option value="Referral">Referral</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Documents</label>
                      <div className="document-list">
                        <div className="document-item">
                          <div>

                            <span className="document-filename">asdf</span>
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
                      </div>
                    </div>
                    <div className="form-field case-remark-container">
                      <label>Nature of Case</label>
                      <select
                        className="case-type-select"
                        value={applicantInfo.natureOfCase}
                        onChange={(e) =>
                          setApplicantInfo({
                            ...applicantInfo,
                            natureOfCase: e.target.value,
                          })
                        }
                      >
                        <option value="Civil">Civil</option>
                        <option value="Criminal">Criminal</option>
                      </select>
                    </div>
                    <div className="form-field add-doc-btn-container">
                      <button type="button" className="add-document-btn">
                        Add Documents
                      </button>
                    </div>
                  </div>
                  <h4>Case Results</h4>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Result</label>
                      <select
                        className="case-type-select"
                        value={applicantInfo.caseType}
                        onChange={(e) =>
                          setApplicantInfo({
                            ...applicantInfo,
                            caseType: e.target.value,
                          })
                        }
                      >
                        <option value="Sentence Reduction">Sentence Reduction</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Acquittal">Acquittal</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-grid remark-form-grid">
                    <div className="form-field remark-form-field">
                      <label>Remarks</label>
                      <textarea
                        className="case-remark"
                        value={applicantInfo.remarks}
                        onChange={(e) =>
                          setApplicantInfo({
                            ...applicantInfo,
                            remarks: e.target.value,
                          })
                        }
                        placeholder="Remarks"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Applicant Information Section */}
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

                  <h4>Household Information</h4>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Household Income</label>
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
                      <label>Household Members</label>
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
                  </div>

                  <h4>Address Information</h4>
                  <div className="form-grid">
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
                    <div className="form-field">
                      <label>Current Village</label>
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
                      <label>Current Gewog</label>
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
                      <label>Current Dzongkhag</label>
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
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Permanent Village</label>
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
                      <label>Permanent Gewog</label>
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
                      <label>Permanent Dzongkhag</label>
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

            {/* Institution Information Section */}
            <div className="section">
              <button
                className="section-header"
                aria-expanded={expandedSections.institutions}
                onClick={() => toggleSection("institutions")}
              >
                <span>Institutions</span>
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
                  <h4>Institution Details</h4>
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
                    <div className="form-field">
                      <label>Official Name</label>
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
                  </div>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Official Contact</label>
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
                      <label>Official Email</label>
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

            {/* Document Section */}
            <div className="section">
              <button
                className="section-header"
                aria-expanded={expandedSections.documents}
                onClick={() => toggleSection("documents")}
              >
                <span>Documents</span>
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
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleConfirm} className="confirm-button">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default DetailsPopup;
