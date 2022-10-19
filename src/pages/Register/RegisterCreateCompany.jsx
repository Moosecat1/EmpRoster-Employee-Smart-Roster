import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import {Alert,Button,Container,Collapse, Link, Breadcrumbs,TextField,Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const { addCompany, addOperatingTime } = require('../../modules/endpoint');

document.title = "Create Your Company";

export default function RegisterCreateCompany() {
    const [companyName, setCompanyName] = useState("");
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    
    const createCompany = () => {
        (async () => {
            //do error checking, and if no errors create company in db
            if (companyName === "" && companyName.length < 3) {
                setMessage("Company Name should contain 3 or more Letters");
                setOpen(true);
            }else if(companyName.substring(0, 3).includes(' ')){
                setMessage("Cannot have spaces at the start of Company Name");
                setOpen(true);
            } else{
                var company_id = await addCompany(companyName);
                sessionStorage.setItem('company_id', company_id);

                window.location.href = "/register/createadmin";
                setOpen(false);
                return;
            }
        })()
    }

    if (sessionStorage.getItem('emp_id') != null) {
        alert("your company is already registered")
        window.location.href = "/mainhub";
    } else {
        return (
            <>
                <Navbar/>

                <Container>
                    <div>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Landing Page
                            </Link>
                            <Typography color="text.primary">
                                Create Company
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={"form-signin w-250 m-auto text-center"}>
                        <h1 className="h3 mb-3 fw-normal">Please enter your company name:</h1>
                        <Collapse in={open}>
                            <Alert severity="error" action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                                   sx={{ mb: 2 }}
                            >
                                {message}
                            </Alert>
                        </Collapse>
                        <div >
                            <TextField type={"text"} name={"companyName"} label="Company Name"
                                   onChange={(event) => {
                                setCompanyName(event.target.value);
                            }} required/>
                        </div>
                            <br/><br/>
                        <Button size='large' variant='contained' onClick={createCompany}>Next Step</Button>
                    </div>
                </Container>
            </>
        );
    }
}