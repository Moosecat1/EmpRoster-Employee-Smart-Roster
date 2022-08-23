import * as React from 'react';
import Navbar from '../components/navbar';
import EditableRoster from '../components/EditableRoster';
import Sidebar from '../components/sidebar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const { addWeeklyRoster } = require('../modules/endpoint');

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
    const [openRostered, setOpenRostered] = React.useState(false);
    const [employeeList, setEmployeeList] = React.useState([]);
    const [rosteredEmployeeList, setRosteredEmployeeList] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenRostered = () => setOpenRostered(true);
    const handleCloseRostered = () => setOpenRostered(false);

    React.useEffect(() => {
        const getEmployeeData = async () => {
            const company_id = sessionStorage.getItem('company_id')

            let weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            const week_start_sql = weekStart.toISOString().split('T')[0];

            const res = await axios.get('http://localhost:2420/getUnrosteredEmployees/' + company_id + "&" + week_start_sql).catch((err) => {console.log(err);});
            const employeeList = res.data;

            const res1 = await axios.get('http://localhost:2420/getRosteredEmployees/' + company_id + "&" + week_start_sql).catch((err) => {console.log(err);});
            const rosteredEmployeeList = res1.data;

            setEmployeeList(employeeList);
            setRosteredEmployeeList(rosteredEmployeeList);
            setIsLoaded(true);
        }

        getEmployeeData();
    }, []);

    const generateAddModal = () => {
        return employeeList.map((employee, index) => 
            <div key={index}>
                <input type={'checkbox'} id={index} className={'employeeCheck'} name={employee.emp_id} onChange={event => addEmployee(event.target)}/>
                &nbsp;&nbsp;
                <label for={index}>{" " + employee.emp_id + ": " + employee.emp_fName + " " + employee.emp_lName}</label>
            </div>
        )
    }

    const generateRemoveModal = () => {
        return rosteredEmployeeList.map((employee, index) => 
            <div key={index}>
                <input type={'checkbox'} id={index} className={'employeeCheck'} name={employee.emp_id} onChange={event => removeEmployee(event.target)}/>
                &nbsp;&nbsp;
                <label for={index}>{" " + employee.emp_id + ": " + employee.emp_fName + " " + employee.emp_lName}</label>
            </div>
        )
    }

    let checkedEmployees = [];
    let checkedRosteredEmployees = [];

    const addEmployee = (event) => {
        const empExists = checkedEmployees.indexOf(event.name);

        if(empExists === -1){
            checkedEmployees.push(event.name);
        } else {
            checkedEmployees.splice(empExists, 1);
        }
    }

    const removeEmployee = (event) => {
        const empExists = checkedRosteredEmployees.indexOf(event.name);

        if(empExists === -1){
            checkedRosteredEmployees.push(event.name);
        } else {
            checkedRosteredEmployees.splice(empExists, 1);
        }
    }

    const addEmployees = async () => {
        const currentDate = new Date();

        let weekStart = new Date();
        weekStart.setDate(currentDate.getDate() - (currentDate.getDay()));
        const weekStartSQL = weekStart.toISOString().split('T')[0].replace(/-/g, '/');

        for(let i = 0; i < checkedEmployees.length; i++){
            await addWeeklyRoster(weekStartSQL, checkedEmployees[i]);
        }

        handleClose();
        document.location.reload();
    }

    const removeEmployees = async () => {
        const currentDate = new Date();

        let weekStart = new Date();
        weekStart.setDate(currentDate.getDate() - (currentDate.getDay()));
        const weekStartSQL = weekStart.toISOString().split('T')[0];

        for(let i = 0; i < checkedRosteredEmployees.length; i++){
            await axios.delete("http://localhost:2420/removeRosterWeek/" + checkedRosteredEmployees[i] + "&" + weekStartSQL).catch((err) => {console.log(err);});
        }

        handleClose();
        document.location.reload();
    }

    if(isLoaded)
    {
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

                            <Box>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx ={{borderStyle:"solid", width:"1155px", overflowY: 'scroll', maxHeight: "700px"}}>

                                        <EditableRoster/>
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
                                        <Button variant="contained" onClick={handleOpenRostered}>
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
                                                {generateAddModal()}
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
                                    <Modal
                                        open={openRostered}
                                        onClose={handleCloseRostered}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={modalStyle}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Employee List
                                            </Typography>
                                            <br />
                                            <div className="row">
                                                {generateRemoveModal()}
                                            </div>
                                            <br />
                                            <Box
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                >
                                                <Button variant='contained' onClick={removeEmployees}>Remove Employees</Button>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </Box>
                        </Box>
                    </Container>
            </>
        )
    }

}
