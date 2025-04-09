import React, { useEffect, useState } from 'react'
import TopPartTestimonial from '../../components/testimonials/TopPartTestimonial'
import TestimonialsContent from '../../components/testimonials/TestimonialsContent'
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton'
import ContentCard from '../../components/contentManagement/ContentCards'
import PageHeaderpart from '../../components/common/PageHeaderpart'
import SearchInput from '../../components/common/SearchInput'

const TestimonialsHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const contentItems = [
    {
      id: 1,
      imageSrc: "/testiimage1.png",
      title: "Patient",
      url: "/testimonials/patient",
    },
    {
      id: 2,
      imageSrc: "/testiimage2.png",
      title: "Video",
      url: "/testimonials/video",
    },
  ];
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
}, []);

const breadcrumbsItems = [
  { label: "Home", href: "/" },
  { label: "Testimonials", href: "/testimonials" },
];

  return (
    <div className="h-screen w-full overflow-hidden">
      <header>
      <PageHeaderpart
    items={breadcrumbsItems}
    pageTitle={"Testimonials"}
    >
      <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
        <SearchInput
        setSearch={setSearch}
        />

      </div>
    </PageHeaderpart>
      </header>
    <div className="flex-1 h-full pb-80 overflow-y-auto scrollbar-hide">
      {/* <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Testimonials</h1> */}
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

export default TestimonialsHomePage
