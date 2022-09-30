import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Roster from "../components/roster";
import 'react-calendar/dist/Calendar.css';
import {React, useState} from "react";
import axios from 'axios';
import {Container, Box, Typography, TextField, List, ListItem, ListItemText} from "@mui/material";

const sha256 = require('crypto-js/sha256');

var UserName = () => {
    var user = sessionStorage.getItem("emp_fName");
    return user;
}

var displayTodaysDate = () => {  // displays the current date
    var showDate = new Date();
    var displayTodayDate = showDate.getDate() + '/' + (showDate.getMonth() + parseInt(1)) +'/'+ showDate.getFullYear();
    return displayTodayDate;
};

function showTime(date) { // shows the current time with am or pm
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

let weekStartConst = new Date();
weekStartConst.setDate(weekStartConst.getDate() - weekStartConst.getDay());

let weekStarts = [];

let date = new Date();
date.setDate(date.getDate() - date.getDay());

for(let i = 0; i < 3; i++){
    weekStarts.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() + 7);
}

export default function MainHub() {
    const [password, setPassword] = useState("");
    const [weekStart, setWeekStart] = useState(weekStartConst);
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePassword = async () => {
        if(password === confirmPassword){
            await axios.put("http://localhost:2420/updatePassword", {
                emp_id: sessionStorage.getItem('emp_id'),
                emp_password: sha256(password).toString(),
                emp_password_changed: true
            });

            sessionStorage.setItem('emp_password_changed', 1);
            document.location.reload();
        }
    }

    const handleWeekChange = (weekstart) => {
        let newDate = new Date(parseInt(weekstart.substring(0, 4)), parseInt(weekstart.substring(5, 7)), parseInt(weekstart.substring(8, 10)));
        setWeekStart(newDate);
    }

    sessionStorage.setItem('emp_view', sessionStorage.getItem('emp_id'));

    if(sessionStorage.getItem('emp_password_changed') === "1"){
        return(
            <main>
                <Navbar/>
                <Container >
                    <Box
                    display={"flex"}
                    flexdirection={"row"}>
                    <Sidebar/>
                    <Box m={1} >
                        <h3>{"Welcome " + UserName()}</h3>
                        <Box >
                                <List sx={{fontWeight:'bold'}}>
                                    <ListItem>
                                        <ListItemText disableTypography primary={<Typography type="body2" sx={{fontWeight:'bold'}}>This Weeks Roster: </Typography>} />
                                    </ListItem>
                                    <ListItem>
                                        {"Date: " + displayTodaysDate()}
                                    </ListItem>
                                    <ListItem>
                                        { "Time: " + showTime(new Date())}
                                    </ListItem>
                                </List>
                        </Box>
                        <Box display="flex"
                            justifyContent="flex-start"
                            p={1}
                        >
                            <label>Roster Week Start: </label>
                            &nbsp;
                            <select name="weekStart" defaultValue={weekStart} onChange={(event) => handleWeekChange(event.target.value)}>
                                {weekStarts.map((week_start, index) =>
                                    <option name={week_start} key={index}>{week_start}</option>
                                )}
                            </select>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"

                        >
                            <Roster week_start_sql={weekStart}/>
                        </Box>
                    </Box>
                    <br />
                    </Box>
                </Container>
            </main>
        )
    } else {
        return (
            <main>
                <Navbar/>

                <h1>Please change your password:</h1>

                <div className={"form-signin w-100 m-auto text-center"}>
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
                        id="confirmPassword"
                        autoComplete="confirm-password"
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                    <br /><br />
                    <button className="w-75 btn btn-lg btn-primary" onClick={updatePassword}>Update Password</button>
                </div>
            </main>
        )
    }
}