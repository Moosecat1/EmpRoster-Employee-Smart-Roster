//importing verifyEmployee from src/modules
const { verifyEmployee } = require('../modules/endpoint');

//don't really understand, but basically its waiting for the verify employee function to complete before executing other code
(async () => {
    const empExists = await verifyEmployee("kVlu6319", "secretpword");
    console.log(empExists);
})();