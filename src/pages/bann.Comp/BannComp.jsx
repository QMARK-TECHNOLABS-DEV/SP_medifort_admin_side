import React, { useState, useRef } from 'react';

const AddBanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      setErrorMessage(true);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      setErrorMessage(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click
  };

  const handleCancelClick = () => {
    setSelectedFile(null);
    setErrorMessage(false);
    fileInputRef.current.value = null;
  };

  return (
    <div className="w-full p-6 relative">
      <h1 className="text-lg font-semibold text-gray-800 mb-4 text-left">
        Content management &gt; Add Banner
      </h1>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg h-48 md:h-72 flex flex-col justify-center items-center bg-gray-50 relative cursor-pointer w-full"
        onClick={handleUploadClick} // Trigger file input click when canvas is clicked
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
          className="hidden" // Hide the file input element
          onChange={handleFileChange} 
        />
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          <button 
            onClick={handleUploadClick}
            className="bg-pink-500 text-white text-sm px-4 py-2 rounded-full hover:bg-pink-600"
          >
            Upload from Computer
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
