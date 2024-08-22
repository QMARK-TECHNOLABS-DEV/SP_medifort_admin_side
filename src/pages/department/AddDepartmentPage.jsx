import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import Article1 from "../../assets/article/images.png";

const AddDepartmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [treatmentAndProcedures, setTreatmentAndProcedures] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { department } = location.state;
      setName(department.title);
      setDescription(department.description);
      setImage(department.imageUrl);
      setTreatmentAndProcedures(department.treatmentAndProcedures || []);
      setIsEdit(true);
    }
  }, [location]);

  const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    {
      label: isEdit ? "Update Department" : "New Department",
      href: "/add-department",
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleAddHeading = () => {
    setTreatmentAndProcedures([
      ...treatmentAndProcedures,
      { heading: "", sections: [] },
    ]);
  };

  const handleAddSection = (headingIndex) => {
    const newProcedures = [...treatmentAndProcedures];
    newProcedures[headingIndex].sections.push({ section: "", subSections: [] });
    setTreatmentAndProcedures(newProcedures);
  };

  const handleAddSubSection = (headingIndex, sectionIndex) => {
    const newProcedures = [...treatmentAndProcedures];
    newProcedures[headingIndex].sections[sectionIndex].subSections.push("");
    setTreatmentAndProcedures(newProcedures);
  };

  const handleProcedureChange = (
    type,
    headingIndex,
    sectionIndex,
    subSectionIndex,
    event
  ) => {
    const newProcedures = [...treatmentAndProcedures];
    if (type === "heading") {
      newProcedures[headingIndex].heading = event.target.value;
    } else if (type === "section") {
      newProcedures[headingIndex].sections[sectionIndex].section =
        event.target.value;
    } else if (type === "subSection") {
      newProcedures[headingIndex].sections[sectionIndex].subSections[
        subSectionIndex
      ] = event.target.value;
    }
    setTreatmentAndProcedures(newProcedures);
  };

  // Handling deletion
  const handleRemoveHeading = (headingIndex) => {
    const newProcedures = treatmentAndProcedures.filter(
      (_, index) => index !== headingIndex
    );
    setTreatmentAndProcedures(newProcedures);
  };

  const handleRemoveSection = (headingIndex, sectionIndex) => {
    const newProcedures = [...treatmentAndProcedures];
    newProcedures[headingIndex].sections = newProcedures[
      headingIndex
    ].sections.filter((_, index) => index !== sectionIndex);
    setTreatmentAndProcedures(newProcedures);
  };

  const handleRemoveSubSection = (
    headingIndex,
    sectionIndex,
    subSectionIndex
  ) => {
    const newProcedures = [...treatmentAndProcedures];
    newProcedures[headingIndex].sections[sectionIndex].subSections =
      newProcedures[headingIndex].sections[sectionIndex].subSections.filter(
        (_, index) => index !== subSectionIndex
      );
    setTreatmentAndProcedures(newProcedures);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const newDepartment = {
      id: isEdit ? location.state.department.id : Date.now(),
      name,
      description,
      treatmentAndProcedures,
      imageUrl: image || Article1,
      author: "Reo George",
      date: new Date().toLocaleDateString(),
    };

    let updatedDepartments;
    if (isEdit) {
      updatedDepartments = location.state.departmentItems.map((item) =>
        item.id === newDepartment.id ? newDepartment : item
      );
    } else {
      updatedDepartments = [...location.state.departmentItems, newDepartment];
    }

    navigate("/department", { state: { updatedDepartments } });
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
        <div className="flex flex-col mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-row gap-4 mt-4 sm:mt-0">
              <button
                type="submit"
                form="department-form"
                className="py-2 lg:w-[150px] inline-flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
              >
                Save and submit
              </button>
              {isEdit && (
                <button
                  type="button"
                  className="p-2 px-6 lg:w-[150px] flex items-center justify-center bg-[#F8F9FA] border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                  onClick={() => navigate("/department")}
                >
                  <FaTrashAlt className="mr-2" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
        <form id="department-form" onSubmit={handleSubmit}>
          <div className="mt-10">
            <div className="flex flex-col lg:flex-row mb-6 gap-4">
              <div className="relative w-full h-[300px]">
                <img
                  src={image || Article1}
                  alt="Department"
                  className="w-full h-full object-cover rounded-2xl "
                />
                <div className="absolute inset-0 flex items-center justify-center w-full">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <HiPencilAlt className="text-white text-6xl bg-black bg-opacity-50 rounded-full p-2" />
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-6">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Department Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="5"
                  className="w-full p-4 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Department description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                  Treatment and procedure
                </label>
                {treatmentAndProcedures.map((item, headingIndex) => (
                  <div key={headingIndex} className="mb-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-full h-10 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg mb-2"
                        placeholder="Add heading"
                        value={item.heading}
                        onChange={(e) =>
                          handleProcedureChange(
                            "heading",
                            headingIndex,
                            null,
                            null,
                            e
                          )
                        }
                      />
                      <button
                        type="button"
                        className="text-red-600"
                        onClick={() => handleRemoveHeading(headingIndex)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                    {item.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="ml-4 mb-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className="w-full h-10 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg mb-2"
                            placeholder="Add section"
                            value={section.section}
                            onChange={(e) =>
                              handleProcedureChange(
                                "section",
                                headingIndex,
                                sectionIndex,
                                null,
                                e
                              )
                            }
                          />
                          <button
                            type="button"
                            className="text-red-600"
                            onClick={() =>
                              handleRemoveSection(headingIndex, sectionIndex)
                            }
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                        {section.subSections.map(
                          (subSection, subSectionIndex) => (
                            <div key={subSectionIndex} className="ml-8 mb-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  className="w-full h-10 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                                  placeholder="Add sub-section"
                                  value={subSection}
                                  onChange={(e) =>
                                    handleProcedureChange(
                                      "subSection",
                                      headingIndex,
                                      sectionIndex,
                                      subSectionIndex,
                                      e
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="text-red-600"
                                  onClick={() =>
                                    handleRemoveSubSection(
                                      headingIndex,
                                      sectionIndex,
                                      subSectionIndex
                                    )
                                  }
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </div>
                          )
                        )}
                        <button
                          type="button"
                          className="block w-full text-left text-[#424242] mt-2 ml-8"
                          onClick={() =>
                            handleAddSubSection(headingIndex, sectionIndex)
                          }
                        >
                          + add sub section
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="block w-full text-left text-[#424242] mt-2 ml-4"
                      onClick={() => handleAddSection(headingIndex)}
                    >
                      + add section
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="block w-full text-left text-[#424242] mt-2"
                  onClick={handleAddHeading}
                >
                  + add heading
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentPage;
