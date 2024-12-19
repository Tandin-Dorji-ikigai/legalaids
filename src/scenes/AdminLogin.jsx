import React, { useState, useRef } from 'react'
import "./css/signup.css"
import { Link } from 'react-router-dom';
import Ndi from "../assets/ndi.jpeg"
import Logo from "../assets/logo.png"

function AdminLogin() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOtpChange = (index, e) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        console.log('Submitted OTP:', enteredOtp);
        // Submit formData and OTP to your backend or perform any necessary action
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
                        <p className='signup-title'>Login</p>
                        <div>
                            <label className='form-label'>
                                Citizenship ID *
                                <input
                                    className='form-input'
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleFormChange}
                                    placeholder='Enter Your CID'
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                               Password
                                <input
                                    className='form-input'
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleFormChange}
                                    placeholder='Password'
                                    required
                                />
                            </label>
                        </div>

                        <button type="submit" className='signup-btn'>Submit</button>

                    </form>
                </div>
            </div>
            <p className='copyright-login'>&copy; 2024 Bhutan Legal Aid Center</p>
        </>
    );
}

export default AdminLogin;
