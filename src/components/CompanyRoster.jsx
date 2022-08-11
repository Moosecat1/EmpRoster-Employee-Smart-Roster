import React, {Component} from "react";
import axios from "axios";

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
        const {weekDates, employeeList, employeeRoster} = this.state;
        console.log(employeeRoster);

        const employee = employeeList[empIndex];
        const empRoster = employeeRoster[empIndex];

        /*console.log("Week Date: " + weekDates[dayIndex]);
        console.log("EmpRoster: " + empRoster);
        const empWorking = empRoster.some((rost) => rost.rost_date === weekDates[dayIndex]);
        console.log(empWorking);*/
    }

    processEmployeeTimes(){
        const {employeeList} = this.state;

        return employeeList.map((employee, index) => 
            <tr>
                <td>{employee.emp_id}</td>
                <td>{this.checkDay(0, index)}</td>
                <td>{this.checkDay(1, index)}</td>
                <td>{this.checkDay(2, index)}</td>
                <td>{this.checkDay(3, index)}</td>
                <td>{this.checkDay(4, index)}</td>
                <td>{this.checkDay(5, index)}</td>
                <td>{this.checkDay(6, index)}</td>
            </tr>
        );
    }

    async componentDidMount(){
        const currentDate = new Date();
        let weekStart = new Date();
        weekStart.setDate(currentDate.getDate() - (currentDate.getDay()));

        let weekDates = [];

        let dayLooper = weekStart;

        for(let i = 0; i < 7; i++){
            const dateString = dayLooper.toISOString().substring(0, 10);
            weekDates.push(dateString);
            dayLooper.setDate(dayLooper.getDate() + 1);
        }

        const companyId = sessionStorage.getItem('company_id');

        const res = await axios.get("http://localhost:2420/getEmployeesList/" + companyId).catch((err) => {console.log(err);})
        const employeeList = res.data;

        let employeeRosters = [];

        for(let i = 0; i < employeeList.length; i++){
            const employeeId = employeeList[i].emp_id;
            const weekStartSQL = weekStart.toISOString().split('T')[0];
            
            let res1 = await axios.get("http://localhost:2420/getRoster/" + employeeId + "&" + weekStartSQL).catch((err) => {console.log(err);})
            console.log(weekStartSQL);
            let employeeRoster = res1.data;
            
            for(let i2 = 0; i2 < employeeRoster.length; i2++){
                employeeRoster[i2].rost_date = employeeRoster[i2].rost_date.substring(0, 10);
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