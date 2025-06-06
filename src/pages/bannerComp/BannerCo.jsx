import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";

// Import images
import Homecare from "../../assets/banners/Homecare1.png";
import Testimonials from "../../assets/banners/Testimonials1.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { bannerRoute, uploadBanner } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/common/LoadingScreen";
import { FiEdit } from "react-icons/fi";
import PageHeaderpart from "../../components/common/PageHeaderpart";
import SearchInput from "../../components/common/SearchInput";

const ImageCard = ({ data, onDelete, onEdit }) => {
  return (
    <div className="relative rounded-lg shadow-md overflow-hidden h-40 w-full">
      <img src={data?.image?.location} alt='img' className="w-full h-full object-cover" />

      <span className="absolute top-2 left-2 bg-white text-gray-700 text-sm px-3 py-1 rounded">
        {data?.index}
      </span>

      <div className="absolute bottom-2 left-2 flex flex-col gap-4">
        <span className=" bg-white text-gray-700 text-sm px-3 py-1 rounded">
          {data?.title || 'NIL'}
        </span>
        <span className=" bg-white text-gray-700 text-sm px-3 py-1 rounded">
          {data?.subtitle || 'NIL'}
        </span>
      </div>

      <span className="absolute bottom-2 right-2 bg-white text-gray-700 text-sm px-3 py-1 rounded">
        {data?.screenType}
      </span>

      <div className="absolute top-2 right-2 flex items-center gap-4">
        <button
          onClick={onEdit}
          className=" bg-white p-2 rounded-full shadow-lg"
        >
          <FiEdit />
        </button>

        <button
          onClick={onDelete}
          className=" bg-white p-2 rounded-full shadow-lg"
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
    </div>
  );
};

const BannerCo = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const { panel } = useParams();
  const [search, setSearch] = useState('')
  const breadcrumbsItems = [
    { label: "Banner management", href: "/banner-management" },
    { label: `${panel}`, href: `/banner-management/${panel}` },
  ];

  const navigate = useNavigate();


  const handleAddBanner = () => {
    navigate("/banner-management/add");
  };

  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(bannerRoute)
      if (response?.status === 200) {
        console.log(response?.data?.banners)
        const filtered = response?.data?.banners?.filter(item => item.panel === panel)
        setData(filtered)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getData();
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, [panel]);

  const handleDelete = async (id) => {
    try {
      const res = await axiosPrivate.delete(`${uploadBanner}/${id}`);
      if (res.status === 200) {
        toast.success("Banner Delete Successfully")
      }
      getData()
    } catch (error) {
      console.error("Failed to submit banner", error);
      toast.error("An error occurred while saving the Banner.");
    }

    setData(data.filter((image) => image.id !== id));
  };
  if (loading) return (
    <div className="h-screen w-full overflow-hidden">

      <LoadingScreen />
    </div>
  )

  return (
    <div className="h-screen w-full overflow-hidden  mx-auto ">
      {/* Title */}
      {/* <h1 className="text-2xl font-bold text-primaryColor lg:hidden mb-4 mt-[-15px] text-left lg:ml-[-16px] ml-[-12px]">
        Banner
      </h1> */}

      <header>
        <PageHeaderpart
          items={breadcrumbsItems}
          pageTitle={"Home Banner"}
        >
          <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
            <SearchInput
              setSearch={setSearch}
            />

          </div>
        </PageHeaderpart>
      </header>
      <div className="pb-80 px-4 pt-4 overflow-y-auto h-full scrollbar-hide">

        {/* Image Grid */}
        <div className="w-full h-full">
          <div className="grid grid-cols-1 gap-6 -ml-3 -mr-3 py-2 pb-56">
            {data.map((item, index) => (
              <ImageCard
                key={index}
                data={item}
                onDelete={() => handleDelete(item._id)}
                onEdit={() => navigate(`/banner-management/edit/${item._id}`)}
              />
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default BannerCo;
