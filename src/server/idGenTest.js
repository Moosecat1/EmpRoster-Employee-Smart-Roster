const axios = require('axios');

async function genId(company_name)
{
    await axios.post("http://localhost:2420/addCompany", {
        company_name: company_name
    }).catch((err) => {
        console.log(err);
    });
}

const company_name = "Joe Manna";
const company_id = genId(company_name);

//SELECT MAX(CAST(SUBSTR(company_id, 5) AS UNSIGNED)) FROM Company WHERE company_id LIKE 'empr%'; THIS IS THE TICKET RIGHT HERE MAN