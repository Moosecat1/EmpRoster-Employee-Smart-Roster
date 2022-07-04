import React, {useState} from "react";
import Navbar from "../components/navbar";
import "../css/custom.css";
import Form from "react-bootstrap/Form";

const { verifyEmployee } = require('../modules/endpoint');

document.title = "Login";


export default function Login(){
    const [emp_id, setEmail] = useState("");
    const [emp_password, setPassword] = useState("");
    const [loginMessage, setMessage] = useState("");

    function sendLoginRequest(event, response) { //handles the main event
        console.log("logging in"); //console log to test if we are logging in
        event.preventDefault(); //prevent page reload
        console.log(emp_id + " " + emp_password);
        (async () => {
            const res = await verifyEmployee(emp_id, emp_password);
            const empExists = res.empExists;
            const response = res.response;

            if(empExists){
                sessionStorage.setItem('emp_id', response.data[0].emp_id);
                sessionStorage.setItem('emp_fName', response.data[0].emp_fName);
                sessionStorage.setItem('emp_type', response.data[0].emp_type);
                window.location.href = "/";
            } else{
                setMessage("Incorrect email or password");
            }
        })();

    }

   
    if(sessionStorage.getItem('emp_id') != null) {
        window.location.href = "/";
    }else {
        return(
            <main>
                <Navbar/>
                <div className={"form-signin w-100 m-auto text-center"}>
                    <Form onSubmit={sendLoginRequest}>
                        <h1 className="h3 mb-3 fw-normal" >Please sign in</h1>
                        <div className={"form-floating"}>
                            <label id="userId">UserID or Email: </label>
                            <input type={"text"} className={"form-control"}  name={"uEmail"} placeholder={"name1234 or name@example.com"} onChange={(event) => {
                                setEmail(event.target.value);
                                document.getElementById("userId").innerText = "";
                            }}  required/>
                        </div>
                        <div>
                            <div className={"form-floating"}>
                                <label id="password">Password: </label>
                                <input type={"password"} className={"form-control"} name={"pass"} placeholder={"password"} onChange={(event) => {
                                    setPassword(event.target.value);
                                    document.getElementById("password").innerText = "";
                                }} required/>
                            </div>
                            <div className="checkbox mb-3">
                                    <label>
                                    <input type="checkbox" value="remember-me"/>
                                        Remember me
                                    </label>
                            </div>
                            <div>
                                <a href={"Register"}> Not registered? Click Here</a>
                            </div>
                            <br/>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        </div>
                    </Form>
                </div>
            </main>
    );
}
}

