import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import '../css/EmployeeList.css';
import React, {Component} from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import ManagerViewAvailability from './ManagerViewAvailability';

const axios = require('axios');

document.title = "Employee List";
var checker = false;

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

    processTimes(){
        return times.map((time, index) =>
            <tr>
                <td>
                    {time}
                </td>
                <td>
                    {this.checkTime(0, index)}
                </td>
                <td>
                    {this.checkTime(1, index)}
                </td>
                <td>
                    {this.checkTime(2, index)}
                </td>
                <td>
                    {this.checkTime(3, index)}
                </td>
                <td>
                    {this.checkTime(4, index)}
                </td>
                <td>
                    {this.checkTime(5, index)}
                </td>
                <td>
                    {this.checkTime(6, index)}
                </td>
            </tr>
        );
    }

    async componentDidMount(){
        const res = await axios.get("http://localhost:2420/getEmployeesList/" + sessionStorage.getItem("company_id")).then((response) => {
            console.log(err);
        });

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
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Sunday</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.processTimes()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    function employeeListGet() {
        (async () => {
            await axios.get("http://localhost:2420/getEmployeesList/" + sessionStorage.getItem("company_id")).then((response) => {
                employeeList = response.data;
                const container = document.getElementById("eListContainer");
                const pill = document.createElement("ul");
                pill.className = "eList-pill flex-column flex-nowrap mb-auto";
                for (let i = 0; i < employeeList.length; i++) {
                    const listItem = document.createElement("li");
                    listItem.className = "eList-item flex-row mb-auto";
                    const listLink = document.createElement("a");
                    listLink.className = "eList-link flex-column";
                    listLink.href = "#";
                    const employeePicture = document.createElement("img");
                    employeePicture.src = "placeholder.jpg";
                    employeePicture.src = "Placeholder";
                    employeePicture.className = "eList-image";
                    listLink.append(employeePicture);
                    const employeeName = document.createElement("p");
                    employeeName.className = "eList-name text-black";
                    employeeName.innerHTML = employeeList[i].emp_fName + " " + employeeList[i].emp_lName;
                    listLink.append(employeeName);
                    const employeeRole = document.createElement("p");
                    employeeRole.className = "eList-role text-black";
                    employeeRole.innerHTML = "Placeholder role";
                    listLink.append(employeeRole);
                    const employeeType = document.createElement("p");
                    employeeType.className = "eList-type text-black";
                    employeeType.innerHTML = employeeList[i].emp_type;
                    listLink.append(employeeType);
                    const viewEmployee = document.createElement("p");
                    viewEmployee.className = "eList-view text-black";
                    viewEmployee.innerHTML = "View Employee";
                    viewEmployee.emp_id = employeeList[i].emp_id;
                    viewEmployee.onclick = function (){
                        viewEmployeeRoster(employeeList[i].emp_id);
                    };
                    listLink.append(viewEmployee);
                    listItem.append(listLink);
                    pill.append(listItem);
                }
                container.append(pill);
                console.log(employeeList);
            });
        })();
    }
    if (checker === false) {
        employeeListGet();
        checker = true;
    }

    return (
        <>
            <div className='flex'>
                <Navbar/> <Sidebar/>
                <Container className='d-flex flex-nowrap justify-content-center' id="eListContainer">

                </Container>
            </div>
        </>
    )
}