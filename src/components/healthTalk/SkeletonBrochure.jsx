import React from 'react';

const SkeletonBrochure = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl mt-6 shadow-lg overflow-hidden
      mx-auto animate-pulse w-[200px] h-[120px]"> 

      <div className="p-3 text-left">

      </div>
      <div className="flex justify-start px-3 py-2 space-x-3">

      </div>
    </div>
  );
};

export default SkeletonBrochure;


