import {React, useState, useEffect} from "react";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Bowser from 'bowser';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import {Container,Button, Box} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const { getAvailabilities, getCompanyEvents, addNotification, removeRosterDate, addAvailability } = require("../modules/endpoint");

const locales = {
    "en-AU": require("date-fns/locale/en-AU")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

//Make a function to push into this events array
const events = [];

//we need to change colour based on type of leave: eg. pending approval by manager: yellow, approved: green, denied: red, public holiday: some other colour etc..

export default function RequestLeave(){
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setallEvents] = useState(events);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [leaveType, setLeaveType] = useState('');
    const handleSelect=(e)=>{
        setLeaveType(e);
    }

    async function handleAddEvent() {
        await setallEvents([...allEvents, newEvent]);
        const newEventObject = newEvent;
        
        //if start and end are not null and start time is not later than end time, allow leave to be added
        if((newEventObject.start !== "" && newEventObject.end !== "") && !(newEventObject.start > newEventObject.end))
        {
            const engine = Bowser.parse(window.navigator.userAgent).engine.name;

            //if the start time equals the end time, add the availability for the whole day
            if(newEventObject.start.getTime() === newEventObject.end.getTime())
            {
                const date = newEventObject.start;

                if(engine === "Blink")
                    date.setDate(date.getDate() + 1);

                const sqlDate = date.toISOString().split('T')[0].replace(/-/g, '/');

                //if user is employee, send notfication to manager. else, add directly into db
                if(sessionStorage.getItem('emp_privilege') === "Employee"){
                    await addNotification(sqlDate, "00:00", "23:59", sessionStorage.getItem('emp_id'), sessionStorage.getItem('company_id'), sessionStorage.getItem('emp_fName'), sessionStorage.getItem('emp_lName'), leaveType, "Manager", "leaveRequest");
                    alert("Your leave request has been sent to a manager. Awaiting approval.");
                } else{
                    await addAvailability(sqlDate, "00:00", "23:59", "Unavailable", sessionStorage.getItem('emp_id'));
                }
            }
            else
            {
                let dayLooper = newEventObject.start;
                dayLooper.setDate(dayLooper.getDate());

                if(engine === "Blink")
                    dayLooper.setDate(dayLooper.getDate() + 1);

                let endDate = newEventObject.end;
                endDate.setDate(endDate.getDate() + 1);

                if(engine === "Blink")
                    endDate.setDate(endDate.getDate() + 1);

                while(dayLooper.getTime() !== endDate.getTime())
                {
                    const sqlDate = dayLooper.toISOString().split('T')[0].replace(/-/g, '/');

                    if(sessionStorage.getItem('emp_privilege') === "Employee"){
                        await addNotification(sqlDate, "00:00", "23:59", sessionStorage.getItem('emp_id'), sessionStorage.getItem('company_id'), sessionStorage.getItem('emp_fName'), sessionStorage.getItem('emp_lName'), leaveType, "Manager", "leaveRequest");
                    } else{
                        await addAvailability(sqlDate, "00:00", "23:59", "Unavailable", sessionStorage.getItem('emp_id'));
                    }

                    dayLooper.setDate(dayLooper.getDate() + 1);
                }

                //if user is employee, send notfication to manager. else, add directly into db
                if(sessionStorage.getItem('emp_privilege') === "Employee")
                    alert("Your leave request has been sent to a manager. Awaiting approval.");
            }

            document.location.reload();
        }
    }

    useEffect(() => {
        const getAvailabilityData = async () => {
            var dayLooper = new Date();
            dayLooper.setDate(dayLooper.getDate() + 1);

            //get the current employee availabilites and company events from the db
            const employeeAvailabilities = await getAvailabilities(sessionStorage.getItem('emp_id'));
            const companyEvents = await getCompanyEvents(sessionStorage.getItem('company_id'));

            //if the employee has availabilities, add them to the calendar
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

            //if the company has events, add them to the calendar
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

                    <Container >
                        <Box display={"flex"}
                             flexDirection={"row"}>

                        <Box>
                            <Sidebar/>
                        </Box>

                        <Box>
                            <h1>Request Leave</h1>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                m={1}
                            >

                                <DropdownButton title="Leave Reason" onSelect={handleSelect}>
                                    <Dropdown.Item eventKey="RDO">RDO</Dropdown.Item>
                                    <Dropdown.Item eventKey="Sick Leave">Sick Leave</Dropdown.Item>
                                    <Dropdown.Item eventKey="Maternity / Parental Leave">Maternity / Parental Leave</Dropdown.Item>
                                    <Dropdown.Item eventKey="Family & Domestic Violence Leave">Family & Domestic Violence Leave</Dropdown.Item>
                                    <Dropdown.Item eventKey="Long Service Leave">Long Service Leave</Dropdown.Item>
                                    <Dropdown.Item eventKey="Community Sevice Leave">Community Service Leave</Dropdown.Item>
                                    <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                                </DropdownButton>

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

                                style={{height:800,width:'100%', margin:"50px"}} />
                        </Box>
                        </Box>
                    </Container>
    
            </div>
        )
    }
}
