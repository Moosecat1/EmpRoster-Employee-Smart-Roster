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

            <Container >

                <Box
                    >
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx ={{borderStyle:"solid", height:"600px", width:"1000px"}}
                        >
                            <Roster/>
                        </Box>
                    <Box
                        p={1}
                        sx ={{ width:"1000px"}}
                        display="flex"
                        justifyContent="center">
                        <Button variant="contained" >Confirm Changes</Button>
                    </Box>
                </Box>
            </Container>
        </main>
    )



}

