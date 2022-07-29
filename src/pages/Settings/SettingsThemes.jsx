import * as React from 'react';
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import {ManageAccounts, Brush ,Camera} from "@mui/icons-material";

import {Box,Button, List, ListItem, ListItemIcon , ListItemText, ListItemButton, Stack, Grid, Paper , styled} from "@mui/material";
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


const style = {  width: '77%',
    height: 850,
    bgcolor:"gray",
    paddingTop:5
};

export default function SettingsThemes() {
    const [theme, setTheme] = React.useState(1);


    const handleChange = (event) => {
        setTheme(event.target.value);
    };
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
                    <List>

                        <ListItem >
                            <ListItemButton component="a" href="/settings/Account" selected="true">
                                <ListItemIcon >
                                    <ManageAccounts/>
                                </ListItemIcon>
                                <ListItemText primary="Account">
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/settings/Accessability" >
                                <ListItemIcon>
                                    <Camera/>
                                </ListItemIcon>
                                <ListItemText primary="Accessability" >
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>


                        <ListItem disablePadding >
                            <ListItemButton component="a" href="/settings/Themes" >
                                <ListItemIcon>
                                    <Brush/>
                                </ListItemIcon>
                                <ListItemText primary="Themes">
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>


        <Box id='Themes'
             sx={{...style}}
             >
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
       </Stack>
        </>

    )


}