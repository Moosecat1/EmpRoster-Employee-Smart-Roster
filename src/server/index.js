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
    const emp_password_changed = req.body.emp_password_changed;
    const company_id = req.body.company_id;

    var emp_id = company_id;

    db.query("SELECT MAX(CAST(SUBSTR(emp_id, ?) AS UNSIGNED)) AS id FROM Employee WHERE emp_id LIKE ?",
        [company_id.length + 1, company_id + "%"],
        (err, result) => {
            if(err){console.log(err);}
            else
            {
                emp_id += (result[0].id + 1);

                db.query("INSERT INTO Employee (emp_id, emp_fName, emp_lName, emp_password, emp_email, emp_phNum, emp_type, emp_privilege, emp_password_changed, company_id) \n\
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [emp_id, emp_fName, emp_lName, emp_password, emp_email, emp_phNum, emp_type, emp_privilege, emp_password_changed, company_id],
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

    db.query("SELECT * FROM CompanyEvent WHERE company_id = ? AND event_date >= CURRENT_DATE() ORDER BY event_date",
        [company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.delete("/removeCompanyEvent/:event_id", (req, res) => {
    const event_id = req.params.event_id;

    db.query("DELETE FROM CompanyEvent WHERE event_id = ?",
        [event_id],
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

    db.query("SELECT emp_id, emp_password, emp_fName, emp_lName, emp_privilege, emp_password_changed, company_id FROM Employee WHERE (emp_id = ? OR emp_email = ?) AND emp_password = ?",
        [emp_id, emp_id, emp_password],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getContact/:emp_id", (req, res) => {
    const emp_id = req.params.emp_id;

    db.query("SELECT emp_phNum, emp_email FROM Employee WHERE (emp_id = ?)",
        [emp_id],
        (err, result) => {
        if(err){console.log(err);}
        else{res.send(result);}
        });
});

app.get("/getEmployeesList/:company_id", (req, res) => {
    const company_id = req.params.company_id;

    db.query("SELECT emp_id, emp_fName, emp_lName, emp_email, emp_type, emp_privilege FROM Employee WHERE (company_id = ?) ORDER BY CAST(SUBSTR(emp_id, 4, LENGTH(emp_id)) AS UNSIGNED)",
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

app.get("/getRosteredRegularAvailabilities", (req, res) => {
    const emp_ids_string = req.query.emp_ids;

    const emp_ids = emp_ids_string.split(',');

    db.query("SELECT * FROM RegularAvailability \n\
        WHERE emp_id IN (?) \n\
        ORDER BY FIELD(day_name, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')",
        [emp_ids],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getRosteredAvailabilities", (req, res) => {
    const emp_ids_string = req.query.emp_ids;

    let week_start;

    if(req.query.week_start !== undefined && req.query.week_start.length === 10){
        let weekStartDate = new Date(parseInt(req.query.week_start.substring(0, 4)), parseInt(req.query.week_start.substring(5, 7)) - 1, parseInt(req.query.week_start.substring(8, 10)) + 1);
        weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay() + 1);

        week_start = weekStartDate.toISOString().substring(0, 10);
    } else{
        let nullDate = new Date();
        nullDate.setDate(nullDate.getDate() - nullDate.getDay());
        week_start = nullDate.toISOString().substring(0, 10);
    }

    let week_end_date = new Date(parseInt(week_start.substring(0, 4)), parseInt(week_start.substring(5, 7)) - 1, parseInt(week_start.substring(8, 10)) + 1);
    week_end_date.setDate(week_end_date.getDate() + (7 - week_end_date.getDay()) + 1);

    const emp_ids = emp_ids_string.split(',');

    db.query("SELECT * FROM Availability \n\
        WHERE emp_id IN (?) AND avail_date >= ? AND avail_date <= ?",
        [emp_ids, week_start, week_end_date.toISOString().substring(0, 10)],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getCompanyEventsByWeek/:company_id", (req, res) => {
    const company_id = req.params.company_id;

    let week_start;

    if(req.query.week_start !== undefined && req.query.week_start.length === 10){
        let weekStartDate = new Date(parseInt(req.query.week_start.substring(0, 4)), parseInt(req.query.week_start.substring(5, 7)) - 1, parseInt(req.query.week_start.substring(8, 10)) + 1);
        weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay() + 1);

        week_start = weekStartDate.toISOString().substring(0, 10);
    } else{
        let nullDate = new Date();
        nullDate.setDate(nullDate.getDate() - nullDate.getDay());
        week_start = nullDate.toISOString().substring(0, 10);
    }

    let week_end_date = new Date(parseInt(week_start.substring(0, 4)), parseInt(week_start.substring(5, 7)) - 1, parseInt(week_start.substring(8, 10)) + 1);
    week_end_date.setDate(week_end_date.getDate() + (7 - week_end_date.getDay()) + 1);

    db.query("SELECT * FROM CompanyEvent \n\
        WHERE company_id = ? AND event_date >= ? AND event_date <= ?",
        [company_id, week_start, week_end_date.toISOString().substring(0, 10)],
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

app.get("/getRegularAvailabilities/:emp_id", (req, res) => {
    const emp_id = req.params.emp_id;

    db.query("SELECT * FROM RegularAvailability WHERE emp_id = ? \n\
        ORDER BY FIELD(day_name, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')",
        [emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.get("/getCompanyName/:company_id", (req, res) => {
    const company_id = req.params.company_id;

    db.query("SELECT company_name FROM Company WHERE company_id = ?",
        [company_id],
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

app.get("/getNotifications/:noti_privilege&:company_id", (req, res) => {
    const noti_privilege = req.params.noti_privilege;
    const company_id = req.params.company_id;

    db.query("SELECT * FROM Notifications WHERE noti_privilege = ? AND company_id = ?",
        [noti_privilege, company_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
        });
});

app.post("/addNotification", (req, res) => {
    const noti_date = req.body.noti_date;
    const noti_start = req.body.noti_start;
    const noti_end = req.body.noti_end;
    const emp_id = req.body.emp_id;
    const company_id = req.body.company_id;
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const noti_desc = req.body.noti_desc;
    const noti_privilege = req.body.noti_privilege;
    const noti_type = req.body.noti_type;

    db.query("INSERT INTO Notifications (noti_date, noti_start, noti_end, emp_id, company_id, emp_fName, emp_lName, noti_desc, noti_privilege, noti_type) \n\
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [noti_date, noti_start, noti_end, emp_id, company_id, emp_fName, emp_lName, noti_desc, noti_privilege, noti_type],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
        });
});

app.delete("/removeNotification/:noti_id", (req, res) => {
    const noti_id = req.params.noti_id;

    db.query("DELETE FROM Notifications WHERE noti_id = ?",
        [noti_id],
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

app.put("/updateEmployee", (req, res) => {
    const emp_id = req.body.emp_id;
    const emp_fName = req.body.emp_fName;
    const emp_lName = req.body.emp_lName;
    const emp_email = req.body.emp_email;
    const emp_type = req.body.emp_type;
    const emp_privilege = req.body.emp_privilege;

    db.query("UPDATE Employee SET emp_fName = ?, emp_lName = ?, emp_email = ?, emp_type = ?, emp_privilege = ? \n\
        WHERE emp_id = ?",
        [emp_fName, emp_lName, emp_email, emp_type, emp_privilege, emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.put("/updatePassword", (req, res) => {
    const emp_id = req.body.emp_id;
    const emp_password = req.body.emp_password;
    const emp_password_changed = req.body.emp_password_changed === undefined || req.body.emp_password_changed === null ? true : req.body.emp_password_changed;

    db.query("UPDATE Employee SET emp_password = ?, emp_password_changed = ? WHERE emp_id = ?",
        [emp_password, emp_password_changed, emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.put("/updateEmail", (req, res) => {
    const emp_id = req.body.emp_id;
    const emp_email = req.body.emp_email;

    db.query("UPDATE Employee SET emp_email = ? WHERE emp_id = ?",
        [emp_email, emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
        });
});

app.put("/updatePhone", (req, res) => {
    const emp_id = req.body.emp_id;
    const emp_phNum = req.body.emp_phNum;

    db.query("UPDATE Employee SET emp_phNum = ? WHERE emp_id = ?",
        [emp_phNum, emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
        });
});

app.put("/updateRegularAvailability", (req, res) => {
    const emp_id = req.body.emp_id;
    const day_name = req.body.day_name;
    const reg_start = req.body.reg_start;
    const reg_end = req.body.reg_end;

    db.query("UPDATE RegularAvailability SET reg_start = ?, reg_end = ? \n\
        WHERE emp_id = ? AND day_name = ?",
        [reg_start, reg_end, emp_id, day_name],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});

app.delete("/removeEmployee/:emp_id", (req, res) => {
    const emp_id = req.params.emp_id;

    db.query("DELETE FROM Employee WHERE emp_id = ?",
        [emp_id],
        (err, result) => {
            if(err){console.log(err);}
            else{res.send(result);}
    });
});