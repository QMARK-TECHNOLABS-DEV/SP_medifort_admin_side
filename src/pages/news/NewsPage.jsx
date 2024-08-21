import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import CommonCard from '../../components/healthTalk/CommonCard';
import News1 from '../../assets/news/News 1.jpeg';
import News2 from '../../assets/news/News 2.jpeg';
import News3 from '../../assets/news/News 3.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';

const breadcrumbsItems = [
  { label: "Content Management", href: "/content-management" },
  { label: "News", href: "/news" },
];

const NewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: "Medical Breakthrough: New Treatment for Chronic Conditions",
      imageUrl: News1,
      author: "Reo George",
      date: "03/01/24",
      content: "Detailed news content here.",
    },
    {
      id: 2,
      title: "Health Tips: Staying Active During the Winter",
      imageUrl: News2,
      author: "John Doe",
      date: "04/02/24",
      content: "Detailed news content here.",
    },
    {
      id: 3,
      title: "Community Health Fair Scheduled for June",
      imageUrl: News3,
      author: "Jane Smith",
      date: "05/03/24",
      content: "Detailed news content here.",
    },
    {
      id: 4,
      title: "Community Health Fair Scheduled for June",
      imageUrl: News3,
      author: "Jane Smith",
      date: "05/03/24",
      content: "Detailed news content here.",
    },
  ]);

  useEffect(() => {
    if (location.state?.updatedNews) {
      setNewsItems(location.state.updatedNews);
    }
  }, [location.state?.updatedNews]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleAddNewClick = () => {
    navigate('/new-news', { state: { isEdit: false, newsItems } });
  };

  const handleEditClick = (news) => {
    navigate('/new-news', { state: { isEdit: true, news, newsItems } });
  };

  const handleDeleteClick = (news) => {
    setSelectedNews(news);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedNews = newsItems.filter(item => item.id !== selectedNews.id);
    setNewsItems(updatedNews);
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
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
              <button
                className="p-2 px-4 mr-5 lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                onClick={handleAddNewClick}
              >
                + Add new
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-5">
          {newsItems.map((item) => (
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

export default NewsPage;
