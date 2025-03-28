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
import { usePostCouncilMutation } from "../slices/councilApiSlice";
import { useGetAllCouncilQuery } from "../slices/councilApiSlice";
import { useEnableAdminMutation } from "../slices/adminSlice";
import { useDisableAdminMutation } from "../slices/adminSlice";
import { useEnableCouncilMutation } from "../slices/councilApiSlice";
import { useDisableCouncilMutation } from "../slices/councilApiSlice";
import { useEnableEmployeeMutation } from "../slices/employeeSlice";
import { useDisableEmployeeMutation } from "../slices/employeeSlice";
import { useEnableLawyerMutation } from "../slices/lawyerSlice";
import { useDisableLawyerMutation } from "../slices/lawyerSlice";
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
  const [regNo, setRegNo] = useState("");
  const [postEmployee] = usePostEmployeeMutation();
  const [postLawyer] = usePostLawyerMutation();
  const [postCouncil] = usePostCouncilMutation();

  const [enableAdmin] = useEnableAdminMutation();
  const [disableAdmin] = useDisableAdminMutation();
  const [enableEmployee] = useEnableEmployeeMutation();
  const [disableEmployee] = useDisableEmployeeMutation();
  const [enableCouncil] = useEnableCouncilMutation();
  const [disableCouncil] = useDisableCouncilMutation();
  const [enableLawyer] = useEnableLawyerMutation();
  const [disableLawyer] = useDisableLawyerMutation();

  const { data: admins, error } = useGetAllAdminQuery();
  const { data: employees, error1 } = useGetAllEmployeeQuery();
  const { data: lawyers, error2 } = useGetAllLawyerQuery();
  const { data: users, error3 } = useGetAllUserQuery();
  const { data: roles, error4 } = useGetAllRoleQuery();
  const { data: councils, error5 } = useGetAllCouncilQuery();


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
    } else if (error5) {
      console.log(error5);
    }
  }, [error, error1, error2, error3, error4, error5,
    employees, admins, lawyers, users, roles, councils
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
          const roles = [{ id: role }]
          if (roleName === "Employee") {
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

            window.location.reload()

          } else if (roleName === "Lawyer") {
            await postLawyer({
              cid,
              userName,
              contactNo,
              email,
              password,
              enabled,
              roles,
              regNo
            })
            Swal.fire({
              title: "Success!",
              text: "The user has been registered successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            window.location.reload()
          } else if (roleName === "Bar Council") {
            await postCouncil({
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
            window.location.reload()
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

  // Pagination -admin
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 4;

  const totalPages = Math.ceil(admins?.length / casesPerPage);
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentAdmins = admins?.slice(indexOfFirstCase, indexOfLastCase);

  // Pagination -emp
  const [currentPageEmp, setCurrentPageEmp] = useState(1);

  const totalPagesEmp = Math.ceil(employees?.length / casesPerPage);
  const indexOfLastCaseEmp = currentPage * casesPerPage;
  const indexOfFirstCaseEmp = indexOfLastCaseEmp - casesPerPage;
  const currentEmp = employees?.slice(indexOfFirstCaseEmp, indexOfLastCaseEmp);

  // Pagination -lawers
  const [currentPageLawers, setCurrentPageLawers] = useState(1);
  const totalPagesLawers = Math.ceil(lawyers?.length / casesPerPage);
  const indexOfLastCaseLawers = currentPage * casesPerPage;
  const indexOfFirstCaseLawers = indexOfLastCaseLawers - casesPerPage;
  const currentLawers = lawyers?.slice(indexOfFirstCaseLawers, indexOfLastCaseLawers);

  // Pagination -barCouncil
  const [currentPageBarCouncil, setCurrentPageBarCouncil] = useState(1);

  const totalPagesBarCouncil = Math.ceil(councils?.length / casesPerPage);
  const indexOfLastCaseBarCouncil = currentPage * casesPerPage;
  const indexOfFirstCaseBarCouncil = indexOfLastCaseBarCouncil - casesPerPage;
  const currentBarCouncil = councils?.slice(indexOfFirstCaseBarCouncil, indexOfLastCaseBarCouncil);

  const handleEnableAdmin = (id) => {
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
          await enableAdmin(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully enabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          window.location.reload()
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

  const handleDisableAdmin = (id) => {
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
          await disableAdmin(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully disabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          window.location.reload()
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

  const handleEnableCouncil = (id) => {
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
          await enableCouncil(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully enabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          window.location.reload()
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

  const handleDisableCouncil = (id) => {
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
          await disableCouncil(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully disabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          window.location.reload()
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

  const handleEnableEmployee = (id) => {
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
          await enableEmployee(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully enabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          window.location.reload()
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

  const handleDisableEmployee = (id) => {
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
          await disableEmployee(id).unwrap();
          Swal.fire({
            title: 'Success!',
            text: 'User successfully disabled.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          window.location.reload()
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
          window.location.reload()
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
          window.location.reload()
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
        </div>
        <div className="users-section">
          <div className="users-header">Users</div>
          <div className="search-bar">
            <button className="add-user-btn" onClick={handleAddUser}>
              Add User
            </button>
          </div>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="custom-modal-overlay">
              <div className="custom-modal-content">
                <h2 className="custom-modal-header">Add User</h2>
                <form>
                <div className="custom-form-group">
                    <label className="custom-form-label">Role</label>
                    <select
                      className="custom-form-select"
                      value={role}
                      required
                      onChange={(e) => {
                        const selectedRole = roles.find(
                          (role) => role.id === Number(e.target.value)
                        );
                        setRole(e.target.value);
                        setRoleName(selectedRole?.name || "");
                      }}
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      {roles &&
                        roles
                          .filter(
                            (role) => role.name !== "Admin" && role.name !== "User"
                          )
                          .map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="custom-form-group">
                    <label className="custom-form-label">CID</label>
                    <input
                      className="custom-form-input"
                      type="text"
                      placeholder="Enter CID"
                      value={cid}
                      required
                      onChange={(e) => setCid(e.target.value)}
                    />
                  </div>

                  <div className="custom-form-group">
                    <label className="custom-form-label">Username</label>
                    <input
                      className="custom-form-input"
                      type="text"
                      placeholder="Enter username"
                      required
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="custom-form-group">
                    <label className="custom-form-label">Contact No</label>
                    <input
                      className="custom-form-input"
                      type="text"
                      placeholder="Enter contact number"
                      value={contactNo}
                      required
                      onChange={(e) => setContactNo(e.target.value)}
                    />
                  </div>

                  <div className="custom-form-group">
                    <label className="custom-form-label">Email</label>
                    <input
                      className="custom-form-input"
                      type="email"
                      placeholder="Enter email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {emailError && (
                      <p className="custom-error-message">{emailError}</p>
                    )}
                  </div>

                  <div className="custom-form-group">
                    <label className="custom-form-label">Password</label>
                    <input
                      className="custom-form-input"
                      type="password"
                      placeholder="Enter password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {roleName === "Lawyer" && <div className="custom-form-group">
                      <label className="custom-form-label">Registration Number</label>
                      <input
                        className="custom-form-input"
                        type="text"
                        placeholder="Enter Registration Number"
                        value={regNo}
                        required
                        onChange={(e) => setRegNo(e.target.value)}
                      />
                  </div>
                  }

                  <div className="custom-modal-buttons">
                    <button
                      type="button"
                      className="custom-button custom-add-user-btn"
                      onClick={handleInviteUser}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="custom-button custom-cancel-btn"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admins &&
                    currentAdmins.map((admin) => {
                      return (
                        <tr key={admin.cid}>
                          <td>{admin.cid}</td>
                          <td>{admin.userName}</td>
                          <td>{admin.email}</td>
                          <td>{admin.enabled === true ?
                            <button onClick={() => handleDisableAdmin(admin.id)} className="disable_user">Disable</button>
                            :
                            <button onClick={() => handleEnableAdmin(admin.id)} className="enable_user">Enable</button>} </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="pagination-employee">
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

            <div className="employee-details">
              <h3>Employee Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees &&
                    currentEmp.map((employee) => {
                      return (
                        <tr key={employee.cid}>
                          <td>{employee.cid}</td>
                          <td>{employee.userName}</td>
                          <td>{employee.email}</td>
                          <td>{employee.enabled === true ?
                            <button onClick={() => handleDisableEmployee(employee.id)} className="disable_user">Disable</button>
                            :
                            <button onClick={() => handleEnableEmployee(employee.id)} className="enable_user">Enable</button>} </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="pagination-employee">
                <button onClick={() => setCurrentPageEmp(currentPageEmp - 1)} disabled={currentPageEmp === 1}>
                  Previous
                </button>
                {Array.from({ length: totalPagesEmp }, (_, index) => (
                  <button key={index + 1} onClick={() => setCurrentPageEmp(index + 1)} className={currentPageEmp === index + 1 ? 'active' : ''}>
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPageEmp(currentPageEmp + 1)} disabled={currentPageEmp === totalPagesEmp}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="whiteSpace"></div>

          <div className="details-container">
            <div className="admin-details">
              <h3>Lawyer Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lawyers &&
                    currentLawers.map((lawyer) => {
                      return (
                        <tr key={lawyer.cid}>
                          <td>{lawyer.cid}</td>
                          <td>{lawyer.userName}</td>
                          <td>{lawyer.email}</td>
                          <td>{lawyer.enabled === true ?
                            <button onClick={() => handleDisableLawyer(lawyer.id)} className="disable_user">Disable</button>
                            :
                            <button onClick={() => handleEnableLawyer(lawyer.id)} className="enable_user">Enable</button>} </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="pagination-employee">
                <button onClick={() => setCurrentPageLawers(currentPageLawers - 1)} disabled={currentPageLawers === 1}>
                  Previous
                </button>
                {Array.from({ length: totalPagesLawers }, (_, index) => (
                  <button key={index + 1} onClick={() => setCurrentPageLawers(index + 1)} className={currentPageLawers === index + 1 ? 'active' : ''}>
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPageLawers(currentPageLawers + 1)} disabled={currentPageLawers === totalPagesLawers}>
                  Next
                </button>
              </div>
            </div>

            <div className="employee-details">
              <h3>Bar Council Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {councils &&
                    currentBarCouncil.map((council) => {
                      return (
                        <tr key={council.cid}>
                          <td>{council.cid}</td>
                          <td>{council.userName}</td>
                          <td>{council.email}</td>
                          <td>{council.enabled === true ?
                            <button onClick={() => handleDisableCouncil(council.id)} className="disable_user">Disable</button>
                            :
                            <button onClick={() => handleEnableCouncil(council.id)} className="enable_user">Enable</button>} </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="pagination-employee">
                <button onClick={() => setCurrentPageBarCouncil(currentPageBarCouncil - 1)} disabled={currentPageBarCouncil === 1}>
                  Previous
                </button>
                {Array.from({ length: totalPagesBarCouncil }, (_, index) => (
                  <button key={index + 1} onClick={() => setCurrentPageBarCouncil(index + 1)} className={currentPageBarCouncil === index + 1 ? 'active' : ''}>
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPageBarCouncil(currentPageBarCouncil + 1)} disabled={currentPageBarCouncil === totalPagesBarCouncil}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;