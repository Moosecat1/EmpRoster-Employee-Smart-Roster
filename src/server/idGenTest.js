function genId(company_name)
{
    var company_id = company_name.slice(0, 4).toLowerCase();

    return company_id;
}

const company_name = "EmpRoster";
const company_id = genId(company_name);
console.log(company_id);

//SELECT MAX(CAST(SUBSTR(company_id, 5) AS UNSIGNED)) FROM Company WHERE company_id LIKE 'empr%'; THIS IS THE TICKET RIGHT HERE MAN