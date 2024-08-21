import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";

// Import images
import Homecare from "../../assets/banners/Homecare1.png";
import Testimonials from "../../assets/banners/Testimonials1.png";

const ImageCard = ({ image, label, onDelete }) => {
  return (
    <div className="relative rounded-lg shadow-md overflow-hidden h-40 w-full ">
      <img src={image} alt={label} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-2 bg-white text-gray-700 text-sm px-3 py-1 rounded">
        {label}
      </div>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
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
  );
};

const BannerCo = () => {
  const [images, setImages] = useState([
    { id: 1, src: Homecare, label: "Homecare.png" },
    { id: 2, src: Testimonials, label: "Testimonials.png" },
    { id: 3, src: Homecare, label: "Homecare.png" },
  ]);
  const breadcrumbsItems = [
    { label: "Content management", href: "/content-management" },
    { label: "Banner", href: "/banner" },
  ];

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handleAddBanner = () => {
    navigate("/add-banner");
  };

  return (
    <div className="p-6 w-full h-screen overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>

        <button
          onClick={handleAddBanner}
          className="border-primaryColor text-primaryColor text-sm px-4 py-2 mx-4 rounded-xl border-2"
        >
          + Add Banner
        </button>
      </div>
      <div className="w-full h-full overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-auto pr-4">
          <div className="grid grid-cols-1 gap-4 pb-56">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image.src}
                label={image.label}
                onDelete={() => handleDelete(image.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Hide scrollbar for WebKit browsers */}
      <style jsx>{`
        .overflow-auto::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
      {/* Hide scrollbar for Firefox */}
      <style jsx global>{`
        .overflow-auto {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BannerCo;
