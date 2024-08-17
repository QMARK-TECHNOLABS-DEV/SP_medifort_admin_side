import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-16 rounded-lg shadow-lg w-96 text-center">
        <FaTrashAlt className="text-gray-600 text-6xl mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this item?</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-white border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-white border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;