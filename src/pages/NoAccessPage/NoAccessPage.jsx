import React from "react";
import "./NoAccessPage.css"
function NoAccessPage() {
    return (
        <>
        <div className="errorDiv">
        <div >
            <p style={{fontSize:"100px", margin:"0px", textAlign:"center", padding:"0px"}}>🚫</p>
            <p  style={{fontSize:"50px", margin:"0", textAlign:"center"}}>403 Error! Access Forbidden </p>
            <p style={{fontSize:"25px",textAlign:"center" }}>The Page you are searching for is forbidden</p>
        </div>
        </div>
        </>
    );
}

export default NoAccessPage;