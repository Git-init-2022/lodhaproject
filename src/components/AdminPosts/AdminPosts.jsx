import React from 'react'
import './AdminPosts.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useGlobalContext } from '/src/context/StateContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function AdminPosts({ props, selectedOption }) {
    const [singleUser, setSingleUser] = useState([])
    const user = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/singleUser", { params: { FlatNo: props.FlatNo } });
        const singleuser = data.user1[0];
        setSingleUser(singleuser)
        return singleuser;
    }

    useEffect(() => {
        user()
    }, []);
    const refreshPage = () => {
        window.location.reload();
    }

    const updateComplaint = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/updatecomplaint", { params: { complaint: props } });
        refreshPage();
    }

    const deleteUserComplaint = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/deletecomplaint", { params: { complaint: props } });
        refreshPage();
    }

    const UpdateComplaint = (e) => {
        e.preventDefault();
        if (props.Status === 0) {
            const Status = document.getElementById("Status").value;

            props.Status = Status;
            updateComplaint();
        }

    }

    const DeleteComplaint = (e) => {
        e.preventDefault();
        deleteUserComplaint();
    }
    const check = (Time) => {
        let days = 0;
        for (let t of Time) {
            if (t === ' ') {
                break;
            }
            else {
                days = days * 10 + (t - '0');
            }
        }
        if (selectedOption === "all") {
            return true;
        }
        else if (selectedOption === "month" && days >= 30) {
            return true;
        }
        else if (selectedOption === "twomonths" && days >= 60) {
            return true;
        }
        else if (selectedOption === "threemonths" && days >= 90) {
            return true;
        }
        else if (selectedOption === "fourmonths" && days >= 120) {
            return true;
        }
        else if (selectedOption === "fivemonths" && days >= 150) {
            return true;
        }
        else if (selectedOption === "sixmonths" && days >= 180) {
            return true;
        }
        return false;
    }

    return (
        <>
            {
                (check(props.Time)) ? <Card className="m-3 backgroundcoloring PostBackground1">
                    <form>
                        <Card.Header className="PostTitle">
                            <div className='PostHeader'>
                                <div style={{ width: "90%" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                                        <div>
                                            <label className='PostHeading'>Flat Number  </label>
                                            <span className='PostsIssue'>{singleUser.FlatNo}</span>
                                        </div>
                                        <div>
                                            <label className='PostHeading'>Name  </label>
                                            <span className='PostsIssue'>{singleUser.OwnerName}</span>
                                        </div>
                                        <div>
                                            <label className='PostHeading'>Mobile  </label>
                                            <span className='PostsIssue'>{singleUser.Mobile}</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <label className='PostHeading'>Issue  </label>
                                        <span className='PostsIssue' style={{ color: 'blue', }}>{props.Issue}</span>
                                    </div>
                                </div>

                                <div>
                                    {props.Status ? <div><img src="/src/assests/greenCircle.png" height="20px" width="20px"></img><span style={{ color: "green", fontWeight: "bold", fontSize: "16px", letterSpacing: "2px" }}>Done</span></div> : <select name="Status" id='Status' className='statusOptions'>
                                        <option value="0">
                                            Pending
                                        </option>
                                        <option value="1" style={{ color: "green" }}>
                                            Done
                                        </option>
                                    </select>/*<p style={{ color: "red", fontWeight: "bold", fontSize: "16px", letterSpacing: "1px" }}>Pending</p>*/}
                                    <p style={{ color: "black", fontWeight: "bold", fontSize: "16px", letterSpacing: "1px", marginTop: "10px" }}>{props.Time + " Ago"} </p>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="PostDesc">

                                <p className='DescriptionTitle'>DESCRIPTION</p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div contentEditable style={{ width: "100%" }} id={props._id}>{props.Description}</div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                                    <button className="btn btn-primary " type="submit" onClick={(e) => UpdateComplaint(e)}>Edit Complaint</button>
                                    <button className="btn btn-danger" type="submit" style={{ marginLeft: "50px" }} onClick={(e) => DeleteComplaint(e)}>Delete Complaint</button>
                                </div>

                            </Card.Text>
                        </Card.Body>
                    </form>
                </Card> : <></>
            }
        </>
    )
}

export default AdminPosts;
