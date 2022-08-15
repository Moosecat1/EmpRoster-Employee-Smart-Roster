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

const { addLeave } = require('../modules/endpoint');
const { removeNotification } = require('../modules/endpoint');
const { addLeave } = require('../modules/endpoint');

const axios = require('axios');

document.title = "Notifications";

class Notifications extends Component {
    state = {
        data : [],
        isLoaded : false
    }

    processNotifs(){
        (async () => {
            const res = await getEmployee(emp_id);
            emp_fName = res.data.emp_fName;
            emp_lName = res.data.emp_lName;
        })();
        return this.state.data.map((notification) =>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {"Request Leave"}
                        </Card.Title>
                        {emp_fName + " " + emp_lName + " is requesting leave"}
                    </Card.Body>
                    <Button variant="primary" onClick={function(){addLeave(notification.req_date, notification.req_start, notification.req_end, notification.emp_id);
                        document.location.href = '/ManagerViewEmployee';}}>See More</Button>
                    <Button variant="primary" onClick={}
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

        for(let i = 0; i < res.data.length; i++)
        {
            notiList.push(res.data[i]);
        }

        console.log(notiList);

        this.setState({data: notiList, isLoaded: true});
    }

    render(){
        const {isLoaded} = this.state;

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
export default EmployeeList;