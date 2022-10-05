import * as React from 'react';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import {ManageAccounts, Brush ,Camera} from "@mui/icons-material";

import {Box,Button, Container ,List, ListItem, ListItemIcon , ListItemText, ListItemButton, Stack, Grid, Paper, Avatar , styled,Slider, Switch} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const axios = require('axios');

const Item = styled(Paper)(({ theme }) => ({ // makes a simple container which holds an item
    backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));

const label = { inputProps: { 'aria-label': 'Colour-Blind-Switch' } }; //simple switch label

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


const style = {  width: '100%',
    height: 1000,
    bgcolor:"gray",
    paddingTop:3
    };

function userfullName(){
    let fname = sessionStorage.getItem('emp_fName');
    let lname = sessionStorage.getItem('emp_priviledge');
    let userfullname = stringAvatar(fname +" "+ lname);
    return{
       userfullname
    }
}

var UserName = () => {
    var user = sessionStorage.getItem("emp_fName");
    return user;
}



function valuetext(value) { //font size value
    return `${value}px`;
}

export default function Settings(){

    const [theme, setTheme] = React.useState(1);


    const handleChange = (event) => {
        setTheme(event.target.value);
    };

    return(
        <>
          <Navbar/>
                <Container>
                    <Box
                    display={"flex"}
                    flexdirection={"row"}>

                        <Box>
                        <Sidebar/>
                        </Box>

                        <Box
                             sx={{...style}}
                             >
                            <Grid container spacing={3}>
                                <Grid item xs={12} display='flex'>
                                    <Avatar {...userfullName()} ></Avatar>
                                    &nbsp;&nbsp;
                                    <h3>{ UserName()}</h3>
                                </Grid>

                                <Grid item xs={12}>
                                    <Item>
                                        <h3 style={{fontWeight:"bold"}}>Account</h3>
                                        <h4>Account Information</h4>

                                        <List>
                                            <ListItem><ListItemText>Employement Status:</ListItemText></ListItem>
                                            <ListItem><ListItemText>Employement Role:</ListItemText></ListItem>
                                        </List>

                                        <List>
                                            <ListItem>
                                                <ListItemText>Employee Phone Number:
                                                    <br/> <Button variant="contained" size="small" href="/UpdatePhone">Edit</Button>

                                                </ListItemText>


                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>Employee Email Address:
                                                    <br/>
                                                    <Button variant="contained" size="small" href="/UpdateEmail">Edit</Button>
                                                </ListItemText>
                                            </ListItem>

                                        </List>


                                        <h4>Password and Security</h4>
                                        <List>
                                            <ListItem>
                                                <ListItemText>Password:
                                                    <br/> <Button variant="contained" size="small" href="/UpdatePassword">Edit</Button>

                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>Two Factor Authentication:
                                                    <br/> <Button variant="contained" size="small" submit>Edit</Button>
                                                </ListItemText>
                                            </ListItem>

                                        </List>

                                        <h3 style={{fontWeight:"bold"}}>Accessibility</h3>

                                    <List>
                                        <ListItem><ListItemText>Font Size:</ListItemText></ListItem>
                                        <ListItem><Slider

                                            defaultValue={14}
                                            getAriaValueText={valuetext}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={12}
                                            max={18}
                                            disabled
                                        /></ListItem>
                                    </List>

                                    <List>
                                        <ListItem><ListItemText>Colour Blind:</ListItemText>
                                            <Switch {...label} disabled/>
                                        </ListItem>

                                    </List>

                                        <h3 style={{fontWeight:"bold"}}>Themes</h3>


                                        <List>
                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }}>
                                                        <InputLabel id="simple-select-label">Change Theme:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Preset</MenuItem>
                                                            <MenuItem value={2}>Custom</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }} disabled>
                                                        <InputLabel id="simple-select-label">Primary Colour:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Default</MenuItem>
                                                            <MenuItem value={2}>Galaxy</MenuItem>
                                                            <MenuItem value={3}>Midnight</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }} disabled>
                                                        <InputLabel id="simple-select-label">Secondary Colour:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Default</MenuItem>
                                                            <MenuItem value={2}>Black</MenuItem>
                                                            <MenuItem value={3}>Blue</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText>
                                                    <FormControl sx={{ minWidth: 500 }} disabled>
                                                        <InputLabel id="simple-select-label">Text Colour:</InputLabel>
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={theme}
                                                            label="ChangeTheme"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Default</MenuItem>
                                                            <MenuItem value={2}>White</MenuItem>
                                                            <MenuItem value={3}>Black</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </ListItemText>
                                            </ListItem>

                                            <Box padding={2}>

                                                <Button><img src="public/s.png" width="100" height="100" alt="sunrise-colour"/></Button>
                                                <Button> <img src="public/p.png" width="100" height="100" alt="midnight-colour"/></Button>
                                                <Button>   <img src="public/pink.png" width="100" height="100" alt="hotpink-colour"/></Button>
                                                <Button>  <img src="public/b.png" width="100" height="100" alt="aqua-colour"/></Button>
                                                <br/>
                                            </Box>
                                            <Button variant="contained" submit>Save Changes</Button>
                                        </List>


                                    </Item>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
            </Container>
        </>
    );

}
