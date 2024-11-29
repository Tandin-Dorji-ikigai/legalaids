import React, { useEffect, useState } from "react";
import SideNav from "./DashboardNav";
import "./css/EmployeeManagement.css";
import { useGetAllAdminQuery } from "../slices/adminSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import { useGetAllUserQuery } from "../slices/userApiSlice";
import { useGetAllRoleQuery } from "../slices/userApiSlice";
import { usePostEmployeeMutation } from "../slices/employeeSlice";
import { usePostLawyerMutation } from "../slices/lawyerSlice";
import Swal from "sweetalert2";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        {/* <button onClick={onClose} className="modal-close-btn">
          Close
        </button> */}
      </div>
    </div>
  );
};

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function EmployeeManagement() {
  // Move the useState calls inside the component function
  const [cid, setCid] = useState("");
  const [userName, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [roleName, setRoleName] = useState("");
  const [postEmployee] = usePostEmployeeMutation();
  const [postLawyer] = usePostLawyerMutation();

  const { data: admins, error } = useGetAllAdminQuery();
  const { data: employees, error1 } = useGetAllEmployeeQuery();
  const { data: lawyers, error2 } = useGetAllLawyerQuery();
  const { data: users, error3 } = useGetAllUserQuery();
  const { data: roles, error4 } = useGetAllRoleQuery();

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (error1) {
      console.log(error1);
    } else if (error2) {
      console.log(error2);
    } else if (error3) {
      console.log(error3);
    } else if (error4) {
      console.log(error4);
    }
  }, [
    error,
    error1,
    error2,
    error3,
    error4,
    employees,
    admins,
    lawyers,
    users,
    roles,
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setEmailError("");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !isValidEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleInviteUser = () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    Swal.fire({
      title: "",
      text: "Are you sure you want to register this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const enabled = true;
          const roles = [{id : role}]
          console.log(roleName)
          console.log(role)
          if(roleName === "Employee"){
            await postEmployee({
              cid,
              userName,
              contactNo,
              email,
              password,
              enabled,
              roles
            })
            Swal.fire({
              title: "Success!",
              text: "The user has been registered successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          }else if(roleName === "Lawyer"){
            await postLawyer({
              cid,
              userName,
              contactNo,
              email,
              password,
              enabled,
              roles
            })
            Swal.fire({
              title: "Success!",
              text: "The user has been registered successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: "There was an error registering the user.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    });
    handleCloseModal();
  };

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
            <button className="add-user-btn" onClick={handleAddUser}>
              Add User
            </button>
            <button className="edit-btn">Edit</button>
          </div>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div>
              <h2>Add User</h2>
              <form>
                {/* CID Field */}
                <div>
                  <label>CID</label>
                  <input
                    type="text"
                    placeholder="Enter CID"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                  />
                </div>

                {/* Username Field */}
                <div>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Contact Number Field */}
                <div>
                  <label>Contact No</label>
                  <input
                    type="text"
                    placeholder="Enter contact number"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter email"
                  />
                  {emailError && <p className="error-message">{emailError}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Role Dropdown */}
                <div>
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => {
                      const selectedRole = roles.find(
                        (role) => role.id === Number(e.target.value)
                      );
                      setRole(e.target.value);
                      setRoleName(selectedRole?.name || ""); // Update role name if needed
                    }}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles &&
                      roles
                        .filter(
                          (role) =>
                            role.name !== "Admin" && role.name !== "User"
                        )
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="modal-buttons">
                  <button
                    type="button"
                    class="add-user-btn"
                    onClick={handleInviteUser}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    class="cancelBtn"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>

          {/* <div className="details-container">
            <div className="admin-details">
              <h3>Lawyer Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {admins &&
                    admins.map((admin) => {
                      return (
                        <tr key={admin.cid}>
                          <td>{admin.cid}</td>
                          <td>{admin.userName}</td>
                          <td>{admin.email}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="employee-details">
              <h3>Employee Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employees &&
                    employees.map((employee) => {
                      return (
                        <tr key={employee.cid}>
                          <td>{employee.cid}</td>
                          <td>{employee.userName}</td>
                          <td>{employee.email}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div> */}
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
                    <th>Dzongkhag</th> 
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
