import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link, useNavigate } from "react-router-dom";
import {
    useGetAccessTokenQuery,
    useCreateProofRequestQuery,
    useCheckloginMutation,
} from "../slices/ndiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useGetAllAdminQuery } from "../slices/adminSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";
import { useGetAllCouncilQuery } from "../slices/councilApiSlice";
import Swal from "sweetalert2";

import "./css/NDILogin.css";
import NDIlogo from "../assets/ndibg.svg";
import ndi_scan from "../assets/scaniconimg.svg";
import google from "../assets/google.jpg";
import apple from "../assets/apple.jpg";
import call from "../assets/Call.svg";
import email from "../assets/Mail.svg";
import Play from "../assets/PlayButton.svg";

const NDILogin = () => {
    const [qrValue, setQrValue] = useState("");
    const [deeplink, setDeeplink] = useState("");
    const [isPolling, setIsPolling] = useState(false);
    const [scanned, setScanned] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: adminResult } = useGetAllAdminQuery();
    const { data: employeeResult } = useGetAllEmployeeQuery();
    const { data: lawyerResult } = useGetAllLawyerQuery();
    const { data: councilResult } = useGetAllCouncilQuery();

    const { data: accessToken } = useGetAccessTokenQuery();
    const { data: proofData, isLoading: isProofLoading } = useCreateProofRequestQuery(accessToken?.token, {
        skip: !accessToken,
    });

    const [checklogin, { data: loginResponse }] = useCheckloginMutation();

    useEffect(() => {
        if (loginResponse?.message?.startsWith("Login successful for user:")) {
            setScanned(true);
            const cid = loginResponse.message.split(":")[1].trim();
            let role = "User";
            let record;

            if (adminResult?.find(entry => entry.cid === cid)) {
                role = "Admin";
                record = adminResult.find(entry => entry.cid === cid);
            } else if (employeeResult?.find(entry => entry.cid === cid)) {
                role = "Employee";
                record = employeeResult.find(entry => entry.cid === cid);
            } else if (lawyerResult?.find(entry => entry.cid === cid)) {
                role = "Lawyer";
                record = lawyerResult.find(entry => entry.cid === cid);
            } else if (councilResult?.find(entry => entry.cid === cid)) {
                role = "Bar Council";
                record = councilResult.find(entry => entry.cid === cid);
            }

            if (role === "User" || record?.enabled) {
                dispatch(setCredentials({ user: { username: cid, authorities: [{ authority: role }] } }));
                localStorage.setItem("verified", "true");
                navigate(
                    role === "Admin" ? "/dashboard" :
                    role === "Employee" ? "/employeeCaseManagement" :
                    role === "Lawyer" ? "/currentcases" :
                    role === "Bar Council" ? "/caseOverview" :
                    "/"
                );
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Not Registered",
                    text: "You are not registered in the system. Please sign up first.",
                });
                setIsPolling(false);
            }
        }
    }, [loginResponse, navigate, adminResult, employeeResult, lawyerResult, councilResult, dispatch]);

    useEffect(() => {
        if (proofData) {
            setQrValue(proofData.proofRequestURL);
            setDeeplink(proofData.deepLinkURL);
            setIsPolling(true);
        }
    }, [proofData]);

    useEffect(() => {
        if (!isPolling) return;

        const intervalId = setInterval(() => {
            checklogin();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [isPolling, checklogin]);

    return (
        <>
            <button className="ndi-back-btn" onClick={() => navigate(-1)}>← Back</button>
            <div className="ndi-login-container">
                <h3 className="ndi-login-title">
                    <span className="ndi-text-desktop">Scan with <span className="ndi-branding-color">Bhutan NDI</span> Wallet</span>
                    <span className="ndi-text-mobile">Login with <span className="ndi-branding-color">Bhutan NDI</span> Wallet</span>
                </h3>

                <div className="open-wallet-btn-wrapper">
                    <a className="open-wallet-btn" href={deeplink} target="_blank" rel="noopener noreferrer">
                        Open Bhutan NDI Wallet
                    </a>
                    <div className="divider-or">OR</div>
                </div>

                <div className="qr-container">
                    {isProofLoading || !qrValue ? (
                        <p>Generating QR...</p>
                    ) : !scanned ? (
                        <>
                            <QRCodeCanvas value={qrValue} size={185} bgColor="#ffffff" fgColor="#000000" level="H" includeMargin={false} />
                            <img src={NDIlogo} alt="Center Logo" className="qr-center-logo" />
                        </>
                    ) : (
                        <p>Authenticating... Please wait.</p>
                    )}
                </div>

                <div className="ndi-step-direct">
                    <ol>
                        <li>Open Bhutan NDI Wallet on your phone</li>
                        <li>Tap the scan button <img src={ndi_scan} alt="Scan" className="ndi-scan-btn" /> and scan the QR code</li>
                    </ol>
                </div>

                <div className="ndi-btn-play-container">
                    <Link to="https://www.youtube.com/watch?v=hzBgpzzot7w" className="video-btn" target="_blank" rel="noopener noreferrer">
                        <div>Watch video guide</div>
                        <img className="ndi-yt-play" src={Play} alt="play youtube" />
                    </Link>
                </div>

                <div className="ndi-download-now">Don't have the Bhutan NDI Wallet? <span className="ndi-branding-color">Download Now!</span></div>

                <div className="ndi-download-btn-container">
                    <Link to="https://play.google.com/store/apps/details?id=com.bhutanndi" target="_blank">
                        <img src={google} alt="Google Play" className="store-badge" />
                    </Link>
                    <Link to="https://apps.apple.com/au/app/bhutan-ndi/id1645493166" target="_blank">
                        <img src={apple} alt="App Store" className="store-badge" />
                    </Link>
                </div>

                <p className="support-title">Get Support</p>
                <div className="ndi-support">
                    <p><img className="support-logo" src={email} alt="Email" /><span>ndifeedback@dhi.bt</span></p>
                    <p><img className="support-logo" src={call} alt="Call" /><span>1199</span></p>
                </div>
            </div>
        </>
    );
};

export default NDILogin;
