import React, { useState } from "react";
import NavBar from "../components/Nav";
import "./css/apply.css";
import { MdExpandMore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useGetCaseQuery } from "../slices/caseApiSlice";
import Footer from "../components/Footer";

function TrackApplication() {
  const [ID, setID] = useState("");
  const [formData, setFormData] = useState({
    applicationId: "",
    cid: "",
    name: "",
    caseType: "",
    dateSubmitted: "",
    assignedLawyer: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [error, setError] = useState("");

  const { data: cas, error: fetchError } = useGetCaseQuery(
    ID && ID.charAt(ID.length - 1)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!ID.startsWith("APPID")) {
      setError("Invalid ID. ID should begin with APPID.");
      return;
    }
    if (!ID) {
      setError("Please enter a valid Application ID.");
      return;
    }

    if (fetchError) {
      setError("Error fetching case details. Please try again.");
      return;
    }

    if (ID && !cas) {
      setError("No application found with the applicationID " + `${ID}`);
      return;
    }

    if (cas) {
      setFormData({
        applicationId: "APPID" + cas.id,
        cid: cas.cid,
        name: cas.name,
        caseType: cas.caseType,
        dateSubmitted: cas.contactNo,
        assignedLawyer: cas.aLawyer,
      });
      setApplicationStatus(cas.status);
      setIsSubmitted(true);
      setError("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#00BA32";
      case "In Progress":
        return "#15605C";
      default:
        return "#8A8A8A"; // Color for "PENDING" as the default case
    }
  };

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NavBar currentPage="track" />

      <div>
        <div className="navheight"></div>
        <p className="apply-title-main">Track your application</p>
        <p className="apply-sub">
          We provide accessible, expert legal aid to ensure justice and equality
          for all.
        </p>

        <form onSubmit={handleSearch} className="search-form-container">
          <input
            type="text"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            placeholder="Enter Application ID..."
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {isSubmitted && (
          <div className="apply-wrapper">
            <div className="form-wrapper">
              <form className="apply-form">
                <p className="apply-title">Application Details</p>
                <div className="category-wrapper">
                  <div
                    className="application-status"
                    style={{
                      backgroundColor: getStatusColor(applicationStatus),
                    }}
                  >
                    {applicationStatus ? applicationStatus : "PENDING"}
                  </div>

                  <div className="track-form-row">
                    <label className="legal-label">
                      Application ID
                      <input
                        className="form-input"
                        type="text"
                        name="applicationId"
                        value={formData.applicationId}
                        readOnly
                      />
                    </label>

                    <label className="legal-label">
                      CID
                      <input
                        className="form-input"
                        type="text"
                        name="cid"
                        value={formData.cid}
                        readOnly
                      />
                    </label>

                    <label className="legal-label">
                      Name
                      <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="track-form-row">
                    <label className="legal-label">
                      Case Type
                      <input
                        className="form-input"
                        type="text"
                        name="caseType"
                        value={formData.caseType}
                        readOnly
                      />
                    </label>

                    <label className="legal-label">
                      Contact Number
                      <input
                        className="form-input"
                        type="text"
                        name="dateSubmitted"
                        value={formData.dateSubmitted}
                        readOnly
                      />
                    </label>

                    <label className="legal-label">
                      Assigned Lawyer
                      <input
                        className="form-input"
                        type="text"
                        name="assignedLawyer"
                        value={formData.assignedLawyer}
                        readOnly
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <p className="copyright-sigup">&copy; 2024 Bhutan Legal Aid Center</p>
      </div>
      <Footer />
    </main>
  );
}

export default TrackApplication;
