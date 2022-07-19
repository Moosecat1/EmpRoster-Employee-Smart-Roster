const { random, randomName, randomCompanyName, randomDomain, randomPhoneNumber, randomType, randomPrivilege } = require('../modules/random');
const { addCompany, addEmployee } = require('../modules/endpoint');

var companyNo;

if(process.argv.length != 3)
{
    console.error("Please supply arguments in the following format: node random.js noOfCompanies. Exiting...");
    process.exit(-1);
}
else
{
    companyNo = parseInt(process.argv[2]);
    
    if(!Number.isInteger(companyNo))
    {
        console.error("Please supply arguments in the following format: node random.js noOfCompanies. Exiting...");
        process.exit(-1);
    }
}

(async() => {
    //generate companies
    for(let i = 0; i < companyNo; i++)
    {
        const companyName = randomCompanyName();
        const companyId = await addCompany(companyName);

        const employeeNo = random(0, 100);

        for(let i2 = 0; i2 < employeeNo; i2++)
        {
            const empName = randomName();
            const empFName = empName.firstName;
            const empLName = empName.lastName;
            const empPassword = "password";
            const empEmail = (empFName + "." + empLName + random(0, 100) + "@" + randomDomain()).toLowerCase();
            const empPhNum = randomPhoneNumber();
            const empType = randomType();
            const empPrivilege = randomPrivilege();

            await addEmployee(empPassword, empFName, empLName, empEmail, empPhNum, empType, empPrivilege, companyId);
        }
    }
})();
