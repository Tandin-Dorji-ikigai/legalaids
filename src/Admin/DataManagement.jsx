import React, { useState } from "react";
import SideNav from "./DashboardNav";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePostCaseMutation } from "../slices/caseApiSlice";
import "./css/DataManagement.css";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

// DataManagement Component
function DataManagement() {
  const [postCase, { isLoading }] = usePostCaseMutation();
  const [files, setFiles] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    applicantInfo: true,
    institutions: true,
    documents: true,
    caseDetails: true
  });

  // const [isLoading, setIsLoading] = useState(false);
  const [caseInfo, setCaseInfo] = useState({
    caseType: "",
    natureOfCase: ""
  })



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

  const [expandedDocuments] = useState([
    { label: "CID or Valid Passport", name: "cidDoc" },
    { label: "Details of Household members", name: "hMemberDoc" },
    { label: "Attachment for household income", name: "hIncomeDoc" },
    {
      label: "Attachment for household disposable capital",
      name: "hCapitalDoc",
    },
    { label: "Brief Background of the Case*", name: "cBackgroundDoc" },
    { label: "Evidence of any form of disability.", name: "disabilityDoc" },
  ]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleConfirm = async () => {
    console.log(caseInfo.caseType)
    const formData = new FormData();
    formData.append("cid", applicantInfo.cidNumber);
    formData.append("occupation", applicantInfo.occupation);
    formData.append("name", applicantInfo.name);
    formData.append("contactNo", applicantInfo.contactNumber);
    formData.append("income", applicantInfo.householdIncome);
    formData.append("member", applicantInfo.householdMembers);
    formData.append("cdzongkhag", applicantInfo.dzongkhag);
    formData.append("village", applicantInfo.villageCurrent);
    formData.append("gewog", applicantInfo.gewogCurrent);
    formData.append("dzongkhag", applicantInfo.dzongkhagCurrent);
    formData.append("pvillage", applicantInfo.villagePermanent);
    formData.append("pgewog", applicantInfo.gewogPermanent);
    formData.append("pdzongkhag", applicantInfo.dzongkhagPermanent);
    formData.append("institutionName", institutionInfo.institutionName);
    formData.append("officialName", institutionInfo.officialName);
    formData.append("officialcNumber", institutionInfo.officialContact);
    formData.append("officialEmail", institutionInfo.officialEmail);
    formData.append("caseType", caseInfo.caseType);
    formData.append("natureOfCase", caseInfo.natureOfCase);

    // Append files based on their document names
    expandedDocuments.forEach((doc) => {
      if (files[doc.name]) {
        formData.append(doc.name, files[doc.name]);
      }
    });

    try {
      const res = await postCase(formData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: `Your application has been successfully submitted. Please use this ID ${res.appid} for application tracking.`,
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "There was an error submitting the case data.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleFileUpload = (event, docName) => {
    const selectedFile = event.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [docName]: selectedFile,
    }));
  };

  const handleCancel = () => {
    return
  };

  return (
    <div className="dashboard-container">
      {isLoading && <Loader />}
      {/* {isLoading && <Loader />}  */}
      {/* <Loader/> */}
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Data Management</div>
        <div className="lawyer-case-details-container">
          <div className="excel-header">Add Case Form</div>
          <div className="lawyer-section">
            <button
              className="lawyer-section-header"
              onClick={() => toggleSection("caseDetails")}
            >
              <span>Case Information and Details</span>
              {expandedSections.caseDetails ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.caseDetails && (
              <div className="lawyer-section-content">
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
              <span>Institutions and Their Details</span>
              {expandedSections.institutions ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.institutions && (
              <div className="lawyer-section-content">
                <h3>Institution Information</h3>
                <div className="lawyer-form-grid">
                  {Object.keys(institutionInfo).map((key) => (
                    <div className="lawyer-form-field" key={key}>
                      <label>
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${key
                          .replace(/([A-Z])/g, " $1")
                          .toLowerCase()}`}
                        value={institutionInfo[key]}
                        onChange={(e) =>
                          setInstitutionInfo({
                            ...institutionInfo,
                            [key]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
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
                <div className="lawyer-document-list">
                  {expandedDocuments.map((doc, index) => (
                    <div key={index} className="document-upload-item">
                      <label>{doc.label}</label>
                      <input
                        type="file"
                        name={doc.name}
                        onChange={(e) => handleFileUpload(e, doc.name)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="lawyer-action-buttons">
          <button
            onClick={handleConfirm}
            className="lawyer-confirm-button"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Confirm'}
          </button>
          <button onClick={handleCancel} className="lawyer-cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataManagement;
