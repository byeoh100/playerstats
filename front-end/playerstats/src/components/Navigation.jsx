import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.css';
import { Link } from 'react-router-dom';
import AuthController from './AuthController';

import { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Dropdown } from 'react-bootstrap'

import AuthPopup from './AuthPopup';
import { logOut } from '../utilities';

function NavSearch({ user, setUser }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleLogOut = async (e) => {
        setUser(await logOut());
    };

    return (
        <>
            <Container fluid style={{ padding: 0 }}>
                <Navbar expand="lg" style={{ backgroundColor: "#0C1E45" }}>
                    <Container>
                        <Navbar.Brand href="/" style={{ color: "white" }}>
                            <img
                                alt=""
                                src="./src/assets/basketball.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            Player<strong>Stats</strong></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0">
                                <Nav.Link as={Link} to="/get-stats" style={{ color: "white" }}>
                                    Player
                                </Nav.Link>
                                <Nav.Link as={Link} to="/compare-stats" style={{ color: "white" }}>
                                    Team
                                </Nav.Link>
                                <Nav.Link style={{ color: "white" }}>
                                    Community
                                </Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Dropdown align="end">
                                <Dropdown.Toggle as="div" id="dropdown-custom-components">
                                    <Image
                                        src={!user ? "./src/assets/avatar.jpg" : "./src/assets/loggedinuser.jpg"}
                                        roundedCircle
                                        width="40"
                                        height="40"
                                        alt="User Avatar"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Dropdown.Toggle>

                                {!user ?
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={openPopup}>Login/Signup</Dropdown.Item>
                                    </Dropdown.Menu>
                                    :
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={async () => setUser(await handleLogOut())}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                }
                            </Dropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
            {isPopupOpen && <AuthPopup onClose={closePopup} setUser={setUser} />}
        </>
    );
}

export default NavSearch;