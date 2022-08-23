const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

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
                        else{res.send([result, emp_id]);}
                });
            }
    });
});

app.post("/addRegularAvailability", (req, res) => {
    const emp_id = req.body.emp_id;
    const day_name = req.body.day_name;
    const reg_start = req.body.reg_start;
    const reg_end = req.body.reg_end;

    db.query("INSERT INTO RegularAvailability (day_name, reg_start, reg_end, emp_id) \n\
        VALUES (?, ?, ?, ?)",
        [day_name, reg_start, reg_end, emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.post("/addAvailability", (req, res) => {
    const avail_date = req.body.avail_date;
    const avail_start = req.body.avail_start;
    const avail_end = req.body.avail_end;
    const avail_type = req.body.avail_type;
    const emp_id = req.body.emp_id;

    db.query("INSERT INTO Availability (avail_date, avail_start, avail_end, avail_type, emp_id) \n\
        VALUES (?, ?, ?, ?, ?)",
        [avail_date, avail_start, avail_end, avail_type, emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.post("/addRoster", (req, res) => {
    const rost_date = req.body.rost_date;
    const rost_start = req.body.rost_start;
    const rost_end = req.body.rost_end;
    const rost_week_start = req.body.rost_week_start;
    const emp_id = req.body.emp_id;

    db.query("INSERT INTO Roster (rost_date, rost_start, rost_end, rost_week_start, emp_id) \n\
        VALUES (?, ?, ?, ?, ?)",
        [rost_date, rost_start, rost_end, rost_week_start, emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.post("/addCompanyEvent", (req, res) => {
    const event_date = req.body.event_date;
    const event_start = req.body.event_start;
    const event_end = req.body.event_end;
    const event_name = req.body.event_name;
    const company_id = req.body.company_id;

    db.query("INSERT INTO CompanyEvent (event_date, event_start, event_end, event_name, company_id) \n\
        VALUES (?, ?, ?, ?, ?)",
        [event_date, event_start, event_end, event_name, company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getCompanyEvents/:company_id", (req, res) => {
    const company_id = req.params.company_id;

    db.query("SELECT * FROM CompanyEvent WHERE company_id = ?",
        [company_id],
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

    db.query("SELECT emp_id, emp_password, emp_fName, emp_lName, emp_privilege, company_id FROM Employee WHERE (emp_id = ? OR emp_email = ?) AND emp_password = ?",
        [emp_id, emp_id, emp_password],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});


app.get("/getEmployeesList/:company_id", (req, res) => {
    const company_id = req.params.company_id;

    db.query("SELECT emp_id, emp_fName, emp_lName, emp_type FROM Employee WHERE (company_id = ?) ORDER BY CAST(SUBSTR(emp_id, 4, LENGTH(emp_id)) AS UNSIGNED)",
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

app.get("/getEmployeeName/:emp_id", (req, res) => {
    const emp_id = req.params.emp_id;

    db.query("SELECT emp_fName, emp_lName FROM Employee WHERE emp_id = ?",
        [emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getEmployeeRoster/:emp_id", (req, res) => {
    const emp_id = req.params.emp_id;

    db.query("SELECT * FROM Roster WHERE (emp_id = ?)",
        [emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getAvailability/:emp_id&:avail_date", (req, res) => {
    const emp_id = req.params.emp_id;
    const avail_date = req.params.avail_date;

    db.query("SELECT * FROM Availability WHERE (emp_id = ? AND avail_date = ?)",
        [emp_id, avail_date],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getAvailabilities/:emp_id", (req, res) => {
    const emp_id = req.params.emp_id;

    db.query("SELECT * FROM Availability WHERE emp_id = ?",
        [emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getRegularAvailability/:emp_id&:day_name", (req, res) => {
    const emp_id = req.params.emp_id;
    const day_name = req.params.day_name;

    db.query("SELECT * FROM RegularAvailability WHERE (emp_id = ? AND day_name = ?)",
        [emp_id, day_name],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getRoster/:emp_id&:week_start", (req, res) => {
    const emp_id = req.params.emp_id;
    const rost_week_start = req.params.week_start;

    db.query("SELECT * FROM Roster WHERE (emp_id = ? AND rost_week_start = ?) ORDER BY rost_date ASC",
        [emp_id, rost_week_start],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.put("/updateRoster", (req, res) => {
    const emp_id = req.body.emp_id;
    const rost_date = req.body.rost_date;
    const rost_start = req.body.rost_start;
    const rost_end = req.body.rost_end;

    db.query("UPDATE Roster SET rost_start = ?, rost_end = ? WHERE emp_id = ? AND rost_date = ?",
        [rost_start, rost_end, emp_id, rost_date],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getCompanyRoster/:company_id&:week_start", (req, res) => {
    const company_id = req.params.company_id;
    const rost_week_start = req.params.week_start;

    db.query("SELECT Roster.rost_date, Roster.rost_start, Roster.rost_end, Roster.rost_week_start, Roster.emp_id FROM Roster \n\
        LEFT OUTER JOIN Employee ON Roster.emp_id = Employee.emp_id WHERE Employee.company_id = ? AND Roster.rost_week_start = ? \n\
        ORDER BY CAST(SUBSTR(Roster.emp_id, 4, LENGTH(Roster.emp_id)) AS UNSIGNED) ASC, rost_date ASC",
        [company_id, rost_week_start],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getRosteredEmployees/:company_id&:week_start", (req, res) => {
    const company_id = req.params.company_id;
    const rost_week_start = req.params.week_start;

    db.query("SELECT DISTINCT Roster.emp_id, Employee.emp_fName, Employee.emp_lName FROM Roster \n\
        LEFT OUTER JOIN Employee ON Roster.emp_id = Employee.emp_id \n\
        WHERE Employee.company_id = ? AND Roster.rost_week_start = ? \n\
        ORDER BY CAST(SUBSTR(Roster.emp_id, 4, LENGTH(Roster.emp_id)) AS UNSIGNED)",
        [company_id, rost_week_start],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getUnrosteredEmployees/:company_id&:week_start", (req, res) => {
    const company_id = req.params.company_id;
    const rost_week_start = req.params.week_start;

    db.query("SELECT * FROM Employee WHERE emp_id NOT IN \n\
	            (SELECT Roster.emp_id FROM Roster \n\
	            LEFT OUTER JOIN Employee ON Roster.emp_id = Employee.emp_id \n\
                WHERE Employee.company_id = ? AND Roster.rost_week_start = ?) \n\
            AND company_id = ? \n\
            ORDER BY CAST(SUBSTR(emp_id, 4, LENGTH(emp_id)) AS UNSIGNED)",
        [company_id, rost_week_start, company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getEarliestRoster/:emp_id&:week_start", (req, res) => {
    const emp_id = req.params.emp_id;
    const rost_week_start = req.params.week_start;

    db.query("SELECT * FROM Roster WHERE (rost_start OR rost_end) IS NOT NULL AND (emp_id = ? AND rost_week_start = ?) ORDER BY rost_start LIMIT 1",
        [emp_id, rost_week_start],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getLatestRoster/:emp_id&:week_start", (req, res) => {
    const emp_id = req.params.emp_id;
    const rost_week_start = req.params.week_start;

    db.query("SELECT * FROM Roster WHERE (rost_start OR rost_end) IS NOT NULL AND (emp_id = ? AND rost_week_start = ?) ORDER BY rost_end DESC LIMIT 1",
        [emp_id, rost_week_start],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.delete("/removeRosterDate/:emp_id&:rost_date", (req, res) => {
    const emp_id = req.params.emp_id;
    const rost_date = req.params.rost_date;

    db.query("DELETE FROM Roster WHERE (emp_id = ? AND rost_date = ?)",
        [emp_id, rost_date],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getNotifications/:req_privilege&:company_id", (req, res) => {
    const req_privilege = req.params.req_privilege;
    const company_id = req.params.company_id;

    db.query("SELECT * FROM LeaveRequest WHERE req_privilege = ? AND company_id = ?",
        [req_privilege, company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
        });
});

app.post("/addNotification", (req, res) => {
    const req_date = req.body.req_date;
    const req_start = req.body.req_start;
    const req_end = req.body.req_end;
    const emp_id = req.body.emp_id;
    const company_id = req.body.company_id;
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const req_desc = req.body.req_desc;
    const req_privilege = req.body.req_privilege;

    db.query("INSERT INTO LeaveRequest (req_date, req_start, req_end, emp_id, company_id, emp_fName, emp_lName, req_desc, req_privilege) \n\
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [req_date, req_start,req_end, emp_id, company_id, emp_fName, emp_lName, req_desc, req_privilege],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
        });
});

app.delete("/removeNotification/:req_id", (req, res) => {
    const req_id = req.params.req_id;

    db.query("DELETE FROM LeaveRequest WHERE req_id = ?",
        [req_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
        });
});

app.delete("/removeRosterWeek/:emp_id&:week_start", (req, res) => {
    const emp_id = req.params.emp_id;
    const rost_week_start = req.params.week_start;

    db.query("DELETE FROM Roster WHERE (emp_id = ? AND rost_week_start = ?)",
        [emp_id, rost_week_start],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

