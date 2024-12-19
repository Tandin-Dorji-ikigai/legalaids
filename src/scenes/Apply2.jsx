import React, { useEffect, useState } from 'react'
import NavBar from '../components/Nav';
import "./css/apply.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdExpandMore } from "react-icons/md";
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function Apply2() {
    const location = useLocation();
    const formDataPassed1 = location.state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ...formDataPassed1,
        institutionName: '',
        officialName: '',
        officialcNumber: '',
        officialEmail: '',
        caseType: null,
        natureOfCase: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/apply3', { state: formData });
    };

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
                    <Link
                        style={{ paddingBottom: currentLang === "dz" ? '1rem' : '' }}
                        className={`tab-current ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                        to="#"
                    >
                        {t("midTab")}
                    </Link>
                    <Link
                        style={{ paddingBottom: currentLang === "dz" ? '1rem' : '' }}
                        className={`tab ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                        to="#"
                    >
                        {t("lastTab")}
                    </Link>
                </div>
                <div className="form-wrapper">
                    <form className='apply-form' onSubmit={handleSubmit}>
                        <p className={`apply-title ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("applyTitle2")}</p>
                        <div className="category-wrapper">

                            <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("legalLabelInstitution")}</label>
                            <div className="legal-form-row legal-form-row-first">
                                <input
                                    className='form-input'
                                    type="text"
                                    name="institutionName"
                                    value={formData.institutionName}
                                    onChange={handleChange}
                                    placeholder={t('institutionNamePlaceholder')}
                                />

                                <input
                                    className='form-input'
                                    type="text"
                                    name="officialName"
                                    value={formData.officialName}
                                    onChange={handleChange}
                                    placeholder={t('officialNamePlaceholder')}
                                />
                            </div>

                            <div className="legal-form-row">

                                <input
                                    className='form-input'
                                    type="number"
                                    name="officialcNumber"
                                    value={formData.officialcNumber}
                                    onChange={handleChange}
                                    placeholder={t('contactNumberPlaceholder')}
                                />
                                <input
                                    className='form-input'
                                    type="email"
                                    name="officialEmail"
                                    value={formData.officialEmail}
                                    onChange={handleChange}
                                    placeholder={t('emailPlaceholder')}
                                />
                            </div>
                        </div>
                        <button type="submit" className='banner-cta-wrapper apply-cta-wrapper'>
                            <div className="banner-cta banner-ctaa" style={{ fontSize: currentLang === "dz" ? '1.5rem' : "" }}>
                                {t("proceed")}
                                <div className="icon-container">
                                    <MdExpandMore className='exapnd-more' />
                                </div>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
            <div className="whitespace"></div>
            <Footer />
        </>
    )
}

export default Apply2;