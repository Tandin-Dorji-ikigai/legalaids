import React, { useEffect, useState } from "react";
import NavBar from "../components/Nav";
import { Link } from "react-router-dom";
import LegalBanner from "../assets/legalBanner.png";
import { MdExpandMore, MdOutlineGavel, MdOutlineHandshake, MdOutlineVolunteerActivism, MdOutlineDescription, MdOutlineFamilyRestroom, MdOutlineAssuredWorkload, MdDiversity3, MdOutlineHealing, MdOutlineVerifiedUser, MdOutlineAccountBalance } from "react-icons/md";
import EligibleImg from "../assets/eligible.png";
import Footer from "../components/Footer";
import "./css/legal.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function LegalIssues() {
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

  return (
    <>
      <NavBar currentPage="legal" />
      <div className="Home-banner-wrapper">
        <div className="banner">
          <div className="banner-content">
            <p className={`banner-topic legal-banner-topic ${currentLang === "dz" ? "font-large-dz" : ""}`}>
              {t("legalAidAndSupport")}
            </p>
            <p style={{ paddingTop: "20px" }} className={`banner-subTopic legal-banner-sub ${currentLang === "dz" ? "font-small-dz" : ""}`}>
              {t("comprehensiveLegalAssistance")}
            </p>

            <Link to="/apply1" className="banner-cta-wrapper legal-banner-cta-wrapper">
              <div className={`banner-cta legal-banner-cta`}>
                <p className={`${currentLang === "dz" ? "font-small-dz" : ""}`}  style={{marginTop: currentLang === "dz" ? "-0.5em" : ""}}>{t("applyForLegalAid")}</p>
                <div className="icon-container">
                  <MdExpandMore className="exapnd-more" />
                </div>
              </div>
            </Link>
          </div>
          <div className="banner-image">
            <div className="banner-img-wrapper">
              <img src={LegalBanner} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="service-wrapper legal-service-wrapper legal-issue-legal-service">
        <p className={`service-topic  ${currentLang === "dz" ? "font-medium-dz" : ""}`}>{t("ourLegalServices")}</p>
        <p className={`service-subtopic ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("tailoredLegalSolutions")}</p>

        <div className="service-container">
          <div className="service-main">
            <div className="service-content">
              <MdOutlineGavel className="service-icon" />
              <p className={`service-content-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("legalAdvice")}</p>
              <p style={{ fontSize: "23px" }} className={` service-content-des ${currentLang === "dz" ? "font-xxxsmall-dz" : ""}`}>
                {t("expertLegalAdvice")}.
              </p>
              <p style={{ fontSize: "19px" }} className={` service-content-des ${currentLang === "dz" ? "font-xxxsmall-dz" : ""}`}>
                {t("consultationsHelp")}{" "}
              </p>
            </div>
          </div>

          <div className="service-main">
            <div className="service-content">
              <MdOutlineHandshake className="service-icon"/>
              <p className={`service-content-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("legalAssistance")}</p>
              <p  className={` service-content-des ${currentLang === "dz" ? "font-xxxsmall-dz" : ""}`}>
                {t("helpDraftingDocuments")}
              </p>
              <p className={` service-content-des ${currentLang === "dz" ? "font-xxxsmall-dz" : ""}`}>
                {t("paperworkCompliance")}
              </p>
            </div>
          </div>

          <div className="service-main">
            <div className="service-content">
              <MdOutlineVolunteerActivism className="service-icon" />
              <p className={`service-content-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("legalRepresentation")}</p>
              <p className={` service-content-des ${currentLang === "dz" ? "font-xxxsmall-dz" : ""}`}>
                {t("fullLegalRepresentation")}
              </p>
              <p className={` service-content-des ${currentLang === "dz" ? "font-xxxsmall-dz" : ""}`}>
                {t("handleYourCase")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="whitespace"></div>

      <div className="eligible-wrapper" style={{ backgroundImage: `url(${EligibleImg})` }}>
        {/* <img src={EligibleImg} alt=""/> */}
        <div className="eligible-content-wrapper">
          <div className="main-eligible">
            <p className={`${currentLang === "dz" ? "font-medium-dz" : ""}`}>{t("whoIsEligible")}</p>
            <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("legalAidEligibility")}</p>
          </div>
          <div className="eligible-criteria">
            <div className="criteria-1">
              <p className={`${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("indigentPerson")}</p>
              <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("cannotProvideNecessities")}</p>
            </div>

            <div className="criteria-1 criteria-2">
              <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("specialCases")}</p>
              <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("childrenInConflict")}</p>
              <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("providedLegalAdvice")}</p>
            </div>

            <div className="criteria-1 criteria-3">
              <p className={`${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("personsWithDisabilities")} </p>
              <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("eligibleForLegalAdvice")}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="legal-grid-container">
        <div class="legal-grid-item legal-grid-item1">
          <p className={`${currentLang === "dz" ? "font-medium-dz" : ""}`}>{t("variousLegalChallenges")}</p>
          <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("commonLegalIssues")}</p>
        </div>
        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineDescription className="issues-icon" />
          <p className={`issues-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("contractDisputes")}</p>
          <p className={`issues-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("helpClientsResolveConflicts")} </p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineFamilyRestroom className="issues-icon" />
          <p className={`issues-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("familyLawMatters")}</p>
          <p className={`issues-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("servicesIncludeMediation")}</p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineAssuredWorkload className="issues-icon" />
          <p className={`issues-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("criminalDefense")}</p>
          <p className={`issues-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("legalTeamProvidesDefense")}</p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdDiversity3 className="issues-icon" />
          <p className={`issues-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("employmentLaborIssues")}</p>
          <p className={`issues-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("handlingWrongfulTermination")} </p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineHealing className="issues-icon" />
          <p className={`issues-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("personalInjuryClaims")}</p>
          <p className={`issues-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("representClientsObtainingCompensation")} </p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineVerifiedUser className="issues-icon" />
          <p className={`issues-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("consumerProtectionIssues")}</p>
          <p className={`issues-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("addressFraudulentTransactions")}</p>
        </div>
        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineAccountBalance className="issues-icon" />
          <p className={`issues-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("estatePlanningProbate")}</p>
          <p className={`issues-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("draftingWillsEstablishingTrusts")}</p>
        </div>
      </div>
      <div className="whitespace"></div>
      <Footer />
    </>
  );
}

export default LegalIssues;
