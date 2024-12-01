import React, { useEffect, useState } from "react";
import "./css/LawyerSideNav.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/authApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import Swal from "sweetalert2";

function LawyerSideNav() {
  const location = useLocation();
  const { data: lawyers, error } = useGetAllLawyerQuery();
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
  }

  useEffect(() => {
    if (error) {
      console.log(error)
    } else if (lawyers && userInfo) {
      const adm = lawyers.find((lawyer) => lawyer.cid === userInfo.user.username);
      setUser(adm);
    }
  }, [error, lawyers, userInfo]);

  return (
    <div className="lawyer-sidenav-container">
      <div className="lawyer-side-nav-logo-container">
        <div className="lawyer-dashboard-navLogo">
          <Link to="/currentcases">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="lawyer-logo-word-container">
          <div className="lawyer-logo-word-header">Legal Aid Center</div>
          <div className="lawyer-logo-word">Lawyer Dashboard</div>
        </div>
      </div>
      <div className="lawyer-side-nav-item-container">
        <div className="lawyer-side-nav-header">Main Menu</div>
        <div className="lawyer-nav-items">
          <Link
            to="/currentcases"
            className={`nav-link ${location.pathname === "/currentcases" ? "nav-active" : ""
              }`}
          >
            <div className="lawyer-nav-item-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill={
                  location.pathname === "/currentcases" ? "#15605C" : "#F1ECE4"
                }
              >
                <path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" />
              </svg>
              <div className="lawyer-nav-item-name">Current Cases</div>
            </div>
          </Link>
          <Link
            to="/history"
            className={`nav-link ${location.pathname === "/history" ? "nav-active" : ""
              }`}
          >
            <div className="lawyer-nav-item-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill={
                  location.pathname === "" ? "#15605C" : "#F1ECE4"
                }
              >
                <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" /></svg>
              <div className="lawyer-nav-item-name">History</div>
            </div>
          </Link>
        </div>
        <div className="admin-logout-container">
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
              <div className="user-detail-header">Lawyer</div>
              {user && <div className="user-detail-name">{user.userName}</div>}
            </div>
          </div>
          <button onClick={logOutHandler} className="admin-logout-btn">Logout</button>
        </div>
      </div>

    </div>
  );
}

export default LawyerSideNav;
