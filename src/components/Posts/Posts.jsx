import React from 'react'
import './Posts.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Popconfirm } from 'antd';
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

  return (
    <>
      <Card className="m-3 backgroundcoloring PostBackground">
        <Card.Header className="PostTitle">
          <div className='PostHeader'>
            <div>
              <label className='PostHeading'>Complaint</label>
              <span className='PostsIssue'> {props.Issue}</span>
            </div>
            <div>
              {props.Status ? <div>
                <img src="/src/assests/greenCircle.png" height="20px" width="20px"></img>
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
              <p className='DescriptionTitle'>DESCRIPTION</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div contentEditable style={{ width: "100%" }} id={props._id}>{props.Description}</div>
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
