import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./css/NDILogin.css";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
    useGetAccessTokenQuery,
    useCreateProofRequestQuery,
    useGetProofByThreadIdQuery,
    useRegisterWebhookMutation,
    useSubscribeWebhookMutation,
    useCheckloginMutation,
} from "../slices/ndiSlice";

const NDILogin = () => {
    const [qrValue, setQrValue] = useState("");
    const [isPolling, setIsPolling] = useState(false); // To control the polling process
    const navigate = useNavigate();  // For redirecting after login success

    // Fetch the access token
    const { data: accessToken, error: tokenError, isLoading: tokenLoading } = useGetAccessTokenQuery();

    // Automatically create the proof request if accessToken is available
    const { data: proofData, error: proofError, isLoading: proofLoading } = useCreateProofRequestQuery(accessToken?.token, {
        skip: !accessToken,
    });

    // Fetch proof request using threadId after proof request is created
    const { data: proofRequestData, error: proofRequestError, isLoading: proofRequestLoading } = useGetProofByThreadIdQuery(
        proofData?.proofRequestThreadId,
        { skip: !proofData?.proofRequestThreadId }
    );

    // Webhook mutations    
    const [registerWebhook, { isSuccess: isRegisterSuccess, error: registerError }] = useRegisterWebhookMutation();
    const [subscribeWebhook, { isSuccess: isSubscribeSuccess, error: subscribeError }] = useSubscribeWebhookMutation();
    const [checklogin, { data: loginResponse, error: loginError }] = useCheckloginMutation();

    // Handling the login response and setting the cookie after login is successful
    useEffect(() => {
        // Check if the user is already logged in and verified by looking for the cookie and 'verified' key
        const userVerified = localStorage.getItem("verified");
        const userCookie = document.cookie.split(";").find(cookie => cookie.trim().startsWith("userID="));
    
        // If the user is verified and the cookie is set, stop polling and skip login handling
        if (userVerified && userCookie) {
            console.log("User is already logged in, stopping polling.");
            setIsPolling(false); // Stop polling
            return; // Skip further processing as user is already logged in
        }
    
        // If the login response is received
        if (loginResponse) {
            console.log("Login Response:", loginResponse);
            if (loginResponse?.message && loginResponse.message.includes("Login successful")) {
                const userId = loginResponse.message.split(": ")[1]; // Assuming format: "Login successful for user: userID"
    
                // Set the cookie with the user ID
                document.cookie = `userID=${userId}; path=/; max-age=3600`; // Cookie valid for 1 hour
    
                // Set the same "verified" key to indicate NDI login
                localStorage.setItem('verified', 'true'); // Use the same key as in the NavBar component
    
                // Redirect to the homepage
                navigate("/");
    
                // Stop polling once login is successful
                setIsPolling(false);
            }
        }
    }, [loginResponse, navigate]);
    

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
            setQrValue(proofData.proofRequestURL);
        }
    }, [proofData, proofError, proofLoading]);

    useEffect(() => {
        if (proofRequestData) {
            console.log("Fetched proof request data:", proofRequestData);

            // Register the webhook after fetching proof request
            registerWebhook()
                .unwrap()
                .then(() => {
                    console.log("Webhook registration successful.");

                    // Subscribe to the webhook after registration
                    subscribeWebhook()
                        .unwrap()
                        .then(() => {
                            console.log("Webhook subscription successful.");
                        })
                        .catch((err) => {
                            console.error("Failed to subscribe to webhook:", err);
                        });
                })
                .catch((err) => {
                    if (err?.data?.message?.includes("Duplicate webhookId or webhookURL")) {
                        console.warn("Webhook already exists. Skipping registration.");

                        // Directly subscribe to the existing webhook
                        subscribeWebhook()
                            .unwrap()
                            .then(() => {
                                console.log("Webhook subscription successful.");
                            })
                            .catch((err) => {
                                console.error("Failed to subscribe to webhook:", err);
                            });
                    } else {
                        console.error("Failed to register webhook:", err);
                    }
                });
        }

        if (proofRequestError) {
            console.error("Failed to fetch proof request by thread ID:", proofRequestError);
        }
    }, [proofRequestData, proofRequestError, registerWebhook, subscribeWebhook]);

    // Polling logic: repeatedly call the login mutation at intervals
    useEffect(() => {
        if (isPolling) {
            console.log("Polling started...");
            const intervalId = setInterval(() => {
                console.log("Checking login status...");
                checklogin(); // Call the checklogin mutation
            }, 5000); // Call every 5 seconds

            return () => clearInterval(intervalId); // Clear the interval when the component unmounts or polling stops
        }
    }, [isPolling, checklogin]);

    // Start polling when the component mounts or when webhook subscription succeeds
    useEffect(() => {
        if (proofRequestData && !isPolling) {
            console.log("Starting polling for login status...");
            setIsPolling(true); // Start polling for login status
        }
    }, [proofRequestData, isPolling]);

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
                        {qrValue ? (
                            <QRCodeCanvas
                                value={qrValue}
                                size={200}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="Q"
                                includeMargin={true}
                            />
                        ) : (
                            <p>Loading QR Code...</p>
                        )}
                    </div>
                </div>
            </div>
            <p className="copyright-login">&copy; 2024 Bhutan Legal Aid Center</p>
        </>
    );
};

export default NDILogin;
