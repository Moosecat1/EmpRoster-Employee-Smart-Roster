import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import '../css/roster.css';

const { empRosterGet, getEmployeeList } = require('../modules/endpoint');
const axios = require('axios');

function Rosters() {

    var startTime = 24;
    var endTime = 0;
    var empRostStart;
    var empRostEnd;
    var difference;
    var checker = false;
    var emp_id = 1;
    var emp_type = 'manager';
    var company_id = 1;
    const Rosters = () => {
        (async () => {
            var res = await empRosterGet(emp_id);
            console.log(res);
            rosters = res.response.data;
        })();
    }
    console.log(rosters);

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
            {rosters.map((roster) => (
                <ListGroup className="timeGroup">
                    <ListGroup.Item>{roster.start}</ListGroup.Item>
                </ListGroup>
            ))}

        </div>
    )



}
export default Roster;
