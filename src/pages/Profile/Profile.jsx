import axios from "axios";
import React, { useState, useEffect } from "react";
import { setSourceMapRange } from "typescript";
import './Profile.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import { useGlobalContext } from "/src/context/StateContext";

function Profile() {

    const { User, setUser } = useGlobalContext();
    const [visible, setVisible] = useState(false);
    // useEffect(()=>{
    //     const fetchUsers = async() => {
    //         if(User !== null){
    //             console.log(User);
    //         console.log("Flat Number: ",JSON.parse(User).FlatNo);
    //       const { data } = await axios.get("http://localhost:4000/api/v1/singleUser",{params:{FlatNo: JSON.parse(User).FlatNo}});
    //       const user = data.user1;
    //       const user1 = {
    //         OwnerName: user[0].OwnerName,
    //         RegisteredName: user[0].RegisteredName,
    //         FlatNo: user[0].FlatNo,
    //         Block: user[0].Block,
    //         ParkingSlot: user[0].ParkingSlot,
    //         Mobile: user[0].Mobile,
    //         Dues: user[0].Dues,
    //         Email: user[0].Email,
    //         Role: user[0].Role
    //       }
    //       setUser(JSON.stringify(user1));
    //       localStorage.setItem("User", User);
    //       console.log("data: ", user1);
    //       console.log("User :", User);
    //     }
    // }
    //   if(User!==null){
    //     fetchUsers();
    //   }
    // },[])
    const update = async (e) => {
        const FlatNo = e.target.FlatNo.value;
        const ParkingSlot = e.target.ParkingSlot.value;
        const Block = e.target.Block.value;
        const Mobile = e.target.Mobile.value;
        const Email = e.target.Email.value;
        const OwnerName = e.target.OwnerName.value;
        const RegisteredName = e.target.RegisteredName.value;

        const { data } = await axios.put("http:localhost:4000/api/v1/userupdate", {
            OwnerName: OwnerName,
            RegisteredName: RegisteredName,
            Email: Email,
            Mobile: Mobile,
            ParkingSlot: ParkingSlot,
            FlatNo: FlatNo,
            Block: Block
        })
        const user = data.user;
        if (user !== [] && !user) {
            navigate('/UserProfile');
        }
        else {
            localStorage.getItem("User", JSON.stringify(user));
            setUser(JSON.stringify(user));
        }

    }
    const UpdateSubmit = (e) => {
        e.preventDefault();
        update(e);
    };

    return (
        <>
            <LoginNavBar />
            <div>
                <form onSubmit={UpdateSubmit}>
                    <div className="UserProfileDiv">
                        <p id="userProfileTitle">USER PROFILE</p>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div style={{ display: "flex", flexDirection:"column", width:"30%"}}>

                                <img src="/src/assests/user.svg" id="userProfileImg" ></img>
                                <button className="btn btn-primary uploadButton" onClick={() => setVisible(true)}>
                                <img src='/src/assests/camera.png' height="20px" width="20px" style={{marginRight:"10px"}}>
                                </img>Upload
                                </button>

                                <form encType="multipart/form-data" >
                                    <input type="file"></input>
                                    <button></button>
                                    
                                </form>
                            </div>

                            
                            <div style={{width:"70%"}}>
                                <div className="ProfileInput" style={{ marginTop: "40px" }}>
                                    <p className="EditTitle">NAME</p>

                                    <input placeholder={JSON.parse(User).OwnerName} name="OwnerName" className="EditInput"></input>

                                </div>
                                <div className="ProfileInput">
                                    <p className="EditTitle">EMAIL ADDRESS</p>
                                    <input placeholder={JSON.parse(User).Email} name="Email" className="EditInput"></input>

                                </div>
                                <div className="ProfileInput">
                                    <p className="EditTitle">MOBILE NUMBER</p>

                                    <input placeholder={JSON.parse(User).Mobile} name="Mobile" className="EditInput"></input>

                                </div>
                                <div className="ProfileInput">
                                    <p className="EditTitle">BLOCK</p>

                                    <input placeholder={JSON.parse(User).Block} name="Block" className="EditInput"></input>

                                </div>
                                <div className="ProfileInput">
                                    <p className="EditTitle">FLAT NUMBER</p>
                                    <input placeholder={JSON.parse(User).FlatNo} name="FlatNo" className="EditInput"></input>

                                </div>

                                <div className="ProfileInput" >
                                    <p className="EditTitle">PROPERTY REGISTERED NAME</p>
                                    <input placeholder={JSON.parse(User).RegisteredName} name="RegisteredName" className="EditInput"></input>

                                </div>

                                <div className="ProfileInput" >
                                    <p className="EditTitle">PARKING SLOT</p>
                                    <input placeholder={JSON.parse(User).ParkingSlot} name="ParkingSlot" className="EditInput"></input>

                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <button className="UserProfileSubmit" type="submit">UPDATE</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Profile;