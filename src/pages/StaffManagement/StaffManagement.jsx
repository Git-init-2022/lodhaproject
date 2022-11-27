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

const StaffManagement = () => {
  const [Admins, setAdmins] = useState([]);
  const [Facility, setFacility] = useState([]);
  const [Account, setAccount] = useState([]);
  const [Support, setSupport] = useState([]);
  const [users, setUsers] = useState([]);
  const { User } = useGlobalContext();
  const roles = ['admin', 'user', 'am', 'fm'];
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

  const Edit = async (user) => {

    const { data } = await axios.get("http://localhost:4000/api/v1/userupdate", { params: { user: user } });
    refreshPage();
  }

  const HandleEdit = (item) => {
    const Role = document.getElementById("StaffRole").value;
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
        <div>
          <div className="StaffTitleDiv">
            <div className="sideLines" ></div>
            <p id="userDashboardTitle" style={{ marginLeft: "5px", marginRight: "5px", color: "rgb(148, 133, 48)" }}>ADMINS</p>
            <div className="sideLines"></div>
          </div>
          <div className="displayUsers">
            {
              Admins.length ?
                Admins.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                          <img src="/src/assests/admin.png" width="200px" height="200px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "100%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" id="StaffRole">
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
                                <span style={{ marginLeft: "10px" }}>Edit Staff</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete Staff</span> </button>
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
          <div className="StaffTitleDiv">
            <div className="sideLines" style={{ width: "36%" }} ></div>
            <p id="userDashboardTitle" style={{ marginLeft: "2px", marginright: "2px", color: "rgb(148, 133, 48)" }}>FACILITY MANAGEMENT</p>
            <div className="sideLines" style={{ width: "35%" }}></div>

          </div>
          <div className="displayUsers">
            {
              Facility.length ?
                Facility.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                          <img src="/src/assests/admin.png" width="200px" height="200px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "100%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" id="StaffRole">
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
                                <span style={{ marginLeft: "10px" }}>Edit Staff</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete Staff</span> </button>
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
          <div className="StaffTitleDiv">
            <div className="sideLines" style={{ width: "37%" }} ></div>
            <p id="userDashboardTitle" style={{ marginLeft: "2px", marginright: "2px", color: "rgb(148, 133, 48)" }}>FINANCE &amp; ACCOUNT</p>
            <div className="sideLines" style={{ width: "37%" }}></div>

          </div>
          <div className="displayUsers">
            {
              Account.length ?
                Account.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                          <img src="/src/assests/admin.png" width="200px" height="200px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "100%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" id="StaffRole">
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
                                <span style={{ marginLeft: "10px" }}>Edit Staff</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete Staff</span> </button>
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
          <div className="StaffTitleDiv">
            <div className="sideLines" style={{ width: "43%" }} ></div>
            <p id="userDashboardTitle" style={{ marginLeft: "2px", marginright: "2px", color: "rgb(148, 133, 48)" }}>IT SUPPORT</p>
            <div className="sideLines" style={{ width: "43%" }}></div>

          </div>
          <div className="displayUsers">
            {
              Support.length ?
                Support.map((i) => {
                  return (
                    <form>
                      <div className="DisplayCard">
                        <div>
                          <img src="/src/assests/admin.png" width="200px" height="200px" style={{ margin: "25px" }}></img>

                        </div>
                        <div style={{ width: "100%", marginTop: "5px" }}>
                          <label className="StaffLabel">name</label>
                          <span className="StaffValue">{i.OwnerName}</span>
                          <br></br>
                          <label className="StaffLabel">role</label>
                          <select defaultValue={i.Role} name="Role" id="StaffRole">
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
                                <span style={{ marginLeft: "10px" }}>Edit Staff</span></button>
                            </Popconfirm>
                            <Popconfirm
                              title="Click ok to Confirm Deletion of user"
                              onConfirm={() => HandleDelete(i)}>
                              <button className="btn btn-danger DeleteButton" style={{ width: "45%", marginLeft: "10px" }}>
                                <img src="/src/assests/Delete.png" height="20px" width="20px"></img>
                                <span style={{ marginLeft: "10px" }}>Delete Staff</span> </button>
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

    </>
  );
}

export default StaffManagement;
