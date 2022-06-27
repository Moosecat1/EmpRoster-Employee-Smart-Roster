const axios = require('axios');

axios.post("http://localhost:3000/addCompany", {
    company_name: "Gaming Central"
}).catch((err) => {
    console.log(err);
});