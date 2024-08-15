import React, { useEffect, useState } from 'react';

const AddModal = ({ show, onClose, onSubmit, editItem }) => {
  const [formData, setFormData] = useState({ title: '', content: '', price: '' });

  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title,
        content: editItem.details.join(', '),
        price: editItem.price.replace('/-', ''),
      });
    } else {
      setFormData({ title: '', content: '', price: '' });
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-left p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl text-left font-semibold mb-4">{editItem ? 'Edit' : 'Add'} Health Item</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full rounded-md bg-[#B0BAC366] border-gray-300 shadow-sm"
              placeholder="General health checkup"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              rows="4"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-[#B0BAC366] text-gray-900 shadow-sm focus:border-[#9C2677] focus:ring-[#9C2677]"
              placeholder="MBBS, MS (Gen. Surgery), FMAS"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              className="mt-1 block w-full rounded-md bg-[#B0BAC366] border-gray-300 shadow-sm"
              placeholder="1499"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-white border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              {editItem ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white border-[#9C2677] hover:text-[#9C2677] border text-gray-800 font-medium py-2 px-4 rounded-md"
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
