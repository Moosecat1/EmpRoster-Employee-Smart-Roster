import React from 'react';
import '../css/footer.css';
import emprlogo from '../resources/logo.png';

function Footer() {
    return (
        <section className="footer fixed-bottom">
            <hr className="footer-seperator"/>
            <section className="footer-info">
                <section className="footer-info-left">
                    <section className="footer-info-name">
                        <img className="logo-holder" src={emprlogo} alt="logo"></img>
                        EmpRoster
                    </section>
                    <section className="footer-info-email">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Subscribe for the latest news:</label>
                                <br />
                                <input type="email" className="footer-info-text-field" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Email"></input>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </section>
                    <section className="footer-info-copyright">
                        &copy;{new Date().getFullYear()} EmpRoster - All Rights Reserved
                    </section>
                </section>
                <section className="footer-info-center">
                    <section className="footer-info-our-story">
                        Our Story
                    </section>
                    <section className="footer-info-FAQ">
                        FAQ
                    </section>
                    <section className="footer-info-contact">
                        Contact
                    </section>
                </section>
                <section className="footer-info-right">
                    <section className="footer-info-products">
                        Products
                    </section>
                    <section className="footer-info-smart-roster">
                        Smart Roster
                    </section>
                    <br />
                    <br />
                    <br />
                    <section className="footer-info-social">
                        <i className="bi bi-facebook"></i>
                        <i class="bi bi-twitter"></i>
                        <i class="bi bi-instagram"></i>
                        <i class="bi bi-linkedin"></i>
                    </section>
                </section>
            </section>
            <hr className="footer-seperator"/>
        </section>
    )
}
export default Footer;
