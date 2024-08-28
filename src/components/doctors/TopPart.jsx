import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

const TopPart = ({ title }) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between items-start lg:items-center my-2 p-3 w-full">
      <h1 className="text-secondary text-xl md:text-2xl md:font-[350] mb-3 lg:mb-0 w-full lg:w-auto">
        <div className="flex flex-row gap-3 items-center">
          <img src="/doctoricon.png" width={35} height={35} alt="Doctor Icon" /> {title}
        </div>
      </h1>
      <div className="relative flex items-center justify-end w-full lg:w-auto mt-2 lg:mt-0">
        <input
          type="text"
          name=""
          className="w-full lg:w-[300px] rounded-lg text-sm bg-lightGray p-3 px-5 pl-12 placeholder:text-[#475467]
             placeholder:font-[500] placeholder:text-xl focus:outline-none"
          placeholder="Search"
        />
        <CiSearch size={25} className="absolute top-2 left-4" />
      </div>
    </main>
  );
};

export default TopPart;
