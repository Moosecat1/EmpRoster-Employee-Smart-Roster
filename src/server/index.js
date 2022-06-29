import express, { json } from "express";
import cors from "cors";
import {createConnection} from "mysql";
import {randomUUID} from 'crypto';

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const randomMod = require('../modules/random');
const random = randomMod.random;
const randomChar = randomMod.randomChar;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool(
    {
        host: "localhost",
        user: "root",
        password: "smartroster",
        database: "SMARTROSTER"
    }
);

const portNum = 3000;

app.listen(portNum, () =>{
    console.log("Server running on port " + portNum + ".");
});

function genId()
{
    var company_id = "";

    while(company_id.length < 8)
    {
        if(company_id.length < 4)
        {
            const randChar = randomChar();
            company_id += randChar;
        }
        else 
        {
            const rand = random(0, 10);
            company_id += rand;
        }
    }

    return company_id;
}

app.post("/addCompany", (req, res) => {
    const company_id = genId();
    const company_name = req.body.company_name;

    db.query("INSERT INTO Company (company_id, company_name) VALUES (?, ?)",
        [company_id, company_name],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.post("/addEmployee", (req, res) => {
    const emp_id = genId();
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const emp_email = req.body.emp_email;
    const emp_phNum = req.body.emp_phNum;
    const emp_type = req.body.emp_type;
    const emp_privilege = req.body.emp_privilege;
    const company_id = req.body.company_id;

    db.query("INSERT INTO Employee (emp_id, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id) \n\
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [emp_id, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/verifyEmployee/:emp_id", (req, res) => {
    const emp_id = req.params.emp_id;

    db.query("SELECT emp_id FROM Employee WHERE emp_id = ?",
        [emp_id],
        (err, result) => {
            if(err){console.log("Employee Does Not Exist.");}
            else{res.send("Employee Exists.");}
    });
});