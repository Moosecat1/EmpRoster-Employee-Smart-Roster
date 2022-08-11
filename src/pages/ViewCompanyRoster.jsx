import React from "react";
import {Container} from "@mui/material";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import CompanyRoster from "../components/CompanyRoster";

export default function ViewCompanyRoster(){
    return(
        <div className='flex'>
            <Navbar/> <Sidebar/>
            <Container>
                <CompanyRoster/>
            </Container>
        </div>
    )
}