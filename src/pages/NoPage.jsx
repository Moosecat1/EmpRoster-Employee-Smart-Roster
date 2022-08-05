import React from "react";
import Button from "@mui/material/Button"
export default function NoPage() {
    return (
        <main>
            <div id="home-page">
                <h1>Page Not found</h1>
                <br/>
                <div style={{textAlign:"center"}}>{"Hey!! The page you are trying to look at is unavailable at the moment >>__<<"} <br/> <Button href={"/"} variant="contained" >Go Back!</Button></div>
            </div>
        </main>
    )
}