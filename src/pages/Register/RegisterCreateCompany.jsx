import React, { useState } from 'react';
import Navbar from '../../components/navbar';

const { addCompany } = require('../../modules/endpoint');

document.title = "Create Your Company";

export default function RegisterCreateCompany(){
    const [companyName, setCompanyName] = useState("");

    const createCompany = () => {

        (async() => {
            if(companyName !== ""){
                var company_id = await addCompany(companyName);
                sessionStorage.setItem('company_id', company_id);
                window.location.href = "/register/createadmin";
            }
        })()
    }

    return(
        <>
            <Navbar/>
            <div className={"form-signin w-100 m-auto text-center"}>
            <h1 className="h3 mb-3 fw-normal" >Please enter your company name:</h1>
                <div className={"form-floating"}>
                    <input type={"text"} className={"form-control"} name={"companyName"} placeholder={"name1234 or name@example.com"} onChange={(event) => {
                                setCompanyName(event.target.value);
                    }}  required/>
                </div>
                <br /><br />
                <button className="w-100 btn btn-lg btn-primary" onClick={createCompany}>Next</button>
            </div>
        </>
    );
}