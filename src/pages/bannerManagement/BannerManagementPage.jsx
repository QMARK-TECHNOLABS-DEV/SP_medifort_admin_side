import React from 'react';
import content1 from '../../assets/contentManagement/preventive.jpg';
import ContentCard from '../../components/contentManagement/ContentCards';
const BannerManagementPage = () => {
    const contentItems = [
        { imageSrc: content1, title: 'Home Banner', url: "/banner-management/banner" }
       
      ];
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide">
        <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Content Management</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2px"> {/* Added vertical gap */}
          {contentItems.map((item, index) => (
            <div key={index}>
              <ContentCard imageSrc={item.imageSrc} title={item.title} url={item.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BannerManagementPage
