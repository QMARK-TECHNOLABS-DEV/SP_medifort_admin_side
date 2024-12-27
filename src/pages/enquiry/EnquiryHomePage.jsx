import React, { useEffect, useState } from 'react'
import ContentCard from '../../components/contentManagement/ContentCards';
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton';

const EnquiryHomePage = () => {
  const [loading, setLoading] = useState(true);
  const contentItems = [
    { id: 1, imageSrc: '/enquiries/enquiriescard1.png', title: 'Home care ', url:"/enquiry/homecare"},
        { id: 2, imageSrc: '/enquiries/enquiriescard2.png', title: 'Insurance', url:"/enquiry/insurance"},
        { id: 3, imageSrc: '/enquiries/enquiriescard3.png', title: 'Contact Us ', url:"/enquiry/contact-us"},
        { id: 4, imageSrc: '/enquiries/enquiriescard4.png', title: 'International Patient Enquiry', url:"/enquiry/international-patient-enquiry"},
        { id: 5, imageSrc: '/enquiries/feedback.jpg', title: 'Feedback Enquiry', url:"/enquiry/feedback"}
  ];
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
}, []);

  return (
    <div className="h-screen w-full overflow-hidden">
    <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide">
      <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Enquiries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2px">
        {loading
          ? // Show skeletons if loading
            Array.from({ length: contentItems.length }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))
          : // Show content cards once loading is complete
            contentItems.map((item, index) => (
              <div key={index}>
                <ContentCard imageSrc={item.imageSrc} title={item.title} url={item.url} />
              </div>
            ))
        }
      </div>
    </div>
  </div>
  )
}

export default EnquiryHomePage
