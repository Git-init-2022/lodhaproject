import React, { useState, useEffect } from "react";
import './Notifications.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { Radio, Space, Tabs } from 'antd';
import { useGlobalContext } from '/src/context/StateContext';
import { getTwoToneColor } from "@ant-design/icons";


function Notifications() {
  const [modalShow, setModalShow] = useState(false);
  const [Notification, setNotification] = useState([]);
  const [upcoming, setUpcoming] = useState(true);
  const [FinishedMeetings, setFinishedMeetings] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  const [titleVar, setTitleVar] = useState('');
  const [DescVar, setDescVar] = useState('');
  const [LinkVar, setLinkVar] = useState('');
  const [HostVar, setHostVar] = useState('');
  const [DateVar, setDateVar] = useState('');
  const [TimeVar, setTimeVar] = useState('');
  const [idvalue, setidvalue] = useState('');
  const [finished, setFinished] = useState(false);
  let colorArray = ['rgb(106, 101, 73)', '#b8860b', '#a28557', 'rgb(181, 173, 127)', '#675A0E'];
  const { User } = useGlobalContext();
  const [isAdmin, setisAdmin] = useState(JSON.parse(User).Role === '440f3041c89adee0f2ad780704bcc0efae1bdb30f8d77dc455a2f6c823b87ca0');
  const fetchMeetings = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/AllMeetings");
    const temp1 = [], temp2 = [];
    for (let meeting of data.meetings) {
      if (CompareDate(meeting.Date, meeting.Time)) {
        temp1.push(meeting);
      }
      else {
        temp2.push(meeting);
      }
    }
    console.log(temp1, temp2);
    setFinishedMeetings(temp2);
    setUpcomingMeetings(temp1);
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
    dateVal = dateVal.toString();
    if (dateVal.length == 1) {
      dateVal = "0" + dateVal;
    }
    return dateVal;
  }

  const getFormattedTime1 = (DateOfMeeting) => {


    let timeStamp = Date.parse(DateOfMeeting);
    var date = new Date(timeStamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return months[month] + " " + year;
  }


  const getFormattedTime2 = (DateOfMeeting) => {


    let timeStamp = Date.parse(DateOfMeeting);
    var date = new Date(timeStamp);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return day + "-" + (month) + "-" + year;
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

  const UpdateMeetingInDb = async (Link, Title, Description, Date, Time, Host, _id) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/updatemeeting", { params: { _id: _id, Title: Title, Description: Description, Link: Link, Date: Date, Time: Time, Host: Host } });
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
      UpdateMeetingInDb(Link, Title, Description, Date, Time, Host, _id);
    }
  }

  const changeMenu = (e, tab) => {
    const getFinished = document.getElementById("finished");
    const getUpcoming = document.getElementById("upcoming");
    if (tab === "upcoming") {
      setUpcoming(true);
      getUpcoming.style.border = "5px solid #675a0e";
      getUpcoming.style.backgroundColor = "rgb(220, 219, 216)";
      getFinished.style.border = "none";
      getFinished.style.backgroundColor = "whitesmoke";
    }
    else {
      getFinished.style.border = "5px solid #675a0e";
      getFinished.style.backgroundColor = "rgb(220, 219, 216)";
      getUpcoming.style.border = "none";
      getUpcoming.style.backgroundColor = "whitesmoke";
      setUpcoming(false);
    }
  }

  const CompareDate = (DateOfMeeting, TimeofMeeting) => {
    let timeStamp = Date.parse(DateOfMeeting);
    var date = new Date(timeStamp);
    date.setHours((TimeofMeeting[0] - '0') * 10 + (TimeofMeeting[1] - '0'));
    date.setMinutes((TimeofMeeting[3] - '0') * 10 + (TimeofMeeting[4] - '0'));
    if (date >= Date.now()) {
      return true;
    }
    else {
      return false;
    }
  }

  const getColor = (index, DateOfMeeting) => {
    let timeStamp = Date.parse(DateOfMeeting);
    var date = new Date(timeStamp);
    var date1 = new Date();
    if (date <= date1 && date.getDate() === date1.getDate()) {
      return 'green';
    }
    else {
      return colorArray[index % 5];
    }
  }

  return (
    <>

      <LoginNavBar />



      <div className="MeetingItems" style={{ marginTop: "0px" }}>

        <div className="TabSwitch" style={{ marginBottom: "30px", width: "100%", }}>
          <Nav style={{ display: "flex", width: "100%" }}>
            <Nav.Link id="upcoming" className="Active" style={{ color: "black", width: "50%", textAlign: "center" }} eventKey="/upcoming" onClick={(e) => changeMenu(e, "upcoming")}>
              Upcoming Meetings
            </Nav.Link>

            <Nav.Link id="finished" style={{ color: "black", width: "50%", textAlign: "center" }} eventKey="/finished" onClick={(e) => changeMenu(e, "finished")}>
              Finished Meetings
            </Nav.Link>
          </Nav>
        </div>
        {
          upcoming ?
            <div>
              <p className='MeetingHeader' >UPCOMING MEETINGS</p>
              {
                isAdmin ? <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>To Edit details click on More Button</p> : <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>To view details click on the meeting</p>
              }
              <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
              {
                upcomingMeetings.length ?
                  upcomingMeetings.map((item, index) => {
                    return (
                      <>

                        <div className="announcement" style={{ width: "95%", marginLeft: "2.5%", marginBottom: "20px", display: "grid", gridTemplateColumns: "auto auto auto" }}>
                          <div style={{ border: "3px solid " + getColor(index, item.Date), padding: "5px 20px 5px 20px", color: "black", width: "fit-content", textAlign: "center" }}>
                            <span className='Date' >
                              <span style={{ fontSize: "40px", letterSpacing: "1px" }}>
                                {getFormattedTime(item.Date)}
                              </span>
                              <br>
                              </br>
                              <span style={{ fonSize: "16px", letterSpacing: "1px" }}>
                                {getFormattedTime1(item.Date)}
                              </span>
                              <br>
                              </br>
                              <span style={{ fontSize: "14px", letterSpacing: "1px" }}>
                                {item.Time}
                              </span>
                            </span>
                          </div>
                          <div style={{ marginLeft: "30px" }}>
                            <span className='Date' >
                              <p style={{ fontSize: "22px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                                {item.Title}
                              </p>
                              <p style={{ fontSize: "14px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left" }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, deserunt!
                              </p>
                              <a href={item.Link} style={{textDecoration:"none", color:"black", }}>
                                <span style={{ fontSize: "16px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left",}}>
                                  Meeting Link &rarr;
                                </span>
                              </a>

                            </span>
                          </div>
                          <div>
                            <button variant="primary" className="MoreButton" onClick={() => handleShow(item.Title, item.Description, item.Link, item.Host, item.Date, item.Time, item._id)} > More &rarr;</button>
                          </div>
                        </div>
                        <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
                      </>
                    );
                  })
                  :
                  <p>No Upcoming Meetings!</p>
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
                          <div> <br></br><input name="Date" id="DateofMeeting" type="Date" defaultValue={getFormattedTime2(DateVar)} className="inputEditable" ></input><br></br></div>
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
                          {getFormattedTime2(DateVar)}
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

            :
            <div>
              <p className='MeetingHeader' >FINISHED MEETINGS</p>
              {
                <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>To view details click on More Button</p>
              }
              <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
              {

                FinishedMeetings.map((item, index) => {
                  return (
                    <>
                     <div style={{ width: "95%", marginLeft: "2.5%", marginBottom: "20px", display: "grid", gridTemplateColumns: "auto auto auto" }}>
                          <div style={{ border: "3px solid " + getColor(index, item.Date), padding: "5px 20px 5px 20px", color: "black", width: "fit-content", textAlign: "center" }}>
                            <span className='Date' >
                              <span style={{ fontSize: "40px", letterSpacing: "1px" }}>
                                {getFormattedTime(item.Date)}
                              </span>
                              <br>
                              </br>
                              <span style={{ fonSize: "16px", letterSpacing: "1px" }}>
                                {getFormattedTime1(item.Date)}
                              </span>
                              <br>
                              </br>
                              <span style={{ fontSize: "14px", letterSpacing: "1px" }}>
                                {item.Time}
                              </span>
                            </span>
                          </div>
                          <div style={{ marginLeft: "30px" }}>
                            <span className='Date' >
                              <p style={{ fontSize: "22px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                                {item.Title}
                              </p>
                              <p style={{ fontSize: "14px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left" }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, deserunt!
                              </p>
                              <a href={item.Link} style={{textDecoration:"none", color:"black", }}>
                                <span style={{ fontSize: "16px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left",}}>
                                  Video Link &rarr;
                                </span>
                              </a>

                            </span>
                          </div>
                          <div>
                            <button variant="primary" className="MoreButton" onClick={() => handleShow(item.Title, item.Description, item.Link, item.Host, item.Date, item.Time, item._id)} > More &rarr;</button>
                          </div>
                        </div>
                        <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
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
                          <div> <br></br><input name="Date" id="DateofMeeting" type="Date" defaultValue={getFormattedTime2(DateVar)} className="inputEditable" ></input><br></br></div>
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
                          {getFormattedTime2(DateVar)}
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
        }
      </div>

      {/* </div> */}
    </>
  )
}


export default Notifications;