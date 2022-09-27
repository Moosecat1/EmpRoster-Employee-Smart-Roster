import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Carousel from "../components/Carousel";

export default function Home() {
    document.title = "EmpRoster - Smart Roster System"
    return (<main><Navbar /><Carousel /><Footer /></main>);
}
