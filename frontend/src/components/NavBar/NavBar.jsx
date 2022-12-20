import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Dropdown from '../DropDown/Dropdown';

function Header() {

  const [Menu, setMenu] = useState(false);

  return (
    <div id="nav-container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <a>
              <img id="MeridianLogo" src="/src/assests/lodhalogo.svg" alt="logo" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto NavClass">
            </Nav>
            <Nav>
              {/* <Nav.Link id="Menu" onClick={() => { setMenu(!Menu) }}>Menu</Nav.Link> */}
              <Nav.Link id="User" href="/login"> Login / Register</Nav.Link>
              <Nav.Link id ="User" href="/"> HOME </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {Menu && <Dropdown />}
    </div>
  );
}

export default Header;