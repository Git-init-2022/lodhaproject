import React from 'react';
import './Dropdown.css';
import Accordion from 'react-bootstrap/Accordion';
import { useGlobalContext } from '/src/context/StateContext';
import { useState } from 'react';
function Dropdown() {
  const { User } = useGlobalContext();
  const [isAdmin, setIsAdmin] = useState(User === null ? false : JSON.parse(User).Role !== 'user' ? true : false);

  return (
    <>
    
        <div className="sidenav">

          <Accordion>
            <Accordion.Item eventKey="3">
              <Accordion.Header><p className='DropDownHeader'>Owners Section</p></Accordion.Header>
              <Accordion.Body className='ExpandDropDown'>
                <a href='/SocietyDues'>Society Dues</a>
                <a href='/Ois'>Owners Information System</a>
                <a href='/Parking'>Parking Allotment Chart</a>
                <a href='/HelpDesk'>Help Desk</a>
              </Accordion.Body>
            </Accordion.Item>
            {
              isAdmin ?
                <Accordion.Item eventKey="0">
                  <Accordion.Header><p className='DropDownHeader'>Management</p></Accordion.Header>
                  <Accordion.Body className='ExpandDropDown'>
                    {(JSON.parse(User).Role === 'admin' || JSON.parse(User).Role === 'am') ? <a href='/Finance'>Finance & Account</a> : <></>}
                    {(JSON.parse(User).Role === 'admin' || JSON.parse(User).Role === 'fm') ? <a href='/FM'>FM</a> : <></>}
                    <a href='/Cultural'>Cultural Section</a>
                    <a href='/AllComplaints'>All Complaints</a>
                    <a href='/LegalUpdate'>Legal Update</a>
                    <a href='/Purchase'>Purchase & Audit Section</a>
                    <a href='/KeyContacts'>Key Contacts & Email ids</a>
                    {JSON.parse(User).Role === 'admin' ? <a href='/StaffManagement'> Staff Management</a> : <></>}
                  </Accordion.Body>
                </Accordion.Item>
                : <></>
            }
            <Accordion.Item eventKey="1">
              <Accordion.Header><p className='DropDownHeader'>Repository</p></Accordion.Header>
              <Accordion.Body className='ExpandDropDown'>
                <a href='/SocietyByLaws'>Society By-Laws</a>
                <a href='/ProcessDocs'>Process & Policy Documents </a>
                <a href='/Communication'>Key Communication</a>
                <a href='/PreviousYearsData'>Previous Years Data</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><p className='DropDownHeader'>Key Reports</p></Accordion.Header>
              <Accordion.Body className='ExpandDropDown'>
                <a href='/Accounting'>Accounting</a>
                <a href='/Annexures'>Annexures to OIS Details</a>
                <a href='/BankStatements'>Bank Statements</a>
                <a href='/AuditReports'>Audit Reports</a>
                <a href='/NewProposals'>New Proposals for Society</a>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header ><p className='DropDownHeader'>Key Links</p></Accordion.Header>
              <Accordion.Body className='ExpandDropDown'>
                {isAdmin ? <a href="/Meeting">Set-Up a Meeting</a> : <></>}
                {isAdmin ? <a href="/CreateForm">Create Survey Forms</a> : <></>}
                {isAdmin ? <a href='/Cultural'>Cultural Activities</a> : <></>}
                {/* <a href='/Notifications'>Upcoming Zoom Meetings</a> */}
                <a href='/MyGate'>My Gate</a>
                {/* <a href='/Forms'>Google Forms</a> */}
                <a href='/Emergency'>Emergency Services</a>
                <a href='/Vendors'>Vendors Directory & Negotiated Rates</a>
                {/* <a href='/Translation'>Google Translation</a> */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </div>
      
    </>
  );
}

export default Dropdown;