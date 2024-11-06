import { useState, useEffect } from 'react';
import { axiosPrivate } from '../../axios-folder/axios';
import { getArticles, uploadArticles } from '../../utils/Endpoint';
import { toast } from 'react-toastify';

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
        const response = await axiosPrivate.get(getArticles);
        console.log(response.data.articles)
        setArticles(response.data.articles); // Ensure articles is an array
    } catch (err) {
        setError(err);
        toast.error('Failed to fetch articles');
    } finally {
        setLoading(false);
    }
};
 
  // Delete an article
  const deleteArticle = async (articleId) => {
    setLoading(true);
    try {
      await axiosPrivate.delete(`${uploadArticles}/${articleId}`);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId)
      );
      toast.success('Article deleted successfully');
    } catch (err) {
      setError(err);
      toast.error('Failed to delete article');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of articles
  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  return {
    articles,
    loading,
    error,
    deleteArticle,
    fetchArticles,
  };
};

export default useArticles;
