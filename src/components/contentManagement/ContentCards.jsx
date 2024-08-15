import React from 'react';

const ContentCard = ({ imageSrc, title }) => {
  return (
    <div className="flex flex-col justify-center bg-white items-center rounded-lg shadow-lg">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover rounded-lg" />
      <div className="p-4 text-center">
        <h2 className="text-sm font-medium text-gray-700">{title}</h2>
      </div>
    </div>
  );
};

export default ContentCard;