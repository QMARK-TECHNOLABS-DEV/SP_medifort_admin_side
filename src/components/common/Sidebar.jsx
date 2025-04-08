import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavData } from "../../data/NavData";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/AuthSlicer";
import { setAccessToken, setRefreshToken } from "../../redux/slices/TokenReducer";

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
  };

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-8rem)]">
      {/* Top navigation items */}
      <ul className="flex flex-col gap-1">
        {NavData?.map((item) => {
          const isActive =
            pathname === item?.link ||
            (item?.link !== '/' && pathname.startsWith(item?.link));

          return (
            <Link key={item?.id} to={item?.link}>
              <li
                className={`${isActive
                  ? "border-b-2 bg-primaryColor text-white"
                  : ""
                  } p-2 flex items-center gap-2 hover:bg-primaryColor text-black hover:text-white rounded cursor-pointer font-[600] text-[18px] text-start h-[50px]`}
              >
                {item?.icon}{item?.name}
              </li>
            </Link>
          );
        })}
      </ul>
      {/* Logout button at bottom */}
      <div className="border-t-2 border-primaryColor pt-2">
        <div
          onClick={handleLogout}
          className="p-2 flex items-center gap-2 hover:bg-primaryColor text-black hover:text-white rounded cursor-pointer font-[600] text-[18px] text-start h-[50px]"
        >
          <FiLogOut size={26} />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
