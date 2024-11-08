// export const baseUrl = 'https://spserver.qmarkdesk.com';
export const baseUrl = 'http://localhost:8800';

// Admin routes
export const regenerateRoute = '/api/auth/refresh-token';
export const inquiryRoute = '/api/admin/inquiry';
export const bannerRoute = '/api/banner';
export const galleryRoute = '/api/admin/gallery';
export const updateGalleryRoute = '/api/admin/gallery';

//guest routes
export const getAllGalleriesRoute = '/api/gallery';

// HMS routes
export const doc_in_dept_route = '/doctor-in-department';
export const get_doc_to_consult = '/doctor-consultation-available-in-date';
export const list_departments = '/list-departments';

// Admin routes

export const doctor_admin_route = "/api/admin/doctor"
export const department_admin_route = "/api/admin/department"

export const uploadRoute = '/api/uploads'

// health Talks section
// Articles
export const uploadArticles = '/api/admin/article'
export const getArticles = '/api/article'
// Research
export const uploadResearch = '/api/admin/research'
export const getResearch = '/api/research'
// News
export const uploadNews = '/api/admin/news'
export const getNews = '/api/news'
// Videos
export const uploadVideos = '/api/admin/video'
export const getVideos = '/api/video'
// CaseStudies
export const uploadCaseStudies = '/api/admin/case-study'
export const getCaseStudies = '/api/case-study'


export const checkupAdminRoute = '/api/admin/checkups'
export const checkupRoute = '/api/checkups'

export const testimonialAdminRoute = '/api/admin/testimonial'
export const testimonialRoute = '/api/testimonial'

