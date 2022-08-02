import { useEffect } from 'react';
import {React, useState, useLayoutEffect} from 'react';
import '../css/sidebar.css';

function Sidebar() {
    localStorage.setItem('type', 'manager');
    var empType = localStorage.getItem('type');

    const [hasLoaded, setHasLoaded] = useState(false);

    const idList = ['dashboard', 'employees', 'settings', 'requestLeave'];
    const urlList = [
        "http://localhost:3000/",
        "http://localhost:3000/employeelist",
        "http://localhost:3000/settings/Account",
        "http://localhost:3000/RequestLeave"
    ]

    const url = window.location.href;
    
    if(hasLoaded)
    {
        for(let i = 0; i < 4; i++)
        {
            if(url === urlList[i])
            {
                document.getElementById(idList[i]).className = "side-link active";
            }
            else
            {
                document.getElementById(idList[i]).className = "side-link text-black";
            }
        }
    }

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    if (empType === 'manager') {
        return (
            <div className="d-flex flex-nowrap">
                <div className="side d-flex flex-column flex-shrink-0 p-2">

                    <hr />
                    <ul className="side-pills flex-column mb-auto">
                        <li className="side-item">
                            <a id='dashboard' href="/mainhub" className="side-link active" aria-current="page">
                                    <i className="bi bi-house-door"></i>
                                    DashBoard
                            </a>
                        </li>
                        <li>
                            <a id='employees' href="/employeelist" className="side-link text-black">
                                <i className="bi bi-people-fill"></i>
                                Employees
                            </a>
                        </li>
                        <li>
                            <a id='settings' href="/settings/Account" className="side-link text-black">
                                <i className="bi bi-gear"></i>
                                Settings
                            </a>
                        </li>
                        {/*<li>
                            <a id='messageStaff' href="/" className="side-link text-black">
                                <i className="bi bi-envelope"></i>
                                Message Staff
                            </a>
                        </li>*/}
                        <li>
                            <a id='requestLeave' href="/RequestLeave" className="side-link text-black">
                                <i className="bi bi-calendar"></i>
                                Request Leave
                            </a>
                        </li>
                    </ul>
                    <hr />
                </div>
            </div>
        )
    }
    /*else if (empType === 'employee') {
        return (
            <div className="d-flex flex-nowrap">
                <div className="side d-flex flex-column flex-shrink-0 p-1 col-1">

                    <hr />
                    <ul className="side-pills flex-column mb-auto">
                        <li className="side-item">
                            <a href="/mainhub" className="side-link active" aria-current="page">
                                <i className="bi bi-house-door"></i>
                                DashBoard
                            </a>
                        </li>
                        <li>
                            <a href="/RequestLeave" className="side-link text-black">
                                <i className="bi bi-printer"></i>
                                Request Leave
                            </a>
                        </li>
                        <li>
                            <a href="/settings/Account" className="side-link text-black">
                                <i className="bi bi-gear"></i>
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="/ChangeAvailability" className="side-link text-black">
                                <i className="bi bi-calendar"></i>
                                Change Availability
                            </a>
                        </li>
                    </ul>
                    <hr />
                </div>
            </div>
        )
    }*/

}
export default Sidebar;