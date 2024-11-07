import React from 'react';

const ContentCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg h-[250px] overflow-hidden cursor-pointer mt-6 mx-1 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-2xl"></div>
      <div className="px-4 pt-2 pb-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ContentCardSkeleton;
