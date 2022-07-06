import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage"
import EmployeeList from "./pages/EmployeeList"

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/*" element={<NoPage/>}/>
            <Route path="/employeelist" element={<EmployeeList/>}/>
        </Routes>
      </BrowserRouter>
  );
}

