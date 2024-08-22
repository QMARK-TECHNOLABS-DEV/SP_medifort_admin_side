import React, { useState } from "react";
import Card from "../components/mediacrud/Card"; // Ensure this path is correct
import Modal from "../components/mediacrud/Modal"; // Ensure this path is correct
import Breadcrumbs from "../components/common/Breadcrumbs";
import first from "../assets/media/first.png";
import second from "../assets/media/second.png";
import third from "../assets/media/third.png";

const Media = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [tempImage, setTempImage] = useState(null);
  const [images, setImages] = useState([first, second, third, second]);
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    setEditIndex(index);
    setFileName(images[index]);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileName(file.name);
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetModal = () => {
    setFileName("");
    setTempImage(null);
    setEditIndex(null);
  };

  const handleAdd = () => {
    if (tempImage) {
      if (editIndex !== null) {
        const updatedImages = [...images];
        updatedImages[editIndex] = tempImage;
        setImages(updatedImages);
      } else {
        setImages([...images, tempImage]);
      }
    }
    setIsModalOpen(false);
    resetModal();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetModal();
  };

  return (
    <div
      className="h-[100vh] overflow-y-auto p-4 scrollbar-none"
      style={{
        msOverflowStyle: "none" /* IE and Edge */,
        scrollbarWidth: "none" /* Firefox */,
      }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <Breadcrumbs
          items={[
            { href: "/content-management", label: "Content management" },
            { href: "/media", label: "Media" },
          ]}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 border border-pink-300 text-pink-600 rounded-md text-sm mt-2"
        >
          + Add new
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {images.map((imageSrc, index) => (
          <Card
            key={index}
            imageSrc={imageSrc}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <Modal
              isOpen={isModalOpen}
              onClose={handleCancel}
              onReset={resetModal}
              onAdd={handleAdd}
              onCancel={handleCancel}
              fileName={fileName}
              handleFileUpload={handleFileUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
