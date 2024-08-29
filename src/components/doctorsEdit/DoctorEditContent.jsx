import React from 'react'
import { FiEdit } from "react-icons/fi";

const DoctorEditContent = () => {
  return (
    <div className='p-4 w-full'>
      <div className='flex flex-col md:flex-row gap-4 md:ml-4 lg:ml-0 sm:flex-col h-full overflow-hidden'>
        <div className="relative inline-block w-full md:w-auto -mt-1 sm:mt-1 lg:mt-0"> {/* Adjusted margin-top */}
          <img
            src='/doctorEditimage.png'
            className="w-full md:w-[360px] lg:w-[400px] xl:w-[500px]"
            alt="Doctor"
          />
          <FiEdit className='absolute inset-0 m-auto text-white' size={50} />
        </div>
        <form className="max-w-lg mx-auto">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm text-black font-medium text-left ">Name</label>
            <input type="text" id="name" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg p-2.5 "
              placeholder="Dr.Cherian M Thomas" style={{ width: '400px' }} required />
          </div>
          <div className="mb-5">
            <label htmlFor="qualification" className="block mb-2 text-sm text-black font-medium text-left ">Qualification</label>
            <input type="text" id="qualification" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg block p-2.5 "
              placeholder="MBBS, MS (Gen. Surgery), FMAS" required />
          </div>
          <div className="mb-5">
            <label htmlFor="department" className="block mb-2 text-black text-sm font-medium text-left">Department</label>
            <select id="department" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300 text-sm rounded-lg block px-2.5 py-2.5 pr-2 ">
              <option>Oncology</option>
              <option>Ortho</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DoctorEditContent;
