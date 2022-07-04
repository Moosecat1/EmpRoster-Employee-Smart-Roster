import '../css/Home.css';
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/Navbar.css"

import Hero from "../components/hero";

export default function Home() {
    document.title = "EmpRoster - Smart Roster System"
    return (

            <Hero/>
    )
}
