const { random, randomName, randomCompanyName, randomDomain, randomPhoneNumber, randomType, randomPrivilege } = require('../modules/random');
const { addCompany, addEmployee, addAvailability } = require('../modules/endpoint');

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

        //generate employees for company
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

            const empId = await addEmployee(empPassword, empFName, empLName, empEmail, empPhNum, empType, empPrivilege, companyId);

            if(empType === "Full-time")
            {
                //get current date
                const availDate = new Date();

                //set start of week date to last monday
                let startOfWeek = new Date();
                startOfWeek.setDate(availDate.getDate() - (availDate.getDay() - 1));

                let currentDate = startOfWeek;

                //roster the full-time employee on from the previous monday till the end of the next week's friday (ie. two weeks roster)
                for(let i = 0; i < 10; i++)
                {
                    //get the date in mysql format
                    const sqlDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');

                    //set the current date to the previous date + a day and skip the weekend
                    if(i !== 4){
                        currentDate.setDate(currentDate.getDate() + 1);
                    } else{
                        currentDate.setDate(currentDate.getDate() + 2);
                    }

                    await addAvailability(sqlDate, "09:00", "17:00", empId);
                }
            }
        }
    }
})();
