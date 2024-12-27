import React, { useRef, useState } from "react";
import { PiLinkSimpleHorizontal } from "react-icons/pi";
import axios from "../../axios-folder/axios";
import { uploadRoute } from "../../utils/Endpoint";
import { toast } from "react-toastify";

const AddMediaVid = ({
  isAdding,
  isEditing,
  newVideo,
  setNewVideo,
  onAddChange,
  onDateChange,
  onSubmit,
  onClose,
  onReset
}) => {

  const [uploading, setUploading] = useState(false)
  const [isYoutube, setIsYoutube] = useState(() => {
    if (newVideo?.attachment) {
      return false
    }
    return true
  })

  const handleOverlayClick = (e) => {

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const fileInputRef = useRef()
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const MAX_FILE_SIZE = 101 * 1024 * 1024; // 101 MB

  const handleFileUpload = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0];

      if (file && file.size < MAX_FILE_SIZE) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await axios.post(uploadRoute, formData)

        if (res.status === 200) {
          setNewVideo((prev) => ({ ...prev, attachment: res.data.file, ytlink: "" }))
        }
      }
      else {
        toast.info('File size exceeded the limit')
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setUploading(false)
    }
  }

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

          <div className="mb-4 flex flex-col">
            <label className="text-left">Choose a method</label>
            <select
              value={isYoutube}
              onChange={(e) => setIsYoutube(e.target.value === "true")}
              className="py-2 outline-none border border-dashed "
            >
              <option value="true">Add YouTube Link</option>
              <option value="false">Upload Video</option>
            </select>

          </div>

          {
            isYoutube === true
              ?
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
                  />
                </div>
              </div>

              :

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-600 text-left">
                  Upload Video (Max. Size 100 MB)
                </label>
                <div className="border border-gray-300 rounded-md p-2 flex items-center justify-between
               relative bg-gray-300 ">
                  <span
                    className="text-gray-500 cursor-pointer flex items-center"
                    onClick={handleBrowseClick}
                  >
                    🔗 {newVideo?.attachment?.name || "Browse computer"}
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    ref={fileInputRef}
                  />
                </div>
              </div>

          }


          <div className="flex justify-start items-center space-x-4">
            <button
              type="submit"
              className="bg-white hover:border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              {
                uploading
                  ?
                  'loading'
                  :
                  (isAdding ? "Add" : "Save")
              }
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

export default AddMediaVid;