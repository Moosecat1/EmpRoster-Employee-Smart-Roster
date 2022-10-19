import React, {Component} from "react";
import axios from "axios";
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

class CompanyRoster extends Component {
    state = {
        data : [],
        weekStart : new Date(),
        weekDates : [],
        employeeList : [],
        employeeRoster : [],
        isLoaded : false
    }

    checkDay(dayIndex, empIndex){
        const {weekDates, employeeRoster} = this.state;

        //generate the string with start and end time for a corresponding day
        function timesString(empRosterIndex){
            const rostDay = empRoster[empRosterIndex];
            const startString = "Start Time: " + rostDay.rost_start;
            const endString = "End Time: " + rostDay.rost_end;

            return(
                <>
                    <p>{startString}</p>
                    <p>{endString}</p>
                </>
            )
        }

        const empRoster = employeeRoster[empIndex];

        let empWorking = false;
        let empRosterIndex;

        //check if employee is working on the specified day
        for(let i = 0; i < empRoster.length; i++)
        {
            if(empRoster[i].rost_date === weekDates[dayIndex])
            {
                if(empRoster[i].rost_start !== null && empRoster[i].rost_end !== null){
                    empWorking = true;
                    empRosterIndex = i;
                    break;
                }
            }
        }
        
        //if the employee is working, return the corresponding text and style
        if(empWorking)
        {
            return({
                text: (timesString(empRosterIndex)),
                style: posStyle
            });
        }
        else
        {
            return({
                text: (<span>Not Rostered</span>),
                style: negStyle
            });
        }
    }

    processEmployeeTimes(){
        const {employeeList} = this.state;

        //generate table with the roster for each week day and employee
        return employeeList.map((employee, index) => 
            <tr key={index}>
                <td style={nameStyle}>{employee.emp_fName + " " + employee.emp_lName}</td>
                <td style={this.checkDay(0, index).style}>{this.checkDay(0, index).text}</td>
                <td style={this.checkDay(1, index).style}>{this.checkDay(1, index).text}</td>
                <td style={this.checkDay(2, index).style}>{this.checkDay(2, index).text}</td>
                <td style={this.checkDay(3, index).style}>{this.checkDay(3, index).text}</td>
                <td style={this.checkDay(4, index).style}>{this.checkDay(4, index).text}</td>
                <td style={this.checkDay(5, index).style}>{this.checkDay(5, index).text}</td>
                <td style={this.checkDay(6, index).style}>{this.checkDay(6, index).text}</td>
            </tr>
        );
    }

    async componentDidMount(){
        //get the current week start
        const currentDate = new Date();
        let weekStart = new Date();
        weekStart.setDate(currentDate.getDate() - (currentDate.getDay()));
        const weekStartSQL = weekStart.toISOString().split('T')[0];

        let weekDates = [];

        let dayLooper = new Date();
        dayLooper.setDate(currentDate.getDate() - (currentDate.getDay()));

        //add all week dates to array
        for(let i = 0; i < 7; i++){
            const dateString = dayLooper.toISOString().substring(0, 10);
            weekDates.push(dateString);
            dayLooper.setDate(dayLooper.getDate() + 1);
        }

        const companyId = sessionStorage.getItem('company_id');

        //get employee list from the db
        const res = await axios.get("http://localhost:2420/getEmployeesList/" + companyId).catch((err) => {console.log(err);})
        const employeeList = res.data;

        let employeeRosters = [];

        //for each employee, get their roster for the week from the db and append to array
        for(let i = 0; i < employeeList.length; i++){
            const employeeId = employeeList[i].emp_id;
            
            let res1 = await axios.get("http://localhost:2420/getRoster/" + employeeId + "&" + weekStartSQL).catch((err) => {console.log(err);})
            let employeeRoster = res1.data;
            
            for(let i2 = 0; i2 < employeeRoster.length; i2++){
                let rostDate = new Date(employeeRoster[i2].rost_date);
                rostDate.setDate(rostDate.getDate() + 1);

                employeeRoster[i2].rost_date = rostDate.toISOString().substring(0, 10);
            }

            employeeRosters.push(employeeRoster);
        }

        this.setState({weekStart: weekStart, weekDates: weekDates, employeeList: employeeList, employeeRoster: employeeRosters, isLoaded: true});
    }

    render(){
        const {isLoaded} = this.state;

        if(isLoaded){
            const {weekStart} = this.state;

            return(
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    {"Week Start:"}
                                    <br />
                                    {weekStart.toDateString()}
                                </th>
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
            )
        }
    }
}

export default CompanyRoster;