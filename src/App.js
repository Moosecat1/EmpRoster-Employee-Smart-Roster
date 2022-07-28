import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import EmployeeList from "./pages/EmployeeList"
import RegisterCreateCompany from "./pages/Register/RegisterCreateCompany";
import NoPage from "./pages/NoPage";
import RegisterCreateEmployees from "./pages/Register/RegisterCreateEmployees";
import RegisterCreateAdmin from "./pages/Register/RegisterCreateAdmin";
import ManagerEditRoster from "./pages/ManagerEditRoster";
import SettingsAccount from "./pages/Settings/SettingsAccount";
import MainHub from "./pages/MainHub";
import ChangeAvailability from "./pages/ChangeAvailability";
import ViewEmployee from "./pages/ManagerViewAvailability";
import RequestLeave from './pages/RequestLeave';

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
            <Route path="/employeelist" element={<EmployeeList/>}/>
            <Route path="/ManagerEditRoster" element={<ManagerEditRoster/>}/>
            <Route path="/settings" element={<SettingsAccount/>}/>
            <Route path="/mainhub" element={<MainHub/>} />
            <Route path="/ChangeAvailability" element={<ChangeAvailability/>} />
            <Route path="/ViewEmployee" element={<ViewEmployee/>} />
            <Route path="/RequestLeave" element={<RequestLeave/>} />
        </Routes>
      </BrowserRouter>
  );
}

