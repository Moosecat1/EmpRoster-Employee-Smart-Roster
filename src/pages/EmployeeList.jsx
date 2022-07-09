import Sidebar from "../components/sidebarManager";
import Navbar from "../components/navbar";
import React from "react";

const axios = require('axios');

document.title = "Employee List";
var checker = false;

export default function EmployeeList() {
    var employeeList;

    function employeeListGet() {
        (async () => {
            await axios.get("http://localhost:2420/getEmployeesList/" + 1).then((response) => {
                console.log(response.data);
                employeeList = response.data;
                for (let i = 0; i < employeeList.length; i++) {
                    document.getElementById("eListContainer").innerHTML += employeeList[i].emp_fName;
                }
            });
        })();
    }
    if (checker === false) {
        employeeListGet();
        checker = true;
    }

    return (
        <div>
            <Navbar/> <Sidebar/>
            <div className='d-flex flex-nowrap justify-content-center' id="eListContainer">

                hello
            </div>
        </div>


    )
}