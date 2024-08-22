import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PreventiveHealthCard from "../../components/contentManagement/PreventiveHealthCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import AddModal from "../../components/contentManagement/PreventiveHealthAddModal";
import DeleteModal from "../../components/common/DeleteModal";

const PreventiveHealth = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);
  const [healthItems, setHealthItems] = useState([
    {
      title: "Cardiac Health Screening",
      details: [
        "Complete Lipid Profile",
        "ECG",
        "Treadmill Test",
        "Echocardiography",
        "Cardiologist Consultation",
      ],
      price: "2499/-",
    },
    {
      title: "Cardiac Health Screening",
      details: [
        "Complete Lipid Profile",
        "ECG",
        "Treadmill Test",
        "Echocardiography",
        "Cardiologist Consultation",
      ],
      price: "2499/-",
    },
    {
      title: "Cardiac Health Screening",
      details: [
        "Complete Lipid Profile",
        "ECG",
        "Treadmill Test",
        "Echocardiography",
        "Cardiologist Consultation",
      ],
      price: "2499/-",
    },
    {
      title: "Cardiac Health Screening",
      details: [
        "Complete Lipid Profile",
        "ECG",
        "Treadmill Test",
        "Echocardiography",
        "Cardiologist Consultation",
      ],
      price: "2499/-",
    },
    // Add more items here if needed
  ]);

  const breadcrumbsItems = [
    { label: "Content management", href: "/content-management" },
    {
      label: "Preventive health",
      href: "/content-management/preventive-health",
    },
  ];

  const handleAddClick = () => {
    setEditItemIndex(null);
    setShowAddModal(true);
  };

  const handleEditClick = (index) => {
    setEditItemIndex(index);
    setShowAddModal(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteItemIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newHealthItem = {
      title: event.target.title.value,
      details: event.target.content.value
        .split(",")
        .map((detail) => detail.trim()),
      price: `${event.target.price.value}/-`,
    };

    if (editItemIndex !== null) {
      const updatedItems = [...healthItems];
      updatedItems[editItemIndex] = newHealthItem;
      setHealthItems(updatedItems);
    } else {
      setHealthItems([...healthItems, newHealthItem]);
    }

    handleCloseAddModal();
  };

  const handleDeleteConfirm = () => {
    const updatedItems = healthItems.filter(
      (_, index) => index !== deleteItemIndex
    );
    setHealthItems(updatedItems);
    handleCloseDeleteModal();
  };

  return (
    <div className="h-screen w-full overflow-hidden ">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide ">
        <div className="flex flex-col mb-6">
          {/* ----- Mobile view only--------- */}
          <h1 className="flex  text-2xl font-bold text-primaryColor lg:hidden">
            Preventive Health
          </h1>
          {/* ------------------------------- */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-2 md:mt-0">
              <div className="relative w-full lg:max-w-xs mt-3 sm:mt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border rounded-lg p-3 text-sm w-full placeholder:ps-8"
                />
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <button
                onClick={handleAddClick}
                className="p-2 px-4 lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800  font-medium rounded-lg"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthItems.map((item, index) => (
            <PreventiveHealthCard
              key={index}
              title={item.title}
              details={item.details}
              price={item.price}
              onEditClick={() => handleEditClick(index)}
              onDeleteClick={() => handleDeleteClick(index)}
            />
          ))}
        </div>
        <AddModal
          show={showAddModal}
          onClose={handleCloseAddModal}
          onSubmit={handleFormSubmit}
          editItem={editItemIndex !== null ? healthItems[editItemIndex] : null}
        />
        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};
export default PreventiveHealth;
