import React, { useState, useEffect } from 'react';
import NavBar from '../components/Nav';
import "./css/apply.css";
import { Link, useNavigate } from 'react-router-dom';
import { MdExpandMore } from "react-icons/md";
import { dzongkhags, gewogs, villages } from '../Data/LocationData';
import Footer from '../components/Footer';

function Apply1() {
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData,"passed from 1");
        navigate('/apply2', { state: formData });
    };

    useEffect(() => {
        if (formData.dzongkhag) {
            setFormData((prevData) => ({
                ...prevData,
                gewog: '',
                village: ''
            }));
        }
    }, [formData.dzongkhag]);

    useEffect(() => {
        if (formData.gewog) {
            setFormData((prevData) => ({
                ...prevData,
                village: ''
            }));
        }
    }, [formData.selectedGewog]);

    useEffect(() => {
        if (formData.pdzongkhag) {
            setFormData((prevData) => ({
                ...prevData,
                pgewog: '',
                pvillage: ''
            }));
        }
    }, [formData.pdzongkhag]);

    useEffect(() => {
        if (formData.pgewog) {
            setFormData((prevData) => ({
                ...prevData,
                pvillage: ''
            }));
        }
    }, [formData.pgewog]);

    return (
        <>
            <NavBar currentPage="apply1" className="apply-page" />
            <div className="navheight"></div>
            <div className="apply-wrapper">
                <p className='apply-title-main'>Application form for legal aid.</p>
                <p className="apply-sub">We provide accessible, expert legal aid to ensure justice and equality.</p>

                <div className="apply-tab">
                    <Link className='tab-current' to="#">Applicant Information and Details</Link>
                    <Link className='mid-tab' to="#">Institutions facilitating legal aid applications</Link>
                    <Link to="#">Check List of Documents</Link>
                </div>

                <div className="form-wrapper">
                    <form className='apply-form' onSubmit={handleSubmit}>
                        <p className='apply-title'>Personal Information and Details of Applicant</p>
                        <div className="category-wrapper">

                            <label className="legal-label">Applicant Details</label>
                            <div className="legal-form-row legal-form-row-first">
                                <input
                                    className='form-input'
                                    type="text"
                                    name="cid"
                                    value={formData.cid}
                                    onChange={handleChange}
                                    placeholder='CID Number'
                                    required
                                />

                                <input
                                    className='form-input'
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='Name'
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
                                    placeholder='Occupation'
                                    required
                                />

                                <input
                                    className='form-input'
                                    type="number"
                                    name="contactNo"
                                    value={formData.contactNo}
                                    onChange={handleChange}
                                    placeholder='Contact Number'
                                    required
                                />
                            </div>
                        </div>

                        <div className="category-wrapper category-wrapper-selector">
                            <label className="legal-label">Current Address</label>
                            <div className="legal-form-row legal-form-row-first">
                                <select
                                    className='form-input'
                                    name="dzongkhag"
                                    value={formData.dzongkhag}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Dzongkhag</option>
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
                                    <option value="">Select Gewog</option>
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
                                    <option value="">Select Village</option>
                                    {villages[formData.gewog]?.map((village) => (
                                        <option key={village} value={village}>
                                            {village}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="category-wrapper category-wrapper-selector">
                            <label className="legal-label">Permanent Address</label>
                            <div className="legal-form-row legal-form-row-first">
                                <select
                                    className='form-input'
                                    name="pdzongkhag"
                                    value={formData.pdzongkhag}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Dzongkhag</option>
                                    {dzongkhags.map((dzongkhag) => (
                                        <option key={dzongkhag} value={dzongkhag}>
                                            {dzongkhag}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className='form-input'
                                    name="pgewog"
                                    value={formData.pgewog}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.pdzongkhag}
                                >
                                    <option value="">Select Gewog</option>
                                    {gewogs[formData.pdzongkhag]?.map((gewog) => (
                                        <option key={gewog} value={gewog}>
                                            {gewog}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="legal-form-row" >
                                <select
                                    className='form-input'
                                    name="pvillage"
                                    value={formData.pvillage}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.pgewog}
                                >
                                    <option value="">Select Village</option>
                                    {villages[formData.pgewog]?.map((village) => (
                                        <option key={village} value={village}>
                                            {village}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="category-wrapper">

                            <label className="legal-label">Household Details</label>
                            <div className="legal-form-row legal-form-row-first">
                                <input
                                    className='form-input'
                                    type="number"
                                    name="income"
                                    value={formData.income}
                                    onChange={handleChange}
                                    placeholder='Total Household Income (Nu.)'
                                    required
                                />

                                <input
                                    className='form-input'
                                    type="number"
                                    name="member"
                                    value={formData.member}
                                    onChange={handleChange}
                                    placeholder='Total Household Member'
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
                                    <option value="">Select Dzongkhag</option>
                                    {dzongkhags.map((dzongkhag) => (
                                        <option key={dzongkhag} value={dzongkhag}>
                                            {dzongkhag}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className='banner-cta-wrapper apply-cta-wrapper'>
                            <div className="banner-cta">
                                Proceed
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
    );
}

export default Apply1;
