import {React, useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Roster from "../components/roster";
import {Avatar, Box,Button,Container, Grid} from "@mui/material";
import Calendar from 'react-calendar';
const axios = require('axios');

document.title = "View Employee Availability";

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

//function to click on roster cell and update changes


export default function ViewAvailability(){
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

    
                <Container >

                    <Box
                        display={"flex"}
                            direction={"row"}>

                        <Box>
                            <Sidebar/>
                        </Box>
                       <Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                sx ={{ height:"600px", width:"1200px"}}
                            >
                                <Box>
                                    <Grid item xs={12} display='flex'>
                                    <Avatar {...stringAvatar(empName)} ></Avatar>
                                     <h3>{empName}</h3>
                                    </Grid>
                                </Box>
                                <Box>
                                    <br />
                                    <Roster/> {/*this will be the availability roster  */}
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Container>
            </main>
        )
    }
}