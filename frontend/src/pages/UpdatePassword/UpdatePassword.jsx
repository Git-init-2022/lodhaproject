import React, { Fragment, useState, useEffect,  } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { useGlobalContext } from "/src/context/StateContext";
import NavBar from "/src/components/NavBar/NavBar";
import axios from "axios";

import {useNavigate ,useParams } from "react-router-dom";

const UpdatePassword = ({match}) => {
    const {token} =   useParams();
    const navigate = useNavigate();
    const Update = async (Password) => {
        alert("hello");
        const { data } = await axios.get("http://localhost:4000/api/v1/updatepassword/", { params: {token: token , Password: Password}});
        localStorage.setItem("data", JSON.stringify(data));
        if(data.success === true){
            navigate('/login');
        }
    }
    const UpdatePasswordSubmit = (e) => {
        const Password = e.target.Password.value;
        const confirmPassword = e.target.ReEnterPassword.value;

        if (Password.length>0 && (Password === confirmPassword) ) {
            Update(Password);
        }
        else {
            alert("password didnt match");
        }
    };


    return (
                <Fragment>
                    <NavBar />
                    <MetaData title="Forgot Password" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <div style={{ display: "flex", marginTop: "20px", justifyContent: "center" }}>
                                <img src="/src/assests/passwordReset.png" height="25px" width="25px" style={{ marginTop: "5px", marginRight: "10px" }}></img>
                                <h2 className="forgotPasswordHeading">Update Password</h2>
                            </div>
                            <form className="forgotPasswordForm" method='put' onSubmit={UpdatePasswordSubmit}>
                                <div className="forgotPasswordEmail">
                                    <div>
                                        <label className="ForgotPasswordLabel">New Password</label><br></br>
                                        <input
                                            type="password"
                                            placeholder="Enter your New Password"
                                            required
                                            name="Password"
                                            className="ForgotPasswordInput"
                                        />
                                    </div>
                                    <div>
                                        <label className="ForgotPasswordLabel">Confirm New Password</label><br></br>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            name="ReEnterPassword"
                                            className="ForgotPasswordInput"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="forgotPasswordButton">Update Password</button>
                            </form>
                        </div>
                    </div>
                </Fragment>
    );
};

export default UpdatePassword;