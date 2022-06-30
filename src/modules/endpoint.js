const axios = require('axios')

//make a function that can be called from anywhere (with the correct imports)
//which allows for checking if a employee exists
let verifyEmployee = async(emp_id, emp_password) => {

    try{
        let result = await axios.get("http://localhost:2420/verifyEmployee", {
        emp_id: emp_id,
        emp_password: emp_password
    });
        return result;
    } catch(error){
        console.log(error);
    }
}

module.exports.verifyEmployee = verifyEmployee;