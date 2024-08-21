import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

const TopPartTestimonial = ({ title}) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between ">
      <h1 className=" text-2xl md:text-4xl text-[#424242] md:font-[350] mb-3 lg:mb-0 ">
      {title}
      </h1>
        
    </main>
  );
};

export default TopPartTestimonial;