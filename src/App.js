import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DoctorProfiles from './pages/doctorProfile/DoctorProfiles';
import DoctorDetailedView from './pages/doctorProfile/DoctorDetailedView';
import BannerCo from './pages/bannerComp/BannerCo';
import BannComp from './pages/bann.Comp/BannComp';
import MainLayout from './components/layout/MainLayout';
import DoctorsPage from './pages/doctors/DoctorsPage';
import DoctorsEditPage from './pages/doctorsEdit/DoctorsEditPage';
import TestimonialsHomePage from './pages/testimonials/TestimonialsHomePage';
import TestimonialsPatientContentPage from './pages/testimonialsPatient/TestimonialsPatientContentPage';
import ContentManagementPage from './pages/contentManagement/ContentManagementPage';
import PreventiveHealth from './pages/contentManagement/PreventiveHealth';

import Media from './pages/Media';

import HealthTalkPage from './pages/healthTalk/HealthTalkPage';
import ArticlePage from './pages/healthTalk/ArticlePage';
import NewArticlePage from './pages/healthTalk/NewArticlePage';
import NewsPage from './pages/news/NewsPage';
import AddNewsPage from './pages/news/AddNewsPage';
import TestiComp from './pages/testiComp/TestiComp';
import LoginPage from './pages/loginPage/LoginPage';

import EnquiryHomePage from './pages/enquiry/EnquiryHomePage';
import HomeCareEnquiryPage from './pages/enquiry/HomeCareEnquiryPage';
import ResearchPage from './pages/research/ResearchPage';
import NewResarchPage from './pages/research/NewResarchPage';
import CaseStudyHomePage from './pages/caseStudies/CaseStudyHomePage';
import VideoPage from './pages/video/VideoPage';
import DepartmentPage from './pages/department/DepartmentPage';
import AddDepartmentPage from './pages/department/AddDepartmentPage';
import InsuranceEnquiryPage from './pages/enquiry/InsuranceEnquiryPage';
import ContactUsEnquiryPage from './pages/enquiry/ContactUsEnquiryPage';
import InternationalPatientEnquiryPage from './pages/enquiry/InternationalPatientEnquiryPage';
import Gallery from './pages/galleryCrud/GalleryCrud';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/*Login Page*/}
          <Route index path='/login' element={<LoginPage />} />
          <Route  element={<MainLayout />}>

            {/* Dashboard */}
            <Route exact path='/' element={<Home />} />

            {/* Doctor Profile part */}
            <Route path='/doctor-profiles' element={<DoctorProfiles />} />
            <Route path='/doctor-profiles/:id' element={<DoctorDetailedView />} />
            <Route path='/doctors' element={<DoctorsPage />} />
            <Route path='/doctors/doctor-edit' element={<DoctorsEditPage />} />

            {/* Testimonials part */}
            <Route path='/testimonials' element={<TestimonialsHomePage />} />
            <Route path='/testimonials/patient' element={<TestimonialsPatientContentPage />} />
            <Route path='/testimonials/video' element={<TestiComp />} />

             {/*Content Management part */}
            <Route path='/content-management' element={<ContentManagementPage/>} />
            <Route path='/preventive-health' element={<PreventiveHealth/>} />
            
            {/*Department  */}
            <Route path='/department' element={<DepartmentPage/>} />
            <Route path='/add-department' element={<AddDepartmentPage/>} />

            {/*Health Talk  */}
            <Route path='/content-management/health-talk' element={<HealthTalkPage />} />
            <Route path='/article' element={<ArticlePage />} />
            <Route path='/new-article' element={<NewArticlePage />} />
            <Route path='/video' element={<VideoPage />} />
              
            {/*Research*/}
            <Route path='/research' element={<ResearchPage />} />
            <Route path='/new-research' element={<NewResarchPage />} />
            {/*Health Talk part end  */}

            {/*News */}
            <Route path='/news' element={<NewsPage />} />
            <Route path='/new-news' element={<AddNewsPage />} />


            {/* Banner */}
            <Route path='/banner' element={<BannerCo />} />
            <Route path='/add-banner' element={<BannComp />} />

            {/*cpntent management media */}
            <Route path='/content-management/media' element={<Media />} />

            {/*Case Studies*/}
            <Route path='/casestudies' element={<CaseStudyHomePage />} />


            {/*Enquiry*/}
            <Route path='/enquiry' element={<EnquiryHomePage />} />
            <Route path='/enquiry/homecare' element={<HomeCareEnquiryPage />} />
            <Route path='/enquiry/insurance' element={<InsuranceEnquiryPage />} />
            <Route path='/enquiry/contact-us' element={<ContactUsEnquiryPage />} />
            <Route path='/enquiry/international-patient-enquiry' element={<InternationalPatientEnquiryPage />} />
              
             {/*Gallery Crud */}
             <Route path='/gallery' element={<Gallery/>} />
          </Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;
