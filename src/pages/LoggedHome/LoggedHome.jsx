import React, {useState, useEffect} from "react";
import './LoggedHome.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
import Location from '/src/components/Location/Location';
import Contact from '/src/components/ContactUs/Contact';
import Carousels from '/src/components/Carousel/Carousel';
import Facilities from '/src/components/Facilities/facilities';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'

function LoggedHome() {

  return (
    <>
    <LoginNavBar/>
      <div style={{ marginTop: "60px", width: "100%" }}>
        <video width="100%" autoplay="" muted loop playsinline>
          <source src="src/assests/home.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div className="container cunt-bg-whight p-5">

        <div className="section-title " style={{ clear: "both", textAlign: "left" }}>
          <h1 className="mb-0 py-4">Building a Better Life</h1>
        </div>

        <div className="row  d-flex align-items-stretch">
          <div className="col-lg-6 faq-item content-home aos-init aos-animate" data-aos="fade-in" data-aos-duration="2000" data-aos-easing="ease-in-quad">
            <p>
              We believe real estate is more than just building the proverbial four walls, it's about "Building a Better Life". This is the ideology with                 which we at Lodha have delivered the world's finest developments that have become some of the most iconic addresses and the most desirable                  residences in India as well as in London.
            </p>
          </div>

          <div className="col-lg-6 faq-item content-home aos-init aos-animate" data-aos="fade-in" data-aos-duration="2000" data-aos-easing="ease-in-quad">
            <p>
              Our residential and commercial spaces are aimed at every segment, right from super luxury to budget, thereby enabling every aspiring
              consumer to fulfil their dream.
            </p>
          </div>
        </div>
        <div className="col-lg-12 faq-item aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
          <p>&nbsp;</p>
        </div>
      </div>
      <div className="mb-3 container" >
        <Carousels />
      </div>
      <div style={{width: "100%", backgroundColor:"#675A0E", height:"2px", marginTop:"50px"}}></div>

      <div className='locationtitle'>
        <img src="src/assests/apartment.svg" id="facilities"></img>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <p id='our1'>OUR</p>
          <p id='facility' >FACILITIES</p>
        </div>
      </div>
      <div className="container">
        <Facilities />
      </div>
      <div style={{width: "100%", backgroundColor:"#675A0E", height:"2px", marginTop:"50px"}}></div>
      <div className='locationtitle'>
        <img src="src/assests/homemap.svg" id="locationicon"></img>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <p id='our'>OUR</p>
          <p id='location' >LOCATION</p>
        </div>

      </div>
      <Location />
      {/* <Contact /> */}
      <div style={{height:"100px"}}>

      </div>
    </>
  );
}

export default LoggedHome;