import React, { useState } from 'react';
import Navbar from '../../components/navbar';

const { addCompany, addOperatingTime } = require('../../modules/endpoint');

document.title = "Create Your Company";

export default function RegisterCreateCompany(){
    const [companyName, setCompanyName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const createCompany = () => {
        (async() => {
            if(companyName !== ""){
                var company_id = await addCompany(companyName);
                sessionStorage.setItem('company_id', company_id);

                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

                for(let i = 0; i < 7; i++){
                    const currentDay = document.getElementById(days[i]);

                    if(currentDay.checked){
                        await addOperatingTime(days[i], startTime, endTime, company_id);
                    }
                }

                window.location.href = "/register/createadmin";
            }
        })()
    }

    return(
        <>
            <Navbar/>
            <div className={"form-signin w-100 m-auto text-center"}>
            <h1 className="h3 mb-3 fw-normal" >Please enter your company name:</h1>
                <div className={"form-floating"}>
                    <input type={"text"} className={"form-control"} name={"companyName"} placeholder={"name1234 or name@example.com"} onChange={(event) => {
                                setCompanyName(event.target.value);
                    }}  required/>
                </div>
                <br />
                <h1 className="h3 mb-3 fw-normal" >Please select your company days:</h1>
                <div>
                    <input type="checkbox" id="Sunday"></input>
                    &nbsp;
                    <label>Sunday</label>
                    <br />
                    <input type="checkbox" id="Monday"></input>
                    &nbsp;
                    <label>Monday</label>
                    <br />
                    <input type="checkbox" id="Tuesday"></input>
                    &nbsp;
                    <label>Tuesday</label>
                    <br />
                    <input type="checkbox" id="Wednesday"></input>
                    &nbsp;
                    <label>Wednesday</label>
                    <br />
                    <input type="checkbox" id="Thursday"></input>
                    &nbsp;
                    <label>Thursday</label>
                    <br />
                    <input type="checkbox" id="Friday"></input>
                    &nbsp;
                    <label>Friday</label>
                    <br />
                    <input type="checkbox" id="Saturday"></input>
                    &nbsp;
                    <label>Saturday</label>
                    <br />
                </div>
                <br />
                <h1 className="h3 mb-3 fw-normal" >Please enter your start and end times (format 23:59):</h1>
                <div className={"form-floating"}>
                    <label id='start'>Start Time</label>
                    <input type={"text"} className={"form-control"} name={"startTime"} placeholder={"name1234 or name@example.com"} onChange={(event) => {
                                setStartTime(event.target.value);
                                document.getElementById('start').innerHTML = "";
                    }}  required/>
                </div>
                <br />
                <div className={"form-floating"}>
                    <label id='end'>End Time</label>
                    <input type={"text"} className={"form-control"} name={"endTime"} placeholder={"name1234 or name@example.com"} onChange={(event) => {
                                setEndTime(event.target.value);
                                document.getElementById('end').innerHTML = "";
                    }}  required/>
                </div>
                <br />
                <button className="w-100 btn btn-lg btn-primary" onClick={createCompany}>Next</button>
            </div>
        </>
    );
}