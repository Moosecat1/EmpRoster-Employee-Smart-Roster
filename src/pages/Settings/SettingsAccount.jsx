import * as React from 'react';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Sidebar from "../../components/sidebar";
import {ManageAccounts, Brush ,Camera} from "@mui/icons-material";

import {Box,Button,Container, List, ListItem, ListItemIcon , ListItemText, ListItemButton, Stack, Switch, Slider, Grid, Paper, Avatar , styled} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Item = styled(Paper)(({ theme }) => ({ // makes a simple container which holds an item
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));
const label = { inputProps: { 'aria-label': 'Colour-Blind-Switch' } }; //simple switch label


function stringToColour(string: string) { // This function is to make a string to a colour
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

function stringAvatar(name: string) { //function to split avatar name
    return {
        sx: {
            bgcolor: stringToColour(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function valuetext(value: number) { //font size value
    return `${value}px`;
}

const style = {  width: '77%',
    height: 850,
    bgcolor:"gray",
    paddingTop:5
    };



export default function SettingsAccount(){
    const [hiddenStatus, setHiddenStatus] = React.useState(["block","none","none"]);
    const [theme, setTheme] = React.useState(1);


    const handleChange = (event) => {
        setTheme(event.target.value);
    };



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
            sx={{display: {xs:"none",sm:'block'}}}
            >
            <List >
                
                <ListItemButton component="a"  >
                    <ListItemIcon >
                        <ManageAccounts/>
                    </ListItemIcon>
                    <ListItemText primary="Account">
                    </ListItemText>
                </ListItemButton>


                <ListItem disablePadding>
                    <ListItemButton component="a" >
                        <ListItemIcon>
                            <Camera/>
                        </ListItemIcon>
                        <ListItemText primary="Accessability" >
                        </ListItemText>
                    </ListItemButton>
                </ListItem>


                <ListItem disablePadding >
                    <ListItemButton component="a"  >
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
                         display={hiddenStatus[0]}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} display='flex'>
                                <Avatar {...stringAvatar('User Name')} ></Avatar>
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
                                            <ListItemText>Employee Phone Number:
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

                <Box
                    id={"Accessability"}
                     sx={{ ...style}}
                    display={hiddenStatus[1]}>

                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center">
                        <Grid item xs={12}
                        >
                            <Item >


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
                                    /></ListItem>
                                </List>

                                <List>
                                    <ListItem><ListItemText>Colour Blind:</ListItemText>
                                        <Switch {...label} />
                                    </ListItem>

                                </List>


                            </Item>
                        </Grid>
                    </Grid>

                </Box>

                <Box id='Themes'
                     sx={{...style}}
                     display={hiddenStatus[2]}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Item>

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

                                        <Button><img src="s.png" width="100" height="100" alt="sunrise-colour"/></Button>


                                        <Button> <img src="p.png" width="100" height="100" alt="midnight-colour"/></Button>
                                    <img src="pink.png" width="100" height="100" alt="hotpink-colour"/>
                                    <img src="b.png" width="100" height="100" alt="aqua-colour"/>
                                    <br/>
                                    </Box>
                                    <Button variant="contained" submit>Save Changes</Button>
                                </List>

                            </Item>
                        </Grid>
                    </Grid>

                </Box>
            </Stack>

        </>
    );

}