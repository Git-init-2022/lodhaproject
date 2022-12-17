import axios from "axios";
import React, { useState, useEffect } from "react";
import { setSourceMapRange } from "typescript";
import './Profile.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import { useGlobalContext } from "/src/context/StateContext";
import Spinner from "/src/components/Spinner/Spinner"
// function Profile() {

//     const { User, setUser } = useGlobalContext();
//     const [visible, setVisible] = useState(false);
//     // useEffect(()=>{
//     //     const fetchUsers = async() => {
//     //         if(User !== null){
//     //             console.log(User);
//     //         console.log("Flat Number: ",JSON.parse(User).FlatNo);
//     //       const { data } = await axios.get("http://localhost:4000/api/v1/singleUser",{params:{FlatNo: JSON.parse(User).FlatNo}});
//     //       const user = data.user1;
//     //       const user1 = {
//     //         OwnerName: user[0].OwnerName,
//     //         RegisteredName: user[0].RegisteredName,
//     //         FlatNo: user[0].FlatNo,
//     //         Block: user[0].Block,
//     //         ParkingSlot: user[0].ParkingSlot,
//     //         Mobile: user[0].Mobile,
//     //         Dues: user[0].Dues,
//     //         Email: user[0].Email,
//     //         Role: user[0].Role
//     //       }
//     //       setUser(JSON.stringify(user1));
//     //       localStorage.setItem("User", User);
//     //       console.log("data: ", user1);
//     //       console.log("User :", User);
//     //     }
//     // }
//     //   if(User!==null){
//     //     fetchUsers();
//     //   }
//     // },[])
//     const update = async (e) => {
//         const FlatNo = e.target.FlatNo.value;
//         const ParkingSlot = e.target.ParkingSlot.value;
//         const Block = e.target.Block.value;
//         const Mobile = e.target.Mobile.value;
//         const Email = e.target.Email.value;
//         const OwnerName = e.target.OwnerName.value;
//         const RegisteredName = e.target.RegisteredName.value;

//         const { data } = await axios.put("http:localhost:4000/api/v1/userupdate", {
//             OwnerName: OwnerName,
//             RegisteredName: RegisteredName,
//             Email: Email,
//             Mobile: Mobile,
//             ParkingSlot: ParkingSlot,
//             FlatNo: FlatNo,
//             Block: Block
//         })
//         const user = data.user;
//         if (user !== [] && !user) {
//             navigate('/UserProfile');
//         }
//         else {
//             localStorage.getItem("User", JSON.stringify(user));
//             setUser(JSON.stringify(user));
//         }

//     }
//     const UpdateSubmit = (e) => {
//         e.preventDefault();
//         update(e);
//     };

//     return (
//         <>
//             <LoginNavBar />
//             <div>
//                 <form onSubmit={UpdateSubmit}>
//                     <div className="UserProfileDiv">
//                         <p id="userProfileTitle">USER PROFILE</p>
//                         <div style={{display:"flex", justifyContent:"space-between"}}>
//                             <div style={{ display: "flex", flexDirection:"column", width:"30%"}}>

//                                 <img src="/src/assests/user.svg" id="userProfileImg" ></img>
//                                 <button className="btn btn-primary uploadButton" onClick={() => setVisible(true)}>
//                                 <img src='/src/assests/camera.png' height="20px" width="20px" style={{marginRight:"10px"}}></img>
//                                 Upload
//                                 </button>
//                                 <form encType="multipart/form-data" >
//                                     <input type="file" className="btn btn-primary uploadButton"></input>    
//                                 </form>
//                             </div>


//                             <div style={{width:"70%"}}>
//                                 <div className="ProfileInput" style={{ marginTop: "40px" }}>
//                                     <p className="EditTitle">NAME</p>

//                                     <input placeholder={JSON.parse(User).OwnerName} name="OwnerName" className="EditInput"></input>

//                                 </div>
//                                 <div className="ProfileInput">
//                                     <p className="EditTitle">EMAIL ADDRESS</p>
//                                     <input placeholder={JSON.parse(User).Email} name="Email" className="EditInput"></input>

//                                 </div>
//                                 <div className="ProfileInput">
//                                     <p className="EditTitle">MOBILE NUMBER</p>

//                                     <input placeholder={JSON.parse(User).Mobile} name="Mobile" className="EditInput"></input>

//                                 </div>
//                                 <div className="ProfileInput">
//                                     <p className="EditTitle">BLOCK</p>

//                                     <input placeholder={JSON.parse(User).Block} name="Block" className="EditInput"></input>

//                                 </div>
//                                 <div className="ProfileInput">
//                                     <p className="EditTitle">FLAT NUMBER</p>
//                                     <input placeholder={JSON.parse(User).FlatNo} name="FlatNo" className="EditInput"></input>

//                                 </div>

//                                 <div className="ProfileInput" >
//                                     <p className="EditTitle">PROPERTY REGISTERED NAME</p>
//                                     <input placeholder={JSON.parse(User).RegisteredName} name="RegisteredName" className="EditInput"></input>

//                                 </div>

//                                 <div className="ProfileInput" >
//                                     <p className="EditTitle">PARKING SLOT</p>
//                                     <input placeholder={JSON.parse(User).ParkingSlot} name="ParkingSlot" className="EditInput"></input>

//                                 </div>
//                                 <div style={{ display: "flex", justifyContent: "center" }}>
//                                     <button className="UserProfileSubmit" type="submit">UPDATE</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </form>
//             </div>
//         </>
//     )
// }

// export default Profile;

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Web3Storage } from 'web3.storage';
export default function Profile() {
  const { User, setUser } = useGlobalContext();
  const [isVisible, setisVisible] = useState(true);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      if (User !== null) {
        console.log(User);
        console.log("Flat Number: ", JSON.parse(User).FlatNo);
        const { data } = await axios.get("http://localhost:4000/api/v1/singleUser", { params: { FlatNo: JSON.parse(User).FlatNo } });
        const user = data.user1;
        const user1 = {
          OwnerName: user[0].OwnerName,
          RegisteredName: user[0].RegisteredName,
          FlatNo: user[0].FlatNo,
          Block: user[0].Block,
          ParkingSlot: user[0].ParkingSlot,
          Mobile: user[0].Mobile,
          Dues: user[0].Dues,
          Email: user[0].Email,
          Role: user[0].Role,
          ImageName: user[0].ImageName,
          ImageToken: user[0].ImageToken
        }
        setUser(JSON.stringify(user1));
        localStorage.setItem("User", User);
        console.log("data: ", user1);
        console.log("User :", User);
      }
    }
    if (User !== null) {
      fetchUsers();
    }
  }, [])
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

  const change = () => {
    setisVisible(!isVisible);
  }

  const UpdateSubmit = (e) => {
    e.preventDefault();
    update(e);
  };

  const refreshPage = () => {
    window.location.reload();
  }

  const uploadPicOfUser = async () => {
    setLoading(true);
    const files = document.getElementsByName("profilePic").item(0).files;
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxOTdiN2M2OGFEMTNhNzREMGIzMGQ3OTI4OTNGMDc4MWQxZjE4M2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNjM1MTczNDIsIm5hbWUiOiJsb2RoYS1maWxlcyJ9.rmkUCge8MPPj5TC6i8Z5lVAjIevCSVni0gpu-_jUzlI" });
    const cid = await client.put(files);
    console.log(cid);
    const FileName = files[0].name;
    const { data } = await axios.post("http://localhost:4000/api/v1/updateProfile", { cid: cid, name: FileName, FlatNo: JSON.parse(User).FlatNo });
    setLoading(false);
    refreshPage();
  }

  const uploadPhoto = (e) => {
    e.preventDefault();
    const files = document.getElementsByName("profilePic").item(0).files;
    if (files.length > 0) {
      uploadPicOfUser();
    }

  };


  return (
    <>
      <LoginNavBar />
      <div style={{ backgroundColor: "#f4f5f7", height: "1000px" }}>
        <section >
          <p id="userProfileTitle">USER PROFILE</p>
          {
            Loading ?
              <div className="Profilediv">
                <Spinner />
              </div>
              :
              <MDBContainer className="h-100 Profilediv" >
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol lg="10" className="mb-4 mb-lg-0">
                    <MDBCard className="card" style={{ borderRadius: '.5rem' }}>
                      <MDBRow className="g-0">
                        <MDBCol md="4" className="gradient-custom text-center text-white profileLeftDiv"
                          style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto", }}>

                          <MDBCardImage className="my-5 profileImage" src={JSON.parse(User).ImageToken !== undefined ? "https://" + JSON.parse(User).ImageToken + ".ipfs.w3s.link/" + JSON.parse(User).ImageName : "/src/assests/user.svg"}
                            alt="Avatar" style={{ width: '150px', height: '150px' }} fluid />
                          <MDBTypography tag="h4" className="ProfileName">{JSON.parse(User).OwnerName}</MDBTypography>
                          <MDBTypography tag="h4" className="ProfileRole">{JSON.parse(User).Role}</MDBTypography>


                          {
                            isVisible ?
                              <button className="uploadButton" onClick={() => change()}>Change Picture</button>
                              :
                              <></>
                          }
                          {
                            !isVisible ?
                              <form>
                                <p className="BackButton" onClick={() => change()}>&larr; Back</p>
                                <input type="file" className="fileInput" name="profilePic" accept="image/*" >
                                </input>
                                <button className="uploadButton" type="submit" style={{ marginBottom: "15px" }} onClick={(e) => uploadPhoto(e)}>
                                  <img src="/src/assests/camera.png" height="20px" width="20px" style={{ marginRight: "10px" }}></img>Upload
                                </button>
                              </form>
                              :
                              <></>
                          }
                        </MDBCol>
                        <MDBCol md="8">
                          <MDBCardBody className="p-4">
                            <MDBTypography tag="h5" className="ProfileHeader">Details</MDBTypography>
                            <hr className="mt-0 mb-4" />
                            <MDBRow className="pt-1">
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Email</MDBTypography>
                                <MDBCardText className="text-muted">{JSON.parse(User).Email}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Phone</MDBTypography>
                                <MDBCardText className="text-muted">{JSON.parse(User).Mobile}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Block</MDBTypography>
                                <MDBCardText className="text-muted">{JSON.parse(User).Block}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Flat No.</MDBTypography>
                                <MDBCardText className="text-muted">{JSON.parse(User).FlatNo}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Property Registered Name</MDBTypography>
                                <MDBCardText className="text-muted">{JSON.parse(User).RegisteredName}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Parking slot</MDBTypography>
                                <MDBCardText className="text-muted">{JSON.parse(User).ParkingSlot}</MDBCardText>
                              </MDBCol>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button className="btn btn-primary editProfileButton">
                                  <img src="/src/assests/edit.png" height="15px" width="15px" style={{ marginRight: "10px" }}></img>
                                  Edit
                                </button>
                                <button className="btn btn-primary editProfileButton">
                                  <img src="/src/assests/update.png" height="15px" width="15px" style={{ marginRight: "10px" }}></img>
                                  Update
                                </button>
                              </div>
                            </MDBRow>

                          </MDBCardBody>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
          }
        </section>
      </div>
    </>
  );
}