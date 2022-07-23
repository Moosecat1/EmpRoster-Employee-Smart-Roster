import * as React from 'react';
import Navbar from '../components/navbar';
import Roster from '../components/roster';
//import SidebarManager from '../components/sidebarManager';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function ManagerEditRoster(){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    return(
        <>
            <Navbar/>
            {/*<SidebarManager/>*/}
                <Container>

                <Box

                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx ={{borderStyle:"solid", height:"700px", width:"1200px"}}
                >
                        <Roster/>

                </Box>


                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx ={{width:"1200px"}}
                    >
                    <Box
                        p={1}
                        m={1}
                        order={1}
                    >
                        <Button variant="contained" onClick={handleOpen}>
                            Add Employee
                    </Button>


                    </Box>
                        <Box
                            p={1}
                            m={1}
                            order={2}
                        sx={{color:"white"}}>
                            ---------------
                        </Box>
                    <Box
                        p={1}
                        m={1}
                        order={3}>
                        <Button variant="contained" disabled>
                            Remove Employee
                        </Button>
                    </Box>
                    </Box>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Employee List
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                            </Typography>
                        </Box>
                    </Modal>
                </Container>

        </>

    )

}