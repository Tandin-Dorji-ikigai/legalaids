import React, { useEffect, useState } from 'react';
import './TrustSection.css';
import TrustSectionImg from "../assets/trustsection.png"
import i18n from "../i18n";
import { useTranslation } from 'react-i18next';

const TrustSection = () => {
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
    <div className="trust-section">
      <div className="trust-content">
        <div className="image-container">
          <img src={TrustSectionImg} alt="Group of people" className="trust-image" />
        </div>
        <div className="trust-text">
          <p style={{ fontSize: currentLang === "dz" ? "1.45em" : "" }}>{t("trustUs")}</p>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;