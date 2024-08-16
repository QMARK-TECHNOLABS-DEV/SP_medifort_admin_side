import React from 'react'
import { MdChevronRight } from "react-icons/md";

const PatientContentTopPart = ({title}) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between  p-3 ">
      <div className=" flex flex-row text-xl md:text-2xl  ">
       <div className="flex flex-row gap-2 text-[#848484]">
     {title}
       </div>

       <MdChevronRight className='w-10 h-10 text-gray-400'/>
       <span className='text-2xl'>Patient</span>
      </div>
    </main>
  )
}

export default PatientContentTopPart
