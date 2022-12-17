import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './LoginNavBar.css';
import Dropdown from '../DropDown/Dropdown';
import { useGlobalContext } from '/src/context/StateContext'

function LoginNavBar() {
    const [Menu, setMenu] = useState(false);
    const { setIsAuthenticated, setUser, setLoading, isAuthenticated, User } = useGlobalContext();

    const changes = () => {
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("User", null);
        setIsAuthenticated(false);
        setUser(null);
    }


    return (
        <div id="nav-container">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/Home">
                        <a>
                            <img id="MeridianLogo" src="/src/assests/lodhalogo.svg" alt="logo" />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto NavClass">
                        </Nav>
                        <div className='navBarLinkActive'>
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link id="Menu" onClick={() => { setMenu(!Menu) }}><img src="/src/assests/menu.png" height="25px" width="25px"></img><span style={{ padding: "10px" }}>Menu</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link id="Menu" href='/UserDashboard'><img src="/src/assests/dashboardnav.png" height="25px" width="25px"></img><span style={{ padding: "10px" }}>Dashboard</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link id="User" href="/"><img src="/src/assests/home.png" height="25px" width="25px"></img><span style={{ padding: "10px" }}>Home</span></Nav.Link>
                                </Nav.Item>

                                <NavDropdown
                                    id="LoginDropdown"
                                    title={JSON.parse(User).OwnerName}
                                    menuVariant="dark"
                                    
                                >
                                    <div className="ProfileDiv" style={{ display: "flex" }}>
                                        <img src="/src/assests/profile.png" style={{ paddingLeft: "5px", height: "30px", width: "40px" }}></img>
                                        <NavDropdown.Item href="/UserProfile" className='loginDropDownMenu'>PROFILE</NavDropdown.Item>
                                    </div>
                                    <NavDropdown.Divider />
                                    <div className='ProfileDiv' style={{ display: "flex" }}>
                                        <img src="/src/assests/logout.png" style={{ paddingLeft: "10px", height: "28px", width: "38px" }}></img>
                                        <NavDropdown.Item href="/" onClick={() => { changes(); }} className='loginDropDownMenu'>
                                            LOGOUT
                                        </NavDropdown.Item>
                                    </div>
                                </NavDropdown>

                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {Menu && <Dropdown />}
        </div>
    );
}

export default LoginNavBar;