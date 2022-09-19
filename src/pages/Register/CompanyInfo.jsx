import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import {Button} from '@mui/material';

const sha256 = require('crypto-js/sha256');
const {randomOneTimePassword} = require('../../modules/random.js');

const nameStyle = {
    backgroundColor: '#c5ceff',
    border: '1px solid black'
}

const negStyle = {
    backgroundColor: '#F7F8FC',
    border: '1px solid black'
}

export default function CompanyInfo(){
    const [employeeList, setEmployeeList] = useState([]);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        //get newly created company's info (company name, id, employee info)
        async function initialiseCompanyData(){
            const res = await axios.get("http://localhost:2420/getEmployeesList/" + sessionStorage.getItem('company_id')).catch((err) => {console.log(err);});
            const res1 = await axios.get("http://localhost:2420/getCompanyName/" + sessionStorage.getItem('company_id')).catch((err) => {console.log(err);});

            const companyName = res1.data[0].company_name;

            let employeeList = [];

            for(let i = 1; i < res.data.length; i++){
                let employee = res.data[i];
                employee.emp_otp = randomOneTimePassword();
                const hash = sha256(employee.emp_otp);

                await axios.put("http://localhost:2420/updatePassword", {
                    emp_id: employee.emp_id,
                    emp_password: hash.toString(),
                    emp_password_changed: false
                });

                employeeList.push(employee);
            }

            setEmployeeList(employeeList);
            setCompanyName(companyName);
        }

        initialiseCompanyData();
    }, []);

    const generateEmployees = () => {
        return employeeList.map((employee, index) => 
            <tr key={index}>
                <td style={nameStyle}>{employee.emp_id}</td>
                <td style={negStyle}>{employee.emp_fName + " " + employee.emp_lName}</td>
                <td style={negStyle}>{employee.emp_email}</td>
                <td style={negStyle}>{employee.emp_otp}</td>
            </tr>
        );
    }

    const printWindow = () => {
        window.print();
        document.location = '/';
    }

    return(
        <>
            <Navbar/>
            <h1>Company Name: {companyName}</h1>
            <h1 style={{fontSize: '30px'}}>Company ID: {sessionStorage.getItem('company_id')}</h1>
            <br />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Email</th>
                            <th>One Time Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateEmployees()}
                    </tbody>
                </table>
            </div>
            <br />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button size={"large"} variant={"contained"} onClick={() => printWindow()}>Print Information</Button>
            </div>
            <br />
        </>
    )
}