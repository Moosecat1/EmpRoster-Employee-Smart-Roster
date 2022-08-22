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

                <Row><p style={{ color: "grey" }}>Emproster</p></Row>
                <Row>
                    <Col>
                    <h2>About</h2>
                    <p>FAQ</p>
                    <p>Products</p>
                    <p>Licensing</p>
                    </Col>
                    <Col>
                    <h2>Contact Us</h2>
                    <p>Email</p>
                    </Col>
                    <Col>
                    <h2>Social Media</h2>
                    <img src={twitter} alt="logo" width="30" height="30"></img>
                    <img src={facebook} alt="logo" width="30" height="30"></img>
                    <img src={instagram} alt="logo" width="30" height="30"></img>
                    </Col>
                </Row>
                <Row><img src={Logo} alt="logo" width="194" height="55"></img></Row>
                <Row className="text-center"> &copy;{new Date().getFullYear()} EmpRoster - All Rights Reserved </Row>
            </Container>
        </Container>
    );
}

export default Footer;


// function Footer() {
//     return (
//         <section className="footer fixed-bottom">
//             <hr className="footer-seperator"/>
//             <section className="footer-info">
//                 <section className="footer-info-left">
//                     <section className="footer-info-name">
//                         <img className="logo-holder" src={emprlogo} alt="logo"></img>
//                         EmpRoster
//                     </section>
//                     <section className="footer-info-email">
//                         <form>
//                             <div className="form-group">
//                                 <label htmlFor="exampleInputEmail1">Subscribe for the latest news:</label>
//                                 <br />
//                                 <input type="email" className="footer-info-text-field" id="exampleInputEmail1"
//                                        aria-describedby="emailHelp" placeholder="Email"></input>
//                                 <button type="submit" className="btn btn-primary">Send</button>
//                             </div>
//                         </form>
//                     </section>
//                     <section className="footer-info-copyright">
//                         &copy;{new Date().getFullYear()} EmpRoster - All Rights Reserved
//                     </section>
//                 </section>
//                 <section className="footer-info-center">
//                     <section className="footer-info-our-story">
//                         Our Story
//                     </section>
//                     <section className="footer-info-FAQ">
//                         FAQ
//                     </section>
//                     <section className="footer-info-contact">
//                         Contact
//                     </section>
//                 </section>
//                 <section className="footer-info-right">
//                     <section className="footer-info-products">
//                         Products
//                     </section>
//                     <section className="footer-info-smart-roster">
//                         Smart Roster
//                     </section>
//                     <br />
//                     <br />
//                     <br />
//                     <section className="footer-info-social">
//                         <i className="bi bi-facebook"></i>
//                         <i class="bi bi-twitter"></i>
//                         <i class="bi bi-instagram"></i>
//                         <i class="bi bi-linkedin"></i>
//                     </section>
//                 </section>
//             </section>
//             <hr className="footer-seperator"/>
//         </section>
//     )
// }
// export default Footer;
