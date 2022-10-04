import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Container,Box} from "@mui/material";
import Col from 'react-bootstrap/Col';

const axios = require('axios');

document.title = "Employee List";

class EmployeeList extends Component {
    state = {
        data : [],
        isLoaded : false
    }

    processEmps(){
        return this.state.data.map((employee, index) =>
            <Col key={index}>
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
        
        let empList = [];

        for(let i = 0; i < res.data.length; i++)
        {
            empList.push(res.data[i]);
        }

        this.setState({data: empList, isLoaded: true});
    }

    render(){
        const {isLoaded} = this.state;

        if(isLoaded){
            return(
                <div className='flex'>
                    <Navbar/>
                    <Container>
                        <Box display={"flex"}
                             flexdirection={"row"}>
                        <Sidebar/>
                        <Box sx={{width:"1000px"}} >
                            {this.processEmps()}
                        </Box>
                        </Box>
                    </Container>
                </div>
            )
        }
    }
}

export default EmployeeList;