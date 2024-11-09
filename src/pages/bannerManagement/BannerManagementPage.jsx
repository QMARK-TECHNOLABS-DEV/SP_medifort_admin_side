import React, { useState, useEffect } from 'react';
import content1 from '../../assets/contentManagement/preventive.jpg';
import ContentCard from '../../components/contentManagement/ContentCards';
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton';

const BannerManagementPage = () => {
  const [loading, setLoading] = useState(true);

  const contentItems = [
    { imageSrc: content1, title: 'Home Banner', url: "/banner-management/banner" }
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide">
        <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Banner Management</h1>
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

export default BannerManagementPage;
