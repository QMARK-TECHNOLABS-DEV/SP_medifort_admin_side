import React from "react";
import { PiLinkSimpleHorizontal } from "react-icons/pi";

const AddModal = ({
  isAdding,
  isEditing,
  newVideo,
  onAddChange,
  onDateChange,
  onSubmit,
  onClose,
  onReset
}) => {

  const handleOverlayClick = (e) => {
    
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick} // Apply overlay click handler
    >
      <div
        className="bg-white p-6 rounded-lg"
        style={{
          width: "400px", 
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to overlay
      >
        <h2 className="text-2xl font-semibold mb-4 text-left">
          {isAdding ? "Add New" : "Edit Video"}
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-left">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newVideo.title}
              onChange={onAddChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-300"
              placeholder="Enter Title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-left flex-grow">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={newVideo.date}
              onChange={onDateChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-left">
              YouTube Link
            </label>
            <div className="relative">
              <PiLinkSimpleHorizontal className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="text"
                name="ytlink"
                value={newVideo.ytlink}
                onChange={onAddChange}
                className="w-full pl-8 p-2 border border-gray-300 rounded-lg bg-gray-300"
                placeholder="https://www.youtube.com/watch?v="
                required
              />
            </div>
          </div>
          <div className="flex justify-start items-center space-x-4">
            <button
              type="submit"
              className="bg-white hover:border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              {isAdding ? "Add" : "Save"}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="bg-white hover:border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
