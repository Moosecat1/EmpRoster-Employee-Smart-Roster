import * as React from 'react';

import {Box, Drawer,List, ListItem,ListItemIcon, ListItemButton, ListItemText, Divider} from "@mui/material";
import {Home, People ,Settings, Edit, Preview} from "@mui/icons-material";
import PropTypes from "prop-types";


export default function Sidebar() {

    const [hasLoaded, setHasLoaded] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);

    };

    const idList = ['dashboard', 'employees', 'settings', 'requestLeave'];
    const urlList = [
        "http://localhost:3000/mainhub",
        "http://localhost:3000/employeelist",
        "http://localhost:3000/settings/Account",
        "http://localhost:3000/RequestLeave"
    ]

    const url = window.location.href;



    if (sessionStorage.getItem("emp_privilege")  === 'Manager' || sessionStorage.getItem("emp_privilege")  === 'Admin') {
        return (
            <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
                <Divider/>
                <List >
                   
                        <ListItemButton  selected={selectedIndex === 0}
                                         onClick={(event) => handleListItemClick(event, 0)}
                                         href={"/MainHub"}>
                            <ListItemIcon >
                                <Home/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard">
                            </ListItemText>
                        </ListItemButton>

                        <ListItemButton selected={selectedIndex === 1}
                                        onClick={(event) => handleListItemClick(event, 1)}
                                        href={"/EmployeeList"}>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary="Employees" >
                            </ListItemText>
                        </ListItemButton>

                        <ListItemButton  selected={selectedIndex === 2}
                                         onClick={(event) => handleListItemClick(event, 2)}
                                         href={"/settings"}>
                            <ListItemIcon>
                                <Settings/>
                            </ListItemIcon>
                            <ListItemText primary="Settings">
                            </ListItemText>
                        </ListItemButton>
                    <ListItemButton  selected={selectedIndex === 3}
                                     onClick={(event) => handleListItemClick(event, 3)}
                                     href={"/ViewCompanyRoster"}>
                        <ListItemIcon>
                            <Preview/>
                        </ListItemIcon>
                        <ListItemText primary="View Company Roster">
                        </ListItemText>
                    </ListItemButton>

                    <ListItemButton  selected={selectedIndex === 4}
                                     onClick={(event) => handleListItemClick(event, 4)}
                                     href={"/ManagerEditRoster"}>
                        <ListItemIcon>
                            <Edit/>
                        </ListItemIcon>
                        <ListItemText primary="Edit Roster">
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
            <List >

            <ListItemButton  selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            href={"/MainHub"}>
                <ListItemIcon >
                <Home/>
                </ListItemIcon>
            <ListItemText primary="Dashboard">
            </ListItemText>
        </ListItemButton>

            <ListItemButton selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            href={"/RequestLeave"}>
                <ListItemIcon>
                    <People/>
                </ListItemIcon>
                <ListItemText primary="Request Leave" >
                </ListItemText>
            </ListItemButton>

            <ListItemButton  selected={selectedIndex === 2}
                             onClick={(event) => handleListItemClick(event, 2)}
                             href={"/settings"}>
                <ListItemIcon>
                    <Settings/>
                </ListItemIcon>
                <ListItemText primary="Settings">
                </ListItemText>
            </ListItemButton>

            <ListItemButton  selected={selectedIndex === 3}
                             onClick={(event) => handleListItemClick(event, 3)}
                             href={"/ChangeAvailability"}>
                <ListItemIcon>
                    <Edit/>
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
