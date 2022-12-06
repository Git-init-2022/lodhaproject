import React, { useState } from "react";
import LoginNavBar from "/src/components/LoginNavBar/LoginNavBar"
import "./SocietyDues.css";
import axios from "axios"
import { useEffect } from "react";
import { useGlobalContext } from "/src/context/StateContext";
import { Button, Table } from "antd";


function SocietyDues() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setuser] = useState([]);
    const { User } = useGlobalContext();
    const [Penalty, setPenalty] = useState(100);
    const [total, setTotal] = useState(10);

    const columns = [
        {
            title: "Due Name",
            dataIndex: "name",
            className: "columns"
        },
        {
            title: "Due Date",
            dataIndex: "date",
            className: "columns"
        },
        {
            title: "Amount",
            dataIndex: "amount",
            className: "columns"
        }
    ]


    const data = []
    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            name: "Maintainence due",
            date: (Date.now()),
            amount: 100
        })
    }


    const onSelectChange = newSelectedRowKeys => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        className: "checkButton",
        onChange: onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0


    const currency = function (number) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(number);
    };

    const fetchDues = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/singleUser", { params: { FlatNo: JSON.parse(User).FlatNo } })
        setuser(data.user1);
        console.log(user);
    }

    useEffect(() => {
        fetchDues();
    }, [user.length])

    return (
        <>
            <LoginNavBar />
            <div>
                <div style={{ display: "flex", marginTop: "100px", justifyContent: "center" }}>
                    <img src="/src/assests/society.png" style={{ height: "55px", width: "50px", marginBottom: "0px", }}></img>
                    <p id="userDashboardTitle">SOCIETY DUES</p>
                </div>
                <div>
                    <p className="Remainingdues reveal">Remaining Dues - {user.length > 0 ? currency(user.at(0).Dues) : currency(0)}</p>
                </div>
                <div className="duesDiv">
                    <div className="TableValues">
                        <span className="selectionText" style={{ marginLeft: "20px", fontSize: "18px", letterSpacing: "1px" }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : "Please click the Check Box to select"}
                        </span>

                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} style={{ marginLeft: "20px", border: "1px solid #E5E4E2", padding: "20px", marginTop: "20px", marginBottom: "100px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "10px" }} />
                    </div>
                    <div className="PaymentDiv">
                        <div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", marginBottom: "0px" }}>
                                <img src="/src/assests/payment.png" style={{ height: "40px", width: "40px", marginBottom: "0px", }}></img>
                                <p className="PaymentText">PAYMENT</p>

                            </div>
                            <hr style={{ width: "94%", marginLeft:"3%" ,height: "2px", backgroundColor: "gray" }}></hr>

                            <div>
                                <div className="paymentOptions">
                                <span className="amount">
                                    Total Payable Amount 
                                </span>
                                <span className="amount">
                                    {currency(0)} 
                                </span>
                                </div>
                                <div className="paymentOptions">
                                <span className="amount">
                                    Penalty 
                                </span>
                                <span className="amount">
                                    {currency(0)} 
                                </span>
                                </div>
                            </div>
                            <hr style={{ width: "94%", marginLeft:"3%" ,height: "2px", backgroundColor: "gray" }}></hr>
                            <div className="Total" >
                                <span className="amount">
                                    Total Amount 
                                </span>
                                <span className="amount">
                                    {currency(Penalty + total)} 
                                </span>
                                </div>
                                
                            <button className="btn btn-primary payButton">PAY {currency(Penalty + total)} &rarr;</button>
                        </div>
                    </div>
                </div>
                </div>
        </>
    );
}

export default SocietyDues;
