import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { NavData } from "../../data/NavData";

const Sidebar = () => {
  const path = useLocation();
  console.log(path);
  console.log(NavData)
  return (
    <div className="mt-3 mb-20 h-full">
      <ul className="flex flex-col gap-1 h-full">
        {NavData?.map((item) => (
          <Link key={item?.id} to={`${item?.link}`}>
            <li
              className={`${
                path?.pathname === item?.link &&
                " border-b-2 border-primaryColor text-[#475467]"
              } p-2 hover:bg-primaryColor text-black hover:text-white  rounded cursor-pointer font-[600] text-[18px] text-start h-[50px]`}
            >
              {item?.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
