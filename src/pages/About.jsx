import Card from 'react-bootstrap/Card';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from 'react-bootstrap/Container';
import logo from '../resources/logo.png';
import '../css/About.css'

export default function About() {
    document.title = "EmpRoster - About"
    return (
        <main><Navbar />
            <Container className='aboutSpace'>
                <Card style={{ width: '23rem' }}>
                    <Card.Img className='imagePadding' variant="top" style={{ backgroundColor: '#0F0E0E' }} src={logo} />
                    <Card.Body>
                        <Card.Title className='text-center'><h2>About Us</h2></Card.Title>
                        <Card.Text>
                            <p>Here at EmpRoster, we set out with the goal to create an easy to use employee rostering and scheduling system that's free of all the extra clutter when compared to the other options available.</p>
                            <br></br>
                            <p>Our system is simple and easy to learn, without needing hours or even days of training, allowing for anyone to simply pick up our application and get started right away!</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <Footer /></main>
    );
}

