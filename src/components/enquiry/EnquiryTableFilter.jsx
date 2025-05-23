
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const EnquiryTableFilter = ({ currentPage, totalItems, itemsPerPage, onNextPage, onPreviousPage, setSort }) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <main className="flex flex-col lg:flex-row md:items-center justify-between p-3 gap-4 lg:gap-0 
    sm:items-center xs:flex-col">
      <div className="flex flex-col lg:flex-row md:items-center md:gap-6">
        <div className="text-sm flex gap-4">
          Sort by
          <div className="flex">
            <select 
            onChange={(e)=> setSort(e.target.value)}
            className="capitalize focus:outline-none text-primaryColor bg-transparent ">
              <option value="latest">latest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <h1 className="text-[#808080] text-xs">
          Showing {startIndex}-{endIndex} of {totalItems}
        </h1>
        <div className="flex items-center justify-between gap-2">
          <button 
            className="text-primaryColor bg-[#F6D6EC] rounded-lg p-1 px-2 sm:px-3"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack size={20} />
          </button>
          <button 
            className="text-primaryColor bg-[#F6D6EC] rounded-lg p-1 px-2 sm:px-3"
            onClick={onNextPage}
            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default EnquiryTableFilter;
