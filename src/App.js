import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterCreateCompany from "./pages/Register/RegisterCreateCompany";
import NoPage from "./pages/NoPage";
import RegisterCreateEmployees from "./pages/Register/RegisterCreateEmployees";
import RegisterCreateAdmin from "./pages/Register/RegisterCreateAdmin";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register/createcompany" element={<RegisterCreateCompany/>}/>
            <Route path="/register/createemployees" element={<RegisterCreateEmployees/>}/>
            <Route path="/register/createadmin" element={<RegisterCreateAdmin/>}/>
            <Route path="/*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

