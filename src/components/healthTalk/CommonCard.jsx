import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const CommonCard = ({ imageUrl, title, author, date, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl mt-10 shadow-lg overflow-hidden w-full  mx-auto">
      <img src={imageUrl} alt={title} className="h-[250px] rounded-t-2xl p-4 w-full object-cover" />
      <div className="p-4 text-left">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <div className="flex text-sm gap-2 text-gray-500">
          <p>{author}</p>
          <p>{date}</p>
        </div>
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

export default CommonCard;
