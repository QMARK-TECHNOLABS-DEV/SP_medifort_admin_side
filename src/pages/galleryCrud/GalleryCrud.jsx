"use client"
import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router";
import gallery from "../../assets/Gallery/gallery.png";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { toast } from 'react-toastify';
import { galleryRoute,getAllGalleriesRoute,updateGalleryRoute,uploadRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
// import '../../../src/index.css'

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
// SVG Edit Icon Component
const EditIcon = () => (
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
      d="M15.232 5.232a3 3 0 114.242 4.242l-9 9a3 3 0 01-1.414.707l-3 1a1 1 0 01-1.257-1.257l1-3a3 3 0 01.707-1.414l9-9z"
    />
  </svg>
);



const Gallery = () => {
  
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddBox, setShowAddBox] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageSize, setImageSize] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const fileInputRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const [galleryIds, setGalleryIds] = useState([]); // Track gallery IDs
  const [editingImageIndex, setEditingImageIndex] = useState(null);
const [editingImageName, setEditingImageName] = useState("");
const [editingImageFile, setEditingImageFile] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbsItems = [
    { label: "Media", href: "/content-management/media" },
    { label: "Gallery", href: "/content-management/media/gallery" },
  ];

  //handleEdit image
  const handleEditImage = (index) => {
    setEditingImageIndex(index); // Set the image index to be edited
    setEditingImageName(images[index].caption); // Set the current caption
    setEditingImageFile(null); // Reset the image file input
    setIsModalOpen(true); // Open the modal
  };
  const handleSelectImage = (index) => {
    setSelectedImage(index);
  };

  const toggleAddBox = () => {
    setShowAddBox(prevState => !prevState); // Toggle visibility
  };
  
  
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    
      setEditingImageFile(file);
  };
  
  
  const closeModal = () => {
    setIsModalOpen(false);
};

//handleUpdateImage
const handleUpdateImage = async () => {
  if (editingImageIndex === null) return;

  const imageId = images[editingImageIndex]._id; // Get the ID from the selected image
  const formData = new FormData();
  formData.append('caption', editingImageName); // Add caption to form data
  if (editingImageFile) {
    formData.append('image', editingImageFile); // Add image file if provided
  }

  try {
    const response = await axiosPrivate.put(`${updateGalleryRoute}/${imageId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Check the response status and handle it
    if (response.status !== 200) {
      toast.error(`Error: ${response.data.msg}`);
      return;
    }

    const updatedImage = response.data.gallery;

    // Update the images array with the edited image data
    const updatedImages = [...images];
    updatedImages[editingImageIndex] = updatedImage;
    setImages(updatedImages);

    // Close the modal and reset editing state
    setIsModalOpen(false);
    setEditingImageIndex(null);
    setEditingImageName('');
    setEditingImageFile(null);
    toast.success(response.data.msg);
  } catch (error) {
    console.error("Failed to edit image:", error);
    toast.error("Something went wrong");
  }
};

//handleImageChange
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
  
  //fetGalleryData
  useEffect(() => {
    // Fetch gallery data from the backend
    const fetchGalleryData = async () => {
      try {
        const response = await axiosPrivate.get(getAllGalleriesRoute);
        if (response?.status === 200) {
          // Assuming `data.galleries` contains an array of gallery objects with `url` properties
          const galleries = response?.data?.galleries;
        
          setImages(galleries);
          console.log(galleries); 
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchGalleryData();
  }, []);
  
  const handleAddImage = async () => {
    if (!newImage && !fileInputRef.current?.files[0]) {
      console.error("No image selected!");
      return; // Ensure an image is selected before proceeding
    }
  
    const formData = new FormData();
    const file = fileInputRef.current?.files[0]; // Get file from the input
  
    formData.append("image", file);
    formData.append("caption", imageName);
  
    try {
      const response = await axiosPrivate.post(galleryRoute, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const addedImage = response.data.gallery;
  
      // Add the full image object to the images array
      if (addedImage) {
        setImages((prevImages) => [...prevImages, addedImage]);
      }
  
      toast.success("Image added successfully!");
      closeAddBox(); // Close the add image box after successful addition
  
      // Reset form fields after successful image upload
      setImageName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
      }
    } catch (error) {
      toast.error("Failed to add image. Please try again.");
      console.error("Error in uploading image:", error);
    }
  };
  
//handleDeleteImage

const handleRemoveImage = async (galleryId, index) => {
  if (!galleryId) {
    console.log("Gallery ID is undefined. Aborting delete operation.");
    return;
  }
  
  console.log("Deleting image with ID:", galleryId);

  try {
    await axiosPrivate.delete(`${galleryRoute}/${galleryId}`);
    
    const updatedImages = [...images];
    const updatedIds = [...galleryIds];
    updatedImages.splice(index, 1);
    updatedIds.splice(index, 1);
    
    setImages(updatedImages);
    setGalleryIds(updatedIds);
    toast.success("Image deleted successfully!");
    
  } catch (error) {
    console.log("Error in deleting image", error);
    toast.error("Failed to delete image. Please try again.");
  }
};
  
  const handleViewImage = (src) => {
    setCurrentImage(src);
    setShowImageModal(true);
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

  const handleReset = () => {
    setNewImage(null);
    setImageName("");
    setImageSize(0);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setCurrentImage(null);
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
<div className="grid grid-cols-3 gap-x-5 gap-y-6 mt-4 px-2 py-2 -ml-9 -mr-6">
  {images.map((item, index) => (
    <div
      key={index}
      onClick={() => handleSelectImage(index)}
      className={`relative border-2 ${
        selectedImage === index ? "border-blue-400" : "border-transparent"
      } cursor-pointer`}
      style={{ marginTop: '-5px' }}
    >
      {item.image && item.image.location ? ( // Check if item.image and item.image.location exist
        <img
          src={item.image.location} // Correct image source
          alt={`Gallery ${index}`}
          className="w-full h-[130px] object-cover"
          onClick={() => handleViewImage(item.image.location)}
        />
      ) : (
        <div className="w-full h-[130px] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      {/* Optional edit and delete buttons */}
      <div className="absolute top-2 right-2 space-y-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditImage(index);
          }}
          className="text-gray-600 hover:text-primaryColor"
        >
          <EditIcon />
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md relative w-80">
              <h3 className="text-lg mb-4">Edit Image</h3>
              <input
                type="text"
                value={editingImageName}
                onChange={(e) => setEditingImageName(e.target.value)}
                className="border p-2 mb-4 w-full"
                placeholder="Edit caption"
              />
              <input
                type="file"
                onChange={handleEditFileChange}
                className="mb-4"
                accept="image/*"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleUpdateImage}
                  className="bg-primaryColor text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="text-gray-500 px-4 py-2 rounded hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveImage(item._id, index);
          }}
          className="text-gray-600 hover:text-primaryColor"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  ))}
</div>

</div>
    </div>
  );
};

export default Gallery;
