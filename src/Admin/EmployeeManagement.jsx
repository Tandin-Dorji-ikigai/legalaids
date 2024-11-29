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
  const [cid, setCid] = useState("");
  const [userName, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [roleName, setRoleName] = useState("");
  const [postEmployee] = usePostEmployeeMutation();
  const [postLawyer] = usePostLawyerMutation();
  const { data: admins } = useGetAllAdminQuery();
  const { data: employees } = useGetAllEmployeeQuery();
  const { data: lawyers } = useGetAllLawyerQuery();
  const { data: users } = useGetAllUserQuery();
  const { data: roles } = useGetAllRoleQuery();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [editMode, setEditMode] = useState(false); // New state for edit mode

  useEffect(() => {
    // Error handling omitted for brevity
  }, [admins, employees, lawyers, users, roles]);

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
    // User registration logic omitted for brevity
    handleCloseModal();
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    // Code to toggle User Status
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
                <div className="card-stat-num">
                  {employees.length} Employee(s)
                </div>
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
              {lawyers ? (
                <div className="card-stat-num">{lawyers.length} Lawyer(s)</div>
              ) : (
                <div className="card-stat-num">0 Lawyer</div>
              )}
            </div>
            <div className="stats-card">
              <div className="card-header">Total Users</div>
              {users ? (
                <div className="card-stat-num">{users.length} User(s)</div>
              ) : (
                <div className="card-stat-num">0 User</div>
              )}
            </div>
          </div>
        </div>        <div className="users-section">
          <div className="users-header">Users</div>
          <div className="search-bar">
            <button className="add-user-btn" onClick={handleAddUser}>
              Add User
            </button>
            <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Done" : "Edit"}
            </button>
          </div>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div>
              <h2>Add User</h2>
              <form>
                <div>
                  <label>CID</label>
                  <input
                    type="text"
                    placeholder="Enter CID"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                  />
                </div>
                <div>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label>Contact No</label>
                  <input
                    type="text"
                    placeholder="Enter contact number"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
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
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
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
                <div className="modal-buttons">
                  <button
                    type="button"
                    className="add-user-btn"
                    onClick={handleInviteUser}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
                    {editMode && <th>Actions</th>} {/* Conditional rendering */}
                  </tr>
                </thead>
                <tbody>
                  {admins && admins.map((admin) => (
                    <tr key={admin.cid}>
                      <td>{admin.cid}</td>
                      <td>{admin.userName}</td>
                      <td>{admin.email}</td>
                      {editMode && (
                        <td>
                         {"Enabled" == "Enabled" ? (
                             <button class = "toggleDisable" onClick={() => toggleUserStatus("test", "enable")}>
                             Disable
                           </button>
                            ) : (
                              <button  class = "toggleDisable" onClick={() => toggleUserStatus("test", "enable")}>
                              Enable
                            </button>
                            )}

                         
                        </td>
                      )}
                    </tr>
                  ))}
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
                    {editMode && <th>Actions</th>} {/* Conditional rendering */}
                  </tr>
                </thead>
                <tbody>

                  {/*  */}
                <tr key={114123123}>
                      <td>{114123123}</td>
                      <td>{"test"}</td>
                      <td>{"test"}</td>
                      {editMode && (
                        <td>
                         {"Enabled" == "Enabled" ? (
                             <button class = "toggleDisable" onClick={() => toggleUserStatus("test", "enable")}>
                             Disable
                           </button>
                            ) : (
                              <button  class = "toggleEnable" onClick={() => toggleUserStatus("test", "enable")}>
                              Enable
                            </button>
                            )}

                         
                        </td>
                      )}
                    </tr>
                  {employees && employees.map((employee) => (
                    <tr key={employee.cid}>
                      <td>{employee.cid}</td>
                      <td>{employee.userName}</td>
                      <td>{employee.email}</td>
                      {editMode && (
                        <td>
                         {"Enabled" == "Enabled" ? (
                             <button class = "toggleDisable" onClick={() => toggleUserStatus("test", "enable")}>
                             Disable
                           </button>
                            ) : (
                              <button  class = "toggleDisable" onClick={() => toggleUserStatus("test", "enable")}>
                              Enable
                            </button>
                            )}

                         
                        </td>
                      )}
                    </tr>
                  ))}
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
                    {editMode && <th>Actions</th>} {/* Conditional rendering */}
                  </tr>
                </thead>
                <tbody>
                  {lawyers && lawyers.map((lawyer) => (
                    <tr key={lawyer.cid}>
                      <td>{lawyer.cid}</td>
                      <td>{lawyer.userName}</td>
                      <td>{lawyer.email}</td>
                      {editMode && (
                        <td>
                         {"Enabled" == "Enabled" ? (
                             <button class = "toggleDisable" onClick={() => toggleUserStatus("test", "enable")}>
                             Disable
                           </button>
                            ) : (
                              <button  class = "toggleDisable" onClick={() => toggleUserStatus("test", "enable")}>
                              Enable
                            </button>
                            )}

                         
                        </td>
                      )}
                    </tr>
                  ))}
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
