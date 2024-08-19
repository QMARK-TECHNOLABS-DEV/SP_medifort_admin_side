import React from 'react'
import { CiSearch } from "react-icons/ci";
import { MdChevronRight } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const EnquiryHomeCareTop = ({title}) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between my-2 p-3 ">
    <h1 className="text-secondary text-xl md:text-2xl md:font-[350] mb-3 lg:mb-0 ">
      <div className="flex flex-row gap-3 ">
      <IoPerson className='text-primaryColor bg-[#F6D6EC] w-10 h-10 rounded-full p-1.5'width={35} height={35}/> {title}
        <MdChevronRight className='w-10 h-10 text-gray-400'/>
       <span className='text-2xl'>Home care enquiry</span>
      </div>
    </h1>
    <div className="relative flex items-end justify-end  ">
      <input
        type="text"
        name=""
        className="w-full rounded-lg  text-sm bg-lightGray p-3 px-5 ps-12 placeholder:text-[#475467]
           placeholder:font-[500] placeholder:text-xl
            focus:outline-none min-w-full sm:min-w-[60px] "
        placeholder="Search"
      />
      <CiSearch size={25} className="absolute top-2 left-3" />
    </div>
  </main>
  )
}

export default EnquiryHomeCareTop
