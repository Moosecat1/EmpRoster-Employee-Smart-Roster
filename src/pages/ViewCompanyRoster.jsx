import React from "react";
import {Box,Container} from "@mui/material";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import CompanyRoster from "../components/CompanyRoster";

export default function ViewCompanyRoster(){
    return(
        <div className='flex'>
            <Navbar/>
            <Container>
                <Box display={"flex"}
                     flexDirection={"row"}>

                    <Box>
                        <Sidebar/>
                    </Box>

                    <Box>
                        <CompanyRoster/>
                    </Box>

                </Box>
            </Container>
        </div>
    )
}