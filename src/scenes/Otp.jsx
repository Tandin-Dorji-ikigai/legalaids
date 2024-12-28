import React, { useState, useRef, useEffect } from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import Ndi from "../assets/ndi.jpeg";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllUserQuery } from "../slices/userApiSlice";
import { useVerifyOTPMutation } from "../slices/authApiSlice";
import Swal from "sweetalert2";

function Otp() {
  const { data: users, error } = useGetAllUserQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [contact_no, setContact] = useState("");
  const [verify] = useVerifyOTPMutation();

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (users && userInfo) {
      const adm = users.find((user) => user.cid === userInfo.user.username);
      setContact(adm.contact_no);
      console.log(adm.contact_no);
    }
  }, [error, users, userInfo]);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const newOtp = [...otp];
    const input = e.target.value;

    if (/^\d*$/.test(input)) {
      newOtp[index] = input;
      setOtp(newOtp);

      if (input && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pin = otp.join("");
    console.log(pin);
    try {
      const res = await verify({ contact_no, pin }).unwrap();
      localStorage.setItem("verified", JSON.stringify(res));

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have been successfully logged in.",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      console.log(err);

      // Error alert
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "The OTP you entered is incorrect. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="signup-nav">
        <Link to="/home">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="signup-wrapper login-wrapper">
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <p className="signup-title">Login</p>
            <Link to="#" className="signup-top-btn">
              <div className="sign-up-ndi">
                <div className="ndi-cotainer">
                  <img src={Ndi} alt="ndi logo" />
                </div>
                Register With Bhutan NDI
              </div>
            </Link>
            <div className="signup-or">OR</div>
            <div>
              <div className="pin">Enter PIN</div>
              <div className="otp-container">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    maxLength={1}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(index, e)}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="signup-btn">
              Login
            </button>

            <Link className="below-signup" to="/signup">
              Don’t have an account? register
            </Link>
          </form>
        </div>
      </div>
      <p className="copyright-login">&copy; 2024 Bhutan Legal Aid Center</p>
    </>
  );
}

export default Otp;
