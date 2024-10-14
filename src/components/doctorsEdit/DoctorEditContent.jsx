import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";


const DoctorEditContent = ({  updateObj, handleChange }) => {
  

  return (
    <div className='p-4 w-full'>
      <div className='flex flex-col md:flex-row gap-4 md:ml-4 lg:ml-0 sm:flex-col h-full overflow-hidden'>
        <div className="relative inline-block w-full md:w-auto -mt-1 sm:mt-1 lg:mt-0"> {/* Adjusted margin-top */}
          <img
            src='/avatar.png'
            className="w-full md:w-[360px] lg:w-[400px] xl:w-[500px]"
            alt="Doctor"
          />
          <FiEdit className='absolute inset-0 m-auto text-white' size={50} />
        </div>
        <form className="max-w-lg mx-auto">
          <div className="w-[400px] mb-5">
            <label htmlFor="name" className="block mb-2 text-sm text-black font-medium text-left ">Name</label>
            <input type="text" id="name" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 "
              value={updateObj?.doctor_name} disabled />
          </div>

          <div className="w-[400px] mb-5">
            <label htmlFor="department" className="block mb-2 text-black text-sm font-medium text-left">Department</label>
            <input type="text" id="name" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 "
              value={updateObj?.department_name} disabled />
          </div>

          <div className="w-[400px] mb-5">
            <label htmlFor="qualification" className="block mb-2 text-sm text-black font-medium text-left ">Qualification</label>
            <input type="text"
              id="qualification"
              name="qualification"
              value={updateObj?.qualification}
              onChange={handleChange}
              className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg block p-2.5 "
              placeholder="" />
          </div>

          <div className="w-[400px] mb-5">
            <label htmlFor="title" className="block mb-2 text-sm text-black font-medium text-left ">Title</label>
            <input type="text"
              id="title"
              name="title"
              value={updateObj?.title}
              onChange={handleChange}
              className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg block p-2.5 "
              placeholder="" />
          </div>


        </form>
      </div>
    </div>
  )
}

export default DoctorEditContent;
