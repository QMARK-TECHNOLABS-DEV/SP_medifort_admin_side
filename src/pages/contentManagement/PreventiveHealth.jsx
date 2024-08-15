import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; 
import PreventiveHealthCard from '../../components/contentManagement/PreventiveHealthCard';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import AddModal from '../../components/contentManagement/PreventiveHealthAddModal';


const PreventiveHealth = () => {
  const [showModal, setShowModal] = useState(false);
  const healthItems = [
    {
      title: 'Cardiac Health Screening',
      details: [
        'Complete Lipid Profile',
        'ECG',
        'Treadmill Test',
        'Echocardiography',
        'Cardiologist Consultation',
      ],
      price: '2499/-',
    },
    {
      title: 'Cardiac Health Screening',
      details: [
        'Complete Lipid Profile',
        'ECG',
        'Treadmill Test',
        'Echocardiography',
        'Cardiologist Consultation',
      ],
      price: '2499/-',
    },
    {
      title: 'Cardiac Health Screening',
      details: [
        'Complete Lipid Profile',
        'ECG',
        'Treadmill Test',
        'Echocardiography',
        'Cardiologist Consultation',
      ],
      price: '2499/-',
    },
    {
      title: 'Cardiac Health Screening',
      details: [
        'Complete Lipid Profile',
        'ECG',
        'Treadmill Test',
        'Echocardiography',
        'Cardiologist Consultation',
      ],
      price: '2499/-',
    },
    // Add more items here if needed
  ];
  const breadcrumbsItems = [
    { label: 'Content management', href: '/content-management' },
    { label: 'Preventive health', href: '/preventive-health' },
  ];

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // const newHealthItem = {
    //   title: event.target.title.value,
    //   details: event.target.content.value.split(','),
    //   price: `${event.target.price.value}/-`,
    // };
    
    handleCloseModal();
  };

  return (
    <div className="p-10 h-full">
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center">
          <Breadcrumbs items={breadcrumbsItems} />
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg pl-10 pr-5 py-3 text-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        <button
          onClick={handleAddClick}
          className="mt-3 bg-white border border-[#9C2677] text-[#9C2677] text-lg font-medium px-4 py-2 rounded-lg self-end"
        >
          + Add
        </button>
      </div>
      <div className="grid grid-cols-1 pt-10 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {healthItems.map((item, index) => (
          <PreventiveHealthCard
            key={index}
            title={item.title}
            details={item.details}
            price={item.price}
          />
        ))}
      </div>
      <AddModal show={showModal} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default PreventiveHealth;