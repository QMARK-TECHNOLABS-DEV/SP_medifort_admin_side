import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DepartmentCard = ({ imageUrl, name, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex flex-col bg-white border rounded-2xl mt-10 shadow-lg overflow-hidden mx-auto w-full sm:w-[48%] lg:w-full xl:w-[350px]">
      <div className="relative h-[250px] rounded-t-2xl border-[15px] border-white overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover rounded-t-2xl" 
        />
      </div>
      <div className="p-4 text-left">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      </div>
      <div className="flex justify-start p-4 space-x-3">
        <button
          className="text-gray-600 bg-white border p-2 rounded-full shadow-md hover:text-blue-600"
          onClick={onEditClick}
        >
          <FaEdit />
        </button>
        <button
          className="text-gray-600 bg-white border p-2 rounded-full shadow-md hover:text-red-600"
          onClick={onDeleteClick}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
