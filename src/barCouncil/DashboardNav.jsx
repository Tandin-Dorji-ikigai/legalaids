import React, { useEffect, useState } from "react";
import "./css/sideNav.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/authApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllAdminQuery } from "../slices/adminSlice";
import Swal from "sweetalert2";

function SideNav() {
  const { data: admins, error } = useGetAllAdminQuery();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutCall] = useLogoutMutation();
  const [user, setUser] = useState();

  const logOutHandler = async () => {
    Swal.fire({
      title: "",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1E306D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutCall().unwrap();
          dispatch(logout());
          navigate("/home");
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Error logging out",
            icon: "error",
            confirmButtonColor: "#1E306D",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (admins && userInfo) {
      const adm = admins.find((admin) => admin.cid === userInfo.user.username);
      setUser(adm);
    }
  }, [error, admins, userInfo]);

  return (
    <div className="sidenav-container">
      <div>
        <div className="side-nav-logo-container">
          <div className="dashboard-navLogo">
            <Link to="/dashboard">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="logo-word-container">
            <div className="logo-word-header">Legal Aid Center</div>
            <div className="logo-word">Bar Council</div>
          </div>
        </div>
      
        <div className="side-nav-item-container">
          <div className="side-nav-header">Main Menu</div>
          <div className="nav-items">
            
            <Link
              to="/caseOverview"
              className={`nav-link ${
                location.pathname === "/caseOverview"
                  ? "nav-active"
                  : ""
              }`}
            >
              <div className="nav-item-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  fill={
                    location.pathname === "/caseOverview"
                      ? "#15605C"
                      : "#F1ECE4"
                  }
                >
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Zm280-200h320v-240H440v240Zm80-80v-80h160v80H520Z" />
                </svg>
                <div className="nav-item-name">Case Overview</div>
              </div>
            </Link>
            <Link
              to="/registeredLawyers"
              className={`nav-link ${
                location.pathname === "/registeredLawyers" ? "nav-active" : ""
              }`}
            >
              <div className="nav-item-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  fill={
                    location.pathname === "/registeredLawyers"
                      ? "#15605C"
                      : "#F1ECE4"
                  }
                >
                  <path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z" />
                </svg>
                <div className="nav-item-name">Registered Lawyers</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="admin-logout-container" style={{ marginBottom: "1vh" }}>
        <div className="user-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#C1FFFC"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
          </svg>
          <div className="user-detail">
            <div className="user-detail-header">Admin</div>
            {user && <div className="user-detail-name">{user.userName}</div>}
          </div>
        </div>
        <button onClick={logOutHandler} className="admin-logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideNav;
