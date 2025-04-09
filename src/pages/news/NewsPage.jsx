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
import PageHeaderpart from "../../components/common/PageHeaderpart";

const breadcrumbsItems = [
  { label: "Content Management", href: "/content-management" },
  { label: "our News", href: "/content-management/news" },
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
       <header>
          <PageHeaderpart
            items={breadcrumbsItems}
            pageTitle={"Our News"}
          >
            <div className="flex md:flex-row flex-col md:items-end  gap-4 w-full items-center justify-center ">
            
            <button
              className="w-full sm:w-auto p-2 px-4 lg:w-[150px] flex items-center justify-center bg-white border border-primaryColor text-primaryColor font-medium rounded-lg"
              onClick={handleAddNewClick}
            >
              + Add new
            </button>
            </div>
          </PageHeaderpart>
        </header>
      <div className="pb-80 overflow-y-auto h-full scrollbar-hide">
     
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
