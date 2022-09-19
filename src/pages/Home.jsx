import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Roster from "../components/roster"
import Hero from "../components/hero"
import Carousel from "../components/Carousel";

export default function Home() {
    document.title = "EmpRoster - Smart Roster System"
    return (<main><Navbar /><Carousel /><Footer /></main>);
}
