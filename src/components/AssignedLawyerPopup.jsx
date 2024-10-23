import React, { useState, forwardRef } from "react";
import { Plus, Minus } from "lucide-react";
import "./DetailsPopup.css";
import { Document } from 'react-pdf';

const AssignedLawyerPopup = forwardRef(({ onClose }, ref) => {
    const [expandedSections, setExpandedSections] = useState({
        clerkDetails: false,
        assignedCases: false,
    });

    const toggleSection = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <div className="popup-overlay" ref={ref}>
            <div className="popup-container">
                <div className="popup-header">
                    <h2>Lawyer Details</h2>
                    <button onClick={onClose} className="close-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#1C1B1F"
                        >
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                    </button>
                </div>

                <div className="popup-content">
                    <div className="section">
                        <button
                            className="section-header header-btn"
                            aria-expanded={expandedSections.clerkDetails}
                            onClick={() => toggleSection("clerkDetails")}
                        >
                            <span>Lawyer Details</span>
                            <div className="section-btn-container">
                                {expandedSections.clerkDetails ? (
                                    <Minus color="#15605C" />
                                ) : (
                                    <Plus color="#15605C" />
                                )}
                            </div>
                        </button>
                        {expandedSections.clerkDetails && (
                            <div className="section-content">
                                <h4>Clerk Details</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Email</label>
                                        <input type="email" placeholder="example@gmail.com" />
                                    </div>
                                    <div className="form-field">
                                        <label>Name</label>
                                        <input type="text" placeholder="name" />
                                    </div>
                                    <div className="form-field">
                                        <label>Contact Number</label>
                                        <input type="tel" placeholder="17682118" />
                                    </div>
                                    <div className="form-field">
                                        <label>Dzongkhag</label>
                                        <input type="text" placeholder="Wangdue" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="section">
                        <button
                            className="section-header header-btn"
                            aria-expanded={expandedSections.assignedCases}
                            onClick={() => toggleSection("assignedCases")}
                        >
                            <span>Assigned Cases</span>
                            <div className="section-btn-container">
                                {expandedSections.assignedCases ? (
                                    <Minus color="#15605C" />
                                ) : (
                                    <Plus color="#15605C" />
                                )}
                            </div>
                        </button>
                        {expandedSections.assignedCases && (
                            <div className="section-content">
                                <h4>Nature of Cases</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Civil Cases</label>
                                        <div>
                                            <Document>Document placeholder</Document>
                                            <Document>Document placeholder</Document>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label>Criminal Cases</label>
                                        <div>
                                            <Document>Document placeholder</Document>
                                            <Document>Document placeholder</Document>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AssignedLawyerPopup;
