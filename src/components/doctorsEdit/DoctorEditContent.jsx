import React, { useRef, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import axios from '../../axios-folder/axios';
import { uploadRoute } from '../../utils/Endpoint';
import useImageCompression from '../../hooks/useImageCompression';


const DoctorEditContent = ({ updateObj, setUpdateObj, handleChange }) => {
  const fileInputRef = useRef()
  const {compressImage} = useImageCompression()
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const formdata = new FormData();
      const compressedFile = await compressImage(file);

      formdata.append('file', compressedFile);

      const response = await axios.post(uploadRoute, formdata)

      if (response.status === 200) {
        setUpdateObj((prev) => ({
          ...prev,
          image: response?.data?.file
        }))
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-4 w-full'>
      <div className='flex flex-col md:flex-row gap-4 md:ml-4 lg:ml-0 sm:flex-col h-full overflow-hidden'>
        <div className="relative inline-block w-full md:w-auto -mt-1 sm:mt-1 lg:mt-0"> {/* Adjusted margin-top */}

          {
            updateObj?.image?.location
              ?
              <img
                src={updateObj?.image?.location}
                className="w-full md:w-[360px] lg:w-[400px] xl:w-[500px]"
                alt="Doctor"
              />
              :
              <img
                src='/avatar.png'
                className="w-full md:w-[360px] lg:w-[400px] xl:w-[500px]"
                alt="Doctor"
              />
          }
          <FiEdit
            size={50}
            color='#777'
            onClick={() => fileInputRef.current.click()}
            className='absolute inset-0 m-auto text-white cursor-pointer'
          />

          <input
            id='fileUploader'
            type='file'
            ref={fileInputRef}
            className='hidden'
            onChange={handleFileChange}
          />

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
