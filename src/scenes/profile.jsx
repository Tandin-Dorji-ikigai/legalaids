import React from "react";
import "./css/profile.css";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
function Profile() {
    return (
        <>
            <NavBar currentPage="profile" />

            <div className="profile-container">

                <h2>
                    General Information
                </h2>
                <div>
                    <div className="profile-sm-header">
                        This is Your Information
                    </div>
                </div>
                <div className="profile-line-sm">

                </div>
                <div>
                    <div className="profile-details-container">
                        <div className="profile-details">
                            <h4 >
                                Username
                            </h4>
                            <div className="profile-user-name">
                                Tandin Dorji
                            </div>
                        </div>
                        <div className="profile-details">
                            <h4>
                                Cid
                            </h4>
                            <div className="profile-cid-no">
                                12312314
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-container">
                        <div className="profile-details">
                            <h4>
                                Phone Number
                            </h4>
                            <div className="profile-user-name">
                                1234433
                            </div>
                        </div>
                        <div className="profile-details">
                            <h4>
                                DOB
                            </h4>
                            <div className="profile-cid-no">
                                23/23/3003
                            </div>
                        </div>
                    </div>
                </div>

                <div className="password-change-container">
                    <h2>
                        Update Password
                    </h2>
                    <div>
                        <div className="profile-sm-header">
                            Old Password is required to change the password
                        </div>
                    </div>
                    <div className="profile-line-sm">
                    </div>

                    <form action="" className="profile-update-form">
                        <div className="profile-update-items">
                            <div className="profile-form-item">
                                <label htmlFor="password">Current Password</label>
                                <input type="password" placeholder="password" className="profile-update-input-field" />
                            </div>
                            <div className="profile-form-item">
                                <label htmlFor="password">New Password</label>
                                <input type="password" placeholder="password" className="profile-update-input-field" />

                            </div>
                        </div>
                        <div className="update-btn-container">
                            <button className="update-cancel-btn"> Cancel </button>
                            <button className="update-confirm-btn">Save Changes</button>
                        </div>


                    </form>
                </div>
            </div>


            <Footer currentPage="footer" />
        </>
    )
}


export default Profile;