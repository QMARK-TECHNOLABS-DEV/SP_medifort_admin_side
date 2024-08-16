import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorProfiles from './pages/doctorProfile/DoctorProfiles';
import DoctorDetailedView from './pages/doctorProfile/DoctorDetailedView';
import BannerCo from './pages/bannerComp/BannerCo';
import BannComp from './pages/bann.Comp/BannComp';
import MainLayout from './components/layout/MainLayout';
import ContentManagementPage from './pages/contentManagement/ContentManagementPage';
import PreventiveHealth from './pages/contentManagement/PreventiveHealth';
import TestiComp from './pages/testiComp/TestiComp';


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

            {/* Banner */}
            <Route path='/banner' element={<BannerCo />} />
            <Route path='/add-banner' element={<BannComp />} />

            {/*Testimonial*/}
            <Route path='/testimonial' element={<TestiComp />} />
           




          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
