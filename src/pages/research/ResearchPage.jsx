import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import CommonCard from '../../components/healthTalk/CommonCard';
import Research1 from '../../assets/research/Research 1.jpeg';
import Research2 from '../../assets/research/Research 2.jpeg';
import Research3 from '../../assets/research/Research 3.jpeg';
import Research4 from '../../assets/research/Research 4.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';

const breadcrumbsItems = [
  { label: "Health Talk", href: "/content-management/health-talk" },
  { label: "Research", href: "/content-management/research" },
];

const ResearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [researchItems, setResearchItems] = useState([
    {
      id: 1,
      title: "Advancements in Gene Therapy for Rare Diseases",
      imageUrl: Research1,
      author: "Dr. Emily Green",
      date: "03/01/24",
      content: "Detailed research content here.",
    },
    {
      id: 2,
      title: "Nanotechnology in Cancer Treatment",
      imageUrl: Research2,
      author: "Dr. John Smith",
      date: "04/02/24",
      content: "Detailed research content here.",
    },
    {
      id: 3,
      title: "AI in Early Diagnosis of Alzheimer’s",
      imageUrl: Research3,
      author: "Dr. Sarah Lee",
      date: "05/03/24",
      content: "Detailed research content here.",
    },
    {
      id: 4,
      title: "Breakthrough in Diabetes Management",
      imageUrl: Research4,
      author: "Dr. Jane Brown",
      date: "06/04/24",
      content: "Detailed research content here.",
    },
  ]);

  useEffect(() => {
    if (location.state?.updatedResearch) {
      setResearchItems(location.state.updatedResearch);
    }
  }, [location.state?.updatedResearch]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);

  const handleAddNewClick = () => {
    navigate('/content-management/research/new-research', { state: { isEdit: false, researchItems } });
  };

  const handleEditClick = (research) => {
    navigate('/content-management/research/new-research', { state: { isEdit: true, research, researchItems } });
  };

  const handleDeleteClick = (research) => {
    setSelectedResearch(research);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedResearch = researchItems.filter(item => item.id !== selectedResearch.id);
    setResearchItems(updatedResearch);
    setShowDeleteModal(false);
    setSelectedResearch(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedResearch(null);
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
          {researchItems.map((item) => (
            <CommonCard
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              author={item.author}
              date={item.date}
              onEditClick={() => handleEditClick(item)}
              onDeleteClick={() => handleDeleteClick(item)}
            />
          ))}
        </div>
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
