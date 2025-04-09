import React, { useState, useEffect } from 'react';
import content1 from '../../assets/contentManagement/preventive.jpg';
import ContentCard from '../../components/contentManagement/ContentCards';
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton';
import axios from '../../axios-folder/axios';
import { bannerRoute } from '../../utils/Endpoint';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/common/SearchInput';
import PageHeaderpart from '../../components/common/PageHeaderpart';

const BannerManagementPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const contentItems = [
    { imageSrc: content1, title: 'Home Banner', url: "/banner-management/banner" }
  ];

  const breadcrumbsItems = [
    { label: "Home", href: "/" },
    { label: "Banner Management", href: "/banner-management" },
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
      <header>
      <PageHeaderpart
    items={breadcrumbsItems}
    pageTitle={"Banner Management"}
    >
      <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
      <button
          onClick={()=> navigate("/banner-management/add")}
          className="border-primaryColor bg-white text-primaryColor text-sm px-4 py-2 rounded-xl border-2 mt-2 w-[calc(100%+20px)] lg:w-auto lg:ml-0 ml-[-10px]"
        >
          + Add Banner
        </button>
      </div>
    </PageHeaderpart>
      </header>
      <div className="flex-1 h-full pb-80 overflow-y-auto scrollbar-hide">
        {/* <div className='flex items-center justify-between'>
        <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Banner Management</h1>

    
        </div> */}

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
