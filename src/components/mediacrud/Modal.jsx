import React from 'react';

const Modal = ({ isOpen, onClose, onReset, onAdd, fileName, handleFileUpload }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[380px] h-[200px]">
        <h2 className="text-xl font-semibold mb-2 text-left">Add New</h2>
        <p className="text-left text-gray-600 mb-4">Upload image</p>

        <div className="file-upload mb-4 flex items-center">
          <label
            htmlFor="upload-image"
            className="cursor-pointer text-gray-600 text-lg mr-4 flex items-center"
          >
            <svg
              className="h-6 w-6 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </label>
          <input
            type="file"
            id="upload-image"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-sm text-gray-500 ml-2">
            {fileName ? fileName : "No file selected"}
          </p>
        </div>

        <div className="modal-actions flex justify-start space-x-4">
          <button
            className="px-4 py-2 border border-pink-300 text-pink-600 rounded-md"
            onClick={onAdd}
          >
            Add
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

