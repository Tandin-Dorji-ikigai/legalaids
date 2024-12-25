import React, { useEffect, useState } from "react";
import "./css/home.css";
import Accordion from "../components/Accordion";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import BannerImg from "../assets/banner.png";
import { Link } from "react-router-dom";
import { MdExpandMore, MdOutlineGavel } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import TrustSection from "../components/TrustSection";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function Home() {
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

  const langClass = currentLang === "dz" ? "font-large-dz" : "";

  return (
    <>
      <NavBar currentPage="home" />
      <div className="Home-banner-wrapper">
        <div className="banner-circle"></div>
        <div className="banner">
          <div className="banner-content banner-content-home">
            <p className={`banner-topic ${currentLang === "dz" ? "font-large-dz" : ""}`}>
              {t("mainHerobannerText")}
            </p>
            <p className={`banner-subTopic ${currentLang === "dz" ? "font-medium-dz" : ""}`}>
              {t("accessibleLegalAssistance")}
            </p>

            <Link to="#" className="banner-cta-wrapper banner-cta-wrapper-home">
              <div className={`banner-cta ${currentLang === "dz" ? "font-small-dz" : ""}`}>
                <p style={{marginTop: `${currentLang === "dz" ? "-0.5em" : ""}`}}>{t("getHelpToday")}</p>
                <div className="icon-container" >
                  <MdExpandMore className="exapnd-more" />
                </div>
              </div>
            </Link>
          </div>
          <div className="banner-image">
            <div className="banner-img-wrapper">
              <img src={BannerImg} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="service-wrapper">
        <p className={`service-topic ${currentLang === "dz" ? "font-medium-dz" : ""}`}>
          {t("whatWeDo")}
        </p>
        <p className={`service-subtopic service-subtopic-home ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
          {t("provideExpertAid")}
        </p>

        <div className="service-container">
          <div className="service-main">
            <div className="service-content">
              <IoNewspaperOutline className="service-icon" />
              <p className="service-content-topic">{t("application")}</p>
              <p className={`service-content-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                {t("applicationProcess")}
              </p>
            </div>
          </div>

          <div className="service-main">
            <div className="service-content">
              <MdOutlineGavel className="service-icon" />
              <p className="service-content-topic">{t("lawyerAssignments")}</p>
              <p className={`service-content-des ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                {t("lawyerAssignment")}
              </p>
            </div>
          </div>

          <div className="service-main">
            <div className="service-content">
              <LuFileEdit className="service-icon" />
              <p className="service-content-topic">{t("caseTitle")}</p>
              <p className={`service-content-des ${currentLang === "dz" ? "font-xxsmall-dz" : ""}`}>
                {t("caseProceedings")}
              </p>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="process-wrapper">
          <div className="process-content-container">
            <p className={`process-topic ${currentLang === "dz" ? "font-medium-dz" : ""}`}>
              {t("ourProcess")}
            </p>

            <div className="steps-container">
              <div className="steps-content">
                <div className={`steps-number ${currentLang === "dz" ? "font-large-dz" : ""}`}>
                  {t("step1")}
                </div>
                <div className="steps-des-cont">
                  <div className={`steps-des-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>
                    {t("clientApplication")}
                  </div>
                  <div className={`steps-des-subdes ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                    {t("clientAppDesc")}
                  </div>
                </div>
              </div>
              <div className="steps-content">
                <div className={`steps-number ${currentLang === "dz" ? "font-large-dz" : ""}`}>
                  {t("step2")}
                </div>
                <div className="steps-des-cont">
                  <div className={`steps-des-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>
                    {t("caseReview")}
                  </div>
                  <div className={`steps-des-subdes ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                    {t("caseReviewDesc")}
                  </div>
                </div>
              </div>
              <div className="steps-content">
                <div className={`steps-number ${currentLang === "dz" ? "font-large-dz" : ""}`}>
                  {t("step3")}
                </div>
                <div className="steps-des-cont">
                  <div className={`steps-des-topic ${currentLang === "dz" ? "font-small-dz" : ""}`}>
                    {t("caseReviewAndLawyer")}
                  </div>
                  <div className={`steps-des-subdes ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                    {t("caseReviewAndLawyerDesc")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustSection />
      </div>

      <Footer />
    </>
  );
}

export default Home;
