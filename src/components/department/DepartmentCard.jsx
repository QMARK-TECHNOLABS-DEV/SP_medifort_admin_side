import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DepartmentCard = ({ imageUrl, name, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex flex-col bg-white border rounded-xl shadow-lg overflow-hidden mx-auto w-full max-w-[300px]"> {/* Adjusted width */}
      <div className="relative w-full h-[150px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
      <div className="flex items-center justify-start p-4 space-x-2">
        <button
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:text-primaryColor" // Edit icon
          onClick={onEditClick}
        >
          <FaEdit className="w-4 h-4" />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:text-primaryColor" // Delete icon
          onClick={onDeleteClick}
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
