import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavData } from "../../data/NavData";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="mt-3 mb-20 h-full ">
      <ul className="flex flex-col gap-1 h-full">
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
    </div>
  );
};

export default Sidebar;
