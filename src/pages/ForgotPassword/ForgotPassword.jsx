import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {useGlobalContext} from "/src/context/StateContext";
import NavBar from "/src/components/NavBar/NavBar";

const ForgotPassword = () => {

  const {loading, setLoading} = useGlobalContext();

  const forgot = async(email,flatnum)=>{
    const {data}= await axios.get("http://localhost:4000/api/v1/forgotpassword");
    if(data.success === true){

    }
    else{
        
    }
  }
  const forgotPasswordSubmit = (e) => {
    const email = e.target.Email.value;
    const flatnum = e.target.FlatNo.value;
    forgot(email,flatnum);
  };

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <NavBar/>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <div style={{display:"flex", justifyContent:"center"}}>
              <img src="/src/assests/forgotPassword.png" height="25px" width="25px" style={{marginTop:"5px", marginRight:"10px"}}></img>
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              </div>
              <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit} >
                <div className="forgotPasswordEmail">
                  <div>
                  <label className="ForgotPasswordLabel">EMAIL</label><br></br>
                  <input
                    type="email"
                    placeholder="Enter your Email Address"
                    required
                    name="Email"
                    className="ForgotPasswordInput"
                  />
                  </div>
                  <div>
                  <label className="ForgotPasswordLabel">FLAT NUMBER</label><br></br>
                  <input
                    type="text"
                    placeholder="Flat Number"
                    required
                    name="FlatNo"
                    className="ForgotPasswordInput"
                  />
                  </div>
                </div>
                <button type="submit" className="forgotPasswordButton">Update Password</button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;