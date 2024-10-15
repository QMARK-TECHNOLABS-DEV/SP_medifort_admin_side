import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { HiPencilAlt } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import Article1 from "../../assets/article/images.png";
import axios from "../../axios-folder/axios";
import { department_admin_route, uploadRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddDepartmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [treatmentAndProcedures, setTreatmentAndProcedures] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const axiosPrivate= useAxiosPrivate();

  const {id} = useParams();

  const [updateObj, setUpdateObj] = useState({
    dept_name: "",
    description: '',
    banner: null,
    treatments: []
  })


  const getDepartment = async()=>{
    try {
      const response = await axiosPrivate.get(`${department_admin_route}/${id}`)

      if(response.status === 200){
        const department = response.data.result;

        setUpdateObj({
          dept_name: department.dept_name,
          description: department.description,
          banner: department?.banner,
          treatments: department?.treatments
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      setIsEdit(true);

      getDepartment();
    }
  }, [location]);

  const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    { label: "Manage Department", href: "/content-management/department" },
    {
      label: isEdit ? "Update Department" : "New Department",
      href: "#",
    },
  ];

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

  
  // Simple code

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const formdata = new FormData();

      formdata.append('file', file);

      const response = await axios.post(uploadRoute, formdata)

      if (response.status === 200) {
        setUpdateObj((prev) => ({
          ...prev,
          banner: response?.data?.file
        }))
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateObj((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!updateObj.dept_name || !updateObj.description) {
      alert("Please fill in all required fields.");
      return;
    }

    if(treatmentAndProcedures?.length > 0){
      updateObj.treatments = treatmentAndProcedures
    }

    try {
      const response = await axiosPrivate.put(`${department_admin_route}/${id}`, updateObj)
      if (response.status === 200) {
        navigate("/content-management/department")
      }
    } catch (error) {
      console.log(error)
    }
  }

// console.log({treatmentAndProcedures})

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
        <div className="flex flex-col mb-6">
          {/* Conditionally render the heading based on the edit state */}
          {isEdit 
          ? 
          (
            <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
              Update Department
            </h1>
          ) 
          : 
          (
            <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
              New Department
            </h1>
          )}
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
        <form id="department-form" onSubmit={submitHandler}>
          <div className="mt-10">
            <div className="flex flex-col lg:flex-row mb-6 gap-4">
              <div className="relative w-full h-[300px]">

                {
                  updateObj?.banner?.location
                  ?
                  <img
                    src={updateObj?.banner?.location}
                    alt="Department"
                    className="w-full h-full object-cover rounded-2xl "
                  />
                  :
                  <img
                    src={Article1}
                    alt="Department"
                    className="w-full h-full object-cover rounded-2xl "
                  />
                }

                <div className="absolute inset-0 flex items-center justify-center w-full">
                  <label htmlFor="banner-upload" className="cursor-pointer">
                    <HiPencilAlt className="text-white text-6xl bg-black bg-opacity-50 rounded-full p-2" />
                  </label>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-6">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                Department Name
                </label>
                <input
                  type="text"
                  className="w-full h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
                  placeholder="Department Name"
                  name="dept_name"
                  value={updateObj?.dept_name}
                  onChange={handleChange}
                  disabled={!isEdit}
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
                  name="description"
                  value={updateObj?.description}
                  onChange={handleChange}
                  disabled={!isEdit}
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
                        className="w-full h-12 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg"
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
                        onClick={() => handleRemoveHeading(headingIndex)}
                        className="text-red-500 hover:text-red-700"
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
                            onClick={() =>
                              handleRemoveSection(headingIndex, sectionIndex)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                        {section.subSections.map((subSection, subSectionIndex) => (
                          <div key={subSectionIndex} className="ml-8 mb-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                className="w-full h-10 p-2 border bg-[#B0BAC366] border-gray-300 rounded-lg mb-2"
                                placeholder="Add subsection"
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
                                onClick={() =>
                                  handleRemoveSubSection(
                                    headingIndex,
                                    sectionIndex,
                                    subSectionIndex
                                  )
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            handleAddSubSection(headingIndex, sectionIndex)
                          }
                          className="mt-2 text-primaryColor font-medium"
                        >
                          Add Subsection
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddSection(headingIndex)}
                      className="mt-2 text-primaryColor font-medium"
                    >
                      Add Section
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddHeading}
                  className="mt-2 text-primaryColor font-medium"
                >
                  Add Heading
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
