import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const PreventiveHealthCard = ({ title, details, price, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex flex-col justify-between text-left bg-white rounded-2xl shadow-lg p-4 sm:p-6 max-w-full">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-[#9C2677] mb-2">{title}</h2>
        <ul className="text-sm sm:text-base text-gray-700 list-disc list-inside mb-4">
          {details.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-base sm:text-lg font-bold text-gray-800">Price: {price}/-</p>
      </div>
      <div className="flex justify-start mt-4 space-x-3">
        <button
          className="text-gray-600 bg-white border p-2 sm:p-3 rounded-full shadow-lg hover:text-blue-600"
          onClick={onEditClick}
        >
          <FaEdit />
        </button>
        <button
          className="text-gray-600 bg-white border p-2 sm:p-3 rounded-full shadow-lg hover:text-red-600"
          onClick={onDeleteClick}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default PreventiveHealthCard;
