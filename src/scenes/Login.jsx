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
import { Eye, EyeOff } from "lucide-react";
import { useGetAllAdminQuery } from "../slices/adminSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import { useGetAllCouncilQuery } from "../slices/councilApiSlice";

function Login() {
  const [cid, setCID] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const {data: adminResult} = useGetAllAdminQuery();
  const {data: employeeResult} = useGetAllEmployeeQuery();
  const {data: lawyerResult} = useGetAllLawyerQuery();
  const {data: councilResult} = useGetAllCouncilQuery();

  const handleCidChange = (e) => {
    setCID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ cid, password }).unwrap();

      if (res.user.authorities[0].authority === "User") {
        localStorage.setItem("verified", JSON.stringify(res));
        dispatch(setCredentials({ ...res }));
        Swal.fire({
          icon: "success",
          title: "Login",
          text: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else if (res.user.authorities[0].authority === "Admin") {
        const admin = adminResult.find((adm) => adm.cid === res.user.username);
        if (admin.enabled === true) {
          dispatch(setCredentials({ ...res }));
          Swal.fire({
            icon: "success",
            title: "Login",
            text: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard");
        } else {
          Swal.fire({
            icon: "info",
            title: "Login Failed",
            text: "Your account is disabled. Please contact customer service for further details!",
          });
        }
      } else if (res.user.authorities[0].authority === "Lawyer") {
        const lawyer = lawyerResult.find((lyr) => lyr.cid === res.user.username);
        if (lawyer.enabled === true) {
          dispatch(setCredentials({ ...res }));
          Swal.fire({
            icon: "success",
            title: "Login",
            text: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/currentcases");
        } else {
          Swal.fire({
            icon: "info",
            title: "Login Failed",
            text: "Your account is disabled. Please contact customer service for further details!",
          });
        }
      } else if (res.user.authorities[0].authority === "Employee") {
        const employee = employeeResult.find((emp) => emp.cid === res.user.username);
        if (employee.enabled === true) {
          dispatch(setCredentials({ ...res }));
          Swal.fire({
            icon: "success",
            title: "Login",
            text: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/employeeCaseManagement");
        } else {
          Swal.fire({
            icon: "info",
            title: "Login Failed",
            text: "Your account is disabled. Please contact customer service for further details!",
          });
        }
      } else if (res.user.authorities[0].authority === "Bar Council") {
        const council = councilResult.find((cnl) => cnl.cid === res.user.username);
        if (council.enabled === true) {
          dispatch(setCredentials({ ...res }));
          Swal.fire({
            icon: "success",
            title: "Login",
            text: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/caseOverview");
        } else {
          Swal.fire({
            icon: "info",
            title: "Login Failed",
            text: "Your account is disabled. Please contact customer service for further details!",
          });
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
            <Link to="/NDILogin" className="signup-top-btn">
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
                <div
                  className="password-container"
                  style={{ position: "relative", height: "50px" }}
                >
                  <input
                    className="form-input"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {isPasswordVisible ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </span>
                </div>
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
