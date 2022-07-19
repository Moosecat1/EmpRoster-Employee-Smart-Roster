const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const { random } = require("../modules/random");

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

//endpoint to add a company to the database
app.post("/addCompany", (req, res) => {
    //get the company_name from the supplied arguments
    const company_name = req.body.company_name;

    //remove spaces and then reduce it to its first 4 characters and make it lower case to make company id
    var company_id = (company_name.replace(/ /g, "")).slice(0, 3).toLowerCase();
   
    db.query("SELECT MAX(CAST(SUBSTR(company_id, 4) AS UNSIGNED)) AS id FROM Company WHERE company_id LIKE ?",
        [company_id + "%"],
        (err, result) => {
            if(err){console.log(err);}
            else
            {
                company_id += (result[0].id + 1);

                //query the db with the string query (ie. the INSERT statement), with values initialised above
                db.query("INSERT INTO Company (company_id, company_name) VALUES (?, ?)",
                [company_id, company_name],
                (err, result) => {
                    //if there is an error, log it to the console
                    if(err){console.log(err);}
                    //else, send the result of the query in the result field, which can be accessed on the frontend
                    else{res.send([result, company_id]);}
                });
            }
    });
});

//add employe endpoint, basically the same as addCompany but obviously with employee fields instead
app.post("/addEmployee", (req, res) => {
    const emp_password = req.body.emp_password;
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const emp_email = req.body.emp_email;
    const emp_phNum = req.body.emp_phNum;
    const emp_type = req.body.emp_type;
    const emp_privilege = req.body.emp_privilege;
    const company_id = req.body.company_id;

    var emp_id = company_id;

    db.query("SELECT MAX(CAST(SUBSTR(emp_id, ?) AS UNSIGNED)) AS id FROM Employee WHERE emp_id LIKE ?",
        [company_id.length + 1, company_id + "%"],
        (err, result) => {
            if(err){console.log(err);}
            else
            {
                emp_id += (result[0].id + 1);

                db.query("INSERT INTO Employee (emp_id, emp_fName, emp_lName, emp_password, emp_email, emp_phNum, emp_type, emp_privilege, company_id) \n\
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [emp_id, emp_fName, emp_lName, emp_password, emp_email, emp_phNum, emp_type, emp_privilege, company_id],
                    (err, result) => {
                        if(err){console.log(err);}
                        else{res.send(result);}
                });
            }
    });
});

/*app.post("/addEmployee", (req, res) => {
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const emp_privilege = req.body.emp_privilege;
    const company_id = req.body.company_id;

    var emp_id = company_id;

    db.query("SELECT MAX(CAST(SUBSTR(emp_id, ?) AS UNSIGNED)) AS id FROM Employee WHERE emp_id LIKE ?",
        [company_id.length + 1, company_id + "%"],
        (err, result) => {
            if(err){console.log(err);}
            else
            {
                emp_id += (result[0].id + 1);

                db.query("INSERT INTO Employee (emp_id, emp_fName, emp_lName, emp_privilege, company_id) \n\
                    VALUES (?, ?, ?, ?, ?)",
                    [emp_id, emp_fName, emp_lName, emp_privilege, company_id],
                    (err, result) => {
                        if(err){console.log(err);}
                        else{res.send(result);}
                });
            }
    });
});*/

app.post("/addAdmin", (req, res) => {
    const emp_password = req.body.emp_password;
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const emp_email = req.body.emp_email;
    const emp_phNum = req.body.emp_phNum;
    const emp_type = req.body.emp_type;
    const emp_privilege = req.body.emp_privilege;
    const company_id = req.body.company_id;

    var emp_id = company_id;

    db.query("SELECT MAX(CAST(SUBSTR(emp_id, ?) AS UNSIGNED)) AS id FROM Employee WHERE emp_id LIKE ?",
        [company_id.length + 1, company_id + "%"],
        (err, result) => {
            if(err){console.log(err);}
            else
            {
                emp_id += (result[0].id + 1);

                db.query("INSERT INTO Employee (emp_id, emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id) \n\
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [emp_id, emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id],
                    (err, result) => {
                        if(err){console.log(err);}
                        else{res.send(result);}
                });
            }
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

app.get("/getEmployees", (req, res) => {
    db.query("SELECT * FROM Employee",
        [],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});