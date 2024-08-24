

import React, { useState } from 'react';
import Card from '../components/mediacrud/Card';
import Modal from '../components/mediacrud/Modal';
import Breadcrumbs from '../components/common/Breadcrumbs';
import first from "../assets/media/first.png";
import second from "../assets/media/second.png";
import third from "../assets/media/third.png";

const Media = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [tempImage, setTempImage] = useState(null);
  const [images, setImages] = useState([first, second, third, second]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setFileName(images[index]);
    setTempImage(images[index]);
    setIsEditing(true);
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
    if (isEditing) {
      setTempImage(null);
      setFileName(images[editIndex]);
    } else {
      setFileName('');
      setTempImage(null);
    }
  };

  const handleAdd = () => {
    if (tempImage) {
      if (isEditing && editIndex !== null) {
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
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden p-4">
      <h1 className="text-2xl font-bold text-primaryColor lg:hidden mb-2 text-left -ml-4 md:-ml-6 lg:-ml-8 -mt-4 md:-mt-2 lg:-mt-1">Media</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 mt-1 -ml-4 md:-ml-6 lg:-ml-8">
        <div className="flex items-start -mt-2 md:-mt-2 lg:-mt-3 lg:ml-4"> {/* Added lg:ml-4 to move breadcrumbs slightly right */}
          <Breadcrumbs
            items={[
              { href: '/content-management', label: 'Content management' },
              { href: '/content-management/media', label: 'Media' },
            ]}
          />
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto px-3 py-1.5 border border-primaryColor text-primaryColor rounded-md text-sm mt-2 ml-1 shadow-md bg-white"
        >
          + Add new
        </button>
      </div>

      {/* Content Area with Scrolling */}
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {images.map((imageSrc, index) => (
            <Card
              key={index}
              imageSrc={imageSrc}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onReset={resetModal}
        onAdd={handleAdd}
        fileName={fileName}
        handleFileUpload={handleFileUpload}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Media;
