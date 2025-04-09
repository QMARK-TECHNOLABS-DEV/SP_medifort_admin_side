import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DepartmentCard from "../../components/department/DepartmentCard";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { department_admin_route, list_departments } from "../../utils/Endpoint";
import LoadingScreen from "../../components/common/LoadingScreen";
import PageHeaderpart from "../../components/common/PageHeaderpart";
import SearchInput from "../../components/common/SearchInput";

const breadcrumbsItems = [
  { label: "Home", href: "/" },
  { label: "Manage Departments", href: "/department" },
];

const DepartmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [departmentItems, setDepartmentItems] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.updatedDepartments) {
      setDepartmentItems(location.state.updatedDepartments);
    }
  }, [location.state?.updatedDepartments]);

  const handleAddNewClick = () => {
    navigate("/department/add", { state: { isEdit: false, departmentItems } });
  };

  const handleEditClick = (department) => {
    navigate(`/department/edit/${department?.dept_id}`, {
      state: { isEdit: true, department, departmentItems },
    });
  };

  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedDepartments = departmentItems.filter(
      (item) => item.id !== selectedDepartment.id
    );
    setDepartmentItems(updatedDepartments);
    setShowDeleteModal(false);
    setSelectedDepartment(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedDepartment(null);
  };

  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(department_admin_route)
      if (response?.status === 200) {
        const depts = response?.data?.result
        setDepartmentItems(depts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
getData()
setTimeout(() => {
  setLoading(false);
}, 2000);
  },[])

  if (loading) return(
    <div className="h-screen w-full overflow-hidden">

      <LoadingScreen/>
    </div>
  ) 

  return (
    <main className="w-full">
    <header>
    <PageHeaderpart
    items={breadcrumbsItems}
    pageTitle={"Our Departments"}
    >
      <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
        <SearchInput
        setSearch={""}
        />

      </div>
    </PageHeaderpart>
  </header>
    <div className="h-screen w-full overflow-hidden mx-auto">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
        {/* <div className="flex flex-col"> */}
          {/* ----- Mobile view only--------- */}
          {/* <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
            Departments
          </h1> */}
          {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} /> */}

            {/* <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
              <button
                className="p-2 px-4 mr-1 lg:mr-2 lg:w-[150px] flex items-center text-primaryColor justify-center bg-white border border-[#9C2677] font-medium rounded-lg mt-2 sm:mt-4 lg:mt-0"

                onClick={handleAddNewClick}
              >
                + Add new
              </button>
            </div> */}

          {/* </div>
        </div> */}
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 mt-3 gap-x-6  p-1">
          {departmentItems.map((item, index) => (
            <div className="custom-item-spacing ">
              <DepartmentCard
                key={index}
                data={item}
                onEditClick={() => handleEditClick(item)}
                onDeleteClick={() => handleDeleteClick(item)}
              />
            </div>
          ))}
        </div>




      </div>
      <DeleteModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
    </main>
  );
};

export default DepartmentPage;