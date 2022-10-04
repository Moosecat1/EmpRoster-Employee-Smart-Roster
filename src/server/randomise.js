//DOES NOT WORK ANYMORE DB IS TOO DIFFERENT AND DOES NOT MAKE SENSE TO UPDATE THIS RIGHT NOW AS MAKING A COMPANY IS QUITE EASY

const { random, randomName, randomCompanyName, randomDomain, randomPhoneNumber, randomType, randomPrivilege } = require('../modules/random');
const { addCompany, addCompanyEvent, addEmployee, addRegularAvailability, addAvailability, createRoster } = require('../modules/endpoint');

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
    //get the current weeks dates and add them to an array
    let dayLooper = new Date();
    dayLooper.setDate(dayLooper.getDate() - (dayLooper.getDay() - 1));

    let weekDates = [dayLooper];

    for(let i = 0; i < 6; i++)
    {
        dayLooper.setDate(dayLooper.getDate() + 1);
        weekDates.push(dayLooper);
    }

    const companyEvents = [
        {event_date: "2022-12-25", event_start: "00:00", event_end: "23:59", event_name: "Christmas"},
        {event_date: "2022-08-01", event_start: "00:00", event_end: "23:59", event_name: "Bank Holiday"},
        {event_date: "2022-10-03", event_start: "00:00", event_end: "23:59", event_name: "Labour Day"},
        {event_date: "2022-12-26", event_start: "00:00", event_end: "23:59", event_name: "Boxing Day"},
        {event_date: "2022-04-25", event_start: "00:00", event_end: "23:59", event_name: "ANZAC Day"},
        {event_date: "2022-01-26", event_start: "00:00", event_end: "23:59", event_name: "Australia Day"}
    ];

    //generate companies
    for(let i = 0; i < companyNo; i++)
    {
        const companyName = randomCompanyName();
        const companyId = await addCompany(companyName);

        const employeeNo = random(0, 100);

        //add company events
        for(let i2 = 0; i2 < companyEvents.length; i2++)
        {
            const companyEvent = companyEvents[i2];
            await addCompanyEvent(companyEvent.event_date, companyEvent.event_start, companyEvent.event_end, companyEvent.event_name, companyId);
        }

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
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            //get current date
            const currentDate = new Date();

            //set start of week date to last monday
            let lastMonday = new Date();
            lastMonday.setDate(currentDate.getDate() - (currentDate.getDay() - 1));
            let lastSat = new Date();
            lastSat.setDate(currentDate.getDate() - (currentDate.getDay() - 6));
            let weekStart = new Date();
            weekStart.setDate(currentDate.getDate() - (currentDate.getDay()));

            //if emp is full-time, roster on 9-5 mon, tue, wed, thurs, fri
            if(empType === "Full-time")
            {   
                dayLooper = lastMonday;

                for(let i = 1; i < 6; i++)
                {
                    await addRegularAvailability(dayNames[i], "09:00", "17:00", empId);

                    const chance = Math.random();

                    //with a probability of 20%, the employee will have an unavailability that day
                    if(chance < 0.2)
                    {
                        const sqlDate = dayLooper.toISOString().split('T')[0].replace(/-/g, '/');

                        await addAvailability(sqlDate, "09:00", "17:00", "Unavailable", empId);
                    }

                    dayLooper.setDate(dayLooper.getDate() + 1);
                }
            }
            //if emp is part-time, roster on 9-5 mon, wed, fri
            else if(empType === "Part-time")
            {
                dayLooper = lastMonday;

                for(let i = 1; i < 6; i = i + 2)
                {
                    await addRegularAvailability(dayNames[i], "09:00", "17:00", empId);

                    const chance = Math.random();

                    //with a probability of 20%, the employee will have an unavailability that day
                    if(chance < 0.2)
                    {
                        const sqlDate = dayLooper.toISOString().split('T')[0].replace(/-/g, '/');

                        await addAvailability(sqlDate, "09:00", "17:00", "Unavailable", empId);
                    }

                    dayLooper.setDate(dayLooper.getDate() + 2);
                }
            }
            //if emp is casual, roster on 9-5 mon, fri
            else
            {
                dayLooper = lastMonday;

                for(let i = 1; i < 6; i = i + 4)
                {
                    await addRegularAvailability(dayNames[i], "09:00", "17:00", empId);

                    const chance = Math.random();

                    //with a probability of 20%, the employee will have an unavailability that day
                    if(chance < 0.2)
                    {
                        const sqlDate = dayLooper.toISOString().split('T')[0].replace(/-/g, '/');

                        await addAvailability(sqlDate, "09:00", "17:00", "Unavailable", empId);
                    }

                    dayLooper.setDate(dayLooper.getDate() + 4);
                }
            }

            const chance = Math.random();

            //with a probability of 30%, the employee will have an extra availability on that weeks sat
            if(chance < 0.3)
            {
                const sqlDate = lastSat.toISOString().split('T')[0].replace(/-/g, '/');

                await addAvailability(sqlDate, "09:00", "17:00", "Available", empId);
            }

            //create roster for each employee based on their regular availabilities and weeks current availabilities
            await createRoster(empId, weekStart);
        }
    }
})();