import React, { useEffect, useState } from 'react'
import ContentCard from '../../components/contentManagement/ContentCards';
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton';
import PageHeaderpart from '../../components/common/PageHeaderpart';
import SearchInput from '../../components/common/SearchInput';

const EnquiryHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const contentItems = [
    { id: 1, imageSrc: '/enquiries/enquiriescard1.png', title: 'Home care ', url: "/enquiry/homecare" },
    { id: 2, imageSrc: '/enquiries/enquiriescard2.png', title: 'Insurance', url: "/enquiry/insurance" },
    { id: 3, imageSrc: '/enquiries/enquiriescard3.png', title: 'Contact Us ', url: "/enquiry/contact-us" },
    { id: 4, imageSrc: '/enquiries/enquiriescard4.png', title: 'International Patient Enquiry', url: "/enquiry/international-patient-enquiry" },
    { id: 5, imageSrc: '/enquiries/feedback.jpg', title: 'Feedback Enquiry', url: "/enquiry/feedback" }
  ];
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const breadcrumbsItems = [
    { label: "Home", href: "/" },
    { label: "Enquirie", href: "/enquiry" },
  ];

  return (
    <div className="h-screen w-full overflow-hidden">
      <header>
        <PageHeaderpart
          items={breadcrumbsItems}
          pageTitle={"Enquiries"}
        >
          <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
            <SearchInput
              setSearch={setSearch}
            />

          </div>
        </PageHeaderpart>
      </header>
      <div className="flex-1 h-full pb-80 overflow-y-auto scrollbar-hide">
        {/* <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Enquiries</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
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
