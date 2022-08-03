import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import '../css/EmployeeList.css';
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import ManagerViewAvailability from './ManagerViewAvailability';

const axios = require('axios');

document.title = "Employee List";
sessionStorage.setItem("company_id", 1);
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

    viewEmployeeRoster(emp_id) {
        sessionStorage.setItem('emp_view', emp_id);
        document.location.href = '/ViewEmployee';
    }

    processEmps(){
        return this.state.data.map((employee) =>
            <Card>
                <Card.Img variant="top" src="Placeholder" />
                <Card.Body>
                    <Card.Title>
                        {employee.emp_fName + " " + employee.emp_lName}
                    </Card.Title>
                    {employee.emp_type}
                </Card.Body>
                <Button variant="primary" onclick="viewEmployeeRoster(employee.emp_id)">See More</Button>
            </Card>
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
                    <div className='d-flex flex-nowrap justify-content-center'>
                        {this.processEmps()}
                    </div>
                </div>
            )
        }
    }
}
export default EmployeeList;