import React, { useState, forwardRef, useEffect } from "react";
import { X, Plus, Minus, EyeIcon, AlertCircle, Upload } from "lucide-react";
import "./DetailsPopup.css";
import "../components/householdPopup.css"
import { useGetCaseIdQuery } from "../slices/caseApiSlice";
import { useUpdateResultMutation } from "../slices/caseApiSlice";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";
import Swal from "sweetalert2";
import Loader from "./Loader";
import HouseholdPopup from "./HouseholdPopup";
import { useGetAllDocQuery, usePostDocMutation } from "../slices/documentSlice";

const DocumentItem = ({ label, filename, isLoading, onViewPdf }) => (
    <div className="document-item">
        <div>
            <span className="document-label">{label}</span>
            {isLoading ? (
                <span className="document-filename">Loading...</span>
            ) : (
                <span className="document-filename">
                    {filename ? filename.split('/').pop() : 'No file'}
                </span>
            )}
        </div>
        <div className="document-actions">
            <button
                className="icon-button add"
                disabled={isLoading || !filename}
                onClick={() => filename && onViewPdf(filename)}
            >
                <EyeIcon size={18} />
            </button>
        </div>
    </div>
);

const LawerCasesPopup = forwardRef(({ caseId, onClose }, ref) => {
    const { data: cas, error: fetchError, isLoading } = useGetCaseIdQuery(caseId);
    const { data: lawyers, lerror } = useGetAllLawyerQuery();
    const { data: employees } = useGetAllEmployeeQuery();
    const { data: docs} = useGetAllDocQuery();
    const [updateCase] = useUpdateResultMutation();
    const [postDoc, {isLoading1}] = usePostDocMutation();
    const [lawyer, setLawyer] = useState();
    const [employee, setEmployee] = useState();
    const [householdNo, setHouseHoldNo] = useState("")

    const [additionalDocuments, setAdditionalDocuments] = useState([]);
    const [existingAdditionalDocs, setExistingAdditionalDocs] = useState([]);

    // use when additional Document field is added 
    useEffect(() => {
        if (cas && docs) {
            const filterDocs = docs.filter((doc) => doc.cases === caseId)
            setExistingAdditionalDocs(filterDocs);
        }
    }, [cas, docs]);


    const handleAddDocument = () => {
        setAdditionalDocuments([...additionalDocuments, { id: Date.now(), file: null}]);
    };

    const handleRemoveDocument = (id) => {
        setAdditionalDocuments(additionalDocuments.filter(doc => doc.id !== id));
    };

    const handleFileChange = (id, file) => {
        setAdditionalDocuments(additionalDocuments.map(doc =>
            doc.id === id ? { ...doc, file } : doc
        ));
    };

    // const handleDescriptionChange = (id, description) => {
    //     setAdditionalDocuments(additionalDocuments.map(doc =>
    //         doc.id === id ? { ...doc, description } : doc
    //     ));
    // };


    useEffect(() => {
        const fetchData = async () => {
            if (cas) {
                try {
                    const response = await fetch(`http://localhost:8081/api/proxy/citizendetails/${cas.cid}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    let result = await response.json();
                    result = result.citizenDetailsResponse.citizenDetail[0]
                    setHouseHoldNo(result.householdNo)
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchData();
    }, [cas]);



    const [showPopup, setShowPopup] = useState(false);

    const handleViewPdf = (url) => {
        window.open(url, '_blank');
    };

    if (fetchError) {
        console.log(fetchError);
    }

    console.log(cas)

    useEffect(() => {
        if (lerror) {
            console.log(lerror);
        } else if (lawyers && cas && employees) {
            const selected = lawyers.find((lwy) => lwy.cid === cas.aLawyer);
            const selectedEmp = employees.find((emp) => emp.cid === cas.aEmployee);
            setLawyer(selected);
            setEmployee(selectedEmp);
        }
    }, [cas, lawyers, lerror, fetchError, employees])

    const [expandedSections, setExpandedSections] = useState({
        caseDetails: true,
        applicantInfo: false,
        institutions: false,
        documents: false,
        additionalDocuments: false
    });

    const [applicantInfo, setApplicantInfo] = useState({
        cidNumber: "",
        name: "",
        occupation: "",
        contactNumber: "",
        householdIncome: "",
        householdMembers: "",
        dzongkhag: "",
        villageCurrent: "",
        gewogCurrent: "",
        dzongkhagCurrent: "",
        villagePermanent: "",
        gewogPermanent: "",
        dzongkhagPermanent: "",
    });

    const [institutionInfo, setInstitutionInfo] = useState({
        institutionName: "",
        officialName: "",
        officialContact: "",
        officialEmail: "",
    });

    const [caseInfo, setCaseInfo] = useState({
        aLawyer: "",
        status: "",
        caseType: "",
        natureOfCase: "",
        remarks: "",
        aEmployee: ""
    })

    const [documents, setDocuments] = useState([
        { label: "Brief Background of the Case*", filename: null, docKey: 'cBackgroundDoc' },
        { label: "Evidence of any form of disability.", filename: null, docKey: 'disabilityDoc' },
    ]);

    useEffect(() => {
        if (cas) {
            setApplicantInfo({
                cidNumber: cas.cid,
                name: cas.name,
                occupation: cas.occupation,
                contactNumber: cas.contactNo,
                householdIncome: cas.income,
                householdMembers: cas.member,
                dzongkhag: cas.cdzongkhag,
                villageCurrent: cas.village,
                gewogCurrent: cas.gewog,
                dzongkhagCurrent: cas.dzongkhag,
                villagePermanent: cas.pvillage,
                gewogPermanent: cas.pgewog,
                dzongkhagPermanent: cas.pdzongkhag,
            });

            setCaseInfo({
                aLawyer: cas.aLawyer,
                status: cas.status,
                caseType: cas.caseType,
                natureOfCase: cas.natureOfCase,
                remarks: cas.remarks,
                outcome: cas.outcome,
                aEmployee: cas.aEmployee
            })

            setInstitutionInfo({
                institutionName: cas.institutionName,
                officialName: cas.officialName,
                officialContact: cas.officialcNumber,
                officialEmail: cas.officialEmail,
            });

            setDocuments(prev =>
                prev.map(doc => ({
                    ...doc,
                    filename: cas[doc.docKey] || null
                }))
            );

        }
    }, [cas]);


    const toggleSection = (section) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleConfirm = async () => {
        console.log(additionalDocuments)
        const cid = applicantInfo.cidNumber;
        const occupation = applicantInfo.occupation;
        const name = applicantInfo.name;
        const contactNo = applicantInfo.contactNumber;
        const income = applicantInfo.householdIncome;
        const member = applicantInfo.householdMembers;
        const cdzongkhag = applicantInfo.dzongkhag;
        const village = applicantInfo.villageCurrent;
        const gewog = applicantInfo.gewogCurrent;
        const dzongkhag = applicantInfo.dzongkhagCurrent;
        const pvillage = applicantInfo.villagePermanent;
        const pgewog = applicantInfo.gewogPermanent;
        const pdzongkhag = applicantInfo.dzongkhagPermanent;
        const institutionName = institutionInfo.institutionName;
        const officialName = institutionInfo.officialName;
        const officialcNumber = institutionInfo.officialContact;
        const officialEmail = institutionInfo.officialEmail;
        const remarks = caseInfo.remarks;
        const status = caseInfo.status;
        const caseType = caseInfo.caseType;
        const natureOfCase = caseInfo.natureOfCase;
        const outcome = caseInfo.outcome;
        const aEmployee = caseInfo.aEmployee;
        const aLawyer = caseInfo.aLawyer;

        Swal.fire({
            title: "",
            text: "Are you sure you want to update this case?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#1E306D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const id = caseId;

                    await updateCase({
                        id, cid, occupation, name, contactNo, income, member,
                        cdzongkhag, village, gewog, dzongkhag, pvillage, pgewog, pdzongkhag, institutionName, officialName, officialcNumber,
                        officialEmail, remarks, status, aLawyer, caseType, natureOfCase, outcome, aEmployee
                    }).unwrap();

                    for (const doc of additionalDocuments){
                        if (doc.file) {
                            const formData = new FormData();
                            formData.append("docName", doc.file);
                            formData.append("cases", caseId.toString());
    
                            await postDoc(formData).unwrap();
                        }
                    }

                    Swal.fire({
                        title: 'Success!',
                        text: 'Case details have been updated successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                    onClose();
                    window.location.reload()
                } catch (err) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to update case details. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    }
    const handleCancel = () => {
        onClose();
    };


    return (
        <div className="popup-overlay" ref={ref}>
            {isLoading1 && <Loader/>}
            {isLoading ? (
                <div className="loading-container">
                    <Loader />
                </div>
            ) : (


                <div className="popup-container">
                    <div className="popup-header">
                        <h2>Case Details</h2>
                        <button onClick={onClose} className="close-button">
                            <X size={24} color="#1C1B1F" />
                        </button>
                    </div>

                    <div className="popup-content">
                        {/* Case Details Section */}
                        <div className="section">
                            <button
                                className="section-header"
                                aria-expanded={expandedSections.caseDetails}
                                onClick={() => toggleSection("caseDetails")}
                            >
                                <span>Case Details</span>
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
                                    <h4>Lawyer & Employee Details</h4>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Lawyer</label>
                                            <input
                                                type="text"
                                                value={lawyer?.userName || "No Lawyer Assigned"}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Employee</label>
                                            <input
                                                type="text"
                                                value={employee?.userName || "No Employee Assigned"}
                                                readOnly
                                            />

                                        </div>
                                    </div>

                                    <h4>Case Status and Documents</h4>
                                    <div className="form-field">
                                        <label>Case Status</label>
                                        <select
                                            value={caseInfo.status}
                                            className="selectFields"
                                            onChange={(e) =>
                                                setCaseInfo({
                                                    ...caseInfo,
                                                    status: e.target.value, // Update the 'status' field in the state
                                                })
                                            }
                                        >
                                            <option value="" disabled selected>Select Case Status</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Dismissed">Dismissed</option>
                                        </select>
                                    </div>


                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Case Type</label>
                                            <input type="text"
                                                readOnly
                                                value={caseInfo.caseType}
                                            />
                                        </div>
                                        <div className="form-field case-remark-container">
                                            <label>Nature of Case</label>
                                            <input type="text"
                                                readOnly
                                                value={caseInfo.natureOfCase}
                                            />
                                        </div>
                                    </div>
                                    <h4>Case Results</h4>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Case Result</label>
                                            <input type="text"
                                                readOnly
                                                value={cas?.outcome || "No outcomes"}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-grid remark-form-grid">
                                        <div className="form-field remark-form-field">
                                            <label>Remarks</label>
                                            <textarea
                                                className="case-remark"
                                                value={cas.remarks || "No Remarks"}
                                                readOnly
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Applicant Information Section */}
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
                                                readOnly

                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.name}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Occupation</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.occupation}
                                                readOnly
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
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        contactNumber: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <h4>Household Information</h4>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Household Income</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.householdIncome}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        householdIncome: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Household Members</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.householdMembers}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        householdMembers: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <h4>Address Information</h4>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Dzongkhag</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.dzongkhag}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        dzongkhag: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Current Village</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.villageCurrent}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        villageCurrent: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Current Gewog</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.gewogCurrent}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        gewogCurrent: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Current Dzongkhag</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.dzongkhagCurrent}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        dzongkhagCurrent: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Permanent Village</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.villagePermanent}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        villagePermanent: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Permanent Gewog</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.gewogPermanent}
                                                readOnly
                                                onChange={(e) =>
                                                    setApplicantInfo({
                                                        ...applicantInfo,
                                                        gewogPermanent: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Permanent Dzongkhag</label>
                                            <input
                                                type="text"
                                                value={applicantInfo.dzongkhagPermanent}
                                                readOnly
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

                        {/* Institution Information Section */}
                        <div className="section">
                            <button
                                className="section-header"
                                aria-expanded={expandedSections.institutions}
                                onClick={() => toggleSection("institutions")}
                            >
                                <span>Institutions</span>
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
                                    <h4>Institution Details</h4>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Institution Name</label>
                                            <input
                                                type="text"
                                                value={institutionInfo.institutionName}
                                                readOnly
                                                onChange={(e) =>
                                                    setInstitutionInfo({
                                                        ...institutionInfo,
                                                        institutionName: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Official Name</label>
                                            <input
                                                type="text"
                                                value={institutionInfo.officialName}
                                                readOnly
                                                onChange={(e) =>
                                                    setInstitutionInfo({
                                                        ...institutionInfo,
                                                        officialName: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label>Official Contact</label>
                                            <input
                                                type="text"
                                                value={institutionInfo.officialContact}
                                                readOnly
                                                onChange={(e) =>
                                                    setInstitutionInfo({
                                                        ...institutionInfo,
                                                        officialContact: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Official Email</label>
                                            <input
                                                type="email"
                                                value={institutionInfo.officialEmail}
                                                readOnly
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

                        {/* Document Section */}
                        <div className="section">
                            <button
                                className="section-header"
                                aria-expanded={expandedSections.documents}
                                onClick={() => toggleSection("documents")}
                            >
                                <span>Documents</span>
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
                                        {documents.map((doc, index) => (
                                            <DocumentItem
                                                key={index}
                                                label={doc.label}
                                                filename={doc.filename}
                                                isLoading={isLoading}
                                                onViewPdf={handleViewPdf}
                                            />
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Document Section */}
                        <div className="section">
                            <button
                                className="section-header"
                                aria-expanded={expandedSections.additionalDocuments}
                                onClick={() => toggleSection("additionalDocuments")}
                            >
                                <span>Additional Documents</span>
                                <div className="section-btn-container">
                                    {expandedSections.additionalDocuments ? (
                                        <Minus color="#15605C" />
                                    ) : (
                                        <Plus color="#15605C" />
                                    )}
                                </div>
                            </button>
                            {expandedSections.additionalDocuments && (
                                <div className="section-content">
                                    <h3>Check List of Additional Documents*</h3>
                                    <div >
                                        {/* Existing Additional Documents */}
                                        {existingAdditionalDocs.map((doc, index) => (
                                            <DocumentItem
                                                key={`existing-${index}`}
                                                label={doc.description || `Additional Document ${index + 1}`}
                                                filename={doc.docName}
                                                isLoading={isLoading}
                                                onViewPdf={handleViewPdf}
                                            />
                                        ))}

                                        {/* New Additional Documents */}
                                        {additionalDocuments.map((doc) => (
                                            <div key={doc.id} className="lawyer-additional-doc-item">
                                                <div className="lawyer-doc-input-container">
                                                    <div className="lawyer-file-upload-wrapper">
                                                        <label className="lawyer-file-upload-label">
                                                            <Upload size={18} className="lawyer-upload-icon" />
                                                            <span>Choose file</span>
                                                            <input
                                                                type="file"
                                                                onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
                                                                accept=".pdf"
                                                                className="lawyer-hidden-file-input"
                                                            />
                                                        </label>
                                                        <span className="lawyer-file-name">
                                                            {doc.file ? doc.file.name : 'No file selected'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="lawyer-remove-doc-btn"
                                                    onClick={() => handleRemoveDocument(doc.id)}
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            className="lawyer-add-doc-btn"
                                            onClick={handleAddDocument}
                                        >
                                            <Plus size={18} />
                                            Add Document
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>

                        {householdNo ?
                            <div>
                                <button
                                    onClick={() => setShowPopup(true)}
                                    className="show-popup-btn household-show-popup-btn"
                                >
                                    Show Family Tree
                                </button>

                                {showPopup && (
                                    <HouseholdPopup
                                        householdNumber={householdNo}
                                        closePopup={() => setShowPopup(false)}
                                    />
                                )}
                            </div> : null
                        }

                    </div>

                    <div className="popup-footer">
                        <button onClick={handleConfirm} className="confirm-button">
                            Update
                        </button>
                        <button onClick={handleCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default LawerCasesPopup;
