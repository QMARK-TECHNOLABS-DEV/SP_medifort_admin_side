import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContentCard = ({ imageSrc, title, url }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <div 
      className="flex flex-col bg-white rounded-2xl shadow-lg h-[250px] overflow-hidden cursor-pointer mt-6 mx-1" // Reduced mt-10 to mt-6, added mx-1 to reduce side margins
      onClick={handleCardClick}
    >
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="px-4 pt-2 pb-4 text-left">
        <h2 className="text-lg font-medium text-[#424242]">{title}</h2>
      </div>
    </div>
  );
};

export default ContentCard;
