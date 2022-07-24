import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/roster.css';

const { empRosterGet, employeeListGet } = require('../modules/endpoint');
const axios = require('axios');

function Roster() {

    var startTime = 24;
    var endTime = 0;
    var empRostStart;
    var empRostEnd;
    var difference;
    var checker = false;
    var emp_id = 1;
    var emp_type = 'manager';
    var company_id = 1;

    function companyOpTimesGet() {
        (async () => {
            await axios.get("http://localhost:2420/getCompanyOpTimes/" + 1).then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    var startInt = parseInt(response.data[i].start_time.substr(0, 2));
                    var endInt = parseInt(response.data[i].end_time.substr(0, 2));
                    if (startTime > startInt) {
                        startTime = startInt;
                    }
                    if (endTime < endInt) {
                        endTime = endInt;
                    }
                }
            })
        })();
    }

    function RosterGeneration() {
        const container = document.getElementById("container")
        const group = document.createElement("ListGroup");
        const blank = document.createElement("ListGroup.Item");
        blank.variant = "secondary";
        blank.className = "empty";
        group.append(blank);
        for (var i = 0; i < 6; i++) {
            var day = i.toLocaleString('en-us', {weekday: 'long'});
            var dayElement = document.createElement("ListGroup.Item");
            dayElement.variant = "secondary";
            dayElement.innerHTML = day;
            group.append(dayElement);
        }
        container.append(group);
        if (emp_type = "manager") {
            (async () => {
                const res = await employeeListGet(company_id);
                for (var i = 0; i < res.data.length; i++) {
                    (async () => {
                        var res2 = await empRosterGet(res.data[i].emp_id);
                        var empGroup = document.createElement("ListGroup");
                        var empItem = document.createElement("ListGroup.Item");
                        empItem.variant = "secondary";
                        empItem.innerHTML = res.data[i].emp_fName + " " + res.data[i].emp_lName;
                        empGroup.append(empItem);
                        for (var j = 0; j < 6; j++) {
                            var item = document.createElement("ListGroup.Item");
                            if (j == res2.data[i].rost_date) {
                                item.innerHTML = "Start: " + res2.data[i].rost_start + "\n" + "End: " + res2.data[i].rost_end;
                                item.variant = "success";
                            }
                            else {
                                item.variant = "secondary";
                            }
                            empGroup.append(item);
                        }
                        container.append(empGroup);
                    })
                }
            })
        }
        else if (emp_type = "employee") {
            (async () => {
                const res = await empRosterGet(emp_id);
                for (var i = 0; i < difference; i++) {
                    var timeGroup = document.createElement("ListGroup");
                    var timeItem = document.createElement("ListGroup.Item");
                    var currentTime = startTime + i;
                    timeItem.variant = "secondary";
                    timeItem.innerHTML = currentTime + ":00";
                    timeGroup.append(timeItem);
                    for (var j = 0; j < 6; j++) {
                        empRostStart = parseInt(res.data[j].rost_start.substr(0, 2));
                        empRostEnd = parseInt(res.data[j].rost_end.substr(0, 2));
                        var item = document.createElement("ListGroup.Item");
                        if ((currentTime >= empRostStart && currentTime <= empRostEnd) && j == (res.data[j].rost_date).getDay()) {
                            item.variant = "success";
                            item.innerHTML = "Rostered";
                        } else {
                            item.variant = "danger";
                            item.innerHTML = "Unrostered";
                        }
                        timeGroup.append(item);
                    }
                    container.append(timeGroup);
                }
            })
        }
    }


    if (checker === false) {
        companyOpTimesGet();
        empRosterGet();
        checker = true;
    }
    /*Need to add functionality for generating roster from DB*/
    return (
        <div className="d-flex flex-nowrap roster-container" id ="container">

        </div>
    )



}
export default Roster;
