import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import CommonCard from '../../components/healthTalk/CommonCard';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';
import useResearch from '../../hooks/healthTalkHook/useResearch';
import SkeletonCard from '../../components/healthTalk/SkeletonCard';

const breadcrumbsItems = [
  { label: "Health Talk", href: "/content-management/health-talk" },
  { label: "Research", href: "/content-management/research" },
];

const ResearchPage = () => {
  const navigate = useNavigate();
  const { loading, researchItems, deleteResearch, fetchResearch } = useResearch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    const loadWithDelay = async () => {
      setDelayedLoading(true);
      await fetchResearch();
    setTimeout(() => setDelayedLoading(false), 2000); // Add a 2-second delay
  };
  
  loadWithDelay();
}, []);

  const handleAddNewClick = () => {
    navigate('/content-management/research/new-research', { state: { isEdit: false, researchItems } });
  };

  const handleEditClick = (research) => {
    navigate('/content-management/research/new-research', { state: { isEdit: true, research } });
  };

  const handleDeleteClick = (research) => {
    setSelectedResearch(research);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedResearch) {
     await deleteResearch(selectedResearch._id); // Call the delete function with the ID
    }
    setShowDeleteModal(false);
    setSelectedResearch(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedResearch(null);
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-500">Loading...</div>; // Loading state
  }

  return (
    <div className="h-screen w-full overflow-hidden mx-auto">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
        <div className="flex flex-col">
          <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
            Research
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
              <button
                className="w-full sm:w-auto p-2 px-4 lg:w-[150px] flex items-center justify-center bg-white border border-primaryColor text-primaryColor font-medium rounded-lg"
                onClick={handleAddNewClick}
              >
                + Add new
              </button>
            </div>
          </div>
        </div>
        {delayedLoading  ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : researchItems.length === 0 ? (
          <div className="text-center mt-10 text-lg text-gray-500">
            No articles available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-x-6">
            {researchItems.map((item) => (
              <CommonCard
                key={item.id}
                imageUrl={item.image?.location}
                title={item.title}
                author={item.authors}
                date={item.publishedDate}
                onEditClick={() => handleEditClick(item)}
                onDeleteClick={() => handleDeleteClick(item)}
              />
            ))}
          </div>
        )}
      </div>
      <DeleteModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ResearchPage;
