import React, {useState, useEffect} from "react";
import Nav from 'react-bootstrap/Nav';
import "./FacilityManagement.css"
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'

function FacilityManagement() {


    return (
        <>
        <LoginNavBar/>
        <div>
        <p id="title1">FACILITY MANAGEMENT</p>
        <div style={{ marginLeft: "55px", height: "3px", width: "250px", backgroundColor: "gold" }}></div>
        <div className="FacilityNavBar" style={{backgroundColor:"rgb(36, 35, 35)"}}>
        
            <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link className = "FacilityLink" href="/home">Survey</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link className = "FacilityLink" eventKey="/Cultural">Meeting</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  className = "FacilityLink" eventKey="/Meetings">Cultural</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
        <div className="FacilityNavBar" style={{marginTop:"30px"}}>
          <p style={{padding : "20px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut cupiditate repellat beatae? Dolore blanditiis perspiciatis porro enim voluptatem nobis, optio recusandae facere, ab iusto voluptas ullam error et! Perspiciatis architecto, natus obcaecati minima quasi tempora dignissimos consequuntur ratione. Aspernatur a ad quo sequi quaerat possimus maiores doloremque ducimus harum quas dolore ea distinctio, placeat magnam est temporibus nulla inventore, officia voluptas vel sunt eligendi cum voluptatum. Quod ab porro sit laborum consectetur minima vel, fugit dolorem animi! Nesciunt quam error culpa ea accusantium reiciendis corrupti eligendi earum consequatur. Pariatur, voluptas, obcaecati impedit placeat deleniti tempora autem assumenda quos suscipit fugit facilis quibusdam aliquam nihil vero ducimus vel sunt odit. Eos nam consequuntur ducimus, numquam excepturi quibusdam voluptate nemo esse libero quae quo a voluptatum vero iste nostrum eum dolore. Perspiciatis recusandae sequi culpa cupiditate dolor magnam saepe neque possimus debitis nobis quia soluta, repudiandae vitae, rerum inventore! Suscipit fugiat quam, optio explicabo accusamus animi natus necessitatibus libero, pariatur excepturi porro voluptate repudiandae qui cupiditate dolores minima dignissimos inventore corrupti ipsum sapiente, soluta eius sed perferendis! Asperiores, labore! Perferendis, eveniet blanditiis. Dolores maiores possimus sit corrupti quaerat iste quas quos aut ea suscipit quidem, doloremque reiciendis quibusdam illo aspernatur temporibus repellat sint iure soluta assumenda rerum dolor! Saepe itaque repellat minima dignissimos provident nihil nobis blanditiis suscipit tempore? Reiciendis pariatur obcaecati nobis ea suscipit amet tempore, illum voluptatibus vero fuga quos, corporis praesentium dolores quibusdam natus veniam quasi unde dolorum, quo perspiciatis. Iusto labore veniam facilis obcaecati impedit delectus officia, eius harum earum, minus explicabo quod voluptatibus vero sed deserunt nostrum magnam accusamus perferendis voluptatem voluptas ea dolores rerum! Fugit tenetur earum porro eaque vero impedit illum eius dignissimos facere, aspernatur quaerat praesentium quam ab perspiciatis sunt fuga voluptatum. Facilis animi atque quaerat quibusdam quod veritatis placeat pariatur, itaque repellat corporis. </p>
        </div>
        </div>
        </>
    );
}

export default FacilityManagement;