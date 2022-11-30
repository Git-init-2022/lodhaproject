import React, { useState, useEffect } from "react";
import './Notifications.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useGlobalContext } from '/src/context/StateContext';


function Notifications() {
  const [modalShow, setModalShow] = useState(false);
  const [Notification, setNotification] = useState([]);
  const [titleVar, setTitleVar] = useState('');
  const [DescVar, setDescVar] = useState('');
  const [LinkVar, setLinkVar] = useState('');
  const [HostVar, setHostVar] = useState('');
  const [DateVar, setDateVar] = useState('');
  const [TimeVar, setTimeVar] = useState('');
  const [idvalue, setidvalue] = useState('');

  const { User } = useGlobalContext();
  const [isAdmin, setisAdmin] = useState(JSON.parse(User).Role === 'admin');
  const fetchMeetings = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/AllMeetings");
    setNotification(data.meetings);
  }
  useEffect(() => {
    fetchMeetings();
  }, [Notification.length]);
  const handleHide = () => {
    setDescVar('');
    setTitleVar('');
    setLinkVar('');
    setDateVar('');
    setTimeVar('');
    setHostVar('');
    setModalShow(false);
    setidvalue('');
  }
  const handleShow = (Title, Description, Link, Host, Date, Time, _id) => {
    setModalShow(true);
    setTitleVar(Title);
    setDescVar(Description);
    setDateVar(Date);
    setTimeVar(Time);
    setHostVar(Host);
    setLinkVar(Link);
    setidvalue(_id);
  }
  const getFormattedTime = (DateOfMeeting) => {
    
    let timeStamp = Date.parse(DateOfMeeting);
    var date = new Date(timeStamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var dateVal = date.getDate();
    var formattedDate = dateVal + 'th ' + month + ', ' + year;
    return formattedDate;
  }

  const getFormattedTime1 = (DateOfMeeting) => {
    
  
    let timeStamp = Date.parse(DateOfMeeting);
    var date = new Date(timeStamp);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day ; 
   
    return today;
  }



  const refreshPage = () => {
    window.location.reload();
  }

  const DeleteMeetingFromDb = async (_id) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/deletemeeting", { params: { _id: _id } });
    refreshPage();
  }

  const DeleteMeeting = (e, _id) => {
    e.preventDefault();
    DeleteMeetingFromDb(_id);
  }

  const UpdateMeetingInDb = async (Link, Title, Description,Date, Time, Host, _id) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/updatemeeting", { params: { _id: _id, Title: Title, Description: Description, Link: Link, Date: Date,Time: Time, Host: Host } });
    refreshPage();
  }

  const UpdateMeeting = (e, _id) => {
    e.preventDefault();
    if (isAdmin === true) {
      const Link = document.getElementById('linkOfMeeting').innerText;
      const Title = document.getElementById('title').innerText;
      const Description = document.getElementById('Description').innerText;
      const Time = document.getElementById('TimeofMeeting').value;
      const Date = document.getElementById('DateofMeeting').value;
       const Host = document.getElementById('host').innerText;
      UpdateMeetingInDb(Link, Title, Description,Date, Time,Host, _id);
    }
  }

  return (
    <>

      <LoginNavBar />
      <div className="MeetingItems" style={{ marginTop: "50px" }}>


        <p className='MeetingHeader' >UPCOMING MEETINGS</p>
        {
          isAdmin ? <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>Note - To Edit details click on meeting</p> : <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>To view details click on the meeting</p>
        }
        <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
        {

          Notification.map((item) => {
            return (
              <>
                <div>
                  <Button variant="primary" onClick={() => handleShow(item.Title, item.Description, item.Link, item.Host, item.Date, item.Time, item._id)} className="NotifyBar">
                    <div className="ModalNotify">
                      <span className='Date'>
                        <p style={{ textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationThickness: "2px" }}>MEETING TITLE</p>
                        <p>{item.Title}</p>
                      </span>
                      <span className='Date'>
                        {getFormattedTime(item.Date)}<br></br>
                        {item.Time}
                      </span>
                      </div>
                  </Button>

                </div>
                <hr style={{ width: "94%", marginLeft: "3%" }}></hr>
              </>
            );
          })
        }
        {
          isAdmin ?
         
            <Modal
              show={modalShow}
              onHide={handleHide}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <form
              onSubmit={UpdateMeeting}
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    <span id="title" className="inputEditable" style={{ fontSize: "20px", letterSpacing: "1px", fontWeight: "normal" }} contentEditable>
                      {titleVar}
                    </span>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textDecorationColor: "gold", textDecorationThickness: "2px", textUnderlineOffset: "5px", marginTop: "10px" }}>Description </label>
                    <div id="Description" className="inputEditable" style={{ fontSize: "16px" }} contentEditable>
                      {DescVar}
                    </div>

                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textDecorationColor: "gold", textDecorationThickness: "2px", textUnderlineOffset: "5px", marginTop: "10px" }}>Host </label>
                    <div id="host" className="inputEditable" style={{ fontSize: "16px" }} contentEditable>
                      {HostVar}
                    </div>

                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textDecorationColor: "gold", textDecorationThickness: "2px", textUnderlineOffset: "5px", marginTop: "20px" }}>Link </label>
                        <div>
                          <a id="linkOfMeeting" href={LinkVar} target="_blank" style={{ textDecorationLine: "underline", fontSize: "16px" }} contentEditable>{LinkVar}</a>
                        </div>

                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textUnderlineOffset: "5px", marginTop: "10px", textDecorationThickness: "2px", textDecorationColor: "gold" }}>Date </label>
                        <div> <br></br><input name="Date" id="DateofMeeting" type="Date" defaultValue={getFormattedTime1(DateVar)} className="inputEditable" ></input><br></br></div>
                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textUnderlineOffset: "5px", marginTop: "10px", textDecorationThickness: "2px", textDecorationColor: "gold" }}>Time </label>
                        <div> <br></br><input name="Time" id="TimeofMeeting" className="inputEditable" type="Time" defaultValue={TimeVar} ></input><br></br></div>

                  </div>
                </Modal.Body>
                <Modal.Footer>

                  <div >
                    <div style={{ textAlign: "left" }}>
                      <ul style={{ textAlign: "left" }}>
                        <li>Click on the fields to edit Details</li>
                        <li>To Edit Meeting details click on "Edit Meeting" button</li>
                        <li>To Delete Meeting details click on "Delete Meeting" button</li>
                      </ul>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", }}>
                      <button className="btn btn-primary " type="submit" onClick={(e) => UpdateMeeting(e, idvalue)}>Edit Meeting</button>
                      <button className="btn btn-danger" type="submit" style={{ marginLeft: "50px" }} onClick={(e) => DeleteMeeting(e, idvalue)}>Delete Meeting</button>
                    </div>
                  </div>

                </Modal.Footer>
              </form>
            </Modal>
            :
           
            <Modal
              show={modalShow}
              onHide={handleHide}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      <span id="titleOfForm" style={{ fontSize: "20px", letterSpacing: "1px", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "gold !important", fontWeight: "normal" }}>
                        {titleVar}
                      </span>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textDecorationColor: "gold", textDecorationThickness: "2px", textUnderlineOffset: "5px", marginTop: "10px" }}>Description </label>
                        <div id="DescriptionOfForm" style={{ fontSize: "16px" }} >
                          {DescVar}
                        </div>
                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textDecorationColor: "gold", textDecorationThickness: "2px", textUnderlineOffset: "5px", marginTop: "10px" }}>Host </label>
                        <div id="hostOfMeeting" style={{ fontSize: "16px" }} >
                          {HostVar}
                        </div>
                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textDecorationColor: "gold", textDecorationThickness: "2px", textUnderlineOffset: "5px", marginTop: "20px" }}>Link </label>
                        <div>
                          <a id="linkOfMeeting" href={LinkVar} target="_blank" style={{ textDecorationLine: "underline", fontSize: "16px" }} >Click to open Link</a>
                        </div>
                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textUnderlineOffset: "5px", marginTop: "10px", textDecorationThickness: "2px", textDecorationColor: "gold" }}>Date </label>
                        <div id="Date" name="Date" style={{ fontSize: "16px" }} >
                          {getFormattedTime(DateVar)}
                        </div>
                    <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textUnderlineOffset: "5px", marginTop: "10px", textDecorationThickness: "2px", textDecorationColor: "gold" }}>Time </label>

                        <div id="time" style={{ fontSize: "16px" }} >
                          {TimeVar}
                        </div>
                  </div>
                </Modal.Body>
            </Modal>
            
        }
      </div>
    </>
  )
}


export default Notifications;