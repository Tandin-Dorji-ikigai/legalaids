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
    console.log(caseInfo);
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

    Swal.fire({
      title: "",
      text: "Are you sure you want to add this case?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
  };

  const handleFileUpload = (event, docName) => {
    const selectedFile = event.target.files[0];

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Please upload a PDF file smaller than 5MB',
          confirmButtonText: 'OK'
        });
        // Clear the file input
        event.target.value = '';
        return;
      }

      // Optional: Additional file type check
      if (selectedFile.type !== 'application/pdf') {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload a PDF file',
          confirmButtonText: 'OK'
        });
        // Clear the file input
        event.target.value = '';
        return;
      }

      setFiles((prevFiles) => ({
        ...prevFiles,
        [docName]: selectedFile,
      }));
    }
  };

  const handleCancel = () => {
    return
  };

  return (
    <div className="dashboard-container">
      {isLoading && <Loader />}
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
                      className="selectFields"
                    >
                      <option value="" disabled>Select Case Type</option>
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
                      <option value="" disabled>Select Nature Of Case</option>
                      <option value="Criminal">Criminal</option>
                      <option value="Civil">Civil</option>
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
                      placeholder="eg.11308231453"
                      value={applicantInfo.cidNumber}
                      required
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
                      placeholder="eg.Wangmo"
                      required
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
                      required
                      value={applicantInfo.occupation}
                      placeholder="eg.Civil Servant"
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
                      type="number"
                      value={applicantInfo.contactNumber}
                      placeholder="eg.17846354"
                      required
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
                      type="number"
                      value={applicantInfo.householdIncome}
                      required
                      placeholder="eg.8000"
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
                      type="number"
                      value={applicantInfo.householdMembers}
                      required
                      placeholder="eg.6"
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                        required
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
                        accept=".pdf, application/pdf"
                        required
                        onChange={(e) => handleFileUpload(e, doc.name)}
                        maxsize={5 * 1024 * 1024
                        }
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
