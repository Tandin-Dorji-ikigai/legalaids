import React, { useState } from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import Ndi from "../assets/ndi.jpeg";
import Logo from "../assets/logo.png";
import { usePostUserMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Signup() {
  const [postUser] = usePostUserMutation();
  const [cid, setCID] = useState("");
  const [dob, setDob] = useState("");
  const [contact_no, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const enabled = true;
  const roles = [{ id: 2 }];

  const [errors, setErrors] = useState({
    mobile: "",
  });

  const validateMobile = (mobile) => {
    if (!/^17|77/.test(mobile)) {
      return "Mobile number must start with 17 or 77.";
    }

    if (!/^\d{8}$/.test(mobile)) {
      return "Mobile number must have exactly 8 digits.";
    }

    return "";
  };

  const handleCidChange = (e) => {
    setCID(e.target.value);
  };

  const handleContactChange = (e) => {
    const error = validateMobile(e.target.value);
    setErrors({ mobile: error });
    setContact(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCpasswordChange = (e) => {
    setCPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.mobile && cPassword === password) {
      try {
        await postUser({
          cid,
          contact_no: `+975${contact_no}`,
          dob,
          password,
          enabled,
          roles,
        });

        // Success alert
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } catch (err) {
        console.log(err);

        // Error alert
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            err.data?.message ||
            "An error occurred during registration. Please try again.",
        });
      }
    } else {
      console.log("Validation errors:", errors);

      // Validation error alert
      Swal.fire({
        icon: "warning",
        title: "Invalid Input",
        text: "Please ensure all fields are filled correctly.",
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
      <div className="signup-wrapper">
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <p className="signup-title">Sign Up</p>
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
              <label className="form-label">
                Citizenship ID/Passport No/Route Permit *
                <input
                  className="form-input"
                  type="text"
                  name="id"
                  value={cid}
                  onChange={handleCidChange}
                  placeholder="Citizenship ID/Passport No/Route Permit *"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Date Of Birth (YYYY-MM-DD) *
                <input
                  className="form-input"
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={handleDobChange}
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Mobile Number *
                <input
                  className="form-input number-form"
                  type="number"
                  name="mobile"
                  value={contact_no}
                  onChange={handleContactChange}
                  placeholder="Mobile Number *"
                  required
                />
                {errors.mobile && (
                  <span className="error-msg" style={{ color: "red" }}>
                    {errors.mobile}
                  </span>
                )}
              </label>
            </div>
            <div>
              <label className="form-label">
                Password
                <input
                  className="form-input number-form"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Confirm Password
                <input
                  className="form-input number-form"
                  type="password"
                  name="confirmPassword"
                  value={cPassword}
                  onChange={handleCpasswordChange}
                  placeholder="Confirm Password"
                  required
                />
                {password !== cPassword && (
                  <span className="error-msg" style={{ color: "red" }}>
                    Passwords do not match
                  </span>
                )}
              </label>
            </div>
            <button type="submit" className="signup-btn">
              Register
            </button>
            <Link className="below-signup" to="/login">
              Already have an account? Login
            </Link>
          </form>
          <p className="copyright-sigup">&copy; 2024 Bhutan Legal Aid Center</p>
        </div>
      </div>
    </>
  );
}

export default Signup;
