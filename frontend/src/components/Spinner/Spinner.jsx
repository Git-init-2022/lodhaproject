import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from '@ant-design/icons';

function Spinner() {
    const antIcon = <LoadingOutlined style={{color:"gold", fontSize: 50 }} spin />;

    return (
        <>
        <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
        <Spin indicator={antIcon} />
        <p style={{textAlign:"center", fontSize:"20px", letterSpacing:"1px", margintop:"20px", marginLeft:"20px", marginBottom:"0px"}}>Loading</p>
        </div>
        </>
    );
}

export default Spinner;