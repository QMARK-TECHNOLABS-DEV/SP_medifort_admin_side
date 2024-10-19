import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";

// Import images
import Homecare from "../../assets/banners/Homecare1.png";
import Testimonials from "../../assets/banners/Testimonials1.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { bannerRoute } from "../../utils/Endpoint";

const ImageCard = ({data, onDelete }) => {
  return (
    <div className="relative rounded-lg shadow-md overflow-hidden h-40 w-full">
      <img src={data?.image?.location} alt='img' className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-2 bg-white text-gray-700 text-sm px-3 py-1 rounded">
        {data?.title}
      </div>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m3 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6h12zm-5 4v6m-4-6v6"
          />
        </svg>
      </button>
    </div>
  );
};

const BannerCo = () => {
  const [data, setData] = useState([
    // { id: 1, src: Homecare, label: "Homecare.png" },
    // { id: 2, src: Testimonials, label: "Testimonials.png" },
    // { id: 3, src: Homecare, label: "Homecare.png" },
  ]);
  const breadcrumbsItems = [
    { label: "Content management", href: "/content-management" },
    { label: "Banner", href: "/content-management/banner" },
  ];

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setData(data.filter((image) => image.id !== id));
  };

  const handleAddBanner = () => {
    navigate("/content-management/banner/add-banner");
  };

  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(bannerRoute)
      if (response?.status === 200) {
        console.log(response?.data?.banners)
        setData(response?.data?.banners)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="px-4 pt-4 w-full h-screen overflow-auto relative">
      {/* Title */}
      <h1 className="text-2xl font-bold text-primaryColor lg:hidden mb-4 mt-[-15px] text-left lg:ml-[-16px] ml-[-12px]">
        Banner
      </h1>

      {/* Breadcrumbs and Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-[-25px] mb-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 space-x-0 lg:space-x-2 mb-2 mt-2 lg:mb-0 text-left lg:ml-[-16px] ml-[-12px]">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
        <button
          onClick={handleAddBanner}
          className="border-primaryColor bg-white text-primaryColor text-sm px-4 py-2 rounded-xl border-2 mt-2 w-[calc(100%+20px)] lg:w-auto lg:ml-0 ml-[-10px]"
        >
          + Add Banner
        </button>
      </div>

      {/* Image Grid */}
      <div className="w-full h-full">
        <div className="grid grid-cols-1 gap-6 -ml-3 -mr-3 py-2 pb-56">
          {data.map((item, index) => (
            <ImageCard
              key={index}
              data={item}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      </div>

      {/* Hidden scrollbar styling */}
      <style jsx global>{`
        body {
          overflow: auto;
          scrollbar-width: none; /* Firefox */
        }
        ::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
};

export default BannerCo;
