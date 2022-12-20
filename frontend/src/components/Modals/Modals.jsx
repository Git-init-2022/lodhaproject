import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import './Modals.css';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}

      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.Heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Sender :  {props.Sender}</h4>
        <p>
          Description : {props.Description}
        </p>
        <p>
          Link : <a href={props.Link} target="_blank">Link</a>
        </p>
        <p> Date : {props.DateOfPosting}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Modals({ props }) {
  const [modalShow, setModalShow] = React.useState(false);
  let timeStamp = Date.parse(props.DateOfPosting);
  var date = new Date(timeStamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var dateVal = date.getDate();
  var time = "00 : 00";

  var formattedDate = dateVal + '-' + (date.getMonth() + 1) + '-' + year;
  return (
    <>
      <div>
        <Button variant="primary" onClick={() => setModalShow(true)} className="NotifyBar">
          <div className="ModalNotify">
            <span className = 'Date'>
              {props.Heading}
            </span>
            <span className = 'Date'>
              {formattedDate + "      | " + time}

            </span>
          </div>
        </Button>

      </div>
      <hr style = {{width: "94%",marginLeft : "3%"}}></hr>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        Description={props.Description}
        Sender={props.Sender}
        Heading={props.Heading}
        Link={props.Link}
        DateOfPosting={props.DateOfPosting}
      />
    </>
  );
}

export default Modals;