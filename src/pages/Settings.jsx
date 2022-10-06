import * as React from 'react';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import {ManageAccounts, Brush ,Camera} from "@mui/icons-material";

import {Box, Button, Container, TextField, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Stack, Grid, Paper, Avatar, styled, Slider, Switch, Collapse, Alert, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {useState} from "react";
const axios = require('axios');

const { verifyEmployee, updatePassword, updateEmail, updatePhone } = require('../modules/endpoint');

const Item = styled(Paper)(({ theme }) => ({ // makes a simple container which holds an item
    backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));

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

const label = { inputProps: { 'aria-label': 'Colour-Blind-Switch' } }; //simple switch label

function stringToColour(string) { // This function is to make a string to a colour
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return colour;
}

function stringAvatar(name) { //function to split avatar name
    return {
        sx: {
            bgcolor: stringToColour(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const style = {  width: '100%',
    height: 1000,
    bgcolor:"gray",
    paddingTop:3
    };

function userfullName(){
    let fname = sessionStorage.getItem('emp_fName');
    let lname = sessionStorage.getItem('emp_priviledge');
    let userfullname = stringAvatar(fname +" "+ lname);
    return{
       userfullname
    }
}

var UserName = () => {
    var user = sessionStorage.getItem("emp_fName");
    return user;
}



function valuetext(value) { //font size value
    return `${value}px`;
}

export default function Settings(){

    const [theme, setTheme] = React.useState(1);
    const [changeType, setType] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [current_password, setCPass] = useState("");
    const [emp_password, setPassword] = useState("");
    const [loginMessage, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const handleOpen = (type) => {setType(type); setOpen(true);};
    const handleClose = () => {/*{setCurrentEmployeeData({emp_fName: '', emp_lName: '', emp_email: '', emp_type: '', emp_privilege: ''});*/ setOpen(false);}

    const handleChange = (event) => {
        setTheme(event.target.value);
    };

    const submitChanges = async () => {
        if (changeType == "phone") {
            (async () => {
                await updatePhone(sessionStorage.getItem('emp_id'), phone);
            })();
            document.location.reload();
        }
        else if (changeType == "email") {
            (async () => {
                await updateEmail(sessionStorage.getItem('emp_id'), email);
            })();
        }
        else if (changeType == "password") {
            (async () => {
                const res = await verifyEmployee(sessionStorage.getItem('emp_id'), current_password);
                const empExists = res.empExists;
                if (empExists) {
                    await updatePassword(sessionStorage.getItem('emp_id'), emp_password, 1);
                    setAlert(false)
                } else { //otherwise open the alert and set the error message
                    setAlert(true);
                    setMessage("Incorrect email or password");
                }
            })();
        }
    }

    const generateModal = () => {
        if(changeType == "phone") {
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
        else if (changeType == "email") {
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
        else if (changeType == "password") {
            return(
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Change Password
                    </Typography>
                    <br />
                    <Collapse in={open}>
                        <Alert severity="error" action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlert(false);
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
                    <br /><br />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={() => submitChanges()}>Save Changes</button>
                    </div>
                </div>
            )
        }
    }

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
                                            <ListItem><ListItemText>Employement Status:</ListItemText></ListItem>
                                            <ListItem><ListItemText>Employement Role:</ListItemText></ListItem>
                                        </List>

                                        <List>
                                            <ListItem>
                                                <ListItemText>Employee Phone Number:
                                                    <br/>
                                                    <Button variant="contained" size="small" onClick={() => handleOpen("phone")}>Edit</Button>
                                                </ListItemText>


                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>Employee Email Address:
                                                    <br/>
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

                                            <ListItem>
                                                <ListItemText>Two Factor Authentication:
                                                    <br/> <Button variant="contained" size="small" submit>Edit</Button>
                                                </ListItemText>
                                            </ListItem>

                                        </List>

                                        <h3 style={{fontWeight:"bold"}}>Accessibility</h3>

                                    <List>
                                        <ListItem><ListItemText>Font Size:</ListItemText></ListItem>
                                        <ListItem><Slider

                                            defaultValue={14}
                                            getAriaValueText={valuetext}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={12}
                                            max={18}
                                            disabled
                                        /></ListItem>
                                    </List>

                                    <List>
                                        <ListItem><ListItemText>Colour Blind:</ListItemText>
                                            <Switch {...label} disabled/>
                                        </ListItem>

                                    </List>

                                        <h3 style={{fontWeight:"bold"}}>Themes</h3>


                                        <List>
                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }}>
                                                        <InputLabel id="simple-select-label">Change Theme:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Preset</MenuItem>
                                                            <MenuItem value={2}>Custom</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }} disabled>
                                                        <InputLabel id="simple-select-label">Primary Colour:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Default</MenuItem>
                                                            <MenuItem value={2}>Galaxy</MenuItem>
                                                            <MenuItem value={3}>Midnight</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }} disabled>
                                                        <InputLabel id="simple-select-label">Secondary Colour:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Default</MenuItem>
                                                            <MenuItem value={2}>Black</MenuItem>
                                                            <MenuItem value={3}>Blue</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }} disabled>
                                                        <InputLabel id="simple-select-label">Text Colour:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Default</MenuItem>
                                                            <MenuItem value={2}>White</MenuItem>
                                                            <MenuItem value={3}>Black</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <Box padding={2}>

                                                <Button><img src="public/s.png" width="100" height="100" alt="sunrise-colour"/></Button>
                                                <Button> <img src="public/p.png" width="100" height="100" alt="midnight-colour"/></Button>
                                                <Button>   <img src="public/pink.png" width="100" height="100" alt="hotpink-colour"/></Button>
                                                <Button>  <img src="public/b.png" width="100" height="100" alt="aqua-colour"/></Button>
                                                <br/>
                                            </Box>
                                            <Button variant="contained" submit>Save Changes</Button>
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
