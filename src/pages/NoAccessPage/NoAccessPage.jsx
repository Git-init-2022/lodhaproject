import React from "react";
import "./NoAccessPage.css"
function NoAccessPage({Status, ErrorTitle, Type}) {
    return (
        <>
        <div className="errorDiv">
        <div >
            <p style={{fontSize:"100px", margin:"0px", textAlign:"center", padding:"0px"}}>🚫</p>
            <p  style={{fontSize:"50px", margin:"0", textAlign:"center"}}>{Status} Error! {ErrorTitle} </p>
            <p style={{fontSize:"25px",textAlign:"center" }}>The Page you are searching for is {Type}. Please click to redirect to <a href="/">Home &rarr;</a></p>
        </div>
        </div>
        </>
    );
}

export default NoAccessPage;