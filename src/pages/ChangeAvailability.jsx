import * as React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Roster from "../components/roster";
import {Box,Button,Container} from "@mui/material";
import Calendar from 'react-calendar';
const axios = require('axios');


//function to click on roster cell and update changes


export default function ChangeAvailability(){

    return(
        <main>
            <Navbar/>
            <Sidebar/>

            <Container disableGutters>


                        <Box

                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx ={{borderStyle:"solid", height:"700px", width:"1000px"}}
                        >
                            <Roster/>
                            <Button >Confirm Changes</Button>
                        </Box>
            </Container>
        </main>
    )



}

