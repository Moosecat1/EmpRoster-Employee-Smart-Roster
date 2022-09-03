import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import {Alert,AlertTitle,TextField, Typography, Container} from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
const { addAdmin, addEmployee } = require('../../modules/endpoint');

document.title = "Create Admin Account";



export default function RegisterCreateAdmin(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("Casual");

    const [showAlert, setShowAlert] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);


    

    const validateValues = () => {
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

    const submit = (event) => {

        if(validateValues()) {


            const companyId = sessionStorage.getItem('company_id');


            (async() => {
                await addEmployee(password, firstName, lastName, email, phoneNumber, type, "Admin", companyId);

                window.location.href = "/register/createemployees";
            })();
        }else {
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
                        />
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