import React from "react";
import { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import GoogleForms from "../GoogleForms/GoogleForms";
import "./Dashboard.css"
import Notifications from "../Notifications/Notifications";
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import GeneralNotifications from "../GeneralNotifications/GeneralNotifications";
import Complaints from "../Complaints/Complaints";
import Documents from "../Documents/Documents";
import UserNotification from "../UserNotification/UserNotification";
import {useGlobalContext} from "/src/context/StateContext";

function Dashboard() {
    const [IsForms, setIsForms] = useState(false);
    const [IsMeeting, setIsMeeting] = useState(false);
    const [IsNotification, setIsNotification] = useState(false);
    const [IsComplaints, setIsComplaints] = useState(false);
    const [IsDocuments, setIsDocuments] = useState(false);
    const [IsAnnoucements, setIsAnnoucements] = useState(true);
    const {User} = useGlobalContext();
    const changeMenu = (e, tab) => {
        if (tab == "Forms") {
            setIsForms(true);
            setIsMeeting(false);
            setIsNotification(false);
            setIsComplaints(false);
            setIsDocuments(false);
            setIsAnnoucements(false);
        }
        if (tab == "Meetings") {
            setIsMeeting(true);
            setIsForms(false);
            setIsNotification(false);
            setIsComplaints(false);
            setIsDocuments(false);
            setIsAnnoucements(false);
        }
        if (tab == "Notifications") {
            setIsNotification(true);
            setIsForms(false);
            setIsMeeting(false);
            setIsComplaints(false);
            setIsDocuments(false);
            setIsAnnoucements(false);
        }
        if (tab == "Complaints") {
            setIsComplaints(true);
            setIsForms(false);
            setIsMeeting(false);
            setIsNotification(false);
            setIsDocuments(false);
            setIsAnnoucements(false);
        }
        if (tab == "Documents") {
            setIsComplaints(false);
            setIsForms(false);
            setIsMeeting(false);
            setIsNotification(false);
            setIsDocuments(true);
            setIsAnnoucements(false);
        }
        if (tab == "Announcements") {
            setIsComplaints(false);
            setIsForms(false);
            setIsMeeting(false);
            setIsNotification(false);
            setIsDocuments(false);
            setIsAnnoucements(true);
        }
    };


    return (
        <>
            <LoginNavBar />

            <div>
                <div style={{ display: "flex", marginTop: "100px", justifyContent: "center", }}>
                    {/* <img src="/src/assests/dashboard.png" style={{ height: "55px", width: "50px", marginBottom: "0px", }}></img> */}
                    <p id="userDashboardTitle">Hello, {JSON.parse(User).OwnerName}!</p>
                </div>
                
                    <div className="d-flex mb-3 FacilityNavBar">

                        <Nav variant="pills" defaultActiveKey="/home">

                            <Nav.Item>
                                <Nav.Link className="FacilityLink" eventKey="/home" onClick={(e) => changeMenu(e, "Announcements")}>
                                    <div style={{ display: "flex", alignItems: "center",height:"100%" , flexDirection: "column", textAlign: "center" }}>
                                        <img src="/src/assests/announcement.png" height="50px" width="50px"></img>
                                        <pre style={{ fontFamily: "Montserrat" }}>Announcements</pre>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                            {/* <Nav.Item className="navbarLink">
                                <Nav.Link className="FacilityLink" eventKey="/announcements" onClick={(e) => changeMenu(e, "Annoucements")}>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                        <img src="/src/assests/announcement.png" height="50px" width="50px"></img>
                                        <pre style={{ fontFamily: "Montserrat" }}>Annoucements</pre>
                                    </div>
                                </Nav.Link>
                            </Nav.Item> */}

                            <Nav.Item className="navbarLink">
                                <Nav.Link className="FacilityLink" eventKey="/forms" onClick={(e) => changeMenu(e, "Forms")}>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                        <img src="/src/assests/form.png" height="50px" width="50px"></img>
                                        <pre style={{ fontFamily: "Montserrat" }}>      Forms       </pre>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item className="navbarLink">
                                <Nav.Link className="FacilityLink" eventKey="/meet" onClick={(e) => changeMenu(e, "Meetings")}>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                        <img src="/src/assests/meeting1.png" height="50px" width="50px"></img>
                                        <pre style={{ fontFamily: "Montserrat" }}>   Meetings     </pre>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link className="FacilityLink" eventKey="/complaints" onClick={(e) => changeMenu(e, "Complaints")}>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                        <img src="/src/assests/complaint1.png" height="50px" width="50px"></img>
                                        <pre style={{ fontFamily: "Montserrat" }}>  Complaints  </pre>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="FacilityLink" eventKey="/docs" onClick={(e) => changeMenu(e, "Documents")}>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                        <img src="/src/assests/documents.png" height="50px" width="50px"></img>
                                        <pre style={{ fontFamily: "Montserrat" }}>   Documents   </pre>
                                    </div></Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="NotificationLinkItem">
                                <Nav.Link className="FacilityLink" eventKey="/notify" onClick={(e) => changeMenu(e, "Notifications")}>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                        <img src="/src/assests/notifications.png" height="50px" width="50px"></img>
                                        <pre style={{ fontFamily: "Montserrat" }}>   Notifications   </pre>
                                    </div></Nav.Link>
                            </Nav.Item>

                        </Nav>

                    </div>


                    {IsForms && <GoogleForms />}
                    {IsMeeting && <Notifications />}
                    {IsAnnoucements && <GeneralNotifications />}
                    {IsComplaints && <Complaints />}
                    {IsDocuments && <Documents />}
                    <div className="userNotificationDivItem1" style={{float:"center"}}>
                    {IsNotification && <UserNotification />}
                    </div>
                    <div className="userNotificationDivItem" style={{ float: "right" }}>
                        {<UserNotification />}
                    </div>
           
            </div>
        </>
    );
}

export default Dashboard;