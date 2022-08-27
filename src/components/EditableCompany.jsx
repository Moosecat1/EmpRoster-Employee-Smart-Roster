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
    const [currentEmployeeData, setCurrentEmployeeData] = useState({emp_fName: '', emp_lName: '', emp_email: '', emp_type: '', emp_privilege: ''});
    const [open, setOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleOpen = (index) => {setCurrentEmployee(index); setOpen(true);};
    const handleClose = () => {setCurrentEmployeeData({emp_fName: '', emp_lName: '', emp_email: '', emp_type: '', emp_privilege: ''}); setOpen(false);}

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

    const handleInputChange = (fieldName, value) => {
        let ced = currentEmployeeData;
        ced[fieldName] = value;

        setCurrentEmployeeData(ced);
    }

    const submitChanges = async () => {
        const preData = employeeList[currentEmployee];
        const postData = currentEmployeeData;

        const emp_id = preData.emp_id;

        const fields = ['emp_fName', 'emp_lName', 'emp_email', 'emp_type', 'emp_privilege'];

        let updateData = {emp_fName: '', emp_lName: '', emp_email: '', emp_type: '', emp_privilege: ''};

        for(let i = 0; i < fields.length; i++){
            const currentField = postData[fields[i]];

            if(currentField !== ''){
                updateData[fields[i]] = currentField;
            } else{
                updateData[fields[i]] = preData[fields[i]];
            }
        }

        updateData['emp_id'] = emp_id;

        console.log(updateData);

        await axios.put("http://localhost:2420/updateEmployee", updateData).catch((err) => {console.log(err);});
        document.location.reload();
    }

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
            const employeeView = employeeList[currentEmployee];

            return(
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Employee: {employeeView.emp_id}
                    </Typography>
                    <br />
                    <label>Employee First Name</label>
                    <input type='text' disabled={false} placeholder={employeeView.emp_fName} onChange={(event) => {handleInputChange('emp_fName', event.target.value)}}></input>
                    <label>Employee Last Name</label>
                    <input type='text' disabled={false} placeholder={employeeView.emp_lName} onChange={(event) => {handleInputChange('emp_lName', event.target.value)}}></input>
                    <label>Employee Email</label>
                    <input type='text' disabled={false} placeholder={employeeView.emp_email} onChange={(event) => {handleInputChange('emp_email', event.target.value)}}></input>
                    <br /><br />
                    <label>Employee Type:</label>
                    &nbsp;
                    <select name='type' defaultValue={employeeView.emp_type} onChange={(event) => {handleInputChange('emp_type', event.target.value)}}>
                        <option>Casual</option>
                        <option>Part-time</option>
                        <option>Full-time</option>
                    </select>
                    <br /><br />
                    <label>Employee Privilege:</label>
                    &nbsp;
                    <select name='privilege' defaultValue={employeeView.emp_privilege} onChange={(event) => {handleInputChange('emp_privilege', event.target.value)}}>
                        <option>Employee</option>
                        <option>Manager</option>
                        <option>Admin</option>
                    </select>
                    <br /><br />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={() => submitChanges()}>Save Changes</button>
                    </div>
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