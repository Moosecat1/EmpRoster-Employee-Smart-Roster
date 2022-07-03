import '../css/Home.css';
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/Navbar.css"

export default function Home() {
    document.title = "EmpRoster - Smart Roster System"
    return (<main><Navbar/> <Footer/></main>);
}
