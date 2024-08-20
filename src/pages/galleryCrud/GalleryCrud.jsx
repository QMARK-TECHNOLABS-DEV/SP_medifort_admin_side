import React, { useState, useRef } from "react";
import gallery from "../../assets/Gallery/gallery.png";

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
  const fileInputRef = useRef(null); // Reference to the file input element

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
      closeAddBox();  // Close the box after adding the image
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setImageName("");
    setImageSize(0);
  };

  const closeAddBox = () => {
    setNewImage(null);
    setImageName("");
    setImageSize(0);
    setShowAddBox(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // Trigger the file input click programmatically
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
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg text-gray-500">
          <span>Content management</span> &gt; <span className="text-black">Gallery</span>
        </div>
        <button
          onClick={toggleAddBox}
          className="border border-pink-500 text-pink-500 px-4 py-2 rounded"
        >
          + Add new
        </button>
      </div>

      {showAddBox && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md shadow-md relative w-80"> {/* Reduced width here */}
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
                  ref={fileInputRef} // Set the reference
                />
              </div>
            </div>

            {newImage && (
              <div className="mb-4 text-sm text-gray-600 flex items-center">
                <div>
                  <span>{imageName} ({imageSize} MB)</span>{" "}
                  <span className="text-pink-500 cursor-pointer" onClick={() => handleViewImage(newImage)}>
                    View
                  </span>{" "}
                  {" "}
                  <span className="text-gray-900 cursor-pointer" onClick={handleRemoveImage}>
                    Remove
                  </span>
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            )}

            <div className="flex justify-start space-x-4">
              <button
                onClick={handleAddImage}
                className="border border-pink-500 text-pink-500 px-4 py-2 rounded"
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

      <div className="flex-1 overflow-y-auto max-h-[70vh]">
        <div className="grid grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => handleSelectImage(index)}
              className={`border-2 ${
                selectedImage === index ? "border-blue-400" : "border-transparent"
              } cursor-pointer`}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-[300px] h-[130px] object-cover"
                onClick={() => handleViewImage(src)} // Open the image modal on click
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
