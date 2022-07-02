//importing insertEmployee from src/modules
const {addEmployee} = require('../modules/endpoint');

//basically its waiting for the add employee function to complete before executing other code
(async () => {
    await addEmployee("secretpword", "Joe", "Dammagio", "kVlu6319@epicwin.com", "0231433212", "Casual", "Employee", "ewltd2343");
})();