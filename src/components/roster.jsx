import React, {Component} from 'react';
import '../css/roster.css'
import Table from 'react-bootstrap/Table';
import { getRoster } from '../modules/endpoint';

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

class Roster extends Component {
    state = {
        data : [],
        isLoaded : false
    }

    checkTime(dayIndex, timeIndex){
        const {data} = this.state;
        //console.log(data[dayIndex]);

        if(data[dayIndex].startTime === times[timeIndex])
        {
            dayBool[dayIndex] = true;
        }
        else if(data[dayIndex].endTime === times[timeIndex])
        {            
            dayBool[dayIndex] = false;
        }

        if(dayBool[dayIndex])
        {
            return(
                "Rostered"
            );
        }
        else
        {
            return(
                "Not Rostered"
            );
        }
    }

    processTimes(){
        return times.map((time, index) => 
            <tr>
                <td>
                    {time}
                </td>
                <td>
                    {this.checkTime(0, index)}
                </td>
                <td>
                    {this.checkTime(1, index)}
                </td>
                <td>
                    {this.checkTime(2, index)}
                </td>
                <td>
                    {this.checkTime(3, index)}
                </td>
                <td>
                    {this.checkTime(4, index)}
                </td>
                <td>
                    {this.checkTime(5, index)}
                </td>
                <td>
                    {this.checkTime(6, index)}
                </td>
            </tr>
        );
    }

    async componentDidMount(){
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const week_start_sql = weekStart.toISOString().split('T')[0];

        const res = await axios.get("http://localhost:2420/getRoster/" + "big14&" + week_start_sql).catch((err) => {
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
            let date = res.data[i].rost_date;
            date = parseInt(date.substring(8, 10)) + 1;
            empRostDates.push(date);
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

        //console.log(empRostTimes);

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

