import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Test from './pages/Test';
import EmployeeList from "./pages/EmployeeList";
import RegisterCreateCompany from "./pages/Register/RegisterCreateCompany";
import NoPage from "./pages/NoPage";
import RegisterCreateEmployees from "./pages/Register/RegisterCreateEmployees";
import RegisterCreateAdmin from "./pages/Register/RegisterCreateAdmin";
import CompanyInfo from "./pages/Register/CompanyInfo";
import ManagerEditRoster from "./pages/ManagerEditRoster";
import Settings from "./pages/Settings";
import MainHub from "./pages/MainHub";
import ChangeAvailability from "./pages/ChangeAvailability";
import ViewEmployeeAvailability from "./pages/ManagerViewAvailability";
import RequestLeave from './pages/RequestLeave';
import ManagerViewEmployee from './pages/ManagerViewEmployee';
import ViewCompanyRoster from "./pages/ViewCompanyRoster";

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
            <Route path="/Settings" element={<Settings/>}/>
            <Route path="/mainhub" element={<MainHub/>} />
            <Route path="/ChangeAvailability" element={<ChangeAvailability/>} />
            <Route path="/ViewEmployeeAvailability" element={<ViewEmployeeAvailability/>} />
            <Route path="/ManagerViewEmployee" element={<ManagerViewEmployee/>} />
            <Route path="/RequestLeave" element={<RequestLeave/>} />
            <Route path="/ViewCompanyRoster" element={<ViewCompanyRoster/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/CompanyInfo" element={<CompanyInfo/>}/>
        </Routes>
      </BrowserRouter>
  );
}

