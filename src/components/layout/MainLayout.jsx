import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <Navbar />
      <section className="flex w-full  mt-20">
        <div className="border-r-2 p-5 w-[25%] hidden lg:block">
          <Sidebar />
        </div>
        <div className="p-3 lg:p-5 w-full bg-[#F5F5F5] flex flex-col items-start">
          <Outlet />
        </div>
      </section>

    </main>
  );
};

export default MainLayout;
