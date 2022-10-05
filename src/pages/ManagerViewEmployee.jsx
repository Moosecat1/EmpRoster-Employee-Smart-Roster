import {React, useState, useEffect, useReducer} from "react";
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

let weekStartConst = new Date();
weekStartConst.setDate(weekStartConst.getDate() - weekStartConst.getDay());

export default function ManagerViewEmployee(){
    const [empName, setEmpName] = useState("");
    const [weekStart, setWeekStart] = useState(weekStartConst);
    const [weekStarts, setWeekStarts] = useState([]);
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

        let weekStarts = [];

        let date = new Date();
        date.setDate(date.getDate() - date.getDay());

        for(let i = 0; i < 3; i++){
            weekStarts.push(date.toISOString().split('T')[0]);
            date.setDate(date.getDate() + 7);
        }

        setWeekStarts(weekStarts);
    }, []);

    const handleWeekChange = (weekstart) => {
        let newDate = new Date(parseInt(weekstart.substring(0, 4)), parseInt(weekstart.substring(5, 7)), parseInt(weekstart.substring(8, 10)));
        setWeekStart(newDate);
    }

    if(hasLoaded)
    {
        return(
            <main>
                <Navbar/>
                <Container >
                    <Box
                        display={"flex"}
                        direction={"row"}>

                        <Box >
                            <Sidebar/>
                        </Box>

                        <Box m={2}>
                            <Box display="flex"
                                flexDirection="row"
                                justifyContent="flex-start">

                                <Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        p={1}
                                    >
                                        <Avatar {...stringAvatar(empName)} ></Avatar>
                                        &nbsp;
                                            <h3>{empName}</h3>
                                    </Box>

                                    <Box display="flex"
                                        flexDirection="column"
                                        justifyContent="flex-start"
                                        p={1}
                                    >
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
                                    <br />
                                    <Box

                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx ={{width:"1000px"}}
                                    >
                                        <Roster week_start_sql={weekStart}/>
                                    </Box>
                                </Box >
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </main>
        )
    }


}