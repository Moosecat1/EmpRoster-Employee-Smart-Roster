import {React, useEffect, useState} from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from "axios";

const nameStyle = {
    backgroundColor: '#c5ceff',
    border: '1px solid black'
}

const posStyle = {
    backgroundColor: '#eaf3fc',
    border: '1px solid black'
}

const negStyle = {
    backgroundColor: '#F7F8FC',
    border: '1px solid black'
}

export default function CompanyEvent(){
    const [companyEvents, setCompanyEvents] = useState([]);

    useEffect(() => {
        const getCompanyEvents = async () => {
            const res = await axios.get("http://localhost:2420/getCompanyEvents/" + sessionStorage.getItem('company_id'));

            for(let i = 0; i < res.data.length; i++){
                let event_date = res.data[i].event_date;

                const date = new Date(parseInt(event_date.substring(0, 4)), parseInt(event_date.substring(5, 7)) - 1, parseInt(event_date.substring(8, 10)) + 1);

                res.data[i].event_date = date.toDateString();
            }

            setCompanyEvents(res.data);
        }

        getCompanyEvents();
    }, []);

    //delete event in DB using unique ID and then reload the page
    const removeEvent = async (index) => {
        await axios.delete("http://localhost:2420/removeCompanyEvent/" + index);
        document.location.reload();
    }

    const generateEventTable = () => {
        return companyEvents.map((companyEvent, index) => 
            <tr key={index}>
                <td style={nameStyle}>{companyEvent.event_name}</td>
                <td style={posStyle}>{companyEvent.event_date}</td>
                <td style={posStyle}>{companyEvent.event_start !== null ? companyEvent.event_start : "All Day"}</td>
                <td style={posStyle}>{companyEvent.event_end !== null ? companyEvent.event_end : "All Day"}</td>
                <td style={negStyle}>
                    <button style={{color: "red"}} onClick={() => removeEvent(companyEvent.event_id)}>Remove</button>
                </td>
            </tr>
        );
    }

    const checkEmpty = () => {
        if(companyEvents.length !== 0){
            return(
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Start</th>
                            <th>End</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateEventTable()}
                    </tbody>
                </table>
            );
        } else{
            return(
                <h1>No events have been created for the company.</h1>
            )
        }
    }
    
    return(
        <>
            <Navbar/>

            <div>
                {checkEmpty()}
            </div>
        </>
    );
}