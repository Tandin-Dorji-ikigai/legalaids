import './App.css';
import { useEffect } from 'react';
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
import Cursor from './components/Cursor';
import { CssBaseline } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import DetailsPopup from './components/DetailsPopup';
import CurrentCases from './Lawyer/CurrentCases';
import History from './Lawyer/History';
import AdminLogin from './scenes/AdminLogin';

function App() {
  const location = useLocation();
  const isAdminRoute = (pathname) => {
    const adminRoutes = ['/dashboard', '/employeeManagement', '/caseManagement', '/applicationManagement', '/dataManagement', "/history", "/currentcases"];
    return adminRoutes.some(route => pathname.startsWith(route));
  };
  const showCursor = !isAdminRoute(location.pathname);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div className={`app ${showCursor ? 'custom-cursor' : ''}`}>
      <ScrollToTop />
      {showCursor && <Cursor />}
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
        </Routes>
      </main>
    </div>
  );
}

export default App;