import React, { useState, forwardRef, useEffect } from "react";
import { X, Plus, Minus, EyeIcon } from "lucide-react";
import "./DetailsPopup.css";
import { useGetCaseIdQuery } from "../slices/caseApiSlice";
import { useUpdateResultMutation } from "../slices/caseApiSlice";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";
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

const EmployeeCasePopup = forwardRef(({ caseId, onClose }, ref) => {
  const { data: cas, error: fetchError, isLoading } = useGetCaseIdQuery(caseId);
  const { data: lawyers, lerror } = useGetAllLawyerQuery();
  const { data: employees } = useGetAllEmployeeQuery();
  const [updateCase] = useUpdateResultMutation();
  const [lawyer, setLawyer] = useState();
  const [employee, setEmployee] = useState();


  const handleViewPdf = async (filename) => {
    const file = filename.split('/').pop();
    
    try {
        const response = await fetch(`http://localhost:8765/CASEMICROSERVICE/api/document/file/${file}`);
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

  useEffect(() => {
    if(lerror){
      console.log(lerror);
    }else if(lawyers && cas && employees){
      const selected = lawyers.find((lwy) => lwy.cid === cas.aLawyer);
      const eSelected = employees.find((emp) => emp.cid === cas.aEmployee);
      setLawyer(selected);
      setEmployee(eSelected);
    }
  }, [cas, lawyers, lerror, fetchError, employees])

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
    status: "In Progress",
    caseType: "",
    natureOfCase: "",
    remarks: "",
    aEmployee: ""
  })

  const [documents, setDocuments] = useState([
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
        aEmployee: cas.aEmployee,
        scheme: cas.scheme
      })

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

  const handleConfirm = async () => {
    const cid = applicantInfo.cidNumber;
    const occupation = applicantInfo.occupation;
    const name = applicantInfo.name;
    const contactNo = applicantInfo.contactNumber;
    const income = applicantInfo.householdIncome;
    const member = applicantInfo.householdMembers;
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
    const status = caseInfo.caseStatus;
    const aLawyer = caseInfo.email;
    const caseType = caseInfo.caseType;
    const natureOfCase = caseInfo.natureOfCase;
    const outcome = caseInfo.outcome;
    const aEmployee = caseInfo.aEmployee;
    const scheme = caseInfo.scheme;

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
          await updateCase({
            id, cid, occupation, name, contactNo, income, member,village, gewog, dzongkhag, pvillage, pgewog, pdzongkhag, institutionName, officialName, officialcNumber,
            officialEmail, remarks, status, aLawyer, caseType, natureOfCase, outcome, aEmployee, scheme
          }).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'Case details have been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          onClose();
          window.location.reload()
        } catch (err) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update case details. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  }
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
                  <h4>Lawyer & Employee Details</h4>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Lawyer</label>
                      <input
                        type="text"
                        value={lawyer?.userName || "No Lawyer Assigned"}
                        readOnly
                      />
                    </div>
                    <div className="form-field">
                      <label>Employee</label>
                      <input
                        type="text"
                        value={cas.aEmployee === "All" ? "All Employee" : employee?.userName}
                        readOnly
                      />
                    </div>
                  </div>

                  <h4>Case Status and Documents</h4>
                  <div className="form-field">
                    <label>Case Status</label>
                    <input
                        type="text"
                        value={caseInfo.status}
                        readOnly
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Type</label>
                      <input type="text"
                        readOnly
                        value={caseInfo.caseType}
                      />
                    </div>
                    <div className="form-field case-remark-container">
                      <label>Nature of Case</label>
                      <input type="text"
                        readOnly
                        value={caseInfo.natureOfCase}
                      />
                    </div>
                  </div>
                  <h4>Case Results</h4>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Case Result</label>
                      <input type="text"
                        readOnly
                        value={caseInfo.outcome ? caseInfo.outcome : "Outcome In Process"}
                      />
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
                    <div className="form-field">
                      <label>Occupation</label>
                      <input
                        type="text"
                        value={applicantInfo.occupation}
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                      <label>Current Village</label>
                      <input
                        type="text"
                        value={applicantInfo.villageCurrent}
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
            {institutionInfo.institutionName && <div className="section">
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
            }

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

export default EmployeeCasePopup;
