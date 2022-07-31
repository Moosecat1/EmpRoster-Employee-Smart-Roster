//import axios
const axios = require('axios');
const sha256 = require('crypto-js/sha256');

//make a function that can be called from anywhere (with the correct imports) which allows for checking if a employee exists
const verifyEmployee = async (emp_id, emp_password) => {
    //hash the supplied password to store in db
    const hash = sha256(emp_password);

    var empExists = false;
    var res;

    //run a get request, which uses the parameters in the link as opposed to in the body in post requests
    await axios.get("http://localhost:2420/verifyEmployee/" + emp_id + "&" + hash.toString()).then((response) => {
        const dataLength = response.data.length;
        res = response;

        //if there was data returned, the user exists.
        if(dataLength !== 0)
        {
            empExists = true;
        }
    }).catch((err) => {
        console.log(err);
    });

    let empId;
    let empfName;
    let empPrivilege;
    let companyId;

    //get values from response to send to frontend
    if(empExists)
    {
        empId = res.data[0].emp_id;
        empfName = res.data[0].emp_fName;
        empPrivilege = res.data[0].emp_privilege;
        companyId = res.data[0].company_id;
    }

    return {empExists: empExists, empId: empId, empfName: empfName, empPrivilege: empPrivilege, companyId: companyId};
}

const addEmployee = async (emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id) => {
    const hash = sha256(emp_password);
    var emp_id;
    
    await axios.post("http://localhost:2420/addEmployee", {
        emp_password: hash.toString(),
        emp_fName: emp_fName,
        emp_lName: emp_lName,
        emp_email: emp_email,
        emp_phNum: emp_phNum,
        emp_type: emp_type,
        emp_privilege: emp_privilege,
        company_id: company_id
    }).then((res) => {
        emp_id = res.data[1];
    }).catch((err) => {
        console.log(err);
    });

    return emp_id;
}

const addCompany = async (company_name) => {
    var company_id;

    await axios.post("http://localhost:2420/addCompany", {
        company_name: company_name
    }).then((res) => {
        company_id = res.data[1];
    }).catch((err) => {
        console.log(err);
    });

    return company_id;
}

const addRegularAvailability = async (day_name, reg_start, reg_end, emp_id) => {
    await axios.post("http://localhost:2420/addRegularAvailability", {
        day_name: day_name,
        reg_start: reg_start,
        reg_end: reg_end,
        emp_id: emp_id
    }).catch((err) => {
        console.log(err);
    });
}

const getRegularAvailability = async (emp_id, day_name) => {
    var res;
    var hasRegularAvailability= false;

    await axios.get("http://localhost:2420/getRegularAvailability/" + emp_id + "&" + day_name).then((response) => {
        var dataLength = response.data.length;
        res = response;

        if(dataLength !== 0)
        {
            hasRegularAvailability = true;
        }
    }).catch((err) => {
        console.log(err);
    });

    let regStart;
    let regEnd;

    if(hasRegularAvailability)
    {
        regStart = res.data[0].reg_start;
        regEnd = res.data[0].reg_end;
    }

    return {hasRegularAvailability: hasRegularAvailability, regStart: regStart, regEnd: regEnd};
}

const addAvailability = async (avail_date, avail_start, avail_end, avail_type, emp_id) => {
    await axios.post("http://localhost:2420/addAvailability", {
        avail_date: avail_date,
        avail_start: avail_start,
        avail_end: avail_end,
        avail_type: avail_type,
        emp_id: emp_id
    }).catch((err) => {
        console.log(err);
    });
}

const getAvailability = async (emp_id, avail_date) => {
    var res;
    var hasAvailability = false;

    await axios.get("http://localhost:2420/getAvailability/" + emp_id + "&" + avail_date).then((response) => {
        var dataLength = response.data.length;
        res = response;

        if(dataLength !== 0)
        {
            hasAvailability = true;
        }
    }).catch((err) => {
        console.log(err);
    });

    let availStart;
    let availEnd;
    let availType;

    if(hasAvailability)
    {
        availStart = res.data[0].avail_start;
        availEnd = res.data[0].avail_end;
        availType = res.data[0].avail_type;
    }

    return {hasAvailability: hasAvailability, availStart: availStart, availEnd: availEnd, availType: availType};
}

const getAvailabilities = async (emp_id) => {
    var res;
    var hasAvailabilities = false;

    await axios.get("http://localhost:2420/getAvailabilities/" + emp_id).then((response) => {
        var dataLength = response.data.length;
        res = response;

        if(dataLength !== 0)
        {
            hasAvailabilities = true;
        }
    }).catch((err) => {
        console.log(err);
    });

    return {hasAvailabilities: hasAvailabilities, availabilities: res.data};
}

const getCompanyEvents = async (company_id) => {
    var res;
    var hasEvents = false;

    await axios.get("http://localhost:2420/getCompanyEvents/" + company_id).then((response) => {
        var dataLength = response.data.length;
        res = response;

        if(dataLength !== 0)
        {
            hasEvents = true;
        }
    }).catch((err) => {
        console.log(err);
    });

    return {hasEvents: hasEvents, events: res.data};
}

const addRoster = async (rost_date, rost_start, rost_end, rost_week_start, emp_id) => {
    await axios.post("http://localhost:2420/addRoster", {
        rost_date: rost_date,
        rost_start: rost_start,
        rost_end: rost_end,
        rost_week_start: rost_week_start,
        emp_id: emp_id
    }).catch((err) => {
        console.log(err);
    });
}

const addCompanyEvent = async (event_date, event_start, event_end, event_name, company_id) => {
    await axios.post("http://localhost:2420/addCompanyEvent", {
        event_date: event_date,
        event_start: event_start,
        event_end: event_end,
        event_name: event_name,
        company_id: company_id
    }).catch((err) => {
        console.log(err);
    });
}

const getRoster = async (emp_id, week_start) => {
    var res;
    var hasRoster;
    const week_start_sql = week_start.toISOString().split('T')[0].replace(/-/g, '/');

    await axios.get("http://localhost:2420/getRoster/" + emp_id, {week_start: week_start_sql}).then((response) => {
        var dataLength = response.data.length;
        res = response;

        if(dataLength !== 0)
        {
            hasRoster = true;
        }
    }).catch((err) => {
        console.log(err);
    });

    let rostDate;
    let rostStart;
    let rostEnd;

    if(hasRoster)
    {
        rostDate = res.data[0].rost_date;
        rostStart = res.data[0].rost_start;
        rostEnd = res.data[0].rost_end;
    }

    return {hasRoster: hasRoster, rostDate: rostDate, rostStart: rostStart, rostEnd: rostEnd};
}

const createRoster = async (emp_id, week_start) => {
    const week_start_sql = week_start.toISOString().split('T')[0].replace(/-/g, '/');

    var dayLooper = week_start;

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //look at week start, cycle through each day and based on their availability and regularavailability create the roster
    for(let i = 0; i < 7; i++)
    {
        const sqlDate = dayLooper.toISOString().split('T')[0];

        //get availability and regular availability for the current date
        const availRes = await getAvailability(emp_id, sqlDate);
        const regAvailRes = await getRegularAvailability(emp_id, dayNames[i]);

        //if the employee has a availability and regularavailability, if the type of the availability is available, add the availability entry to the roster
        if(availRes.hasAvailability && regAvailRes.hasRegularAvailability)
        {
            if(availRes.availType === "Available")
            {
                await addRoster(sqlDate, availRes.availStart, availRes.availEnd, week_start_sql, emp_id)
            }
        }
        //if the employee has an availability and not a regular availability, add the availability entry to the roster
        else if(availRes.hasAvailability && !regAvailRes.hasRegularAvailability)
        {
            if(availRes.availType === "Available")
            {
                await addRoster(sqlDate, availRes.availStart, availRes.availEnd, week_start_sql, emp_id);
            }
        }
        //if the employee doesnt have an availability but a regular availability, add the regular availability to the roster
        else if(!availRes.hasAvailability && regAvailRes.hasRegularAvailability)
        {
            await addRoster(sqlDate, regAvailRes.regStart, regAvailRes.regEnd, week_start_sql, emp_id);
        }

        //+1 to the day
        dayLooper.setDate(dayLooper.getDate() + 1);
    }
}

//export the functions so they can be used program-wide
module.exports.verifyEmployee = verifyEmployee;
module.exports.addEmployee = addEmployee;
module.exports.addCompany = addCompany;
module.exports.addCompanyEvent = addCompanyEvent;
module.exports.addRegularAvailability = addRegularAvailability;
module.exports.addAvailability = addAvailability;
module.exports.getAvailability = getAvailability;
module.exports.getAvailabilities = getAvailabilities;
module.exports.getCompanyEvents = getCompanyEvents;
module.exports.createRoster = createRoster;
module.exports.getRoster = getRoster;