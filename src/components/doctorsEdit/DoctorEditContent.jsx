// import React from 'react'

// const DoctoeEditContent = () => {
//   return (
//     <div>
//       <div className='flex flex-row gap-4 ml-4'>
//         <img src='/doctorEditimage.png' width={300} height={100}></img>
        

// <form className="max-w-lg mx-auto">
//   <div className="mb-5">
//     <label htmlFor="email" className="block mb-2 text-sm text-black font-medium text-left ">Name</label>
//     <input type="email" id="email" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300  text-sm rounded-lg  p-2.5 "
//        placeholder="Dr.Cherian M Thomas" required />
//   </div>
//   <div className="mb-5">
//   <label htmlFor="email" className="block mb-2 text-sm text-black font-medium text-left ">Qualification</label>
//     <input type="email" id="email" className="bg-[#B0BAC3] bg-opacity-40 border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
//        placeholder="MBBS, MS (Gen. Surgery), FMAS" required />
//   </div>
//   <div className="mb-5">
//   <label htmlFor="countries" className="block mb-2 text-black text-sm font-medium text-left">Department</label>
//   <select id="countries" className="bg-[#B0BAC3] bg-opacity-40 border border-gray-300  text-sm rounded-lg block w-full px-2.5 py-2.5 ">
//     <option>Oncology</option>
//     <option>Ortho</option>
//   </select>
// </div>

// </form>

//       </div>
//     </div>
//   )
// }

// export default DoctoeEditContent

import React from 'react'
import { FiEdit } from "react-icons/fi";

const DoctorEditContent = () => {
  return (
    <div>
      <div className='flex flex-row gap-4 ml-4'>
      <div className="relative inline-block">
      <img src='/doctorEditimage.png' width={300} height={300} alt="Doctor" />
      <FiEdit className='absolute inset-0 m-auto text-white' size={50} />
    </div>
        <form className="max-w-lg mx-auto">  {/* Updated max-w-sm to max-w-lg for a wider form */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm text-black font-medium text-left ">Name</label>
            <input type="text" id="name" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300  text-sm rounded-lg  p-2.5 "
               placeholder="Dr.Cherian M Thomas" style={{ width: '400px' }} required />
          </div>
          <div className="mb-5">
            <label htmlFor="qualification" className="block mb-2 text-sm text-black font-medium text-left ">Qualification</label>
            <input type="text" id="qualification" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300  text-sm rounded-lg block p-2.5 "
               placeholder="MBBS, MS (Gen. Surgery), FMAS" required />
          </div>
          <div className="mb-5">
            <label htmlFor="department" className="block mb-2 text-black text-sm font-medium text-left">Department</label>
            <select id="department" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300  text-sm rounded-lg block px-2.5 py-2.5 pr-2 ">
              <option>Oncology</option>
              <option>Ortho</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DoctorEditContent
