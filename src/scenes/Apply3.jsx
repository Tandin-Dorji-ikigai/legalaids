import React, { useState, useCallback, useEffect } from "react";
import NavBar from "../components/Nav";
import { MdExpandMore } from "react-icons/md";
import "./css/apply.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { usePostCaseMutation } from "../slices/caseApiSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Loader from "../components/Loader";

function Apply3() {
  const location = useLocation();
  const formDataPassed2 = location.state || {};
  const navigate = useNavigate();
  const [postCase, { isLoading }] = usePostCaseMutation();

  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

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

      if (!isChecked) {
        setError("You must agree to the terms and conditions!");
        return;
      } else {
        const formData = new FormData();
        Object.entries(formDataPassed2).forEach(([key, value]) => {
          formData.append(key, value);
        });

        Object.entries(files).forEach(([key, file]) => {
          if (file) formData.append(key, file);
        });

        try {
          const res = await postCase(formData).unwrap();
          Swal.fire({
            icon: "success",
            title: "Application Submitted",
            text: `Your application has been successfully submitted. Please use this ID ${res.appid} for application tracking.`,
          });

          navigate("/home");
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: "There was an error submitting your application. Please try again.",
          });
        }
      }
    },

    [formDataPassed2, files, postCase, navigate, isChecked]
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
            accept="application/pdf"
            onChange={handleFileChange(fieldName)}
            required
          />

          <div className="file-input-placeholder">
            <FiUpload className="upload-icon" />
            <span>
              {files[fieldName] ? files[fieldName].name : t("browseFiles")}
            </span>
          </div>
        </div>
      </div>
    ),
    [files, handleFileChange]
  );

  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange); // Listen for language changes

    return () => {
      i18n.off("languageChanged", handleLanguageChange); // Clean up
    };
  }, []);


  return (
    <>
      {isLoading && <Loader />}
      <NavBar currentPage="apply1" className="apply-page" />
      <div className="navheight"></div>
      <div className="apply-wrapper">
        <p className={`apply-title-main ${currentLang === "dz" ? "font-medium-dz" : ""}`}>{t("applyTitleMain")}</p>
        <p className={`apply-sub ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("applySub")}</p>

        <div className="apply-tab">
          <Link
            style={{ paddingBottom: currentLang === "dz" ? '1rem' : '' }}
            className={`tab ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
            to="#"
          >
            {t("tabCurrent")}
          </Link>
          <Link style={{ paddingBottom: currentLang === "dz" ? '1rem' : '' }} className={`tab ${currentLang === "dz" ? "font-xsmall-dz" : ""}`} to="#">{t("midTab")}</Link>
          <Link style={{ paddingBottom: currentLang === "dz" ? '1rem' : '' }} className={`tab-current ${currentLang === "dz" ? "font-xsmall-dz" : ""}`} to="#">{t("lastTab")}</Link>
        </div>

        <div className="form-wrapper">
          <form className="apply-form" onSubmit={handleSubmit}>
            <p className={`apply-title ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t('requiredDocument')}</p>
            <div className="category-wrapper-third" style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>
              {renderFileInput("cidDoc", t('cidorValidPassport'))}
              {renderFileInput("hMemberDoc", t('detailsofHouse'))}
            </div>
            <div className="category-wrapper-third" style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>
              {renderFileInput("hIncomeDoc", t('attachmentforHouse'))}
              {renderFileInput(
                "hCapitalDoc",
                t('attachmentofDisposable')
              )}
            </div>
            <div className="category-wrapper-third" style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>
              {renderFileInput(
                "cBackgroundDoc",
                t('briefBackgroundCase')
              )}
              {renderFileInput(
                "disabilityDoc",
                t('evidenceofDisability')
              )}
            </div>

            <div className="termsAndConditionWrapper">
              <p className={`apply-title ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t('termsAndPolicies')}</p>
              <div className="termsContainer">
                <li style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>{t('terms1')}</li>
                <li style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>{t('terms2')}</li>
                <li style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>{t('terms3')}</li>
              </div>
            </div>

            <div className="custom-form__checkbox-container">
              <label className="custom-form__checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    if (e.target.checked) setError("");
                  }}

                  className="custom-checkbox"
                />
                <span style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>{t('oath')}</span>
              </label>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <button type="submit" className='banner-cta-wrapper apply-cta-wrapper'>
              <div className="banner-cta banner-ctaa" style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>
                {t("apply3apply")}
                <div className="icon-container">
                  <MdExpandMore className='exapnd-more' />
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
