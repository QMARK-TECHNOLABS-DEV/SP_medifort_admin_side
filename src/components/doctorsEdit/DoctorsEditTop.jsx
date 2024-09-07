import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../common/Breadcrumbs';

const DoctorsEditTop = ({ doctorData, onSave, data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(doctorData); // State to manage doctor data

  // Effect to sync doctorData prop with state
  useEffect(() => {
    if (doctorData) {
      setCurrentDoctor(doctorData);
      console.log("Doctor data loaded into state:", doctorData);
    }
  }, [doctorData]);

  const breadcrumbsItems = [
    { label: "Doctor profile", href: "/doctors" },
    { label: isEdit ? "Edit Article" : `${data?.doctor_name}`, href: `/doctors/edit/${data?.doctor_id}` },
  ];

  const handleSave = () => {
    console.log("Save button clicked", currentDoctor);

    if (onSave && typeof onSave === 'function') {
      if (currentDoctor) {
        onSave(currentDoctor); // Trigger the onSave function with the current doctor data
        console.log("Doctor data saved:", currentDoctor);
      } else {
        console.error("Current doctor data is not defined.");
      }
    } else {
      console.error("onSave function is not defined or not a function.");
    }
  };

  const handleDelete = () => {
    console.log("Delete button clicked. Resetting form inputs");

    // Reset the currentDoctor state to initial values
    setCurrentDoctor({
      name: '',
      qualification: '',
      department: '',
      // Add more fields if needed
    });

    console.log("Form inputs reset to initial state.");
  };

  return (
    <main className="flex flex-col lg:flex-row justify-between p-3 min:flex-col">
      <h1 className="text-2xl font-bold text-primaryColor lg:hidden mb-4 mt-[-15px] text-left lg:ml-[-10px] ml-[-4px]">
        Edit Page
      </h1>

      <Breadcrumbs items={breadcrumbsItems} />
      <div className="flex flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-0 lg:ml-0">
        <button
          onClick={handleSave}
          className="flex items-center justify-center border border-primaryColor mb-4 lg:mb-0 p-2 w-full lg:w-auto rounded-lg text-center mt-4"
        >
          <span className="text-sm text-primaryColor">Save and submit</span>
        </button>

        {/* <button
          onClick={handleDelete}
          className="flex items-center justify-center text-gray-700 mt-2 lg:mt-[10px] lg:ml-4 w-full lg:w-auto rounded-lg border border-primaryColor p-2"
        >
          <span className="text-sm  text-primaryColor">Delete</span>
        </button> */}

      </div>
    </main>
  );
};

export default DoctorsEditTop;
