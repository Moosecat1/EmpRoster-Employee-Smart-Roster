import {React, useState, useEffect} from "react";
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
import { getAvailabilities, getCompanyEvents, addAvailability } from "../modules/endpoint";

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

const months = new Map([
    ["Jan", 0], ["Feb", 1], ["Mar", 2], ["Apr", 3],
    ["May", 4], ["Jun", 5], ["Jul", 6], ["Aug", 7],
    ["Sep", 8], ["Oct", 9], ["Nov", 10], ["Dec", 11]
]);

//Make a function to push into this events array
const events = [];

//we need to change colour based on type of leave: eg. pending approval by manager: yellow, approved: green, denied: red, public holiday: some other colour etc..

export default function RequestLeave(){

    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setallEvents] = useState(events);
    const [hasLoaded, setHasLoaded] = useState(false);

    async function handleAddEvent() {
        await setallEvents([...allEvents, newEvent]);
        const newEventObject = newEvent;
        
        if((newEventObject.start !== "" && newEventObject.end !== "") && !(newEventObject.start > newEventObject.end))
        {
            if(newEventObject.start.getTime() === newEventObject.end.getTime())
            {
                const date = newEventObject.start;
                date.setDate(date.getDate() + 1);
                const sqlDate = date.toISOString().split('T')[0].replace(/-/g, '/');
                await addAvailability(sqlDate, "00:00", "23:59", "Unavailable", sessionStorage.getItem('emp_id'));
            }
            else
            {
                let dayLooper = newEventObject.start;
                dayLooper.setDate(dayLooper.getDate() + 1);

                let endDate = newEventObject.end;
                endDate.setDate(endDate.getDate() + 1);

                while(dayLooper.getTime() !== endDate.getTime())
                {
                    const sqlDate = dayLooper.toISOString().split('T')[0].replace(/-/g, '/');
                    console.log(sqlDate);
                    await addAvailability(sqlDate, "00:00", "23:59", "Unavailable", sessionStorage.getItem('emp_id'));
                    dayLooper.setDate(dayLooper.getDate() + 1);
                }
            }

            document.location.reload();
        }
    }

    useEffect(() => {
        const getAvailabilityData = async () => {
            var dayLooper = new Date();
            dayLooper.setDate(dayLooper.getDate() + 1);
            const sqlDate = dayLooper.toISOString().split('T')[0];

            const employeeAvailabilities = await getAvailabilities(sessionStorage.getItem('emp_id'));
            const companyEvents = await getCompanyEvents(sessionStorage.getItem('company_id'));

            if(employeeAvailabilities.hasAvailabilities)
            {
                for(let i = 0; i < employeeAvailabilities.availabilities.length; i++)
                {
                    const dateString = employeeAvailabilities.availabilities[i].avail_date;
                    
                    const title = employeeAvailabilities.availabilities[i].avail_type;

                    const year = parseInt(dateString.substring(0, 4));
                    const month = parseInt(dateString.substring(5, 7));
                    const day = parseInt(dateString.substring(8, 10));

                    const availabilityDate = new Date(year, month - 1, day + 1);

                    events.push({title: title, allDay: true, start: availabilityDate, end: availabilityDate});
                }
            }

            if(companyEvents.hasEvents)
            {
                for(let i = 0; i < companyEvents.events.length; i++)
                {
                    const dateString = companyEvents.events[i].event_date;

                    const title = companyEvents.events[i].event_name;

                    const year = parseInt(dateString.substring(0, 4));
                    const month = parseInt(dateString.substring(5, 7));
                    const day = parseInt(dateString.substring(8, 10));

                    const eventDate = new Date(year, month - 1, day + 1);

                    events.push({title: title, allDay: true, start: eventDate, end: eventDate});
                }
            }

            setHasLoaded(true);
        }

        getAvailabilityData();
    }, []);

    if(hasLoaded)
    {
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
    
                            style={{height:800, margin:"50px"}} />
    
                    </Container>
    
            </div>
        )
    }
}