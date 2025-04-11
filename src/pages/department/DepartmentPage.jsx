import React, { useEffect, useState } from "react";
import DepartmentCard from "../../components/department/DepartmentCard";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { department_admin_route } from "../../utils/Endpoint";
import PageHeaderpart from "../../components/common/PageHeaderpart";
import SearchInput from "../../components/common/SearchInput";
import ContentCardSkeleton from '../../components/common/ContentCardSkeleton';
import LoadingScreen from "../../components/common/LoadingScreen";
import Breadcrumbs from "../../components/common/Breadcrumbs";

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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');


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
    setLoading(true)
    try {
      const response = await axiosPrivate.get(department_admin_route)
      if (response?.status === 200) {
        const depts = response?.data?.result
        setDepartmentItems(depts)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])


  return (
    <main className="w-full">
      <div className="h-screen w-full overflow-hidden mx-auto">
        <header>
          <PageHeaderpart
            items={breadcrumbsItems}
            pageTitle={"Our Departments"}
          >
            <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
              <SearchInput
                setSearch={setSearch}
              />

            </div>
          </PageHeaderpart>
        </header>

        <div className="pb-80 overflow-y-auto h-full scrollbar-hide">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-3">
            {loading
              ? // Show skeleton if loading
              Array.from({ length: 8 }).map((_, index) => (
                <ContentCardSkeleton key={index} />
              ))
              :
              departmentItems.map((item, index) => (
                <div >
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