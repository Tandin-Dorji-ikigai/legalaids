import React, { useEffect, useState } from "react";
import NavBar from "../components/Nav";
import "./css/apply.css";
import { MdExpandMore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useGetCaseQuery } from "../slices/caseApiSlice";
import { useGetAllCaseQuery } from "../slices/caseApiSlice";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useSelector } from "react-redux";


function TrackApplication() {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const { userInfo } = useSelector((state) => state.auth);
  const [ID, setID] = useState("");
  const { data: cases } = useGetAllCaseQuery()
  const [selectedCase, setSelectedCase] = useState([])
  const [formData, setFormData] = useState({
    applicationId: "",
    cid: "",
    name: "",
    caseType: "",
    dateSubmitted: "",
    assignedLawyer: "",
  });
  useEffect(() => {
    if (userInfo && cases) {
      const pendingCases = cases.filter((caseItem) => caseItem.cid === userInfo.user.username);
      setSelectedCase(pendingCases);
    }
  }, [userInfo, cases]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [error, setError] = useState("");

  const { data: cas, error: fetchError } = useGetCaseQuery(ID);

  const handleSearch = (e) => {

    e.preventDefault();
    if (!ID.startsWith("APPID")) {
      setError(
        <span className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
          {t('invalidId')}
        </span>
      );
      return;
    }

    if (!ID) {
      setError(
        <span className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
          {t('validId')}
        </span>
      );
      return;
    }
    if (fetchError) {
      setError(
        <span className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
          {t('errorThrow')}
        </span>
      );
      return;
    }


    if (ID && !cas) {
      const errorMessage = t('noApplication') + `${ID}`;
      const errorClass = currentLang === "dz" ? "font-xsmall-dz" : "";
      setError(<span className={errorClass}>{errorMessage}</span>);
      return;
    }


    if (cas) {
      setFormData({
        applicationId: cas.appid,
        cid: cas.cid,
        name: cas.name,
        caseType: cas.caseType,
        dateSubmitted: cas.contactNo,
        assignedLawyer: cas.aLawyer,
      });
      setApplicationStatus(cas.status);
      setIsSubmitted(true);
      setError("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#00BA32";
      case "In Progress":
        return "#15605C";
      default:
        return "#8A8A8A";
    }
  };

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NavBar currentPage="track" />

      <div>
        <div className="navheight"></div>
        <p className={`apply-title-main ${currentLang === "dz" ? "font-medium-dz" : ""}`}>{t('applicationTrack')}</p>
        <p className={`apply-sub ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t('justice')}
        </p>

        {!userInfo && <form onSubmit={handleSearch} className="search-form-container">
          <input
            type="text"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            placeholder={t("EnterAppId")}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>}
        {userInfo && <div className="applicationTableContainer">
          <div className="tableWrapper">
            <div className="tableHeader">
              All Application
            </div>
            <div className="tableContent">
              {selectedCase.map((caseItem, index) => (
                <div key={index} className="applicationWrapper">
                  <div className="applicationDetails">
                    <div>
                      <p className="appID">
                        Registration ID : <span>{caseItem.appid}</span>
                      </p>
                      <p className="appDate">
                        Date: <span>{caseItem.aDate}</span>
                      </p>
                    </div>
                    <div
                      className="application-status"
                      style={{
                        backgroundColor: getStatusColor(caseItem.status),
                      }}
                    >
                      <p style={{ marginTop: currentLang === "dz" ? "-1em" : "" }}>
                        {caseItem.status ? (
                          caseItem.status
                        ) : (
                          <span className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                            {t("pending")}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}



            </div>
          </div>
        </div>
        }

        {error && <p className="error-message">{error}</p>}

        {isSubmitted && (
          <div className="apply-wrapper">
            <div className="form-wrapper">
              <form className="apply-form">
                <p className={`apply-title ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t('applicationDetails')}</p>
                <div className="category-wrapper">
                  <div
                    className="application-status"
                    style={{
                      backgroundColor: getStatusColor(applicationStatus),

                    }}
                  >
                    <p style={{ marginTop: currentLang === "dz" ? "-1em" : "" }}>{applicationStatus ? applicationStatus : (<span className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t('pending')}</span>
                    )}</p>
                  </div>

                  <div className="track-form-row">
                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                      {t('applicationId')}
                      <input
                        className="form-input"
                        type="text"
                        name="applicationId"
                        value={formData.applicationId}
                        readOnly
                      />
                    </label>

                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                      {t('userCid')}
                      <input
                        className="form-input"
                        type="text"
                        name="cid"
                        value={formData.cid}
                        readOnly
                      />
                    </label>

                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                      {t('userName')}
                      <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="track-form-row">
                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                      {t('caseType')}
                      <input
                        className="form-input"
                        type="text"
                        name="caseType"
                        value={formData.caseType && formData.caseType !== 'null' ? formData.caseType : "Case Type Not Defined"}
                        readOnly
                      />
                    </label>

                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                      {t('contactNumber')}
                      <input
                        className="form-input"
                        type="text"
                        name="dateSubmitted"
                        value={formData.dateSubmitted}
                        readOnly
                      />
                    </label>

                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                      {t('assignedLawyer')}
                      <input
                        className="form-input"
                        type="text"
                        name="assignedLawyer"
                        value={formData.assignedLawyer ? formData.assignedLawyer : "Lawyer Not Assigned"}
                        readOnly
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <p className={`copyright-sigup ${currentLang === "dz" ? "font-xxsmall-dz" : ""}`} style={{ marginBottom: "1em" }}>&copy; {t('copyRight')}</p>
      </div>
      <Footer />
    </main>
  );
}

export default TrackApplication;
