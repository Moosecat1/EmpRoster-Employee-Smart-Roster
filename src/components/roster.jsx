import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import '../css/roster.css';

const { empRosterGet, getEmployeeList } = require('../modules/endpoint');
const axios = require('axios');

const Rosters = () => {

    var startTime = 24;
    var endTime = 0;
    var empRostStart;
    var empRostEnd;
    var difference;
    var checker = false;
    var emp_id = 1;
    var emp_type = 'manager';
    var company_id = 1;
    var rosterInfo;
    (async () => {
        var res = await empRosterGet(emp_id);
        rosterInfo = res.response.data;
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
    var rosterTimes = '{ "rosters" : [';
    for (var i = 0; i < difference; i++) {
        var currentTime = startTime + i;
        rosterTimes = rosterTimes + ', { "time":"' + currentTime + '":00" }';
    }
    rosterTimes = rosterTimes + ' ]}';

    const renderRosterTimes = () => {
        const renderRosterKitten = () => {
            if (roster start > startTime && roster end < endTime) {
                rostered;
            }
            else {
                unrostered;
            }
            return (
                <ListGroup.Item></ListGroup.Item>
            )
        }
        return(
            <ListGroup>
                <ListGroup.Item>{rosterTimes.time}</ListGroup.Item>
            </ListGroup>
        );
    };

    /*Need to add functionality for generating roster from DB*/
    return (
        <div className="flex" id="container">
            <ListGroup horizontal>
                <ListGroup.Item variant="secondary">    </ListGroup.Item>
                <ListGroup.Item variant="secondary">Monday</ListGroup.Item>
                <ListGroup.Item variant="secondary">Tuesday</ListGroup.Item>
                <ListGroup.Item variant="secondary">Wednesday</ListGroup.Item>
                <ListGroup.Item variant="secondary">Thursday</ListGroup.Item>
                <ListGroup.Item variant="secondary">Friday</ListGroup.Item>
                <ListGroup.Item variant="secondary">Saturday</ListGroup.Item>
                <ListGroup.Item variant="secondary">Sunday</ListGroup.Item>
            </ListGroup>
            {rosterInfo.map(renderRosterTimes)}

        </div>
    )

};
export default Rosters;
