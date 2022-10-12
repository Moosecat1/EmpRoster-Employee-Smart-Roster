import React, {Component} from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import '../css/roster.css'

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

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const times = ["N/A", "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00",
            "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
            "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
            "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
            "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
        ];

class EditableRoster extends Component {
    state = {
        weekStart : new Date(),
        weekDates : [],
        employeeRosters : [],
        availabilities : [],
        isLoaded : false,
        open : false,
        currentEmpView: '',
        currentDayIndex: 0
    }

    handleOpen = (currentEmpView, currentDayIndex) => this.setState({open: true, currentEmpView: currentEmpView, currentDayIndex: currentDayIndex});
    handleClose = () => this.setState({open: false});

    checkDay(employeeRoster, dayIndex){
        const {employeeRosters, weekDates}= this.state;

        function timesString(rosterIndex){
            const rostDay = employeeRosters[employeeRoster][rosterIndex];
            const startString = "Start Time: " + rostDay.rost_start;
            const endString = "End Time: " + rostDay.rost_end;

            return(
                <>
                    <p>{startString}</p>
                    <p>{endString}</p>
                </>
            )
        }
        
        let empWorking = false;
        let rosterIndex;

        for(let i = 0; i < employeeRosters[employeeRoster].length; i++){
            const rosterDate = employeeRosters[employeeRoster][i];
            let dayMinusOne = new Date(rosterDate.rost_date);
            dayMinusOne.setDate(dayMinusOne.getDate() + 1);
            const formattedDate = dayMinusOne.toISOString().substring(0, 10);

            if(formattedDate === weekDates[dayIndex]){
                if(rosterDate.rost_start !== null && rosterDate.rost_end !== null){
                    empWorking = true;
                    rosterIndex = i;
                }
            }
        }
        
        //if the employee is working on the specified day, return the table cell with start and end time
        if(empWorking)
        {
            return({
                text: (timesString(rosterIndex)),
                style: posStyle
            });
        }
        //if the employee is not working that day, return the table cell with 'not rostered' text
        else
        {
            return({
                text: (<span>Not Rostered</span>),
                style: negStyle
            });
        }
    }

    processEmployeeTimes(){
        const {employeeRosters}= this.state;

        return Object.keys(employeeRosters).map((employee, index) => 
            <tr key={index}>
                <td style={nameStyle}>{employee}</td>
                <td style={this.checkDay(employee, 0).style} onClick={() => this.handleOpen(employee, 0)}>{this.checkDay(employee, 0).text}</td>
                <td style={this.checkDay(employee, 1).style} onClick={() => this.handleOpen(employee, 1)}>{this.checkDay(employee, 1).text}</td>
                <td style={this.checkDay(employee, 2).style} onClick={() => this.handleOpen(employee, 2)}>{this.checkDay(employee, 2).text}</td>
                <td style={this.checkDay(employee, 3).style} onClick={() => this.handleOpen(employee, 3)}>{this.checkDay(employee, 3).text}</td>
                <td style={this.checkDay(employee, 4).style} onClick={() => this.handleOpen(employee, 4)}>{this.checkDay(employee, 4).text}</td>
                <td style={this.checkDay(employee, 5).style} onClick={() => this.handleOpen(employee, 5)}>{this.checkDay(employee, 5).text}</td>
                <td style={this.checkDay(employee, 6).style} onClick={() => this.handleOpen(employee, 6)}>{this.checkDay(employee, 6).text}</td>
            </tr>
        );
    }

    async addRosterTime(empId, selectedDate, earliestAvail, latestAvail){
        let startTime = document.getElementById("startTime").value;
        let endTime = document.getElementById("endTime").value;

        let startTimeFloat = this.timeToFloat(startTime);
        let endTimeFloat = this.timeToFloat(endTime);

        if(startTime === "N/A"){startTime = null;}
        if(endTime === "N/A"){endTime = null;}

        if((startTime === null ^ endTime === null)){
            alert("Please select a time for both start and end.");
            return;
        }
        if(startTimeFloat >= endTimeFloat){
            alert("End time cannot be greater than start time.");
            return;
        }
        
        if((startTimeFloat >= earliestAvail && startTimeFloat <= latestAvail) && (endTimeFloat >= earliestAvail && endTimeFloat <= latestAvail)){
                await axios.put("http://localhost:2420/updateRoster", {
                    emp_id: empId,
                    rost_date: selectedDate,
                    rost_start: startTime,
                    rost_end: endTime
                });

                document.location.reload();
        } else{
            const conf = window.confirm("The selected times do not align with the employee's availabilities. Do you wish to proceed?");

            if(conf){
                await axios.put("http://localhost:2420/updateRoster", {
                    emp_id: empId,
                    rost_date: selectedDate,
                    rost_start: startTime,
                    rost_end: endTime
                });
                
                document.location.reload();
            }
        }
    }

    timeToFloat(time){
        return parseFloat(time.replace(/:/g, '.'));
    }

    generateModal(){
            const {currentEmpView, currentDayIndex, weekDates, employeeRosters} = this.state;

            if(typeof employeeRosters[currentEmpView] != "undefined")
            {
                const rostDate = employeeRosters[currentEmpView][currentDayIndex];

                let currentStart = "N/A";
                let currentEnd = "N/A";

                if(rostDate.rost_start !== null && rostDate.rost_end !== null){
                    currentStart = rostDate.rost_start.substring(0, 5);
                    currentEnd = rostDate.rost_end.substring(0, 5);
                }

                const currentStartIndex = times.indexOf(currentStart);
                const currentEndIndex = times.indexOf(currentEnd);

                const {availabilities} = this.state;

                const regAvail = availabilities.regular[currentEmpView][currentDayIndex];

                const leaveAvail = availabilities.leave[currentEmpView] !== null ? availabilities.leave[currentEmpView].find(element => {
                    return element.avail_date === weekDates[currentDayIndex];
                }) : undefined;

                const compEvent = availabilities.company.find(element => {
                    return element.event_date === weekDates[currentDayIndex];
                });

                const reg = [(regAvail === undefined || regAvail.reg_start === null) ? "25:00" : regAvail.reg_start, (regAvail === undefined || regAvail.reg_end === null) ? "-1:00" : regAvail.reg_end];
                const leave = [(leaveAvail === undefined || leaveAvail.avail_start === null) ? "25:00" : leaveAvail.avail_start, (leaveAvail === undefined || leaveAvail.avail_end === null) ? "-1:00" : leaveAvail.avail_end];
                const comp = [(compEvent === undefined) ? "25:00" : (compEvent.event_start === null) ? "25:00" : compEvent.event_start, (compEvent === undefined) ? "-1:00" : (compEvent.event_end === null) ? "-1:00" : compEvent.event_end];

                let earliestAvail = Math.min(...[this.timeToFloat(reg[0]), this.timeToFloat(leave[0]), this.timeToFloat(comp[0])]);
                let latestAvail = Math.max(...[this.timeToFloat(reg[1]), this.timeToFloat(leave[1]), this.timeToFloat(comp[1])]);

                const colorTimes = times.slice(1, times.length - 1).map((time, index) => 
                    <option value={time} style={{color: (this.timeToFloat(time) >= earliestAvail && this.timeToFloat(time) <= latestAvail) ? "black" : "grey"}} key={index}>{time}</option>
                )

                return(
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Employee ID: {currentEmpView}
                            <br />
                            Day: {dayNames[currentDayIndex] + ", " + weekDates[currentDayIndex]}
                        </Typography>
                        <br />
                        <Typography fontSize="medium">
                            Regular Availability: {(regAvail.reg_start === null || regAvail.reg_end === null) ? "N/A" : (regAvail.reg_start === "00:00:00" && regAvail.reg_end === "23:59:00") ? "All Day" : `${regAvail.reg_start} - ${regAvail.reg_end}`}
                            <br />
                            Leave Taken: {leaveAvail === undefined ? "N/A" : (leaveAvail.avail_start === null || leaveAvail.avail_end === null) ? "N/A" : (leaveAvail.avail_start === "00:00:00" && leaveAvail.avail_end === "23:59:00") ? "All Day" : `${leaveAvail.avail_start} - ${leaveAvail.avail_end}`}
                            <br />
                            Company Event {compEvent === undefined ? "" : `(${compEvent.event_name})`}: {compEvent === undefined ? "N/A" : (compEvent.event_start === null || compEvent.event_end === null) ? "All Day" : `${compEvent.event_start} - ${compEvent.event_end}`}
                        </Typography>
                        <br /><br />
                        <div>
                            <label>Start Time:</label>
                            &nbsp;
                            <select id={"startTime"} name={'Start'} defaultValue={times[currentStartIndex]}>
                                <option value={"N/A"} style={{color: "black"}} key={0}>{"N/A"}</option>
                                {colorTimes}
                            </select>
                            &nbsp;&nbsp;
                            <label>End Time:</label>
                            &nbsp;
                            <select id={"endTime"} name={'End'} defaultValue={times[currentEndIndex]}>
                                <option value={"N/A"} style={{color: "black"}} key={0}>{"N/A"}</option>
                                {colorTimes}
                            </select>
                        </div>
                        <br/><br />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Button variant='contained' onClick={() => this.addRosterTime(currentEmpView, weekDates[currentDayIndex], earliestAvail, latestAvail)}>Save Roster</Button>
                        </Box>
                    </div>
                )
            }
    }

    async componentDidMount(){
        const selectedDate = this.props.week_start_sql;

        const companyId = sessionStorage.getItem('company_id');

        let weekStart = new Date(selectedDate.substring(0, 4), selectedDate.substring(5, 7) - 1, selectedDate.substring(8, 10));

        //GET companyroster from db
        const res = await axios.get("http://localhost:2420/getCompanyRoster/" + companyId + "&" + this.props.week_start_sql);
        const employeeRosters = res.data;
        
        let weekDates = [];

        let weekStartPlaceholder = new Date(selectedDate.substring(0, 4), selectedDate.substring(5, 7) - 1, selectedDate.substring(8, 10));

        let dayLooper = weekStartPlaceholder;

        //add all the dates in roster week to weekDates array (string format YYYY-MM-DD)
        for(let i = 0; i < 7; i++){
            const dateString = dayLooper.toISOString().substring(0, 10);
            weekDates.push(dateString);
            dayLooper.setDate(dayLooper.getDate() + 1);
        }

        let unique_emps_arr = Array.from(new Set(employeeRosters.map(({emp_id}) => emp_id)));
        let unique_emps = unique_emps_arr.join(',');

        const res1 = await axios.get("http://localhost:2420/getRosteredRegularAvailabilities", {
            params: {emp_ids: unique_emps}
        });

        const res2 = await axios.get("http://localhost:2420/getCompanyEventsByWeek/" + sessionStorage.getItem('company_id'), {
            params: {week_start: selectedDate}
        });

        const res3 = await axios.get("http://localhost:2420/getRosteredAvailabilities", {
            params: {
                emp_ids: unique_emps,
                week_start: selectedDate
            }
        });

        function groupItemsByEmpId(arr){
            return arr.reduce((groupedEmployees, employee) => {
                const {emp_id} = employee;
    
                if(groupedEmployees[emp_id] == null) groupedEmployees[emp_id] = []
    
                groupedEmployees[emp_id].push(employee);
                return groupedEmployees;
            }, {})
        }

        let leaveTemp = groupItemsByEmpId(res3.data);

        Object.keys(leaveTemp).forEach((key) => {
            leaveTemp[key] = leaveTemp[key].map(function(avail){
                let availDate = new Date(avail.avail_date);
                availDate.setDate(availDate.getDate() + 1);

                avail.avail_date = availDate.toISOString().substring(0, 10);
                return avail;
            });
        })

        unique_emps_arr.forEach((unique_emp) => {
            let emp_exists = false;

            for(let leave_day of res3.data){
                if(leave_day.emp_id === unique_emp){
                    emp_exists = true;
                    break;
                }
            }

            if(!emp_exists)
            leaveTemp[unique_emp] = null;
        });

        res2.data.forEach((company_event) => {
            let eventDate = new Date(company_event.event_date);
            eventDate.setDate(eventDate.getDate() + 1);

            company_event.event_date = eventDate.toISOString().substring(0, 10);
            return company_event;
        });

        let overallAvailabilities = {
            regular: groupItemsByEmpId(res1.data),
            leave: leaveTemp,
            company: res2.data
        }
        
        //group roster days by employee ID eg. {gam11: [{rosterObject}, {rosterObject}], gam12: [{rosterObject}]}
        const sortedEmployeeRosters = groupItemsByEmpId(employeeRosters);

        //set them in the react state
        this.setState({employeeRosters: sortedEmployeeRosters, availabilities: overallAvailabilities, weekStart: weekStart, weekDates: weekDates, isLoaded: true})
    }

    render(){
        const {isLoaded} = this.state;

        if(isLoaded){
            const {employeeRosters} = this.state;

            if(Object.keys(employeeRosters).length !== 0)
            {
                return(
                    <>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th/>
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.processEmployeeTimes()}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                                <Box sx={modalStyle}>
                                    {this.generateModal()}
                                </Box>
                        </Modal>
                    </>
                )
            }
            else
            {
                return(
                    <div>
                        <h1>No roster data has been added yet.</h1>
                    </div>
                )
            }
        }
    }
}

export default EditableRoster;