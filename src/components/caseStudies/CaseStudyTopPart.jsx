
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import AddNewModal from "../../components/caseStudies/AddNewModal";

const CaseStudyTopPart = ({ title }) => {
  // State variable to control the visibility of the modal
  const [showAddNewModal, setShowAddNewModal] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => setShowAddNewModal(true);

  // Function to close the modal
  const handleCloseModal = () => setShowAddNewModal(false);

  return (
    <main className="flex flex-col lg:flex-row justify-between my-2 p-3">
      <h1 className="text-secondary text-xl md:text-2xl md:font-[350] mb-3 lg:mb-0">
        <div className="flex flex-row gap-3">
          {title}
          <MdChevronRight className='w-10 h-10 text-gray-400' />
          <span className='text-2xl'>case studies</span>
        </div>
      </h1>
      <div className="flex items-end ">
        <button
          className="flex items-center border border-primaryColor justify-center gap-2 p-2 lg:w-fit rounded-lg sm:min-w-full xs:min-w-full min-w-full"
          onClick={handleOpenModal}
        >
          <FaPlus className="text-primaryColor text-xs" />
          <span className="text-sm text-primaryColor">Add new</span>
        </button>
      </div>
      <AddNewModal 
        show={showAddNewModal}
        onClose={handleCloseModal} // Use onClose for closing the modal
      />
    </main>
  );
};

export default CaseStudyTopPart;
