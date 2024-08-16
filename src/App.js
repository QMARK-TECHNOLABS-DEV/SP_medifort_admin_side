import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorProfiles from './pages/doctorProfile/DoctorProfiles';
import DoctorDetailedView from './pages/doctorProfile/DoctorDetailedView';
import MainLayout from './components/layout/MainLayout';
import DoctorsPage from './pages/doctors/DoctorsPage';
import DoctorsEditPage from './pages/doctorsEdit/DoctorsEditPage';
import TestimonialsHomePage from './pages/testimonials/TestimonialsHomePage';
import TestimonialsPatientContentPage from './pages/testimonialsPatient/TestimonialsPatientContentPage';



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
            <Route path='/doctors' element={<DoctorsPage />} />
            <Route path='/doctorsedit' element={<DoctorsEditPage />} />

          {/* Testimonials part */}
          <Route path='/testimonials' element={<TestimonialsHomePage />} />
          <Route path='/testimonials-patient' element={<TestimonialsPatientContentPage/>} />

          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
