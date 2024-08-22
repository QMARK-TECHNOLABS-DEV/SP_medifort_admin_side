import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddNewModal from "../../components/caseStudies/AddNewModal";
import Breadcrumbs from "../common/Breadcrumbs";

const CaseStudyTopPart = ({ addNewCaseStudy }) => {
  const [showAddNewModal, setShowAddNewModal] = useState(false);

  const handleOpenModal = () => setShowAddNewModal(true);
  const handleCloseModal = () => setShowAddNewModal(false);

  return (
    <main className="flex flex-col lg:flex-row justify-between">
      <Breadcrumbs
        items={[
          { label: "Content management", href: "/content-management" },
          { label: "Case Studies", href: "/casestudies" },
        ]}
      />
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
        onClose={handleCloseModal}
        onAddNew={addNewCaseStudy} // Pass the function here
      />
    </main>
  );
};

export default CaseStudyTopPart;
