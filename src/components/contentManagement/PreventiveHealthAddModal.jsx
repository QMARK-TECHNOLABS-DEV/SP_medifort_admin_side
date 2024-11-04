import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const AddModal = ({ show, onClose, onSubmit, editItem }) => {
  const [formData, setFormData] = useState({ title: '', price: 0, tests: [] });

  const [currentTest, setCurrentTest] = useState('');

  const handleAddTest = () => {
    if (!currentTest?.trim()) {
      return
    }

    setFormData((prev) => ({
      ...prev,
      tests: [
        ...prev.tests,
        currentTest
      ]
    }))

    setCurrentTest('')
  }

  const handleEditTest = (event, index) => {
    const value = event.target.value;

    if (!value) {
      return
    }

    const newArray = [...formData.tests]

    newArray[index] = value;

    setFormData((prev) => ({
      ...prev,
      tests: newArray
    }))

  }

  const handleRemoveTest = (index) => {
    const newArray = formData.tests?.filter((_, i) => i !== index)

    setFormData((prev) => ({
      ...prev,
      tests: newArray
    }))

  }

  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title,
        price: editItem.price || 0,
        tests: editItem.tests || [],
      });
    } else {
      setFormData({ title: '', price: 0, tests: [] });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
      <div className="bg-white text-left p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl text-left font-semibold mb-4">{editItem ? 'Edit' : 'Add'} Health Item</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full rounded-md bg-[#B0BAC366] border-gray-300 shadow-sm p-2"
              placeholder="Add Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              className="mt-1 block w-full rounded-md bg-[#B0BAC366] border-gray-300 shadow-sm p-2"
              placeholder="Add Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4   ">
            <label className="block text-sm font-medium text-gray-700">Tests</label>

            <div className='flex items-center gap-2 ' >
              <input
                type="text"
                name="test"
                className="mt-1 block w-full rounded-md bg-[#B0BAC366] border-gray-300 shadow-sm p-2"
                placeholder="Add Test"
                value={currentTest}
                onChange={(e) => setCurrentTest(e.target.value)}
                required
              />

              <IoIosAddCircleOutline size={28}
                onClick={handleAddTest}
              />
            </div>

          </div>


          <div className='h-[150px] overflow-y-auto scrollbar-hide my-2 
          border border-[#B0BAC366] rounded-lg ' >
            {
              formData?.tests?.map((item, index) => (
                <div className='flex items-center gap-2 mt-2 ' >
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleEditTest(e, index)}
                    className="mt-1 block w-full rounded-md bg-[#B0BAC366] border-gray-300 shadow-sm p-2"
                  />

                  <MdDeleteForever size={28} onClick={() => handleRemoveTest(index)} />
                </div>

              ))
            }
          </div>


          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-white hover:border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              {editItem ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white hover:border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
