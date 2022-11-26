import { Alert } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import './CreateForm.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar';
import { useGlobalContext } from '/src/context/StateContext';

function CreateForm() {
    const { User, setLoading, loading } = useGlobalContext();
    const [duplicateForm, setDuplicateForm] = useState(0);
    const CreateForms = async (Title, Description, Link) => {
        setLoading(true);
        const { data } = await axios.post("http://localhost:4000/api/v1/form/new", {
            Title: Title,
            Description: Description,
            Link: Link
        });
        if (data.success === false) {
            setDuplicateForm(2);
        }
        else {
            setDuplicateForm(1);
        }
    }
    const CreateFormSubmit = (e) => {
        const Title = e.target.Title.value;
        const Description = e.target.Description.value;
        const Link = e.target.Link.value;
        e.preventDefault();
        CreateForms(Title, Description, Link);
        e.target.Description.value = "";
        e.target.Link.value = "";
        e.target.Title.value = "";
    };



    return (
        <>
            <LoginNavBar />
            <div>
                <div style={{ display: "flex", justifyContent:"center", }}>
                    <img src="/src/assests/survey.png" style={{ height: "50px", width: "50px", marginTop : "100px", marginBottom: "0px", marginRight: "10px"}}></img>
                    <p id="title4">CREATE SURVEY FORMS</p>
                </div>

                {
                    duplicateForm > 0 ? duplicateForm === 2 ? <Alert message="Error" type="error" description="Form Details Already Exists! Please try again" showIcon closable style={{ marginBottom: "20px", marginTop: "20px", width: "60%", letterSpacing: "2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft: "20%" }} />
                        :
                        <Alert message="Success" type="success" description="Form Details Posted Successfully!" showIcon closable style={{ marginBottom: "20px", marginTop: "20px", width: "60%", letterSpacing: "2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft: "20%" }} /> : <></>
                }
                <div class="container" >
                    <div class="row mx-0 justify-content-center">
                        <div class="col-md-10 col-lg-9 px-lg-2 col-xl-8 px-xl-0">
                            <form
                                className="w-100 rounded p-4 border backgroundcolor HelpDeskSection"
                                onSubmit={CreateFormSubmit}
                            >

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Form Title</span>
                                    <input
                                        name="Title"
                                        type="text"
                                        id="activity"
                                        class="form-control temp"
                                        placeholder="Form Title"
                                        required
                                    />
                                </label>

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Form Link</span>
                                    <input
                                        name="Link"
                                        type="text"
                                        id="activity"
                                        class="form-control temp"
                                        placeholder="Form Link"
                                        required
                                    />
                                </label>

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Description</span>
                                    <textarea
                                        name="Description"
                                        class="form-control temp"
                                        rows="3"
                                        placeholder="Survey Description"
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

export default CreateForm;