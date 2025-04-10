import React from 'react';
import AtGlance from '../components/dashboard/AtGlance';
import QuickActions from '../components/dashboard/QuickActions';
import DashCards from '../components/dashboard/DashCards';
import PatientsOverview from '../components/dashboard/PatientsOverview';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import PatientsTable from '../components/dashboard/PatientsTable';

const Dashboard = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="h-full overflow-y-auto pb-72 scrollbar-hide">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Welcome, <span className="text-pink-600">SP Medifort</span>
          </h1>
        </div>

        {/* Dash Cards */}
        <DashCards />

        {/* Overview + Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="md:col-span-2">
            <PatientsOverview />
          </div>
          <CalendarWidget />
        </div>

        {/* Patients Table */}
        <div className="mt-10">
          <PatientsTable />
        </div>

        {/* Optional: At Glance & Quick Actions */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <AtGlance />
          <QuickActions />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
