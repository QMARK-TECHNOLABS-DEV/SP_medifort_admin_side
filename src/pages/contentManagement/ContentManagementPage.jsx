import React from 'react';
import ContentCard from '../../components/contentManagement/ContentCards';

import content1 from '../../assets/contentManagement/Content 1.png';
import content2 from '../../assets/contentManagement/Content 2.jpeg';
import content3 from '../../assets/contentManagement/Content 3.png';
import content4 from '../../assets/contentManagement/Content 4.png';
import content5 from '../../assets/contentManagement/Content 5.jpeg';
import content6 from '../../assets/contentManagement/Content 6.png';
import content7 from '../../assets/contentManagement/Content 7.png';

const ContentManagementPage = () => {
  const contentItems = [
    { imageSrc: content1, title: 'Services' },
    { imageSrc: content2, title: 'Health talk' },
    { imageSrc: content3, title: 'Core management' },
    { imageSrc: content4, title: 'News' },
    { imageSrc: content5, title: 'Gallery' },
    { imageSrc: content6, title: 'Banners' },
    { imageSrc: content7, title: 'Our speciality' },
    { imageSrc: content1, title: 'Doctor case studies' },
    { imageSrc: content2, title: 'Departments' },
  ];

  return (
    <div className="h-screen w-full overflow-hidden"> 
      <div className="flex-1 h-full pb-32 overflow-y-auto"> 
        <h1 className="text-4xl text-left font-semibold mb-6">Content Management</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> 
          {contentItems.map((item, index) => (
            <ContentCard key={index} imageSrc={item.imageSrc} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
