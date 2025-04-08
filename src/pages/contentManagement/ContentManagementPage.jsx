import React, { useState, useEffect } from 'react';
import ContentCard from '../../components/contentManagement/ContentCards';
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton';

import content1 from '../../assets/contentManagement/preventive.jpg';
import content2 from '../../assets/contentManagement/Healthtalk.png';
import content4 from '../../assets/contentManagement/Content 4.png';
import content7 from '../../assets/contentManagement/mediaa.jpg';
import content8 from '../../assets/contentManagement/casestudy.jpg';
import blogs from '../../assets/contentManagement/blogs.jpg';
import Specialties from '../../assets/contentManagement/Specialties.webp';

const ContentManagementPage = () => {
  const [loading, setLoading] = useState(true);

  const contentItems = [
    { imageSrc: content1, title: 'Preventive Health', url: "/content-management/preventive-health" },
    { imageSrc: content2, title: 'Health talk', url: "/content-management/health-talk" },
    { imageSrc: content4, title: 'News', url: "/content-management/news" },
    { imageSrc: content7, title: 'Media', url: "/content-management/media" },
    { imageSrc: content8, title: 'Doctor case studies', url: "/content-management/casestudies" },
    { imageSrc: blogs, title: 'Blogs', url: "/content-management/blogs" },
    { imageSrc: Specialties, title: 'Specialties', url: "/content-management/specialities" },
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide">
        <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Content Management</h1>
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
  );
};

export default ContentManagementPage;
