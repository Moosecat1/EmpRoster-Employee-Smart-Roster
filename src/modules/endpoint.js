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
    let emplName;
    let empPrivilege;
    let empPasswordChanged;
    let companyId;

    //get values from response to send to frontend
    if(empExists)
    {
        empId = res.data[0].emp_id;
        empfName = res.data[0].emp_fName;
        emplName = res.data[0].emp_lName;
        empPrivilege = res.data[0].emp_privilege;
        empPasswordChanged = res.data[0].emp_password_changed;
        companyId = res.data[0].company_id;
    }

    return {empExists: empExists, empId: empId, empfName: empfName, emplName: emplName, empPrivilege: empPrivilege, empPasswordChanged: empPasswordChanged, companyId: companyId};
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

const updatePassword = async (emp_id, emp_password, emp_password_changed) => {
    const hash = sha256(emp_password);

    await axios.put("http://localhost:2420/updatePassword", {
        emp_id: emp_id,
        emp_password: hash.toString(),
        emp_password_change: true
    }).catch((err) => {
        console.log(err);
    });
}

const updateEmail = async (emp_id, emp_email) => {
    await axios.put("http://localhost:2420/updateEmail", {
        emp_id: emp_id,
        emp_email: emp_email
    }).catch((err) => {
        console.log(err);
    });
}

const updatePhone = async (emp_id, emp_phNum) => {
    await axios.put("http://localhost:2420/updatePhone", {
        emp_id: emp_id,
        emp_phNum: emp_phNum
    }).catch((err) => {
        console.log(err);
    });
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

const updateRegularAvailability = async (day_name, reg_start, reg_end, emp_id) => {
    await axios.put("http://localhost:2420/updateRegularAvailability", {
        day_name: day_name,
        reg_start: reg_start,
        reg_end: reg_end,
        emp_id: emp_id
    }).catch((err) => {
        console.log(err);
    });
}


const addNullRegularAvailabilities = async (emp_id) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for(let i = 0; i < 7; i++){
        await addRegularAvailability(days[i], null, null, emp_id);
    }
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

const addWeeklyRoster = async (rost_week_start, emp_id) => {
    let weekStart = new Date(rost_week_start.substring(0, 4), rost_week_start.substring(5, 7) - 1, rost_week_start.substring(8, 10));
    let dayLooper = new Date();
    dayLooper.setDate(weekStart.getDate() - (weekStart.getDay()));

    for(let i = 0; i < 7; i++){
        const dateString = dayLooper.toISOString().substring(0, 10);
        await addRoster(dateString, null, null, rost_week_start, emp_id);
        dayLooper.setDate(dayLooper.getDate() + 1);
    }
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

const getLatestRoster = async (emp_id, week_start) => {
    
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

const removeRosterDate = async (emp_id, rost_date) => {
    await axios.delete("http://localhost:2420/removeRosterDate/" + emp_id + "&" + rost_date).catch((err) => {
        console.log(err);
    });
}

const getNotifications = async (noti_privilege, company_id) => {
    var res;

    await axios.get("http://localhost:2420/getNotifications/" + noti_privilege + "&" + company_id).then((response) => {
        res = response;

    }).catch((err) => {
        console.log(err);
    });

    return {notifications: res.data};
}

const addNotification = async (noti_date, noti_start, noti_end, emp_id, company_id, emp_fName, emp_lName, noti_desc, noti_privilege, noti_type) => {
    await axios.post("http://localhost:2420/addNotification", {
        noti_date: noti_date,
        noti_start: noti_start,
        noti_end: noti_end,
        emp_id: emp_id,
        company_id: company_id,
        emp_fName: emp_fName,
        emp_lName: emp_lName,
        noti_desc: noti_desc,
        noti_privilege: noti_privilege,
        noti_type: noti_type
    }).catch((err) => {
        console.log(err);
    });
}

const removeNotification = async (noti_id) => {
    await axios.delete("http://localhost:2420/removeNotification/" + noti_id).catch((err) => {
        console.log(err);
    });
}

const getEmployeeName = async (emp_id) => {
    var res;
    await axios.get("http://localhost:2420/getEmployeeName/" + emp_id).then((response) => {
        res = response;
    }).catch((err) => {
        console.log(err);
    });
    return {emp_fName: res.data.emp_fName, emp_lName: res.data.emp_lName};
}

//export the functions so they can be used program-wide
module.exports.verifyEmployee = verifyEmployee;
module.exports.updatePassword = updatePassword;
module.exports.updateEmail = updateEmail;
module.exports.updatePhone = updatePhone;
module.exports.addEmployee = addEmployee;
module.exports.addCompany = addCompany;
module.exports.addCompanyEvent = addCompanyEvent;
module.exports.addRegularAvailability = addRegularAvailability;
module.exports.updateRegularAvailability = updateRegularAvailability;
module.exports.addNullRegularAvailabilities = addNullRegularAvailabilities;
module.exports.getRegularAvailability = getRegularAvailability;
module.exports.addAvailability = addAvailability;
module.exports.getAvailability = getAvailability;
module.exports.addWeeklyRoster = addWeeklyRoster;
module.exports.getAvailabilities = getAvailabilities;
module.exports.getCompanyEvents = getCompanyEvents;
module.exports.createRoster = createRoster;
module.exports.getRoster = getRoster;
module.exports.removeRosterDate = removeRosterDate;
module.exports.getNotifications = getNotifications;
module.exports.addNotification = addNotification;
module.exports.removeNotification = removeNotification;
module.exports.getEmployeeName = getEmployeeName;