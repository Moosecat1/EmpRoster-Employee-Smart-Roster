const axios = require('axios');

axios.post("http://localhost:3000/addCompany", {
    company_name: "Gaming Central"
}).catch((err) => {
    console.log(err);
});

axios.post("http://localhost:3000/addEmployee", {
    emp_fName: "Joe",
    emp_lName: "Damaggio",
    emp_email: "joe.d@gamingcentral.com.au",
    emp_phNum: "0321655432",
    emp_type: "Casual",
    emp_privilege: "Manager",
    company_id: "qlak2279"
}).catch((err) => {
    console.log(err);
});

axios.get("http://localhost:3000/verifyEmployee/xRng1629").then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err);
});
