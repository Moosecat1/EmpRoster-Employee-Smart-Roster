import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import '../css/EmployeeList.css';
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { Link } from "react-router-dom";
import {Container} from "@mui/material";
import ManagerViewAvailability from './ManagerViewAvailability';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const axios = require('axios');

document.title = "Employee List";
/*this page needs to change quite a bit:
    -use props when loading roster instead of this sessionstorage thing
    -use componentdidmount and state to get initial data
    -when creating each employee thing use react format and not html/js (ie. use a map with jsx tags instead of pill.append thing)
    -for now it works, but roster needs to integrate props 
*/

class EmployeeList extends Component {
    state = {
        data : [],
        isLoaded : false
    }

    processEmps(){
        return this.state.data.map((employee) =>
            <Col>
                <Card>
                    {/*<Card.Img variant="top" src="Placeholder" /> */ }
                    <Card.Body>
                        <Card.Title>
                            {employee.emp_fName + " " + employee.emp_lName}
                        </Card.Title>
                        {employee.emp_type}
                    </Card.Body>
                    <Button variant="primary" onClick={function(){sessionStorage.setItem('emp_view', employee.emp_id);
                        document.location.href = '/ManagerViewEmployee';}}>See More</Button>
                </Card>
            </Col>
        );
    }

    async componentDidMount(){
        const res = await axios.get("http://localhost:2420/getEmployeesList/" + sessionStorage.getItem("company_id")).catch((err) => {
            console.log(err);
        });
        console.log(res);
        let empList = [];

        for(let i = 0; i < res.data.length; i++)
        {
            empList.push(res.data[i]);
        }


        console.log(empList);

        this.setState({data: empList, isLoaded: true});
    }

    render(){
        const {isLoaded} = this.state;

        if(isLoaded){
            return(
                <div className='flex'>
                    <Navbar/> <Sidebar/>
                    <Container>
                        <Row xs={1} md={2} className="g-4">
                            {this.processEmps()}
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}
export default EmployeeList;