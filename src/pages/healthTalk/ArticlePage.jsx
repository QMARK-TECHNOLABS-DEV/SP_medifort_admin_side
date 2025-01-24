import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import CommonCard from '../../components/healthTalk/CommonCard';
import SkeletonCard from '../../components/healthTalk/SkeletonCard'; // Import SkeletonCard
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';
import useArticles from '../../hooks/healthTalkHook/useArticles';
import useGetAllDoctors from '../../hooks/doctor/useGetAllDoctors';

const breadcrumbsItems = [
    { label: "Health Talk", href: "/content-management/health-talk" },
    { label: "Article", href: "/content-management/article" },
];

const ArticlePage = () => {
    const navigate = useNavigate();
    const { articles, loading, error, deleteArticle, fetchArticles } = useArticles();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [delayedLoading, setDelayedLoading] = useState(true);
    const { doctors } = useGetAllDoctors();
    const [articlesWithAuthors, setArticlesWithAuthors] = useState([]); // Corrected name

    useEffect(() => {
        const loadWithDelay = async () => {
            setDelayedLoading(true);
            await fetchArticles(); // Fetch articles
            setTimeout(() => setDelayedLoading(false), 2000); // Add a 2-second delay
        };
        loadWithDelay();
    }, []);

    useEffect(() => {
        // Set the articles with author names by fetching the doctor name based on the doctorId
        const fetchArticlesWithAuthors = () => {
            const updatedArticles = articles.map((item) => {
                const authorDoctor = doctors.find((doctor) => doctor._id === item.author);
                return {
                    ...item,
                    author: authorDoctor ? authorDoctor.doctor_name : item.author, // Fallback if no doctor is found
                };
            });
            setArticlesWithAuthors(updatedArticles);
        };

        if (articles.length > 0) {
            fetchArticlesWithAuthors();
        }
    }, [articles, doctors]);

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
            await deleteArticle(selectedArticle._id);
            fetchArticles();
        }
        setShowDeleteModal(false);
        setSelectedArticle(null);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedArticle(null);
    };

    return (
        <div className="h-screen w-full overflow-hidden">
            <div className="pb-36 overflow-y-auto h-full scrollbar-hide">
                <div className="flex flex-col">
                    <h1 className="flex text-2xl font-bold text-primaryColor lg:hidden">Articles</h1>
                    <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center">
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

                {/* Display loading skeletons if articles are loading */}
                {delayedLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : articlesWithAuthors.length === 0 ? (
                    <div className="text-center mt-10 text-lg justify-center items-center text-gray-500">
                        No articles available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
                        {articlesWithAuthors.map((item) => (
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
