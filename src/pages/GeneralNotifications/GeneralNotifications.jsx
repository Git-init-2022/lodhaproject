import React from "react";
import './GeneralNotifications.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from '/src/context/StateContext';
import Web3 from "web3"
import imageUpload from '../../../blockchain/build/contracts/imageUpload.json';
import myconfig from "../../../myconfig.json";
import { Web3Storage } from "web3.storage";
import { RiFileHistoryLine, RiFileHwpLine } from "react-icons/ri";


function GeneralNotifications() {
    const [modalShow, setModalShow] = useState(false);
    const [generalNotifications, setGeneralNotifications] = useState([]);
    const [titleVar, setTitleVar] = useState('');
    const [DescVar, setDescVar] = useState('');
    const [fileHash, setFileHash] = useState("");
    const { User } = useGlobalContext();
    const [isAdmin, setisAdmin] = useState(JSON.parse(User).Role === 'admin');

    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);

    const loadWeb3 = async () => {
        if (window.etherum) {
            window.web3 = new Web3(window.etherum);
            await window.etherum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Etherum browser detected. You should consider trying MetaMask");
        }
    }
    const loadBlockChainData = async () => {
        const web3 = window.web3;
        console.log("web3: ", web3);
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        console.log("accounts : ", accounts);
        const networkId = await web3.eth.net.getId()
        const networkData = imageUpload.networks[networkId];
        if (networkData !== "" && networkData !== null) {
            const contract = new web3.eth.Contract(imageUpload.abi, networkData.address);
            setContract(contract);
        } else {
            window.alert("Smart Contract not found on network address");
        }
    }

    const fetchNotifications = async () => {
        const { data } = await axios.get("http://localhost:4000/api/v1/AllNotifications");
        setGeneralNotifications(data.notifications);
    }

    const fetchfromBlockchain = async(id)=> {
        const fetch = async(id)=> {
            const fileHash1 = 1;
            contract.methods.retrieveHash(id).send({ from: account }).then((res) => {
                console.log("Data added to blockchain node: ", res);
                window.alert("file added to blockchain node");
            })
            setFileHash(fileHash1);
            console.log("blockchain: ", fileHash1);
        }
        fetch(id);
    }
    
    useEffect(() => {
        fetchNotifications();
        console.log(generalNotifications);
        const starter = async () => {
            await loadWeb3();
            await loadBlockChainData();
        };
        starter();
    }, [generalNotifications.length]);
    const handleHide = () => {
        setDescVar('');
        setTitleVar('');
        setModalShow(false);
    }
    const handleShow = (Title, Description,id) => {

        setModalShow(true);
        setTitleVar(Title); 
        setDescVar(Description);
        fetchfromBlockchain(id);
    }
    return (
        <>
            <div className="NotifyItems">
                <p className='NotifyHeader' >GENERAL NOTIFICATIONS</p>
                <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>Note - To View details click on MORE INFO</p>
                <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
                {

                    generalNotifications.map((item, index) => {
                        return (
                            <div key={index}>
                                <Button variant="primary" onClick={() => handleShow(item.Title, item.Description, item._id)} className="modalButton">
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <span className="NotifyHeading">
                                            <div>
                                                <p style={{ textDecorationLine: "underline",textUnderlineOffset:"10px" }}>TITLE</p>
                                                <p>{item.Title}</p>
                                            </div>
                                        </span>
                                        <span style={{ padding: "3px", borderRadius: "5px", marginTop: "20px", paddingLeft: "10%"}}>MORE INFO</span>
                                        {/* <span className="NotifyView">
                                            <button className="Viewbutton" style={{ padding: "3px", borderRadius: "5px", marginTop:"20px" }}>More &rarr;</button>
                                        </span> */}
                                    </div>
                                </Button>
                                <hr style={{ width: "94%", marginLeft: "3%" }}></hr>

                            </div>
                        )
                    })

                }
                <Modal
                    show={modalShow}
                    onHide={handleHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {titleVar}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={"https://"+fileHash+"ipfs.w3s.link/tree-736885__480.jpg"} widht="100px" height="100px"></img>
                        <p>
                            Description : {DescVar}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default GeneralNotifications;