import React, { useState } from 'react';
import axios from 'axios';
import {Alert, AlertTitle} from "@mui/material";
import Navbar from '../../components/navbar';
import '../../css/Register.css'
const { addNullRegularAvailabilities } = require('../../modules/endpoint');

document.title = "Add Employees";

export default function RegisterCreateEmployees(){
    const [inputFields, setInputFields] = useState([
        {
            firstName: '', lastName: '', privilege: 'Employee', type: 'Casual'
        }
    ]);

    const handleChangeInput = (index, event) => {
        var labels = document.getElementsByClassName(event.target.name);

        for(let i = 0; i < labels.length; i++)
        {
            labels[i].innerHTML = "";
        }

        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleAdd = () => {
        setInputFields([...inputFields, {firstName: '', lastName: '', email: '', privilege: 'Employee', type: 'Casual'}]);
    }

    const handleRemove = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }


    const [invalidFields, setInvalidFields] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const finalise = () => {
        (async() => {
            for(let i = 0; i < inputFields.length; i++)
            {
                const employee = inputFields[i];
                const firstName = employee.firstName;
                const lastName = employee.lastName;
                const email = employee.email;
                const privilege = employee.privilege;
                const type = employee.type;

                const companyId = sessionStorage.getItem('company_id');

                const errors = [];

                if(firstName === "" || (/\d/.test(firstName)))
                {
                    errors.push(" First Name: should not contain numbers or be left empty");
                }if( lastName === "" || (/\d/.test(lastName))){
                    errors.push(" Last Name: should not contain numbers or be left empty");
                }if(email === "" || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                    errors.push(" Email: should not be left empty");
                }if(privilege === "" || type === ""){
                    errors.push(" Privilege or Type: should not be left empty");
                }
                if (errors.length === 0){
                    //do not delete anything below they are CRUCIAL for the code to RUN 
                    const res = await axios.post("http://localhost:2420/addEmployee", {
                        emp_password: null,
                        emp_fName: firstName,
                        emp_lName: lastName,
                        emp_email: email,
                        emp_type: type,
                        emp_privilege: privilege,
                        emp_password_changed: false,
                        company_id: companyId
                    }).catch((err) => {
                        console.log(err);
                    });

                    const empId = res.data[1];
                    await addNullRegularAvailabilities(empId);
            } else{
                    setInvalidFields(errors);
                    setShowAlert(true);
                }
            }

            document.location.href = "/CompanyInfo";
        })();
    }

    return(
        <>
            <Navbar/>
            <br />
                <h1>Add Employees:</h1>
                {showAlert ?
                    <Alert
                        severity="warning"
                        variant="outlined" >
                        <AlertTitle>Error</AlertTitle>
                        Your details have the following issues:
                        <strong>{invalidFields.toString()}</strong>
                    </Alert> :
                    <Alert
                        severity="info">
                        Please fill out the following form for your Employee's Account(s)
                    </Alert>
                }
                    <br />
                    <form onSubmit={handleSubmit}>
                        {inputFields.map((inputField, index) =>
                            <div className={"form-signin w-100 m-auto text-center"} key={index}>
                                <div className={"form-floating"}>
                                    <label className="firstName">Employee First Name</label>
                                    <input type={"text"} className={"form-control"} name={"firstName"} value={inputField.firstName} onChange={event => handleChangeInput(index, event)}/>
                                </div>
                                <br />
                                <div className={"form-floating"}>
                                    <label className="lastName">Employee Last Name</label>
                                    <input type={"text"} className={"form-control"} name={"lastName"} value={inputField.lastName} onChange={event => handleChangeInput(index, event)}/>
                                </div>
                                <br />
                                <div className={"form-floating"}>
                                    <label className="email">Employee Email</label>
                                    <input type={"text"} className={"form-control"} name={"email"} value={inputField.email} onChange={event => handleChangeInput(index, event)}/>
                                </div>
                                <br />
                                <div>
                                    <label>Employee Privilege:</label>
                                    &nbsp;&nbsp;
                                    <select name='privilege' onChange={event => handleChangeInput(index, event)}>
                                        <option>Employee</option>
                                        <option>Manager</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                                <br />
                                <div>
                                    <label>Employee Type:</label>
                                    &nbsp;&nbsp;
                                    <select name='type' onChange={event => handleChangeInput(index, event)}>
                                        <option>Casual</option>
                                        <option>Part-time</option>
                                        <option>Full-time</option>
                                    </select>
                                </div>
                                <br />
                                <div className='buttonDiv'>
                                    <button className="w-20 btn btn-lg" id="removeButton" onClick={() => handleRemove(index)}>Remove Employee</button>
                                </div>
                            </div>
                        )}
                        <br />
                        <div className='buttonDiv'>
                            <button className="w-20 btn btn-lg" id="addButton" onClick={handleAdd}>Add Employee</button>
                        </div>
                        <br /><br/>
                    </form>
                <div className='buttonDiv'>
                    <button className="w-20 btn btn-lg btn-primary" id="submitButton" onClick={finalise}>Submit</button>
                </div>
            <br /><br />      
        </>
    );
}