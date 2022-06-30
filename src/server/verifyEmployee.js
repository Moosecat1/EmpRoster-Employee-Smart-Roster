const endpoint = require("../modules/endpoint");
const verifyEmployee = endpoint.verifyEmployee;

const empExists = verifyEmployee("jm336", "secretpassword");

console.log(empExists);