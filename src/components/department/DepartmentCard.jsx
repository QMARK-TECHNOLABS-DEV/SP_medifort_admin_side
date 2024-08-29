import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DepartmentCard = ({ imageUrl, name, onEditClick, onDeleteClick }) => {
  return (
    <div className="relative flex flex-col bg-white border rounded-xl shadow-lg overflow-hidden mx-auto w-full max-w-[450px]">
      <div className="relative w-full h-[150px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="p-4 text-right">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-2"> {/* Icons positioned at the bottom */}
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
    </div>
  );
};

export default DepartmentCard;
