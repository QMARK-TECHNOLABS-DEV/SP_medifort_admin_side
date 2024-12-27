import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const CommonCard = ({ imageUrl, title, author, date, onEditClick, onDeleteClick }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="flex flex-col bg-white rounded-2xl mt-6 shadow-lg overflow-hidden w-full mx-auto"> {/* Reduced mt-10 to mt-6 */}
      {/* Adjusted padding on the image to 0 to reduce space */}
      <img src={imageUrl} alt={title} className="h-[250px] rounded-t-2xl w-full object-cover" />
      {/* Reduced padding around text */}
      <div className="p-3 text-left"> {/* Reduced padding from p-4 to p-3 */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <div className="flex text-sm gap-2 text-gray-500">
          <p>{author}</p>
          <p>{formatDate(date)}</p>
        </div>
      </div>
      {/* Adjusted padding on the button container */}
      <div className="flex justify-start px-3 py-2 space-x-3"> {/* Reduced padding from p-4 to px-3 py-2 */}
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
