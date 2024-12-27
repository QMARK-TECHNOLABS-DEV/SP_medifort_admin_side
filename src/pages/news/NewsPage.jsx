import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import CommonCard from "../../components/healthTalk/CommonCard";
import News1 from "../../assets/news/News 1.jpeg";
import News2 from "../../assets/news/News 2.jpeg";
import News3 from "../../assets/news/News 3.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal";
import useNews from "../../hooks/healthTalkHook/useNews";
import SkeletonCard from "../../components/healthTalk/SkeletonCard";

const breadcrumbsItems = [
  { label: "Content Management", href: "/content-management" },
  { label: "News", href: "/content-management/news" },
];

const NewsPage = () => {
  const navigate = useNavigate();
  const { loading, newsItems, fetchNews, deleteNews } = useNews();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    const loadWithDelay = async () => {
      setDelayedLoading(true);
   await fetchNews();
    setTimeout(() => setDelayedLoading(false), 2000); // Add a 2-second delay
  };
  
  loadWithDelay();
}, []);

  const handleAddNewClick = () => {
    navigate("/content-management/news/new-news", {
      state: { isEdit: false, newsItems },
    });
  };

  const handleEditClick = (news) => {
    navigate("/content-management/news/new-news", {
      state: { isEdit: true, news },
    });
  };

  const handleDeleteClick = (news) => {
    setSelectedNews(news);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedNews) {
      await deleteNews(selectedNews._id);
    }
    setShowDeleteModal(false);
    setSelectedNews(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedNews(null);
  };



  return (
    <div className="h-screen w-full overflow-hidden mx-auto">
      <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
        {/* ----- Mobile view only--------- */}
        <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
          News
        </h1>
        <div className="flex flex-col space-y-2">
          <Breadcrumbs items={breadcrumbsItems} />
          <div className="flex justify-between items-center mt-2">
            {" "}
            {/* Adjusted margin-top */}
            <div className="flex flex-col sm:flex-row sm:items-center"></div>
            <button
              className="p-2 px-4 w-full sm:w-auto lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg mt-2 sm:mt-[-50px]"
              onClick={handleAddNewClick}
            >
              + Add new
            </button>
          </div>
        </div>
        {delayedLoading  ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : newsItems.length === 0 ? (
          <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
          No articles available.
      </div>
        ): (

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2px py-1px">
          {newsItems.map((item) => (
            <CommonCard
              key={item.id}
              imageUrl={item.image?.location}
              title={item.title}
              author={item.author}
              date={item.updatedAt}
              onEditClick={() => handleEditClick(item)}
              onDeleteClick={() => handleDeleteClick(item)}
            />
          ))}
        </div>
        )

        }
      </div>
      <DeleteModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default NewsPage;
