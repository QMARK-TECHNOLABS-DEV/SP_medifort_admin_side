import React from 'react';
import AtGlance from '../components/dashboard/AtGlance';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <div className="relative w-full min-h-screen md:h-[50vh] lg:h-[35vh] xl:h-[80vh] overflow-y-scroll p-4" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <div className="p-4 border-b">
        <h1 className="text-3xl lg:text-4xl mb-4 font-semibold text-start " >
          Welcome, <span className="text-pink-600">SP Medifort</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="">
          <AtGlance />
        </div>
        <div className="">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
