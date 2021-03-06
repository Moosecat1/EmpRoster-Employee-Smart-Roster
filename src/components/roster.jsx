import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import { getRoster } from '../modules/endpoint';
import '../css/roster.css'
const axios = require('axios');

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

class Roster extends Component {
    state = {
        data : [],
        isLoaded : false,
        isRostered : false
    }

    checkTime(dayIndex, timeIndex){
        const {data} = this.state;
        //console.log(data[dayIndex]);

        if(data[dayIndex].startTime === displayTimes[timeIndex])
        {
            dayBool[dayIndex] = true;
        }
        else if(data[dayIndex].endTime === displayTimes[timeIndex])
        {            
            dayBool[dayIndex] = false;
        }

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

    processTimes(){
        //make subset of times that only is working hours
        const startIndex = times.indexOf(earliestStart);
        const endIndex = times.indexOf(lastestFinish);

        displayTimes = times.slice(startIndex, endIndex);
        console.log(earliestStart);

        return displayTimes.map((time, index) =>
            <tr style={{border: "1px solid black"}}>
                <td style={{border: "1px solid black"}}>
                    {time}
                </td>
                <td style={this.checkTime(0, index).style}>
                    {this.checkTime(0, index).text}
                </td>
                <td style={this.checkTime(1, index).style}>
                    {this.checkTime(1, index).text}
                </td>
                <td style={this.checkTime(2, index).style}>
                    {this.checkTime(2, index).text}
                </td>
                <td style={this.checkTime(3, index).style}>
                    {this.checkTime(3, index).text}
                </td>
                <td style={this.checkTime(4, index).style}>
                    {this.checkTime(4, index).text}
                </td>
                <td style={this.checkTime(5, index).style}>
                    {this.checkTime(5, index).text}
                </td>
                <td style={this.checkTime(6, index).style}>
                    {this.checkTime(6, index).text}
                </td>
            </tr>
        );
    }

    async componentDidMount(){
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const week_start_sql = weekStart.toISOString().split('T')[0];

        const res = await axios.get("http://localhost:2420/getRoster/" + sessionStorage.getItem('emp_view') + "&" + week_start_sql).catch((err) => {
            console.log(err);
        });

        let rostDates = [];
        let empRostDates = [];
    
        for(let i = 0; i < 7; i++)
        {
            rostDates.push(weekStart.getDate());
            weekStart.setDate(weekStart.getDate() + 1);
        }

        for(let i = 0; i < res.data.length; i++)
        {
            let date = new Date();
            let dateString = res.data[i].rost_date;
            date.setDate(parseInt(dateString.substring(8, 10)) + 1);
            empRostDates.push(date.getDate());
        }

        let empRostTimes = [];

        let counter = 0;

        for(let i = 0; i < 7; i ++)
        {
            const currentDate = rostDates[i];

            if(empRostDates.includes(currentDate))
            {
                const startTime = res.data[counter].rost_start.substring(0, 5);
                const endTime = res.data[counter].rost_end.substring(0, 5);

                counter++;

                empRostTimes.push({startTime: startTime, endTime: endTime});
            }
            else
            {
                empRostTimes.push({startTime: null, endTime: null});
            }
        }

        const res1 = await axios.get("http://localhost:2420/getEarliestRoster/" + sessionStorage.getItem('emp_view') + "&" + week_start_sql).catch((err) => {
            console.log(err);
        });

        const res2 = await axios.get("http://localhost:2420/getLatestRoster/" + sessionStorage.getItem('emp_view') + "&" + week_start_sql).catch((err) => {
            console.log(err);
        });

        if(res1.data.length !== 0 && res2.data.length !== 0)
        {
            earliestStart = res1.data[0].rost_start.substring(0, 5);
            lastestFinish = res2.data[0].rost_end.substring(0, 5);
        }

        this.setState({data: empRostTimes, isLoaded: true});
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
                            {this.processTimes()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Roster;

