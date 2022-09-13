import { Button, ButtonGroup} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/hero.css'
export default function Hero() {
    
    return (
        //    <div className="container-fluid text-sm-center p-5 bg-white">
        <Container>
            <Container>
            <Row>
                <Col >
                    <h1 className="display-2 text-center">Emproster</h1>
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <p className="lead">A sleek, easy to learn Employee management application</p>
                </Col>
            </Row>
            
            <Row>
                <Col>
                {/* <ButtonGroup className="me-2" aria-label="First group">
                    <Button>About</Button>
                </ButtonGroup> */}
                <ButtonGroup aria-label="Second group">
                    <Button>Get Started</Button>
                </ButtonGroup>
                </Col>
            </Row>
        </Container>
        </Container>
        // </div>


    );

}