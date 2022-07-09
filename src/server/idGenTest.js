const axios = require('axios');

async function genId(company_name, company_id)
{
    await axios.post("http://localhost:2420/addCompany", {
        company_name: company_name
    }).then((res) => {
        axios.post("http://localhost:2420/addEmployee", {
        company_id: company_id
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}

const company_name = "Anime Shakai Ltd."
const company_id = "ani2";
genId(company_name, company_id);

//SELECT MAX(CAST(SUBSTR(company_id, 5) AS UNSIGNED)) FROM Company WHERE company_id LIKE 'empr%'; THIS IS THE TICKET RIGHT HERE MAN