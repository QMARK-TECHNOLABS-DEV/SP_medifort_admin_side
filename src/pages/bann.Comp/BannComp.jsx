import React, { useState, useRef, useEffect } from 'react';
import Breadcrumbs from "../../components/common/Breadcrumbs";
import uploadFile from '../../hooks/uploadFile';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { bannerRoute, uploadBanner } from '../../utils/Endpoint';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageData } from '../../data/PageData';
import axios from '../../axios-folder/axios';

const AddBanner = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const mode = pathname?.split('/')[2]

  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({
    image: {},
    title: "",
    subtitle: "",
    panel: "",
    index: 0,
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const fileInputRef = useRef(null);
  const axiosPrivateHook = useAxiosPrivate();
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      setErrorMessage(true);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      setErrorMessage(false);

      try {
        const uploadResponse = await uploadFile(file);
        setData((prev) => ({
          ...prev,
          image: uploadResponse,
        }));
      } catch (error) {
        toast.error("Failed to upload file. Please try again.");
        console.error("Upload error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const breadcrumbsItems = [
    { label: "Banner management", href: "/banner-management" },
    { label: `${mode} Banner`, href: `/banner-management/${mode}` },
  ];

  const handleUploadClick = async (e) => {
    e.preventDefault();
    if (data.image && data.title) {
      try {
        let res;

        if(mode === 'edit' && data?._id){
          res = await axiosPrivateHook.put(`${uploadBanner}/${data?._id}`, data);
        }
        else{
          res = await axiosPrivateHook.postt(uploadBanner, data);
        }

        if (res.status === 200) {
          toast.success("success");
          navigate("/banner-management");
        }
      } catch (error) {
        console.error("Failed to submit banner", error);
        toast.error("An error occurred while saving the Banner.");
      }
    } else {
      toast.error("Please add a title and upload a file first.");
    }
  };

  const handleCancelClick = () => {
    setSelectedFile(null);
    setData({
      image: {},
      title: "",
      subtitle: "",
      panel: "",
      index: 0,
    });
    setErrorMessage(false);
    fileInputRef.current.value = null;
    navigate("/banner-management");
  };

  const getABanner = async (id) => {
    try {
      const res = await axios.get(`${bannerRoute}/${id}`)

      if (res.status === 200) {
        setData(res.data.banner)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (mode === 'edit') {
      const id = pathname.split("/")[3]
      getABanner(id)
    }
  }, [mode, pathname])

  return (
    <div className="w-full relative">
      {/* Title */}
      <h1 className="text-2xl font-bold text-primaryColor text-left lg:hidden capitalize ">
        {mode} Banner
      </h1>

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      {/* Title Input Field */}
      <div className="mt-4">
        <label className="block text-sm text-left font-medium text-gray-700">
          Title
        </label>
        <input
          name='title'
          type="text"
          value={data.title}
          onChange={handleChange}
          placeholder="Enter banner title"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm text-left font-medium text-gray-700">
          Subtitle
        </label>
        <input
          name='subtitle'
          type="text"
          value={data.subtitle}
          onChange={handleChange}
          placeholder="Enter banner subtitle"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
        />
      </div>

      <div className='flex flex-col sm:flex-row items-center gap-4'>
        <div className="mt-4">
          <label className="block text-sm text-left font-medium text-gray-700">
            Panel
          </label>
          <select
            name='panel'
            value={data?.panel}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
          >
            {
              PageData?.map((item, index) => (
                <option key={index} value={item?.panel}>{item?.panel}</option>
              ))
            }
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm text-left font-medium text-gray-700">
            Index
          </label>
          <input
            type="number"
            min={0}
            name='index'
            value={data.index}
            onChange={handleChange}
            placeholder="Enter banner index"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
          />
        </div>
      </div>

      {/* File Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg h-48 md:h-72 flex flex-col justify-center items-center bg-gray-50 relative cursor-pointer w-full mt-4"
        onClick={() => fileInputRef.current.click()}
      >
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="mt-2 text-sm text-gray-600">
              Click here to browse image
            </span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Buttons and Info */}
      <div className="items-center justify-between mt-6 flex">
        <div>
          <button
            onClick={handleUploadClick}
            className="border-primaryColor text-primaryColor text-sm px-4 py-2 mx-4 rounded-xl border-2"
          >
            Upload
          </button>
          <button
            onClick={handleCancelClick}
            className="text-gray-600 text-sm ml-4"
          >
            Cancel
          </button>
        </div>
        <div className="text-sm text-right">
          <div className="flex items-center">
            {errorMessage && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-red-500 mr-1"
              >
                <circle cx="12" cy="12" r="10" fill="red" />
                <text x="12" y="16" fontSize="14" textAnchor="middle" fill="white">!</text>
              </svg>
            )}
            <p className={errorMessage ? "text-red-500" : "text-gray-500"}>
              Max file size: 50 MB
            </p>
          </div>
          <p className="text-gray-500 mt-1">Resolution: 1920 x 220</p>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
