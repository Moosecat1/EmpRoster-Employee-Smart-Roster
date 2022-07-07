const { addCompany } = require('../modules/endpoint');

(async() => {
    var res = await addCompany("joes maegae");
    console.log(res);
})();