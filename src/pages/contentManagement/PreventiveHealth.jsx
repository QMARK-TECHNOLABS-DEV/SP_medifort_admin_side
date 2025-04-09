import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PreventiveHealthCard from "../../components/contentManagement/PreventiveHealthCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import AddModal from "../../components/contentManagement/PreventiveHealthAddModal";
import DeleteModal from "../../components/common/DeleteModal";
import axios from "../../axios-folder/axios";
import { checkupAdminRoute, checkupRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingScreen from "../../components/common/LoadingScreen";
import PageHeaderpart from "../../components/common/PageHeaderpart";
import SearchInput from "../../components/common/SearchInput";

const PreventiveHealth = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [checkups, setCheckups] = useState([]);
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState('add')

  const breadcrumbsItems = [
    { label: "Content management", href: "/content-management" },
    {
      label: "Preventive health",
      href: "/content-management/preventive-health",
    },
  ];

  const handleAddClick = () => {
    setMode('add')
    setShowAddModal(true);
  };

  const handleEditClick = (id) => {
    setMode('update')
    setEditItemId(id)
    setShowAddModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const axiosPrivateHook = useAxiosPrivate();

  const handleDeleteConfirm = async () => {
    try {
      const res = await axiosPrivateHook.delete(`${checkupAdminRoute}/${deleteItemId}`)

      if (res.status === 200) {
        const updatedItems = checkups.filter(
          (item) => String(item?._id) !== String(deleteItemId)
        );

        setCheckups(updatedItems);
        handleCloseDeleteModal();

      }
    } catch (error) {
      console.log(error)
    }
  };

  const getAllCheckups = async () => {
    try {
      const res = await axios.get(`${checkupRoute}?search=${search}`)

      if (res.status === 200) {
        setCheckups(res.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCheckups()

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [search])

  if (loading) return (
    <div className="h-screen w-full overflow-hidden">

      <LoadingScreen />
    </div>
  )

  return (
    <div className="h-screen w-full overflow-hidden ">
      <header>
        <PageHeaderpart
          items={breadcrumbsItems}
          pageTitle={"Preventive health"}
        >
          <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
            <SearchInput
              setSearch={setSearch}
            />
            <button
              onClick={handleAddClick}
              className="p-2 px-4 lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800  font-medium rounded-lg"
            >
              + Add
            </button>
          </div>
        </PageHeaderpart>
      </header>
      <div className="pb-80 overflow-y-auto h-full scrollbar-hide ">
        {/* <div className="flex flex-col mb-6"> */}
          {/* ----- Mobile view only--------- */}
          {/* <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
            Preventive Health
          </h1> */}
          {/* ------------------------------- */}
          {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-2 md:mt-0">
              <div className="relative w-full lg:max-w-xs mt-3 sm:mt-0">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  className="border rounded-lg p-3 text-sm w-full placeholder:ps-8"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
              </div>

            </div>
          </div> */}
        {/* </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {checkups.map((item, index) => (
            <PreventiveHealthCard
              key={index}
              title={item.title}
              details={item.tests}
              price={item.price}
              onEditClick={() => handleEditClick(item?._id)}
              onDeleteClick={() => handleDeleteClick(item?._id)}
            />
          ))}
        </div>

        <AddModal
          show={showAddModal}
          onClose={handleCloseAddModal}
          mode={mode}
          editItemId={editItemId}
          checkups={checkups}
          setCheckups={setCheckups}
        />

        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};
export default PreventiveHealth;