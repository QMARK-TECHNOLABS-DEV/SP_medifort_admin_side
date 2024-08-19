import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const EnquiryTable = ({data}) => {
    
    return (
        <div className=" w-full overflow-hidden h-screen pb-40">
        <div className="flex-1 h-full pb-32 overflow-y-auto">
        <div className="border border-gray-200 overflow-hidden rounded-xl m-3 mb-10">
        <table className="w-full text-base min-w-[600px] sm:min-w-[800px] lg:min-w-[1000px] ">
      
          <thead className="">
            <tr className="bg-[#F6D6EC] text-primaryColor">
              <th className="pl-5 text-start py-3 font-normal max-md:text-sm border">
                Name
              </th>
              <th className="px-5 text-start py-3 font-normal max-md:text-sm  border">
                City
              </th>
              <th className="px-5 text-start py-3 font-normal max-md:text-sm  border">
                Pincode
              </th>
              <th className="px-5 text-start py-3 pl-15 font-normal max-md:text-sm  border">
                Service
              </th>
              <th className="px-5 text-start py-3 font-normal max-md:text-sm w-[10%] border">
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item?.id} className=" border-gray-400 bg-white capitalize">
                <td className="pl-5 p-3 text-left border">{item?.Name}</td>
                <td className="px-5 p-3 text-left border">{item?.City}</td>
                <td className="px-5 p-3 text-left border">{item?.Pincode}</td>
                <td className="px-5 p-3 text-left border">{item?.Service}</td>
                <td className="px-5 p-3 text-left border">{item?.Contact}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      </div>
    );
  };

export default EnquiryTable
