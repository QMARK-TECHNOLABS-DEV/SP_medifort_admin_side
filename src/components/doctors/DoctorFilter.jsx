import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";


const DoctorFilter = () => {
  return (
    <main className="flex flex-col lg:flex-row md:items-center justify-between p-3">
      <div className="flex flex-col lg:flex-row md:items-center md:justify-center md:gap-6">
        <div className=" text-sm flex gap-6  flex-row">
              Department
              <div className=" flex">
          <ul className="list-disc ">
            <li className="text-sm text-black">
             <span className="text-primaryColor">Orthopaedic</span>   
            </li>
          </ul>
        </div>
        </div>

        <div className=" text-sm flex gap-6 flex-row">
              Sort
              <div className=" flex">
          <ul className="list-disc ">
            <li className="text-sm text-black">
             <span className="text-primaryColor">Alphabetic(A-Z)</span>   
            </li>
          </ul>
        </div>
        </div>  
      </div>
      
      <div className="flex items-end justify-end  ">
          <button className=" flex items-center border border-primaryColor justify-center gap-2  p-2  
          lg:w-fit rounded-lg ">
            <FaPlus className="text-primaryColor text-xs"/> <span className="text-sm text-primaryColor">Add a doctor</span>
          </button>
        </div>
    </main>
  );
};

export default DoctorFilter;