import React from "react";
import './GeneralNotifications.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from '/src/context/StateContext';


function GeneralNotifications() {
    const [modalShow, setModalShow] = useState(false);
    const [generalNotifications, setGeneralNotifications] = useState([]);
    const [titleVar, setTitleVar] = useState('');
    const [DescVar, setDescVar] = useState('');
    const { User } = useGlobalContext();
    const [isAdmin, setisAdmin] = useState(JSON.parse(User).Role === 'admin');
    const fetchNotifications = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/AllNotifications");
        setGeneralNotifications(data.notifications);
    }

    const getFormattedTime = (DateOfMeeting) => {


        let timeStamp = Date.parse(DateOfMeeting);
        var date = new Date(timeStamp);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        return months[month] + " " + day + ", " + year;
    }


    useEffect(() => {
        fetchNotifications();
        console.log(generalNotifications);
    }, [generalNotifications.length]);
    const handleHide = () => {
        setDescVar('');
        setTitleVar('');
        setModalShow(false);
    }
    const handleShow = (Title, Description) => {
        setModalShow(true);
        setTitleVar(Title);
        setDescVar(Description);
    }
    return (
        <>
            <div className="NotifyItems">
                <p className='NotifyHeader' >COMMUNITY ANNOUNCEMENTS</p>
                <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>Note - To View details click on MORE</p>
                <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
                {
                    generalNotifications.map((item, index) => {
                        return (
                            // <div key={index}>
                            //     <Button variant="primary" onClick={() => handleShow(item.Title, item.Description)} className="modalButton">
                            //         <div style={{ display: "flex", flexDirection: "row" }}>
                            //             <span className="NotifyHeading">
                            //                 <div>
                            //                     <p style={{ textDecorationLine: "underline",textUnderlineOffset:"10px" }}>TITLE</p>
                            //                     <p>{item.Title}</p>
                            //                 </div>
                            //             </span>
                            //             <span style={{ padding: "3px", borderRadius: "5px", marginTop: "20px", paddingLeft: "5%"}}>MORE INFO</span>
                            //             {/* <span className="NotifyView">
                            //                 <button className="Viewbutton" style={{ padding: "3px", borderRadius: "5px", marginTop:"20px" }}>More &rarr;</button>
                            //             </span> */}
                            //         </div>
                            //     </Button>
                            //     <hr style={{ width: "94%", marginLeft: "3%" }}></hr>

                            // </div>
                            <>
                                <div className="announcement" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ marginLeft: "30px", width: "70%" }}>
                                        <div style={{ display: "flex" }}>
                                            <img src="/src/assests/announcement.png" height="25px" width="25px"></img>
                                            <p style={{ marginLeft: "20px", fontSize: "22px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                                                {item.Title}
                                            </p>
                                        </div>
                                        <div>
                                            <p style={{ marginLeft: "45px", fontSize: "12px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", }}>
                                                {getFormattedTime(item.PostedDate)}
                                            </p>
                                        </div>
                                        <div>
                                            <p style={{ marginLeft: "45px", fontSize: "14px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", }}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim illum iste maiores culpa impedit nam reiciendis nulla odio eos fuga.
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="primary" className="AnnouncementsButton" onClick={() => handleShow(item.Title, item.Description)} > More &rarr;
                                    </Button>
                                </div>
                                <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
                            </>
                        )
                    })

                }
                <Modal
                    show={modalShow}
                    onHide={handleHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {titleVar}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span style={{ fontSize: "16px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                            Description - 
                        </span>
                        <span>{DescVar}</span>
                        <div>
                            <p style={{ fontSize: "16px", marginTop:"20px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                                Documents
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        </>
    );
}

export default GeneralNotifications;