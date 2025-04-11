import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DepartmentCard = ({ data, onEditClick, onDeleteClick }) => {
  return (
    <div className="relative flex flex-col bg-white rounded-xl shadow-lg overflow-hidden mx-auto w-full h-[200px] md:h-[250px] ">
      <div className="relative w-full min-h-[80%] overflow-hidden">
        {
          data?.banner?.location
            ?
            <img
              src={data?.banner?.location}
              alt="Image"
              className="w-full h-full object-cover"
            />
            :
            <img
              src={`/img_not_available.png`}
              alt="Image"
              className="w-full h-full object-contain"
            />

        }
      </div>
      <div className="flex flex-col justify-center h-full px-4 text-wrap">
        <h3 className="text-xs font-medium capitalize text-gray-800">{data?.dept_name}</h3>
      </div>

      <div className="absolute top-3 right-3 flex items-center space-x-2 bg-white rounded-full"> {/* Icons positioned at the bottom */}
        <button
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:text-primaryColor" // Edit icon
          onClick={onEditClick}
        >
          <FaEdit className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
