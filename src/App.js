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
import Notifications from "./pages/Notifications";
import EditCompany from "./pages/EditCompany";
import FAQ from "./pages/FAQ";

export default function App() {
  console.log(sessionStorage.getItem('emp_privilege'));

  if(sessionStorage.getItem('emp_privilege') === null){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/FAQ" element={<FAQ/>}/>
          <Route path="/register/createcompany" element={<RegisterCreateCompany/>}/>
          <Route path="/register/createemployees" element={<RegisterCreateEmployees/>}/>
          <Route path="/register/createadmin" element={<RegisterCreateAdmin/>}/>
            <Route path="/CompanyInfo" element={<CompanyInfo/>}/>
          <Route path="/*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  } else if(sessionStorage.getItem('emp_password_changed') === "0"){
    return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register/createcompany" element={<RegisterCreateCompany/>}/>
            <Route path="/register/createemployees" element={<RegisterCreateEmployees/>}/>
            <Route path="/register/createadmin" element={<RegisterCreateAdmin/>}/>
            <Route path="/CompanyInfo" element={<CompanyInfo/>}/>
            <Route path="/mainhub" element={<MainHub/>}/>
            <Route path="/*" element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
      );
  } else if(sessionStorage.getItem('emp_privilege') === "Admin"){
      return(
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
                  <Route path="/Notifications" element={<Notifications/>}/>
                  <Route path="/test" element={<Test/>}/>
                  <Route path="/CompanyInfo" element={<CompanyInfo/>}/>
                  <Route path="/EditCompany" element={<EditCompany/>}/>
              </Routes>
          </BrowserRouter>

      );
  }else if(sessionStorage.getItem('emp_privilege') === "Manager"){
      return(
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
                  <Route path="/Notifications" element={<Notifications/>}/>
                  <Route path="/CompanyInfo" element={<CompanyInfo/>}/>
              </Routes>
          </BrowserRouter>
      );
  }else if(sessionStorage.getItem('emp_privilege') === "Employee"){
      return(
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register/createcompany" element={<RegisterCreateCompany/>}/>
                  <Route path="/register/createemployees" element={<RegisterCreateEmployees/>}/>
                  <Route path="/register/createadmin" element={<RegisterCreateAdmin/>}/>
                  <Route path="/*" element={<NoPage/>}/>
                  <Route path="/employeelist" element={<EmployeeList/>}/>
                  <Route path="/Settings" element={<Settings/>}/>
                  <Route path="/mainhub" element={<MainHub/>} />
                  <Route path="/ChangeAvailability" element={<ChangeAvailability/>} />
                  <Route path="/RequestLeave" element={<RequestLeave/>} />
                  <Route path="/ViewCompanyRoster" element={<ViewCompanyRoster/>}/>
                  <Route path="/Notifications" element={<Notifications/>}/>
                  <Route path="/CompanyInfo" element={<CompanyInfo/>}/>
              </Routes>
          </BrowserRouter>
      );
  }else{
      return(
          <BrowserRouter>
              <Routes>
                  <Route path="/*" element={<NoPage/>}/>
              </Routes>
          </BrowserRouter>
      );

  }

}

