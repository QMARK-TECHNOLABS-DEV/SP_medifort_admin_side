import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import CommonCard from '../../components/healthTalk/CommonCard';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';
import useArticles from '../../hooks/healthTalkHook/useArticles';


const breadcrumbsItems = [
    { label: "Health Talk", href: "/content-management/health-talk" },
    { label: "Article", href: "/content-management/article" },
];

const ArticlePage = () => {
    const navigate = useNavigate();
    const { articles, loading, error,deleteArticle, fetchArticles } = useArticles(); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Fetch articles on component mount
    useEffect(() => {
        fetchArticles();
    }, []); // Dependency array includes fetchArticles to prevent warnings

    const handleAddNewClick = () => {
        navigate('/content-management/article/new-article', { state: { isEdit: false, articles } }); 
    };

    const handleEditClick = (article) => {
        navigate('/content-management/article/new-article', { state: { isEdit: true, article } });
    };

    const handleDeleteClick = (article) => {
        setSelectedArticle(article); 
        setShowDeleteModal(true); 
    };

    const handleDeleteConfirm = async () => {
      if (selectedArticle) {
        console.log(selectedArticle)
          await deleteArticle(selectedArticle._id); // Call the delete function
          fetchArticles();
      }
      setShowDeleteModal(false); 
      setSelectedArticle(null); 
  };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedArticle(null);
    };

    // Show a loading state or error message if necessary
    if (loading) return <div>Loading articles...</div>;
    // if (error) return <div>Error loading articles: {error.message}</div>;

    return (
        <div className="h-screen w-full overflow-hidden">
            <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
                <div className="flex flex-col">
                    <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">
                        Articles
                    </h1>
                    <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center ">
                        <Breadcrumbs items={breadcrumbsItems} />
                        <div className="flex flex-col lg:flex-row gap-2 lg:gap-2 mt-5 lg:mt-0 w-full lg:w-fit">
                            <button
                                className="p-2 px-4 mr-5 lg:w-[150px] flex items-center justify-center bg-white border border-[#9C2677] text-[#9C2677] hover:text-gray-800 font-medium rounded-lg"
                                onClick={handleAddNewClick}
                            >
                                + Add new
                            </button>
                        </div>
                    </div>
                </div>
                {articles.length === 0 ? (
                    <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
                        No articles available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
                        {articles.map((item) => (
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

export default ArticlePage;
