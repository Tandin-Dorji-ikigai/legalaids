import React, { useState, useEffect } from "react";
import "./householdPopup.css";
import Loader from "./Loader";

const HouseholdPopup = ({ householdNumber, closePopup }) => {
    const [loading, setLoading] = useState(false);
    const [householdData, setHouseholdData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:8081/api/proxy/familytree/${householdNumber}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                setHouseholdData(result.familyDetails.familyDetail);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (householdNumber) {
            fetchData();
        }
    }, [householdNumber]);

    return (
        <div>
            <div className="household-popup-overlay">
                {loading && <Loader />}
                <div className="household-popup-content">
                    <div className="household-popup-header">
                        <h3>Household Information</h3>
                        <button className="household-close-btn" onClick={closePopup}>
                            &times;
                        </button>
                    </div>
                    <div className="household-popup-body">
                        <p>
                            <strong>House No:</strong> {householdNumber}
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Name</th>
                                    <th>Sex</th>
                                    <th>Relation to HOH</th>
                                    <th>Marital Status</th>
                                    <th>Nationality</th>
                                    <th>Father's CID</th>
                                    <th>Father's Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {householdData.map((person, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{person.fullName}</td>
                                        <td>{person.gender}</td>
                                        <td>{index === 0 ? "Head of Household (HOH)" : "Member"}</td>
                                        <td>{person.maritalStatus}</td>
                                        <td>{person.nationality}</td>
                                        <td>{person.fatherCID || "N/A"}</td>
                                        <td>{person.fatherName || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseholdPopup;
