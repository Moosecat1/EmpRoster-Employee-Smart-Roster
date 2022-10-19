import React, {Component} from 'react';
import '../css/roster.css'
const axios = require('axios');
const Bowser = require('bowser');

//make time only when they rostered, change colour of cell, make cell onClick etc., use getRoster function

const times = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00",
    "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
    "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
    "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

let sunBool, monBool, tueBool, wedBool, thuBool, friBool, satBool = false;
let dayBool = [sunBool, monBool, tueBool, wedBool, thuBool, friBool, satBool];

const posStyle = {
    backgroundColor: '#c5ceff',
    border: '1px solid black'
}

const negStyle = {
    backgroundColor: '#F7F8FC',
    border: '1px solid black'
}

let earliestStart = "08:00";
let lastestFinish = "18:00";

let displayTimes = [];

let count = 0;

class Roster extends Component {
    state = {
        isLoaded : false,
        cells : [],
        isRostered : false
    }

    checkTime(dayIndex, timeIndex, data){
        //if t
        if(data[dayIndex].startTime === displayTimes[timeIndex])
        {
            dayBool[dayIndex] = true;
        }
        else if(data[dayIndex].endTime === displayTimes[timeIndex])
        {            
            dayBool[dayIndex] = false;
        }

        //return text and style for table cell based on if emp is rostered
        if(dayBool[dayIndex])
        {
            return({
                text: "Rostered",
                style: posStyle
            });
        }
        else
        {
            return({
                text: "Not Rostered",
                style: negStyle
            });
        }
    }

    async getData(weekStart){
        const engine = Bowser.parse(window.navigator.userAgent).engine.name;

        //only decrease month when roster week is changed (due to JS date formatting)
        if(count !== 0){
            weekStart.setMonth(weekStart.getMonth() - 1);

            if(engine === "Blink")
                weekStart.setDate(weekStart.getDate() + 1);
        } else{
            count++;
        }

        const week_start_sql = weekStart.toISOString().split('T')[0];

        //get the current weeks roster from the db
        const res = await axios.get("http://localhost:2420/getRoster/" + sessionStorage.getItem('emp_view') + "&" + week_start_sql).catch((err) => {
            console.log(err);
        });

        let rostDates = [];
        let empRostDates = [];
    
        //add all the selected weeks dates to array
        for(let i = 0; i < 7; i++)
        {
            rostDates.push(weekStart.getDate());
            weekStart.setDate(weekStart.getDate() + 1);
        }

        //add all the dates employee is working to array
        for(let i = 0; i < res.data.length; i++)
        {
            let date = new Date();
            let dateString = res.data[i].rost_date;
            date.setDate(parseInt(dateString.substring(8, 10)) + 1);
            empRostDates.push(date.getDate());
        }

        let empRostTimes = [];

        let counter = 0;

        //for each day, if employee is working, add the day with the rostered start and end times. else, add the day with null values
        for(let i = 0; i < 7; i++)
        {
            const currentDate = rostDates[i];

            if(empRostDates.includes(currentDate))
            {
                let startTime = res.data[i].rost_start;
                let endTime = res.data[i].rost_end;

                if(!(startTime === null || endTime === null)){
                    startTime = startTime.substring(0, 5);
                    endTime = endTime.substring(0, 5);
                }

                counter++;

                empRostTimes.push({startTime: startTime, endTime: endTime});
            }
            else
            {
                empRostTimes.push({startTime: null, endTime: null});
            }
        }

        //get the earliest and latest time employee is rostered for the week from db
        const res1 = await axios.get("http://localhost:2420/getEarliestRoster/" + sessionStorage.getItem('emp_view') + "&" + week_start_sql).catch((err) => {
            console.log(err);
        });

        const res2 = await axios.get("http://localhost:2420/getLatestRoster/" + sessionStorage.getItem('emp_view') + "&" + week_start_sql).catch((err) => {
            console.log(err);
        });

        //set the earliest start and latest finish to the corresponding values (if they exist, else set them to 8AM and 6PM)
        if(res1.data.length !== 0 && res2.data.length !== 0)
        {
            if(!(res1.data[0].rost_start === null || res2.data[0].rost_end === null)){
                earliestStart = res1.data[0].rost_start.substring(0, 5);
                lastestFinish = res2.data[0].rost_end.substring(0, 5);
            }
        } else{
            earliestStart = "08:00";
            lastestFinish = "18:00";
        }

        const startIndex = times.indexOf(earliestStart);
        const endIndex = times.indexOf(lastestFinish);

        displayTimes = times.slice(startIndex, endIndex);

        //generate table based on the earliest start and latest finish times
        const processes = displayTimes.map((time, index) =>
            <tr style={{border: "1px solid black"}} key={index}>
                <td style={{border: "1px solid black"}}>
                    {time}
                </td>
                <td style={this.checkTime(0, index, empRostTimes).style}>
                    {this.checkTime(0, index, empRostTimes).text}
                </td>
                <td style={this.checkTime(1, index, empRostTimes).style}>
                    {this.checkTime(1, index, empRostTimes).text}
                </td>
                <td style={this.checkTime(2, index, empRostTimes).style}>
                    {this.checkTime(2, index, empRostTimes).text}
                </td>
                <td style={this.checkTime(3, index, empRostTimes).style}>
                    {this.checkTime(3, index, empRostTimes).text}
                </td>
                <td style={this.checkTime(4, index, empRostTimes).style}>
                    {this.checkTime(4, index, empRostTimes).text}
                </td>
                <td style={this.checkTime(5, index, empRostTimes).style}>
                    {this.checkTime(5, index, empRostTimes).text}
                </td>
                <td style={this.checkTime(6, index, empRostTimes).style}>
                    {this.checkTime(6, index, empRostTimes).text}
                </td>
            </tr>
        );
        
        sunBool = monBool = tueBool = wedBool = thuBool = friBool = satBool = false;
        dayBool = [sunBool, monBool, tueBool, wedBool, thuBool, friBool, satBool];

        this.setState({cells: processes, isLoaded: true});
    }

    //get the chosen week start and generate data
    async componentDidUpdate(prevProps){
        if(this.props.week_start_sql !== prevProps.week_start_sql){
            await this.getData(this.props.week_start_sql);
        }
    }

    //get the current week start and generate data
    async componentDidMount(){
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        await this.getData(weekStart);
    }

    render(){
        const {isLoaded} = this.state;

        if(isLoaded){
            return(
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
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
                            {this.state.cells}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Roster;

