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


function Dashboard() {
    const [IsForms, setIsForms] = useState(true);
    const [IsMeeting, setIsMeeting] = useState(false);
    const [IsNotification, setIsNotification] = useState(false);
    const [IsComplaints, setIsComplaints] = useState(false);
    const [IsDocuments, setIsDocuments] = useState(false);
    const changeMenu = (e, tab) => {
        if (tab == "Forms") {
            setIsForms(true);
            setIsMeeting(false);
            setIsNotification(false);
            setIsComplaints(false);
            setIsDocuments(false);
        }
        if (tab == "Meetings") {
            setIsMeeting(true);
            setIsForms(false);
            setIsNotification(false);
            setIsComplaints(false);
            setIsDocuments(false);
        }
        if (tab == "Notifications") {
            setIsNotification(true);
            setIsForms(false);
            setIsMeeting(false);
            setIsComplaints(false);
            setIsDocuments(false);
        }
        if (tab == "Complaints") {
            setIsComplaints(true);
            setIsForms(false);
            setIsMeeting(false);
            setIsNotification(false);
            setIsDocuments(false);
        }
        if (tab == "Documents") {
            setIsComplaints(false);
            setIsForms(false);
            setIsMeeting(false);
            setIsNotification(false);
            setIsDocuments(true);
        }
    };


    return (
        <>
            <LoginNavBar />

            <div>
                <div style={{ display: "flex", marginTop: "100px", justifyContent:"center", }}>
                <img src="/src/assests/dashboard.png" style={{ height: "40px", width: "40px", marginBottom: "0px", }}></img>
                    <p id="userDashboardTitle">USER DASHBOARD</p>
                    </div>
                <div className="d-flex mb-3 FacilityNavBar">

                    <Nav variant="pills" defaultActiveKey="/home">

                        <Nav.Item className="navbarLink">
                            <Nav.Link className="FacilityLink" eventKey="/Home" onClick={(e) => changeMenu(e, "Forms")}>
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                    <img src="/src/assests/form.png" height="50px" width="50px"></img>
                                    <span>Forms</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="navbarLink">
                            <Nav.Link className="FacilityLink" eventKey="/meet" onClick={(e) => changeMenu(e, "Meetings")}>
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                    <img src="/src/assests/meeting1.png" height="50px" width="50px"></img>
                                    <span>Meeting</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>

                            <Nav.Link className="FacilityLink" eventKey="/notify" onClick={(e) => changeMenu(e, "Notifications")}>
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                    <img src="/src/assests/notifications.png" height="50px" width="50px"></img>
                                    Notifications
                                </div>
                            </Nav.Link>

                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="FacilityLink" eventKey="/complaints" onClick={(e) => changeMenu(e, "Complaints")}>
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                    <img src="/src/assests/complaint1.png" height="50px" width="50px"></img>
                                    Complaints
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="FacilityLink" eventKey="/docs" onClick={(e) => changeMenu(e, "Documents")}>
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                                    <img src="/src/assests/documents.png" height="50px" width="50px"></img>

                                    Documents
                                </div></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                {IsForms && <GoogleForms />}
                {IsMeeting && <Notifications />}
                {IsNotification && <GeneralNotifications />}
                {IsComplaints && <Complaints />}
                {IsDocuments && <Documents />}
            </div>
        </>
    );
}

export default Dashboard;