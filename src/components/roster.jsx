import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/roster.css';

const axios = require('axios');

function Roster() {

    var startTime = 24;
    var endTime = 0;
    var empRostStart;
    var empRostEnd;
    var difference;
    var checker = false;

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

    function empRosterGet() {
        (async () => {
            await axios.get("http://localhost:2420/getEmployeeRoster/" + 1).then((response) => {
                const container = document.getElementById("container")
                const group = document.createElement("ListGroup");
                const blank = document.createElement("ListGroup.Item");
                blank.variant = "secondary";
                blank.className = "empty";
                blank.append(group);
                for (var i = 0; i < 6; i++) {
                    var day = i.toLocaleString('en-us', {weekday: 'long'});
                    var dayElement = document.createElement("ListGroup.Item");
                    dayElement.variant = "secondary";
                    dayElement.innerHTML = day;
                    dayElement.append(group);
                }
                group.append(container);
                for (var i = 0; i < difference; i++) {
                    var timeGroup = document.createElement("ListGroup");
                    var timeItem = document.createElement("ListGroup.Item");
                    var currentTime = startTime + i;
                    timeItem.variant = "secondary";
                    timeItem.innerHTML = currentTime + ":00";
                    timeItem.append(timeGroup);
                    for (var j = 0; j < 6; j++) {
                        empRostStart = parseInt(response.data[j].rost_start.substr(0, 2));
                        empRostEnd = parseInt(response.data[j].rost_end.substr(0,2));
                        var item = document.createElement("ListGroup.Item");
                        if (currentTime >= empRostStart && currentTime <= empRostEnd) {
                            item.variant = "success";
                            item.innerHTML = "Rostered";
                        }
                        else {
                            item.variant = "danger";
                            item.innerHTML = "Unrostered";
                        }
                        item.append(timeGroup);
                    }
                    timeGroup.append(container);
                }
            })
        })();
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
