// import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import "./css/NDILogin.css";
// import Logo from "../assets/logo.png";
// import { Link } from "react-router-dom";

// const NDILogin = () => {
//     const qrValue = "https://stage-demo-shortening-url.s3.ap-southeast-1.amazonaws.com/default/5d4b5c41-3156-4bad-9324-e7a1eda30f37";

//     return (
//         <>
//             <div className="signup-nav">
//                 <Link to="/home">
//                     <img src={Logo} alt="Logo" />
//                 </Link>
//             </div>
//             <div className="signup-wrapper login-wrapper">
//                 <div>
//                     <h3>Scan the QR code with your Bhutan NDI Wallet</h3>

//                     <div className="qr-container">
//                         <QRCodeCanvas
//                             value={qrValue}
//                             size={200}
//                             bgColor="#ffffff"
//                             fgColor="#000000"
//                             level="Q"
//                             includeMargin={true}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <p className="copyright-login">&copy; 2024 Bhutan Legal Aid Center</p>
//         </>
//     );
// };

// export default NDILogin;
