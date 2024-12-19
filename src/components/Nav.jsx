import React, { useState, useEffect } from "react";
import "./nav.css";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../assets/logo.png";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import Swal from "sweetalert2";

function NavBar({ currentPage }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const verified = localStorage.getItem("verified");

  const [logoutCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
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
          localStorage.removeItem("verified");
          navigate("/");
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

  useEffect(() => {}, [userInfo]);
  // console.log(userInfo);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`mainNav ${scrolled ? "scrolled" : ""}`}>
        <div className="navLogo">
          <Link to="/home">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div
          id="linkswrapper"
          className={isMenuOpen ? "linkswrapper active" : "linkswrapper"}
        >
          <div id="navLinks">
            <ul>
              <li>
                <Link
                  to="/home"
                  className={`${currentPage === "home" ? "active" : ""} ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`${currentPage === "about" ? "active" : ""}  ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className={`${currentPage === "legal" ? "active" : ""}  ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                >
                  {t("legalIssues")}
                </Link>
              </li>
              <li>
                <Link
                  to="/apply1"
                  className={`${currentPage === "apply1" ? "active" : ""}  ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                >
                  {t("applyForLegalAidNav")}
                </Link>
              </li>
              <li>
                <Link
                  to="/track"
                  className={`${currentPage === "track" ? "active" : ""}  ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}
                >
                  {t("trackApplication")}
                </Link>
              </li>
            </ul>
          </div>
          <div></div>
          {userInfo &&
          userInfo.user.authorities[0].authority === "User" &&
          verified ? (
            <div className="navBtns">
              <LanguageSelector />
              <Link onClick={handleLogout} className="logoutLink">
                <div className={`nav-btn  ${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>
                <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`} style={{marginTop: currentLang === "dz" ? "-0.5em" : ""}}>{t("logout")}</p>

                </div>
              </Link>
            </div>
          ) : (
            <div className="navBtns">
              <LanguageSelector />
              <Link to="/login" className="logoutLink">
                <div className={`nav-btn nav-btn1`}>
                  <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`} style={{marginTop: currentLang === "dz" ? "-0.5em" : ""}}>{t("login")}</p>
                </div>
              </Link>

              {/* <Link to="/signup" className='logoutLink'>
                                <div className="nav-btn">
                                    Sign Up
                                </div>
                            </Link> */}
            </div>
          )}
        </div>

        {/* mobile */}
        <div className="mobileView" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose className="hamburger" />
          ) : (
            <RxHamburgerMenu className="hamburger" />
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;

 