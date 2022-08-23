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

let joe = false;

class EditableRoster extends Component {
    state = {
        weekStart : new Date(),
        weekDates : [],
        employeeRosters : [],
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

    async addRosterTime(empId, selectedDate){
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;

        if(!(startTime === "N/A" || endTime === "N/A")){
            await axios.put("http://localhost:2420/updateRoster", {
                emp_id: empId,
                rost_date: selectedDate,
                rost_start: startTime,
                rost_end: endTime
            });
            
            document.location.reload();
        } else{
            alert("Please select a time for both start and end.");
        }
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

                return(
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Employee ID: {currentEmpView}
                            <br />
                            {/*Employee Name: empNameHERE*/}
                            Day: {dayNames[currentDayIndex] + ", " + weekDates[currentDayIndex]}
                        </Typography>
                        <br /><br />
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
                        <br/><br />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Button variant='contained' onClick={() => this.addRosterTime(currentEmpView, weekDates[currentDayIndex])}>Save Roster</Button>
                        </Box>
                    </div>
                )
            }
    }

    async componentDidMount(){
        const companyId = sessionStorage.getItem('company_id');

        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const week_start_sql = weekStart.toISOString().split('T')[0];

        //GET companyroster from db
        const res = await axios.get("http://localhost:2420/getCompanyRoster/" + companyId + "&" + week_start_sql);
        const employeeRosters = res.data;
        
        let weekDates = [];

        let weekStartPlaceholder = new Date();
        weekStartPlaceholder.setDate(weekStartPlaceholder.getDate() - weekStartPlaceholder.getDay());

        let dayLooper = weekStartPlaceholder;

        //add all the dates in roster week to weekDates array (string format YYYY-MM-DD)
        for(let i = 0; i < 7; i++){
            const dateString = dayLooper.toISOString().substring(0, 10);
            weekDates.push(dateString);
            dayLooper.setDate(dayLooper.getDate() + 1);
        }
        
        //group roster days by employee ID eg. {gam11: [{rosterObject}, {rosterObject}, gam12: [{rosterObject}]]}
        const sortedEmployeeRosters = employeeRosters.reduce((groupedEmployees, employee) => {
            const {emp_id} = employee;

            if(groupedEmployees[emp_id] == null) groupedEmployees[emp_id] = []

            groupedEmployees[emp_id].push(employee);
            return groupedEmployees;
        }, {});

        //set them in the react state
        this.setState({employeeRosters: sortedEmployeeRosters, weekStart: weekStart, weekDates: weekDates, isLoaded: true})
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