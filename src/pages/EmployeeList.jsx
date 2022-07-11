import Sidebar from "../components/sidebarManager";
import Navbar from "../components/navbar";
import '../css/EmployeeList.css';
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
                const container = document.getElementById("eListContainer");
                const pill = document.createElement("ul");
                pill.className = "eList-pill flex-column flex-nowrap mb-auto";
                for (let i = 0; i < employeeList.length; i++) {
                    const listItem = document.createElement("li");
                    listItem.className = "eList-item flex-row mb-auto";
                    const listLink = document.createElement("a");
                    listLink.className = "eList-link flex-column";
                    listLink.href = "#";
                    const employeePicture = document.createElement("img");
                    employeePicture.src = "placeholder.jpg";
                    employeePicture.src = "Placeholder";
                    employeePicture.className = "eList-image";
                    listLink.append(employeePicture);
                    const employeeName = document.createElement("p");
                    employeeName.className = "eList-name text-black";
                    employeeName.innerHTML = employeeList[i].emp_fName + " " + employeeList[i].emp_lName;
                    listLink.append(employeeName);
                    const employeeRole = document.createElement("p");
                    employeeRole.className = "eList-role text-black";
                    employeeRole.innerHTML = "Placeholder role";
                    listLink.append(employeeRole);
                    const employeeType = document.createElement("p");
                    employeeType.className = "eList-type text-black";
                    employeeType.innerHTML = employeeList[i].emp_type;
                    listLink.append(employeeType);
                    const viewEmployee = document.createElement("p");
                    viewEmployee.className = "eList-view text-black";
                    viewEmployee.innerHTML = "View Employee";
                    listLink.append(viewEmployee);
                    listItem.append(listLink);
                    pill.append(listItem);
                }
                container.append(pill);
            });
        })();
    }
    if (checker === false) {
        employeeListGet();
        checker = true;
    }

    return (
        <div className='flex'>
            <Navbar/> <Sidebar/>
            <container className='d-flex flex-nowrap justify-content-center' id="eListContainer">

            </container>
        </div>


    )
}