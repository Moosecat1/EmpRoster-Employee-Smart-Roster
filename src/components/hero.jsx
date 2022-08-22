import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function Hero() {
    
    return (
        //    <div className="container-fluid text-sm-center p-5 bg-white">
        <Container fluid class="d-flex justify-content-center">
            <Row>
                <Col class="text-center">
                    <h1 className="display-2">Emproster</h1>
                </Col>
            </Row>
            <Row>
                <Col class="text-center">
                    <p className="lead">A sleek, easy to learn Employee management application</p>
                </Col>
            </Row>
            <Row>
                <Col class="text-center">
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button>About</Button>
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Second group">
                    <Button>Get Started</Button>
                </ButtonGroup>
                </Col>
            </Row>
        </Container>
        // </div>


    );

}