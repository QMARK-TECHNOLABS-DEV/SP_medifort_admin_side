import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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
import Media from './pages/media';
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
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Login Page */}
          <Route index path='/login' element={<LoginPage />} />
          <Route element={<MainLayout />}>

            {/* Dashboard */}
            <Route exact path='/' element={<Dashboard />} />
              
            {/* Doctor Profile part */}
            <Route path='/doctor-profiles' element={<DoctorProfiles />} />
            <Route path='/doctor-profiles/:id' element={<DoctorDetailedView />} />
            <Route path='/doctors' element={<DoctorsPage />} />
            <Route path='/doctors/doctor-edit' element={<DoctorsEditPage />} />
              
            {/* Testimonials part */}
            <Route path='/testimonials' element={<TestimonialsHomePage />} />
            <Route path='/testimonials/patient' element={<TestimonialsPatientContentPage />} />
            <Route path='/testimonials/video' element={<TestiComp />} />

            {/* Banner */}
            <Route path='/banner' element={<BannerCo />} />
            <Route path='/add-banner' element={<BannComp />} />
              
            {/* Content management media */}
            <Route path='/content-management/media' element={<Media />} />

            {/*Content Management part */}
            <Route path='/content-management' element={<ContentManagementPage />} />
            <Route path='/content-management/preventive-health' element={<PreventiveHealth />} />

            {/*Department  */}
            <Route path='/content-management/department' element={<DepartmentPage />} />
            <Route path='/content-management/department/add-department' element={<AddDepartmentPage />} />

            {/*Health Talk  */}
            <Route path='/content-management/health-talk' element={<HealthTalkPage />} />
            <Route path='/content-management/article' element={<ArticlePage />} />
            <Route path='/content-management/article/new-article' element={<NewArticlePage />} />
            <Route path='/content-management/video' element={<VideoPage />} />

            {/*Research*/}
            <Route path='/content-management/research' element={<ResearchPage />} />
            <Route path='/content-management/research/new-research' element={<NewResarchPage />} />

            {/*News */}
            <Route path='/content-management/news' element={<NewsPage />} />
            <Route path='/content-management/news/new-news' element={<AddNewsPage />} />

            {/* Banner */}
            <Route path='/content-management/banner' element={<BannerCo />} />
            <Route path='/content-management/banner/add-banner' element={<BannComp />} />

            {/*content management media */}
            <Route path='/content-management/media' element={<Media />} />

            {/*Case Studies*/}
            <Route path='/content-management/casestudies' element={<CaseStudyHomePage />} />

            {/*Gallery Crud */}
            <Route path='/content-management/gallery' element={<Gallery />} />

            <Route path='/enquiry' element={<EnquiryHomePage />} />
            <Route path='/enquiry/homecare' element={<HomeCareEnquiryPage />} />
            <Route path='/enquiry/insurance' element={<InsuranceEnquiryPage />} />
            <Route path='/enquiry/contact-us' element={<ContactUsEnquiryPage />} />
            <Route path='/enquiry/international-patient-enquiry' element={<InternationalPatientEnquiryPage />} />
              
            {/* Gallery CRUD */}
            <Route path='/gallery' element={<Gallery />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
