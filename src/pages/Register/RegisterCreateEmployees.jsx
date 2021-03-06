import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import Container from 'react-bootstrap/Container';
import Navbar from '../../components/navbar';
import '../../css/Register.css'

const { addEmployee } = require('../../modules/endpoint');

document.title = "Add Employees";

export default function RegisterCreateEmployees(){
    const [inputFields, setInputFields] = useState([
        {firstName: '', lastName: '', privilege: 'Employee', type: 'Casual'},
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

                console.log(privilege + ":" + type + ": " + firstName + " " + lastName);

                const companyId = sessionStorage.getItem('company_id');

                if(firstName !== "" || lastName !== "" || privilege !== "" || type !== "")
                {
                    await addEmployee("password", firstName, lastName, null, null, type, privilege, companyId);
                }
            }

            document.location.href = "/";
        })();
    }

    return(
        <>
        <Navbar/>
        <br />
        <Container>
            <h1>Add Employees:</h1>
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
        </Container>
        <div className='buttonDiv'>
                    <button className="w-20 btn btn-lg btn-primary" id="submitButton" onClick={finalise}>Submit</button>
                </div>
        <br /><br />
        </>
    );
}