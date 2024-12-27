import React, { useEffect, useState } from 'react'
import TopPartTestimonial from '../../components/testimonials/TopPartTestimonial'
import TestimonialsContent from '../../components/testimonials/TestimonialsContent'
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton'
import ContentCard from '../../components/contentManagement/ContentCards'

const TestimonialsHomePage = () => {
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="h-screen w-full overflow-hidden">
    <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide">
      <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Testimonials</h1>
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
