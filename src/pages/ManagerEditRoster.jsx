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

export default function ManagerEditRoster(){
    const [open, setOpen] = React.useState(false);
    const [openRostered, setOpenRostered] = React.useState(false);
    const [employeeList, setEmployeeList] = React.useState([]);
    const [currentWeekStart, setCurrentWeekStart] = React.useState("");
    const [weekStarts, setWeekStarts] = React.useState([]);
    const [rosteredEmployeeList, setRosteredEmployeeList] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenRostered = () => setOpenRostered(true);
    const handleCloseRostered = () => setOpenRostered(false);

    React.useEffect(() => {
        const getEmployeeData = async () => {
            const company_id = sessionStorage.getItem('company_id')

            //add the available week starts to an array
            let weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            const week_start_sql = sessionStorage.getItem('roster_week_start') === null ? weekStart.toISOString().split('T')[0] : sessionStorage.getItem('roster_week_start');

            let weekStarts = [];

            for(let i = 0; i < 3; i++){
                weekStarts.push(weekStart.toISOString().split('T')[0]);
                weekStart.setDate(weekStart.getDate() + 7);
            }

            //get the employees that are rostered and unrostered from db
            const res = await axios.get('http://localhost:2420/getUnrosteredEmployees/' + company_id + "&" + week_start_sql).catch((err) => {console.log(err);});
            const employeeList = res.data;

            const res1 = await axios.get('http://localhost:2420/getRosteredEmployees/' + company_id + "&" + week_start_sql).catch((err) => {console.log(err);});
            const rosteredEmployeeList = res1.data;

            setEmployeeList(employeeList);
            setCurrentWeekStart(week_start_sql);
            setWeekStarts(weekStarts);
            setRosteredEmployeeList(rosteredEmployeeList);
            setIsLoaded(true);
        }

        getEmployeeData();
    }, []);

    //generate modal with all employees that are not rostered, so they can be added to the roster
    const generateAddModal = () => {
        return employeeList.map((employee, index) => 
            <div key={index}>
                <input type={'checkbox'} id={index} className={'employeeCheck'} name={employee.emp_id} onChange={event => addEmployee(event.target)}/>
                &nbsp;&nbsp;
                <label htmlFor={index}>{" " + employee.emp_id + ": " + employee.emp_fName + " " + employee.emp_lName}</label>
            </div>
        )
    }

    //generate modal with all employees that are rostered, so they can be removed from the roster
    const generateRemoveModal = () => {
        return rosteredEmployeeList.map((employee, index) => 
            <div key={index}>
                <input type={'checkbox'} id={index} className={'employeeCheck'} name={employee.emp_id} onChange={event => removeEmployee(event.target)}/>
                &nbsp;&nbsp;
                <label htmlFor={index}>{" " + employee.emp_id + ": " + employee.emp_fName + " " + employee.emp_lName}</label>
            </div>
        )
    }

    let checkedEmployees = [];
    let checkedRosteredEmployees = [];

    //add checked employee to array (add)
    const addEmployee = (event) => {
        const empExists = checkedEmployees.indexOf(event.name);

        if(empExists === -1){
            checkedEmployees.push(event.name);
        } else {
            checkedEmployees.splice(empExists, 1);
        }
    }

    //add checked employee to array (remove)
    const removeEmployee = (event) => {
        const empExists = checkedRosteredEmployees.indexOf(event.name);

        if(empExists === -1){
            checkedRosteredEmployees.push(event.name);
        } else {
            checkedRosteredEmployees.splice(empExists, 1);
        }
    }

    //for each checked employee (add), add them to the selected week's roster
    const addEmployees = async () => {
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const week_start_sql = sessionStorage.getItem('roster_week_start') === null ? weekStart.toISOString().split('T')[0] : sessionStorage.getItem('roster_week_start');

        for(let i = 0; i < checkedEmployees.length; i++){
            await addWeeklyRoster(week_start_sql, checkedEmployees[i]);
        }

        handleClose();
        document.location.reload();
    }

    //for each checked employee (remove), remove them from the selected week's roster
    const removeEmployees = async () => {
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const week_start_sql = sessionStorage.getItem('roster_week_start') === null ? weekStart.toISOString().split('T')[0] : sessionStorage.getItem('roster_week_start');

        for(let i = 0; i < checkedRosteredEmployees.length; i++){
            await axios.delete("http://localhost:2420/removeRosterWeek/" + checkedRosteredEmployees[i] + "&" + week_start_sql).catch((err) => {console.log(err);});
        }

        handleClose();
        document.location.reload();
    }

    //change the roster week to be viewed
    const handleRosterChange = (roster_week_start) => {
        sessionStorage.setItem('roster_week_start', roster_week_start);
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
                                <br />
                                <label>Roster Week Start: </label>
                                &nbsp;
                                <select name="weekStart" defaultValue={currentWeekStart} onChange={(event) => handleRosterChange(event.target.value)}>
                                    {weekStarts.map((weekStart, index) =>
                                        <option name={weekStart} key={index}>{weekStart}</option>
                                    )}
                                </select>
                                <br /><br />
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx ={{borderStyle:"solid", width:"1155px", overflowY: 'scroll', maxHeight: "700px"}}>

                                        <EditableRoster week_start_sql={currentWeekStart}/>
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
