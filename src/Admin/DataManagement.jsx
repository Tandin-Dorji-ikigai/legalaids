import React, { useState, useRef } from "react";
import SideNav from "./DashboardNav";
import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";
import { usePostCaseMutation } from "../slices/caseApiSlice";
import axios from "axios";
import "./css/DataManagement.css";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

// Google Cloud Vision API Key
const apiKey = "AIzaSyByQ1Wg14idjxFbWdEaiB80y35wWWSrYHY";
const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

// DocumentItem Component
const DocumentItem = ({ label, filename }) => (
  <div className="lawyer-document-item">
    <div>
      <span className="lawyer-document-label">{label}</span>
      <span className="lawyer-document-filename">{filename}</span>
    </div>
    <div className="lawyer-document-actions">
      <button className="lawyer-icon-button lawyer-delete">
        <Trash2 size={18} />
      </button>
      <button className="lawyer-icon-button lawyer-add">
        <Plus size={18} />
      </button>
    </div>
  </div>
);

// DataManagement Component
function DataManagement() {
  const [loading, setLoading] = useState(false);
  const [postCase, { isLoading }] = usePostCaseMutation();
  const [files, setFiles] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    applicantInfo: true,
    institutions: true,
    documents: true,
  });
  // const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");

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

  // Function to convert an image to Base64
  const convertImageToBase64 = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const processImage = async (imageUri, setExtractedText) => {
    try {
      // setIsLoading(true);

      //set alert
      Swal.fire({
        icon: "success",
        title: "Loading",
        showConfirmButton: false,
        timer: 1500,
      });

      const base64Image = await convertImageToBase64(imageUri);

      if (!base64Image) {
        throw new Error("Failed to convert image to Base64.");
      }

      const requestBody = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "TEXT_DETECTION" }],
          },
        ],
      };

      const response = await axios.post(visionApiUrl, requestBody);
      const textAnnotations = response.data.responses[0]?.textAnnotations;
      const extractedText = textAnnotations
        ? textAnnotations[0].description
        : "";
      setExtractedText(extractedText);
      updateStateWithExtractedData(extractedText); // Update state with extracted data
    } catch (error) {
      console.error("Error processing image:", error.message);
    }
  };

  const updateStateWithExtractedData = (extractedText) => {
    const applicantInfoUpdates = {};
    const institutionInfoUpdates = {};
    const lines = extractedText.split("\n");

    lines.forEach((line, index) => {
      // Remove asterisks and extra spaces from the line
      line = line
        .replace(/\*/g, "")
        .replace(/\.\.\.*/, "")
        .trim();
      // Handle applicant details
      if (line.startsWith("1. Name:")) {
        applicantInfoUpdates.name = line.replace("1. Name:", "").trim();
      } else if (line.startsWith("2. CID NO.")) {
        applicantInfoUpdates.cidNumber = line.replace("2. CID NO.", "").trim();
      } else if (line.startsWith("3. Occupation Details:")) {
        applicantInfoUpdates.occupation = line
          .replace("3. Occupation Details:", "")
          .trim();
      } else if (line.startsWith("4. Contact No./Emergency Contact No.")) {
        applicantInfoUpdates.contactNumber = line
          .replace("4. Contact No./Emergency Contact No.", "")
          .trim();
      } else if (line.startsWith("C. Total Household Income (Nu.)")) {
        applicantInfoUpdates.householdIncome = line
          .replace("C. Total Household Income (Nu.)", "")
          .trim();
      } else if (line.startsWith("D. Total Household Member")) {
        applicantInfoUpdates.householdMembers = line
          .replace("D. Total Household Member", "")
          .trim();
      } else if (line.startsWith("5. Current Address")) {
        const currentAddressLines = lines.slice(index + 1, index + 4);
        if (currentAddressLines.length >= 3) {
          applicantInfoUpdates.villageCurrent = currentAddressLines[0]
            .replace("Village:", "")
            .trim();
          applicantInfoUpdates.gewogCurrent = currentAddressLines[1]
            .replace("Gewog:", "")
            .trim();
          applicantInfoUpdates.dzongkhagCurrent = currentAddressLines[2]
            .replace("Dzongkhag:", "")
            .trim();
          applicantInfoUpdates.dzongkhag = currentAddressLines[2]
            .replace("Dzongkhag:", "")
            .trim();
        }
      } else if (line.startsWith("6. Permanent Address")) {
        const permanentAddressLines = lines.slice(index + 1, index + 4);
        if (permanentAddressLines.length >= 3) {
          applicantInfoUpdates.villagePermanent = permanentAddressLines[0]
            .replace("Village:", "")
            .trim();
          applicantInfoUpdates.gewogPermanent = permanentAddressLines[1]
            .replace("Gewog:", "")
            .trim();
          applicantInfoUpdates.dzongkhagPermanent = permanentAddressLines[2]
            .replace("Dzongkhag:", "")
            .trim();
        }
      } else if (line.includes("Name of the Institution")) {
        institutionInfoUpdates.institutionName = lines[index + 1]?.trim();
      } else if (
        line.includes(
          "Dealing Official/Staff Details (Name, Contact No., Email)"
        )
      ) {
        const nameLine = lines[index + 1]?.trim();

        // Extracting official name and email
        const nameEmailMatch = nameLine.match(/Name:\s*(.+?)\s*Email:\s*(.+)/);
        if (nameEmailMatch) {
          institutionInfoUpdates.officialName =
            nameEmailMatch[1].trim("Name :");
          institutionInfoUpdates.officialEmail = nameEmailMatch[2].trim();
        }

        // Extracting official contact number
        const contactLine = lines[index + 2]?.trim();
        institutionInfoUpdates.officialContact = contactLine
          .replace("Contact:", "")
          .trim();
      }
    });

    setApplicantInfo((prev) => ({ ...prev, ...applicantInfoUpdates }));
    setInstitutionInfo((prev) => ({ ...prev, ...institutionInfoUpdates }));
  };

  const [expandedDocuments, setExpandedDocuments] = useState([
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
    const selectedFile = event.target.files[0]; // Only take the first file
    setFiles((prevFiles) => ({
      ...prevFiles,
      [docName]: selectedFile,
    }));

    // Process the image using OCR for image files only
    if (selectedFile.type.startsWith("image/")) {
      const imageUri = URL.createObjectURL(selectedFile);
      processImage(imageUri, setExtractedText);
    }
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  const fileInputRef = useRef(null);
  const handleScanButtonClick = () => {
    // Programmatically click the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          <div className="excel-header">Automated Case Data Entry</div>
          <div className="file-btn-container">
            <div className="file-upload-btn-container">
              <button
                className="scan-document-btn"
                onClick={handleScanButtonClick} // Attach the click handler
              >
                Scan Document
              </button>
              <div className="lawyer-upload-section">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="lawyer-upload-input"
                  ref={fileInputRef} // Attach the ref to the input
                  style={{ display: "none" }} // Hide the input
                />
              </div>
            </div>
            <div className="file-upload-btn-container">
              <button
                className="scan-document-btn"
                onClick={handleScanButtonClick} // Attach the click handler
              >
                Upload Excel File
              </button>
              <div className="lawyer-upload-section">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="lawyer-upload-input"
                  ref={fileInputRef} // Attach the ref to the input
                  style={{ display: "none" }} // Hide the input
                />
              </div>
            </div>
          </div>
          <div className="excel-header">Add Case Form</div>
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
