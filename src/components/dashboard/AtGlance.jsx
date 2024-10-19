import React, { useState, useEffect } from 'react';

const AtGlance = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mt-8 p-2 w-full">
      <h2 className="text-2xl mb-4 sm:text-xl md:text-2xl lg:text-3xl font-medium text-start" >
        At a Glance
      </h2>

      <section className='flex flex-col lg:flex-row  lg:gap-5 w-full'>
        <div className="bg-white shadow-md rounded-2xl border border-gray-300 h-[97px] flex items-center justify-between mb-4 w-full">
          <div className="flex items-center gap-3 pl-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
              />
            </svg>
            <span
              className="text-lg">
              2 new bookings
            </span>
          </div>
          <button className="bg-pink-200 text-pink-700 font-semibold py-2 px-4 rounded-full hover:bg-pink-300 mr-3" >
            View
          </button>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-300 h-[97px] flex items-center justify-between w-full" >
          <div className="flex items-center gap-3 pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
              />
            </svg>
            <span
              className="text-lg">
              2 new test appointments
            </span>
          </div>
          <button className="bg-pink-200 text-pink-700 font-semibold py-2 px-4 rounded-full hover:bg-pink-300 mr-3" >
            View
          </button>
        </div>
      </section>
    </div>
  );
};

export default AtGlance;
