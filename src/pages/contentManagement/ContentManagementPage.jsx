import React from 'react';
import ContentCard from '../../components/contentManagement/ContentCards';

import content1 from '../../assets/contentManagement/preventive.jpg';
import content2 from '../../assets/contentManagement/Healthtalk.png';

import content4 from '../../assets/contentManagement/Content 4.png';
import content5 from '../../assets/contentManagement/Content 1.png';
import content6 from '../../assets/contentManagement/Content 6.png';
import content7 from '../../assets/contentManagement/mediaa.jpg';
import content8 from '../../assets/contentManagement/casestudy.jpg';
import content9 from '../../assets/contentManagement/depart.png';


const ContentManagementPage = () => {
  const contentItems = [
    { imageSrc: content1, title: 'Preventive Health' ,url:"/preventive-health" },
    { imageSrc: content2, title: 'Health talk',url:"/content-management/health-talk" },

    { imageSrc: content4, title: 'News',url:"/news" },
    { imageSrc: content5, title: 'Gallery',url:"/gallery" },
    { imageSrc: content6, title: 'Banners',url:"/banner" },
    { imageSrc: content7, title: 'Media',url:"/media" },
    { imageSrc: content8, title: 'Doctor case studies',url:"/casestudies" },
    { imageSrc: content9, title: 'Departments',url:"/department" },
  ];

  return (
    <div className="h-screen w-full overflow-hidden"> 
      <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide"> 
        <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Content Management</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> 
          {contentItems.map((item, index) => (
            <ContentCard key={index} imageSrc={item.imageSrc} title={item.title}  url={item.url}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
