import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import {Alert,AlertTitle,TextField, Typography, Container} from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
const sha256 = require('crypto-js/sha256');
const { addNullRegularAvailabilities } = require('../../modules/endpoint');

document.title = "Create Admin Account";

export default function RegisterCreateAdmin(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");     //containers for user input these are created to set and use throughout the page
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("Casual");

    const [showAlert, setShowAlert] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);

    const validateValues = () => { //function for form validation using regular expressions
        var fields = [];
        if (email === "" || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            fields.push(" Invalid Email Address");
        }
        if (password === "" || password.length < 8 || password.includes(" ")) {
            fields.push(" Invalid Password (must be at least 8 characters)");
        }
        if (password !== confirmPassword) {
            fields.push(" Password's don't match");
        }
        if (firstName === "" || (/\d/.test(firstName))) {
            fields.push("first name");
        }
        if (lastName === "" || (/\d/.test(lastName))) {
            fields.push( "first name");
        }
        if (phoneNumber === "" || (/\D/.test(phoneNumber))) {
            fields.push(" phone number (don't add spaces, don't add country code)");
        }
        setInvalidFields(fields);
        return (fields.length === 0);
    }

    const submit = (event) => { //on submit if the validateValues function is passed then continue with the submit
        if(validateValues()) {
            event.preventDefault();
            const companyId = sessionStorage.getItem('company_id');

            (async() => {
                //do not delete anything below they are CRUCIAL for the code to RUN 
                const res = await axios.post("http://localhost:2420/addEmployee", {
                    emp_password: sha256(password).toString(),
                    emp_fName: firstName,
                    emp_lName: lastName,
                    emp_email: email,
                    emp_phNum: phoneNumber,
                    emp_type: type,
                    emp_privilege: "Admin",
                    emp_password_changed: true,
                    company_id: companyId
                }).catch((err) => { //catch errors
                    console.log(err);
                });

                const empId = res.data[1];
                await addNullRegularAvailabilities(empId);

                window.location.href = "/register/createemployees";
            })();
        }else { //else prevent the event and show alert
            event.preventDefault();
            setShowAlert(true);
        }
    }
    
    return(
        <>
            <Navbar/>

            <Container>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Landing Page
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/register/createcompany"
                    >
                        Create Company
                    </Link>
                    <Typography color="text.primary">
                        Create Admin
                    </Typography>
                </Breadcrumbs>
            </div>

            <div className={"form-signin w-100 m-auto text-center"}>
                <h1 className="h3 mb-3 fw-normal" >Admin details:</h1>
                {showAlert ? //Alert event if true display Alert error else display info Alert
                    <Alert //This is a simple Alert error created
                        severity="warning"
                        variant="outlined" >
                        <AlertTitle>Error</AlertTitle>
                        Your details have the following issues:
                        <strong>{invalidFields.toString()}</strong>
                    </Alert> :
                    <Alert
                        severity="info">
                        Please fill out the following form for your Administrator Account
                    </Alert>
                }
                <form onSubmit={submit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fname"
                            label="First name"
                            name="fname"
                            autoComplete="First name"
                            autoFocus
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="l-name"
                            label="Last name"
                            name="lname"
                            autoComplete="Last name"
                            autoFocus
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        /> {/* Each text field contains a certain id determining what variable it will store, on Change it will set that specific variable */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="confirm-password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="p-num"
                            label="Phone Number"
                            name="p-number"
                            autoComplete="Phone #"
                            autoFocus
                            inputProps={{ maxLength: 10 }}
                            onChange={(event) => {
                                setPhoneNumber(event.target.value);
                            }}
                        />
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
                    <br /><br />
                    <button className="w-100 btn btn-lg btn-primary" type='submit'>Next</button>
                </form>
            </div>
            </Container>
        </>
    );
}