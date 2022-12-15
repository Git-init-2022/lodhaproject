import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
//import useGlobalContext from '/src/context/StateContext';
import NavBar from "/src/components/NavBar/NavBar";
import axios from "axios";
import { Alert } from "antd";

const ForgotPassword = () => {
  const { loading, setLoading } = useState(false);
  const [successful, setSuccessful] = useState(0);
  const forgot = async (email, flatnum) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/forgotpassword", { params: { FlatNo: flatnum, Email: email } });
    if (data.success === true) {
      setSuccessful(2);
    }
    else {
      setSuccessful(1);
    }
  }
  const forgotPasswordSubmit = (e) => {
    setLoading(false);
    const email = e.target.Email.value;
    const flatnum = e.target.FlatNo.value;
    forgot(email, flatnum);
    e.target.Email.value = "";
    e.target.FlatNo.value = "";
  };



  return (
    <Fragment>
      {loading ?
        <Loader />
        :
        <Fragment>
          <NavBar />
          <MetaData title="Forgot Password" />
          {
            successful > 0 ? successful == 1 ? <Alert
              description="Invalid Credentials! Better luck next time."
              type="error"
              showIcon
              closable
              message="Error"
              style={{ marginBottom: "20px", marginTop: "20px", width: "60%", letterSpacing: "2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft: "20%" }}
            /> :
              <Alert message="Success" type="success" description="Mail Sent Successfully, Please check your mail to reset password." showIcon closable style={{ marginBottom: "20px", marginTop: "20px", width: "60%", letterSpacing: "2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft: "20%" }} /> : <></>
          }
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <div style={{ display: "flex", marginTop: "20px", justifyContent: "center" }}>
                <img src="/src/assests/forgotPassword.png" height="25px" width="25px" style={{ marginTop: "5px", marginRight: "10px" }}></img>
                <h2 className="forgotPasswordHeading">Forgot Password</h2>
              </div>
              <hr style={{ width: "90%", height: "2px", backgroundColor: "black", color: "black", marginLeft: "5%" }}></hr>
              <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit} >
                <div className="forgotPasswordEmail">
                  <div>
                    <label className="ForgotPasswordLabel">Email</label><br></br>
                    <input
                      type="email"
                      placeholder="Enter your Email Address"
                      required
                      name="Email"
                      className="ForgotPasswordInput"
                    />
                  </div>
                  <div>
                    <label className="ForgotPasswordLabel">Flat Number</label><br></br>
                    <input
                      type="text"
                      placeholder="Flat Number"
                      required
                      name="FlatNo"
                      className="ForgotPasswordInput"
                    />
                  </div>
                </div>
                <button type="submit" className="forgotPasswordButton">Reset Password</button>
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default ForgotPassword;