import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import EditableCompany from '../components/EditableCompany';
import { Modal, Typography, Box, Button } from '@mui/material';

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

export default function EditCompany(){
    const [companyName, setCompanyName] = useState("");
    const [employeeList, setEmployeeList] = useState([]);
    const [removeOpen, setRemoveOpen] = useState(false);
    const [checkedEmployees, setCheckedEmployees] = useState([]);

    const handleRemoveOpen = () => {setRemoveOpen(true);};
    const handleRemoveClose = () => {setCheckedEmployees([]); setRemoveOpen(false);}

    useEffect(() => {
        //get newly created company's info (company name, id, employee info)
        async function initialiseCompanyData(){
            const res = await axios.get("http://localhost:2420/getCompanyName/" + sessionStorage.getItem('company_id')).catch((err) => {console.log(err);});

            const companyName = res.data[0].company_name;
            setCompanyName(companyName);
        }

        initialiseCompanyData();
    }, []);

    const generateRemoveModal = () => {
        if(employeeList.length !== 0){
            return employeeList.map((employee, index) => 
                <div key={index}>
                    <input type={'checkbox'} id={index} className={'employeeCheck'} name={employee.emp_id} onChange={event => addCheckedEmployees(event.target.name)}/>
                    &nbsp;&nbsp;
                    <label for={index}>{" " + employee.emp_id + ": " + employee.emp_fName + " " + employee.emp_lName}</label>
                </div>
            )
        }
    }

    const addCheckedEmployees = (emp_id) => {
        const empIndex = checkedEmployees.indexOf(emp_id);

        if(empIndex === -1){
            const checkedEmployeesTemp = [...checkedEmployees, emp_id];
            setCheckedEmployees(checkedEmployeesTemp);
        } else{
            const checkedEmployeesTemp = [...checkedEmployees];
            checkedEmployeesTemp.splice(empIndex, 1)
            setCheckedEmployees(checkedEmployeesTemp);
        }
    }

    const removeEmployees = async () => {
        if(checkedEmployees.length !== 0){
            let string = "Are you sure you want to delete employees ";

            for(let i = 0; i < checkedEmployees.length; i++){
                string += checkedEmployees[i];

                if(i !== checkedEmployees.length - 1){
                    string += ", ";
                } else {
                    string += "?";
                }
            }

            let conf = window.confirm(string);

            if(conf){
                for(let i = 0; i < checkedEmployees.length; i++){
                    const emp_id = checkedEmployees[i];
    
                    await axios.delete("http://localhost:2420/removeEmployee/" + emp_id);
                }
    
                document.location.reload();
            } else{
                handleRemoveClose();
            }
        } else{
            handleRemoveClose();
        }
    }

    return(
        <>
            <Navbar/>
            <h1>Company Name: {companyName}</h1>
            <h1 style={{fontSize: '30px'}}>Company ID: {sessionStorage.getItem('company_id')}</h1>
            <br />
            <EditableCompany setEmployeeListParent={setEmployeeList}/>
            <br />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant='contained'>Add Employee</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant='contained' onClick={() => handleRemoveOpen()}>Remove Employee</Button>
            </div>
            <Modal
                open={removeOpen}
                onClose={handleRemoveClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Employee List
                        </Typography>
                        <br />
                        {generateRemoveModal()}
                        <br />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant='contained' onClick={removeEmployees}>Remove Employees</Button>
                        </div>
                    </Box>
            </Modal>
        </>
    )
}