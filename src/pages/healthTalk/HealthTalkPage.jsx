import React from 'react'
import ContentCard from '../../components/contentManagement/ContentCards';

import content1 from '../../assets/contentManagement/Content 1.png';
import content2 from '../../assets/contentManagement/Content 2.jpeg';
import content3 from '../../assets/contentManagement/Content 3.png';


function HealthTalkPage() {
    const contentItems = [
        { imageSrc: content1, title: 'Article',url:"/article" },
        { imageSrc: content2, title: 'Video',url:"" },
        { imageSrc: content3, title: 'Research',url:"/research" },
       
      ];
    
      return (
        <div className="h-screen w-full overflow-hidden"> 
          <div className="flex-1 h-full pb-32 overflow-y-auto"> 
            <h1 className="text-2xl text-left md:text-4xl text-[#424242] md:font-[350] my-5">Health Talk</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> 
              {contentItems.map((item, index) => (
                <ContentCard key={index} imageSrc={item.imageSrc} title={item.title} url={item.url} />
              ))}
            </div>
          </div>
        </div>
      );
    };

export default HealthTalkPage