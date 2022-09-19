import React, {useState} from "react";
import Navbar from "../components/navbar";
import "../css/custom.css";
import Form from "react-bootstrap/Form";
import { TextField, Collapse, Alert,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const { verifyEmployee } = require('../modules/endpoint');

document.title = "Login";

export default function Login(){
    const [emp_id, setEmail] = useState(""); //store email
    const [emp_password, setPassword] = useState(""); // store password
    const [loginMessage, setMessage] = useState(""); //login message
    const [open, setOpen] = React.useState(false); // boolean to know if the Collapse object should collapse or show the alert

    const handleClose = (event, reason) => { //if user clicks away collapse the alert
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function sendLoginRequest(event, response) { //handles the main event
        console.log("logging in"); //console log to test if we are logging in
        event.preventDefault(); //prevent page reload
        (async () => {
            const res = await verifyEmployee(emp_id, emp_password);
            const empExists = res.empExists;
            const empId = res.empId;
            const empfName = res.empfName;
            const empPrivilege = res.empPrivilege;
            const empPasswordChanged = res.empPasswordChanged;
            const companyId = res.companyId;
            //if the employee exists set items and redirect to the main page also collapse alert
            if(empExists){
                sessionStorage.setItem('emp_id', empId);
                sessionStorage.setItem('emp_view', empId);
                sessionStorage.setItem('emp_fName', empfName);
                sessionStorage.setItem('emp_privilege', empPrivilege);
                sessionStorage.setItem('company_id', companyId);
                sessionStorage.setItem('emp_password_changed', empPasswordChanged);
                setOpen(false)
                window.location.href = "/mainhub";
            } else{ //otherwise open the alert and set the error message
                setOpen(true);
                setMessage("Incorrect email or password");
            }
        })();
    }
   
    if(sessionStorage.getItem('emp_id') != null) {
        alert("you have already Logged in")
        window.location.href = "/mainhub";
    } else {
        // Simple lgin form with a Collapse contain the Alert which contains an error message
        return(
            <main>
                <Navbar/>
                <div className={"form-signin w-100 m-auto text-center"}>
                    <Form onSubmit={sendLoginRequest}>
                        <h1 className="h3 mb-3 fw-normal" >Please sign in</h1>
                        <Collapse in={open}>
                            <Alert severity="error" action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                                   sx={{ mb: 2 }}
                            >
                                {loginMessage}
                            </Alert>
                        </Collapse>
                        <div className={"form-floating"}>
                            <TextField margin="normal"
                                       required
                                       fullWidth
                                       id="uEmail"
                                       label="Email/User ID"
                                       name="uEmail"
                                       autoComplete="name1234 or name@example.com"
                                       autoFocus
                                       onChange={(event) => {
                                           setEmail(event.target.value)
                                       }}/>
                        </div>
                        <div>
                                <TextField margin="normal"
                                           required
                                           fullWidth
                                           id="pass"
                                           label="Password"
                                           name="pass"
                                           type="password"
                                           onChange={(event) => {
                                               setPassword(event.target.value);
                                           }}/>
                            </div>
                            <div className="checkbox mb-3">
                                    <label>
                                    <input type="checkbox" value="remember-me"/>
                                        Remember me
                                    </label>
                            </div>
                            <div>
                                <a href={"register/createcompany"}> Not registered? Click Here</a>
                            </div>
                            <br/>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    </Form>
                </div>
            </main>
        );
    }
}




