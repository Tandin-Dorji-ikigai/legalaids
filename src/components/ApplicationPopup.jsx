import React, { useState, forwardRef, useEffect } from "react";
import { Plus, Minus, EyeIcon } from "lucide-react";
import "./DetailsPopup.css";
import { useGetCaseIdQuery } from "../slices/caseApiSlice";
import { useUpdateCaseMutation } from "../slices/caseApiSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useSendEmailMutation } from "../slices/emailApiSlice";
import { useGetAllCouncilQuery } from "../slices/councilApiSlice";
import HouseholdPopup from "./HouseholdPopup";

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
  const { data: employees } = useGetAllEmployeeQuery();
  const { data: councils } = useGetAllCouncilQuery();
  const [updateCase] = useUpdateCaseMutation();
  const [sendEmail] = useSendEmailMutation();
  const [email, setEmail] = useState();

  const [filteredEmployees, setFilteredEmployees] = useState([]);
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


  useEffect(() => {
    if (employees) {
      const availableEmployees = employees.filter((employee) => employee.enabled === true);

      setFilteredEmployees(availableEmployees);
    }

  }, [employees]);

  const [caseInfo, setCaseInfo] = useState({
    caseType: "Walk In",
    natureOfCase: "Civil",
    aEmployee: "",
    aLawyer: "",
    status: "",
    remarks: "",
    outcome: "",
    scheme: "",
  })

  const getEmail = (cid) => {
    if (cid !== "All") {
      const employeeMail = employees.find((employee) => employee.cid === cid);
      setEmail(employeeMail.email);
    }
  }


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
    { label: "Details of Household members", filename: null, docKey: 'hMemberDoc' },
    { label: "Attachment for household income", filename: null, docKey: 'hIncomeDoc' },
    { label: "Attachment for household disposable capital", filename: null, docKey: 'hCapitalDoc' },
    { label: "Brief Background of the Case*", filename: null, docKey: 'cBackgroundDoc' },
    { label: "Evidence of any form of disability.", filename: null, docKey: 'disabilityDoc' },
  ]);

  useEffect(() => {
    if (cas) {
      setCaseInfo({
        caseType: caseInfo.caseType,
        natureOfCase: caseInfo.natureOfCase,
        aEmployee: cas.aEmployee,
        remarks: cas.remarks,
        outcome: cas.outcome,
        scheme: cas.scheme,
        aLawyer: cas.aLawyer,
        status: cas.status
      })

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

  const notifyEmployee = async () => {
    const to = email;
    const subject = "Application Assignment";
    const body = `Respected Sir/Madam, There has been a new application assigned to you. Please check the application for further details. Thank you.`;
    await sendEmail({ to, subject, body }).unwrap();
  }

  const notifyCouncil = () => {
    councils.map(async (council) => {
      const to = council.email;
      const subject = "New Application";
      const body = `Respected Sir/Madam, There has been a new application approved. Please check the application for further details. Thank you.`;
      await sendEmail({ to, subject, body }).unwrap();
    });
  }

  const handleConfirm = async () => {
    const {
      cidNumber: cid,
      name,
      occupation,
      contactNumber: contactNo,
      householdIncome: income,
      householdMembers: member,
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

    const {
      caseType,
      natureOfCase,
      aEmployee,
      scheme,
      aLawyer,
      outcome,
      remarks
    } = caseInfo;

    const status = "In Progress";

    Swal.fire({
      title: "",
      text: "Are you sure you want to accept this case?",
      icon: "question",
      showDenyButton: true,
      confirmButtonColor: "#1E306D",
      denyButtonColor: "#4590CF",
      confirmButtonText: "Confirm",
      denyButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateCase({
            id: caseId,
            cid,
            occupation,
            name,
            contactNo,
            income,
            member,
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
            caseType,
            natureOfCase,
            status,
            aEmployee,
            scheme,
            aLawyer,
            outcome,
            remarks
          }).unwrap();

          notifyCouncil();
          if (email) {
            notifyEmployee();
          }

          Swal.fire({
            title: "Success!",
            text: "The case has been updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
          window.location.reload()

        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: "There was an error updating the case.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } else if (result.isDenied) {
        try {

          if (email) {
            notifyEmployee();
          }

          await updateCase({
            id: caseId,
            cid,
            occupation,
            name,
            contactNo,
            income,
            member,
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
            caseType,
            natureOfCase,
            aEmployee,
            scheme,
            aLawyer,
            outcome,
            remarks
          }).unwrap();

          Swal.fire({
            title: "Success!",
            text: "The case has been updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
          window.location.reload()

        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: "There was an error updating the case.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    });
  };

  const handleCancel = () => {
    const {
      cidNumber: cid,
      name,
      occupation,
      contactNumber: contactNo,
      householdIncome: income,
      householdMembers: member,
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

    const {
      caseType,
      natureOfCase,
      scheme,
      aLawyer,
      outcome,
      remarks
    } = caseInfo;

    const status = "Dismissed";

    Swal.fire({
      title: "",
      text: "Are you sure you want to decline this case?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateCase({
            id: caseId,
            cid,
            occupation,
            name,
            contactNo,
            income,
            member,
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
            caseType,
            natureOfCase,
            status,
            scheme,
            aLawyer,
            outcome,
            remarks
          }).unwrap();

          Swal.fire({
            title: "Success!",
            text: "The case has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });

        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: "There was an error updating the case.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    });
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
                  <h4>Employee Details</h4>
                  <div className="form-grid layer-detail-container">
                    <div className="form-field">
                      <label>Employee</label>
                      <select
                        className="custom-form-select"
                        value={caseInfo.aEmployee}
                        required
                        onChange={(e) => {
                          setCaseInfo({
                            ...caseInfo,
                            aEmployee: e.target.value,
                          });
                          getEmail(e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Assign Employee
                        </option>
                        <option value="All">
                          All Employee
                        </option>
                        {filteredEmployees &&
                          filteredEmployees.map((employee) => (
                            <option key={employee.id} value={employee.cid}>
                              {employee.userName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <h4>Case Status</h4>
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

                        className="selectFields"
                      >
                        <option value="" disabled selected>Select Case Type</option>
                        <option value="Walk In">Walk In</option>
                        <option value="Referral">Referral</option>
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
                        className="selectFields"
                      >
                        <option value="" disabled selected>Select Nature Of Case</option>
                        <option value="Criminal">Criminal</option>
                        <option value="Civil">Civil</option>
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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

                  <h4>Current Addresses</h4>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Village</label>
                      <input
                        type="text"
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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


            {institutionInfo.institutionName && <div className="section">
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
            </div>}

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