import React from 'react'
import './Posts.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Popconfirm } from 'antd';
import { Web3Storage } from 'web3.storage';
const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxOTdiN2M2OGFEMTNhNzREMGIzMGQ3OTI4OTNGMDc4MWQxZjE4M2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNjM1MTczNDIsIm5hbWUiOiJsb2RoYS1maWxlcyJ9.rmkUCge8MPPj5TC6i8Z5lVAjIevCSVni0gpu-_jUzlI" });


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

function Posts({ props }) {
  let timeStamp = Date.parse(props.Time);
  var date = new Date(timeStamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var dateVal = date.getDate();
  var formattedDate = dateVal + '-' + (date.getMonth() + 1) + '-' + year;
  const { User } = useGlobalContext();

  const refreshPage = () => {
    window.location.reload();
  }

  const updateComplaint = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/updatecomplaint", { params: { complaint: props } });
    refreshPage();
  }

  const UpdateDescription = (e) => {
    e.preventDefault();
    const desc = document.getElementById((props._id).toString()).innerText;
    console.log("Update description", desc);
    props.Description = desc;
    updateComplaint();

  }

  const getSourceimg = (item) => {
    let x = ''
    let i = item.lastIndexOf('.');
    for (let index = i + 1; index < item.length; index++) {
      x += item[index]
    }
    if (x === 'png' || x === 'jpg' || x === 'gif' || x === 'jpeg') {
      return '/src/assests/image.png';
    }
    if (x === 'docx' || x === 'doc') {
      return '/src/assests/docx.png';
    }
    if (x === 'pdf') {
      return '/src/assests/pdf.png'
    }
    if (x === 'xlsx' || x === 'xls') {
      return '/src/assests/excel.png'
    }
    if (x === 'pptx' || x === 'ppt') {
      return '/src/assests/ppt.png'
    }

  }


  return (
    <>
      <Card className="m-3 backgroundcoloring PostBackground">
        <Card.Header className="PostTitle">
          <div className='PostHeader'>
            <div>
              <label className='PostHeading'>Complaint Type</label>
              <span className='PostsIssue'> {props.Issue}</span>
            </div>
            <div>
              {props.Status ? <div>
                <img src="/src/assests/done.png" height="20px" width="20px"></img>
                <span style={{ color: "green", fontWeight: "bold", fontSize: "18px", letterSpacing: "2px" }}>Done</span>
              </div>
                :
                <div>
                  <img src="/src/assests/redCircle.png" height="20px" width="20px"></img>
                  <span style={{ color: "red", fontWeight: "bold", fontSize: "18px", letterSpacing: "2px" }}>Pending</span>
                </div>
              }
              <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", letterSpacing: "1px" }}>{formattedDate}</span>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text className="PostDesc">
            <form
              onSubmit={UpdateDescription}
            >
              <div style={{ display: "flex", }}>
                <div style={{ width: "50%" }}>
                  <p className='DescriptionTitle'>DESCRIPTION</p>
                  <div contentEditable style={{ width: "100%" }} id={props._id}>{props.Description}</div>
                </div>
                <div style={{ width: "50%" }}>
                  <p className='DescriptionTitle'>DOCUMENTS</p>

                  {
                    props.FileObjects.length ?
                      <div className='documentDiv'>
                        {
                          props.FileObjects.map((item) => {
                            return (
                              <Card className="card CardDocument" style={{ width: "250px", margin: "10px", backgroundColor: "whitesmoke" }}>
                                <Card.Body className='CardBodyDiv'>



                                  {
                                    item.endsWith('.png')
                                      ?

                                      <div>
                                        <img src={"https://" + props.FileHashes + ".ipfs.w3s.link/" + item} width="150px" height="150px"></img>
                                        <p style={{ marginLeft: "10px" }}> {item}</p>
                                      </div>
                                      :
                                      <div style={{ display: "flex", }}>
                                        <img src={getSourceimg(item)} width="50px" height="50px"></img>
                                        <p style={{ marginLeft: "10px" }}> {item}</p>
                                      </div>
                                  }


                                </Card.Body>
                                <Button href={"https://" + props.FileHashes + ".ipfs.w3s.link/" + item} style={{ width: "100%", marginBottom: "0px" }} target="blank" variant="primary" >View document</Button>

                              </Card>
                            );
                          })
                        }
                      </div>
                      :
                      <p>
                        No Documents!
                      </p>
                  }
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <Popconfirm
                  title="Clicking ok button will edit the complaint details "
                  onConfirm={(e) => UpdateDescription(e)}
                >

                  <button className="btn btn-success ComplaintsButton" type="submit">Edit Complaint</button>
                </Popconfirm>
              </div>
            </form>


          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Posts;
