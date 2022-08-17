import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { Link } from "react-router-dom";
import {Container} from "@mui/material";
import ManagerViewAvailability from './ManagerViewAvailability';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const { addAvailability } = require('../modules/endpoint');
const { removeNotification } = require('../modules/endpoint');
const { getEmployeeName } = require('../modules/endpoint');

const axios = require('axios');

document.title = "Notifications";

class Notifications extends Component {
    state = {
        data : [],
        isLoaded : false
    }

    async acceptRequest(notification) {
        console.log("meow");
        await addAvailability(notification.req_date, notification.req_start, notification.req_end, "Unavailable", notification.emp_id);
        await removeNotification(notification.emp_id, notification.req_date);
    }

    async denyRequest(notification) {
        console.log("meow");
        await removeNotification(notification.emp_id, notification.req_date);
    }

    processNotifs(){
        return this.state.data.map((notification) =>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {"Request Leave"}
                        </Card.Title>
                        {notification.emp_fName + " " + notification.emp_lName + " is requesting leave due to " + notification.req_desc}
                    </Card.Body>
                    <Button variant="primary" onClick={function(){acceptRequest(notification)}}>Accept</Button>
                    <Button variant="primary" onClick={function(){denyRequest(notification)}}>Deny</Button>
                </Card>
            </Col>
        );
    }

    async componentDidMount(){
        const res = await axios.get("http://localhost:2420/getNotifications/" + sessionStorage.getItem("emp_privilege")).catch((err) => {
            console.log(err);
        });
        console.log(res);
        let notiList = [];
        let empList = [];

        for(let i = 0; i < res.data.length; i++)
        {
            notiList.push(res.data[i]);
        }

        console.log(notiList);

        this.setState({data: notiList, isLoaded: true});
    }

    render(){
        const {isLoaded} = this.state;
        console.log(isLoaded);
        if(isLoaded){
            return(
                <div className='flex'>
                    <Navbar/> <Sidebar/>
                    <Container>
                        <Row xs={1} md={2} className="g-4">
                            {this.processNotifs()}
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}
export default Notifications;