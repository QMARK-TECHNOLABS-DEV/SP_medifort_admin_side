import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import BlogPlaceholder from "../../assets/article/images.png";

const CommonCard = ({ imageUrl, title, author, date, onEditClick, onDeleteClick }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden w-full mx-auto relative"> {/* Reduced mt-10 to mt-6 */}
      {/* Adjusted padding on the image to 0 to reduce space */}
      <img
        src={imageUrl || BlogPlaceholder }
        alt={title}
        className="md:h-[200px] rounded-t-2xl w-full object-cover p-1.5"
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if fallback also fails
          e.target.src = {BlogPlaceholder}; // Replace with your fallback image path
        }}
      />
      {/* Reduced padding around text */}
      <div className="p-3 text-left"> {/* Reduced padding from p-4 to p-3 */}
        <h3 className="text-md leading-5 font-medium text-gray-900 mb-2 truncate">{title}</h3>
        <div className="flex flex-col md:flex-row text-xs md:gap-2 text-gray-500 ">
          <p className='truncate'>{author}</p>
          <p>{formatDate(date)}</p>
        </div>
      </div>

      {/* Adjusted padding on the button container */}
      <div className="flex justify-start px-3 py-2 space-x-3 absolute top-0 right-0"> {/* Reduced padding from p-4 to px-3 py-2 */}
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
