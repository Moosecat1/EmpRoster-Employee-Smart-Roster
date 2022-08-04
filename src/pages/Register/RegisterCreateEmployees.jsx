import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import Container from 'react-bootstrap/Container';
import Navbar from '../../components/navbar';
import '../../css/Register.css'

const { addEmployee, addRegularAvailability, createRoster } = require('../../modules/endpoint');

document.title = "Add Employees";

export default function RegisterCreateEmployees(){
    const [inputFields, setInputFields] = useState([
        {
            firstName: '', lastName: '', privilege: 'Employee', type: 'Casual',
            SundayStart: 'N/A', SundayEnd: 'N/A', MondayStart: 'N/A', MondayEnd: 'N/A', 
            TuesdayStart: 'N/A', TuesdayEnd: 'N/A', WednesdayStart: 'N/A', WednesdayEnd: 'N/A', 
            ThursdayStart: 'N/A', ThursdayEnd: 'N/A', FridayStart: 'N/A', FridayEnd: 'N/A', 
            SaturdayStart: 'N/A', SaturdayEnd: 'N/A'
        }
    ]);

    const times = ["N/A", "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00",
            "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
            "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
            "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
            "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
        ];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
        setInputFields([...inputFields, {firstName: '', lastName: '', email: '', privilege: 'Employee', type: 'Casual',
                                        SundayStart: 'N/A', SundayEnd: 'N/A', MondayStart: 'N/A', MondayEnd: 'N/A', 
                                        TuesdayStart: 'N/A', TuesdayEnd: 'N/A', WednesdayStart: 'N/A', WednesdayEnd: 'N/A', 
                                        ThursdayStart: 'N/A', ThursdayEnd: 'N/A', FridayStart: 'N/A', FridayEnd: 'N/A', 
                                        SaturdayStart: 'N/A', SaturdayEnd: 'N/A'
        }]);
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

                const companyId = sessionStorage.getItem('company_id');

                let empId;

                if(firstName !== "" || lastName !== "" || privilege !== "" || type !== "")
                {
                    empId = await addEmployee("password", firstName, lastName, email, null, type, privilege, companyId);
                }

                const SundayStart = employee.SundayStart;
                const SundayEnd = employee.SundayEnd;
                const MondayStart = employee.MondayStart;
                const MondayEnd = employee.MondayEnd;
                const TuesdayStart = employee.TuesdayStart;
                const TuesdayEnd = employee.TuesdayEnd;
                const WednesdayStart = employee.WednesdayStart;
                const WednesdayEnd = employee.WednesdayEnd;
                const ThursdayStart = employee.ThursdayStart;
                const ThursdayEnd = employee.ThursdayEnd;
                const FridayStart = employee.FridayStart;
                const FridayEnd = employee.FridayEnd;
                const SaturdayStart = employee.SaturdayStart;
                const SaturdayEnd = employee.SaturdayEnd;

                const starts = [SundayStart, MondayStart, TuesdayStart, WednesdayStart, ThursdayStart, FridayStart, SaturdayStart];
                const ends = [SundayEnd, MondayEnd, TuesdayEnd, WednesdayEnd, ThursdayEnd, FridayEnd, SaturdayEnd];

                for(let i = 0; i < 7; i++)
                {
                    if(!(starts[i] === 'N/A' || ends[i] === 'N/A'))
                    {
                        await addRegularAvailability(days[i], starts[i], ends[i], empId);
                    }
                }

                const currentDate = new Date();
                let weekStart = new Date();
                weekStart.setDate(currentDate.getDate() - (currentDate.getDay()));

                await createRoster(empId, weekStart);
            }

            document.location.href = "/";
        })();
    }

    return(
        <>
            <Navbar/>
            <br />
                <h1>Add Employees:</h1>
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
                                <div>
                                    <span>Regular Working Hours (start - end):</span>
                                    <br /><br />
                                    {days.map(day =>
                                        <>
                                            <label>{day}</label>
                                            &nbsp;&nbsp;
                                            <select name={day + 'Start'} onChange={event => handleChangeInput(index, event)}>
                                                {times.map(time => 
                                                    <option>{time}</option>
                                                )}
                                            </select>
                                            <select name={day + 'End'} onChange={event => handleChangeInput(index, event)}>
                                                {times.map(time => 
                                                    <option>{time}</option>
                                                )}
                                            </select>
                                            <br />
                                        </>
                                    )}
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