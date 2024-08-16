import React, { useState } from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import CommonCard from '../../components/healthTalk/CommonCard';
import Article1 from '../../assets/article/Article 1.jpeg';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';

const breadcrumbsItems = [
    { label: "Content management", href: "/content-management" },
    { label: "News", href: "/news" },
  ];


const NewsPage = () => {
    const navigate = useNavigate();
    const [newsItems, setNewsItems] = useState([
        {
          title: "Nourishing Recovery Amidst Medical Challenges",
          imageUrl:Article1,
          author: "Reo George",
          date: "03/01/24",
        },
        {
          title: "Nourishing Recovery Amidst Medical Challenges",
          imageUrl:Article1,
          author: "Reo George",
          date: "03/01/24",
        },
        {
          title: "Nourishing Recovery Amidst Medical Challenges",
          imageUrl:Article1,
          author: "Reo George",
          date: "03/01/24",
        },
        {
          title: "Nourishing Recovery Amidst Medical Challenges",
          imageUrl:Article1,
          author: "Reo George",
          date: "03/01/24",
        },
    ])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
    const handleAddNewClick = () => {
        navigate('/new-news'); 
    };
    
    
  const handleDeleteClick = (article) => {
    setSelectedNews(article);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setNewsItems((prevItems) =>
      prevItems.filter((item) => item !== selectedNews)
    );
    setShowDeleteModal(false);
    setSelectedNews(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedNews(null);
  };
    

    return (
        <div className="h-screen w-full overflow-hidden mx-auto">
          <div className="pb-36 overflow-y-auto h-full">
            <div className="flex flex-col mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
  {newsItems.map((item, index) => (
    <CommonCard
      key={index}
      imageUrl={item.imageUrl}
      title={item.title}
      author={item.author}
      date={item.date}
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
    }
    

export default NewsPage
