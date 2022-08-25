import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';

const nameStyle = {
    backgroundColor: '#c5ceff',
    border: '1px solid black'
}

const negStyle = {
    backgroundColor: '#F7F8FC',
    border: '1px solid black'
}

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

export default function EditableCompany(){
    const [employeeList, setEmployeeList] = useState([]);
    const [currentEmployee, setCurrentEmployee] = useState(-1);
    const [open, setOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleOpen = (index) => {setCurrentEmployee(index); setOpen(true);};
    const handleClose = () => setOpen(false);

    useEffect(() => {
        //get newly created company's info (company name, id, employee info)
        async function initialiseCompanyData(){
            const res = await axios.get("http://localhost:2420/getEmployeesList/" + sessionStorage.getItem('company_id')).catch((err) => {console.log(err);});

            let employeeList = res.data;

            setEmployeeList(employeeList);
            setIsLoaded(true);
        }

        initialiseCompanyData();
    }, []);

    const generateEmployees = () => {
        return employeeList.map((employee, index) => 
            <tr key={index}>
                <td style={nameStyle} onClick={() => handleOpen(index)}>
                    {employee.emp_id}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <EditIcon/>
                </td>
                <td style={negStyle}>{employee.emp_fName + " " + employee.emp_lName}</td>
                <td style={negStyle}>{employee.emp_email}</td>
                <td style={negStyle}>{employee.emp_type}</td>
                <td style={negStyle}>{employee.emp_privilege}</td>
            </tr>
        );
    }

    const generateModal = () => {
        if(typeof employeeList[currentEmployee] != "undefined")
        {
            return(
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Employee: {employeeList[currentEmployee].emp_id}
                    </Typography>
                </div>
            )
        }
    }
    
    if(isLoaded){
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Email</th>
                            <th>Employee Type</th>
                            <th>Employee Privilege</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateEmployees()}
                    </tbody>
                </table>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                        <Box sx={modalStyle}>
                            {generateModal()}
                        </Box>
                </Modal>
            </div>
        )
    }
}