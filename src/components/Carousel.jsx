import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../css/Carousel.css'
import desk from '../resources/deskD.jpg';
import calculator from '../resources/calculatorD.jpg';
import pencils from '../resources/pencilsD.jpg';
import { Button, ButtonGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

function CarouselComp() {
    return (
        <Carousel className='Carousel' variant="dark">
            <Carousel.Item className='Carousel-bar'>
                <img
                    className="d-block width-100 Carousel-image"
                    src={desk}
                    alt="First slide"
                />
                <Carousel.Caption className='Carousel-color'>

                    <Row>
                        <Col >
                            <h1 style={{ color: 'white' }}>Emproster</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p style={{ color: 'white' }}>A sleek, easy to learn Employee management application</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Link to="/Login">
                                    <Button>Get Started</Button>
                                </Link>
                            </ButtonGroup>
                        </Col>
                    </Row>

                </Carousel.Caption>
            </Carousel.Item >
            <Carousel.Item >
                <img

                    className="d-block width-100 Carousel-image"
                    src={calculator}
                    alt="Second slide"
                />

                <Carousel.Caption className='Carousel-color'>
                    <Row>
                        <Col >
                            <h1 style={{ color: 'white' }}>Who Are We?</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p style={{ color: 'white' }}>Find out more below</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Link to="/About">
                                    <Button>About</Button>{

                                    }
                                </Link>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className='Carousel-bar'>
                <img
                    className="d-block width-100 Carousel-image"
                    src={pencils}
                    alt="Third slide"
                />

                <Carousel.Caption className='Carousel-color'>
                    <Row>
                        <Col >
                            <h1 style={{ color: 'white' }}>Questions?</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p style={{ color: 'white' }}>Find out the answers to some commonly asked questions related to our product below</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>

                            <ButtonGroup>
                                <Link to="/FAQ">
                                    <Button>FAQ</Button>
                                </Link>
                            </ButtonGroup>

                        </Col>
                    </Row>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}


export default CarouselComp;