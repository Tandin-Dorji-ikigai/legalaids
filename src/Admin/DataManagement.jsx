import React, { useState, useEffect } from "react";
import SideNav from "./DashboardNav";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePostCaseMutation } from "../slices/caseApiSlice";
import { useSendEmailMutation } from "../slices/emailApiSlice";
import { useGetAllAdminQuery } from "../slices/adminSlice";
import "./css/DataManagement.css";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { useGetCensusQuery } from "../slices/censusSlice";

// DataManagement Component
function DataManagement() {
  const [postCase, { isLoading }] = usePostCaseMutation();
  const { data: admins } = useGetAllAdminQuery();
  const [sendEmail, { isMailLoading }] = useSendEmailMutation();
  const [files, setFiles] = useState([]);

  // citizienship details
  const [cid, setCid] = useState('');
  const [censusData, setCensusData] = useState(null);
  const [loading, setLoading] = useState(false);

  const shouldFetch = cid.length === 11;
  const { data, error, isLoading: isFetching } = useGetCensusQuery(cid, { skip: !shouldFetch });

  useEffect(() => {
    if (data) {
      const result = data?.citizenDetailsResponse?.citizenDetail?.[0] || {};
      setCensusData(result);
    }
  }, [data]);

  useEffect(() => {
    if (censusData && cid.length === 11) {
      setApplicantInfo((prevFormData) => ({
        ...prevFormData,
        dzongkhagPermanent: censusData?.dzongkhagName || '',
        gewogPermanent: censusData?.gewogName || '',
        villagePermanent: censusData?.villageName || '',
      }));
    }
  }, [censusData, cid]);

  const [expandedSections, setExpandedSections] = useState({
    applicantInfo: true,
    institutions: true,
    documents: true,
    caseDetails: true
  });

  const [caseInfo, setCaseInfo] = useState({
    caseType: "",
    natureOfCase: ""
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

  const [expandedDocuments] = useState([
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

  const handleChangeCid = (e) => {
    const { value } = e.target;
    setApplicantInfo(prev => ({
      ...prev,
      cidNumber: value
    }));
    setCid(value);
  };

  const notifyAdmin = (id) => {
    admins.map(async (admin) => {
      const to = admin.email;
      const subject = "New Application";
      const body = `Respected Sir/Madam, There has been a new application applied with Application ID ${id}. Please check the application for further details. Thank you.`;
      await sendEmail({ to, subject, body }).unwrap();
    });
  };

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append("cid", applicantInfo.cidNumber);
    formData.append("occupation", applicantInfo.occupation);
    formData.append("name", applicantInfo.name);
    formData.append("contactNo", applicantInfo.contactNumber);
    formData.append("income", applicantInfo.householdIncome);
    formData.append("member", applicantInfo.householdMembers);
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
          notifyAdmin(res.appid);

          Swal.fire({
            icon: "success",
            title: "Application Submitted",
            text: `Your application has been successfully submitted. Please use this ID ${res.appid} for application tracking.`,
            showConfirmButton: false,
            timer: 2000
          });
          window.location.reload();
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an error submitting the case data.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleFileUpload = (event, docName) => {
    const selectedFile = event.target.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Please upload a PDF file smaller than 5MB',
          confirmButtonText: 'OK'
        });
        event.target.value = '';
        return;
      }

      if (selectedFile.type !== 'application/pdf') {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload a PDF file',
          confirmButtonText: 'OK'
        });
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
    return;
  };

  return (
    <div className="dashboard-container">
      {isLoading && <Loader />}
      {loading && <Loader />}
      {isMailLoading && <Loader />}
      {isFetching && <Loader />}
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Data Management</div>
        <div className="case-details-container">
          <div className="excel-header">Add Case Form</div>
          <div className="section">
            <button
              className="section-header"
              onClick={() => toggleSection("caseDetails")}
            >
              <span>Case Information and Details</span>
              {expandedSections.caseDetails ? <ChevronUp /> : <ChevronDown />}
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
                      className="selectFields"
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
          <div className="section">
            <button
              className="section-header"
              onClick={() => toggleSection("applicantInfo")}
            >
              <span>Applicant Information and Details</span>
              {expandedSections.applicantInfo ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.applicantInfo && (
              <div className="section-content">
                <h3>Personal Information and Details of Applicant</h3>
                <h4>Applicant Details</h4>
                <div className="form-grid">
                  <div className="form-field">
                    <label>CID Number</label>
                    <input
                      type="number"
                      placeholder="eg.11308231453"
                      value={applicantInfo.cidNumber}
                      required
                      onChange={handleChangeCid}
                    />
                  </div>
                  <div className="form-field">
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
                  <div className="form-field">
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
                  <div className="form-field">
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
                <div className="form-grid"></div>

                <h4>Household Details</h4>
                <div className="form-grid">
                  <div className="form-field">
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
                  <div className="form-field">
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
                </div>

                <h4>Current Addresses</h4>
                <div className="form-grid">
                  <div className="form-field">
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
                  <div className="form-field">
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
                  <div className="form-field">
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
                <div className="form-grid">
                  <div className="form-field">
                    <label>Village</label>
                    <input
                      type="text"
                      value={applicantInfo.villagePermanent || "Enter Village"}
                      required
                      readOnly
                    />
                  </div>
                  <div className="form-field">
                    <label>Gewog</label>
                    <input
                      type="text"
                      value={applicantInfo.gewogPermanent || "Enter Gewog"}
                      required
                      readOnly
                    />
                  </div>
                  <div className="form-field">
                    <label>Dzongkhag</label>
                    <input
                      type="text"
                      value={applicantInfo.dzongkhagPermanent || "Enter Dzongkhag"}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="section">
            <button
              className="section-header"
              onClick={() => toggleSection("institutions")}
            >
              <span>Institutions and Their Details</span>
              {expandedSections.institutions ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.institutions && (
              <div className="section-content">
                <h3>Institution Information</h3>
                <div className="form-grid">
                  {Object.keys(institutionInfo).map((key) => (
                    <div className="form-field" key={key}>
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

          <div className="section">
            <button
              className="section-header"
              onClick={() => toggleSection("documents")}
            >
              <span>Check List of Documents</span>
              {expandedSections.documents ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.documents && (
              <div className="section-content">
                <h3>Check List of Documents*</h3>
                <div className="document-list">
                  {expandedDocuments.map((doc, index) => (
                    <div key={index} className="document-item-submit">
                      <label className="document-label">{doc.label}</label>
                      <input
                        type="file"
                        name={doc.name}
                        accept=".pdf, application/pdf"
                        className="document-filename"
                        required
                        onChange={(e) => handleFileUpload(e, doc.name)}
                        maxsize={5 * 1024 * 1024}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="document-actions">
          <button
            onClick={handleConfirm}
            className="confirm-button"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Confirm'}
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataManagement;
