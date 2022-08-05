import * as React from 'react';
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import {ManageAccounts, Brush ,Camera} from "@mui/icons-material";

import {Box,Button, List, ListItem, ListItemIcon , ListItemText, ListItemButton, Stack, Grid, Paper, Avatar , styled} from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({ // makes a simple container which holds an item
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));


function stringToColour(string) { // This function is to make a string to a colour
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return colour;
}

function stringAvatar(name) { //function to split avatar name
    return {
        sx: {
            bgcolor: stringToColour(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const style = {  width: '77%',
    height: 850,
    bgcolor:"gray",
    paddingTop:5
    };



export default function SettingsAccount(){



    return(
        <>
          <Navbar/>

            <Stack direction="row"
            >
                <Box
                flex={.7}
                bgcolor={"gray"}>
            <Sidebar/>
                </Box>
            <Box
            bgcolor={"white"}
            flex={1}
            p={3}

            >

            <List >

                <ListItem /*onClick={handleClick}*/>
                <ListItemButton component="a"  href={"/settings/Account"} >
                    <ListItemIcon >
                        <ManageAccounts/>
                    </ListItemIcon>
                    <ListItemText primary="Account">
                    </ListItemText>
                </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/settings/Accessibility"} >
                        <ListItemIcon>
                            <Camera/>
                        </ListItemIcon>
                        <ListItemText primary="Accessibility" >
                        </ListItemText>
                    </ListItemButton>
                </ListItem>


                <ListItem disablePadding >
                    <ListItemButton component="a" href={"/settings/Themes"} >
                        <ListItemIcon>
                            <Brush/>
                        </ListItemIcon>
                        <ListItemText primary="Themes">
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

            </Box>


                    <Box id='Account'
                         sx={{...style}}
                         >
                        <Grid container spacing={3}>
                            <Grid item xs={12} display='flex'>
                                <Avatar {...stringAvatar('Adam pwans')} ></Avatar>
                                <h3>User Name</h3>
                            </Grid>

                            <Grid item xs={12}>
                                <Item>
                                    <h4>Account Information</h4>

                                    <List>
                                        <ListItem><ListItemText>Employement Status:</ListItemText></ListItem>
                                        <ListItem><ListItemText>Employement Role:</ListItemText></ListItem>
                                    </List>

                                    <List>
                                        <ListItem>
                                            <ListItemText>Employee Phone Number:
                                                <br/> <Button variant="contained" size="small" submit>Edit</Button>

                                            </ListItemText>


                                        </ListItem>

                                        <ListItem>
                                            <ListItemText>Employee Email Address:
                                                <br/>
                                                <Button variant="contained" size="small" submit>Edit</Button>
                                            </ListItemText>
                                        </ListItem>

                                    </List>


                                    <h4>Password and Security</h4>
                                    <List>
                                        <ListItem>
                                            <ListItemText>Password:
                                                <br/> <Button variant="contained" size="small" submit>Edit</Button>

                                            </ListItemText>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText>Two Factor Authentication:
                                                <br/> <Button variant="contained" size="small" submit>Edit</Button>
                                            </ListItemText>
                                        </ListItem>

                                    </List>

                                </Item>
                            </Grid>
                        </Grid>

                    </Box>
            </Stack>

        </>
    );

}
