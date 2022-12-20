import { Alert, Avatar, Badge, Popconfirm } from "antd";
import Toast from 'react-bootstrap/Toast';
import { BellFilled } from "@ant-design/icons"
import React, { useState } from "react";
import { useEffect } from "react";
import { useGlobalContext } from '/src/context/StateContext';
import axios from "axios";
import "./UserNotification.css"


function UserNotification() {
    const [count, setCount] = useState(0);

    const [Notifications, setNotifications] = useState([]);
    const { User } = useGlobalContext();

    const compare = (a, b) => {
        return a.Flag - b.Flag;
    }

    const fetchNotifications = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/getUserNotifications", { params: { FlatNo: JSON.parse(User).FlatNo } })
        const temp = data.userNotifications;
        temp.sort(compare);
        setNotifications(temp)


    }

    const refreshPage = () => {
        window.location.reload();
    }



    useEffect(() => {
        fetchNotifications();
        let temp = 0;
        for (let Notification of Notifications) {
            if (Notification.Flag === 0) {
                temp++;
            }
        }
        console.log(Notifications);
        setCount(temp);
    }, [Notifications.length]);

    const updateNotification = async (item) => {
        // alert("hello");
        const { data } = await axios.get("http://localhost:4000/api/v1/updateUserNotification", { params: { item: item } });
        refreshPage();
    }

    const markAsRead = (item) => {
        item.Flag = 1;
        updateNotification(item);

    }

    const Delete = async(item) => { 
        const { data } = await axios.get("http://localhost:4000/api/v1/deleteUserNotification", { params: { item: item } });
        refreshPage();
    }

    const DeleteNotification = (item) => {
        alert("are you sure you want to delete");
        Delete(item);
    }

    const getduration = (Time) => {
        let timeStamp = Date.parse(Time);
        var date1 = new Date(timeStamp);
        var date2 = new Date();

        var Difference_In_Time = date2.getTime() - date1.getTime();
        var days = Difference_In_Time / (1000 * 3600 * 24);
        if (days < 1) {
            var hours = Difference_In_Time / (1000 * 60 * 60);

            if (hours < 1) {
                var minutes = Difference_In_Time / (1000 * 60);
                minutes = (Math.ceil(minutes)).toString();
                minutes = minutes + ((minutes > 1) ? " minutes " : " minute ");
                return minutes;
            }
            else {
                hours = (Math.ceil(hours)).toString();
                hours = hours + ((hours > 1) ? " hours " : " hour ");
                return hours;
            }

        }
        else {
            days = (Math.ceil(days)).toString();
            days = days + ((days > 1) ? " days " : " day ");
            return days;
        }

    }
    return (
        <>
            <div>

                <div className="notificationBlockdiv" >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Badge count={count} style={{ marginTop: "30px" }}>
                            <Avatar shape="circle" size="large" icon={<BellFilled />} style={{ color: "#675A0E", backgroundColor: "#F5F5F5", marginTop: "20px" }} />
                        </Badge>
                        <p id="title" style={{ color: "#675A0E", marginBottom: "0px" }}>NOTIFICATIONS</p>
                    </div>
                    <hr></hr>
                    <div className="alertDiv" style={{ width: "100%", display: "grid", gridTemplateColumns: "auto ", rowGap: "20px", padding: "20px" }} >
                        {
                            Notifications.length ?
                            Notifications.map((item) => {
                                return (
                                    <>
                                        {item.Flag === 0 ?
                                        
                                            <Toast style={{ width: "100%",}} onClose={() => DeleteNotification(item)}>
                                                <Toast.Header style={{ backgroundColor: "rgb(245, 242, 242)" }}>

                                                    <div style={{ display: "flex", justifyContent: "space-between", width: "90%"}}>
                                                        <div>
                                                            {/* <img width="15px" height="15px"
                                                            src="/src/assests/info.png"
                                                             /> */}
                                                            <span style={{ letterSpacing: "1px", fontSize: "16px" ,fontWeight: "bold", marginLeft: "5px", marginTop: "5px", color: "black" }}>
                                                                {item.NotificationTitle}
                                                            </span>
                                                        </div>

                                                        <span style={{ fontSize: "12px" }}>
                                                            {getduration(item.Time) + "ago"}
                                                        </span>
                                                    </div>
                                                </Toast.Header>
                                                <Toast.Body>
                                                    <p style={{ letterSpacing: "1px", color: "#675A0E" }}>{item.NotificationDesc}</p>
                                                    <Popconfirm
                                                    title="Are you sure you want to mark notification as read" onConfirm={() => markAsRead(item)}>
                                                     <button style={{ border: "none", color: "#1E90FF", float: "right", backgroundColor: "white" }} >Mark as read</button>
                                                     </Popconfirm>
                                                </Toast.Body>
                                            </Toast>
                                            :
                                            <Toast style={{ width: "100%" }} onClose={() => DeleteNotification(item)}>
                                                <Toast.Header style={{ backgroundColor: "rgb(245, 242, 242)" }}>

                                                    <div style={{ display: "flex", justifyContent: "space-between", width: "90%", }}>
                                                        <div>
                                                            {/* <img width="15px" height="15px"
                                                            src="/src/assests/info.png"
                                                             /> */}
                                                            <span style={{ letterSpacing: "1px", fontSize: "18px", fontWeight: "bold", marginLeft: "5px", marginTop: "5px", color: "black" }}>
                                                                {item.NotificationTitle}
                                                            </span>
                                                        </div>

                                                        <span style={{ fontSize: "12px", color: "black" }}>
                                                            {getduration(item.Time) + "ago"}
                                                        </span>
                                                    </div>
                                                </Toast.Header>
                                                <Toast.Body style={{ backgroundColor: "rgb(223, 222, 220)" }}>
                                                    <p style={{ letterSpacing: "1px", color: "#675A0E" }}>{item.NotificationDesc}</p>
                                                    {item.Flag === 0 ? <button style={{ border: "none", color: "#1E90FF", float: "right", backgroundColor: "white" }} onClick={() => markAsRead(item)}>Mark as read</button> : <></>}
                                                </Toast.Body>
                                            </Toast>
                                        }

                                    </>
                                );
                            })
                            :
                            <p style={{textAlign:"center", letterSpacing:"1px", fontSize:"18px"}}>No Notifications!</p>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserNotification;