//Imports neccesary for functionality
import * as React from 'react';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import {Box, Button, Container, TextField, List, ListItem, ListItemText,  Grid, Paper, Avatar, styled } from "@mui/material";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from "react";
const axios = require('axios');

//Declaring methods that will be used throughout the page
const { verifyEmployee, updatePassword, updateEmail, updatePhone } = require('../modules/endpoint');

// makes a simple container which holds an item
const Item = styled(Paper)(({ theme }) => ({ // makes a simple container which holds an item
    backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));

//Deals with the style of the modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    overflowY: 'scroll',
    maxHeight: "70%",
    boxShadow: 24,
    p: 4,
};

// This function is to change a strings text colour
function stringToColour(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.slice(-2);
    }

    return colour;
}

//function to split avatar name
function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColour(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

//A constant style used throughout the page
const style = {  width: '100%',
    height: 1000,
    bgcolor:"gray",
    paddingTop:3
    };

//This function deals with getting a users full name
function userfullName(){
    let fname = sessionStorage.getItem('emp_fName');
    let lname = sessionStorage.getItem('emp_priviledge');
    let userfullname = stringAvatar(fname +" "+ lname);
    return{
       userfullname
    }
}

//This variable gets a users first name
var UserName = () => {
    var user = sessionStorage.getItem("emp_fName");
    return user;
}

//This class deals with the rendering of the page
export default function Settings(){

    //Declaring useState variables and methods that will be used throughout the page
    const [changeType, setType] = useState("");
    const [phone, setPhone] = useState("");
    const [cPhone, setCPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [current_password, setCPass] = useState("");
    const [emp_password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = (type) => {setType(type); setOpen(true);};
    const handleClose = () => { setEmail(""); setPhone(""); setPassword(""); setOpen(false);}

    //This function gets an employees contact details and stores them
    useEffect(() => {
        async function initialiseData() {
            const res = await axios.get("http://localhost:2420/getContact/" + sessionStorage.getItem("emp_id")).catch((err) => {
                console.log(err);
            });
            setCEmail(res.data[0].emp_email);
            setCPhone(res.data[0].emp_phNum);
        }
        initialiseData();
        }, []
    )

    //This method deals with submitting any changes to an employees data
    const submitChanges = async () => {
        //If the changed data is of phone type then update an employees phone number
        if (changeType === "phone") {
            await updatePhone(sessionStorage.getItem('emp_id'), phone);
        }
        //If the data is of email type then change an employees email address
        else if (changeType === "email") {
            await updateEmail(sessionStorage.getItem('emp_id'), email);
        }
        //If the data is of type password, check that they have entered their current password and if so change an employees password
        else if (changeType === "password") {
            const res = await verifyEmployee(sessionStorage.getItem('emp_id'), current_password);
            const empExists = res.empExists;
            if (empExists) {
                await updatePassword(sessionStorage.getItem('emp_id'), emp_password);
            }
        }
        document.location.reload();
    }


    //Deals with generating different modals for updating employee data
    const generateModal = () => {
        if(changeType === "phone") {
            //Returns a modal that allows an employee to update their phone number
            return(
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Change Phone Number
                    </Typography>
                    <br />
                    <TextField margin="normal"
                               required
                               fullWidth
                               id="phone"
                               label="New Phone Number"
                               name="phone"
                               autoComplete="name1234 or name@example.com"
                               autoFocus
                               onChange={(event) => {
                                   setPhone(event.target.value)
                               }}/>
                    <br /><br />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={() => submitChanges()}>Save Changes</button>
                    </div>
                </div>
            )
        }
        else if (changeType === "email") {
            //Returns a modal that allows an employee to update their email address
            return(
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Change Email
                    </Typography>
                    <br />
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
                    <br /><br />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={() => submitChanges()}>Save Changes</button>
                    </div>
                </div>
            )
        }
        else if (changeType === "password") {
            //Returns a modal that allows an employee to change their password
            return(
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Change Password
                    </Typography>
                    <br />
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
                    <br /><br />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={() => submitChanges()}>Save Changes</button>
                    </div>
                </div>
            )
        }
    }

    //Renders the settings page
    return(
        <>
          <Navbar/>
                <Container>
                    <Box
                    display={"flex"}
                    flexdirection={"row"}>

                        <Box>
                        <Sidebar/>
                        </Box>

                        <Box
                             sx={{...style}}
                             >
                            <Grid container spacing={3}>
                                <Grid item xs={12} display='flex'>
                                    <Avatar {...userfullName()} ></Avatar>
                                    &nbsp;&nbsp;
                                    <h3>{ UserName()}</h3>
                                </Grid>

                                <Grid item xs={12}>
                                    <Item>
                                        <h3 style={{fontWeight:"bold"}}>Account</h3>
                                        <h4>Account Information</h4>

                                        <List>
                                            <ListItem>
                                                <ListItemText>Employee Phone Number:
                                                    <p>{cPhone}</p>
                                                    <Button variant="contained" size="small" onClick={() => handleOpen("phone")}>Edit</Button>
                                                </ListItemText>


                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>Employee Email Address:
                                                    <p>{cEmail}</p>
                                                    <Button variant="contained" size="small" onClick={() => handleOpen("email")}>Edit</Button>
                                                </ListItemText>
                                            </ListItem>

                                        </List>


                                        <h4>Password and Security</h4>
                                        <List>
                                            <ListItem>
                                                <ListItemText>Password:
                                                    <br/> <Button variant="contained" size="small" onClick={() => handleOpen("password")}>Edit</Button>

                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </Item>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={modalStyle}>
                            {generateModal()}
                        </Box>
                    </Modal>
            </Container>
        </>
    );

}
