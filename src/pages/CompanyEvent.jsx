import {React, useEffect, useState} from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { Modal,Container, Box,TextField, Typography, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import axios from "axios";

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

const nameStyle = {
    backgroundColor: '#c5ceff',
    border: '1px solid black'
}

const posStyle = {
    backgroundColor: '#eaf3fc',
    border: '1px solid black'
}

const negStyle = {
    backgroundColor: '#F7F8FC',
    border: '1px solid black'
}

const times = ["All Day", "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00",
            "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
            "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
            "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
            "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
        ];

export default function CompanyEvent(){
    const [companyEvents, setCompanyEvents] = useState([]);
    const [isLoaded, setIsLoaded]= useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [inputFields, setInputFields] = useState([
        {
            name: '', date: '', start: 'All Day', end: 'All Day'
        }
    ]);

    const handleAddOpen = () => {setAddOpen(true);}
    const handleAddClose = () => {
        const string = "Are you sure you want to exit? All input data will be lost.";
        let conf = window.confirm(string);

        if(conf){
            setInputFields([{name: '', date: '', start: 'All Day', end: 'All Day'}]);
            setAddOpen(false);
        }    
    }

    useEffect(() => {
        const getCompanyEvents = async () => {
            const res = await axios.get("http://localhost:2420/getCompanyEvents/" + sessionStorage.getItem('company_id'));
            console.log("http://localhost:2420/getCompanyEvents/" + sessionStorage.getItem('company_id'));
            for(let i = 0; i < res.data.length; i++){
                let event_date = res.data[i].event_date;

                const date = new Date(parseInt(event_date.substring(0, 4)), parseInt(event_date.substring(5, 7)) - 1, parseInt(event_date.substring(8, 10)) + 1);

                res.data[i].event_date = date.toDateString();
            }

            setCompanyEvents(res.data);
            setIsLoaded(true);
        }

        getCompanyEvents();
    }, []);

    const handleDateChange = (index, date) => {
        let eventObj = {
            target: {
                value: date,
                name: "date"
            }
        }

        handleChangeInput(index, eventObj);
    }

    const handleChangeInput = (index, event) => {
        var labels = document.getElementsByClassName(event.target.name);

        for(let i = 0; i < labels.length; i++)
        {
            labels[i].innerHTML = "";
        }

        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleAdd = () => {
        setInputFields([...inputFields, {name: '', date: '', start: 'All Day', end: 'All Day'}]);
    }

    const handleRemove = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    //delete event in DB using unique ID and then reload the page
    const removeEvent = async (index) => {
        await axios.delete("http://localhost:2420/removeCompanyEvent/" + index);
        document.location.reload();
    }

    const generateEventTable = () => {
        return companyEvents.map((companyEvent, index) => 
            <tr key={index}>
                <td style={nameStyle}>{companyEvent.event_name}</td>
                <td style={posStyle}>{companyEvent.event_date}</td>
                <td style={posStyle}>{companyEvent.event_start !== null ? companyEvent.event_start : "All Day"}</td>
                <td style={posStyle}>{companyEvent.event_end !== null ? companyEvent.event_end : "All Day"}</td>
                <td style={negStyle}>
                    <Button variant={"contained"} color={"error"} onClick={() => removeEvent(companyEvent.event_id)}>Remove</Button>
                </td>
            </tr>
        );
    }

    const checkEmpty = () => {
        if(companyEvents.length !== 0){
            return(
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Start</th>
                            <th>End</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateEventTable()}
                    </tbody>
                </table>
            );
        } else{
            return(
                <h1>No events have been created for the company.</h1>
            )
        }
    }

    const generateAddModal = () => {
        return(
            <form onSubmit={handleSubmit}>
                {inputFields.map((inputField, index) => 
                    <div className={"form-signin w-100 m-auto text-center"} key={index}>
                        <p>{`Event ${index}`}</p>
                            <TextField
                                required
                                className={"form-control"}
                                name={"name"}
                                value={inputField.name}
                                 label= {"Event Name"}
                                onChange={event => handleChangeInput(index, event)}
                            />
                        <br /><br />
                        <DatePicker placeholderText="Event Date" selected={inputField.date} onChange={(date) => handleDateChange(index, date)}/>
                        <br /><br />
                        <label>Event Start:</label>
                        &nbsp;
                        <select id={"startTime"} name={'start'} onChange={event => handleChangeInput(index, event)}>
                            {times.map((time, index) => 
                                <option key={index} value={time}>{time}</option>
                            )}
                        </select>
                        <br /><br />
                        <label>Event End:</label>
                        &nbsp;
                        <select id={"endTime"} name={'end'} onChange={event => handleChangeInput(index, event)}>
                            {times.map((time, index) => 
                                <option key={index} value={time}>{time}</option>
                            )}
                        </select>
                        <br /><br />
                        <div className='buttonDiv'>
                            <Button variant={'contained'} id="removeButton" onClick={() => handleRemove(index)}>Remove Event</Button>
                        </div>
                    </div>
                )}
                <div className='buttonDiv'>
                <Button variant={'contained'} id="addButton" onClick={handleAdd}>Add Event</Button>
                </div>
            </form>
        );
    }

    const addEvents = async () => {
        console.log(inputFields);

        let error = false;

        for(let i = 0; i < inputFields.length; i++){
            const inputField = inputFields[i];

            if(inputField.date === '' || inputField.name === ''){
                error = true;
                alert(`Event date and name cannot be empty at event ${i}.`);
                break;
            } 
            if(inputField.start === 'All Day' ^ inputField.end === 'All Day'){
                error = true;
                alert(`Start and end times cannot must both be all day or not at all at event ${i}.`);
                break;
            }
        }

        if(!error){
            for(let i = 0; i < inputFields.length; i++){
                const inputField = inputFields[i];

                const event_date = inputField.date.toISOString().substring(0, 10);
                const event_start = inputField.start === 'All Day' ? null : inputField.start; 
                const event_end = inputField.end === 'All Day' ? null : inputField.end;

                await axios.post("http://localhost:2420/addCompanyEvent", {
                    event_date: event_date,
                    event_start: event_start,
                    event_end: event_end,
                    event_name: inputField.name,
                    company_id: sessionStorage.getItem('company_id')
                });
            }

            document.location.reload();
        }
            
    }
    
    if(isLoaded){
        return(
            <>
                <Navbar/>
                <Container>
                    <Box display={"flex"}
                        flexdirection={"row"}>
                        <Box>
                            <Sidebar/>
                        </Box>

                        <Box m={5}
                             display="flex"
                             flexDirection="column"
                             justifyContent="center"
                             alignItems="center">
                            <div>
                            {checkEmpty()}
                        </div>
                            <br />
                            <Button variant={'contained'} onClick={() => handleAddOpen()}>Add Event</Button>
                            <Modal
                                open={addOpen}
                                onClose={handleAddClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={modalStyle}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add Company Events
                                    </Typography>
                                    <br />
                                    {generateAddModal()}
                                    <br />
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <Button variant='contained' onClick={() => addEvents()}>Add Events</Button>
                                    </div>
                                </Box>
                            </Modal>
                        </Box>
                    </Box>
                </Container>
            </>
        );
    }
}