
import React, { useState } from 'react';
import { IoLinkSharp, IoClose } from "react-icons/io5";

const AddNewModal = ({ show, onClose, onAddNew }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  if (!show) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (title && author) {
      onAddNew({ title, author, date: new Date().toLocaleDateString() });
      setTitle(''); // Reset form fields
      setAuthor('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-left relative">
        <h1 className='mb-4 text-lg text-[#424242]'>Add New</h1>
        <IoClose
          onClick={onClose}
          size={23}
          className="absolute top-4 right-4 text-[#475467] cursor-pointer"
        />
      
        <form onSubmit={handleAdd}>
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
            <button type="submit" className="mt-4 block w-[100px] h-10 px-4 py-2 border rounded-md
             border-primaryColor text-primaryColor">
              Add
            </button>
            <span className='text-[#424242] pt-6 cursor-pointer' onClick={onClose}>Reset</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewModal;

