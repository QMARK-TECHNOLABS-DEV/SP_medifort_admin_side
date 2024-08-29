import React from 'react';
import ContentCard from '../../components/contentManagement/ContentCards';
import Breadcrumbs from "../../components/common/Breadcrumbs";

import content1 from '../../assets/contentManagement/Content 1.png';
import content2 from '../../assets/contentManagement/Content 2.jpeg';
import content3 from '../../assets/contentManagement/Content 3.png';

function HealthTalkPage() {
    const contentItems = [
        { imageSrc: content1, title: 'Article', url: "/content-management/article" },
        { imageSrc: content2, title: 'Video', url: "/content-management/video" },
        { imageSrc: content3, title: 'Research', url: "/content-management/research" },
    ];

    return (
        <div className="h-screen w-full overflow-hidden">
            {/* ----- Mobile view only--------- */}
            <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
                Health Talks
            </h1>
            <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide">
                <div className="p-2px"> {/* Reduced padding here */}
                    {/* Align Breadcrumbs to the left */}
                    <div className="flex flex-col items-start justify-start w-full"> 
                        <Breadcrumbs
                            items={[
                                { href: '/content-management', label: 'Content management' },
                                { href: '/content-management/health-talk', label: 'Health talk' },
                            ]}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 -ml-4 -mr-4 px-4"> {/* Reduced gap between cards */}
                    {contentItems.map((item, index) => (
                        <ContentCard key={index} imageSrc={item.imageSrc} title={item.title} url={item.url} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HealthTalkPage;
