
import React from 'react';
import { IoLinkSharp, IoClose } from "react-icons/io5";

const AddNewModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-left relative">
        <h1 className='mb-4 text-lg text-[#424242]'>Add New</h1>
        <IoClose
          onClick={onClose}
          size={23}
          className="absolute top-4 right-4 text-[#475467] cursor-pointer"
        />
      
        <form>
          <div className="mb-3">
            <label htmlFor="uploadStudy" className="block text-sm pb-1 font-medium text-[#3C3C3C]">
              Upload study
            </label>
            <div className="relative flex items-center">
              <IoLinkSharp className="absolute left-3 text-[#525252] w-8 h-8 text-sm pr-2" />
              <input
                type="text"
                className="form-input block w-full h-10 text-[#424242] rounded-md border bg-[#B0BAC3] bg-opacity-40 pl-[45px]"
                placeholder="browse computer"
                id="uploadStudy"
              />
            </div>
          </div>

          <div className='mb-2 flex flex-row gap-2'>
            <span className='text-sm'>Nourishing Reco-.pdf (30 mb)</span>
            <span className='text-sm text-primaryColor'>view</span>
            <span className='text-sm text-[#424242]'>remove</span>
          </div>

          <div className="mb-3">
            <label htmlFor="doctorSelect" className="block text-sm font-medium pb-1 text-[#3C3C3C]">
              Doctor
            </label>
            <select
              id="doctorSelect"
              className="form-select block w-full h-10 rounded-md border bg-[#B0BAC3] bg-opacity-40 pl-3"
            >
              <option value="" disabled>Select a doctor</option>
              <option value="doctor1">Reo George</option>
            </select>
          </div>

          <div className='flex flex-row gap-8'>
            <button type="submit" className="mt-4 block w-[100px] h-10 px-4 py-2 border rounded-md border-primaryColor text-primaryColor">Add</button>
            <span className='text-[#424242] pt-6 cursor-pointer' onClick={onClose}>Reset</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewModal;
