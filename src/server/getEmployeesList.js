const axios = require('axios');

axios.get("http://localhost:2420/getEmployeesList/" + 1).then((response) => {
    console.log(response.data);
});