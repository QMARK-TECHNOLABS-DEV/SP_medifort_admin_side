import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import useBlog from '../../hooks/healthTalkHook/useBlog';
import SkeletonCard from '../../components/healthTalk/SkeletonCard';
import CommonCard from '../../components/healthTalk/CommonCard';
import DeleteModal from '../../components/common/DeleteModal';
import useSpecialities from '../../hooks/specialitiesHooks/useSpecialities';
import useGetAllDepartment from '../../hooks/departmentHook/useGetAllDepartment';

const breadcrumbsItems = [
    { label: "Content Management", href: "/content-management" },
    { label: "Specialties", href: "/content-management/specialities" },
];
function SpecialtiesPage() {
    const navigate = useNavigate();
    const [delayedLoading, setDelayedLoading] = useState(true);
    const { fetchSpecialities, specialitiesItems, loading, deleteSpeciality } = useSpecialities()
    const { department } = useGetAllDepartment()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    console.log(specialitiesItems)
    useEffect(() => {
        const loadWithDelay = async () => {
            setDelayedLoading(true);
            await fetchSpecialities();
            setTimeout(() => setDelayedLoading(false), 2000); // Add a 2-second delay
        };
        loadWithDelay();
    }, []);

    const handleAddNewClick = () => {
        navigate("/content-management/specialities/new-speciality", {
            state: { isEdit: false, },
        });
    };

    const handleEditClick = (speciality) => {
        navigate("/content-management/specialities/new-speciality", {
            state: { isEdit: true, speciality },
        });
    };


    const handleDeleteClick = (speciality) => {
        setSelectedBlog(speciality);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedBlog) {
            await deleteSpeciality(selectedBlog._id);
        }
        setShowDeleteModal(false);
        setSelectedBlog(null);
    };
    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedBlog(null);
    };
    return (
        <div className="h-screen w-full overflow-hidden mx-auto p-2">
            <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
                {/* ----- Mobile view only--------- */}
                <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">Specialties</h1>
                <div className="flex flex-col space-y-2">
                    <Breadcrumbs items={breadcrumbsItems} />
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center"></div>
                        <button
                            className="p-2 px-4 w-full sm:w-auto lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg mt-2 sm:mt-[-50px]"
                            onClick={handleAddNewClick}
                        >
                            + Add new
                        </button>
                    </div>
                </div>
                {delayedLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 lg:gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : specialitiesItems.length === 0 ? (
                    <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
                        No Specialties available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-2px py-1px">
                        {specialitiesItems.map((item) => {
                            const deptName = department?.find(dep => dep._id === item.department)?.dept_name || "Unknown Department";

                            return (
                                <CommonCard
                                    key={item.id}
                                    imageUrl={item.image?.location}
                                    title={item.name}
                                    author={deptName}
                                    date={item.updatedAt}
                                    onEditClick={() => handleEditClick(item)}
                                    onDeleteClick={() => handleDeleteClick(item)}
                                />
                            );
                        })}
                    </div>
                )}

            </div>
            <DeleteModal show={showDeleteModal} onClose={handleCloseModal} onConfirm={handleDeleteConfirm} />
        </div>
    )
}

export default SpecialtiesPage