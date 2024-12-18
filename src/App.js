import './App.css';
import { useEffect, useState } from 'react';
import Home from './scenes/Home';
import About from './scenes/AboutUs';
import Eligibity from './scenes/Eligibility';
import LegalIssues from './scenes/LegalIssues';
import Login from './scenes/Login';
import Signup from './scenes/Signup';
import Otp from './scenes/Otp';
import TrackApplication from './scenes/TrackApplication';
import Apply1 from './scenes/Apply1';
import Apply2 from './scenes/Apply2';
import Apply3 from './scenes/Apply3';

import Dashboard from './Admin/Dashboard';
import EmployeeManagement from './Admin/EmployeeManagement';
import CaseManagement from './Admin/CaseManagement';
import ApplicationManagement from './Admin/ApplicationManagement';
import DataManagement from './Admin/DataManagement';
import { CssBaseline } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import DetailsPopup from './components/DetailsPopup';
import CurrentCases from './Lawyer/CurrentCases';
import History from './Lawyer/History';
import AdminLogin from './scenes/AdminLogin';
import Loader from './components/Loader';
import i18n from './i18n';

import EmployeeAppManagement from './Employee/ApplicationManagement'
import EmployeeCaseManagement from './Employee/CaseManagement'
import EmployeeDataManagement from './Employee/DataManagement'

import BarCaseManagement from './barCouncil/CaseOverview';
import BarRegisteredLawyer from './barCouncil/RegisteredLawyers';

import HouseholdPopup from './components/HouseholdPopup';

function App() {
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const location = useLocation();

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div className="app">
      <ScrollToTop />
      <CssBaseline />
      <main className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/eligibility' element={<Eligibity />} />
          <Route path='/legal' element={<LegalIssues />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/track' element={<TrackApplication />} />
          <Route path="/apply1" element={<Apply1 />} />
          <Route path="/apply2" element={<Apply2 />} />
          <Route path="/apply3" element={<Apply3 />} />
          <Route path="/loader" element={<Loader />} />

          <Route path="/householdPopup" element={<HouseholdPopup />} />


          {/* admin route */}
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employeeManagement' element={<EmployeeManagement />} />
          <Route path='/caseManagement' element={<CaseManagement />} />
          <Route path='/applicationManagement' element={<ApplicationManagement />} />
          <Route path='/dataManagement' element={<DataManagement />} />
          <Route path='/detailspopup' element={<DetailsPopup />} />

          {/* lawyer route */}
          <Route path='/currentcases' element={<CurrentCases />} />
          <Route path='/history' element={<History />} />

          {/* Employee route */}
          <Route path='/employeeApplicationManagement' element={<EmployeeAppManagement />} />
          <Route path='/employeeCaseManagement' element={<EmployeeCaseManagement />} />
          <Route path='/employeeDataManagement' element={<EmployeeDataManagement />} />

          <Route path='/caseOverview' element={<BarCaseManagement />} />
          <Route path='/registeredLawyers' element={<BarRegisteredLawyer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;