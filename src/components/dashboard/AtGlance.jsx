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

  // Define box styles for large screens
  const boxStyle = isLargeScreen
    ? { maxWidth: '32rem', width: '900px' } // Increase width for large screens
    : { maxWidth: '16rem', width: '200px', height: '180px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' };

  // Adjust flex direction for small screens
  const flexStyle = isLargeScreen
    ? { flexDirection: 'row', justifyContent: 'space-between' }
    : { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' };

  // Adjust button styles based on screen size
  const buttonStyle = isLargeScreen
    ? { marginLeft: '-20px' } // Move button a little left for large screens
    : { marginTop: '1rem', marginLeft: '-10px' }; // Slightly move left for small screens

  return (
    <div className="mt-8 px-4">
      <h2 
        className="text-3xl mb-4" 
        style={{ 
          fontFamily: "'Abhaya Libre', serif", 
          fontWeight: 400,
          marginRight: '520px',
          marginLeft: '0',
        }}
      >
        At a Glance
      </h2>
      <div 
        className="bg-white shadow-md rounded-2xl border border-gray-300 h-[97px] flex items-center mb-4"
        style={{ ...boxStyle, ...flexStyle }}
      >
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
          <span className="text-lg">2 new bookings</span>
        </div>
        <button
          className="bg-pink-200 text-pink-700 font-semibold py-2 px-4 rounded-full hover:bg-pink-300"
          style={buttonStyle}
        >
          View
        </button>
      </div>
      <div 
        className="bg-white shadow-md rounded-2xl border border-gray-300 h-[97px] flex items-center"
        style={{ ...boxStyle, ...flexStyle }}
      >
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
          <span className="text-lg">2 new test appointments</span>
        </div>
        <button
          className="bg-pink-200 text-pink-700 font-semibold py-2 px-4 rounded-full hover:bg-pink-300"
          style={buttonStyle}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default AtGlance;
