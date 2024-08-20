import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const EnquiryTableFilter = ({ label }) => {
  return (
    <main className="flex flex-col lg:flex-row md:items-center justify-between p-3 gap-4 lg:gap-0 sm:items-center xs:flex-col">
      <div className="flex flex-col lg:flex-row md:items-center md:gap-6">
        <div className="text-sm flex gap-4">
          Sort by
          <div className="flex">
            <ul className="list-disc pl-3">
              <li className="text-sm text-black">
                <span className="text-primaryColor">Date</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <h1 className="text-[#808080] text-xs">Showing 1-09 of 78</h1>
        <div className="flex items-center justify-between gap-2">
          <button className="text-primaryColor bg-[#F6D6EC] rounded-lg p-1 px-2 sm:px-3">
            <IoIosArrowBack size={20} />
          </button>
          <button className="text-primaryColor bg-[#F6D6EC] rounded-lg p-1 px-2 sm:px-3">
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default EnquiryTableFilter;
