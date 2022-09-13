import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../css/Carousel.css'
import desk from '../resources/deskD.jpg';
import calculator from '../resources/calculatorD.jpg';
import pencils from '../resources/pencilsD.jpg';
import { Button, ButtonGroup} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
                {/* <ButtonGroup className="me-2" aria-label="First group">
                    <Button>About</Button>
                </ButtonGroup> */}
                <ButtonGroup>
                    <Button>Get Started</Button>
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
                    <h1 style={{ color: 'white' }}>Who are we?</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <p style={{ color: 'white' }}>Find out more below</p>
                </Col>
            </Row>
            
            <Row>
                <Col>
                {/* <ButtonGroup className="me-2" aria-label="First group">
                    <Button>About</Button>
                </ButtonGroup> */}
                <ButtonGroup>
                    <Button>About</Button>
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
                    <h1 style={{ color: 'white' }}>Questoions?</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <p style={{ color: 'white' }}>Find out the answers to some commonly asked questions related to our product below</p>
                </Col>
            </Row>
            
            <Row>
                <Col>
                {/* <ButtonGroup className="me-2" aria-label="First group">
                    <Button>About</Button>
                </ButtonGroup> */}
                <ButtonGroup>
                    <Button>FAQ</Button>
                </ButtonGroup>
                </Col>
            </Row>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
    

export default CarouselComp;