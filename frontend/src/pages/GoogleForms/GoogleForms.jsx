import React, { useState, useEffect } from "react";
import './GoogleForms.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import axios from "axios";
import { useGlobalContext } from '/src/context/StateContext';

function GoogleForms() {
    const [modalShow, setModalShow] = useState(false);
    const [googleForms, setGoogleForms] = useState([]);
    const [titleVar, setTitleVar] = useState('');
    const [DescVar, setDescVar] = useState('');
    const [LinkVar, setLinkVar] = useState('');
    const [idvalue, setidvalue] = useState('');

    const { User } = useGlobalContext();
    const [isAdmin, setisAdmin] = useState(JSON.parse(User).Role === '440f3041c89adee0f2ad780704bcc0efae1bdb30f8d77dc455a2f6c823b87ca0');
    const fetchForms = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/AllForms");
        setGoogleForms(data.forms);
    }
    useEffect(() => {
        fetchForms();
    }, [googleForms.length]);
    const handleHide = () => {
        setDescVar('');
        setTitleVar('');
        setLinkVar('');
        setidvalue('');
        setModalShow(false);
    }
    const handleShow = (Title, Description, Link, _id) => {
        setModalShow(true);
        setTitleVar(Title);
        setDescVar(Description);
        setLinkVar(Link);
        setidvalue(_id);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const DeleteFormFromDb = async (_id) => {
        const { data } = await axios.get("http://localhost:4000/api/v1/deleteform", { params: { _id: _id, Admin: JSON.parse(localStorage.getItem("User")).FlatNo} });
        refreshPage();
    }

    const DeleteForm = (e, _id) => {
        e.preventDefault();
        DeleteFormFromDb(_id);
    }

    const UpdateFormInDb = async (Link, Title, Description, _id) => {
        const { data } = await axios.get("http://localhost:4000/api/v1/updateform", { params: { _id: _id, Title: Title, Description: Description, Link: Link, Admin: JSON.parse(localStorage.getItem("User")).FlatNo } });
        refreshPage();
    }

    const UpdateForm = (e, _id) => {
        e.preventDefault();
        const Link = document.getElementById('link').innerText;
        const Title = document.getElementById('title').innerText;
        const Description = document.getElementById('Description').innerText;

        UpdateFormInDb(Link, Title, Description, _id);
    }

    return (
        <>
            <LoginNavBar />
            <div className="FormItems" >
                <p className='FormHeader' >SURVEY FORMS</p>
                {
                    isAdmin ? <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>Note - To Edit details click on MORE INFO</p> : 
                              <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>Note - To View details click on MORE INFO</p>
                }
                <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
                {
                    googleForms.map((item) => (
                        <>
                            <Button variant="primary" onClick={() => handleShow(item.Title, item.Description, item.Link, item._id)} className="modalButton">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <span className="FormHeading">
                                        <p style={{ textDecorationLine: "underline", textUnderlineOffset: "10px" }}>SURVEY TITLE</p>
                                        <p style={{ textTransform: "capitalize" }}>{item.Title}</p>
                                    </span>
                                    <span style={{ padding: "3px", borderRadius: "5px", marginTop: "20px", paddingLeft: "5%"}}>MORE INFO</span>
                                    {/* <span className="FormView">
                                        <button className="Viewbutton" style={{ padding: "3px", borderRadius: "5px", marginTop: "20px" }}>More &rarr;</button>
                                    </span> */}
                                </div>
                            </Button>
                            <hr style={{ width: "94%", marginLeft: "3%" }}></hr>
                        </>
                    ))
                }

            <Modal
                show={modalShow}
                onHide={handleHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <form
                    onSubmit={UpdateForm}>
                    <Modal.Header closeButton>

                        <Modal.Title id="contained-modal-title-vcenter">

                            {isAdmin ?
                                <span id="title" style={{ fontSize: "20px", letterSpacing: "1px", fontWeight: "normal" }} contentEditable>
                                    {titleVar}
                                </span> :
                                <span id="titleOfForm" style={{ fontSize: "20px", letterSpacing: "1px", textDecorationLine: "underline", textUnderlineOffset: "10px", fontWeight: "normal" }}>
                                    {titleVar}
                                </span>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textUnderlineOffset: "5px", marginTop: "10px" }}>Description </label>
                            {
                                isAdmin ?
                                    <div id="Description" style={{ fontSize: "16px" }} contentEditable>
                                        {DescVar}
                                    </div>
                                    :
                                    <div id="DescriptionOfForm" style={{ fontSize: "16px" }} >
                                        {DescVar}
                                    </div>
                            }
                            <label style={{ fontSize: "18px", letterSpacing: "1px", marginRight: "10px", textDecorationLine: "underline", textUnderlineOffset: "5px", marginTop: "20px" }}>Link </label>

                            {
                                isAdmin ?
                                    <div style={{ width: "100%" }} className="linkDiv" id="linkDiv" >
                                        <a id="link" href={LinkVar} target="_blank" style={{ textDecorationLine: "underline", fontSize: "16px" }} contentEditable >{LinkVar}</a>
                                    </div>
                                    :
                                    <div>
                                        <a id="linkOfForm" href={LinkVar} target="_blank" style={{ textDecorationLine: "underline", fontSize: "16px" }} >Click to open Link</a>
                                    </div>

                            }

                        </div>
                    </Modal.Body>
                    <Modal.Footer >
                        {
                            isAdmin ?
                                <div >
                                    <div style={{ textAlign: "left" }}>
                                        <ul style={{ textAlign: "left" }}>
                                            <li>Click on the fields to edit Details</li>
                                            <li>To Edit Form details click on "Edit Form" button</li>
                                            <li>To Delete Form details click on "Delete Form" button</li>
                                        </ul>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center", }}>
                                        <button className="btn btn-primary " type="submit" onClick={(e) => UpdateForm(e, idvalue)}>Edit Form</button>
                                        <button className="btn btn-danger" type="submit" style={{ marginLeft: "50px" }} onClick={(e) => DeleteForm(e, idvalue)}>Delete Form</button>
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </Modal.Footer>
                </form>
            </Modal>

        </div>
        </>
    );
}

export default GoogleForms;