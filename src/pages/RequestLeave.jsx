import {React, useState} from "react";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker";
import {Container,Button, Box} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css"

const locales = {
    "en-AU": require("date-fns/locale/en-AU")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})



//Make a function to push into this events array


const events= [
    {
        title:"Public Holiday",
        allDay: true,
        start: new Date(2022,6,28),
        end: new Date(2022,6,28)
    },

]

export default function RequestLeave(){

    const [newEvent, setNewEvent] = useState({title:"", start:"",end:""})
    const [allEvents, setallEvents] = useState(events)

    function handleAddEvent() {
        setallEvents([...allEvents,newEvent])
    }

    return(
        <div className="App">


            <Navbar/>
            <Box
                flex={.7}
                bgcolor={"gray"}>
                <Sidebar/>
            </Box>
                <Container >
                    <h1>Request Leave</h1>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        m={1}
                    >

                        <input type="text" placeholder={"Leave Description"} value={newEvent.title}
                               onChange={(e) => setNewEvent({...newEvent, title:e.target.value}) }/>

                        <DatePicker placeholderText="Start Date" style={{marginBottom:'10px'}}
                                    selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent,start})} />

                        <DatePicker placeholderText="End Date"
                                    selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent,end})} />
                    </Box>


                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        m={1}>
                        <Button onClick={handleAddEvent} variant="contained">Request Leave</Button>
                    </Box>

                    <Calendar
                        localizer={localizer}
                        events={allEvents}
                        startAccessor="start"
                        endAccessor="end"

                        style={{height:500, margin:"50px"}} />

                </Container>

        </div>
    )

}