import * as React from 'react';

import {Box,List,ListItemIcon, ListItemButton, ListItemText, Divider} from "@mui/material";
import {Home, People,Event,Business,Notifications,Settings, Preview, EventAvailable, ViewColumn} from "@mui/icons-material";

const admPages = ["/mainhub", "/employeelist", "/notifications", "/settings", "/viewcompanyroster", "/changeavailability", "/companyevent", "/managereditroster", "/editcompany"];
const manPages = ["/mainhub", "/employeelist", "/notifications", "/settings", "/viewcompanyroster", "/changeavailability", "/managereditroster", "/companyevent"];
const empPages = ["/mainhub", "/requestleave", "/notifications", "/settings", "/changeavailability"];

export default function Sidebar() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    let url = window.location.href;
    url = url.split('/');
    url = url[url.length - 1];
    url = '/' + url.toLowerCase();

    let selectedArray;

    if(sessionStorage.getItem("emp_privilege") === "Employee"){
        let arrLength = empPages.length;
        selectedArray = new Array(arrLength).fill(0);
        selectedArray[empPages.indexOf(url)] = 1;
    } else if(sessionStorage.getItem("emp_privilege") === "Manager"){
        let arrLength = manPages.length;
        selectedArray = new Array(arrLength).fill(0);
        selectedArray[manPages.indexOf(url)] = 1;
    } else if(sessionStorage.getItem("emp_privilege") === "Admin"){
        let arrLength = admPages.length;
        selectedArray = new Array(arrLength).fill(0);
        selectedArray[admPages.indexOf(url)] = 1;
    }

    if (sessionStorage.getItem("emp_privilege")  === 'Admin') {
        return(
            <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
                <Divider/>
                <List >
                        <ListItemButton  selected={selectedIndex === selectedArray[0]}
                                         onClick={(event) => handleListItemClick(event, 0)}
                                         href={"/MainHub"}>
                            <ListItemIcon >
                                <Home/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard">
                            </ListItemText>
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === selectedArray[1]}
                                        onClick={(event) => handleListItemClick(event, 1)}
                                        href={"/EmployeeList"}>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary="Employees" >
                            </ListItemText>
                        </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[2]}
                                     onClick={(event) => handleListItemClick(event, 2)}
                                     href={"/notifications"}>
                        <ListItemIcon>
                            <Notifications/>
                        </ListItemIcon>
                        <ListItemText primary="Notifications">
                        </ListItemText>
                    </ListItemButton>
                        <ListItemButton  selected={selectedIndex === selectedArray[3]}
                                         onClick={(event) => handleListItemClick(event, 3)}
                                         href={"/settings"}>
                            <ListItemIcon>
                                <Settings/>
                            </ListItemIcon>
                            <ListItemText primary="Settings">
                            </ListItemText>
                        </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[4]}
                                     onClick={(event) => handleListItemClick(event, 4)}
                                     href={"/ViewCompanyRoster"}>
                        <ListItemIcon>
                            <Preview/>
                        </ListItemIcon>
                        <ListItemText primary="View Company Roster">
                        </ListItemText>
                    </ListItemButton>

                    <ListItemButton  selected={selectedIndex === selectedArray[5]}
                                     onClick={(event) => handleListItemClick(event, 5)}
                                     href={"/ChangeAvailability"}>
                        <ListItemIcon>
                            <EventAvailable/>
                        </ListItemIcon>
                        <ListItemText primary="Change Availability">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[6]}
                                     onClick={(event) => handleListItemClick(event, 6)}
                                     href={"/CompanyEvent"}>
                        <ListItemIcon>
                            <Event/>
                        </ListItemIcon>
                        <ListItemText primary="Company Event">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[7]}
                                     onClick={(event) => handleListItemClick(event, 7)}
                                     href={"/ManagerEditRoster"}>
                        <ListItemIcon>
                            <ViewColumn/>
                        </ListItemIcon>
                        <ListItemText primary="Edit Roster">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[8]}
                                     onClick={(event) => handleListItemClick(event, 8)}
                                     href={"/editcompany"}>
                        <ListItemIcon>
                            <Business/>
                        </ListItemIcon>
                        <ListItemText primary="Edit Company">
                        </ListItemText>
                    </ListItemButton>
                </List>
                <Divider/>

            </Box>
        )
    }else if(sessionStorage.getItem("emp_privilege")  === 'Manager'){
        return(
            <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
                <Divider/>
                <List >
                    <ListItemButton  selected={selectedIndex === selectedArray[0]}
                                     onClick={(event) => handleListItemClick(event, 0)}
                                     href={"/MainHub"}>
                        <ListItemIcon >
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton selected={selectedIndex === selectedArray[1]}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                    href={"/EmployeeList"}>
                        <ListItemIcon>
                            <People/>
                        </ListItemIcon>
                        <ListItemText primary="Employees" >
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[2]}
                                     onClick={(event) => handleListItemClick(event, 2)}
                                     href={"/notifications"}>
                        <ListItemIcon>
                            <Notifications/>
                        </ListItemIcon>
                        <ListItemText primary="Notifications">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[3]}
                                     onClick={(event) => handleListItemClick(event, 3)}
                                     href={"/settings"}>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary="Settings">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[4]}
                                     onClick={(event) => handleListItemClick(event, 4)}
                                     href={"/ViewCompanyRoster"}>
                        <ListItemIcon>
                            <Preview/>
                        </ListItemIcon>
                        <ListItemText primary="View Company Roster">
                        </ListItemText>
                    </ListItemButton>

                    <ListItemButton  selected={selectedIndex === selectedArray[5]}
                                     onClick={(event) => handleListItemClick(event, 5)}
                                     href={"/ChangeAvailability"}>
                        <ListItemIcon>
                            <EventAvailable/>
                        </ListItemIcon>
                        <ListItemText primary="Change Availability">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[6]}
                                     onClick={(event) => handleListItemClick(event, 6)}
                                     href={"/ManagerEditRoster"}>
                        <ListItemIcon>
                            <ViewColumn/>
                        </ListItemIcon>
                        <ListItemText primary="Edit Roster">
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  selected={selectedIndex === selectedArray[7]}
                                     onClick={(event) => handleListItemClick(event, 7)}
                                     href={"/CompanyEvent"}>
                        <ListItemIcon>
                            <Event/>
                        </ListItemIcon>
                        <ListItemText primary="Company Event">
                        </ListItemText>
                    </ListItemButton>
                </List>
                <Divider/>
            </Box>
        )
    } else if(sessionStorage.getItem("emp_privilege") === 'Employee'){
        return(
                <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
        <Divider/>
            <List>
            <ListItemButton  selected={selectedIndex === selectedArray[0]}
            onClick={(event) => handleListItemClick(event, 0)}
            href={"/MainHub"}>
                <ListItemIcon >
                <Home/>
                </ListItemIcon>
            <ListItemText primary="Dashboard">
            </ListItemText>
        </ListItemButton>
            <ListItemButton selected={selectedIndex === selectedArray[1]}
                            onClick={(event) => handleListItemClick(event, 1)}
                            href={"/RequestLeave"}>
                <ListItemIcon>
                    <People/>
                </ListItemIcon>
                <ListItemText primary="Request Leave" >
                </ListItemText>
            </ListItemButton>
                <ListItemButton  selected={selectedIndex === selectedArray[2]}
                                 onClick={(event) => handleListItemClick(event, 2)}
                                 href={"/notifications"}>
                    <ListItemIcon>
                        <Notifications/>
                    </ListItemIcon>
                    <ListItemText primary="Notifications">
                    </ListItemText>
                </ListItemButton>
            <ListItemButton  selected={selectedIndex === selectedArray[3]}
                             onClick={(event) => handleListItemClick(event, 3)}
                             href={"/settings"}>
                <ListItemIcon>
                    <Settings/>
                </ListItemIcon>
                <ListItemText primary="Settings">
                </ListItemText>
            </ListItemButton>
            <ListItemButton  selected={selectedIndex === selectedArray[4]}
                             onClick={(event) => handleListItemClick(event, 4)}
                             href={"/ChangeAvailability"}>
                <ListItemIcon>
                    <EventAvailable/>
                </ListItemIcon>
                <ListItemText primary="Change Availability">
                </ListItemText>
            </ListItemButton>
        </List>
            <Divider/>

        </Box>
        )
    }
}
