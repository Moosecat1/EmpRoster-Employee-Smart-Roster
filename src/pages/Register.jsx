import React, {useState} from "react";
import Navbar from "../components/navbar";
import "../css/Register.css"
import * as ReactDOM from 'react-dom/client';

const { addEmployee } = require('../modules/endpoint');

document.title = "Register Your Company";

class Employee extends React.Component{
    render(){
        return(
            <>
                <div className={"form-floating"}>
                    <input type={"text"} className={"form-control"} name={"empName"}></input>
                </div>
                <br />
                <select>
                    <option>Employee</option>
                    <option>Manager</option>
                    <option>Admin</option>
                </select>
            </>
        )
    }
}

var counter = 0;

export default function Register(){
    const [employees, setEmployee] = useState([]);
    console.log(employees);

    function createCompany(){
        const element = (
            <>
                <Navbar/>
                <div id="parentContainer" className={"form-signin w-100 m-auto text-center"}>
                    <h1 className="h3 mb-3 fw-normal">Please add employees:</h1>
                    <Employee/>
                    {employees}
                </div>
                <br />
                <div className={"form-signin w-100 m-auto text-center"}>
                    <button className="w-100 btn btn-lg btn-primary" onClick={setEmployee}>Add Employee</button>
                </div>
            </>
        );

        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(element);
    }

    return(
        <main id="root">
            <Navbar/>
            <div className={"form-signin w-100 m-auto text-center"}>
                    <h1 className="h3 mb-3 fw-normal">Please enter your company name:</h1>
                    <div className={"form-floating"}>
                        <input type={"text"} className={"form-control"} name={"companyName"}></input>
                    </div>
                    <br />
                    <button className="w-100 btn btn-lg btn-primary" onClick={createCompany}>Next</button>
            </div>
        </main>
    );
}