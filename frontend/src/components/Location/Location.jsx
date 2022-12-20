import React from 'react'
import './Location.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';


function Location() {
  return (
    <div id="margins">
      <MDBCard className="m-5" id="shado">
        <MDBCardBody >
          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1902.8472472014964!2d78.39152285793962!3d17.474330505437763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9183825c2c37%3A0x50a98045b673866b!2sLODHA%20MERIDIAN%2C%20Kukatpally%20Housing%20Board%20Colony%2C%20Kukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1666666447914!5m2!1sen!2sin" width="100%" height="500" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default Location;
