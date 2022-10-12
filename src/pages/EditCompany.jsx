import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import EditableCompany from '../components/EditableCompany';
import { Alert,AlertTitle,Modal,TextField, Typography, Box, Button, Container } from '@mui/material';
import Sidebar from '../components/sidebar';
const { addNullRegularAvailabilities } = require('../modules/endpoint');

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
    const [addOpen, setAddOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);
    const [checkedEmployees, setCheckedEmployees] = useState([]);
    const [inputFields, setInputFields] = useState([
        {
            firstName: '', lastName: '', privilege: 'Employee', type: 'Casual'
        }
    ]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [showAlert, setShowAlert] = useState(false);


    const handleAddOpen = () => {setAddOpen(true);}
    const handleAddClose = () => {
        const string = "Are you sure you want to exit? All input data will be lost.";
        let conf = window.confirm(string);

        if(conf){
            setInputFields([{firstName: '', lastName: '', privilege: 'Employee', type: 'Casual'}]); 
            setAddOpen(false);
            setShowAlert(false);
            setInvalidFields([]);
        }
    }

    const handleRemoveOpen = () => {setRemoveOpen(true);}
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

    const handleChangeInput = (index, event) => {
        var labels = document.getElementsByClassName(event.target.name);

        for(let i = 0; i < labels.length; i++)
        {
            labels[i].innerHTML = "";
        }

        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleAdd = () => {
        setInputFields([...inputFields, {firstName: '', lastName: '', email: '', privilege: 'Employee', type: 'Casual'}]);
    }

    const handleRemove = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

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

    const finalise = () => {
        (async() => {
            for(let i = 0; i < inputFields.length; i++)
            {
                const employee = inputFields[i];
                const firstName = employee.firstName;
                const lastName = employee.lastName;
                const email = employee.email;
                const privilege = employee.privilege;
                const type = employee.type;

                const companyId = sessionStorage.getItem('company_id');

                const errors = [];

                if(firstName === "" || (/\d/.test(firstName)))
                {
                    errors.push(" First Name: should not contain numbers or be left empty");
                }if( lastName === "" || (/\d/.test(lastName))){
                errors.push(" Last Name: should not contain numbers or be left empty");
            }if(email === "" || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                errors.push(" Email: should not be left empty Or data entered is invalid");
            }if(privilege === "" || type === ""){
                errors.push(" Privilege or Type: should not be left empty");
            }
                if (errors.length === 0){
                    //do not delete anything below they are CRUCIAL for the code to RUN
                    const res = await axios.post("http://localhost:2420/addEmployee", {
                        emp_password: null,
                        emp_fName: firstName,
                        emp_lName: lastName,
                        emp_email: email,
                        emp_type: type,
                        emp_privilege: privilege,
                        emp_password_changed: false,
                        company_id: companyId
                    }).catch((err) => {
                        console.log(err);
                    });

                    const empId = res.data[1];
                    await addNullRegularAvailabilities(empId);
                    document.location.reload();
                } else{
                    setInvalidFields(errors);
                    setShowAlert(true);
                }
            }


        })();
    }

    const generateAddModal = () => {
        return(
            <form onSubmit={handleSubmit}>
                {showAlert ?
                    <Alert
                        severity="warning"
                        variant="outlined" >
                        <AlertTitle>Error</AlertTitle>
                        Your details have the following issues:
                        <strong>{invalidFields.toString()}</strong>
                    </Alert> :
                    <Alert
                        severity="info">
                        Please fill out the following form for your new Employee's Account(s)
                    </Alert>
                }
                {inputFields.map((inputField, index) =>
                    <div className={"form-signin w-100 m-auto text-center"} key={index}>
                        <div className={"form-floating"}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type={"text"}
                                name={"firstName"}
                                label="Employee First Name"
                                value={inputField.firstName}
                                onChange={event => handleChangeInput(index, event)}
                            />
                        </div>
                        <div className={"form-floating"}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type={"text"}
                                name={"lastName"}
                                label="Employee Last Name"
                                value={inputField.lastName} onChange={event => handleChangeInput(index, event)}
                            />
                        </div>
                        <div className={"form-floating"}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type={"text"}
                                name={"email"}
                                label="Employee Email"
                                value={inputField.email}
                                onChange={event => handleChangeInput(index, event)}
                            />
                        </div>
                        <br />
                        <div>
                            <label>Employee Privilege:</label>
                            &nbsp;&nbsp;
                            <select name='privilege' onChange={event => handleChangeInput(index, event)}>
                                <option>Employee</option>
                                <option>Manager</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <br />
                        <div>
                            <label>Employee Type:</label>
                            &nbsp;&nbsp;
                            <select name='type' onChange={event => handleChangeInput(index, event)}>
                                <option>Casual</option>
                                <option>Part-time</option>
                                <option>Full-time</option>
                            </select>
                        </div>
                        <br />
                        <div className='buttonDiv'>
                            <Button id="removeButton" onClick={() => handleRemove(index)}>Remove Employee</Button>
                        </div>
                    </div>
                )}
                <br />
                <div className='buttonDiv'>
                    <Button id="addButton" onClick={handleAdd}>Add Employee</Button>
                </div>
                <br /><br/>
            </form>
        );
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
            <Container>
                <Box display={'flex'}
                     flexdirection={'row'}>

                    <Box>
                        <Sidebar/>
                    </Box>


                    <Box>
                        <h1>Company Name: {companyName}</h1>
                        <h1 style={{fontSize: '30px'}}>Company ID: {sessionStorage.getItem('company_id')}</h1>
                        <br />
                        <EditableCompany setEmployeeListParent={setEmployeeList}/>
                        <br />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant='contained' onClick={() => handleAddOpen()}>Add Employee</Button>
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
                        <Modal
                            open={addOpen}
                            onClose={handleAddClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add Employees
                                </Typography>
                                <br />
                                {generateAddModal()}
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Button variant='contained' onClick={finalise}>Add Employees</Button>
                                </div>
                            </Box>
                        </Modal>

                    </Box>
                    </Box>
            </Container>

        </>
    )
}