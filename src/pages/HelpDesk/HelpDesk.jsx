import { Alert } from "antd";
import axios from "axios";

import React, { useState, useEffect } from "react";
import './HelpDesk.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar';
import { useGlobalContext } from '/src/context/StateContext';

function HelpDesk() {
    const { User, setLoading, loading } = useGlobalContext();
    const [Issues, setIssues] = useState([]);
    const [DuplicateComplaint, setDuplicateComplaint] = useState(0)
    const PostComplaint = async (FlatNo, Issue, Description) => {
        setLoading(true);
        const { data } = await axios.post("http://localhost:4000/api/v1/complaint/new", {
            FlatNo: FlatNo,
            Issue: Issue,
            Description: Description
        });
        if (data.success === false) {
            setDuplicateComplaint(2);
        }
        else {
            setDuplicateComplaint(1);
        }
    }
    const complaintSubmit = (e) => {
        const user = JSON.parse(User);
        const FlatNo = user.FlatNo;
        const Issue = e.target.Issue.value;
        const Description = e.target.Description.value;
        e.preventDefault();
        console.log("user", FlatNo, Issue, Description);
        PostComplaint(FlatNo, Issue, Description);
        e.target.Issue.value = "";
        e.target.Description.value = "";

    };

    const fetchIssues = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/issue_types");
        setIssues(data.issues);
    }
    useEffect(() => {
        fetchIssues();
    }, [Issues.length])

    return (
        <>
            <LoginNavBar />
            <div >
                <div style={{ display: "flex", justifyContent:"center", marginBottom: "-20px"}}>
                    <img src="/src/assests/complaint.png" style={{ height: "50px", width: "50px", marginTop : "95px", marginRight: "5px"}}></img>
                    <p id="title2">POST A COMPLAINT</p>
                </div>
                {
                    DuplicateComplaint > 0 ? DuplicateComplaint===2? <Alert message="Error" type="error" description="Complaint Already Exists! Please try again" showIcon closable style={{ marginBottom: "20px",marginTop:"20px", width:"60%",letterSpacing:"2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft:"20%" }} />
                    :
                    <Alert message="Success" type="success" description="Complaint Posted Successfully! Kindly Wait for Admins response" showIcon closable style={{ marginBottom: "20px",marginTop:"20px", width:"60%", letterSpacing:"2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft:"20%" }} /> : <></>
                }
                <div class="container" >
                    <div class="row mx-0 justify-content-center">
                        <div class="col-md-10 col-lg-9 px-lg-2 col-xl-8 px-xl-0">
                            <form
                                className="w-100 rounded p-4 border backgroundcolor HelpDeskSection"
                                onSubmit={complaintSubmit}
                            >

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Complaint Type</span>
                                    <select className="dropDownSelect" name="Issue" required>
                                        {
                                            Issues.map(({ Name }) => (
                                                <option value={Name}>{Name}</option>
                                            ))
                                        }
                                    </select>
                                </label>

                                <div class="mb-4">
                                    <label class="d-block mb-2 head">Related Files</label>
                                    <p style={{ fontSize: "14px" }}>(.xlsx, .xls, images, .doc, .docx, .pdf are only accepted)</p>
                                    <div class="form-control h-auto temp">
                                        <input name="receipt" type="file" class="form-control-file" multiple accept=".xlsx,.xls,image/*,.doc, .docx,.pdf" />
                                    </div>
                                </div>

                                <label class="d-block mb-4">

                                    <span class="d-block mb-2 head">What's wrong?</span>

                                    <textarea
                                        name="Description"
                                        class="form-control temp"
                                        rows="3"
                                        placeholder="Please describe your problem"
                                        required
                                    ></textarea>

                                </label>

                                <div class="mb-3">
                                    <button type="submit" class="btn btn-dark px-3 w-100 Help-desk-submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpDesk;