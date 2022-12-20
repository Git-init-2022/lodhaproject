import React, {useState, useEffect} from "react";
import "./Emergency.css";
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'

function Emergency() {
  
  return (
    <>
    <LoginNavBar/>
    <div className="emergency">
      <div style={{ display: "flex", justifyContent:"center", marginTop: "90px"}}>
        <img src="/src/assests/emergency.png" style={{ height: "50px", width: "50px", marginTop : "20px", marginBottom: "50px"}}></img>
        <p id="title">EMERGENCY SERVICES</p>
      </div>
    {/* <div className="wrapper">

      <Card
        img="/src/assests/pool.svg"
        title="Swimming Pool"
        desc="hello" />

      <Card
        img="/src/assests/gym.svg"
        title="Gym"
        desc="hello" />

      <Card
        img="/src/assests/indoorgames.svg"
        title="Indoor Games"
        desc="hello" />

      <Card
        img="/src/assests/yoga.svg"
        title="Yoga"
        desc="hello" />

      <Card
        img="/src/assests/cafe.svg"
        title="Cafe"
        desc="hello" />

      <Card
        img="/src/assests/kidsplay.svg"
        title="Kids Play Room"
        desc="hello" />
    </div> */}
    </div>
    </>
  )
}

// function Card(props) {
//   return (
//     <div className="card" style={{ width: "300px", border: "none", marginTop: "50px", marginLeft: "20px",backgroundColor: "#f2d491"}} >
//       <div className="card_body" style={{ alignItems: "center", justifyContent: "center" }}>
//         <img src={props.img} class="card_image" style={{ width: "100px" }} /><hr></hr>
//         <h2 className="card_title" style={{fontSize: "24px", fontWeight: "bold", color: "#000", textTranform:"capitalize"}}>{props.title}</h2>
//         <p className="card_desc" style={{fontSize: "18px",fontWeight: "medium",color: "#36454F" }}>{props.desc}</p>
//       </div>

//     </div>
//   )
// }

export default Emergency;
