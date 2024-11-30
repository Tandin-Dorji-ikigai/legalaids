import React, { useEffect } from "react";
import SideNav from "./DashboardNav";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import { useEnableLawyerMutation } from "../slices/lawyerSlice";
import { useDisableLawyerMutation } from "../slices/lawyerSlice";
import Swal from "sweetalert2";

function EmployeeManagement() {
  const { data: lawyers, error } = useGetAllLawyerQuery();
  const [enableLawyer] = useEnableLawyerMutation();
  const [disableLawyer] = useDisableLawyerMutation();

  useEffect(() => {
    if (error) {
      console.log(error);
    } 
  }, [error, lawyers]);

  const handleEnableLawyer = (id) => {
    Swal.fire({
      title: "",
      text: "Are you sure you want to enable the user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await enableLawyer(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully enabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch (err) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to enable the user. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  }

  const handleDisableLawyer = (id) => {
    Swal.fire({
      title: "",
      text: "Are you sure you want to disable the user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await disableLawyer(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully disabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch (err) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to disable the user. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  }
  return (
    <div className="dashboard-container ">
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Registered Lawyers</div>
        <div className="users-section">
          <div className="users-header">Lawyers</div>
          <div className="search-bar">
            <div className="search-bar-container">
              <input type="text" placeholder="Search" />
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
          <div className="details-container lawyer-details-container">
            <div className="lawyer-details lawyer-details-sm">
              <h3>Lawyer Details</h3>
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
                  {lawyers &&
                    lawyers.map((lawyer) => {
                      return (
                        <tr key={lawyer.cid}>
                          <td>{lawyer.cid}</td>
                          <td>{lawyer.userName}</td>
                          <td>{lawyer.email}</td>
                          <td>{lawyer.contactNo}</td>
                          <td>{lawyer.enabled === true ?
                            <button onClick={() => handleDisableLawyer(lawyer.id)} className="disable_user">Disable</button>
                            :
                            <button onClick={() => handleEnableLawyer(lawyer.id)} className="enable_user">Enable</button>} </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
