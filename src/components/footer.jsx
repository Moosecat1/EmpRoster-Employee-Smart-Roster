import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/footer.css'
import Logo from '../resources/NavLogoSvg.svg';
import twitter from '../resources/twitter.svg';
import facebook from '../resources/facebook.svg';
import instagram from '../resources/instagram.svg';
function Footer() {

    return (
        <Container fluid className="text-center footer-body">
            <Container className="footer">
                <Row>
                    <Col>
                    <h2>About</h2>
                    <p className='footer-text'>FAQ</p>
                    <p className='footer-text'>Products</p>
                    <p className='footer-text'>Licensing</p>
                    </Col>
                    <Col>
                    <h2>Contact Us</h2>
                    <p className='footer-text'>Email</p>
                    </Col>
                    <Col>
                    <h2>Social Media</h2>
                    <img src={twitter} alt="logo" width="30" height="30"></img>
                    <img src={facebook} alt="logo" width="30" height="30"></img>
                    <img src={instagram} alt="logo" width="30" height="30"></img>
                    </Col>
                </Row>
                <Row><img src={Logo} alt="logo" width="194" height="55"></img></Row>
                <Row className="text-center"><p>&copy;{new Date().getFullYear()} EmpRoster - All Rights Reserved </p></Row>
            </Container>
        </Container>
    );
}

export default Footer;
