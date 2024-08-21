import React, { useState } from 'react';
import Card from '../components/mediacrud/Card'; 
import Modal from '../components/mediacrud/Modal'; 
import Breadcrumbs from '../components/common/Breadcrumbs'; // Import the Breadcrumbs component

const Media = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  const images = [
    '/path/to/first-image.jpg',
    '/path/to/second-image.jpg',
    '/path/to/third-image.jpg',
    '/path/to/fourth-image.jpg',
  ];

  const handleEdit = (index) => {
    console.log('Edit card:', index);
  };

  const handleDelete = (index) => {
    console.log('Delete card:', index);
  };

  const handleFileUpload = (event) => {
    setFileName(event.target.files[0]?.name || '');
  };

  const resetModal = () => {
    setFileName('');
  };

  const handleAdd = () => {
    // Add your logic here
    setIsModalOpen(false);
    resetModal();
  };

  return (
    <div className="h-[80vh] overflow-y-auto p-4 scrollbar-none" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <div className="flex items-center justify-between p-4 border-b">
        <Breadcrumbs 
          items={[
            { href: '/content-management', label: 'content management' },
            { href: '/content-management/media', label: 'media' },
          ]}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 border border-pink-300 text-pink-600 rounded-md text-sm mt-2" // Added margin-top
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReset={resetModal}
        onAdd={handleAdd}
        fileName={fileName}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default Media;
