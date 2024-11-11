import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl mt-6 shadow-lg overflow-hidden w-full mx-auto animate-pulse">
      <div className="h-[250px] bg-gray-200 rounded-t-2xl w-full"></div>
      <div className="p-3">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="flex space-x-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="flex px-3 py-2 space-x-3">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
