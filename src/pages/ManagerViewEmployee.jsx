import {React, useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Roster from "../components/roster";
import {Avatar,Box,Button,Container,Typography,List,ListItem,ListItemText, Grid} from "@mui/material";
import Calendar from 'react-calendar';
const axios = require('axios');


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

    const [empName, setEmpName] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const getEmpName = async () => {
            const res = await axios.get("http://localhost:2420/getEmployeeName/" + sessionStorage.getItem('emp_view'));
            const fname = res.data[0].emp_fName;
            const lname = res.data[0].emp_lName;

            setEmpName(fname + " " + lname);
            setHasLoaded(true);
        }

        getEmpName();
    }, []);

    if(hasLoaded)
    {

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
                            <Avatar {...stringAvatar(empName)} ></Avatar>
                            &nbsp;
                                <h3>{empName}</h3>
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
                            sx ={{width:"1000px"}}
                        >
                            <Roster/>
                        </Box>
                    </Box >
                </Box>
            </Container>
        </main>
    )
    }


}