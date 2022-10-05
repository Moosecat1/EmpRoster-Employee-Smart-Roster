import React, {useState} from "react";
import "../css/custom.css";
import Form from "react-bootstrap/Form";
import { Container, Box, TextField, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from 'axios';

const { updateEmail } = require('../modules/endpoint');

document.title = "Update Email";

export default function UpdateEmail(){
    const [email, setEmail] = useState(""); //store email


    function sendUpdateEmail(event, response) { //handles the main event
        event.preventDefault(); //prevent page reload
        (async () => {
            await updateEmail(sessionStorage.getItem('emp_id'), email);
            window.location.href = "/Settings";
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
                                <Form onSubmit={sendUpdateEmail}>
                                    <h1 className="h3 mb-3 fw-normal" >Change Email</h1>
                                    <div className={"form-floating"}>
                                        <TextField margin="normal"
                                                   required
                                                   fullWidth
                                                   id="email"
                                                   label="New Email"
                                                   name="email"
                                                   autoComplete="name1234 or name@example.com"
                                                   autoFocus
                                                   onChange={(event) => {
                                                       setEmail(event.target.value)
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