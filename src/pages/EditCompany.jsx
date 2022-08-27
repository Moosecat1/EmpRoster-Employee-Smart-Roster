import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import EditableCompany from '../components/EditableCompany';

export default function EditCompany(){
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        //get newly created company's info (company name, id, employee info)
        async function initialiseCompanyData(){
            const res = await axios.get("http://localhost:2420/getCompanyName/" + sessionStorage.getItem('company_id')).catch((err) => {console.log(err);});

            const companyName = res.data[0].company_name;
            setCompanyName(companyName);
        }

        initialiseCompanyData();
    }, []);

    return(
        <>
            <Navbar/>
            <h1>Company Name: {companyName}</h1>
            <h1 style={{fontSize: '30px'}}>Company ID: {sessionStorage.getItem('company_id')}</h1>
            <br />
            <EditableCompany/>
        </>
    )
}