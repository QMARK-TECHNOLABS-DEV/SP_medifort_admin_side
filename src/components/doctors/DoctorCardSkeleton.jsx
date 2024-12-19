import React from "react";

const DoctorCardSkeleton = () => (
  <div className="relative w-full h-[350px] bg-gray-200 rounded-3xl border p-8 animate-pulse">
    <div className="w-full h-full bg-gray-300 rounded-2xl" />
    
    <div className="absolute inset-x-0 bottom-0 pl-6 pb-2 flex flex-col">
      <div className="w-1/3 h-4 bg-gray-300 rounded mb-2" /> 
      <div className="w-1/2 h-6 bg-gray-300 rounded mb-2" /> 
      <div className="w-1/4 h-4 bg-gray-300 rounded" />       
    </div>
  </div>
);

export default DoctorCardSkeleton;
