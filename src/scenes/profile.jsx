import React, { useEffect, useState } from "react";
import "./css/profile.css";
import { useGetAllAdminQuery } from "../slices/adminSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useUpdateAdminMutation } from "../slices/adminSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/authApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import AdminSideNav from "../Admin/DashboardNav";
import BarCouncilSideNav from "../barCouncil/DashboardNav";
import EmployeeSideNav from "../Employee/DashboardNav";
import LawyerSideNav from "../Lawyer/LawyerDashboardNav";
import { useGetAllCouncilQuery } from "../slices/councilApiSlice";
import { useGetAllEmployeeQuery } from "../slices/employeeSlice";
import { useGetAllLawyerQuery } from "../slices/lawyerSlice";

const Profile = () => {
    const { data: admins, error } = useGetAllAdminQuery();
    const { data: councils } = useGetAllCouncilQuery();
    const { data: employees } = useGetAllEmployeeQuery();
    const { data: lawyers } = useGetAllLawyerQuery();
    const [updatePassword] = useUpdateAdminMutation()
    const { userInfo } = useSelector((state) => state.auth);
    const [user, setUser] = useState();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutCall] = useLogoutMutation();

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "Error!",
                text: "Error logging out",
                icon: "error",
                confirmButtonColor: "#1E306D",
                confirmButtonText: "OK",
            });
        } else if (admins && userInfo.user.authorities[0].authority === "Admin") {
            const adm = admins.find((user) => user.cid === userInfo.user.username);
            setUser(adm);   
        }else if (councils && userInfo.user.authorities[0].authority === "Bar Council") {
            const adm = councils.find((user) => user.cid === userInfo.user.username);
            setUser(adm);   
        }else if (employees && userInfo.user.authorities[0].authority === "Lawyer") {
            const adm = employees.find((user) => user.cid === userInfo.user.username);
            setUser(adm);   
        }else if (lawyers && userInfo.user.authorities[0].authority === "Employee") {
            const adm = lawyers.find((user) => user.cid === userInfo.user.username);
            setUser(adm);   
        }
    }, [error, admins, lawyers, councils, employees, userInfo]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== "" || newPassword !== "") {
            Swal.fire({
                title: "",
                text: "Are you sure you want to update your password?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#1E306D",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const id = user.id;
                        const res = await updatePassword({
                            id,
                            password,
                            newPassword
                        });
                        if (res.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Password Update Failed!",
                                text:
                                    res.error.data?.message ||
                                    "An error occurred during update. Please try again.",
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Password Update Successful!",
                                text: "Your password has been updated successfully! Please login again!",
                                showConfirmButton: false,
                                timer: 1500,
                            });

                            await logoutCall().unwrap();
                            dispatch(logout());
                            navigate("/login");
                        }
                    } catch (err) {
                        Swal.fire({
                            icon: "error",
                            title: "Password Update Failed!",
                            text:
                                err.data?.message ||
                                "An error occurred during password update. Please try again.",
                        });
                    }
                }
            })
        } else {
            Swal.fire({
                icon: "warning",
                title: "Invalid Input",
                text: "Please ensure all fields are filled correctly.",
            });
        }
    };
    const renderSideNav = () => {
        switch (user && userInfo.user.authorities[0].authority) {
            case "Admin":
                return <AdminSideNav />;
            case "Bar Council":
                return <BarCouncilSideNav />;
            case "Employee":
                return <EmployeeSideNav />;
            case "Lawyer":
                return <LawyerSideNav />;
            default:
                return null;
        }
    };
    return (
        <>
            <div className="profile-item-container">
                {renderSideNav()}
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
                                <h4>
                                    Username
                                </h4>
                                {user && <div className="profile-cid-no">
                                    {user.userName}
                                </div>}
                            </div>
                            <div className="profile-details">
                                <h4>
                                    CID
                                </h4>
                                {user && <div className="profile-cid-no">
                                    {user.cid}
                                </div>}
                            </div>
                        </div>
                        <div className="profile-details-container">
                            <div className="profile-details">
                                <h4>
                                    Phone Number
                                </h4>
                                {user && <div className="profile-user-name">
                                    {user.contactNo}
                                </div>}
                            </div>
                            <div className="profile-details">
                                <h4>
                                    Email
                                </h4>
                                {user && <div className="profile-cid-no">
                                    {user.email}
                                </div>}
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

                        <form className="profile-update-form">
                            <div className="profile-update-items">
                                <div className="profile-form-item">
                                    <label htmlFor="password">Current Password</label>
                                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="current password" className="profile-update-input-field" />
                                </div>
                                <div className="profile-form-item">
                                    <label htmlFor="password">New Password</label>
                                    <input value={newPassword} onChange={handleNewPasswordChange} type="password" placeholder="new password" className="profile-update-input-field" />

                                </div>
                            </div>
                            <div className="update-btn-container">
                                <button className="update-cancel-btn"> Cancel </button>
                                <button onClick={handleSubmit} className="update-confirm-btn">Save Changes</button>
                            </div>


                        </form>
                    </div>
                </div>


            </div>

        </>
    )
}


export default Profile;