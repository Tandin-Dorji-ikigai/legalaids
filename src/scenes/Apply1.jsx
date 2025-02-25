import React, { useState, useEffect } from 'react';
import NavBar from '../components/Nav';
import "./css/apply.css";
import { Link, useNavigate } from 'react-router-dom';
import { MdExpandMore } from "react-icons/md";
import { dzongkhags, gewogs, villages } from '../Data/LocationData';
import Footer from '../components/Footer';
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useGetCensusQuery } from '../slices/censusSlice';
import Loader from '../components/Loader';

function Apply1() {
    const navigate = useNavigate();
    const [cid, setCid] = useState('');
    const [censusData, setCensusData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);

    const { data, error, isLoading, isFetching } = useGetCensusQuery(cid, {
        skip: !shouldFetch
    });

    useEffect(() => {
        setLoading(isLoading || isFetching);
    }, [isLoading, isFetching]);

    useEffect(() => {
        if (data && data.citizenDetailsResponse && data.citizenDetailsResponse.citizenDetail && data.citizenDetailsResponse.citizenDetail[0]) {
            setCensusData(data.citizenDetailsResponse.citizenDetail[0]);
        }
    }, [data]);

    // Initialize form data with empty values
    const [formData, setFormData] = useState({
        cid: '',
        name: '',
        occupation: '',
        contactNo: '',
        dzongkhag: '',
        gewog: '',
        village: '',
        pdzongkhag: '',
        pgewog: '',
        pvillage: '',
        income: '',
        member: '',
        cdzongkhag: ''
    });

    // Update form data when census data changes
    useEffect(() => {
        if (censusData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                // Use proper property from census data (name instead of firstName)
                name: censusData.name || '',
                pdzongkhag: censusData.dzongkhagName || '',
                pgewog: censusData.gewogName || '',
                pvillage: censusData.villageName || '',
            }));
        }
    }, [censusData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Check if the input is CID
        if (name === "cid") {
            const cidValue = value.trim();
            setCid(cidValue);

            // Check if CID length is exactly 11 to trigger the API call
            if (cidValue.length === 11) {
                setShouldFetch(true);
            } else {
                setShouldFetch(false);
                // Clear census data if CID is invalid
                if (censusData) {
                    setCensusData(null);
                    // Reset name and permanent address fields
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        name: '',
                        pdzongkhag: '',
                        pgewog: '',
                        pvillage: '',
                    }));
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/apply2', { state: formData });
    };

    // Reset Gewog and Village when Dzongkhag changes
    useEffect(() => {
        if (formData.dzongkhag) {
            setFormData(prevData => ({
                ...prevData,
                gewog: '',
                village: ''
            }));
        }
    }, [formData.dzongkhag]);

    // Reset Village when Gewog changes
    useEffect(() => {
        if (formData.gewog) {
            setFormData(prevData => ({
                ...prevData,
                village: ''
            }));
        }
    }, [formData.gewog]); // Fixed: Watch formData.gewog instead of formData.selectedGewog

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
            {loading ? <Loader /> :
                <>
                    <NavBar currentPage="apply1" className="apply-page" />
                    <div className="navheight"></div>
                    <div className="apply-wrapper">
                        <p className={`apply-title-main ${currentLang === "dz" ? "font-medium-dz" : ""}`}>{t("applyTitleMain")}</p>
                        <p className={`apply-sub ${currentLang === "dz" ? "font-small-dz" : ""}`}>{t("applySub")}</p>

                        <div className="apply-tab">
                            <Link
                                style={{ paddingBottom: currentLang === "dz" ? '1rem' : '' }}
                                className={`tab-current ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                                to="#"
                            >
                                {t("tabCurrent")}
                            </Link>
                            <Link
                                style={{ paddingBottom: currentLang === "dz" ? '1rem' : '' }}
                                className={`tab ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
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
                                <p className={`apply-title ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("applyTitle")}</p>
                                <div className="category-wrapper">

                                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("legalLabelApplicationDetails")}</label>
                                    <div className="legal-form-row legal-form-row-first">
                                        <input
                                            className='form-input'
                                            type="number"
                                            name="cid"
                                            value={formData.cid}
                                            onChange={handleChange}
                                            placeholder={t('cidPlaceholder')}
                                            required
                                        />

                                        <input
                                            className='form-input'
                                            type="text"
                                            name="name"
                                            value={formData.name || ''}
                                            placeholder={t('namePlaceholder')}
                                            readOnly
                                            required
                                        />
                                    </div>

                                    <div className="legal-form-row">
                                        <input
                                            className='form-input'
                                            type="text"
                                            name="occupation"
                                            value={formData.occupation}
                                            onChange={handleChange}
                                            placeholder={t('occupationPlaceholder')}
                                            required
                                        />

                                        <input
                                            className='form-input'
                                            type="number"
                                            name="contactNo"
                                            value={formData.contactNo}
                                            onChange={handleChange}
                                            placeholder={t('contactNumberPlaceholder')}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="category-wrapper category-wrapper-selector">
                                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("legalLabelCurrentAddress")}</label>
                                    <div className="legal-form-row legal-form-row-first">
                                        <select
                                            className='form-input'
                                            name="dzongkhag"
                                            value={formData.dzongkhag}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">{t('selectDzongkhag')}</option>
                                            {dzongkhags.map((dzongkhag) => (
                                                <option key={dzongkhag} value={dzongkhag}>
                                                    {dzongkhag}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            className='form-input'
                                            name="gewog"
                                            value={formData.gewog}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.dzongkhag}
                                        >
                                            <option value="">{t('selectGewog')}</option>
                                            {gewogs[formData.dzongkhag]?.map((gewog) => (
                                                <option key={gewog} value={gewog}>
                                                    {gewog}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="legal-form-row">
                                        <select
                                            className='form-input'
                                            name="village"
                                            value={formData.village}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.gewog}
                                        >
                                            <option value="">{t('selectVillage')}</option>
                                            {villages[formData.gewog]?.map((village) => (
                                                <option key={village} value={village}>
                                                    {village}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="category-wrapper category-wrapper-selector">
                                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("legalLabelPermanentAddress")}</label>

                                    <div className="legal-form-row">
                                        <input
                                            className='form-input'
                                            type="text"
                                            name="pdzongkhag"
                                            value={formData.pdzongkhag || ''}
                                            placeholder={t('selectDzongkhag')}
                                            required
                                            readOnly
                                        />

                                        <input
                                            className='form-input'
                                            type="text"
                                            name="pgewog"
                                            value={formData.pgewog || ''}
                                            placeholder={t('selectGewog')}
                                            readOnly
                                            required
                                        />
                                    </div>

                                    <div className="legal-form-row">
                                        <input
                                            className='form-input'
                                            type="text"
                                            name="pvillage"
                                            value={formData.pvillage || ''}
                                            placeholder={t('selectVillage')}
                                            required
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="category-wrapper">
                                    <label className={`legal-label ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t("legalLabelHouseholdDetails")}</label>
                                    <div className="legal-form-row legal-form-row-first">
                                        <input
                                            className='form-input'
                                            type="number"
                                            name="income"
                                            value={formData.income}
                                            onChange={handleChange}
                                            placeholder={t('totalHouseholdIncomePlaceholder')}
                                            required
                                        />

                                        <input
                                            className='form-input'
                                            type="number"
                                            name="member"
                                            value={formData.member}
                                            onChange={handleChange}
                                            placeholder={t('totalHouseholdMemberPlaceholder')}
                                            required
                                        />
                                    </div>

                                    <div className="legal-form-row">
                                        <select
                                            className='form-input apply1-last'
                                            name="cdzongkhag"
                                            value={formData.cdzongkhag}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">{t('selectDzongkhag')}</option>
                                            {dzongkhags.map((dzongkhag) => (
                                                <option key={dzongkhag} value={dzongkhag}>
                                                    {dzongkhag}
                                                </option>
                                            ))}
                                        </select>
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
            }
        </>
    );
}

export default Apply1;