import * as React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Roster from "../components/roster";
import {Box,Button,Container,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper} from "@mui/material";
import Calendar from 'react-calendar';
const axios = require('axios');


const TableData = [{
    StartTime: 'Start Time',
    EndTime: 'End Time',
    DayST : '--:--',
    DayFT : '--:--',
}
]



export default function ChangeAvailability(){

    return(
        <main>
            <Navbar/>


            <Container >

                <Box display={"flex"}
                flexdirection={"row"}>

                <Box p={1}>
                    <Sidebar/>
                </Box>


                <Box
                    >
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx ={{ height:"300px", width:"800px"}}

                        >
                            <TableContainer component={Paper}>
                                <Table aria-label={"AvailibilityTable"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Sunday</TableCell>
                                            <TableCell>Monday</TableCell>
                                            <TableCell>Tuesday</TableCell>
                                            <TableCell>Wednesday</TableCell>
                                            <TableCell>Thursday</TableCell>
                                            <TableCell>Friday</TableCell>
                                            <TableCell>Saturday</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {TableData.map(row => (
                                            <>
                                                <TableRow key={row.StartTime} sx={{'&:last-child td, &:last-child th': {border:0}}}
                                                >
                                                    <TableCell>{row.StartTime}</TableCell>
                                                    <TableCell>{row.DayST}</TableCell>
                                                    <TableCell>{row.DayST}</TableCell>
                                                    <TableCell>{row.DayST}</TableCell>
                                                    <TableCell>{row.DayST}</TableCell>
                                                    <TableCell>{row.DayST}</TableCell>
                                                    <TableCell>{row.DayST}</TableCell>
                                                    <TableCell>{row.DayST}</TableCell>
                                                </TableRow>
                                                <TableRow key={row.StartTime} sx={{'&:last-child td, &:last-child th': {border:0}}}>
                                                        <TableCell>{row.EndTime}</TableCell>
                                                        <TableCell>{row.DayFT}</TableCell>
                                                        <TableCell>{row.DayFT}</TableCell>
                                                        <TableCell>{row.DayFT}</TableCell>
                                                        <TableCell>{row.DayFT}</TableCell>
                                                        <TableCell>{row.DayFT}</TableCell>
                                                        <TableCell>{row.DayFT}</TableCell>
                                                        <TableCell>{row.DayFT}</TableCell>
                                                </TableRow>
                                            </>
                                        ))

                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                    <Box
                        display="flex"
                        justifyContent="center">
                        <Button variant="contained" >Confirm Changes</Button>
                    </Box>
                </Box>
                </Box>
            </Container>
        </main>
    )

}

