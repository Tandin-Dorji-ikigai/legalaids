import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./css/NDILogin.css";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useGetAccessTokenQuery, useCreateProofRequestQuery } from "../slices/ndiSlice";

const NDILogin = () => {
    const [qrValue, setQrValue] = useState("https://stage-demo-shortening-url.s3.ap-southeast-1.amazonaws.com/default/5d4b5c41-3156-4bad-9324-e7a1eda30f37");

    // Fetch the access token
    const { data: accessToken, error: tokenError, isLoading: tokenLoading } = useGetAccessTokenQuery();

    // Automatically create the proof request if accessToken is available
    const { data: proofData, error: proofError, isLoading: proofLoading } = useCreateProofRequestQuery(accessToken?.token, {
        skip: !accessToken, // Skip query if the access token is not yet available
    });

    useEffect(() => {
        if (tokenLoading) {
            console.log("Fetching access token...");
        }

        if (tokenError) {
            console.error("Failed to fetch access token:", tokenError);
        }

        if (accessToken) {
            console.log("Access token fetched:", accessToken);
        }
    }, [accessToken, tokenError, tokenLoading]);

    useEffect(() => {
        if (proofLoading) {
            console.log("Creating proof request...");
        }

        if (proofError) {
            console.error("Failed to create proof request:", proofError);
        }

        if (proofData) {
            console.log("Proof request created:", proofData);
            // Update the QR code value with the proof request URL
            setQrValue(proofData.proofRequestURL);
        }
    }, [proofData, proofError, proofLoading]);

    return (
        <>
            <div className="signup-nav">
                <Link to="/home">
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="signup-wrapper login-wrapper">
                <div>
                    <h3>Scan the QR code with your Bhutan NDI Wallet</h3>

                    <div className="qr-container">
                        <QRCodeCanvas
                            value={qrValue}
                            size={200}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="Q"
                            includeMargin={true}
                        />
                    </div>
                </div>
            </div>
            <p className="copyright-login">&copy; 2024 Bhutan Legal Aid Center</p>
        </>
    );
};

export default NDILogin;
