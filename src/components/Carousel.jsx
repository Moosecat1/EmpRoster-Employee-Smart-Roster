import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../css/Carousel.css'
import desk from '../resources/desk.jpg';
import calculator from '../resources/calculator.jpg';
import pencils from '../resources/pencils.jpg';
import Hero from "../components/hero"

function CarouselComp() {
    return (
        <Carousel className='Carousel' variant="dark">
          <Carousel.Item className='Carousel-bar'>
            <img
              className="d-block w-100 Carousel-image"
              src={desk}
              alt="First slide"
            />
            <Carousel.Caption className='Carousel-color'>
            <Hero className="hero-padding" />
              <h3 className='Carousel-color'>First slide label</h3>
              <p className='Carousel-color'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item >
          <Carousel.Item className='Carousel-bar'>
            <img
            
              className="d-block w-100 Carousel-image"
              src={calculator}
              alt="Second slide"
            />
    
            <Carousel.Caption className='Carousel-color'>
              <h3 className='Carousel-color'>Second slide label</h3>
              <p className='Carousel-color'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 Carousel-image"
              src={pencils}
              alt="Third slide"
            />
    
            <Carousel.Caption className='Carousel-color'>
              <h3 className='Carousel-color'>Third slide label</h3>
              <p className='Carousel-color'>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
    

export default CarouselComp;