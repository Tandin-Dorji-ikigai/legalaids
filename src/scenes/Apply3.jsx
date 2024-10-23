import React, { useState, useCallback } from "react";
import NavBar from "../components/Nav";
import { MdExpandMore } from "react-icons/md";
import "./css/apply.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { usePostCaseMutation } from "../slices/caseApiSlice";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

function Apply3() {
  const location = useLocation();
  const formDataPassed2 = location.state || {};
  const navigate = useNavigate();
  const [postCase, { isLoading }] = usePostCaseMutation();

  const [files, setFiles] = useState({
    cidDoc: null,
    hMemberDoc: null,
    hIncomeDoc: null,
    hCapitalDoc: null,
    cBackgroundDoc: null,
    disabilityDoc: null,
  });

  const handleFileChange = useCallback(
    (fieldName) => (event) => {
      const file = event.target.files[0];
      setFiles((prevFiles) => ({
        ...prevFiles,
        [fieldName]: file,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData();

      Object.entries(formDataPassed2).forEach(([key, value]) => {
        formData.append(key, value);
      });

      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      try {
        await postCase(formData).unwrap();

        // Success alert
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your application has been successfully submitted.",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/home");
      } catch (err) {
        console.log(err);

        // Error alert
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error submitting your application. Please try again.",
        });
      }
    },
    [formDataPassed2, files, postCase, navigate]
  );

  const renderFileInput = useCallback(
    (fieldName, label) => (
      <div className="file-input-container" key={fieldName}>
        <label htmlFor={fieldName}>{label}</label>
        <div className="file-input-wrapper">
          <input
            type="file"
            id={fieldName}
            className="file-input"
            onChange={handleFileChange(fieldName)}
            required
          />
          <div className="file-input-placeholder">
            <FiUpload className="upload-icon" />
            <span>
              {files[fieldName] ? files[fieldName].name : "Browse Files"}
            </span>
          </div>
        </div>
      </div>
    ),
    [files, handleFileChange]
  );

  return (
    <>
      {isLoading && <Loader />}
      <NavBar currentPage="apply1" className="apply-page" />
      <div className="navheight"></div>
      <div className="apply-wrapper">
        <p className="apply-title-main">Application form for legal aid.</p>
        <p className="apply-sub">
          We provide accessible, expert legal aid to ensure justice and
          equality.
        </p>

        <div className="apply-tab">
          <Link to="#">Applicant Information and Details</Link>
          <Link className="mid-tab" to="#">
            Institutions facilitating legal aid applications
          </Link>
          <Link to="#" className="tab-current">
            Check List of Documents
          </Link>
        </div>

        <div className="form-wrapper">
          <form className="apply-form" onSubmit={handleSubmit}>
            <p className="apply-title">Required Documents</p>
            <div className="category-wrapper-third">
              {renderFileInput("cidDoc", "CID or Valid Passport")}
              {renderFileInput("hMemberDoc", "Details of Household members")}
            </div>
            <div className="category-wrapper-third">
              {renderFileInput("hIncomeDoc", "Attachment for household income")}
              {renderFileInput(
                "hCapitalDoc",
                "Attachment for household disposable capital"
              )}
            </div>
            <div className="category-wrapper-third">
              {renderFileInput(
                "cBackgroundDoc",
                "Brief Background of the Case"
              )}
              {renderFileInput(
                "disabilityDoc",
                "Evidence of any form of disability"
              )}
            </div>
            <button
              type="submit"
              className="banner-cta-wrapper apply-cta-wrapper"
            >
              <div className="banner-cta"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
                <div className="icon-container">
                  <MdExpandMore className="expand-more" />
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Apply3;
