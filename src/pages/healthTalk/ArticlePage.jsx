import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import CommonCard from '../../components/healthTalk/CommonCard';
import Article1 from '../../assets/article/Article 1.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';

const breadcrumbsItems = [
    { label: "Health Talk", href: "/health-talk" },
    { label: "Article", href: "/article" },
];

const ArticlePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [articleItems, setArticleItems] = useState([
    {
      id: 1, 
      title: "Nourishing Recovery Amidst Medical Challenges",
      imageUrl: Article1,
      author: "Reo George",
      date: "03/01/24",
      content: "Sample content for the article.",
    },
    {
      id: 2,
      title: "Another Article Title",
      imageUrl: Article1,
      author: "John Doe",
      date: "04/02/24",
      content: "Another sample content.",
    },
  ]);

  useEffect(() => {
    if (location.state?.updatedArticles) {
      setArticleItems(location.state.updatedArticles);
    }
  }, [location.state?.updatedArticles]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleAddNewClick = () => {
    navigate('/new-article', { state: { isEdit: false, articleItems } }); 
  };

  const handleEditClick = (article) => {
    navigate('/new-article', { state: { isEdit: true, article, articleItems } });
  };

  const handleDeleteClick = (article) => {
    setSelectedArticle(article); 
    setShowDeleteModal(true); 
  };

  const handleDeleteConfirm = () => {
    const updatedArticles = articleItems.filter(item => item.id !== selectedArticle.id);
    setArticleItems(updatedArticles);
    setShowDeleteModal(false); 
    setSelectedArticle(null); 
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedArticle(null);
  };


    return (
        <div className="h-screen w-full overflow-hidden">
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
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 ">
                {articleItems.map((item, index) => (
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
}

export default ArticlePage;
