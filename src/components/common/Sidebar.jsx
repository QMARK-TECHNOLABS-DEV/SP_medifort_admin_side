import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { NavData } from "../../data/NavData";

const Sidebar = () => {
  const path = useLocation();
  console.log(path);
  return (
    <div className="mt-3 mb-20 ">
      <ul className="flex flex-col gap-1 ">
        {NavData?.map((item) => (
          <Link key={item?._id} href={`${item?.link}`}>
            <li
              className={`${
                path?.pathname == item?.link
                  ? " border-b-2 border-primaryColor"
                  : " text-[#475467] "
              } p-2 hover:bg-primaryColor hover:text-white  rounded cursor-pointer font-[600] text-[18px] text-start`}
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
