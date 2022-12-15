import React, { useContext, useEffect, useRef, useState } from "react"
import "antd/dist/antd.css"
import "./StaffManagement.css"
import { Form, Input, Popconfirm, Table } from "antd"
import axios from "axios"
import LoginNavBar from "/src/components/LoginNavBar/LoginNavBar"
import "antd/dist/antd.css"
const { Search } = Input;
import { useGlobalContext } from '/src/context/StateContext';
import Card from "antd/lib/card/Card"
import Meta from "antd/lib/card/Meta"
import Modal from 'react-bootstrap/Modal';
import { SemanticClassificationFormat } from "typescript"
import { Web3Storage } from "web3.storage";



const StaffManagement = () => {
  const [Admins, setAdmins] = useState([]);
  const [Facility, setFacility] = useState([]);
  const [Account, setAccount] = useState([]);
  const [Support, setSupport] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [role, setRole] = useState('');
  const [flatno, setFlatno] = useState('');
  const { User } = useGlobalContext();
  const [visible, setVisible] = useState(false);
  const roles = ['admin', 'user', 'am', 'fm', 'itsupport'];
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/users");
    setUsers(data.users);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    fetchUsers();
    const admins = []
    const support = []
    const facility = []
    const finance = []
    for (let user of users) {
      if (user.Role === 'admin') {
        admins.push(user);
      }
      else if (user.Role === 'fm') {
        facility.push(user);
      }
      else if (user.Role === 'am') {
        finance.push(user);
      }
      else if (user.Role === 'itsupport') {
        support.push(user);
      }
    }
    setAdmins(admins);
    setAccount(finance);
    setFacility(facility);
    setSupport(support);

  }, [users.length]);

  const Delete = async (FlatNo) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/userdelete", { params: { FlatNo: FlatNo } });
    refreshPage();
  }
  const createNotification = async (user, subject, message) => {
    const { data } = await axios.post("http://localhost:4000/api/v1/postNotification", { FlatNo: user.FlatNo, NotificationTitle: subject, NotificationDesc:message});
  }
  const Edit = async (user) => {

    const { data } = await axios.get("http://localhost:4000/api/v1/userupdate", { params: { user: user } });
    createNotification(user, data.subject, data.message);
    refreshPage();
  }

  const scrollUp = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (top > 0) {
      window.scrollTo(0, 0);

    }
  }

  document.addEventListener("scroll", () => {
    if (window.pageYOffset > 500)
      setVisible(true);
    else setVisible(false);
  })

  const HandleEdit = (item) => {
    const Role = document.getElementById(item.FlatNo).value;
    // console.log(Role);
    const FinalValues = {
      FlatNo: item.FlatNo,
      Email: item.Email,
      Mobile: item.Mobile,
      Block: item.Block,
      Dues: item.Dues,
      ParkingSlot: item.ParkingSlot,
      OwnerName: item.OwnerName,
      RegisteredName: item.RegisteredName,
      Role: Role
    }
    Edit(FinalValues);
  }

  const fetchUser = (FlatNo) => {
    for (let user of users) {
      if (user.FlatNo === FlatNo) {
        return user;
      }
    }
    return null;
  }

  const getStaff = (e) => {
    const FlatNo = document.getElementById("FlatNo").value;
    const user = fetchUser(FlatNo);
    if (user !== null) {
      const form = document.getElementsByClassName("submitForm").item(0).classList.remove("hide");
      const Name = document.getElementById("OwnerName");
      Name.value = user.OwnerName;
      const RegisteredName = document.getElementById("RegisteredName");
      RegisteredName.value = user.RegisteredName;
      const Mobile = document.getElementById("Mobile");
      Mobile.value = user.Mobile;

      const Email = document.getElementById("Email");
      Email.value = user.Email;
      setRole(user.Role);
      setFlatno(user.FlatNo);
    }
  }

  const addStaff = () => {
    const user = fetchUser(flatno);
    const Role = document.getElementById("UserRole").value;

    if (user !== null) {
      user.Role = Role;
      Edit(user);
    }
  }

  const HandleDelete = (item) => {
    Delete(item.FlatNo);
  }
  return (
    <>
      <LoginNavBar />
      <div>
        <div style={{ display: "flex", marginTop: "100px", justifyContent: "center", }}>
          <img src="/src/assests/staff.png" style={{ height: "55px", width: "50px", marginBottom: "0px", }}></img>
          <p id="userDashboardTitle">STAFF MANAGEMENT</p>
        </div>
        <div className="AddStaffDiv">
          <span className="AddStaffNote">Want to add Staff?</span>
          <button className="btn btn-primary addStaff" onClick={() => setModalShow(true)} style={{ padding: "10px", marginLeft: "15px" }}>Click Here</button>
        </div>

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>

            <p style={{ fontSize: "18px" }}>Get User Details</p>
            <div style={{ display: "flex" }}>
              <input placeholder="Enter Flat Number" name="FlatNo" id="FlatNo" className="staffInput" required></input>
              <button className="btn btn-primary" style={{ marginLeft: "20px" }} onClick={() => getStaff()}>Submit</button>
            </div>

            <form className="submitForm hide" >
              <span style={{ fontSize: "18px" }}>Name</span>
              <br></br>
              <input id="OwnerName" className="staffInput" disabled></input><br></br>
              <span style={{ fontSize: "18px" }}>Property Registered Name</span>
              <br></br>
              <input id="RegisteredName" className="staffInput" disabled></input>
              <br></br>
              <span style={{ fontSize: "18px" }}>Email</span>
              <br></br>
              <input id="Email" className="staffInput" disabled></input>
              <br></br>
              <span style={{ fontSize: "18px" }}>Mobile</span>
              <br></br>
              <input id="Mobile" className="staffInput" disabled></input>
              <br></br>
              <span style={{ fontSize: "18px" }}>Role</span>
              <br></br>
              <select defaultValue={role} name="Role" id="UserRole" className="staffInput">
                <option value={role}>
                  {role}
                </option>
                {
                  roles.map((item) => {

                    return (
                      item !== role ?
                        <option value={item}>{item}</option>
                        :
                        <></>
                    );

                  })
                }
              </select>

              <div >
                <div style={{ textAlign: "left" }}>
                  <ul style={{ textAlign: "left" }}>
                    <li>Enter the Flat number to get the details of new staff member</li>
                    <li>To Add Staff click on "Add Staff" button</li>
                  </ul>
                </div>
                <Popconfirm title="Click ok to Add new staff member" onConfirm={() => addStaff()}>
                  <button className="btn btn-primary" >Add Staff</button>
                </Popconfirm>
              </div>
            </form>

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
        <div>
          <div className="StaffTitleDiv" style={{display: "flex" }}>
            <div>
              <div className="sideLines" style={{width: "250px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{width: "247px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{width: "250px",marginTop: "5px" }}></div>
            </div>
            <p id="userDashboardTitle" style={{ marginLeft: "10px", color: "rgb(110, 97, 29)"}}>ADMINS</p>
            <div className="linesright">
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{marginLeft: "13px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "5px" }}></div>
            </div>
          </div>
          <div className="displayUsers">
            {
              Admins.length ?
                Admins.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                          <img src={i.ImageToken ===undefined ? "/src/assests/admin.png" : "https://" + i.ImageToken + ".ipfs.w3s.link/" + i.ImageName } width="150px" height="150px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "90%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" className="StaffRole" id={i.FlatNo}>
                            <option value={i.Role}>
                              {i.Role}
                            </option>
                            {
                              roles.map((item) => {

                                return (
                                  item !== i.Role ?
                                    <option value={item}>{item}</option>
                                    :
                                    <></>
                                );

                              })
                            }
                          </select>
                          <br></br>
                          <label className="StaffLabel">flat Number</label>
                          <span className="StaffValue" id="flatno">{i.FlatNo}</span>
                          <br></br>
                          <label className="StaffLabel">mobile Number</label>
                          <span className="StaffValue">{i.Mobile}</span>
                          <br></br>
                          <label className="StaffLabel">email</label>
                          <span className="StaffValue">{i.Email}</span>
                          <br></br>

                          <div className="staffButton">
                            <Popconfirm
                              title="Click ok to Edit User Details"
                              onConfirm={() => HandleEdit(i)}>
                              <button className="btn btn-primary editButton" style={{ width: "40%" }}>
                                <img src="/src/assests/Edit.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Edit</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete</span> </button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </form>
                  );
                }
                )

                :
                <p>No Admins to Display !</p>
            }
          </div>
        </div>

        <div>
          <div className="StaffTitleDiv" style={{display: "flex" }}>
            <div>
              <div className="sideLines" style={{width: "200px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{width: "197px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{width: "200px",marginTop: "5px" }}></div>
            </div>
            <p id="userDashboardTitle" style={{ marginLeft: "10px", color: "rgb(110, 97, 29)"}}>FACILITY MANAGEMENT</p>
            <div className="linesright">
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{marginLeft: "13px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "5px" }}></div>
            </div>
          </div>
          <div className="displayUsers">
            {
              Facility.length ?
                Facility.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                        <img src={i.ImageToken ===undefined ? "/src/assests/admin.png" : "https://" + i.ImageToken + ".ipfs.w3s.link/" + i.ImageName } width="150px" height="150px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "100%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" className="StaffRole" id={i.FlatNo}>
                            <option value={i.Role}>
                              {i.Role}
                            </option>
                            {
                              roles.map((item) => {

                                return (
                                  item !== i.Role ?
                                    <option value={item}>{item}</option>
                                    :
                                    <></>
                                );

                              })
                            }
                          </select>
                          <br></br>
                          <label className="StaffLabel">flat Number</label>
                          <span className="StaffValue" id="flatno">{i.FlatNo}</span>
                          <br></br>
                          <label className="StaffLabel">mobile Number</label>
                          <span className="StaffValue">{i.Mobile}</span>
                          <br></br>
                          <label className="StaffLabel">email</label>
                          <span className="StaffValue">{i.Email}</span>
                          <br></br>

                          <div className="staffButton">
                            <Popconfirm
                              title="Click ok to Edit User Details"
                              onConfirm={() => HandleEdit(i)}>
                              <button className="btn btn-primary editButton" type="submit" style={{ width: "45%" }}>
                                <img src="/src/assests/Edit.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Edit</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete</span> </button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </form>
                  );
                }
                )

                :
                <p>No Facility Managers to Display !</p>
            }
          </div>
        </div>

        <div>
          <div className="StaffTitleDiv" style={{display: "flex" }}>
            <div>
              <div className="sideLines" style={{width: "200px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{width: "197px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{width: "200px",marginTop: "5px" }}></div>
            </div>
            <p id="userDashboardTitle" style={{ marginLeft: "10px", color: "rgb(110, 97, 29)"}}>FINANCE &amp; ACCOUNTS</p>
            <div className="linesright">
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{marginLeft: "13px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "5px" }}></div>
            </div>
          </div>
          <div className="displayUsers">
            {
              Account.length ?
                Account.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                        <img src={i.ImageToken ===undefined ? "/src/assests/admin.png" : "https://" + i.ImageToken + ".ipfs.w3s.link/" + i.ImageName } width="150px" height="150px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "100%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" className="StaffRole" id={i.FlatNo}>
                            <option value={i.Role}>
                              {i.Role}
                            </option>
                            {
                              roles.map((item) => {

                                return (
                                  item !== i.Role ?
                                    <option value={item}>{item}</option>
                                    :
                                    <></>
                                );

                              })
                            }
                          </select>
                          <br></br>
                          <label className="StaffLabel">flat Number</label>
                          <span className="StaffValue" id="flatno">{i.FlatNo}</span>
                          <br></br>
                          <label className="StaffLabel">mobile Number</label>
                          <span className="StaffValue">{i.Mobile}</span>
                          <br></br>
                          <label className="StaffLabel">email</label>
                          <span className="StaffValue">{i.Email}</span>
                          <br></br>

                          <div className="staffButton">
                            <Popconfirm
                              title="Click ok to Edit User Details"
                              onConfirm={() => HandleEdit(i)}>
                              <button className="btn btn-primary editButton" type="submit" style={{ width: "45%" }}>
                                <img src="/src/assests/Edit.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Edit</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete</span> </button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </form>
                  );
                }
                )

                :
                <p>No Account Managers to Display !</p>
            }
          </div>
        </div>

        <div>
          <div className="StaffTitleDiv" style={{display: "flex" }}>
            <div>
              <div className="sideLines" style={{width: "240px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{width: "237px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{width: "240px",marginTop: "5px" }}></div>
            </div>
            <p id="userDashboardTitle" style={{ marginLeft: "10px", color: "rgb(110, 97, 29)"}}>IT SUPPORT</p>
            <div className="linesright">
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "20px" }}></div>
              <div className="sideLines" style={{marginLeft: "13px",marginTop: "5px" }}></div>
              <div className="sideLines" style={{ marginLeft: "10px", marginTop: "5px" }}></div>
            </div>
          </div>
          <div className="displayUsers">
            {
              Support.length ?
                Support.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                        <img src={i.ImageToken ===undefined ? "/src/assests/admin.png" : "https://" + i.ImageToken + ".ipfs.w3s.link/" + i.ImageName } width="150px" height="150px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "100%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" className="StaffRole" id={i.FlatNo}>
                            <option value={i.Role}>
                              {i.Role}
                            </option>
                            {
                              roles.map((item) => {

                                return (
                                  item !== i.Role ?
                                    <option value={item}>{item}</option>
                                    :
                                    <></>
                                );

                              })
                            }
                          </select>
                          <br></br>
                          <label className="StaffLabel">flat Number</label>
                          <span className="StaffValue" id="flatno">{i.FlatNo}</span>
                          <br></br>
                          <label className="StaffLabel">mobile Number</label>
                          <span className="StaffValue">{i.Mobile}</span>
                          <br></br>
                          <label className="StaffLabel">email</label>
                          <span className="StaffValue">{i.Email}</span>
                          <br></br>

                          <div className="staffButton">
                            <Popconfirm
                              title="Click ok to Edit User Details"
                              onConfirm={() => HandleEdit(i)}>
                              <button className="btn btn-primary editButton" type="submit" style={{ width: "45%" }}>
                                <img src="/src/assests/Edit.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Edit</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete</span> </button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </form>

                  );
                }
                )

                :
                <p>No IT support users to Display !</p>
            }
          </div>
        </div>
      </div>
      <div style={{ height: "100px" }}>
      </div>

      {visible ? <a className="move-top" onClick={scrollUp}>Scroll to Top &uarr;</a> : <></>}
    </>
  );
}

export default StaffManagement;
