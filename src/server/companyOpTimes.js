const axios = require('axios');


axios.post("http://localhost:3001/addCompany", {

    company_name: "hello"
}).then((res) => {
    company_id = res.data[1];
}).catch((err) => {
    console.log(err);
});