import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { uploadCaseStudies } from '../../utils/Endpoint'; // Ensure this is the correct endpoint
import { toast } from 'react-toastify';

const AddNewModal = ({ show, onClose, addNewCaseStudy, initialStudy }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const axiosPrivateHook = useAxiosPrivate();

  useEffect(() => {
    if (initialStudy) {
      setTitle(initialStudy.title);
      setAuthor(initialStudy.author);
    } else {
      setTitle('');
      setAuthor('');
    }
  }, [initialStudy]);

  if (!show) return null;

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    const newStudy = { title, author, date: new Date().toLocaleDateString() };

    try {
      if (initialStudy) {
        // Edit mode (PUT request)
        const response = await axiosPrivateHook.put(`${uploadCaseStudies}/${initialStudy._id}`, newStudy);
        toast.success('Case study updated successfully');
        addNewCaseStudy(response.data);  // Pass updated data back to the parent
      } else {
        // Add new study (POST request)
        const response = await axiosPrivateHook.post(uploadCaseStudies, newStudy);
        toast.success('Case study added successfully');
        addNewCaseStudy(response.data);  // Pass the new data back to the parent
      }
      onClose(); // Close the modal after success
    } catch (error) {
      toast.error('Failed to add/edit case study');
      console.error(error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-left relative">
        <h1 className='mb-4 text-lg text-[#424242]'>
          {initialStudy ? 'Edit Case Study' : 'Add New Case Study'}
        </h1>
        <IoClose
          onClick={onClose}
          size={23}
          className="absolute top-4 right-4 text-[#475467] cursor-pointer"
        />
      
        <form onSubmit={handleAddOrUpdate}>
          <div className="mb-3">
            <label htmlFor="title" className="block text-sm pb-1 font-medium text-[#3C3C3C]">
              Case Study Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input block w-full h-10 text-[#424242] rounded-md border bg-[#B0BAC3] bg-opacity-40 pl-3"
              placeholder="Enter title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="author" className="block text-sm font-medium pb-1 text-[#3C3C3C]">
              Author
            </label>
            <select
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-select block w-full h-10 rounded-md border bg-[#B0BAC3] bg-opacity-40 pl-3"
            >
              <option value="" disabled>Select an Author</option>
              <option value="Reo George">Reo George</option>
              <option value="Alice Smith">Alice Smith</option>
              <option value="Sam Patel">Sam Patel</option>
            </select>
          </div>

          <div className="flex flex-row gap-8">
            <button type="submit" className="mt-4 block w-[100px] h-10 px-4 py-2 border rounded-md border-primaryColor text-primaryColor">
              {initialStudy ? 'Update' : 'Add'}
            </button>
            <span className='text-[#424242] pt-6 cursor-pointer' onClick={onClose}>Reset</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewModal;
