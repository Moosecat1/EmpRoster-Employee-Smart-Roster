const axios = require('axios');

axios.get("http://localhost:2420/getEmployees").then((response) => {
    console.log(response);
});