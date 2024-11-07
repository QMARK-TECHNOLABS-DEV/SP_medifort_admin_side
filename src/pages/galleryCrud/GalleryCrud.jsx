import React, { useState, useRef } from "react";
import gallery from "../../assets/Gallery/gallery.png";
import Breadcrumbs from "../../components/common/Breadcrumbs";

// SVG Trash Icon Component
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a2 2 0 012-2h4a2 2 0 012 2v3"
    />
  </svg>
);

const initialImages = [
  gallery, gallery, gallery, gallery, gallery, gallery, gallery, gallery, gallery
];

const Gallery = () => {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddBox, setShowAddBox] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageSize, setImageSize] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const fileInputRef = useRef(null);

  const breadcrumbsItems = [
    { label: "Media", href: "/content-management/media" },
    { label: "Gallery", href: "/content-management/media/gallery" },
  ];

  const handleSelectImage = (index) => {
    setSelectedImage(index);
  };

  const toggleAddBox = () => {
    setShowAddBox(!showAddBox);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      setImageSize((file.size / (1024 * 1024)).toFixed(2)); // Size in MB
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (newImage) {
      setImages([...images, newImage]);
      closeAddBox();
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const closeAddBox = () => {
    setNewImage(null);
    setImageName("");
    setImageSize(0);
    setShowAddBox(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleViewImage = (src) => {
    setCurrentImage(src);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setCurrentImage(null);
  };

  const handleReset = () => {
    setNewImage(null);
    setImageName("");
    setImageSize(0);
  };

  return (
    <div className="min-h-screen flex flex-col w-full px-2 py-4"> {/* Reduced padding */}
      <h1 className="text-2xl font-bold text-primaryColor lg:hidden mt-[-10px] sm:mt-[-20px] text-left -ml-4">
        Gallery
      </h1>

      {/* Header and Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:-mt-4 -ml-4">
        <div className="text-lg text-gray-500 mb-2 sm:mb-0">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
        <button
          onClick={toggleAddBox}
          className="border border-primaryColor text-primaryColor bg-white px-4 py-2 rounded-xl w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto"
        >
          + Add new
        </button>
      </div>

      {showAddBox && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md shadow-md relative w-80">
            <h2 className="text-lg mb-4 text-left">Add New</h2>

            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-600 text-left">Upload image</label>
              <div className="border border-gray-300 rounded-md p-2 flex items-center justify-between relative">
                <span
                  className="text-gray-500 cursor-pointer flex items-center"
                  onClick={handleBrowseClick}
                >
                  🔗 {imageName || "Browse computer"}
                </span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  ref={fileInputRef}
                />
              </div>
            </div>

            {newImage && (
              <div className="mb-4 text-sm text-gray-600">
                <div>
                  <span>{imageName} ({imageSize} MB)</span>{" "}
                  <span className="text-primaryColor cursor-pointer" onClick={() => handleViewImage(newImage)}>
                    View
                  </span>{" "}
                  {" "}
                  <span className="text-gray-900 cursor-pointer" onClick={handleReset}>
                    Remove
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-start space-x-4">
              <button
                onClick={handleAddImage}
                className="border border-primaryColor text-primaryColor px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={handleReset}
                className="bg-transparent text-gray-1000 px-4 py-2 rounded hover:text-gray-1200"
              >
                Reset
              </button>
              <button
                onClick={closeAddBox}
                className="bg-transparent text-gray-1000 px-4 py-2 rounded hover:text-gray-1200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-md relative w-1/2">
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <img
              src={currentImage}
              alt="View"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto scrollbar-hidden max-h-[70vh]"
        style={{
          overflowY: 'auto',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        <div className="grid grid-cols-3 gap-x-5 gap-y-6 mt-4  px-2 py-2 -ml-9 -mr-6"> {/* Reduced gap between grid items */}
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => handleSelectImage(index)}
              className={`relative border-2 ${
                selectedImage === index ? "border-blue-400" : "border-transparent"
              } cursor-pointer`}
              style={{ marginTop: '-5px' }} // Adjust this value if needed
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-[130px] object-cover"
                onClick={() => handleViewImage(src)}
              />
              {index >= initialImages.length && (
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 text-white p-1"
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
