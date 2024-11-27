import React, { useState } from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import Ndi from "../assets/ndi.jpeg";
import Logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/authApiSlice";
import Swal from "sweetalert2";

function Login() {
  const [cid, setCID] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleCidChange = (e) => {
    setCID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ cid, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      // Check user role and display corresponding alert
      if (res.user.authorities[0].authority === "User") {
        localStorage.setItem("verified", JSON.stringify(res));
        Swal.fire({
          icon: "success",
          title: "Login",
          text: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "success",
          title: "Login",
          text: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        if (res.user.authorities[0].authority === "Admin") {
          navigate("/dashboard");
        } else if (res.user.authorities[0].authority === "Lawyer") {
          navigate("/currentcases");
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.data?.message || "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="signup-nav">
        <Link to="/home">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="signup-wrapper login-wrapper">
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <p className="signup-title">Login</p>
            <Link to="#" className="signup-top-btn">
              <div className="sign-up-ndi">
                <div className="ndi-cotainer">
                  <img src={Ndi} alt="NDI logo" />
                </div>
                Register With Bhutan NDI
              </div>
            </Link>
            <div className="signup-or">OR</div>
            <div>
              <label className="form-label">
                Citizenship ID *
                <input
                  className="form-input"
                  type="text"
                  name="cid"
                  value={cid}
                  onChange={handleCidChange}
                  placeholder="Enter Your CID"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Password
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  required
                />
              </label>
            </div>

            <button type="submit" className="signup-btn">
              Submit
            </button>

            <Link className="below-signup" to="/signup">
              Don’t have an account? Register
            </Link>
          </form>
        </div>
      </div>
      <p className="copyright-login">&copy; 2024 Bhutan Legal Aid Center</p>
    </>
  );
}

export default Login;