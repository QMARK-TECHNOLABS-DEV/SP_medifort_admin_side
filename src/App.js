import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorProfiles from './pages/doctorProfile/DoctorProfiles';
import DoctorDetailedView from './pages/doctorProfile/DoctorDetailedView';
import MainLayout from './components/layout/MainLayout';
import Media from './pages/Media';

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

            {/*cpntent management media */}
            <Route path='/contentmanagement/media' element={<Media />} />


          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
