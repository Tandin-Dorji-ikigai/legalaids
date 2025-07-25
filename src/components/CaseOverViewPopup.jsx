import React, { useState, forwardRef, useEffect } from "react";
import { X, Plus, Minus, EyeIcon } from "lucide-react";
import "./DetailsPopup.css";
import { useGetCaseIdQuery } from "../slices/caseApiSlice";
import { useUpdateResultMutation } from "../slices/caseApiSlice";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import { useGetAllCaseQuery } from "../slices/caseApiSlice";
import { useSendEmailMutation } from "../slices/emailApiSlice";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useGetAllDocQuery } from "../slices/documentSlice";

const DocumentItem = ({ label, filename, isLoading, onViewPdf }) => (
  <div className="document-item">
    <div>
      <span className="document-label">{label}</span>
      {isLoading ? (
        <span className="document-filename">Loading...</span>
      ) : (
        <span className="document-filename">
          {filename ? filename.split("/").pop() : "No file"}
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

const CaseOverViewPopup = forwardRef(({ caseId, onClose }, ref) => {
  const { data: cas, error: fetchError, isLoading } = useGetCaseIdQuery(caseId);
  const { data: lawyers } = useGetAllLawyerQuery();
  const { data: cases } = useGetAllCaseQuery();
  const [updateCase] = useUpdateResultMutation();
  const [sendEmail] = useSendEmailMutation();
  const [email, setEmail] = useState();
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const { data: docs } = useGetAllDocQuery();

  const [existingAdditionalDocs, setExistingAdditionalDocs] = useState([]);

  useEffect(() => {
    if (cas && docs) {
      const filterDocs = docs.filter((doc) => doc.cases === caseId);
      setExistingAdditionalDocs(filterDocs);
    }
  }, [cas, docs]);

  useEffect(() => {
    const fetchData = async () => {
      if (cas) {
        try {
          const response = await fetch(`http://localhost:8081/api/proxy/citizendetails/${cas.cid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [cas]);


  useEffect(() => {
    if (lawyers && cases) {
      const availableLawyers = lawyers.filter((lawyer) => lawyer.enabled === true);
      setFilteredLawyers(availableLawyers);
    }

  }, [lawyers, cases]);

  const handleViewPdf = async (filename) => {
    const file = filename.split("/").pop();

    try {
      const response = await fetch(
        `http://localhost:8765/CASEMICROSERVICE/api/document/file/${file}`
      );
      if (!response.ok) throw new Error("Failed to fetch document");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  if (fetchError) {
    console.log(fetchError);
  }

  const getEmail = (cid) => {
    const lawyerMail = lawyers.find((lawyer) => lawyer.cid === cid);
    setEmail(lawyerMail.email);
  }

  const [expandedSections, setExpandedSections] = useState({
    caseDetails: true,
    applicantInfo: false,
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

  const [caseInfo, setCaseInfo] = useState({
    aLawyer: "",
    aEmployee: "",
    status: "In Progress",
    caseType: "",
    natureOfCase: "",
    remarks: "",
    scheme: "",
    outcome: ""
  });

 

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

      setCaseInfo({
        aLawyer: cas.aLawyer,
        status: cas.status,
        caseType: cas.caseType,
        natureOfCase: cas.natureOfCase,
        remarks: cas.remarks,
        outcome: cas.outcome,
        scheme: cas.scheme,
        aEmployee: cas.aEmployee,
      });

      setInstitutionInfo({
        institutionName: cas.institutionName,
        officialName: cas.officialName,
        officialContact: cas.officialcNumber,
        officialEmail: cas.officialEmail,
      });
    }
  }, [cas]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const notifyLawyer = async () => {
    const to = email;
    const subject = "Application Assignment";
    const body = `Respected Sir/Madam, There has been a new application assigned to you. Please check the application for further details. Thank you.`;
    await sendEmail({ to, subject, body }).unwrap();
  }

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
    const remarks = caseInfo.remarks;
    const status = caseInfo.status;
    const aLawyer = caseInfo.aLawyer;
    const aEmployee = caseInfo.aEmployee;
    const caseType = caseInfo.caseType;
    const natureOfCase = caseInfo.natureOfCase;
    const outcome = caseInfo.outcome;
    const scheme = caseInfo.scheme;
    console.log(email);
    Swal.fire({
      title: "",
      text: "Are you sure you want to update this case?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = caseId;

          if (email) {
            notifyLawyer();
          }

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
            remarks,
            status,
            aLawyer,
            aEmployee,
            caseType,
            natureOfCase,
            outcome,
            scheme
          }).unwrap();
          Swal.fire({
            title: "Success!",
            text: "Case details have been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });

          onClose();
          window.location.reload();
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update case details. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleCancel = () => {
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
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Lawyer</label>
                      {caseInfo.aLawyer ? (
                        <select
                          className="custom-form-select"
                          value={caseInfo.aLawyer}
                          required
                          onChange={(e) => {
                            setCaseInfo({
                              ...caseInfo,
                              aLawyer: e.target.value,
                            });
                            getEmail(e.target.value);
                          }}
                        >
                          <option value="" disabled>
                            Assign Lawyer
                          </option>
                          {lawyers &&
                            lawyers.map((lawyer) => (
                              <option key={lawyer.id} value={lawyer.cid}>
                                {lawyer.userName + " (" + lawyer.regNo + ")"}
                              </option>
                            ))}
                        </select>
                      ) : (
                        <select
                          className="custom-form-select"
                          value={caseInfo.aLawyer}
                          required
                          onChange={(e) => {
                            setCaseInfo({
                              ...caseInfo,
                              aLawyer: e.target.value,
                            });
                          }}
                        >
                          <option value="" disabled>
                            Assign Lawyer
                          </option>
                          {filteredLawyers &&
                            filteredLawyers.map((lawyer) => (
                              <option key={lawyer.id} value={lawyer.cid}>
                                {lawyer.userName + " (" + lawyer.regNo + ")"}
                              </option>
                            ))}
                        </select>
                      )}

                    </div>

                    <div className="form-field">
                      <label>Service Provider Scheme</label>
                      <select
                      value={caseInfo.scheme}
                        className="selectFields"
                        onChange={(e) =>
                          setCaseInfo({
                            ...caseInfo,
                            scheme: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled selected>
                          Select Scheme
                        </option>
                        <option value="Probono">Probono</option>
                        <option value="Fee-based">Fee-Based</option>
                      </select>
                    </div>

                  </div>

                  <h4>Case Status and Documents</h4>
                  <div className="form-field">
                    <label>Case Status</label>
                    <input
                        type="text"
                        readOnly
                        value={caseInfo.status}
                      />
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Type</label>
                      <input type="text" readOnly value={caseInfo.caseType} />
                    </div>
                    <div className="form-field case-remark-container">
                      <label>Nature of Case</label>
                      <input
                        type="text"
                        readOnly
                        value={caseInfo.natureOfCase}
                      />
                    </div>
                  </div>
                  <h4>Case Results</h4>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Result</label>
                      <select
                        className="case-type-select"
                        value={caseInfo.outcome}
                        onChange={(e) =>
                          setCaseInfo({
                            ...caseInfo,
                            outcome: e.target.value,
                          })
                        }
                      >
                        <option disabled>Select Case Result</option>
                        <option value="Convicted">Convicted</option>
                        <option value="Acquittal">Acquitted</option>
                        <option value="Sentence Reduction">Sentence Reduction</option>
                        <option value="Differred">Differred</option>
                        <option value="Case Negotiation">Negotiated Settlement</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-grid remark-form-grid">
                    <div className="form-field remark-form-field">
                      <label>Remarks</label>
                      <textarea
                        className="case-remark"
                        value={caseInfo.remarks}
                        onChange={(e) =>
                          setCaseInfo({
                            ...caseInfo,
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
                        readOnly
                      />
                    </div>
                    <div className="form-field">
                      <label>Name</label>
                      <input
                        type="text"
                        value={applicantInfo.name}
                        readOnly
                        onChange={(e) =>
                          setApplicantInfo({
                            ...applicantInfo,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    
                  </div>
                </div>
              )}
            </div>

            {existingAdditionalDocs && <div className="section">
              <button
                className="section-header"
                aria-expanded={expandedSections.additionalDocuments}
                onClick={() => toggleSection("additionalDocuments")}
              >
                <span>Additional Documents</span>
                <div className="section-btn-container">
                  {expandedSections.additionalDocuments ? (
                    <Minus color="#15605C" />
                  ) : (
                    <Plus color="#15605C" />
                  )}
                </div>
              </button>
              {expandedSections.additionalDocuments && (
                <div className="section-content">
                  <h3>Check List of Additional Documents*</h3>
                  <div>
                    {/* Existing Additional Documents */}
                    {existingAdditionalDocs.map((doc, index) => (
                      <DocumentItem
                        key={`existing-${index}`}
                        label={
                          doc.description || `Additional Document ${index + 1}`
                        }
                        filename={doc.docName}
                        isLoading={isLoading}
                        onViewPdf={handleViewPdf}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>}
          </div>

          <div className="popup-footer">
            <button onClick={handleConfirm} className="confirm-button">
              Update
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CaseOverViewPopup;
