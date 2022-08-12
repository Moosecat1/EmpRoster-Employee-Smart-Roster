import '../css/Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../resources/lo.png';
import {Box} from "@mui/material";


function Navi() {

if(sessionStorage.getItem("emp_id")!= null) {
    return(
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={Logo}
                        width="194"
                        height="55"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"/>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/About">About</Nav.Link>
                        <Nav.Link href="/FAQ">FAQ</Nav.Link>
                    </Nav>
                    <Nav onSelect={(selectedKey) => {
                        sessionStorage.clear();
                    }}>
                        <Nav.Link href="/login">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
else{
        return (
            <Navbar collapseOnSelect expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={Logo}
                            width="194"
                            height="55"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"/>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/About">About</Nav.Link>
                            <Nav.Link href="/FAQ">FAQ</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register/createcompany">
                                Sign-up
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navi;