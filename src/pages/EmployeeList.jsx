import React, {useState, useEffect} from 'react';
const axios = require('axios');

document.title = "Employee List";

export default function EmployeeList() {
    const [employeeList, setEList] = useState("");
    useEffect(() => {
        axios.get("http://localhost:2420/getEmployeesList/" + 1).then((response) => {
            setEList(response.data);
    })}, []);
    console.log(employeeList.length);
    for (let i = 0; i < employeeList.length; i++) {
        console.log('meow');
    }
    /*document.getElementById("eListContainer").innerHTML = employeeList;*/
    return (
        <div id="eListContainer">
            heyyyy
        </div>

    )
}