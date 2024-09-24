import React, { useEffect, useState } from "react";
import SideNav from "./DashboardNav";
import "./css/EmployeeManagement.css";
import { useGetAllAdminQuery } from "../slices/adminSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";

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
  const { data: admins, error } = useGetAllAdminQuery();
  const { data: employees, error1 } = useGetAllEmployeeQuery();

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (error1) {
      console.log(error1);
    }
  }, [error, error1, employees, admins]);
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
    // Here you would typically integrate with a backend API to send the invitation
    console.log(`Inviting user with email: ${email}`);
    // For demonstration, we'll just show an alert
    alert(`Invitation sent to ${email}`);
    handleCloseModal();
  };
  return (
    <div className="dashboard-container ">
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-header">Employee Management</div>
        <h3 className="stats-header">Statistical Overview</h3>
        <div className="dashboard-stats-container employee-management">
          <div className="stats-card-container-employee-card">
            <div className="stats-card ">
              <div className="card-header">Total Employees</div>
              {employees ? (
                <div className="card-stat-num">{employees.length} Employee(s)</div>
              ) : (
                <div className="card-stat-num">0 Employee</div>
              )}
              
            </div>
            <div className="stats-card">
              <div className="card-header">Total Admins</div>
              {admins ? (
                <div className="card-stat-num">{admins.length} Admin(s)</div>
              ) : (
                <div className="card-stat-num">0 Admin</div>
              )}
            </div>
            <div className="stats-card">
              <div className="card-header">Total Lawyers</div>
              <div className="card-stat-num">5 Lawyers</div>
            </div>
            <div className="stats-card">
              <div className="card-header">Total Lawyers</div>
              <div className="card-stat-num">5 Lawyers</div>
            </div>
          </div>
        </div>
        <div className="users-section">
          <div className="users-header">Users</div>
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
            <h2>Invite New User</h2>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={handleEmailChange}
              className={`modal-input ${emailError ? "input-error" : ""}`}
            />
            {emailError && <div className="error-message">{emailError}</div>}
            <div className="modal-buttons">
              <button onClick={handleCloseModal} className="modal-btn">
                Cancel
              </button>
              <button
                onClick={handleInviteUser}
                disabled={!email || !!emailError}
                className="modal-btn modal-btn-primary"
              >
                Invite
              </button>
            </div>
          </Modal>
          <div className="details-container">
            <div className="admin-details">
              <h3>Admin Details</h3>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>11410009899</td>
                    <td>Kinley Wangmo</td>
                    <td>kinley@gmail.com</td>
                  </tr>
                  <tr>
                    <td>11410009899</td>
                    <td>Kinley Wangmo</td>
                    <td>kinley@gmail.com</td>
                  </tr>
                  <tr>
                    <td>11410009899</td>
                    <td>Kinley Wangmo</td>
                    <td>kinley@gmail.com</td>
                  </tr>
                  <tr>
                    <td>11210009898</td>
                    <td>Tshering Dhendup</td>
                    <td>tshering@gmail.com</td>
                  </tr>
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
