import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import Sidebar from "./Sidebar"; // Import Sidebar component
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/AuthSlicer";
import { setAccessToken, setRefreshToken } from "../../redux/slices/TokenReducer";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar on click
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null))
    dispatch(setAccessToken(null))
    dispatch(setRefreshToken(null))
  }

  return (
    <>
      <main className="max-w-screen-2xl mx-auto p-3 border-b lg:p-5 flex items-center justify-between fixed w-full bg-white z-50">
        {/* logo side */}
        <div className="flex items-center gap-2">
          <img
            src={require("../../assets/nav/logoNav.png")}
            alt="Logo"
            className="w-10"
          />
          <h1 className="font-[500] text-2xl object-contain text-primaryColor">SP Medifort</h1>
        </div>

        {/* Profile and search option */}
        <div className="flex items-center gap-2 lg:gap-5">
          {/* <IoIosSearch size={28} className="hidden lg:block" /> */}
          <CgMenuGridR size={28} className="lg:hidden block" onClick={toggleSidebar} /> {/* Toggle sidebar */}
          <div className="hidden lg:block flex">
            <img
              src={"/logo192.png"}
              alt="profile"
              className="rounded-full w-10 h-10"
            />
            <div>
              <h2>Admin</h2>
              <p>spmedifort@gmail.com</p>
            </div>
          </div>

          <FiLogOut
            onClick={handleLogout}
            size={26}
          />

        </div>
      </main>

      {/* Sidebar - render only if `isSidebarOpen` is true */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50" onClick={toggleSidebar}>
          <div
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50"
            onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside
          >
            <Sidebar /> {/* Render Sidebar */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
