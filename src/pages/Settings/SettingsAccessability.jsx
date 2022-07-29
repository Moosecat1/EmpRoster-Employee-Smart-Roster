import * as React from 'react';
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import {ManageAccounts, Brush ,Camera} from "@mui/icons-material";

import {Box, List, ListItem, ListItemIcon , ListItemText, ListItemButton, Stack, Switch, Slider, Grid, Paper , styled} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({ // makes a simple container which holds an item
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));
const label = { inputProps: { 'aria-label': 'Colour-Blind-Switch' } }; //simple switch label



function valuetext(value: number) { //font size value
    return `${value}px`;
}

const style = {  width: '77%',
    height: 850,
    bgcolor:"gray",
    paddingTop:5
};


export default function SettingsAccessability() {

    return(
        <>
            <Navbar/>

            <Stack direction="row">
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
                            <ListItemButton component="a" href={"/settings/Account"}  >
                                <ListItemIcon >
                                    <ManageAccounts/>
                                </ListItemIcon>
                                <ListItemText primary="Account">
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component="a" href={"/settings/Accessability"} >
                                <ListItemIcon>
                                    <Camera/>
                                </ListItemIcon>
                                <ListItemText primary="Accessability" >
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>


                        <ListItem disablePadding >
                            <ListItemButton component="a"  href={"/settings/Themes"} >
                                <ListItemIcon>
                                    <Brush/>
                                </ListItemIcon>
                                <ListItemText primary="Themes">
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>

                    <Box
                        id={"Accessability"}
                        sx={{ ...style}}

                        >

                        <Grid
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              spacing={3}>

                            <Grid xs={12}
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


            </Stack>
        </>

    )

}
