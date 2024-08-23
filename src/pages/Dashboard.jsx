import React from 'react';
import AtGlance from '../components/dashboard/AtGlance';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <div className="relative h-[60vh] md:h-[50vh] lg:h-[35vh] xl:h-[80vh] overflow-y-auto p-4" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <div className="p-4 border-b">
        <h1 
          className="text-4xl mb-4" 
          style={{ 
            fontFamily: "'Abel', sans-serif", 
            fontWeight: 400, 
            marginRight: '120px', 
            marginLeft: '-400px',
            color: '#333333' // Set the text color to grey
          }}
        >
          Welcome, <span className="text-pink-600">SP </span>
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row flex-1 min-h-[calc(100%-4rem)] gap-4">
        <div className="flex-1">
          <AtGlance />
        </div>
        <div className="flex-1 lg:max-w-[30%] lg:ml-4">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
