import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/roster.css';

const axios = require('axios');
document.getElementById("xxx").display = "none"

function Roster() {

    var startTime = 24;
    var endTime = 0;
    var empRostStart;
    var empRostEnd;
    var difference;

    function companyOpTimesGet() {
        (async () => {
            await axios.get("http://localhost:2420/getCompanyOpTimes/" + 1).then((response) => {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    if (startTime > response.data[i].start_time) {
                        startTime = response.data[i].start_time;
                    }
                    if (endTime < response.data[i].end_time) {
                        endTime = response.data[i].end_time
                    }
                }
            })
        })();
    }

    function empRosterGet() {
        (async () => {
            await axios.get("http://localhost:2420/getEmployeeRoster/" + 1).then((response) => {
                const container = document.getElementById("container")
                const group = document.createElement("ListGroup horizontal");
                const blank = document.createElement("ListGroup.Item");
                blank.variant = "secondary";
                blank.append(group);
                const monday = document.createElement("ListGroup.Item");
                monday.variant = "secondary";
                monday.innerHTML = "Monday";
                monday.append(group);
                const tuesday = document.createElement("ListGroup.Item");
                tuesday.variant = "secondary";
                tuesday.innerHTML = "Tuesday";
                tuesday.append(group);
                const wednesday = document.createElement("ListGroup.Item");
                wednesday.variant = "secondary";
                wednesday.innerHTML = "Wednesday";
                wednesday.append(group);
                const thursday = document.createElement("ListGroup.Item");
                thursday.variant = "secondary";
                thursday.innerHTML = "Thursday";
                thursday.append(group);
                const friday = document.createElement("ListGroup.Item");
                friday.variant = "secondary";
                friday.innerHTML = "Friday";
                friday.append(group);
                const saturday = document.createElement("ListGroup.Item");
                saturday.variant = "secondary";
                saturday.innerHTML = "Saturday";
                saturday.append(group);
                const sunday = document.createElement("ListGroup.Item");
                sunday.variant = "secondary";
                sunday.innerHTML = "Sunday";
                sunday.append(group);
                group.append(container);
                for (var i = 0; i < difference; i++) {
                    var timeGroup = document.createElement("ListGroup horizontal");
                    var timeItem = document.createElement("ListGroup.Iten");
                    timeItem.variant = "secondary";
                    timeItem.innerHTML = "9:00";
                    timeItem.append(timeGroup);
                    for (var j = 0; j < 6; j++) {
                        empRostStart = response.data[j].rost_start;
                        empRostEnd = response.data[j].rost_end;
                        var day = j.toLocaleString('en-us', { weekday : 'long'});
                        var item = document.createElement("ListGroup.Item");
                        if (i >= empRostStart && i <= empRostEnd) {
                            item.variant = "success";
                            item.innerHTML = "Rostered";
                        }
                        else {
                            item.variant = "danger";
                            item.innerHTML = "Unrostered"
                        }
                        item.append(timeGroup);
                    }
                    timeGroup.append(container);
                }
            })
        })();
    }
    /*Need to add functionality for generating roster from DB*/
    return (
        <div className="d-flex flex-nowrap roster-container" id ="container">
            <ListGroup>
                <ListGroup.Item variant="secondary" className="empty"></ListGroup.Item>
                <ListGroup.Item variant="secondary">0:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">1:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">2:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">3:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">4:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">5:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">6:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">7:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">8:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">9:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">10:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">11:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">12:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">13:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">14:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">15:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">16:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">17:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">18:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">19:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">20:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">21:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">22:00</ListGroup.Item>
                <ListGroup.Item variant="secondary">23:00</ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item variant="secondary">Monday</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
                <ListGroup.Item variant="success">Rostered</ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item variant="secondary">Tuesday</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
                <ListGroup.Item variant="danger">Not Rostered</ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item variant="secondary">Wednesday</ListGroup.Item>
                <ListGroup.Item>0:00</ListGroup.Item>
                <ListGroup.Item>1:00</ListGroup.Item>
                <ListGroup.Item>2:00</ListGroup.Item>
                <ListGroup.Item>3:00</ListGroup.Item>
                <ListGroup.Item>4:00</ListGroup.Item>
                <ListGroup.Item>5:00</ListGroup.Item>
                <ListGroup.Item>6:00</ListGroup.Item>
                <ListGroup.Item>7:00</ListGroup.Item>
                <ListGroup.Item>8:00</ListGroup.Item>
                <ListGroup.Item>9:00</ListGroup.Item>
                <ListGroup.Item>10:00</ListGroup.Item>
                <ListGroup.Item>11:00</ListGroup.Item>
                <ListGroup.Item>12:00</ListGroup.Item>
                <ListGroup.Item>13:00</ListGroup.Item>
                <ListGroup.Item>14:00</ListGroup.Item>
                <ListGroup.Item>15:00</ListGroup.Item>
                <ListGroup.Item>16:00</ListGroup.Item>
                <ListGroup.Item>17:00</ListGroup.Item>
                <ListGroup.Item>18:00</ListGroup.Item>
                <ListGroup.Item>19:00</ListGroup.Item>
                <ListGroup.Item>20:00</ListGroup.Item>
                <ListGroup.Item>21:00</ListGroup.Item>
                <ListGroup.Item>22:00</ListGroup.Item>
                <ListGroup.Item>23:00</ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item variant="secondary">Thursday</ListGroup.Item>
                <ListGroup.Item>0:00</ListGroup.Item>
                <ListGroup.Item>1:00</ListGroup.Item>
                <ListGroup.Item>2:00</ListGroup.Item>
                <ListGroup.Item>3:00</ListGroup.Item>
                <ListGroup.Item>4:00</ListGroup.Item>
                <ListGroup.Item>5:00</ListGroup.Item>
                <ListGroup.Item>6:00</ListGroup.Item>
                <ListGroup.Item>7:00</ListGroup.Item>
                <ListGroup.Item>8:00</ListGroup.Item>
                <ListGroup.Item>9:00</ListGroup.Item>
                <ListGroup.Item>10:00</ListGroup.Item>
                <ListGroup.Item>11:00</ListGroup.Item>
                <ListGroup.Item>12:00</ListGroup.Item>
                <ListGroup.Item>13:00</ListGroup.Item>
                <ListGroup.Item>14:00</ListGroup.Item>
                <ListGroup.Item>15:00</ListGroup.Item>
                <ListGroup.Item>16:00</ListGroup.Item>
                <ListGroup.Item>17:00</ListGroup.Item>
                <ListGroup.Item>18:00</ListGroup.Item>
                <ListGroup.Item>19:00</ListGroup.Item>
                <ListGroup.Item>20:00</ListGroup.Item>
                <ListGroup.Item>21:00</ListGroup.Item>
                <ListGroup.Item>22:00</ListGroup.Item>
                <ListGroup.Item>23:00</ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item variant="secondary">Friday</ListGroup.Item>
                <ListGroup.Item>0:00</ListGroup.Item>
                <ListGroup.Item>1:00</ListGroup.Item>
                <ListGroup.Item>2:00</ListGroup.Item>
                <ListGroup.Item>3:00</ListGroup.Item>
                <ListGroup.Item>4:00</ListGroup.Item>
                <ListGroup.Item>5:00</ListGroup.Item>
                <ListGroup.Item>6:00</ListGroup.Item>
                <ListGroup.Item>7:00</ListGroup.Item>
                <ListGroup.Item>8:00</ListGroup.Item>
                <ListGroup.Item>9:00</ListGroup.Item>
                <ListGroup.Item>10:00</ListGroup.Item>
                <ListGroup.Item>11:00</ListGroup.Item>
                <ListGroup.Item>12:00</ListGroup.Item>
                <ListGroup.Item>13:00</ListGroup.Item>
                <ListGroup.Item>14:00</ListGroup.Item>
                <ListGroup.Item>15:00</ListGroup.Item>
                <ListGroup.Item>16:00</ListGroup.Item>
                <ListGroup.Item>17:00</ListGroup.Item>
                <ListGroup.Item>18:00</ListGroup.Item>
                <ListGroup.Item>19:00</ListGroup.Item>
                <ListGroup.Item>20:00</ListGroup.Item>
                <ListGroup.Item>21:00</ListGroup.Item>
                <ListGroup.Item>22:00</ListGroup.Item>
                <ListGroup.Item>23:00</ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item variant="secondary">Saturday</ListGroup.Item>
                <ListGroup.Item>0:00</ListGroup.Item>
                <ListGroup.Item>1:00</ListGroup.Item>
                <ListGroup.Item>2:00</ListGroup.Item>
                <ListGroup.Item>3:00</ListGroup.Item>
                <ListGroup.Item>4:00</ListGroup.Item>
                <ListGroup.Item>5:00</ListGroup.Item>
                <ListGroup.Item>6:00</ListGroup.Item>
                <ListGroup.Item>7:00</ListGroup.Item>
                <ListGroup.Item>8:00</ListGroup.Item>
                <ListGroup.Item>9:00</ListGroup.Item>
                <ListGroup.Item>10:00</ListGroup.Item>
                <ListGroup.Item>11:00</ListGroup.Item>
                <ListGroup.Item>12:00</ListGroup.Item>
                <ListGroup.Item>13:00</ListGroup.Item>
                <ListGroup.Item>14:00</ListGroup.Item>
                <ListGroup.Item>15:00</ListGroup.Item>
                <ListGroup.Item>16:00</ListGroup.Item>
                <ListGroup.Item>17:00</ListGroup.Item>
                <ListGroup.Item>18:00</ListGroup.Item>
                <ListGroup.Item>19:00</ListGroup.Item>
                <ListGroup.Item>20:00</ListGroup.Item>
                <ListGroup.Item>21:00</ListGroup.Item>
                <ListGroup.Item>22:00</ListGroup.Item>
                <ListGroup.Item>23:00</ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item variant="secondary">Sunday</ListGroup.Item>
                <ListGroup.Item>0:00</ListGroup.Item>
                <ListGroup.Item>1:00</ListGroup.Item>
                <ListGroup.Item>2:00</ListGroup.Item>
                <ListGroup.Item>3:00</ListGroup.Item>
                <ListGroup.Item>4:00</ListGroup.Item>
                <ListGroup.Item>5:00</ListGroup.Item>
                <ListGroup.Item>6:00</ListGroup.Item>
                <ListGroup.Item>7:00</ListGroup.Item>
                <ListGroup.Item>8:00</ListGroup.Item>
                <ListGroup.Item>9:00</ListGroup.Item>
                <ListGroup.Item>10:00</ListGroup.Item>
                <ListGroup.Item>11:00</ListGroup.Item>
                <ListGroup.Item>12:00</ListGroup.Item>
                <ListGroup.Item>13:00</ListGroup.Item>
                <ListGroup.Item>14:00</ListGroup.Item>
                <ListGroup.Item>15:00</ListGroup.Item>
                <ListGroup.Item>16:00</ListGroup.Item>
                <ListGroup.Item>17:00</ListGroup.Item>
                <ListGroup.Item>18:00</ListGroup.Item>
                <ListGroup.Item>19:00</ListGroup.Item>
                <ListGroup.Item>20:00</ListGroup.Item>
                <ListGroup.Item>21:00</ListGroup.Item>
                <ListGroup.Item>22:00</ListGroup.Item>
                <ListGroup.Item>23:00</ListGroup.Item>
            </ListGroup>
        </div>
    )



}
export default Roster;
