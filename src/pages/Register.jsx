import React, {useState} from "react";
import Navbar from "../components/navbar";
import Form from "react-bootstrap/Form";

const { addEmployee } = require('../modules/endpoint');

document.title = "Register Your Company";

export default function Register(){
    return(
        <register>
            <Navbar/>
            <div className={"form-signin w-100 m-auto text-center"}>
                <Form>
                    <h1 className="h3 mb-3 fw-normal">Please enter your company name:</h1>
                </Form>
            </div>
        </register>
    );
}