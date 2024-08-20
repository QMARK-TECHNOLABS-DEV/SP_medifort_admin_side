import React from 'react'
import { MdChevronRight } from "react-icons/md";

const DoctorsEditTop = ({title}) => {
  return (
    <main className="flex flex-col lg:flex-row justify-between  p-3 min:flex-col ">
      <div className=" flex flex-row text-xl md:text-2xl  ">
       <div className="flex flex-row gap-2 text-[#848484]">
       <img src='/doctoricon.png' width={35} height={35}></img> {title}
       </div>

       <MdChevronRight className='w-10 h-10 text-gray-400'/>
       <span className='text-2xl'>Dr.Cherian M Thomas</span>
      </div>
      <div className="flex items-center ml-auto min:items-center"> {/* ml-auto pushes the content to the right end */}
        <button className="flex items-center border border-primaryColor mr-8 p-2 w-full rounded-lg min:w-full">
          <span className="text-sm text-primaryColor">Save and submit</span>
        </button>
        <span className='text-gray-700'>Delete</span>
      </div>
    </main>
  )
}

export default DoctorsEditTop
