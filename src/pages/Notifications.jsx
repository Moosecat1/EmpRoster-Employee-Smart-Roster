//Imports neccesary for functionality
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { Link } from "react-router-dom";
import {Container, Box} from "@mui/material";
import ManagerViewAvailability from './ManagerViewAvailability';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//Declaring methods that will be used throughout the page
const { addAvailability, removeNotification, addNotification, getEmployeeName, getRegularAvailability, updateRegularAvailability } = require('../modules/endpoint');

const axios = require('axios');
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.title = "Notifications";

class Notifications extends Component {
    state = {
        data : [],
        dates : [],
        isLoaded : false
    }

    //Method that deals with a notification being accepted
    async acceptRequest(notification, index) {
        if (notification.noti_type == "leaveRequest") {
            //Adds the accepted availability change to the database and makes a new notification for an employee in the database
            await addAvailability(notification.noti_date.split('T')[0], notification.noti_start, notification.noti_end, "Unavailable", notification.emp_id);
            await addNotification(notification.noti_date.split('T')[0], notification.noti_start, notification.noti_end, notification.emp_id, notification.company_id, notification.emp_fName, notification.emp_lName, "Your leave request for the " + (this.state.dates[index].getDate() + 1) + "/" +  (this.state.dates[index].getMonth() + 1) + "/" +
                this.state.dates[index].getFullYear() + " was accepted.", "Employee", "Accept");
        }
        else if (notification.noti_type == "availabilityChange") {
            //Adds the accepted regular availability change to the database and makes a new notification for an employee in the database
            await updateRegularAvailability(dayNames[notification.noti_desc], notification.noti_start, notification.noti_end, notification.emp_id);
            await addNotification(notification.noti_date, notification.noti_start, notification.noti_end, notification.emp_id, notification.company_id, notification.emp_fName, notification.emp_lName, "Your change of availability for " + dayNames[notification.noti_desc] + "'s was accepted", "Employee", "Accept");

        }
        //Removes the accepted notification from the database to ensure no conflicts and reloads the page
        await removeNotification(notification.noti_id);
        document.location.reload();
    }

    //Deals with a notification being denied
    async denyRequest(notification, index) {
        if (notification.noti_type == "leaveRequest") {
            //Makes a new notification for an employee in the database
            await addNotification(notification.noti_date.split('T')[0], notification.noti_start, notification.noti_end, notification.emp_id, notification.company_id, notification.emp_fName, notification.emp_lName, "Your leave request for the " + (this.state.dates[index].getDate() + 1) + "/" +  (this.state.dates[index].getMonth() + 1) + "/" +
                this.state.dates[index].getFullYear() + " was denied.", "Employee", "Deny");
        }
        else if (notification.noti_type == "availabilityChange") {
            //Adds the accepted availability change to the database and makes a new notification for an employee in the database
            await addNotification(notification.noti_date, notification.noti_start, notification.noti_end, notification.emp_id, notification.company_id, notification.emp_fName, notification.emp_lName, "Your change of availability for " + dayNames[notification.noti_desc] + "'s was accepted", "Employee", "Deny");
        }
        //Removes the accepted notification from the database to ensure no conflicts and reloads the page
        await removeNotification(notification.noti_id);
        document.location.reload();
    }

    //Deals with a notification being okayed
    async okRemove(notification) {
        //Removes the accepted notification from the database to ensure no conflicts and reloads the page
        await removeNotification(notification.noti_id);
        document.location.reload();
    }

    //Deals with loading all the notification types properly
    notifType(notification, index) {
        if (notification.noti_type == "leaveRequest") {
            //Returns a card that displays a request for leave that can be accepted or denied
            return(
                <>
                    <Card.Body>
                        <Card.Title>
                            {"Leave Request"}
                        </Card.Title>
                        {notification.emp_fName + " " + notification.emp_lName + " is requesting leave on the " + (this.state.dates[index].getDate() + 1) + "/" +  (this.state.dates[index].getMonth() + 1) + "/" +
                        this.state.dates[index].getFullYear() + " from " + notification.noti_start + "-" + notification.noti_end + " due to " + notification.noti_desc}
                    </Card.Body>
                    <Button variant="primary" onClick={() =>this.acceptRequest(notification, index)}>Accept</Button>
                    <Button variant="primary" onClick={() =>this.denyRequest(notification, index)}>Deny</Button>
                </>
            )
        }
        else if (notification.noti_type == "Deny") {
            //Returns a card that displays a denied notification
            return(
                <>
                    <Card.Body>
                        <Card.Title>
                            {"Request Denied"}
                        </Card.Title>
                        {notification.noti_desc + ". Please contact a manger if you want to know more."}
                    </Card.Body>
                    <Button variant="primary" onClick={() =>this.okRemove(notification)}>OK</Button>
                    </>
            )
        }
        else if (notification.noti_type == "Accept") {
            //Returns a card that displays an accepted notification
            return(
                <>
                    <Card.Body>
                        <Card.Title>
                            {"Request Accepted"}
                        </Card.Title>
                        {notification.noti_desc}
                    </Card.Body>
                    <Button variant="primary" onClick={() =>this.okRemove(notification)}>OK</Button>
                </>
            )
        }
        else if (notification.noti_type == "availabilityChange") {
            //Returns a card that displays a request for a regular availability change that can be accepted or denied
            return(
                <>
                    <Card.Body>
                        <Card.Title>
                            {"Availability Change"}
                        </Card.Title>
                        {notification.emp_fName + " " + notification.emp_lName + " is requesting a change of availability for  " + dayNames[notification.noti_desc] + "'s from " + notification.noti_start + "-" + notification.noti_end + ". They previously had " +
                            "an availability of: " + notification.reg_start + "-" + notification.reg_end + "."}
                    </Card.Body>
                    <Button variant="primary" onClick={() =>this.acceptRequest(notification)}>Accept</Button>
                    <Button variant="primary" onClick={() =>this.denyRequest(notification)}>Deny</Button>
                </>
            )
        }
    }
    //Deals with loading all notifications on the page properly
    processNotifs(){
        return this.state.data.map((notification, index) =>
            <Col>
                <Card>
                    {this.notifType(notification, index)}
                </Card>
            </Col>
        );
    }

    //Deals with getting all the notifications and any extra values needed to load notifications
    async componentDidMount(){
        var res1;
        //Gets all notifications relating to a user
        const res = await axios.get("http://localhost:2420/getNotifications/" + sessionStorage.getItem("emp_privilege") + "&" + sessionStorage.getItem("company_id")).catch((err) => {
            console.log(err);
        });
        let notiList = [];
        let dateList = [];

        //Pushes all notifications and dates to an array
        for(let i = 0; i < res.data.length; i++)
        {
            let date = new Date(res.data[i].noti_date);
            dateList.push(date);
            if (res.data[i].noti_type == "availabilityChange") {
                //Gets an employees regular availability
                res1 = await getRegularAvailability(res.data[i].emp_id, dayNames[res.data[i].noti_desc]);
                res.data[i]["reg_start"] = res1.regStart;
                res.data[i]["reg_end"] = res1.regEnd;
            }
            notiList.push(res.data[i]);
        }

        this.setState({data: notiList, dates: dateList, isLoaded: true});
    }

    //Deals with the actual rendering of the page
    render(){
        const {isLoaded} = this.state;
        console.log(isLoaded);
        if(isLoaded){
            return(
                <div className='flex'>
                    <Navbar/>

                    <Container>
                        <Box display={'flex'}
                             flexdirection={'row'}>

                            <Box>
                                <Sidebar/>
                            </Box>


                       <Box>
                           <Row xs={1} md={2} className="g-4">
                           {this.processNotifs()}
                           </Row>
                       </Box>

                        </Box>
                    </Container>
                </div>
            )
        }
    }
}
export default Notifications;