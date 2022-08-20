import * as React from 'react';
import Navbar from '../components/navbar';
import Roster from '../components/roster';
import Sidebar from '../components/sidebar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    overflowY: 'scroll',
    maxHeight: "70%",
    boxShadow: 24,
    p: 4,
};

//get employees already rostered on and display them initially
//only have unadded employees in the add employee MODAL
//make employees CHECKABLE - then have add button which adds them to ROSTER
//add availability info in MODAL for date availability
//make table cell CLICKABLE, display MODAL with START TIME, END TIME, ADD button

export default function ManagerEditRoster(){
    const [open, setOpen] = React.useState(false);
    const [employeeList, setEmployeeList] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        const getEmployeeData = async () => {
            const company_id = sessionStorage.getItem('company_id')
            const res = await axios.get('http://localhost:2420/getEmployeesList/' + company_id).catch((err) => {console.log(err);});
            const employeeList = res.data;

            setEmployeeList(employeeList);
            setIsLoaded(true);
        }

        getEmployeeData();
    }, []);

    const generateModal = () => {
        return employeeList.map((employee, index) => 
            <div>
                <input type={'checkbox'} id={index} className={'employeeCheck'} name={employee.emp_id} onChange={event => addEmployee(event.target)}/>
                &nbsp;&nbsp;
                <label for={index}>{" " + employee.emp_id + ": " + employee.emp_fName + " " + employee.emp_lName}</label>
            </div>
        )
    }

    let checkedEmployees = [];

    const addEmployee = (event) => {
        const empExists = checkedEmployees.indexOf(event.name);

        if(empExists === -1){
            checkedEmployees.push(event.name);
        } else {
            checkedEmployees.splice(empExists, 1);
        }
    }

    const addEmployees = () => {
        console.log(checkedEmployees);

        handleClose();
    }

    if(isLoaded)
    {
        return(
            <>
                <Navbar/>
                <Sidebar/>
                    <Container>

                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx ={{borderStyle:"solid", height:"700px", width:"1200px"}}>
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
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Employee List
                                </Typography>
                                <br />
                                <div className="row">
                                    {generateModal()}
                                </div>
                                <br />
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    >
                                    <Button variant='contained' onClick={addEmployees}>Add Employees</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Container>
            </>
        )
    }

}