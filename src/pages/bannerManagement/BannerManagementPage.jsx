import React, { useState, useEffect } from 'react';
import content1 from '../../assets/contentManagement/preventive.jpg';
import ContentCard from '../../components/contentManagement/ContentCards';
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton';
import axios from '../../axios-folder/axios';
import { bannerRoute } from '../../utils/Endpoint';

const BannerManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const contentItems = [
    { imageSrc: content1, title: 'Home Banner', url: "/banner-management/banner" }
  ];



  const fetchPanels = async () => {
    try {
      const res = await axios.get(bannerRoute)

      if (res.status === 200) {
        const data = {}
        const banners = res.data.banners;

        for (const banner of banners) {
          if (!banner.panel || !banner?.image?.location || Object.keys(data)?.includes(banner.panel)) {
            continue;
          }
          else {
            data[banner.panel] = banner?.image?.location
          }
        }

        setData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    fetchPanels()
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
            Object?.keys(data)?.map((item, index) => (
              <div key={index} className='capitalize'>
                <ContentCard imageSrc={data[item]} title={item} url={`/banner-management/${item}`} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BannerManagementPage;
