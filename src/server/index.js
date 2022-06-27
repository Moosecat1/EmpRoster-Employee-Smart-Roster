const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

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

app.post("/addCompany", (req, res) => {
    const company_name = req.body.company_name;

    db.query("INSERT INTO Company (company_name) VALUES (?)",
        [company_name],
        (err, result) => {
            if(err){console.log(err);}
    });
});

app.post("/addEmployee", (req, res) => {
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const emp_email = req.body.emp_email;
    const emp_phNum = req.body.emp_phNum;
    const emp_type = req.body.emp_type;
    const emp_privilege = req.body.emp_privilege;
    const company_id = req.body.company_id;
});