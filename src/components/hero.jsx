import {Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";

export default function Hero()
{
    return(
        <div className="container-fluid text-sm-center p-5 bg-white">
            <h1 className="display-2">Emproster</h1>
            <p className="lead">A sleek, easy to learn Employee management application</p>
            <ButtonGroup className="me-2" aria-label="First group">
                <Button>About</Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="Second group">
                <Button>Get Started</Button>
            </ButtonGroup>
        </div>


    );

}