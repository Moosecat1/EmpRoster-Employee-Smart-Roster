import '../css/Home.css';
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import Roster from "../components/roster"

export default function Home() {
    document.title = "EmpRoster - Smart Roster System"
    return (<main><Navbar/> <Footer/> <Sidebar/> <Roster/></main>);
}
