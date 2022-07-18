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

    return {empExists: empExists, response: res};
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

const addAdmin = async (emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, company_id) => {
    const hash = sha256(emp_password);

    await axios.post("http://localhost:2420/addAdmin", {
        emp_password: hash.toString(),
        emp_fName: emp_fName,
        emp_lName: emp_lName,
        emp_email: emp_email,
        emp_phNum: emp_phNum,
        emp_type: emp_type,
        emp_privilege: "Admin",
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

//export the functions so they can be used program-wide
module.exports.verifyEmployee = verifyEmployee;
module.exports.addEmployee = addEmployee;
module.exports.addAdmin = addAdmin;
module.exports.addCompany = addCompany;