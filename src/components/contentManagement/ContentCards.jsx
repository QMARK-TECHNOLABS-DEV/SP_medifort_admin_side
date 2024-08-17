import React from 'react';

const ContentCard = ({ imageSrc, title }) => {
  return (
    <div className="flex flex-col  bg-white rounded-2xl shadow-lg h-[250px] overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="p-4 text-left">
        <h2 className="text-lg font-medium text-[#424242]">{title}</h2>
      </div>
    </div>
  );
};

export default ContentCard;