
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const PreventiveHealthCard = ({ title, details, price }) => {
  return (
    <div className="flex flex-col justify-between text-left bg-white rounded-2xl shadow-lg p-6 max-w-96">
      <div>
        <h2 className="text-2xl font-semibold text-[#9C2677] mb-2">{title}</h2>
        <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
          {details.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-lg font-bold text-gray-800">Price: {price}</p>
      </div>
      <div className="flex justify-start mt-4 space-x-3">
        <button className="text-gray-600 bg-white border p-3 rounded-full shadow-lg hover:text-blue-600">
          <FaEdit />
        </button>
        <button className="text-gray-600 bg-white border p-3 rounded-full shadow-lg hover:text-red-600">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default PreventiveHealthCard;
