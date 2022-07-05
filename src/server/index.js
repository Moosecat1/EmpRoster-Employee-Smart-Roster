const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

//get the created random functions using a path
const randomMod = require('../modules/random');
const random = randomMod.random;
const randomChar = randomMod.randomChar;

const app = express();
app.use(cors());
app.use(express.json());

//sets up the parameters for connecting to the db
const db = mysql.createPool(
    {
        host: "localhost",
        user: "root",
        password: "smartroster",
        database: "SMARTROSTER"
    }
);

const portNum = 2420;

//opens server on selected port
app.listen(portNum, () => {
    console.log("Server running on port " + portNum + ".");
});

//uses randomisation to generate an id for a company/employee
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

//endpoint to add a company to the database
app.post("/addCompany", (req, res) => {
    //generate a company id using the function above
    const company_id = genId();
    //get the company_name from the supplied arguments
    const company_name = req.body.company_name;

    //query the db with the string query (ie. the INSERT statement), with values initialised above
    db.query("INSERT INTO Company (company_id, company_name) VALUES (?, ?)",
        [company_id, company_name],
        (err, result) => {
            //if there is an error, log it to the console
            if(err){console.log(err);}
            //else, send the result of the query in the result field, which can be accessed on the frontend
            else{res.send(result);}
    });
});

//add employe endpoint, basically the same as addCompany but obviously with employee fields instead
app.post("/addEmployee", (req, res) => {
    const emp_id = genId();
    const emp_password = req.body.emp_password;
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const emp_email = req.body.emp_email;
    const emp_phNum = req.body.emp_phNum;
    const emp_type = req.body.emp_type;
    const emp_privilege = req.body.emp_privilege;
    const company_id = req.body.company_id;

    db.query("INSERT INTO Employee (emp_id, emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id) \n\
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [emp_id, emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

//verify employee endpoint, which will just get an employee from the db to confirm it exists so it can log in.
//this is just a select statement
app.get("/verifyEmployee/:emp_id&:emp_password", (req, res) => {
    const emp_id = req.params.emp_id;
    const emp_password = req.params.emp_password;

    db.query("SELECT emp_id, emp_password FROM Employee WHERE (emp_id = ? OR emp_email = ?) AND emp_password = ?",
        [emp_id, emp_id, emp_password],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getEmployeesList/:company_id", (req, res) => {
    const company_id = req.params.company_id
    db.query("SELECT emp_fName, emp_lName, emp_type FROM Employee WHERE (company_id = ?)",
        [company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});