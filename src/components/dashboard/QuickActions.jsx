import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 px-4 sm:px-2 max-w-full">
      <h2
        className="text-2xl mb-4 sm:text-xl md:text-2xl lg:text-3xl font-medium text-start">
        Quick Actions
      </h2>

      <div
        className="flex flex-col lg:flex-row gap-5"> {/* Stack buttons vertically with spacing */}
        <button 
        onClick={() => navigate('/banner-management/add')}
        className="bg-white p-3 lg:p-5 shadow-md flex items-center justify-center gap-2 rounded-[15px]  hover:bg-gray-100 border border-gray-300" >
          <span className="text-pink-600 text-lg sm:text-lg">+</span>
          <span className="text-black text-sm sm:text-sm">
            Add Banner
          </span>
        </button>

        <button
          onClick={() => navigate('/content-management/blog/new-blog')}
          className="bg-white p-3 lg:p-5 shadow-md flex items-center justify-center gap-2 rounded-[15px]  hover:bg-gray-100 border border-gray-300">
          <span className="text-pink-600 text-lg sm:text-lg">+</span>
          <span className="text-black text-sm sm:text-sm">
            Add a Blog
          </span>
        </button>

        <button
          onClick={() => navigate('/content-management/article/new-article')}
          className="bg-white p-3 lg:p-5 shadow-md flex items-center justify-center gap-2 rounded-[15px]  hover:bg-gray-100 border border-gray-300" >
          <span className="text-pink-600 text-lg sm:text-lg">+</span>
          <span className="text-black text-sm sm:text-sm" >
            Add an Article
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
