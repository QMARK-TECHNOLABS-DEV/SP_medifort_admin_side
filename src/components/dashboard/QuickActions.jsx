import React, { useState, useEffect } from 'react';

const QuickActions = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define button styles for small screens
  const buttonStyle = isSmallScreen
    ? { width: '100px', height: '70px' } // Increased height for small screens
    : { width: '140px', height: '80px' };

  return (
    <div className="mt-8 px-4 sm:px-2 max-w-full" style={{ marginLeft: '20px' }}> {/* Adjusted margin */}
      <h2 
        className="text-2xl mb-4 sm:text-xl md:text-2xl lg:text-3xl" 
        style={{ 
          fontFamily: "'Abhaya Libre', serif", 
          fontWeight: 400,
          marginRight: '490px',
        }}
      >
        Quick Actions
      </h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 overflow-x-auto">
        <button 
          className="bg-white shadow-md rounded-[15px] py-[10px] px-3 sm:py-[12px] sm:px-3 hover:bg-gray-100 border border-gray-300"
          style={buttonStyle}
        >
          <span className="text-pink-600 text-lg sm:text-lg">+</span> 
          <span className="text-black text-sm sm:text-sm" style={{ fontFamily: "'Abhaya Libre', serif", fontWeight: 700 }}>
            Add Banner
          </span>
        </button>
        <button 
          className="bg-white shadow-md rounded-[15px] py-[10px] px-3 sm:py-[12px] sm:px-3 hover:bg-gray-100 border border-gray-300"
          style={buttonStyle}
        >
          <span className="text-pink-600 text-lg sm:text-lg">+</span> 
          <span className="text-black text-sm sm:text-sm" style={{ fontFamily: "'Abhaya Libre', serif", fontWeight: 700 }}>
            Add a Doctor
          </span>
        </button>
        <button 
          className="bg-white shadow-md rounded-[15px] py-[10px] px-3 sm:py-[12px] sm:px-3 hover:bg-gray-100 border border-gray-300"
          style={buttonStyle}
        >
          <span className="text-pink-600 text-lg sm:text-lg">+</span> 
          <span className="text-black text-sm sm:text-sm" style={{ fontFamily: "'Abhaya Libre', serif", fontWeight: 700 }}>
            New Career
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
