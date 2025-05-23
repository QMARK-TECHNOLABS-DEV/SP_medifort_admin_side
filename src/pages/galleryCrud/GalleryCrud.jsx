import React, { useState, useRef, useEffect } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { toast } from 'react-toastify';
import { galleryRoute, getAllGalleriesRoute, updateGalleryRoute, uploadRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import LoadingScreen from "../../components/common/LoadingScreen";
// import '../../../src/index.css'
import { RiCloseCircleFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import useImageCompression from "../../hooks/useImageCompression";
import PageHeaderpart from "../../components/common/PageHeaderpart";


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
  const [editingCaption, setEditingCaption] = useState("");
  const [editingImageFile, setEditingImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [caption, setCaption] = useState("")
const {compressImage} = useImageCompression()
  const breadcrumbsItems = [
    { label: "Our Media", href: "/content-management/media" },
    { label: "Gallery", href: "/content-management/media/gallery" },
  ];

  //handleEdit image
  const handleEditImage = (index) => {
    setEditingImageIndex(index); // Set the image index to be edited
    setEditingCaption(images[index].caption); // Set the current caption
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
    formData.append('caption', editingCaption); // Add caption to form data
    if (editingImageFile) {
      const compressedFile = await compressImage(editingImageFile);
      formData.append('image', compressedFile); // Add image file if provided
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
      setEditingCaption('');
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
        setLoading(true)
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

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddImage = async () => {
    if (!newImage && !fileInputRef.current?.files[0]) {
      console.error("No image selected!");
      return; // Ensure an image is selected before proceeding
    }

    const formData = new FormData();
    const file = fileInputRef.current?.files[0]; // Get file from the input
    const compressedFile = await compressImage(file);
    formData.append("image", compressedFile);
    formData.append("caption", caption);

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

  if (loading) return (
    <div className="h-screen w-full overflow-hidden">

      <LoadingScreen />
    </div>
  )

  return (
    <div className="h-screen w-full overflow-hidden  mx-auto ">
     <header>
          <PageHeaderpart
            items={breadcrumbsItems}
            pageTitle={"Gallery"}
          >
            <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
            <button
          onClick={toggleAddBox}
          className="border border-primaryColor text-primaryColor bg-white px-4 py-2 rounded-xl w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto"
        >
          + Add new
        </button>

            </div>
          </PageHeaderpart>
        </header>

    
      <div className="pb-80 overflow-y-auto h-full scrollbar-hide">
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

            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-600 text-left">Caption</label>
              {/* <div className="border border-gray-300 rounded-md p-2 flex items-center justify-between relative"> */}
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Type here"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {/* </div> */}
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
        <div className="fixed h-screen inset-0 flex items-center justify-center z-20 bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-md relative w-1/2 max-h-screen ">
            <RiCloseCircleFill
              onClick={closeImageModal}
              size={24}
              className="z-40 absolute top-2 right-2 text-red-900"
            />
            <img
              src={currentImage}
              alt="View"
              className="w-full "
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
              className={`relative border-2 ${selectedImage === index ? "border-blue-400" : "border-transparent"
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
              <div className="absolute top-2 right-4 gap-2 flex">

                <FiEdit
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditImage(index);
                  }}
                  className="text-blue-900"
                />

                <FaRegTrashAlt
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(item._id, index);
                  }}
                  className="text-red-900"
                />

              </div>
            </div>
          ))}
        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md relative w-80">
            <h3 className="text-lg mb-4">Edit Image</h3>
            <input
              type="text"
              value={editingCaption}
              onChange={(e) => setEditingCaption(e.target.value)}
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
    </div>
    </div>
  );
};

export default Gallery;
