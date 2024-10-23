import React, { useState, forwardRef } from "react";
import { X, Trash2, Plus, Minus } from "lucide-react";
import "./DetailsPopup.css";
import { Document } from 'react-pdf';

const DocumentItem = ({ label, filename }) => (
    <div className="document-item">
        <div>
            <span className="document-label">{label}</span>
            <span className="document-filename">{filename}</span>
        </div>
        <div className="document-actions">
            <button className="icon-button delete">
                <Trash2 size={18} />
            </button>
            {/* Only include add button if needed */}
            <button className="icon-button add">
                <Plus size={18} />
            </button>
        </div>
    </div>
);

const CaseOverviewPopup = forwardRef(({ onClose }, ref) => {
    const [expandedSections, setExpandedSections] = useState({
        applicantInfo: true,
        institutions: false,
        documents: false,
        clerkDetails: false,
        caseDetails: false
    });

    const [applicantInfo, setApplicantInfo] = useState({
        cidNumber: "11410007866",
        name: "Dorji Tshering",
        occupation: "Teacher",
        contactNumber: "17734567",
        householdIncome: "Nu. 50,000",
        householdMembers: "5",
        dzongkhag: "Thimphu",
        villageCurrent: "Tsento",
        gewogCurrent: "Tsento",
        dzongkhagCurrent: "Paro",
        villagePermanent: "Tsento",
        gewogPermanent: "Tsento",
        dzongkhagPermanent: "Paro",
    });

    const [institutionInfo, setInstitutionInfo] = useState({
        institutionName: "Bhutan National Legal Institute",
        officialName: "Pema Dorji",
        officialContact: "17634882",
        officialEmail: "pema23@gmail.com",
    });

    const [expandedDocuments, setExpandedDocuments] = useState([
        { label: "CID or Valid Passport", filename: "passport.pdf" },
        { label: "Details of Household members", filename: "passport.pdf" },
        { label: "Attachment for household income", filename: "passport.pdf" },
        {
            label: "Attachment for household disposable capital",
            filename: "passport.pdf",
        },
        { label: "Brief Background of the Case*", filename: "passport.pdf" },
        { label: "Evidence of any form of disability.", filename: "passport.pdf" },
    ]);

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
                    <h2>Case Details</h2>
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
                            <span>Clerk Details</span>
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
                                        <input
                                            type="text"
                                            placeholder="example@gmail.com"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="name"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Contact Number</label>
                                        <input
                                            type="number"
                                            placeholder="17682118"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="section">
                        <button
                            className="section-header header-btn"
                            aria-expanded={expandedSections.caseDetails}
                            onClick={() => toggleSection("caseDetails")}
                        >
                            <span>Case Details and Lawyer Details</span>
                            <div className="section-btn-container">
                                {expandedSections.caseDetails ? (
                                    <Minus color="#15605C" />
                                ) : (
                                    <Plus color="#15605C" />
                                )}
                            </div>
                        </button>
                        {expandedSections.caseDetails && (
                            <div className="section-content">
                                <h4>Lawyer Details</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="name"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Contact Number</label>
                                        <input
                                            type="number"
                                            placeholder="17682118"
                                        />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label>Remarks</label>
                                    <textarea
                                        className="case-remark"
                                        value={applicantInfo.remarks}
                                        onChange={(e) =>
                                            setApplicantInfo({
                                                ...applicantInfo,
                                                remarks: e.target.value,
                                            })
                                        }
                                        placeholder="Remarks"
                                    ></textarea>
                                </div>

                                <h4>Case Status and Documents</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Case Status</label>
                                        <input
                                            type="text"
                                            placeholder="status"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Case Type</label>
                                        <select className="case-type-select">
                                            <option value="walk-in">Walk In</option>
                                            <option value="referral">Referral</option>
                                        </select>
                                    </div>
                                    <div className="form-field">
                                        <label>Case Documents</label>
                                        <div className="file-content">
                                            <Document>Document placeholder</Document>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label>Nature of Case</label>
                                        <select className="case-type-select">
                                            <option value="civil">Civil</option>
                                            <option value="criminal">Criminal</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="section">
                        <button
                            className="section-header"
                            aria-expanded={expandedSections.applicantInfo}
                            onClick={() => toggleSection("applicantInfo")}
                        >
                            <span>Applicant Information and Details</span>
                            <div className="section-btn-container">
                                {expandedSections.applicantInfo ? (
                                    <Minus color="#15605C" />
                                ) : (
                                    <Plus color="#15605C" />
                                )}
                            </div>
                        </button>
                        {expandedSections.applicantInfo && (
                            <div className="section-content">
                                <h3>Personal Information and Details of Applicant</h3>
                                <h4>Applicant Details</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>CID Number</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.cidNumber}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    cidNumber: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.name}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <h4>Occupation Details</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Occupation</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.occupation}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    occupation: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Contact Number</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.contactNumber}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    contactNumber: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <h4>Household Details</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Total Household Income (Nu.)</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.householdIncome}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    householdIncome: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Total Household Members</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.householdMembers}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    householdMembers: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Dzongkhag</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.dzongkhag}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    dzongkhag: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <h4>Current Addresses</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Village</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.villageCurrent}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    villageCurrent: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Gewog</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.gewogCurrent}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    gewogCurrent: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Dzongkhag</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.dzongkhagCurrent}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    dzongkhagCurrent: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <h4>Permanent Addresses</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Village</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.villagePermanent}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    villagePermanent: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Gewog</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.gewogPermanent}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    gewogPermanent: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Dzongkhag</label>
                                        <input
                                            type="text"
                                            value={applicantInfo.dzongkhagPermanent}
                                            onChange={(e) =>
                                                setApplicantInfo({
                                                    ...applicantInfo,
                                                    dzongkhagPermanent: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>



                    <div className="section">
                        <button
                            className="section-header header-btn"
                            aria-expanded={expandedSections.institutions}
                            onClick={() => toggleSection("institutions")}
                        >
                            <span>Institutions facilitating legal aid applications</span>
                            <div className="section-btn-container">
                                {expandedSections.institutions ? (
                                    <Minus color="#15605C" />
                                ) : (
                                    <Plus color="#15605C" />
                                )}
                            </div>
                        </button>
                        {expandedSections.institutions && (
                            <div className="section-content">
                                <h4>Name of the Institution</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Institution Name</label>
                                        <input
                                            type="text"
                                            value={institutionInfo.institutionName}
                                            onChange={(e) =>
                                                setInstitutionInfo({
                                                    ...institutionInfo,
                                                    institutionName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <h4>Dealing Official/Staff Details</h4>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={institutionInfo.officialName}
                                            onChange={(e) =>
                                                setInstitutionInfo({
                                                    ...institutionInfo,
                                                    officialName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Contact Number</label>
                                        <input
                                            type="text"
                                            value={institutionInfo.officialContact}
                                            onChange={(e) =>
                                                setInstitutionInfo({
                                                    ...institutionInfo,
                                                    officialContact: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={institutionInfo.officialEmail}
                                            onChange={(e) =>
                                                setInstitutionInfo({
                                                    ...institutionInfo,
                                                    officialEmail: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="section">
                        <button
                            className="section-header"
                            aria-expanded={expandedSections.documents}
                            onClick={() => toggleSection("documents")}
                        >
                            <span>Check List of Documents</span>
                            <div className="section-btn-container">
                                {expandedSections.documents ? (
                                    <Minus color="#15605C" />
                                ) : (
                                    <Plus color="#15605C" />
                                )}
                            </div>
                        </button>
                        {expandedSections.documents && (
                            <div className="section-content">
                                <h3>Check List of Documents*</h3>
                                <div className="document-list">
                                    {expandedDocuments.map((doc, index) => (
                                        <DocumentItem
                                            key={index}
                                            label={doc.label}
                                            filename={doc.filename}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
});

export default CaseOverviewPopup;
