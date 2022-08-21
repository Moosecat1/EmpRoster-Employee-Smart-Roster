import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Roster from "../components/roster";
import 'react-calendar/dist/Calendar.css';
import React from "react";
import {Container, Box, Typography, Avatar,List,ListItem,ListItemText} from "@mui/material";

const axios = require('axios');

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



export default function MainHub() {

    sessionStorage.setItem('emp_view', sessionStorage.getItem('emp_id'));

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
                    <Box

                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"

                    >
                        <Roster/>
                    </Box>
            </Box>

            <br />
            </Box>
        </Container>


    </main>
)
}