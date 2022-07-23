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
        var dataLength = response.data.length;
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
    
    await axios.post("http://localhost:2420/addEmployee", {
        emp_password: hash.toString(),
        emp_fName: emp_fName,
        emp_lName: emp_lName,
        emp_email: emp_email,
        emp_phNum: emp_phNum,
        emp_type: emp_type,
        emp_privilege: emp_privilege,
        company_id: company_id
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

const addOperatingTime = async (day_name, start_time, end_time, company_id) => {
    await axios.post("http://localhost:2420/addOperatingTime", {
        day_name: day_name,
        start_time: start_time,
        end_time: end_time,
        company_id: company_id
    }).catch((err) => {
        console.log(err);
    });
}

//export the functions so they can be used program-wide
module.exports.verifyEmployee = verifyEmployee;
module.exports.addEmployee = addEmployee;
module.exports.addCompany = addCompany;
module.exports.addOperatingTime = addOperatingTime;