import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

const TopPart = ({ title}) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between md:my-4 my-2 p-3">
      <h1 className="text-secondary text-xl md:text-2xl md:font-[350] mb-3 lg:mb-0 ">
       <div className="flex flex-row gap-3">
       <img src='/doctoricon.png' width={35} height={35}></img> {title}
       </div>
      </h1>
        <div className="relative flex items-end justify-end  ">
          <input
            type="text"
            name=""
            className="w-full rounded-lg text-sm bg-lightGray p-3 px-5 ps-12 placeholder:text-[#475467]
             placeholder:font-[500] placeholder:text-xl focus:outline-none"
            placeholder="Search"
          />
          <CiSearch size={25} className="absolute top-2 left-3" />
        </div>

    </main>
  );
};

export default TopPart;