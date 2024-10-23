import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function Footer() {
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
        <div className="footer-wrapper">
            <div className="footer-black-space"></div>
            <div className="footer-box">
                <p className='box-title'>{t('applyForLegalAidFooter')}</p> 
                <Link to="/signup" className='logoutLink'>
                    <div className="footer-btn">
                        <div className="footer-line"></div>
                        <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`} style={{marginTop: "-0.5em"}}>{t('getHelpToday')}</p>
                    </div>
                </Link>
            </div>

            <div id='footer-navLinks'>
                <ul>
                    <li><Link to="/home" className={`${currentLang === "dz" ? "font-xxsmall-dz" : ""}`}>{t('home')}</Link></li>
                    <li><Link to="/about" className={`${currentLang === "dz" ? "font-xxsmall-dz" : ""}`}>{t('aboutUs')}</Link></li>
                    <li><Link to="/legal" className={`${currentLang === "dz" ? "font-xxsmall-dz" : ""}`}>{t('legalIssues')}</Link></li>
                    <li><Link to="/eligibility" className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t('eligibility')}</Link></li>
                </ul>
            </div>

            <div className="copyright">
                <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>&copy; {t('copyRight')}</p> 
            </div>
        </div>
    );
}

export default Footer;
