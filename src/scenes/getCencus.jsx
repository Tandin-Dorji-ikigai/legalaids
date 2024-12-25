import React, { useState } from "react";

const CitizenDetails = () => {
  const [cid, setCid] = useState("");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchCitizenDetails = async () => {
    try {
      setError(null); // Clear previous errors
      setDetails(null); // Clear previous details
      const response = await fetch(`http://localhost:8080/api/proxy/citizendetails/${cid}`, {
        method: "GET",
      });
  
      console.log("Response details:", response);
  
      if (!response.ok) {
        const errorText = await response.text(); // Read the response body for error details
        throw new Error(`Error: ${response.statusText}, Details: ${errorText}`);
      }
  
      const data = await response.json();
      setDetails(data); // Set the fetched data to state
    } catch (err) {
      console.error("Error occurred while fetching citizen details:", err);
      setError(err.message || "Unknown error occurred");
    }
  };
  

  return (
    <div>
      <h1>Citizen Details Fetcher</h1>
      <input
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter CID"
      />
      <button onClick={fetchCitizenDetails}>Fetch Details</button>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {details && (
        <div>
          <h2>Citizen Details</h2>
          <pre>{JSON.stringify(details, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CitizenDetails;
