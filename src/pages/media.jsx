import React, { useState } from 'react';
import Card from '../components/mediacrud/Card'; // Ensure this path is correct
import Modal from '../components/mediacrud/Modal'; // Ensure this path is correct

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
    <div className="h-[100vh] overflow-y-auto p-4 scrollbar-none" style={{
      msOverflowStyle: 'none',  /* IE and Edge */
      scrollbarWidth: 'none'    /* Firefox */
    }}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-gray-600 text-[35px]">
          <span>content management</span>
          <span className="mx-2"></span>
          <span className="font-semibold">media</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 border border-pink-300 text-pink-600 rounded-md"
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

      {/* Call the Modal component and pass props */}
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
