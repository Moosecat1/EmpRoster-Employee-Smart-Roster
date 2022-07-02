//import React, {useState} from "react";
//import Axios from "axios";
//import "../css/Login.css"

/*
export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setMessage] = useState("");
    
    function sendLoginRequest(event, response) { //handles the main event 
        console.log("logging in"); //console log to test if we are logging in 
        event.preventDefault(); //prevent page reload 
        Axios.post("http://localhost:3001/login", { //post request to login page
            emp_email: email,
            emp_password: password,
        }).then((response) => {
            if(response.data === ""){ //if data is empty set error message
                setMessage("Incorrect email or password");
            } else { //else set the data and return to home page 
                console.log(response.data);
                sessionStorage.setItem('emp_id', response.data[0].emp_id);
                sessionStorage.setItem('emp_fName', response.data[0].emp_fName);
                sessionStorage.setItem('emp_type', response.data[0].emp_type)
                window.location.href = "/";
            }
        });
    }
    

// JSX code for login form
   if(sessionStorage.getItem('emp_id') != null) {
        window.location.href = "/";
    }else {
        <div className={"form"}>
            <form onSubmit={sendLoginRequest}>
                <div className={"input-container"}>
                    <label>Email: </label>
                    <input type={"text"} name={"uEmail"} onChange={() => {
                        setEmail(event.target.value)}} required/>
                </div>
                <div>
                    <div className={"input-container"}>
                        <label>Password: </label>
                        <input type={"password"} name={"pass"} onChange={() => {
                            setPassword(event.target.value)
                        }} required/>
                    </div>
                    <div className={"button-container"}>
                        <input type={"submit"}/>
                    </div>
                    <div>
                        <a href={"Register"}> Not registered? <br/>
                            Click Here</a>
                    </div>
                </div>
            </form>
        </div>
    };
   

}

*/
