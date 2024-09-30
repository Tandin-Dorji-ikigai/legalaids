import React, {useEffect, useState} from "react";
import "./css/sideNav.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/authApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllAdminQuery } from "../slices/adminSlice";

function SideNav() {
  const {data: admins, error} = useGetAllAdminQuery();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutCall] = useLogoutMutation();
  const [user, setUser] = useState();

  const logOutHandler = async () => {
    try{
      await logoutCall().unwrap();
      dispatch(logout());
      navigate('/home');
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (error) {
      console.log(error)
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
          <div className="logo-word">Admin Dashboard</div>
        </div>
      </div>
      <div className="side-nav-item-container">
        <div className="side-nav-header">Admin Menu</div>
        <div className="nav-items">
          <Link
            to="/dashboard"
            className={`nav-link ${
              location.pathname === "/dashboard" ? "nav-active" : ""
            }`}
          >
            <div className="nav-item-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill={
                  location.pathname === "/dashboard" ? "#15605C" : "#F1ECE4"
                }
              >
                <path d="M284-277h60v-205h-60v205Zm332 0h60v-420h-60v420Zm-166 0h60v-118h-60v118Zm0-205h60v-60h-60v60ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z" />
              </svg>
              <div className="nav-item-name">Dashboard</div>
            </div>
          </Link>
          <Link
            to="/employeeManagement"
            className={`nav-link ${
              location.pathname === "/employeeManagement" ? "nav-active" : ""
            }`}
          >
            <div className="nav-item-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill={
                  location.pathname === "/employeeManagement"
                    ? "#15605C"
                    : "#F1ECE4"
                }
              >
                <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
              </svg>
              <div className="nav-item-name">Employee Management</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="side-nav-item-container">
        <div className="side-nav-header">Main Menu</div>
        <div className="nav-items">
          <Link
            to="/caseManagement"
            className={`nav-link ${
              location.pathname === "/caseManagement" ? "nav-active" : ""
            }`}
          >
            <div className="nav-item-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill={
                  location.pathname === "/caseManagement"
                    ? "#15605C"
                    : "#F1ECE4"
                }
              >
                <path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" />
              </svg>
              <div className="nav-item-name">Case Management</div>
            </div>
          </Link>
          <Link
            to="/applicationManagement"
            className={`nav-link ${
              location.pathname === "/applicationManagement" ? "nav-active" : ""
            }`}
          >
            <div className="nav-item-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill={
                  location.pathname === "/applicationManagement"
                    ? "#15605C"
                    : "#F1ECE4"
                }
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Zm280-200h320v-240H440v240Zm80-80v-80h160v80H520Z" />
              </svg>
              <div className="nav-item-name">Application Management</div>
            </div>
          </Link>
          <Link
            to="/dataManagement"
            className={`nav-link ${
              location.pathname === "/dataManagement" ? "nav-active" : ""
            }`}
          >
            <div className="nav-item-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill={
                  location.pathname === "/dataManagement"
                    ? "#15605C"
                    : "#F1ECE4"
                }
              >
                <path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z" />
              </svg>
              <div className="nav-item-name">Data Management</div>
            </div>
          </Link>
        </div>
      </div>
      </div>
      <div className="admin-logout-container" style={{marginBottom: "1vh"}}>
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
              {user && (
                <div className="user-detail-name">{user.userName}</div>
              )}
            </div>
          </div>
          <button onClick={logOutHandler} className="admin-logout-btn">Logout</button>
        </div>
    </div>
  );
}

export default SideNav;
