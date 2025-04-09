import React from 'react';
import AtGlance from '../components/dashboard/AtGlance';
import QuickActions from '../components/dashboard/QuickActions';
import DashCards from '../components/dashboard/DashCards';
import PatientsOverview from '../components/dashboard/PatientsOverview';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import PatientsTable from '../components/dashboard/PatientsTable';

const Dashboard = () => {
  return (
    <div className="relative w-full min-h-screen md:h-[50vh] lg:h-[35vh] xl:h-[80vh] overflow-y-scroll pb-80 p-4" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <div className="p-4 ">
        <h1 className="text-3xl lg:text-4xl mb-4 font-semibold text-start " >
          Welcome, <span className="text-pink-600">SP Medifort</span>
        </h1>
      </div>
        <DashCards/>
        <div className="grid md:grid-cols-3 gap-4 mt-10">
        <div className="md:col-span-2">
          <PatientsOverview />
        </div>
        <CalendarWidget />
      </div>
      <PatientsTable />
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
