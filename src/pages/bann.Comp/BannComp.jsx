import React, { useState, useRef } from 'react';
import Breadcrumbs from "../../components/common/Breadcrumbs";
import uploadFile from '../../hooks/uploadFile';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { uploadBanner } from '../../utils/Endpoint';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddBanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({
    image: {},
    title: "", 
    subtitle: "", 
    title: "", 
    title: "", 
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
        setUploadedFile((prev) => ({
          ...prev,
          image: uploadResponse,
        }));
      } catch (error) {
        toast.error("Failed to upload file. Please try again.");
        console.error("Upload error:", error);
      }
    }
  };

  const handleTitleChange = (e) => {
    setUploadedFile((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const breadcrumbsItems = [
    { label: "Home Banner", href: "/banner-management/banner" },
    { label: "Add Banner", href: "/banner-management/banner/add-banner" },
  ];

  const handleUploadClick = async (e) => {
    e.preventDefault();
    if (uploadedFile.image && uploadedFile.title) {
      try {
        const res = await axiosPrivateHook.post(uploadBanner, uploadedFile);
        if (res.status === 200) {
          toast.success("Banner uploaded successfully");
          navigate("/banner-management/banner");
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
    setUploadedFile({ image: "", title: "" });
    setErrorMessage(false);
    fileInputRef.current.value = null;
    navigate("/banner-management/banner");
  };

  return (
    <div className="w-full relative">
      {/* Title */}
      <h1 className="text-2xl font-bold text-primaryColor text-left lg:hidden">
        Add Banner
      </h1>

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      {/* Title Input Field */}
      <div className="mt-4">
        <label className="block text-sm text-left font-medium text-gray-700">
          Banner Title
        </label>
        <input
          type="text"
          value={uploadedFile.title}
          onChange={handleTitleChange}
          placeholder="Enter banner title"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
        />
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
              Click here to browse or drag and drop image
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
