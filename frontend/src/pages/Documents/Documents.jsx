import React, { useState } from "react";
import { Web3Storage } from 'web3.storage';
import './Documents.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect } from "react";
import axios from "axios";



function BasicExample() {

  const [Documents, setDocuments] = useState([]);
  let Type = "all";

  const types = {
    legal: "Legal Update",
    bank: "Bank Statements",
    audit: "Audit Reports"
  }

  const fetchDocuments = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/getDocumentsByType", { params: { Type: Type } });
    setDocuments(data.documents);
  }

  useEffect(() => {

    fetchDocuments();
  }, [])


  const changeDocumentsType = (e) => {
    Type = e.target.value;
    fetchDocuments();
  }

  const getSourceimg = (item) => {
    let x = ''
    let i = item.lastIndexOf('.');
    for (let index = i + 1; index < item.length; index++) {
      x += item[index]
    }
    if(x === 'png' || x==='jpg' || x==='gif' || x==='jpeg'){
      return '/src/assests/image.png';
    }
    if (x === 'docx' || x === 'doc') {
      console.log("hello");
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

  const getimagesource = (type) => {
    if(type==='legal'){
      return '/src/assests/legalUpdate.png';
    }
    if(Type==='bank'){
      
    }
    if(Type === 'audit'){

    }
  }

  const getFormattedDate = (date) => {

    let timeStamp = Date.parse(date);
    var date = new Date(timeStamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var dateVal = date.getDate();
    var formattedDate = dateVal + 'th ' + month + ', ' + year;
    return formattedDate;
  }

  return (
    <>
      <div className="mainDiv">
        <span className="filterDocuments">Filter Documents</span>
        <select defaultValue="all" name="documentType" className="documentDropdown" onChange={changeDocumentsType} >
          <option value="all">
            All
          </option>
          <option value="legal">
            Legal Update
          </option>
          <option value="bank">
            Bank Statements
          </option>
          <option value="audit">
            Audit Reports
          </option>
        </select>
        <div className="DocumentsDiv">
          {
            Documents.length ?
              Documents.map((item) => {
                return (
                  <Card className="DocumentCard">
                    <Card.Title >
                    <img  height="100px" width="100px" style={{marginTop:"10px"}} src={getimagesource(item.Type)} ></img>
                    </Card.Title>
                    
                    <Card.Body>
                      <p style={{ letterSpacing: "1px", fontSize: "20px", textDecorationLine:"underline", textUnderlineOffset:"10px", textDecorationColor:"gray"}}>{types[String(item.Type)]}</p>
                      <div className="DisplayDiv">
                        <div style={{display:"flex", justifyContent:"space-evenly"}}>
                          <img src={getSourceimg(item.Name)} height="25px" width="25px"></img>
                          <Card.Title style={{ letterSpacing: "0.5px", fontSize: "16px" , marginLeft:"10px"}}>{item.Name}</Card.Title>
                        </div>
                        <span>{getFormattedDate(item.UploadDate)}</span>
                      </div>
                      <Card.Text>

                      </Card.Text>
                      <Button variant="primary" target="blank" href={"https://" + item.Hash + ".ipfs.w3s.link/" + item.Name} className="viewDocumentButton">
                        <img src="/src/assests/document.png" height="20px" width = "20px" style={{marginRight:"10px"}}></img>View Document</Button>
                    </Card.Body>
                  </Card>
                );
              })
              :
              <p style={{ letterSpacing: "1px", fontSize: "20px", marginLeft: "20px", color: "rgb(83, 74, 26)", textAlign: "center", marginTop: "20px", }}>No Documents :(</p>
          }
        </div>
      </div>
    </>
  );
}

export default BasicExample;