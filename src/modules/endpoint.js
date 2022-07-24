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

    //get values from response to send to frontend
    const empId = res.data[0].emp_id;
    const empfName = res.data[0].emp_fName;
    const empPrivilege = res.data[0].emp_privilege;
    const companyId = res.data[0].company_id;

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

    const availStart = res.data[0].avail_start;
    const availEnd = res.data[0].avail_end;
    const availType = res.data[0].avail_type;

    return{hasAvailability: hasAvailability, availStart: availStart, availEnd: availEnd, availType: availType};
}

const createRoster = async (emp_id, week_start) => {
    var dayLooper = week_start;

    //look at week start, cycle through regular availabilities. if conflict between regular and availabilities table, do the availabilities
    for(let i = 0; i < 7; i++)
    {
        const sqlDate = dayLooper.toISOString().split('T')[0].replace(/-/g, '/');
        const res = await getAvailability(emp_id, sqlDate);

        if(res.hasAvailability)
        {
            //compare to current regular availability. if difference, add availability to roster table.
        }
        else
        {
            //add regular availability to roster table
        }

        dayLooper.setDate(dayLooper.getDate() + 1);
    }
}

//export the functions so they can be used program-wide
module.exports.verifyEmployee = verifyEmployee;
module.exports.addEmployee = addEmployee;
module.exports.addCompany = addCompany;
module.exports.addRegularAvailability = addRegularAvailability;
module.exports.addAvailability = addAvailability;