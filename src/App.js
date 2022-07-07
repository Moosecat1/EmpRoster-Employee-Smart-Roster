import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterCreateCompany from "./pages/RegisterCreateCompany";
import NoPage from "./pages/NoPage";
import RegisterCreateEmployees from "./pages/RegisterCreateEmployees";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register/createcompany" element={<RegisterCreateCompany/>}/>
            <Route path="/register/createemployees" element={<RegisterCreateEmployees/>}/>
            <Route path="/*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

