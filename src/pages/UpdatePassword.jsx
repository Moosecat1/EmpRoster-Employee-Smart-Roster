import React, {useState} from "react";
import "../css/custom.css";
import Form from "react-bootstrap/Form";
import { Container, Box, TextField, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from 'axios';

const { verifyEmployee, updatePassword } = require('../modules/endpoint');

document.title = "Update Password";

export default function UpdatePassword(){
    const [current_password, setCPass] = useState(""); //store email
    const [emp_password, setPassword] = useState(""); // store password
    const [loginMessage, setMessage] = useState(""); //login message
    const [open, setOpen] = React.useState(false); // boolean to know if the Collapse object should collapse or show the alert

    const handleClose = (event, reason) => { //if user clicks away collapse the alert
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function sendUpdatePassword(event, response) { //handles the main event
        console.log("logging in"); //console log to test if we are logging in
        event.preventDefault(); //prevent page reload
        (async () => {
            const res = await verifyEmployee(sessionStorage.getItem('emp_id'), current_password);
            const empExists = res.empExists;
            if (empExists) {
                await updatePassword(sessionStorage.getItem('emp_id'), emp_password, 1);
                setOpen(false)
                window.location.href = "/Settings";
            } else { //otherwise open the alert and set the error message
                setOpen(true);
                setMessage("Incorrect email or password");
            }
        })();
    }

    return(
        <main>
            <Navbar/>
            <Container >
                <Box
                    display={"flex"}
                    flexdirection={"row"}>
                    <Sidebar/>
                    <Box m={1} >
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"

                        >
                            <div className={"form-signin w-100 m-auto text-center"}>
                                <Form onSubmit={sendUpdatePassword}>
                                    <h1 className="h3 mb-3 fw-normal" >Change Password</h1>
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
                                                   id="cPass"
                                                   label="Current Password"
                                                   name="cPass"
                                                   type="password"
                                                   onChange={(event) => {
                                                       setCPass(event.target.value)
                                                   }}/>
                                    </div>
                                    <div>
                                        <TextField margin="normal"
                                                   required
                                                   fullWidth
                                                   id="nPass"
                                                   label="New Password"
                                                   name="nPass"
                                                   type="password"
                                                   onChange={(event) => {
                                                       setPassword(event.target.value);
                                                   }}/>
                                    </div>
                                    <br/>
                                    <button className="w-100 btn btn-lg btn-primary" type="submit">Update</button>
                                </Form>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </main>
    );
}