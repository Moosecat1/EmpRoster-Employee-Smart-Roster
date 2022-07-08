import React, { useState } from 'react';
import Navbar from '../../components/navbar';

const { addAdmin } = require('../../modules/endpoint');

document.title = "Create Admin Account";

export default function RegisterCreateAdmin(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("Casual");

    const submit = (event) => {
        event.preventDefault();

        const companyId = sessionStorage.getItem('company_id');

        console.log(
            "First name: " + firstName + "\n" +
            "Last name: " + lastName + "\n" +
            "Email: " + email + "\n" +
            "Password: " + password + "\n" +
            "Phone number: " + phoneNumber + "\n" +
            "Type: " + type + "\n"
        );

        (async() => {
            await addAdmin(password, firstName, lastName, email, phoneNumber, type, companyId);

            window.location.href = "/register/createemployees";
        })();
    }
    
    return(
        <>
            <Navbar/>
            <div className={"form-signin w-100 m-auto text-center"}>
            <h1 className="h3 mb-3 fw-normal" >Please enter your admin details:</h1>
                <form onSubmit={submit}>
                    <div className={"form-floating"}>
                        <label id='firstName'>First name</label>
                        <input type={"text"} className={"form-control"} name={"firstName"} required
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                    document.getElementById("firstName").innerHTML = "";
                                }}/>
                    </div>
                    <br />
                    <div className={"form-floating"}>
                        <label id='lastName'>Last name</label>
                        <input type={"text"} className={"form-control"} name={"lastName"} required
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                    document.getElementById("lastName").innerHTML = "";
                                }}/>
                    </div>
                    <br />
                    <div className={"form-floating"}>
                        <label id='email'>Email</label>
                        <input type={"text"} className={"form-control"} name={"email"} required
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    document.getElementById("email").innerHTML = "";
                                }}/>
                    </div>
                    <br />
                    <div className={"form-floating"}>
                        <label id='password'>Password</label>
                        <input type={"password"} className={"form-control"} name={"password"} required
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    document.getElementById("password").innerHTML = "";
                                }}/>
                    </div>
                    <br />
                    <div className={"form-floating"}>
                        <label id='phoneNumber'>Phone number</label>
                        <input type={"text"} className={"form-control"} name={"phoneNumber"} required
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                    document.getElementById("phoneNumber").innerHTML = "";
                                }}/>
                    </div>
                    <br />
                    <div>
                        <label>Type:</label>
                        &nbsp;&nbsp;
                        <select name="type" 
                                onChange={(event) => {
                                    setType(event.target.value);
                                }}>
                            <option>Casual</option>
                            <option>Part-time</option>
                            <option>Full-time</option>
                        </select>
                    </div>
                    <br />
                    <br /><br />
                    <button className="w-100 btn btn-lg btn-primary" type='submit'>Next</button>
                </form>
            </div>
        </>
    );
}