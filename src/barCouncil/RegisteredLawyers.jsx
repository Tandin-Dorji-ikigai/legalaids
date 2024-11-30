import React, { useEffect, useState } from "react";
import SideNav from "./DashboardNav";
import { useGetAllLawyerQuery, useEnableLawyerMutation, useDisableLawyerMutation } from "../slices/lawyerSlice";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

function EmployeeManagement() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 10;

  const { data: lawyers, error, isLoading } = useGetAllLawyerQuery();
  const [enableLawyer] = useEnableLawyerMutation();
  const [disableLawyer] = useDisableLawyerMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLawyers, setFilteredLawyers] = useState([]);

  useEffect(() => {
    if (lawyers) {
      handleSearch(searchQuery);
    }
  }, [lawyers, searchQuery]);

  const handleEnableLawyer = async (id) => {
    const confirmed = await Swal.fire({
      text: "Are you sure you want to enable the user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    });
    if (confirmed.isConfirmed) {
      try {
        await enableLawyer(id).unwrap();
        Swal.fire("Success!", "User successfully enabled.", "success");
        window.location.reload()
      } catch {
        Swal.fire("Error!", "Failed to enable the user. Please try again.", "error");
      }
    }
  };

  const handleDisableLawyer = async (id) => {
    const confirmed = await Swal.fire({
      text: "Are you sure you want to disable the user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    });
    if (confirmed.isConfirmed) {
      try {
        await disableLawyer(id).unwrap();
        Swal.fire("Success!", "User successfully disabled.", "success");
        window.location.reload()
      } catch {
        Swal.fire("Error!", "Failed to disable the user. Please try again.", "error");
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (lawyers) {
      const filtered = lawyers.filter((lawyer) =>
        Object.values(lawyer).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredLawyers(filtered);
    }
  };

  const totalPages = Math.ceil(lawyers.length / casesPerPage);
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = lawyers.slice(indexOfFirstCase, indexOfLastCase);

  return (
    <div className="dashboard-container">
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Registered Lawyers</div>
        <div className="users-section">
          <div className="users-header">Lawyers</div>
          <div className="search-bar">
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label="Search lawyers"
                style={{ color: "black" }}
              />
              <div className="search-bar-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#fff"
                >
                  <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                </svg>
              </div>

            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Error loading lawyers. Please try again later.</div>
          ) : filteredLawyers.length > 0 ? (
            <div className="details-container lawyer-details-container">
              <table>
                <thead>
                  <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLawyers.map((lawyer) => (
                    <tr key={lawyer.cid}>
                      <td>{lawyer.cid}</td>
                      <td>{lawyer.userName}</td>
                      <td>{lawyer.email}</td>
                      <td>{lawyer.contactNo}</td>
                      <td>
                        {lawyer.enabled ? (
                          <button
                            onClick={() => handleDisableLawyer(lawyer.id)}
                            className="disable_user"
                          >
                            Disable
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEnableLawyer(lawyer.id)}
                            className="enable_user"
                          >
                            Enable
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          ) : (
            []
          )}

          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
