import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import DeleteModal from '../../components/common/DeleteModal';
import useBrochures from '../../hooks/healthTalkHook/useBrochures';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import BrochureAlt from '../../components/healthTalk/BrochureAlt';
import SkeletonBrochure from '../../components/healthTalk/SkeletonBrochure';
import PageHeaderpart from '../../components/common/PageHeaderpart';

const breadcrumbsItems = [
    { label: "Health Talk", href: "/content-management/health-talk" },
    { label: "Brochure", href: "/content-management/brochure" },
];


const BrochurePage = () => {
    const { brochures, deleteBrochure, fetchBrochures } = useBrochures();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBrochure, setSelectedBrochure] = useState(null);
    const [delayedLoading, setDelayedLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('add');

    useEffect(() => {
        const loadWithDelay = async () => {
            setDelayedLoading(true);
            await fetchBrochures(); // Fetch Brochures
            setTimeout(() => setDelayedLoading(false), 2000); // Add a 2-second delay
        };

        loadWithDelay();
    }, []);

    const handleAddNewClick = () => {
        setMode('add')
        setIsOpen(true)
    };

    const handleEditClick = (brochure) => {
        setSelectedBrochure(brochure)
        setMode('edit')
        setIsOpen(true)
    };

    const handleDeleteClick = (brochure) => {
        setSelectedBrochure(brochure);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedBrochure) {
            await deleteBrochure(selectedBrochure._id);
            fetchBrochures();
        }
        setShowDeleteModal(false);
        setSelectedBrochure(null);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedBrochure(null);
    };

    return (
        <div className="h-screen w-full overflow-hidden">
            <header>
                <PageHeaderpart
                    items={breadcrumbsItems}
                    pageTitle={"Brochure"}
                >
                    <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-start justify-start ">
                        <button
                            className="p-2 px-4 mr-5 lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                            onClick={handleAddNewClick}
                        >
                            + Add new
                        </button>

                    </div>
                </PageHeaderpart>
            </header>
            <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
                {/* <div className="flex flex-col">
                    <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">Brochures</h1>
                    <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center">
                        <Breadcrumbs items={breadcrumbsItems} />
                        <div className="flex flex-col lg:flex-row gap-2 lg:gap-2 mt-5 lg:mt-0 w-full lg:w-fit">

                        </div>
                    </div>
                </div> */}

                {/* Display loading skeletons if Brochures are loading */}
                {delayedLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonBrochure key={index} />
                        ))}
                    </div>
                ) : brochures.length === 0 ? (
                    <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
                        No Brochures available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {brochures.map((item) => (
                            <div className="flex flex-col bg-white rounded-2xl mt-6 shadow-lg overflow-hidden w-full mx-auto"> {/* Reduced mt-10 to mt-6 */}

                                <div className="p-3 text-left">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item?.title}</h3>

                                </div>
                                <div className="flex justify-start px-3 py-2 space-x-3">
                                    <button
                                        className="text-gray-600 bg-white border p-2 rounded-full shadow-md hover:text-blue-600"
                                        onClick={() => handleEditClick(item)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-gray-600 bg-white border p-2 rounded-full shadow-md hover:text-red-600"
                                        onClick={() => handleDeleteClick(item)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <DeleteModal
                show={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleDeleteConfirm}
            />

            {
                isOpen
                &&
                <BrochureAlt data={selectedBrochure} setData={setSelectedBrochure} mode={mode} setIsOpen={setIsOpen}
                    getData={fetchBrochures} />
            }
        </div>
    );
};

export default BrochurePage;
