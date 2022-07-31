import * as React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Roster from "../components/roster";
import {Avatar,Box,Button,Container,Typography,List,ListItem,ListItemText} from "@mui/material";
import Calendar from 'react-calendar';
const axios = require('axios');


var displayTodaysDate = () => {  // displays the current date
    var showDate = new Date();
    var displayTodayDate = showDate.getDate() + '/' + (showDate.getMonth() + parseInt(1)) +'/'+ showDate.getFullYear()
    return displayTodayDate
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





export default function ManagerViewEmployee(){

    return(
        <main>
            <Navbar/>
            <Sidebar/>

            <Container disableGutters>


                <Box display="flex"
                     flexDirection="row"
                     justifyContent="flex-start">

                    <Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-start"
                        >
                            <Avatar
                                alt="User Name"
                                src=""
                                sx={{ width: 56, height: 56 }}
                            />

                            <Typography variant="h4">User Name</Typography>



                        </Box>

                        <Box display="flex"
                             flexDirection="column"
                             justifyContent="flex-start">
                            <List sx={{fontWeight:'bold'}}>
                                <ListItem>
                                    <ListItemText disableTypography primary={<Typography type="body2" sx={{fontWeight:'bold'}}>This Weeks Roster:</Typography>} />
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
                            alignItems="flex-start"
                            sx ={{height:"700px", width:"1000px"}}
                        >
                            <Roster/>
                        </Box>
                    </Box >
                </Box>
            </Container>
        </main>
    )



}