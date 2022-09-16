import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import {Box,Button,Container,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Modal,Typography} from "@mui/material";
const { addNotification } = require('../modules/endpoint');
const axios = require('axios');

const rowNames = ['Start-Time', 'End-Time'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const times = ["N/A", "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00",
            "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
            "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
            "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
            "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
        ];

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

export default function ChangeAvailability(){
    const [regularAvailabilities, setRegularAvailabilities] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [currentDay, setCurrentDay] = useState(-1);

    const handleOpen = (dayView) => {setCurrentDay(dayView); setOpen(true);};
    const handleClose = () => {setCurrentDay(-1); setOpen(false)};

    useEffect(() => {
        async function getData(){
            const res = await axios.get("http://localhost:2420/getRegularAvailabilities/" + sessionStorage.getItem('emp_id')).catch((err) => console.log(err));

            const regularAvailabilities = res.data;

            setRegularAvailabilities(regularAvailabilities);
        }

        getData();
    }, []);

    const objectFields = ["reg_start", "reg_end"];

    const generateString = (dayIndex, fieldIndex) => {
        const cellValue = regularAvailabilities[dayIndex][objectFields[fieldIndex]];

        if(cellValue !== null){
            return cellValue.substring(0, 5);
        } else{
            return "-=--=--=-";
        }
    }

    const generateAvailabilities = () => {
        if(regularAvailabilities[0] !== undefined){
            return rowNames.map((rowName, index) => 
                <TableRow key={index}>
                    <TableCell>{rowName}</TableCell>
                    <TableCell>{generateString(0, index)}</TableCell>
                    <TableCell>{generateString(1, index)}</TableCell>
                    <TableCell>{generateString(2, index)}</TableCell>
                    <TableCell>{generateString(3, index)}</TableCell>
                    <TableCell>{generateString(4, index)}</TableCell>
                    <TableCell>{generateString(5, index)}</TableCell>
                    <TableCell>{generateString(6, index)}</TableCell>
                </TableRow>
            );
        }
    }

    const addRegularAvailability = async () => {
        let startTime = document.getElementById("startTime").value;
        let endTime = document.getElementById("endTime").value;

        if(startTime === "N/A"){startTime = null;}
        if(endTime === "N/A"){endTime = null;}

        if(!(startTime === null ^ endTime === null)){
            await addNotification(null, startTime, endTime, sessionStorage.getItem('emp_id'), sessionStorage.getItem('company_id'), sessionStorage.getItem('emp_fName'), sessionStorage.getItem('emp_lName'), currentDay, "Manager", "availabilityChange");
            
            document.location.reload();
        } else{
            alert("Please select a time for both start and end.");
        }
    }

    const generateModal = () => {
        if(regularAvailabilities[currentDay] !== undefined){
            let currentStart = "N/A";
            let currentEnd = "N/A";

            if(regularAvailabilities[currentDay][objectFields[0]] !== null && regularAvailabilities[currentDay][objectFields[1]] !== null){
                currentStart = regularAvailabilities[currentDay][objectFields[0]].substring(0, 5);
                currentEnd = regularAvailabilities[currentDay][objectFields[1]].substring(0, 5);
            }

            const currentStartIndex = times.indexOf(currentStart);
            const currentEndIndex = times.indexOf(currentEnd);

            return (
                <>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {dayNames[currentDay]}
                    </Typography>
                    <br />
                    <div>
                        <label>Start Time:</label>
                        &nbsp;
                        <select id={"startTime"} name={'Start'} defaultValue={times[currentStartIndex]}>
                            {times.map(time => 
                                <option value={time}>{time}</option>
                            )}
                        </select>
                        &nbsp;&nbsp;
                        <label>End Time:</label>
                        &nbsp;
                        <select id={"endTime"} name={'End'} defaultValue={times[currentEndIndex]}>
                            {times.map(time => 
                                <option value={time}>{time}</option>
                            )}
                        </select>
                    </div>
                    <br />
                    <div>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Button variant='contained' onClick={() => addRegularAvailability()}>Save Times</Button>
                        </Box>
                    </div>
                </>
            );
        }
    }

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
                                            <TableCell onClick={() => handleOpen(0)}>Sunday</TableCell>
                                            <TableCell onClick={() => handleOpen(1)}>Monday</TableCell>
                                            <TableCell onClick={() => handleOpen(2)}>Tuesday</TableCell>
                                            <TableCell onClick={() => handleOpen(3)}>Wednesday</TableCell>
                                            <TableCell onClick={() => handleOpen(4)}>Thursday</TableCell>
                                            <TableCell onClick={() => handleOpen(5)}>Friday</TableCell>
                                            <TableCell onClick={() => handleOpen(6)}>Saturday</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {generateAvailabilities()}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            {generateModal()}
                        </Box>
                    </Modal>
                </Box>
                </Box>
            </Container>
        </main>
    )

}

