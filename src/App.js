import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorProfiles from './pages/doctorProfile/DoctorProfiles';
import DoctorDetailedView from './pages/doctorProfile/DoctorDetailedView';
import MainLayout from './components/layout/MainLayout';
import ContentManagementPage from './pages/contentManagement/ContentManagementPage';
import PreventiveHealth from './pages/contentManagement/PreventiveHealth';

function App() {
  return (
    <div className="App">
      <Router>
        <MainLayout>

          <Routes>
            {/* Dashboard */}
            <Route path='' element={<Home />} />

            {/* Doctor Profile part */}
            <Route path='/doctor-profiles' element={<DoctorProfiles />} />
            <Route path='/doctor-profiles/:id' element={<DoctorDetailedView />} />

             {/*Content Management part */}
            <Route path='/content-management' element={<ContentManagementPage/>} />
            <Route path='/preventive-health' element={<PreventiveHealth/>} />


          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
