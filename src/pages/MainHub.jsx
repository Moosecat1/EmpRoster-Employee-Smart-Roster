import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Roster from "../components/roster";
import Calendar from 'react-calendar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-calendar/dist/Calendar.css';
import '../css/EmployeeList.css';
import React from "react";

const axios = require('axios');

export default function MainHub() {
    return (
        <Container fluid>
            <Row>
                <Navbar/>
            </Row>
            <Row>
                <Col>
                    <Sidebar/>
                </Col>
                <Col>
                    <Roster/>
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
                <Col>

                </Col>
                <Col>
                    <Calendar/>
                </Col>
            </Row>
            <Sidebar/>

        </Container>


    )
}